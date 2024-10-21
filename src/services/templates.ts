import { TasksTemplateResponse } from "./tasks";
export interface TemplateResponse {
    title: string;
    tasks: TasksTemplateResponse[];
}