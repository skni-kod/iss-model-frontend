import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { PostFormData } from "../hooks/usePostForm";

interface MetaFieldsProps {
  register: UseFormRegister<PostFormData>;
  errors: FieldErrors<PostFormData>;
}

export const MetaFields = ({ register, errors }: MetaFieldsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      <div>
        <label
          htmlFor="author"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Autor *
        </label>
        <input
          {...register("author")}
          type="text"
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {errors.author && (
          <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="publishDate"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Data publikacji *
        </label>
        <input
          {...register("publishDate")}
          type="date"
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {errors.publishDate && (
          <p className="mt-1 text-sm text-red-600">
            {errors.publishDate.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="readTime"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Czas czytania *
        </label>
        <input
          {...register("readTime")}
          type="text"
          placeholder="np. 5 min"
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {errors.readTime && (
          <p className="mt-1 text-sm text-red-600">{errors.readTime.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          URL obrazu głównego *
        </label>
        <input
          {...register("image")}
          type="url"
          placeholder="https://example.com/image.jpg"
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {errors.image && (
          <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
        )}
      </div>
    </div>
  );
};
