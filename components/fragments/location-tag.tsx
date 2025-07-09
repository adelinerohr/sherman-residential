import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

type LocationTagProps = {
  city: string;
  stateCode?: string;
  className?: string;
};

export function LocationTag({ city, stateCode, className }: LocationTagProps) {
  return (
    <div
      className={cn(
        "border rounded-full flex items-center gap-1 px-2 py-1 bg-white",
        className
      )}
    >
      <MapPin strokeWidth={2} className="size-3 text-primary" />
      <span className="text-xs text-primary">
        {city}
        {stateCode && `, ${stateCode}`}
      </span>
    </div>
  );
}
