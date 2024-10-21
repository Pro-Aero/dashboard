import { Card, CardContent } from "@/components/ui/card";
import { TemplateResponse } from "@/services/templates";
import { Dropdown } from "./Dropdown"
interface Props {
  template: TemplateResponse[];
}

export const TemplateCard = ({ template }: Props) => {
  return (
    <Card className="overflow-hidden border shadow-lg w-[300px] h-[200px]">
      <CardContent className="pt-4">
        <div className="flex flex-row justify-between items-center">
          <div className="text-2xl font-semibold text-black">
            { template.title }
          </div>
          <Dropdown/>
        </div>
        <div className="flex flex-col gap-1">
          {template.slice(0,5).map((item, index) => (
          <div className="text-base text-gray-500 " key={index}>
              {item.tasks.description}
          </div>
        ))}
          <div className="text-base text-gray-500 ">...</div>
        </div>
      </CardContent>
    </Card>
  );
};
