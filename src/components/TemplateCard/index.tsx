import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TemplateResponse } from "@/services/templates";
import { MoreHorizontal } from "lucide-react";
interface TemplateCardProps {
  data: TemplateResponse;
}

export const TemplateCard = () => {
  return (
    <Card className="w-64 shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">MEL</CardTitle>
        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            Exemplo descrição tarefa
          </p>
          <p className="text-sm font-medium">Mel 320</p>
          <p className="text-sm text-muted-foreground">
            Exemplo descrição tarefa
          </p>
          <p className="text-sm font-medium">Mel 320</p>
        </div>
      </CardContent>
    </Card>
  );
};
