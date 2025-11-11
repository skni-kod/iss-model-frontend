import type { FieldErrors } from "react-hook-form";
import { Plus, X } from "lucide-react";
import type { PostFormData } from "../hooks/usePostForm";

interface TagsManagerProps {
  tags: string[];
  newTag: string;
  setNewTag: (tag: string) => void;
  addTag: () => void;
  removeTag: (tag: string) => void;
  errors: FieldErrors<PostFormData>;
}

export const TagsManager = ({
  tags,
  newTag,
  setNewTag,
  addTag,
  removeTag,
  errors,
}: TagsManagerProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Tagi *
      </label>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-3">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
          placeholder="Dodaj tag..."
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="button"
          onClick={addTag}
          className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 sm:mr-0" />
          <span className="ml-2 sm:hidden">Dodaj tag</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags?.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-blue-100 text-blue-800"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-1.5 sm:ml-2 text-blue-600 hover:text-blue-800"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>

      {errors.tags && (
        <p className="mt-1 text-sm text-red-600">{errors.tags.message}</p>
      )}
    </div>
  );
};
