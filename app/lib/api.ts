// const BASE_URL = "https://pr-17.core-system.sdc.nycu.club"

export interface ApiOptions {
  method?: string
  headers?: Record<string, string>
  body?: any
}

export async function api<T>(path: string, options: ApiOptions = {}): Promise<T> {
  try {
    const response = await fetch(`${path}`, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      ...(options.body ? { body: JSON.stringify(options.body) } : {})
    })
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API error: ${response.status} ${errorText}`)
    }
        // 檢查回應是否為空
    const contentType = response.headers.get('content-type')
    const contentLength = response.headers.get('content-length')
    
    // 如果回應為空或沒有內容，直接返回空物件
    if (response.status === 204) {
      return {} as T
    }
    return await response.json()
  } catch (err) {
    // 可以根據需要log或上報
    throw err
  }
} 