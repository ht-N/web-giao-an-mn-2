"use client"

const getApiBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname
    const protocol = window.location.protocol
    // If accessing via IP or domain other than localhost, point to the same host on port 4000
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      return `${protocol}//${hostname}:4000`
    }
  }
  return "http://localhost:4000"
}

export const API_BASE_URL = getApiBaseUrl()

export const getChemlabApiUrl = () => {
  if (process.env.NEXT_PUBLIC_CHEMLAB_API_URL) return process.env.NEXT_PUBLIC_CHEMLAB_API_URL
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname
    const protocol = window.location.protocol
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      return `${protocol}//${hostname}:5175`
    }
  }
  return "http://localhost:5175"
}

export const CHEMLAB_API_URL = getChemlabApiUrl()



// --- Authentication ---

export interface User {
  id: string
  email: string
  role: string
  full_name?: string
}

export const setAuthToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token)
  }
}

export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token')
  }
  return null
}

export const clearAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_role')
    localStorage.removeItem('user_email')
  }
}

const getHeaders = () => {
  const token = getAuthToken()
  const headers: Record<string, string> = {}

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  if (!res.ok) throw await res.json()
  return res.json()
}

export async function register(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  if (!res.ok) throw await res.json()
  return res.json()
}

// --- Helpers ---

export function getDownloadUrl(fileId: string, filePath?: string): string {
  // Return direct API link. If filePath is provided, we could use it, 
  // but our new backend uses ID for download.
  return `${API_BASE_URL}/api/lessons/download/${fileId}`
}

export function getFileViewUrl(fileId: string, filePath?: string): string {
  // For now, view URL is same as download or simplified
  return `${API_BASE_URL}/api/lessons/download/${fileId}`
}

export async function getRelatedFiles(fileId: string, filePath?: string, limit: number = 5): Promise<FileListResponse> {
  // Mock related files for now
  return { total: 0, items: [] }
}

// --- Interfaces ---

export interface FileItem {
  id: string
  title: string
  description: string
  category: string
  categoryId?: string
  ageGroup: string
  ageGroupId?: string
  fileType?: string
  fileTypeId?: string
  fileName?: string
  filePath?: string
  fileExtension?: string
  fileSize?: number
  createdAt?: string
  downloads: number
  views: number
  comments: number
  thumbnailUrl?: string | null
  price: number
}

export interface FileListResponse {
  total: number
  items: FileItem[]
}

// --- Lessons/Files ---

export async function fetchFiles(params?: {
  age_group?: string | null
  file_type?: string | null
  subject?: string | null
  search?: string | null
}): Promise<FileListResponse> {
  // Build query string
  const query = new URLSearchParams()
  if (params?.search) query.append('search', params.search)
  if (params?.age_group) query.append('age_group', params.age_group)
  if (params?.file_type) query.append('category', params.file_type)

  const queryString = query.toString()
  const url = `${API_BASE_URL}/api/lessons${queryString ? `?${queryString}` : ''}`

  // Fetch from new backend
  const res = await fetch(url, { headers: getHeaders() })

  if (!res.ok) {
    console.error("Failed to fetch lessons")
    return { total: 0, items: [] }
  }

  const lessons = await res.json()

  // Map to FileItem format for frontend compatibility
  const items = lessons.map((l: any) => {
    // Try to extract category and ageGroup from description "Category cho AgeGroup"
    let category = "Giáo án"
    let ageGroup = "Mầm non"

    if (l.description && l.description.includes(' cho ')) {
      const parts = l.description.split(' cho ')
      category = parts[0]
      ageGroup = parts[1]
    }

    return {
      id: l.id.toString(),
      title: l.title,
      description: l.description || "Giáo án mầm non",
      category: category,
      ageGroup: ageGroup,
      price: l.price || 0,
      thumbnailUrl: null,
      downloads: Math.floor(Math.random() * 100), // Mock data for aesthetics
      views: Math.floor(Math.random() * 500),
      comments: Math.floor(Math.random() * 20),
      filePath: l.fileUrl
    }
  })

  return { total: items.length, items }
}

