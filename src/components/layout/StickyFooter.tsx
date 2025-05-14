"use client";

import { Loader2 } from "lucide-react";
import { Button, LinkButton } from "../ui/button";

export function StickyFooter({
  buttonText,
  onClick,
  disabled,
  href,
  loading,
  variant,
}: {
  disabled?: boolean;
  buttonText: string;
  onClick?: () => void;
  href?: string;
  loading?: boolean;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "destructive"
    | "ghost"
    | "link"
    | "default";
}) {
  return (
    <div className="w-full mx-auto">
      {href ? (
        <LinkButton
          className="w-full bg-teal-700 hover:bg-teal-800 text-white"
          href={href}
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : buttonText}
        </LinkButton>
      ) : (
        <Button
          className="w-full bg-teal-700 hover:bg-teal-800 text-white"
          onClick={onClick}
          disabled={disabled}
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : buttonText}
        </Button>
      )}
    </div>
  );
}
