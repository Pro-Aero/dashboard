"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export interface TasksSummary {
  totalTasks: number;
  taskCountsByStatus: {
    notStarted: number;
    inProgress: number;
    completed: number;
    nextOverdue: number;
    overdue: number;
  };
}

export const description =
  "Um gráfico de pizza mostrando a prioridade das tarefas";

const chartConfig = {
  value: {
    label: "Status",
  },
  not_started: {
    label: "Não iniciado",
    color: "#000000", // amarelo
  },
  next_overdue: {
    label: "Próximo de vencer",
    color: "#fa8415", // amarelo
  },
  in_progress: {
    label: "Em progresso",
    color: "#3b82f6", // azul
  },
  overdue: {
    label: "Atrasado",
    color: "#ef4444", // vermelho
  },
} satisfies ChartConfig;

interface Props {
  statusSummary: TasksSummary;
}

export default function ChartStatusTask({ statusSummary }: Props) {
  const chartData = [
    {
      categoria: "Não iniciado",
      valor: statusSummary.taskCountsByStatus.notStarted,
      fill: chartConfig.not_started.color,
    },
    {
      categoria: "Atrasado",
      valor: statusSummary.taskCountsByStatus.overdue,
      fill: chartConfig.overdue.color,
    },
    {
      categoria: "Próximo de vencer",
      valor: statusSummary.taskCountsByStatus.nextOverdue,
      fill: chartConfig.next_overdue.color,
    },
    {
      categoria: "Em progresso",
      valor: statusSummary.taskCountsByStatus.inProgress,
      fill: chartConfig.in_progress.color,
    },
  ];

  const totalValue = statusSummary.totalTasks;

  return (
    <Card className="flex flex-col h-[450px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Status das tarefas</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="valor"
              nameKey="categoria"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm mt-4">
        <div className="grid grid-cols-2 gap-4 w-full">
          {chartData.map((item) => (
            <div key={item.categoria} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: item.fill }}
              ></div>
              <span className="capitalize">{item.categoria}:</span>
              <span className="font-bold">
                {item.valor
                  ? ((item.valor / totalValue) * 100).toFixed(1)
                  : "0.0"}
                %
              </span>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
