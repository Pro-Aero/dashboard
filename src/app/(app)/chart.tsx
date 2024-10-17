// "use client";

// import React, { useState, useEffect, useMemo } from "react";
// import {
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Scatter,
//   ScatterChart,
//   ResponsiveContainer,
//   Tooltip,
// } from "recharts";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// interface Task {
//   taskId: string;
//   title: string;
//   hours: number | null;
//   status: string;
// }

// interface DayData {
//   totalHours: number;
//   tasks: Task[];
//   isWeekend: boolean;
// }

// interface TasksPerDays {
//   [date: string]: DayData;
// }

// interface UserTaskData {
//   userId: string;
//   userName: string;
//   tasksPerDays: TasksPerDays;
// }

// type DataPoint = {
//   x: number;
//   y: number;
//   date: string;
//   tasks: Task[];
//   isWeekend: boolean;
//   userName: string;
// };

// interface Props {
//   teamData: UserTaskData[];
// }

// export function TeamTimelineChart({ teamData }: Props) {
//   const [chartData, setChartData] = useState<DataPoint[]>([]);
//   const [selectedUser, setSelectedUser] = useState<string>("all");

//   useEffect(() => {
//     const currentYear = new Date().getFullYear();
//     const processedData: DataPoint[] = teamData.flatMap((userData, userIndex) =>
//       Object.entries(userData.tasksPerDays).map(([date, dayData]) => ({
//         x: new Date(date).valueOf(),
//         y: userIndex + 0.5,
//         date,
//         tasks: dayData.tasks.filter((task) => task.status !== "Completed"),
//         isWeekend: dayData.isWeekend,
//         userName: userData.userName,
//       }))
//     );
//     setChartData(processedData);
//   }, [teamData]);

//   const filteredChartData = useMemo(() => {
//     const currentYear = new Date().getFullYear();
//     const startOfMay = new Date(currentYear, 4, 1).valueOf();
//     const data = chartData
//       .filter(
//         (item) =>
//           item.x >= startOfMay &&
//           item.tasks.some((task) => task.status !== "Completed")
//       )
//       .map((item) => ({
//         ...item,
//         tasks: item.tasks.filter((task) => task.status !== "Completed"),
//       }));
//     if (selectedUser !== "all") {
//       return data
//         .filter((item) => item.userName === selectedUser)
//         .map((item, index) => ({
//           ...item,
//           y: index * 0.5 + 0.5,
//         }));
//     }
//     return data;
//   }, [chartData, selectedUser]);

//   const xDomain = useMemo(() => {
//     const currentYear = new Date().getFullYear();
//     return [
//       new Date(currentYear, 4, 1).valueOf(), // May 1st
//       new Date(currentYear, 11, 31).valueOf(), // December 31st
//     ];
//   }, []);

//   const yDomain = useMemo(() => {
//     if (filteredChartData.length === 0) return [0, 1];
//     if (selectedUser !== "all") {
//       return [0, Math.max(filteredChartData.length * 0.5, 1)];
//     }
//     const uniqueUsers = [...new Set(filteredChartData.map((d) => d.userName))];
//     return [-0.5, uniqueUsers.length - 0.5];
//   }, [filteredChartData, selectedUser]);

//   const formatXAxis = (tickItem: number) => {
//     const date = new Date(tickItem);
//     return date.toLocaleString("default", { month: "short" });
//   };

//   const formatYAxis = (tickItem: number) => {
//     if (selectedUser !== "all") return "";
//     const uniqueUsers = [...new Set(filteredChartData.map((d) => d.userName))];
//     return uniqueUsers[tickItem] || "";
//   };

//   const usersWithAvailableHours = useMemo(() => {
//     return teamData
//       .filter((user) =>
//         Object.values(user.tasksPerDays).some((day) => day.totalHours > 0)
//       )
//       .map((user) => user.userName);
//   }, [teamData]);