export async function getFileDetail(fileId: string): Promise<any> {
  const res = await fetch(`${API_BASE_URL}/api/lessons/${fileId}`, { headers: getHeaders() })
  if (!res.ok) throw new Error("Lesson not found")

  const data = await res.json()
  // Backend returns { file: { ...lesson, fileExtension: '...' } }

  // Ensure we map it to match frontend expectations
  // Frontend expects { file: { ... }, stats: { ... } }

  // We need to ensure stats are defaulted if not present
  return {
    file: {
      id: data.file.id.toString(),
      title: data.file.title,
      description: data.file.description,
      category: "Giáo án", // Or data.file.description parsing if needed
      price: data.file.price,
      fileUrl: data.file.fileUrl,
      fileExtension: data.file.fileExtension,
      thumbnailUrl: null, // or placeholder
      downloads: 0,
      views: 0,
      comments: 0
    },
    stats: { downloads: 0, views: 0 }
  }
}

// --- Admin / Orders ---

export async function createLesson(formData: FormData) {
  const token = getAuthToken()
  const res = await fetch(`${API_BASE_URL}/api/lessons`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  })
  if (!res.ok) throw await res.json()
  return res.json()
}

export async function buyLesson(lessonId: string) {
  const res = await fetch(`${API_BASE_URL}/api/orders`, {
    method: 'POST',
    headers: {
      ...getHeaders(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ lessonId })
  })
  if (!res.ok) throw await res.json()
  return res.json()
}

export async function deleteLesson(id: string) {
  const res = await fetch(`${API_BASE_URL}/api/lessons/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  })
  if (!res.ok) throw await res.json()
  return res.json()
}

// --- Helpers for Dropdowns (Mock/Static for now) ---

export interface FileType {
  id: string
  label: string
}

export interface Subject {
  id: string
  label: string
}

export interface AgeGroup {
  id: string
  label: string
}

export async function fetchFileTypes(): Promise<FileType[]> {
  // Static types matching class-dropdowns.tsx expectations
  return [
    { id: "giaoan", label: "Giáo án" },
    { id: "baigiang", label: "Bài giảng" },
    { id: "powerpoint", label: "PowerPoint" },
    { id: "excel", label: "Excel" }
  ]
}

export async function fetchSubjects(): Promise<Subject[]> {
  return [
    { id: "toan", label: "Toán học" },
    { id: "tieng_viet", label: "Tiếng Việt" },
    { id: "tieng_anh", label: "Tiếng Anh" },
    { id: "khoa_hoc", label: "Khoa học" },
    { id: "my_thuat", label: "Mỹ thuật" },
    { id: "am_nhac", label: "Âm nhạc" },
    { id: "ky_nang_song", label: "Kỹ năng sống" },
    { id: "the_chat", label: "Thể chất" }
  ]
}

export async function fetchAgeGroups(): Promise<AgeGroup[]> {
  return [
    { id: "nhatre1_2", label: "Nhà trẻ (1 - 2 tuổi)" },
    { id: "mam2_3", label: "Lớp Mầm (2 - 3 tuổi)" },
    { id: "choi4_5", label: "Lớp Chồi (4 - 5 tuổi)" },
    { id: "la5_6", label: "Lớp Lá (5 - 6 tuổi)" },
  ]
}

export async function fetchStats(): Promise<any> {
  return {
    total_files: 100, // mock
    by_age_group: {},
    by_file_type: {}
  }
}

export async function generateLessonPlan(data: { topic: string, ageGroup: string, duration?: string, objectives?: string }) {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/api/ai/lesson-plan`, {
    method: 'POST',
    headers: {
      ...getHeaders(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw await res.json()
  return res.json()
}
