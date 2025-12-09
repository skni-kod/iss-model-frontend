import type { LucideIcon } from "lucide-react";
import StatCard from "./StatCard";

interface Stat {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  link: string;
}

interface StatsGridProps {
  stats: Stat[];
}

const StatsGrid = ({ stats }: StatsGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
          link={stat.link}
        />
      ))}
    </div>
  );
};

export default StatsGrid;
