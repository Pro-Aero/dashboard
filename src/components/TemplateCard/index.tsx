import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TemplateResponse } from "@/services/templates";
import { Dropdown } from "./Dropdown";
import { ModalExecuteTemplate } from "./Dropdown/execute-template";
import { UserResponse } from "@/services/users";
import { PlannerResponse } from "@/services/planners";
interface Props {
  template: TemplateResponse;
  users: UserResponse[];
  planners: PlannerResponse[];
}

export const TemplateCard = ({ template, users, planners }: Props) => {
  return (
    <Card className="overflow-hidden border shadow-lg w-[300px] h-[200px]">
      <CardContent className="pt-4">
        <div className="flex flex-row justify-between items-center">
          <ModalExecuteTemplate
            templateData={template}
            users={users}
            planners={planners}
          />
          <Dropdown templateId={template.id} templateData={template} />
        </div>
        <div className="flex flex-col gap-1">
          {template.tasks.slice(0, 5).map((item, index) => (
            <div className="text-base text-gray-500" key={index}>
              {item.title}
            </div>
          ))}
          <div className="text-base text-gray-500 ">...</div>
        </div>
      </CardContent>
    </Card>
  );
};
