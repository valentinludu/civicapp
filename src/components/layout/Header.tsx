import { Box } from "@radix-ui/themes";
import { Button } from "../ui/button";
import { ArrowLeft, InfoIcon } from "lucide-react";

export function StickyHeader({
  title,
  onBack,
}: {
  title: string;
  onBack?: () => void;
}) {
  return (
    <Box className="fixed top-0 left-0 right-0 bg-white z-50 mx-4 px-4 rounded-b-lg">
      <div className="h-16 flex justify-between items-center">
        {onBack && (
          <Button variant="ghost" onClick={onBack} className="p-2 -ml-2">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        )}
        <h1 className="text-lg font-semibold">{title}</h1>
        <Button variant="ghost" size="icon" className="ml-2">
          <InfoIcon className="h-5 w-5" />
        </Button>
      </div>
    </Box>
  );
}
