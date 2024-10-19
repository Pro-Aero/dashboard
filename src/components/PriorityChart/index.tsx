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
  taskCountsByPriority: {
    low: number;
    medium: number;
    important: number;
    urgent: number;
  };
}

export const description =
  "Um gráfico de pizza mostrando a prioridade das tarefas";

const chartConfig = {
  value: {
    label: "Tarefas",
  },
  low: {
    label: "Baixa",
    color: "#22c55e", // verde
  },
  medium: {
    label: "Média",
    color: "#facc15", // amarelo
  },
  important: {
    label: "Importante",
    color: "#3b82f6", // azul
  },
  urgent: {
    label: "Urgente",
    color: "#ef4444", // vermelho
  },
} satisfies ChartConfig;

interface Props {
  tasksSummary: TasksSummary;
}

export default function ChartPriorityTask({ tasksSummary }: Props) {
  const chartData = [
    {
      categoria: "Baixa",
      valor: tasksSummary.taskCountsByPriority.low,
      fill: chartConfig.low.color,
    },
    {
      categoria: "Média",
      valor: tasksSummary.taskCountsByPriority.medium,
      fill: chartConfig.medium.color,
    },
    {
      categoria: "Importante",
      valor: tasksSummary.taskCountsByPriority.important,
      fill: chartConfig.important.color,
    },
    {
      categoria: "Urgente",
      valor: tasksSummary.taskCountsByPriority.urgent,
      fill: chartConfig.urgent.color,
    },
  ];

  const totalValue = tasksSummary.totalTasks;

  return (
    <Card className="flex flex-col h-[450px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Prioridade das tarefas</CardTitle>
        <CardDescription>
          Total de tarefas restantes: {totalValue}
        </CardDescription>
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
