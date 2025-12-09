import { Link } from "react-router-dom";
import { Save } from "lucide-react";

interface FormActionsProps {
  isSubmitting: boolean;
}

export const FormActions = ({ isSubmitting }: FormActionsProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-4 pt-4 sm:pt-6 border-t">
      <Link
        to="/admin/posts"
        className="px-4 py-2 text-center border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm sm:text-base"
      >
        Anuluj
      </Link>
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 text-sm sm:text-base"
      >
        <Save className="w-4 h-4 mr-2" />
        {isSubmitting ? "Zapisuję..." : "Zapisz post"}
      </button>
    </div>
  );
};
