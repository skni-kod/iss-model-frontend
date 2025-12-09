import { PanelHeader } from "../../AdminLayout";

interface PostFormHeaderProps {
  isEdit: boolean;
}

export const PostFormHeader = ({ isEdit }: PostFormHeaderProps) => {
  return (
    <PanelHeader
      title={isEdit ? "Edytuj post" : "Nowy post"}
      backLink={
        isEdit
          ? {
              to: "/admin/posts",
              label: "Powrót do listy postów",
            }
          : undefined
      }
    />
  );
};
