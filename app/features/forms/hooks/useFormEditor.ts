import { useState } from "react"
import type { FormMeta, Question } from "~/features/forms/types"

export function useFormEditor() {
  const [openEditor, setOpenEditor] = useState<null | string>(null)
  const [editForm, setEditForm] = useState<{
    id: string
    title: string
    description: string
    questions: Question[]
  }>({
    id: "",
    title: "",
    description: "",
    questions: []
  })

  const handleEdit = (form: FormMeta) => {
    setEditForm({
      id: form.id,
      title: form.title,
      description: "為了統一製作制服與安排餐點，請填寫以下資訊。若有特殊需求請於下方備註欄說明。",
      questions: [
        {
          id: "q1",
          type: "short_text",
          title: "姓名",
        },
        {
          id: "q2",
          type: "single_choice",
          title: "制服尺寸",
          options: ["XS", "S", "M", "L", "XL", "2XL", "其他"],
        },
        {
          id: "q3",
          type: "single_choice",
          title: "飲食需求",
          options: ["葷食", "素食", "特殊過敏需求"],
        },
        {
          id: "q4",
          type: "long_text",
          title: "備註（選填）",
        },
      ],
    })
    setOpenEditor(form.id)
  }

  const handleUpdateForm = (updatedForm: {
    id: string
    title: string
    description: string
    questions: Question[]
  }) => {
    setEditForm(updatedForm)
  }

  return { openEditor, setOpenEditor, editForm, setEditForm, handleEdit, handleUpdateForm }
} 