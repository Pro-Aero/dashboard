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

interface Assignment {
  id: string;
  name: string;
}

interface Planner {
  id: string;
  title: string;
}

interface TaskInfo {
  id: string;
  bucketId: string;
  title: string;
  percentComplete: number;
  priority: number;
  startDateTime: string;
  dueDateTime: string;
  completedDateTime: string | null;
  hours: number;
  status: string;
  planner: Planner;
  assignments: Assignment[];
}

interface TaskPerDay {
  totalHours: number;
  tasks: {
    taskId: string;
    title: string;
    hours: number;
    status: string;
  }[];
  isWeekend: boolean;
}

interface Task {
  taskInfo: TaskInfo;
  taskPerDay: { [date: string]: TaskPerDay };
}

interface GanttData {
  tasks: Task[];
  totalTasksPerDay: { [date: string]: TaskPerDay };
}

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
  const [selectedUser, setSelectedUser] = useState<string>(
    searchParams.get("userId") || ""
  );
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
  }, [teamData, usersList, startDate, endDate]);

  const filteredChartData = useMemo(() => {
    if (chartData.length === 0) return [];

    const data =
      selectedUser === ""
        ? chartData
        : chartData.filter((data) => data.userName === selectedUser);

    if (selectedUser !== "") {
      return data.map((item, index) => ({
        ...item,
        y: index * 0.5 + 0.5,
      }));
    }

    return data;
  }, [chartData, selectedUser]);

  const xDomain = useMemo(() => {
    return [startDate.valueOf(), endDate.valueOf()];
  }, [startDate, endDate]);

  const yDomain = useMemo(() => {
    if (filteredChartData.length === 0) return [0, 1];
    if (selectedUser !== "") {
      return [0, Math.max(filteredChartData.length * 0.5, 1)];
    }
    const uniqueUsers: string[] = [];
    const userSet: { [key: string]: boolean } = {};
    filteredChartData.forEach((d) => {
      if (!userSet[d.userName]) {
        userSet[d.userName] = true;
        uniqueUsers.push(d.userName);
      }
    });
    return [-0.5, uniqueUsers.length - 0.5];
  }, [filteredChartData, selectedUser]);

  const formatXAxis = (tickItem: number) => {
    const date = new Date(tickItem);
    return date.toLocaleString("default", { month: "short" });
  };

  const formatYAxis = (tickItem: number) => {
    if (selectedUser !== "") return "";
    const uniqueUsers: string[] = [];
    const userSet: { [key: string]: boolean } = {};
    filteredChartData.forEach((d) => {
      if (!userSet[d.userName]) {
        userSet[d.userName] = true;
        uniqueUsers.push(d.userName);
      }
    });
    return uniqueUsers[tickItem] || "";
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
        <div className="mb-4">
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
                    ticks={Array.from({ length: 6 }, (_, i) =>
                      new Date(
                        startDate.getFullYear(),
                        startDate.getMonth() + i,
                        1
                      ).valueOf()
                    )}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    name="User"
                    domain={yDomain}
                    tickFormatter={formatYAxis}
                    stroke="hsl(var(--primary))"
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Scatter
                    name="Tasks"
                    data={filteredChartData}
                    fill="hsl(var(--primary))"
                    shape={<CustomShape />}
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

const CustomShape = (props: any) => {
  const { cx, cy, payload } = props;
  const barHeight = 22;
  const barWidth = 80;

  const color = stringToColor(payload.userName);

  return (
    <g>
      <rect
        x={cx}
        y={cy - barHeight / 2}
        width={barWidth}
        height={barHeight}
        fill={payload.isWeekend ? "hsl(var(--muted))" : color}
        rx={4}
        ry={4}
      />
    </g>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card p-4 rounded shadow-lg border border-border">
        <p className="font-bold text-lg text-primary mb-2">
          {data.userName} - {new Date(data.date).toLocaleDateString()}
        </p>
        {data.taskPerDay.tasks.map(
          (task: {
            taskId: string;
            title: string;
            hours: number;
            status: string;
          }) => (
            <div key={task.taskId} className="mb-2">
              <p className="font-semibold text-primary">{task.title}</p>
              <p className="text-muted-foreground">
                Horas: {task.hours ? task.hours : 0}
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

function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
}
