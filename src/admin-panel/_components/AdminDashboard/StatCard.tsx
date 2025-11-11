import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  link: string;
}

const StatCard = ({ title, value, icon: Icon, color, link }: StatCardProps) => {
  return (
    <Link
      to={link}
      className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border hover:shadow-md transition-shadow"
    >
      <div className="flex items-center">
        <div className={`p-2 sm:p-3 rounded-lg ${color} flex-shrink-0`}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <div className="ml-3 sm:ml-4 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
            {title}
          </p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </Link>
  );
};

export default StatCard;
