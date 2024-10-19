import { Card, CardContent } from "@/components/ui/card";
import { TemplateResponse } from "@/services/templates";
interface TemplateCardProps {
    data: TemplateResponse
}

export const TemplateCard = ({ data }: TemplateCardProps) => {
  return (
    <Card className="overflow-hidden border-0 shadow-lg w-[300px] h-[250px]">
      <CardContent className="pt-4">
        <div className="flex border-primary border rounded-xl w-full h-[150px]">
        </div>
        <div className="p-4">
          <div className="text-lg font-semibold text-center text-gray-500">
            MEL
          </div>
          <div className="text-sm text-gray-500 text-center">{data.name}</div>
        </div>
      </CardContent>
    </Card>
  );
};
