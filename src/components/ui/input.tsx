import * as React from "react";
import * as Form from "@radix-ui/react-form";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
  name: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  type?: string;
  onRightIconClick?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      description,
      error,
      name,
      icon,
      rightIcon,
      onRightIconClick,
      type = "text",
      ...props
    },
    ref
  ) => {
    return (
      <Form.Field className="w-full" name={name}>
        {label && (
          <Form.Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </Form.Label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
              {icon}
            </div>
          )}
          {rightIcon && (
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={onRightIconClick}
            >
              {rightIcon}
            </div>
          )}
          <Form.Control asChild>
            <input
              className={cn(
                "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                icon && "pl-10",
                rightIcon && "pr-10",
                className
              )}
              ref={ref}
              {...props}
            />
          </Form.Control>
        </div>
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
Input.displayName = "Input";

export { Input };
