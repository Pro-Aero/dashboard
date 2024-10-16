// "use client";

// import { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { TeamWorkedHoursProps } from "@/@types";

// const DAYS_IN_WEEK = 7;
// const WEEKS_TO_SHOW = 52;

// const WEEKDAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

// interface Props {
//   teamData: TeamWorkedHoursProps[];
// }

// export default function Timeline({ teamData }: Props) {
//   const [startDate, setStartDate] = useState(new Date());

//   useEffect(() => {
//     let earliestDate = new Date();
//     teamData.forEach((member) => {
//       Object.keys(member.tasksPerDays).forEach((dateString) => {
//         const date = new Date(dateString);
//         if (date < earliestDate) {
//           earliestDate = date;
//         }
//       });
//     });

//     const adjustedDate = new Date(earliestDate);
//     adjustedDate.setDate(
//       adjustedDate.getDate() - ((adjustedDate.getDay() + 6) % 7)
//     );
//     setStartDate(adjustedDate);
//   }, [teamData]);

//   const generateDates = () => {
//     const dates = [];
//     let currentDate = new Date(startDate);

//     for (let i = 0; i < WEEKS_TO_SHOW * DAYS_IN_WEEK; i++) {
//       dates.push(new Date(currentDate));
//       currentDate.setDate(currentDate.getDate() + 1);
//     }
//     return dates;
//   };

//   const formatDate = (date: Date) => {
//     return `${date.getDate().toString().padStart(2, "0")}/${(
//       date.getMonth() + 1
//     )
//       .toString()
//       .padStart(2, "0")}`;
//   };

//   const dates = generateDates();

//   const groupDatesByMonth = () => {
//     const months: { [key: string]: Date[] } = {};
//     dates.forEach((date) => {
//       const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
//       if (!months[monthKey]) {
//         months[monthKey] = [];
//       }
//       months[monthKey].push(date);
//     });
//     return months;
//   };

//   const monthsData = groupDatesByMonth();

