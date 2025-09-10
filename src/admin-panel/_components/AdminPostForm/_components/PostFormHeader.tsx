import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface PostFormHeaderProps {
  isEdit: boolean;
}

export const PostFormHeader = ({ isEdit }: PostFormHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center space-x-4">
        <Link
          to="/admin/posts"
          className="flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Powrót do listy postów
        </Link>
        <div className="h-6 w-px bg-gray-300"></div>
        <h2 className="text-2xl font-bold text-gray-900">
          {isEdit ? "Edytuj post" : "Nowy post"}
        </h2>
      </div>
    </div>
  );
};
