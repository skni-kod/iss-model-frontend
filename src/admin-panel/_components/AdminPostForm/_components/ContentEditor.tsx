import type { UseFormSetValue, FieldErrors } from "react-hook-form";
import MDEditor from "@uiw/react-md-editor";
import type { PostFormData } from "../hooks/usePostForm";

interface ContentEditorProps {
  content: string;
  setValue: UseFormSetValue<PostFormData>;
  errors: FieldErrors<PostFormData>;
}

export const ContentEditor = ({
  content,
  setValue,
  errors,
}: ContentEditorProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Treść posta *
      </label>
      <div data-color-mode="light">
        <MDEditor
          value={content || ""}
          onChange={(value) => setValue("content", value || "")}
          preview="edit"
          height={400}
        />
      </div>
      {errors.content && (
        <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
      )}
    </div>
  );
};
