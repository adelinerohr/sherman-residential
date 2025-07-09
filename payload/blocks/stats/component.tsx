import { cn } from "@/lib/utils";
import type { StatsBlock as StatsBlockProps } from "@/payload-types";

export function StatsBlock({ boxOne, boxTwo, boxThree }: StatsBlockProps) {
  return (
    <div className="container grid grid-cols-1 sm:grid-cols-3 gap-8">
      <StatBlock className="bg-primary" {...boxOne} />
      <StatBlock className="bg-secondary" {...boxTwo} />
      <StatBlock className="bg-accent" {...boxThree} />
    </div>
  );
}

export function StatBlock({
  className,
  title,
  subTitle,
}: {
  className: string;
  title: string;
  subTitle: string;
}) {
  return (
    <div
      className={cn(
        "p-6 sm:p-10 flex flex-col gap-1 items-start justify-center text-primary-foreground",
        className
      )}
    >
      <div className="text-4xl sm:text-7xl font-display font-medium">
        {title}
      </div>
      <div className="text-xl font-medium">{subTitle}</div>
    </div>
  );
}
