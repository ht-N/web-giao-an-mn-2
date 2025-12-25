"use client"

import { useState, useEffect } from "react"
import SearchBar from "@/components/search-bar"
import FilterPanel from "@/components/filter-panel"
import FeaturedCarousel from "@/components/featured-carousel"
import CurriculumGrid from "@/components/curriculum-grid"
import ClassDropdowns from "@/components/class-dropdowns"
import RecommendedSidebar from "@/components/recommended-sidebar"
import { fetchFiles, FileItem } from "@/lib/api"

interface Curriculum {
  id: string
  title: string
  description: string
  category: string
  ageGroup: string
  price: number
  image: string
  rating: number
  downloads: number
  views: number
  comments: number
  filePath?: string
  thumbnailUrl?: string | null
}

// Mock data
const mockCurricula: Curriculum[] = [
  {
    id: "1",
    title: "Kế hoạch bài học Mầm non Lớp Mầm - Tuần 18 - Chủ đề: Các mùa trong năm học 2024-2025 - Trường Mầm non s",
    description: "Giáo án lớp mầm",
    category: "Toán học",
    ageGroup: "3-4 tuổi",
    price: 150000,
    image: "/colorful-math-teaching-materials-for-preschool.jpg",
    rating: 4.8,
    downloads: 34,
    views: 8,
    comments: 0,
  },
  {
    id: "2",
    title: "Giáo án Mầm non Lớp Mầm - Tuần 18 - Chủ đề: Các mùa trong năm - Năm học 2024-2025 - Trường Mầm non s",
    description: "Bài giảng lớp mầm",
    category: "Tiếng Anh",
    ageGroup: "4-5 tuổi",
    price: 120000,
    image: "/english-learning-songs-flashcards-preschool.jpg",
    rating: 4.9,
    downloads: 8,
    views: 6,
    comments: 0,
  },
  {
    id: "3",
    title: "Giáo án Mầm non Lớp Mầm - Tuần 21 - Chủ đề: Hoa đẹp quanh bé - Năm học 2024-2025 - Trường Mầm non số 1",
    description: "Giáo án lớp mầm",
    category: "Khoa học",
    ageGroup: "4-5 tuổi",
    price: 180000,
    image: "/science-experiments-activities-for-kids.jpg",
    rating: 4.7,
    downloads: 30,
    views: 4,
    comments: 0,
  },
  {
    id: "4",
    title: "Giáo án Mầm non Lớp Mầm - Tuần 24 - Chủ đề: Ngày ơi - Năm học 2024-2025 - Trường Mầm non số 1 Kim S",
    description: "Bài giảng lớp mầm",
    category: "Mỹ thuật",
    ageGroup: "3-5 tuổi",
    price: 100000,
    image: "/art-and-craft-projects-for-preschool.jpg",
    rating: 4.6,
    downloads: 31,
    views: 4,
    comments: 0,
  },
  {
    id: "5",
    title: "Kế hoạch bài học Mầm non Lớp Mầm - Tuần 15",
    description: "Giáo án lớp mầm",
    category: "Kỹ năng sống",
    ageGroup: "3-4 tuổi",
    price: 90000,
    image: "/life-skills-hygiene-activities-for-toddlers.jpg",
    rating: 4.5,
    downloads: 25,
    views: 6,
    comments: 0,
  },
  {
    id: "6",
    title: "Bài giảng Mầm non Lớp Chồi - Âm Nhạc",
    description: "Bài giảng lớp chồi",
    category: "Âm nhạc",
    ageGroup: "2-5 tuổi",
    price: 130000,
    image: "/musical-instruments-songs-activities-preschool.jpg",
    rating: 4.8,
    downloads: 22,
    views: 5,
    comments: 0,
  },
  {
    id: "7",
    title: "Giáo án Mầm non Lớp Lá - Toán Tư Duy - Tuần 5",
    description: "Giáo án lớp lá",
    category: "Toán học",
    ageGroup: "5-6 tuổi",
    price: 160000,
    image: "/colorful-math-teaching-materials-for-preschool.jpg",
    rating: 4.7,
    downloads: 28,
    views: 7,
    comments: 1,
  },
  {
    id: "8",
    title: "Bài giảng Nhà Trẻ - Kỹ Năng Cơ Bản - Tuần 10",
    description: "Bài giảng nhà trẻ",
    category: "Kỹ năng sống",
    ageGroup: "2-3 tuổi",
    price: 85000,
    image: "/life-skills-hygiene-activities-for-toddlers.jpg",
    rating: 4.6,
    downloads: 18,
    views: 5,
    comments: 0,
  },
  {
    id: "9",
    title: "Giáo án Lớp Chồi - Tiếng Việt - Tuần 8",
    description: "Giáo án lớp chồi",
    category: "Tiếng Việt",
    ageGroup: "4-5 tuổi",
    price: 140000,
    image: "/english-learning-songs-flashcards-preschool.jpg",
    rating: 4.8,
    downloads: 26,
    views: 6,
    comments: 2,
  },
  {
    id: "10",
    title: "Bài giảng Mầm non - Mỹ Thuật Sáng Tạo - Tuần 12",
    description: "Bài giảng lớp mầm",
    category: "Mỹ thuật",
    ageGroup: "3-4 tuổi",
    price: 110000,
    image: "/art-and-craft-projects-for-preschool.jpg",
    rating: 4.7,
    downloads: 23,
    views: 8,
    comments: 1,
  },
  {
    id: "11",
    title: "Giáo án Lớp Lá - Khoa Học Tự Nhiên - Tuần 6",
    description: "Giáo án lớp lá",
    category: "Khoa học",
    ageGroup: "5-6 tuổi",
    price: 175000,
    image: "/science-experiments-activities-for-kids.jpg",
    rating: 4.9,
    downloads: 32,
    views: 9,
    comments: 3,
  },
  {
    id: "12",
    title: "Bài giảng Nhà Trẻ - Âm Nhạc Và Điều Động - Tuần 7",
    description: "Bài giảng nhà trẻ",
    category: "Âm nhạc",
    ageGroup: "2-3 tuổi",
    price: 95000,
    image: "/musical-instruments-songs-activities-preschool.jpg",
    rating: 4.5,
    downloads: 20,
    views: 4,
    comments: 0,
  },
]

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string | null>(null)
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [filteredCurricula, setFilteredCurricula] = useState<Curriculum[]>(mockCurricula)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [useBackendApi, setUseBackendApi] = useState(true) // Toggle between API and mock data

  // Map folder keys to human friendly matching keywords in mock data
  const classIdToKeywords: Record<string, string[]> = {
    nhatre1_2: ["1-2", "1 - 2", "nhà trẻ", "nha tre", "nhatre"],
    mam2_3: ["2-3", "2 - 3", "mầm", "mam"],
    choi4_5: ["4-5", "4 - 5", "chồi", "choi"],
    la5_6: ["5-6", "5 - 6", "lá", "la"],
  }

  const typeIdToKeywords: Record<string, string[]> = {
    giaoan: ["giáo án", "giao an"],
    baigiang: ["bài giảng", "bai giang"],
    powerpoint: ["powerpoint", "ppt"],
    excel: ["excel", "xlsx", "xls"],
  }

  const subjectIdToKeywords: Record<string, string[]> = {
    toan: ["toán", "toan", "math"],
    tieng_viet: ["tiếng việt", "tieng viet", "vietnamese"],
    tieng_anh: ["tiếng anh", "tieng anh", "english"],
    khoa_hoc: ["khoa học", "khoa hoc", "science"],
    my_thuat: ["mỹ thuật", "my thuat", "art"],
    am_nhac: ["âm nhạc", "am nhac", "music"],
    ky_nang_song: ["kỹ năng sống", "ky nang song", "life skills"],
    the_chat: ["thể chất", "the chat", "physical"],
  }


  // Placeholder images for when thumbnail is missing
  const placeholderImages = [
    "/art-and-craft-projects-for-preschool.jpg",
    "/colorful-math-teaching-materials-for-preschool.jpg",
    "/english-learning-songs-flashcards-preschool.jpg",
    "/life-skills-hygiene-activities-for-toddlers.jpg",
    "/musical-instruments-songs-activities-preschool.jpg",
    "/science-experiments-activities-for-kids.jpg",
  ]

  // Fetch data from backend API
  useEffect(() => {
    const loadData = async () => {
      if (!useBackendApi) {
        // Use mock data with filtering
        let filtered = mockCurricula

        if (searchTerm) {
          filtered = filtered.filter(
            (item) =>
              item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.description.toLowerCase().includes(searchTerm.toLowerCase()),
          )
        }

        if (selectedAgeGroup) {
          filtered = filtered.filter((item) => item.ageGroup === selectedAgeGroup)
        }

        if (selectedClass || selectedType || selectedSubject) {
          filtered = filtered.filter((item) => {
            let matchClass = true
            let matchType = true
            let matchSubject = true

            if (selectedClass) {
              const keywords = classIdToKeywords[selectedClass] || []
              const haystack = `${item.ageGroup} ${item.title} ${item.description}`.toLowerCase()
              matchClass = keywords.some((k) => haystack.includes(k))
            }

            if (selectedType) {
              const keywords = typeIdToKeywords[selectedType] || []
              const haystack = `${item.title} ${item.description}`.toLowerCase()
              matchType = keywords.some((k) => haystack.includes(k))
            }

            if (selectedSubject) {
              const keywords = subjectIdToKeywords[selectedSubject] || []
              const haystack = `${item.title} ${item.description} ${item.category}`.toLowerCase()
              matchSubject = keywords.some((k) => haystack.includes(k))
            }

            return matchClass && matchType && matchSubject
          })
        }

        setFilteredCurricula(filtered)
        setCurrentPage(1)
        return
      }

      // Fetch from backend API
      try {
        setLoading(true)
        setError(null)

        const response = await fetchFiles({
          age_group: selectedClass,
          file_type: selectedType,
          subject: selectedSubject,
          search: searchTerm || null,
        })

        // Convert FileItem to Curriculum format
        const curricula: Curriculum[] = response.items.map((file, index) => {
          // Pick a consistent random image based on file ID or index
          const randomImageIndex = (file.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % placeholderImages.length;
          const fallbackImage = placeholderImages[randomImageIndex];

          return {
            id: file.id,
            title: file.title,
            description: file.description,
            category: file.category,
            ageGroup: file.ageGroup,
            price: 0,
            image: file.thumbnailUrl || fallbackImage,
            rating: 4.5,
            downloads: file.downloads,
            views: file.views,
            comments: file.comments,
            filePath: file.filePath,
            thumbnailUrl: file.thumbnailUrl || null,
          }
        })

        setFilteredCurricula(curricula)
        setCurrentPage(1)
      } catch (err) {
        console.error("Failed to fetch files:", err)
        setError("Không thể tải dữ liệu từ server. Đang sử dụng dữ liệu mẫu.")
        // Fallback to mock data on error
        setFilteredCurricula(mockCurricula)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [searchTerm, selectedAgeGroup, selectedClass, selectedType, selectedSubject, useBackendApi])

  const ageGroups = Array.from(new Set(mockCurricula.map((item) => item.ageGroup)))
  const featuredItems = mockCurricula.sort(() => Math.random() - 0.5).slice(0, 4)

  return (
    <div className="min-h-screen bg-background">
      {/* Error Message */}
      {error && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
          <p className="font-bold">Cảnh báo</p>
          <p>{error}</p>
        </div>
      )}

      <main className="w-full">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/5 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-title text-foreground mb-3">Giáo Án Mầm Non Chất Lượng</h1>
              <p className="text-body text-foreground/70">
                Tìm các giáo án sáng tạo, hiệu quả để dạy trẻ phát triển toàn diện
              </p>
            </div>

            {/* Search Bar */}
            <div className="mb-4">
              <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            </div>

            {/* Filters in one row */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <ClassDropdowns
                selectedClass={selectedClass}
                selectedType={selectedType}
                selectedSubject={selectedSubject}
                onClassChange={setSelectedClass}
                onTypeChange={setSelectedType}
                onSubjectChange={setSelectedSubject}
              />
            </div>
          </div>
        </section>

        {/* Featured Carousel */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-heading text-foreground mb-8">✨ Các Gói Giáo Án</h2>
            <FeaturedCarousel items={featuredItems} />
          </div>
        </section>

        {/* Main Content with Sidebar */}
        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Grid */}
              <div className="lg:col-span-3">
                <div className="mb-6">
                  <h2 className="text-heading text-foreground mb-2">Giáo Án & Bài Giảng</h2>
                  <p className="text-body text-foreground/60">
                    {loading ? "Đang tải..." : `${filteredCurricula.length} kết quả`}
                  </p>
                </div>
                {loading ? (
                  <div className="text-center py-16">
                    <p className="text-body text-foreground/50">Đang tải dữ liệu...</p>
                  </div>
                ) : (
                  <CurriculumGrid
                    items={filteredCurricula}
                    currentPage={currentPage}
                    itemsPerPage={12}
                    onPageChange={setCurrentPage}
                  />
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <RecommendedSidebar />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
