import { useState, useEffect } from "react"
import type { FormMeta, Question } from "~/features/forms/types"
import { api } from "~/lib/api"

// API相關的類型定義
interface FormResponse {
  ID: string
  Title: string
  Description: string
  UnitID: string
  LastEditor: string
  CreatedAt: string
  UpdatedAt: string
}

interface LoginRequest {
  uid: string
}

interface LoginResponse {
  message: string
}

interface CreateFormRequest {
  title: string
  description: string
}

interface CreateFormResponse {
  ID: string
  Title: string
  Description: string
  UnitID: string
  LastEditor: string
  CreatedAt: string
  UpdatedAt: string
}

export function useFormManager(
  initialForms: FormMeta[] = [],
  orgSlug?: string,
  unitId?: string,
  userId?: string
) {
  const [forms, setForms] = useState<FormMeta[]>(initialForms)
  const [openEditor, setOpenEditor] = useState<null | string>(null)
  const [showDialog, setShowDialog] = useState(false)
  const [newFormTitle, setNewFormTitle] = useState("")
  const [newFormDescription, setNewFormDescription] = useState("")
  const [editForm, setEditForm] = useState({
    id: "",
    title: "",
    description: "",
    questions: [] as Question[],
  })
  const [loading, setLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // 登入功能 - 使用傳入的userId，如果沒有則使用預設值
  const login = async () => {
    const uid = userId || "f68cfdbc-68be-4a76-ad22-3c6958cf3fb2"
    
    try {
      const requestBody: LoginRequest = {
        uid: uid
      }
      
      const loginResponse = await api<LoginResponse>("/api/auth/login/internal", {
        method: 'POST',
        body: requestBody
      })
      
      console.log('Login successful:', loginResponse.message)
      setIsLoggedIn(true)
      return true
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  // 載入表單列表
  const loadForms = async () => {
    if (!orgSlug || !unitId) return
    
    try {
      setLoading(true)
      const data = await api<FormResponse[]>(`/api/orgs/${orgSlug}/units/${unitId}/forms`)
      
      // 將API回應轉換為前端使用的格式
      const convertedForms: FormMeta[] = data.map((form) => ({
        id: form.ID,
        title: form.Title,
        status: "draft", // 你可能需要從API取得狀態
        updatedAt: new Date(form.UpdatedAt).toISOString().slice(0, 10)
      }))
      setForms(convertedForms)
    } catch (error) {
      console.error('Failed to load forms:', error)
    } finally {
      setLoading(false)
    }
  }

  // 在組件掛載時先登入，然後載入資料
  useEffect(() => {
    const initializeData = async () => {
      if (orgSlug && unitId) {
        // 先進行登入
        const loginSuccess = await login()
        if (loginSuccess) {
          // 登入成功後載入表單列表
          await loadForms()
        }
      }
    }
    
    initializeData()
  }, [orgSlug, unitId, userId])

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

  const handleDelete = async (id: string) => {
    if (!orgSlug || !unitId) {
      setForms((prev) => prev.filter((f) => f.id !== id))
      return
    }
    
    try {
      
      setLoading(true)
      await api(`/api/forms/${id}`, {
        method: 'DELETE'
      })
      setForms((prev) => prev.filter((f) => f.id !== id))
    } catch (error) {
      console.error('Failed to delete form:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async () => {
    if (!newFormTitle.trim()) return
    
    // 如果沒有提供API參數，使用原本的本地儲存方式
    if (!orgSlug || !unitId) {
      const id = crypto.randomUUID()
      setForms((prev) => [
        ...prev,
        {id, title: newFormTitle, status: "draft", updatedAt: new Date().toISOString().slice(0, 10)}
      ])
      setNewFormTitle("")
      setShowDialog(false)
      return
    }
    
    // 使用API創建表單
    try {
      setLoading(true)
      const requestBody: CreateFormRequest = {
        title: newFormTitle,
        description: newFormDescription || "請填寫表單內容"
      }
      
      const newForm = await api<CreateFormResponse>(`/api/orgs/${orgSlug}/units/${unitId}/forms`, {
        method: 'POST',
        body: requestBody
      })
      
      // 將API回應轉換為前端格式
      const convertedForm: FormMeta = {
        id: newForm.ID,
        title: newForm.Title,
        status: "draft",
        updatedAt: new Date(newForm.UpdatedAt).toISOString().slice(0, 10)
      }
      
      setForms((prev) => [...prev, convertedForm])
      setNewFormTitle("")
      setNewFormDescription("")
      setShowDialog(false)
    } catch (error) {
      console.error('Failed to create form:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateForm = (updatedForm: {
    id: string
    title: string
    description: string
    questions: Question[]
  }) => {
    setEditForm(updatedForm)
  }

  return {
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
  }
}
