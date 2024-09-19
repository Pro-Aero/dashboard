"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
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
import { WeeklyAvailability } from "@/@types";

const chartConfig = {
  azul: {
    label: "Azul",
    color: "#0E2BC0",
  },
  cinza: {
    label: "Cinza",
    color: "#909F93",
  },
} satisfies ChartConfig;

interface Props {
  weeklyAvailability: WeeklyAvailability;
}

export default function ChartAvailabilityTask({ weeklyAvailability }: Props) {
  const chartData = [
    {
      categoria: "Horas ocupado",
      label: "Ocupado",
      valor: weeklyAvailability.hoursOccupied,
      fill: chartConfig.cinza.color,
    },

    {
      categoria: "Horas ocioso",
      label: "Ocioso",
      valor: weeklyAvailability.hoursRemaining,
      fill: chartConfig.azul.color,
    },
  ];
  const totalValue = chartData.reduce((sum, item) => sum + item.valor, 0);
  return (
    <Card className="flex flex-col h-[450px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Disponibilidade de Horas</CardTitle>
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
              nameKey="label"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="grid grid-cols-2 gap-4 w-full">
          {chartData.map((item) => (
            <div key={item.categoria} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: item.fill }}
              ></div>
              <span className="capitalize">{item.categoria}:</span>
              <span className="font-bold">
                {Math.round((item.valor / totalValue) * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}