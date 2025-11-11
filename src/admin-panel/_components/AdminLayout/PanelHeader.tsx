import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface PanelHeaderProps {
  title: string;
  description?: string;
  backLink?: {
    to: string;
    label: string;
  };
  action?: ReactNode;
}

export const PanelHeader = ({
  title,
  description,
  backLink,
  action,
}: PanelHeaderProps) => {
  return (
    <div className="mb-6 sm:mb-8">
      {backLink && (
        <div className="mb-4">
          <Link
            to={backLink.to}
            className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {backLink.label}
          </Link>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
            {title}
          </h2>
          {description && (
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              {description}
            </p>
          )}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
    </div>
  );
};
