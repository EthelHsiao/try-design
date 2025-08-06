import { useFormManager } from "~/features/forms/hooks/useFormManager"
import { FormListCard } from "~/features/forms/components/FormListCard"
import { NewFormDialog } from "~/features/forms/components/NewFormDialog"
import { FormBuilder } from "~/features/forms/components/FormBuilder"

export default function PublishFormView() {
  // 你需要從路由參數或context取得這些值
  // 這裡先使用範例值，你可以根據實際情況修改
  const orgSlug = "hitcon" // 從路由參數取得
  const unitId = "7594090c-f318-4488-b11f-1c292706f5ef"   // 從路由參數取得
  const userId = "f68cfdbc-68be-4a76-ad22-3c6958cf3fb2" // 你可以隨時改動這個ID
  
  const {
    forms,
    openEditor,
    showDialog,
    newFormTitle,
    newFormDescription,
    editForm,
    loading,
    isLoggedIn,
    setShowDialog,
    setNewFormTitle,
    setNewFormDescription,
    setEditForm,
    setOpenEditor,
    handleAdd,
    handleEdit,
    handleDelete,
    handleUpdateForm,
  } = useFormManager([], orgSlug, unitId, userId)

  return (
    <div className="flex flex-col gap-8">
      {!openEditor && (
        <>
          <FormListCard
            forms={forms}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onNewForm={() => setShowDialog(true)}
            loading={loading}
          />
          <NewFormDialog
            open={showDialog}
            onOpenChange={setShowDialog}
            title={newFormTitle}
            description={newFormDescription}
            onTitleChange={setNewFormTitle}
            onDescriptionChange={setNewFormDescription}
            onCreate={handleAdd}
            loading={loading}
          />
        </>
      )}
      {openEditor && (
        <FormBuilder
          form={editForm}
          onBack={() => setOpenEditor(null)}
          onUpdate={handleUpdateForm}
        />
      )}
    </div>
  )
}
