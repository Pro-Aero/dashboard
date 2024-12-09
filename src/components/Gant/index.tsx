"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Scatter,
  ScatterChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { scaleTime } from "d3-scale";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { UserResponse } from "@/services/users";
import { GanttData, TaskInfo, TaskPerDay } from "@/services/tasks";

type DataPoint = {
  x: number;
  y: number;
  date: string;
  taskInfo: TaskInfo;
  taskPerDay: TaskPerDay;
  isWeekend: boolean;
  userName: string;
};

interface Props {
  teamData: GanttData | undefined;
  usersList: UserResponse[] | undefined;
}

export function TeamGanttChart({ teamData, usersList }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const startDate = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return new Date(currentYear, 9, 1);
  }, []);

  const endDate = useMemo(() => {
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 6);
    return endDate;
  }, [startDate]);

  useEffect(() => {
    if (!teamData || !usersList) {
      setError("Dados não disponíveis. Por favor, tente novamente mais tarde.");
      return;
    }

    if (teamData.tasks.length === 0 || usersList.length === 0) {
      setError("Usuário sem task cadastradas.");
      return;
    }

    setError(null);

    const processedData: DataPoint[] = teamData.tasks
      .filter((task) => task.taskInfo.status !== "Completed")
      .flatMap((task) =>
        Object.entries(task.taskPerDay)
          .filter(([date]) => {
            const taskDate = new Date(date);
            return taskDate >= startDate && taskDate < endDate;
          })
          .map(([date, dayData]) => ({
            x: new Date(date).valueOf(),
            y: 0.5,
            date,
            taskInfo: task.taskInfo,
            taskPerDay: dayData,
            isWeekend: dayData.isWeekend,
            userName: task.taskInfo.assignments[0]?.name || "Unknown User",
          }))
      );

    const userTaskMap = new Map<string, number>();
    processedData.forEach((dataPoint) => {
      if (!userTaskMap.has(dataPoint.userName)) {
        userTaskMap.set(dataPoint.userName, userTaskMap.size);
      }
      dataPoint.y = userTaskMap.get(dataPoint.userName)! + 0.5;
    });

    setChartData(processedData);

    const urlUserId = searchParams.get("userId");
    if (urlUserId) {
      const user = usersList.find((user) => user.id === urlUserId);
      if (user) {
        setSelectedUser(user.displayName);
      }
    }
  }, [teamData, usersList, startDate, endDate, searchParams]);

  const filteredChartData = useMemo(() => {
    if (chartData.length === 0) return [];

    let data = chartData;

    if (selectedUser !== "") {
      data = data.filter((item) => item.userName === selectedUser);
    }

    if (selectedMonth !== "") {
      const [year, month] = selectedMonth.split("-");
      data = data.filter((item) => {
        const itemDate = new Date(item.date);
        return (
          itemDate.getFullYear() === parseInt(year) &&
          itemDate.getMonth() === parseInt(month) - 1
        );
      });
    }

    return data.map((item, index) => ({
      ...item,
      y: index * 0.5 + 0.5,
    }));
  }, [chartData, selectedUser, selectedMonth]);

  const xDomain = useMemo(() => {
    if (selectedMonth !== "") {
      const [year, month] = selectedMonth.split("-");
      const startOfMonth = new Date(parseInt(year), parseInt(month) - 1, 1);
      const endOfMonth = new Date(parseInt(year), parseInt(month), 0);
      return [startOfMonth.valueOf(), endOfMonth.valueOf()];
    }
    return [startDate.valueOf(), endDate.valueOf()];
  }, [startDate, endDate, selectedMonth]);

  const yDomain = useMemo(() => {
    if (filteredChartData.length === 0) return [0, 1];
    return [0, Math.max(filteredChartData.length * 0.5, 1)];
  }, [filteredChartData]);

  const formatXAxis = (tickItem: number) => {
    const date = new Date(tickItem);
    return date.toLocaleString("default", { month: "short", day: "numeric" });
  };

  const handleUserChange = (value: string) => {
    setSelectedUser(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value === "") {
      params.delete("userId");
    } else {
      const selectedUserData = usersList?.find(
        (user) => user.displayName === value
      );
      if (selectedUserData) {
        params.set("userId", selectedUserData.id);
      }
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleMonthChange = (value: string) => {
    setSelectedMonth(value);
  };

  const months = useMemo(() => {
    const monthsArray = [];
    let currentDate = new Date(startDate);
    while (currentDate < endDate) {
      monthsArray.push({
        value: `${currentDate.getFullYear()}-${String(
          currentDate.getMonth() + 1
        ).padStart(2, "0")}`,
        label: currentDate.toLocaleString("default", {
          month: "long",
          year: "numeric",
        }),
      });
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    return monthsArray;
  }, [startDate, endDate]);

  const xScale = useMemo(() => {
    return scaleTime().domain(xDomain).range([0, 2000]);
  }, [xDomain]);

  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">
          Gantt personalizado do Time
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {selectedUser === ""
            ? `Selecione um usuário para continuarmos`
            : `Exibindo tarefas do(a) ${selectedUser}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 mb-4">
          <Select onValueChange={handleUserChange} value={selectedUser}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Selecione um funcionário" />
            </SelectTrigger>
            <SelectContent>
              {usersList?.map((user) => (
                <SelectItem key={user.id} value={user.displayName}>
                  {user.displayName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={handleMonthChange} value={selectedMonth}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Selecione um mês" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {error ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Aviso</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <ScrollArea className="w-full h-[500px] rounded-md border">
            <div className="h-[480px] w-[2000px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    type="number"
                    dataKey="x"
                    name="Date"
                    domain={xDomain}
                    tickFormatter={formatXAxis}
                    stroke="hsl(var(--primary))"
                    ticks={
                      selectedMonth
                        ? undefined
                        : Array.from({ length: 6 }, (_, i) =>
                            new Date(
                              startDate.getFullYear(),
                              startDate.getMonth() + i,
                              1
                            ).valueOf()
                          )
                    }
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    name="User"
                    domain={yDomain}
                    stroke="hsl(var(--primary))"
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Scatter
                    name="Tasks"
                    data={filteredChartData}
                    fill="hsl(var(--primary))"
                    shape={<CustomShape xScale={xScale} />}
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}

const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = "#";
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    colour += ("00" + value.toString(16)).substr(-2);
  }
  return colour;
};

const CustomShape = (props: any) => {
  const { cx, cy, payload, xScale } = props;

  const barHeight = 22;

  const startDate = new Date(payload.taskInfo.startDateTime).getTime();
  const endDate = new Date(payload.taskInfo.dueDateTime).getTime();

  const startX = xScale(startDate);
  const endX = xScale(endDate);
  const barWidth = Math.max(endX - startX, 40);

  const color = stringToColor(payload.taskInfo.title);

  return (
    <g>
      <rect
        x={startX}
        y={cy - barHeight / 2}
        width={barWidth}
        height={barHeight}
        fill={payload.isWeekend ? "hsl(var(--muted))" : color}
        rx={4}
        ry={4}
      />
      <text
        x={startX + 5}
        y={cy + 5}
        fill="white"
        fontSize="12"
        textAnchor="start"
        dominantBaseline="middle"
      >
        {payload.taskInfo.title} ({payload.totalHours}h)
      </text>
    </g>
  );
};

export default CustomShape;

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card p-4 rounded shadow-lg border border-border">
        <p className="font-bold text-lg text-primary mb-2">
          {data.userName} - {new Date(data.date).toLocaleDateString()}
        </p>
        <p className="font-semibold text-primary mb-2">
          Task: {data.taskInfo.title}
        </p>
        {data.taskPerDay.tasks.map(
          (task: {
            taskId: string;
            title: string;
            hours: number;
            status: string;
          }) => (
            <div key={task.taskId} className="mb-2">
              <p className="text-muted-foreground">
                Horas estimadas: {task.hours ? task.hours : 0}
              </p>
              <p className="text-muted-foreground">
                Status:{" "}
                {task.status === "notStarted" ? "Não iniciado" : "Em andamento"}
              </p>
            </div>
          )
        )}
        {data.isWeekend && <p className="text-destructive mt-2">Weekend</p>}
      </div>
    );
  }
  return null;
};
