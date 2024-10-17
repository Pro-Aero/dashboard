"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { hoursProjectsProps } from "@/@types";

const chartConfig = {
  desktop: {
    color: "#1B2476",
  },
} satisfies ChartConfig;

interface Props {
  hoursProjects: hoursProjectsProps[];
}

export function Component({ hoursProjects }: Props) {
  const sortedData = [...hoursProjects]
    .sort((a, b) => b.totalHours - a.totalHours)
    .slice(0, 10);

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[300px] w-full"
    >
      <BarChart
        accessibilityLayer
        data={sortedData}
        margin={{
          top: 40,
          right: 20,
          left: 40,
          bottom: 60,
        }}
        width={400}
        height={300}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="title"
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
        <ChartTooltip
          cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
          content={<CustomTooltip />}
        />
        <Bar
          dataKey="totalHours"
          barSize={40}
          fill="var(--color-desktop)"
          radius={16}
        >
          <LabelList
            dataKey="totalHours"
            position="top"
            offset={12}
            className="fill-foreground"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}

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

// Custom tooltip component
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background border border-border p-2 rounded shadow">
        <p className="font-semibold">{data.title}</p>
        <p>Total de horas: {data.totalHours}</p>
      </div>
    );
  }
  return null;
};
