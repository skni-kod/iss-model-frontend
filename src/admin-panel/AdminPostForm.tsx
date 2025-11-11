import {
  usePostForm,
  PostFormHeader,
  BasicFields,
  ContentEditor,
  MetaFields,
  TagsManager,
  FormActions,
} from "./_components/AdminPostForm";

const AdminPostForm = () => {
  const {
    form,
    watchedValues,
    isEdit,
    newTag,
    setNewTag,
    addTag,
    removeTag,
    onSubmit,
  } = usePostForm();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = form;

  return (
    <div className="max-w-full overflow-x-hidden">
      <PostFormHeader isEdit={isEdit} />

      <div className="grid gap-6 sm:gap-8 grid-cols-1">
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-6"
          >
            <BasicFields register={register} errors={errors} />

            <ContentEditor
              content={watchedValues.content}
              setValue={setValue}
              errors={errors}
            />

            <MetaFields register={register} errors={errors} />

            <TagsManager
              tags={watchedValues.tags}
              newTag={newTag}
              setNewTag={setNewTag}
              addTag={addTag}
              removeTag={removeTag}
              errors={errors}
            />

            <FormActions isSubmitting={isSubmitting} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPostForm;