//   return (
//     <Card className="w-full">
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold text-primary">
//           Timeline do time
//         </CardTitle>
//         <CardDescription className="text-muted-foreground">
//           {selectedUser === "all"
//             ? `Exibindo tarefas para todos os ${teamData.length} membros da equipe`
//             : `Exibindo tarefas do(a) ${selectedUser}`}
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="mb-4">
//           <Select
//             onValueChange={(value) => setSelectedUser(value)}
//             value={selectedUser}
//           >
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="Selecione um funcionário" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">Todos os funcionários</SelectItem>
//               {teamData.map((user) => (
//                 <SelectItem key={user.userId} value={user.userName}>
//                   {user.userName}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//         <ScrollArea className="w-full h-[500px] rounded-md border">
//           <div className="h-[480px] w-[2000px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <ScatterChart
//                 margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis
//                   type="number"
//                   dataKey="x"
//                   name="Date"
//                   domain={xDomain}
//                   tickFormatter={formatXAxis}
//                   stroke="hsl(var(--primary))"
//                   ticks={(() => {
//                     const [start, end] = xDomain;
//                     const startDate = new Date(start);
//                     const endDate = new Date(end);
//                     const ticks = [];
//                     for (
//                       let d = startDate;
//                       d <= endDate;
//                       d.setMonth(d.getMonth() + 1)
//                     ) {
//                       ticks.push(new Date(d).valueOf());
//                     }
//                     return ticks;
//                   })()}
//                 />
//                 <YAxis
//                   type="number"
//                   dataKey="y"
//                   name="User"
//                   domain={yDomain}
//                   tickFormatter={formatYAxis}
//                   stroke="hsl(var(--primary))"
//                 />
//                 <Tooltip content={<CustomTooltip />} />
//                 <Scatter
//                   name="Tasks"
//                   data={filteredChartData}
//                   fill="hsl(var(--primary))"
//                   shape={<CustomShape />}
//                 />
//               </ScatterChart>
//             </ResponsiveContainer>
//           </div>
//           <ScrollBar orientation="horizontal" />
//         </ScrollArea>
//         <div className="mt-4">
//           <h3 className="font-bold text-lg">
//             Usuários com carga horária disponível:
//           </h3>
//           <ul className="list-disc ml-6">
//             {usersWithAvailableHours.length > 0 ? (
//               usersWithAvailableHours.map((user) => (
//                 <li key={user} className="text-muted-foreground">
//                   {user}
//                 </li>
//               ))
//             ) : (
//               <li className="text-muted-foreground">
//                 Nenhum usuário disponível
//               </li>
//             )}
//           </ul>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// const CustomShape = (props: any) => {
//   const { cx, cy, payload } = props;
//   const barHeight = 24;
//   const barWidth = 18;

//   const color = stringToColor(payload.userName);

//   return (
//     <g>
//       <rect
//         x={cx}
//         y={cy - barHeight / 2}
//         width={barWidth}
//         height={barHeight}
//         fill={payload.isWeekend ? "hsl(var(--muted))" : color}
//         rx={4}
//         ry={4}
//       />
//     </g>
//   );
// };

// const CustomTooltip = ({ active, payload }: any) => {
//   if (active && payload && payload.length) {
//     const data = payload[0].payload;
//     return (
//       <div className="bg-card p-4 rounded shadow-lg border border-border">
//         <p className="font-bold text-lg text-primary mb-2">
//           {data.userName} - {new Date(data.date).toLocaleDateString()}
//         </p>
//         {data.tasks.map((task: Task) => (
//           <div key={task.taskId} className="mb-2">
//             <p className="font-semibold text-primary">{task.title}</p>
//             <p className="text-muted-foreground">
//               Horas: {task.hours !== null ? task.hours : 0}
//             </p>
//             <p className="text-muted-foreground">
//               Status:{" "}
//               {task.status === "NotStarted"
//                 ? "Não iniciado"
//                 : task.status === "Overdue"
//                 ? "Atrasada"
//                 : task.status === "Completed"
//                 ? "Completo"
//                 : "Em andamento"}
//             </p>
//           </div>
//         ))}
//         {data.isWeekend && <p className="text-destructive mt-2">Weekend</p>}
//       </div>
//     );
//   }
//   return null;
// };

// function stringToColor(str: string) {
//   let hash = 0;
//   for (let i = 0; i < str.length; i++) {
//     hash = str.charCodeAt(i) + ((hash << 5) - hash);
//   }
//   let color = "#";
//   for (let i = 0; i < 3; i++) {
//     const value = (hash >> (i * 8)) & 0xff;
//     color += ("00" + value.toString(16)).substr(-2);
//   }
//   return color;
// }

// export default TeamTimelineChart;