//   return (
//     <div className="container mx-auto p-4 overflow-x-auto">
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead className="sticky left-0 bg-white z-20">
//               Colaborador
//             </TableHead>
//             {Object.entries(monthsData).map(([monthKey, dates]) => (
//               <TableHead
//                 key={monthKey}
//                 colSpan={dates.length}
//                 className="text-center border-l border-gray-200"
//               >
//                 {dates[0].toLocaleString("pt-BR", {
//                   month: "long",
//                   year: "numeric",
//                 })}
//               </TableHead>
//             ))}
//           </TableRow>
//           <TableRow>
//             <TableHead className="sticky left-0 bg-white z-20"></TableHead>
//             {dates.map((date, index) => (
//               <TableHead
//                 key={index}
//                 className={`px-1 py-2 text-xs ${
//                   date.getDay() === 1 ? "border-l border-gray-200" : ""
//                 }`}
//               >
//                 <div>
//                   {WEEKDAYS[date.getDay() === 0 ? 6 : date.getDay() - 1]}
//                 </div>
//                 <div>{formatDate(date)}</div>
//               </TableHead>
//             ))}
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {teamData.map((member) => (
//             <TableRow key={member.userId}>
//               <TableCell className="sticky left-0 bg-white z-10 font-medium">
//                 {member.userName}
//               </TableCell>
//               {dates.map((date, index) => {
//                 const hours = getHoursForDate(member.userId, date);
//                 return (
//                   <TableCell
//                     key={index}
//                     className={`px-1 py-2 text-center ${
//                       date.getDay() === 1 ? "border-l border-gray-200" : ""
//                     } ${
//                       date.getDay() === 0
//                         ? "bg-blue-100"
//                         : date.getDay() === 6
//                         ? "bg-green-100"
//                         : ""
//                     }`}
//                   >
//                     {hours}
//                   </TableCell>
//                 );
//               })}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const DAYS_IN_WEEK = 7;
const WEEKS_TO_SHOW = 52;

const WEEKDAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "L", "T"];

export interface TeamWorkedHoursProps {
  userId: string;
  userName: string;
  tasksPerDays: {
    [date: string]: {
      totalHours: number;
      tasks: TasksTeamWorkedProps[];
      isWeekend: boolean;
      availableHours: number;
      workedHours: number;
    };
  };
}

export interface TasksTeamWorkedProps {
  taskId: string;
  title: string;
  hours: number;
  status: string;
}

interface Props {
  teamData: TeamWorkedHoursProps[];
}

export default function Timeline({ teamData }: Props) {
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    let earliestDate = new Date();
    teamData.forEach((member) => {
      Object.keys(member.tasksPerDays).forEach((dateString) => {
        const date = new Date(dateString);
        if (date < earliestDate) {
          earliestDate = date;
        }
      });
    });

    const adjustedDate = new Date(earliestDate);
    adjustedDate.setDate(
      adjustedDate.getDate() - ((adjustedDate.getDay() + 6) % 7)
    );
    setStartDate(adjustedDate);
  }, [teamData]);

  const generateDates = () => {
    const dates = [];
    let currentDate = new Date(startDate);

    for (let i = 0; i < WEEKS_TO_SHOW * DAYS_IN_WEEK; i++) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const formatDate = (date: Date) => {
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}`;
  };

  const dates = generateDates();

  const groupDatesByMonth = () => {
    const months: { [key: string]: Date[] } = {};
    dates.forEach((date) => {
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
      if (!months[monthKey]) {
        months[monthKey] = [];
      }
      months[monthKey].push(date);
    });
    return months;
  };

  const monthsData = groupDatesByMonth();

  const getHoursAndTasks = (
    userId: string,
    date: Date
  ): { hours: number; tasks: TasksTeamWorkedProps[] } => {
    const member = teamData.find((m) => m.userId === userId);
    if (!member) return { hours: 0, tasks: [] };

    const adjustedDate = new Date(date);
    adjustedDate.setDate(adjustedDate.getDate() - 1);

    const dateString = adjustedDate.toISOString().split("T")[0];
    const dayData = member.tasksPerDays[dateString];

    if (!dayData) return { hours: 0, tasks: [] };

    return { hours: dayData.totalHours, tasks: dayData.tasks };
  };

  return (
    <div className="container mx-auto p-4 overflow-x-auto">
      <TooltipProvider>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="sticky left-0 bg-white z-20">
                Colaboradores
              </TableHead>
              {Object.entries(monthsData).map(([monthKey, dates]) => (
                <TableHead
                  key={monthKey}
                  colSpan={dates.length}
                  className="text-center border-l border-gray-200"
                >
                  {dates[0].toLocaleString("pt-BR", {
                    month: "long",
                    year: "numeric",
                  })}
                </TableHead>
              ))}
            </TableRow>
            <TableRow>
              <TableHead className="sticky left-0 bg-white z-20"></TableHead>
              {dates.map((date, index) => (
                <TableHead
                  key={index}
                  className={`px-1 py-2 text-xs ${
                    date.getDay() === 1 ? "border-l border-gray-200" : ""
                  }`}
                >
                  <div>
                    {WEEKDAYS[date.getDay() === 0 ? 6 : date.getDay() - 1]}
                  </div>
                  <div>{formatDate(date)}</div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamData.map((member) => (
              <TableRow key={member.userId}>
                <TableCell className="sticky left-0 bg-white z-10 font-medium">
                  {member.userName}
                </TableCell>
                {dates.map((date, index) => {
                  const { hours, tasks } = getHoursAndTasks(
                    member.userId,
                    date
                  );
                  console.log(tasks.map((task) => task));
                  return (
                    <TableCell
                      key={index}
                      className={`px-1 py-2 text-center ${
                        date.getDay() === 1 ? "border-l border-gray-200" : ""
                      } ${
                        date.getDay() === 0
                          ? "bg-blue-100"
                          : date.getDay() === 6
                          ? "bg-green-100"
                          : ""
                      }`}
                    >
                      {hours > 0 ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="cursor-help">{hours}</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            {tasks.map((task, taskIndex) => (
                              <div key={taskIndex}>
                                <strong>
                                  {task ? task.title : "Tarefa..."}
                                </strong>
                                :{" "}
                                {task.status === "NotStarted"
                                  ? "Não iniciado"
                                  : task.status === "Overdue"
                                  ? "Atrasada"
                                  : task.status === "Completed"
                                  ? "Completo"
                                  : "Em andamento"}
                              </div>
                            ))}
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        hours
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TooltipProvider>
    </div>
  );
}
