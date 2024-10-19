import { TasksResponse } from "./tasks";
export interface TemplateResponse {
    name: string;
    tasks: TasksResponse[];
}