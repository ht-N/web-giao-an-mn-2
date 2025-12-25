"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { fetchFileTypes, fetchSubjects, FileType, Subject } from "@/lib/api"

interface ClassDropdownsProps {
  selectedClass: string | null
  selectedType: string | null
  selectedSubject: string | null
  onClassChange: (value: string | null) => void
  onTypeChange: (value: string | null) => void
  onSubjectChange: (value: string | null) => void
}

const classes = [
  { id: "nhatre1_2", label: "Nhà trẻ (1 - 2 tuổi)" },
  { id: "mam2_3", label: "Lớp Mầm (2 - 3 tuổi)" },
  { id: "choi4_5", label: "Lớp Chồi (4 - 5 tuổi)" },
  { id: "la5_6", label: "Lớp Lá (5 - 6 tuổi)" },
]

export default function ClassDropdowns({
  selectedClass,
  selectedType,
  selectedSubject,
  onClassChange,
  onTypeChange,
  onSubjectChange,
}: ClassDropdownsProps) {
  const [types, setTypes] = useState<FileType[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [fileTypes, fileSubjects] = await Promise.all([
          fetchFileTypes(),
          fetchSubjects(),
        ])
        setTypes(fileTypes)
        setSubjects(fileSubjects)
      } catch (error) {
        console.error("Failed to load filter options:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Class Dropdown */}
      <div className="relative">
        <div className="relative">
          <select
            value={selectedClass || ""}
            onChange={(e) => onClassChange(e.target.value || null)}
            className="w-full px-4 py-3 bg-white border-2 border-border rounded-lg focus:outline-none focus:border-primary text-body appearance-none cursor-pointer transition font-body"
          >
            <option value="">Tất cả lớp học</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none w-5 h-5 text-foreground/50" />
        </div>
      </div>

      {/* Type Dropdown */}
      <div className="relative">
        <div className="relative">
          <select
            value={selectedType || ""}
            onChange={(e) => onTypeChange(e.target.value || null)}
            disabled={loading}
            className="w-full px-4 py-3 bg-white border-2 border-border rounded-lg focus:outline-none focus:border-primary text-body appearance-none cursor-pointer transition font-body disabled:opacity-50"
          >
            <option value="">Tất cả loại tài liệu</option>
            {types.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none w-5 h-5 text-foreground/50" />
        </div>
      </div>

      {/* Subject Dropdown */}
      <div className="relative">
        <div className="relative">
          <select
            value={selectedSubject || ""}
            onChange={(e) => onSubjectChange(e.target.value || null)}
            disabled={loading}
            className="w-full px-4 py-3 bg-white border-2 border-border rounded-lg focus:outline-none focus:border-primary text-body appearance-none cursor-pointer transition font-body disabled:opacity-50"
          >
            <option value="">Tất cả loại bài học</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none w-5 h-5 text-foreground/50" />
        </div>
      </div>
    </div>
  )
}
