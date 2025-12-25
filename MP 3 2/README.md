# ChemLab - Mô Phỏng Hóa Học

Ứng dụng React hiện đại cho phép mô phỏng các thí nghiệm hóa học một cách an toàn và tương tác, giúp học sinh và giáo viên khám phá thế giới hóa học.

## 🚀 Tính Năng

- **Thí Nghiệm Ảo**: Thực hiện các thí nghiệm hóa học trong môi trường mô phỏng 3D
- **AI Tạo Câu Hỏi**: Tích hợp Google Gemini AI để tự động tạo câu hỏi trắc nghiệm về phản ứng hóa học
- **Giao Diện Hiện Đại**: Thiết kế đẹp mắt, responsive với TailwindCSS
- **Hỗ Trợ Theme**: Chuyển đổi giữa theme Green Nature và Blue Sky
- **Điều Hướng**: Nhiều trang với React Router
- **Biểu Tượng**: Icons đẹp từ Lucide React

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Lightning-fast build tool
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **Google Gemini AI** - AI model for quiz generation

## 📦 Cài Đặt

### 1. Cài đặt Frontend

1. **Di chuyển vào thư mục dự án**
   ```bash
   cd Mo-phong-hoa-hoc
   ```

2. **Cài đặt dependencies** (dùng npm hoặc yarn)
   ```bash
   npm install
   # hoặc
   yarn
   ```

3. **Chạy development server**
   ```bash
   npm run dev
   # hoặc
   yarn dev
   ```

   Ứng dụng sẽ tự động mở tại `http://localhost:5173`

### 2. Cài đặt Backend (Cho tính năng AI)

1. **Di chuyển vào thư mục server**
   ```bash
   cd server
   ```

2. **Cài đặt dependencies**
   ```bash
   npm install
   ```

3. **Cấu hình API Key**
   - Tạo file `.env` từ `.env.example`:
     ```bash
     cp .env.example .env
     ```
   - Lấy Google Gemini API Key tại: https://makersuite.google.com/app/apikey
   - Thêm API key vào file `.env`:
     ```
     GEMINI_API_KEY=your_actual_api_key_here
     ```

4. **Chạy backend server**
   ```bash
   npm start
   # hoặc cho development với auto-reload:
   npm run dev
   ```

   Backend sẽ chạy tại `http://localhost:5174`

> **Lưu ý**: Để sử dụng tính năng tạo câu hỏi trắc nghiệm bằng AI, bạn cần chạy cả frontend và backend server.

## 🎨 Chuyển Đổi Theme

Dự án hỗ trợ hai theme đẹp mắt:

### Các Theme Có Sẵn
- **Green Nature** (mặc định) - Màu xanh lá tự nhiên với nền slate mềm mại
- **Blue Sky** - Màu xanh da trời nhẹ nhàng với nền slate

### Cách Chuyển Theme

**Cách 1: Sử dụng script chuyển theme**
```bash
node switch-theme.js green
# hoặc
node switch-theme.js blue-sky
```

**Cách 2: Chuyển thủ công**
1. Mở file `src/config/theme.js`
2. Thay đổi `ACTIVE_THEME` thành `THEMES.GREEN` hoặc `THEMES.BLUE_SKY`
3. Mở file `tailwind.config.js`
4. Cập nhật bảng màu `primary` phù hợp với theme đã chọn
5. Khởi động lại dev server

## 📁 Cấu Trúc Dự Án

```
Mo-phong-hoa-hoc/
├── public/              # Tài nguyên tĩnh
├── server/              # Backend server (AI integration)
│   ├── index.js         # Express server với Gemini API
│   ├── package.json     # Backend dependencies
│   └── .env.example     # Template cho biến môi trường
├── src/
│   ├── components/      # React components
│   │   ├── Navbar.jsx   # Component điều hướng
│   │   ├── MoleculeViewer.jsx  # Component xem phân tử 3D
│   │   └── QuizGenerator.jsx   # Component tạo câu hỏi AI
│   ├── pages/           # Các trang
│   │   ├── Home.jsx     # Trang chủ
│   │   ├── About.jsx    # Trang giới thiệu
│   │   ├── Explore.jsx   # Trang khám phá thí nghiệm
│   │   └── Simulation.jsx  # Trang mô phỏng 3D
│   ├── config/          # File cấu hình
│   │   └── theme.js     # Cấu hình theme
│   ├── App.jsx          # Component chính
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Frontend dependencies
├── vite.config.js       # Cấu hình Vite
├── tailwind.config.js   # Cấu hình TailwindCSS
├── AI_INTEGRATION_PLAN.md  # Kế hoạch tích hợp AI
└── README.md            # File này
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤖 Tính Năng AI - Tạo Câu Hỏi Trắc Nghiệm

Dự án đã tích hợp Google Gemini AI để tự động tạo câu hỏi trắc nghiệm về các phản ứng hóa học.

### Cách sử dụng:

1. **Chọn một phản ứng hóa học** trong trang Simulation (ví dụ: "Phản Ứng Baeyer-Villiger")
2. **Nhấn nút "Tạo Câu Hỏi Trắc Nghiệm"** ở header
3. **AI sẽ tạo 5 câu hỏi trắc nghiệm** về phản ứng đó
4. **Trả lời các câu hỏi** và xem kết quả với giải thích chi tiết

### Tính năng:
- ✅ Tự động tạo câu hỏi dựa trên phản ứng được chọn
- ✅ 4 đáp án cho mỗi câu hỏi
- ✅ Giải thích chi tiết cho từng câu
- ✅ Tính điểm và hiển thị kết quả
- ✅ Giao diện đẹp mắt, dễ sử dụng

## 🎯 Các Bước Tiếp Theo

1. ✅ **Tích Hợp AI**: Đã tích hợp Google Gemini để tạo câu hỏi trắc nghiệm
2. **Mở Rộng AI**: Thêm tính năng dự đoán phản ứng, giải thích cơ chế
3. **Xác Thực Người Dùng**: Thêm chức năng đăng nhập/đăng ký
4. **Cơ Sở Dữ Liệu**: Lưu trữ tiến độ học tập và lịch sử thí nghiệm
5. **Chi Tiết Thí Nghiệm**: Tạo trang chi tiết cho từng thí nghiệm
6. **Tìm Kiếm & Lọc**: Thêm khả năng tìm kiếm thí nghiệm nâng cao
7. **Yêu Thích**: Cho phép người dùng lưu thí nghiệm yêu thích

## 📝 Ghi Chú Phát Triển

- Dự án sử dụng Vite để phát triển và build nhanh hơn
- TailwindCSS được cấu hình với các theme màu tùy chỉnh
- Tất cả components là functional components sử dụng React hooks
- Ứng dụng responsive hoàn toàn và thân thiện với mobile
- Sử dụng `yarn dev` hoặc `npm run dev` để chạy (không phải `yarn start`)

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the MIT License.
