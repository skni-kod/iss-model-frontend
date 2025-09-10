import { Link } from "react-router-dom";
import { Save } from "lucide-react";

interface FormActionsProps {
  isSubmitting: boolean;
}

export const FormActions = ({ isSubmitting }: FormActionsProps) => {
  return (
    <div className="flex items-center justify-end space-x-4 pt-6 border-t">
      <Link
        to="/admin/posts"
        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
      >
        Anuluj
      </Link>
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        <Save className="w-4 h-4 mr-2" />
        {isSubmitting ? "Zapisuję..." : "Zapisz post"}
      </button>
    </div>
  );
};
