"use client";

import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const description = "A scrollable bar chart with labels";

const chartConfig = {
  desktop: {
    color: "#1B2476",
  },
} satisfies ChartConfig;

interface ListUsersProps {
  displayName: string;
  busyHours: number;
}

interface Props {
  listUsers: ListUsersProps[];
}

export function AvailabilityEmployee({ listUsers }: Props) {
  const [chartWidth, setChartWidth] = useState(0);
  const [activeBar, setActiveBar] = useState<ListUsersProps | null>(null);

  const sortedData = [...listUsers]
    .sort((a, b) => b.busyHours - a.busyHours)
    .slice(0, 15);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-2 rounded shadow-md">
          <p className="text-sm font-semibold">
            {payload[0].payload.displayName}
          </p>
          <p className="text-sm">{`Horas ocupadas: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="flex flex-col h-[550px]">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center text-center">
            <span>Distribuição de horas por funcionário</span>
            <div className="ml-auto">
              <ArrowRight className="size-6" />
            </div>
          </div>
        </CardTitle>
        <Separator className="w-full h-px bg-gray-300 mt-2" />
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="h-[450px]"
          style={{ width: `${chartWidth}px`, minWidth: "100%" }}
        >
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={sortedData}
              margin={{
                top: 40,
                right: 20,
                left: 20,
                bottom: 120,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="displayName"
                tickLine={false}
                axisLine={false}
                tick={CustomXAxisTick}
                interval={0}
              />
              <YAxis
                axisLine={false}
                tickLine={true}
                tickCount={5}
                domain={[0, "dataMax"]}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="busyHours"
                barSize={30}
                fill="var(--color-desktop)"
                radius={16}
                onMouseEnter={(data) => setActiveBar(data)}
                onMouseLeave={() => setActiveBar(null)}
              >
                <LabelList
                  dataKey="busyHours"
                  position="top"
                  offset={12}
                  className="fill-foreground font-semibold"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

// Custom component for X-axis labels
const CustomXAxisTick = ({ x, y, payload }: any) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#888"
        fontSize={12}
        transform="rotate(-45)"
      >
        {payload.value}
      </text>
    </g>
  );
};
