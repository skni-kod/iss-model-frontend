import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { PostFormData } from "../hooks/usePostForm";

interface BasicFieldsProps {
  register: UseFormRegister<PostFormData>;
  errors: FieldErrors<PostFormData>;
}

export const BasicFields = ({ register, errors }: BasicFieldsProps) => {
  return (
    <>
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Tytuł posta *
        </label>
        <input
          {...register("title")}
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Wprowadź tytuł posta..."
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="excerpt"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Krótki opis (excerpt) *
        </label>
        <textarea
          {...register("excerpt")}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Krótki opis posta, który będzie wyświetlany na liście..."
        />
        {errors.excerpt && (
          <p className="mt-1 text-sm text-red-600">{errors.excerpt.message}</p>
        )}
      </div>
    </>
  );
};
