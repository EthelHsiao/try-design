import { useState } from "react"
import { api } from "~/lib/api"
import type { FormMeta } from "~/features/forms/types"

export function useFormCreator(orgSlug?: string, unitId?: string) {
  const [showDialog, setShowDialog] = useState(false)
  const [newFormTitle, setNewFormTitle] = useState("")
  const [newFormDescription, setNewFormDescription] = useState("")
  const [loading, setLoading] = useState(false)

  const handleAdd = async (onAdd?: (form: FormMeta) => void) => {
    if (!newFormTitle.trim()) return
    if (!orgSlug || !unitId) {
      const id = crypto.randomUUID()
      const form: FormMeta = {
        id,
        title: newFormTitle,
        status: "draft",
        updatedAt: new Date().toISOString().slice(0, 10)
      }
      onAdd?.(form)
      setNewFormTitle("")
      setShowDialog(false)
      return
    }
    setLoading(true)
    try {
      const requestBody = {
        title: newFormTitle,
        description: newFormDescription || "請填寫表單內容"
      }
      const newForm = await api<any>(
        `/api/orgs/${orgSlug}/units/${unitId}/forms`,
        {
          method: "POST",
          body: requestBody
        }
      )
      const convertedForm: FormMeta = {
        id: newForm.ID,
        title: newForm.Title,
        status: "draft",
        updatedAt: new Date(newForm.UpdatedAt).toISOString().slice(0, 10)
      }
      onAdd?.(convertedForm)
      setNewFormTitle("")
      setNewFormDescription("")
      setShowDialog(false)
    } catch (error) {
      console.error('Failed to create form:', error)
    } finally {
      setLoading(false)
    }
  }

  return {
    showDialog,
    setShowDialog,
    newFormTitle,
    setNewFormTitle,
    newFormDescription,
    setNewFormDescription,
    loading,
    handleAdd
  }
} 