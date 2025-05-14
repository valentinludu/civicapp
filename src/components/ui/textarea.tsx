import * as React from "react";
import * as Form from "@radix-ui/react-form";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  description?: string;
  error?: string;
  name: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, description, error, name, ...props }, ref) => {
    return (
      <Form.Field className="w-full" name={name}>
        {label && (
          <Form.Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </Form.Label>
        )}
        <Form.Control asChild>
          <textarea
            className={cn(
              "flex min-h-[400px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            ref={ref}
            {...props}
          />
        </Form.Control>
        {description && (
          <div className="text-xs text-muted-foreground mt-1">
            {description}
          </div>
        )}
        <Form.Message
          className="text-xs text-destructive mt-1"
          match="valueMissing"
        >
          {error || `${label || name} is required`}
        </Form.Message>
      </Form.Field>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
