import { BotIcon } from "lucide-react";

export function Title({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
        <BotIcon className="w-6 h-6 text-white" />
      </div>
      <h2 className="text-base font-medium">{title}</h2>
    </div>
  );
}
