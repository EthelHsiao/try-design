// app/constants/forms.ts
import type { Status, QuestionType } from "~/types/forms"

// 狀態對應顯示文字
export const statusLabel: Record<Status, string> = {
  draft: "Draft",
  published: "Published",
}

// 狀態對應顏色 class
export const statusColor: Record<Status, string> = {
  draft: "bg-muted text-muted-foreground",
  published: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
}

// 問題型別對應顯示文字
export const questionTypeLabel: Record<QuestionType, string> = {
  short_text: "Short Text",
  long_text: "Long Text",
  single_choice: "Single Choice",
  multiple_choice: "Multiple Choice",
  date: "Date",
}

// 問題型別下拉選單用的 options
export const questionTypes: { value: QuestionType, label: string }[] = [
  { value: "short_text", label: "Short Text" },
  { value: "long_text", label: "Long Text" },
  { value: "single_choice", label: "Single Choice" },
  { value: "multiple_choice", label: "Multiple Choice" },
  { value: "date", label: "Date" },
]