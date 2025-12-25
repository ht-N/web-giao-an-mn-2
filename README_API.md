# API Setup Guide - Giao An Mam Non

## 📚 Hướng dẫn chạy API Backend và Frontend

### 🔧 Backend Setup

#### 1. Cài đặt dependencies
```bash
cd backend
pip install -r requirements.txt
```

#### 2. Tạo file .env (nếu cần)
```bash
# Tạo file .env trong thư mục backend
echo "GOOGLE_API_KEY=your_google_api_key_here" > .env
```

#### 3. Chạy FastAPI server
```bash
cd backend
python main.py
```

Hoặc với uvicorn:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Server sẽ chạy tại: `http://localhost:8000`

#### 4. Kiểm tra API
Mở trình duyệt và truy cập:
- API Docs: `http://localhost:8000/docs`
- API Root: `http://localhost:8000`

---

### 🎨 Frontend Setup

#### 1. Cài đặt dependencies
```bash
cd frontend
pnpm install
# hoặc npm install
```

#### 2. Tạo file .env.local
```bash
cd frontend
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
```

#### 3. Chạy Next.js development server
```bash
cd frontend
pnpm dev
# hoặc npm run dev
```

Frontend sẽ chạy tại: `http://localhost:3000`

---

## 🔗 API Endpoints

### 1. **GET /** - Root endpoint
```
GET http://localhost:8000/
```
Response:
```json
{
  "message": "Giao An Mam Non API",
  "version": "1.0.0",
  "endpoints": { ... }
}
```

### 2. **GET /api/age-groups** - Lấy danh sách nhóm tuổi
```
GET http://localhost:8000/api/age-groups
```
Response:
```json
{
  "age_groups": [
    {"id": "nhatre1_2", "label": "Nhà trẻ (1 - 2 tuổi)"},
    {"id": "mam2_3", "label": "Lớp Mầm (2 - 3 tuổi)"},
    {"id": "choi4_5", "label": "Lớp Chồi (4 - 5 tuổi)"},
    {"id": "la5_6", "label": "Lớp Lá (5 - 6 tuổi)"}
  ]
}
```

### 3. **GET /api/file-types** - Lấy danh sách loại file
```
GET http://localhost:8000/api/file-types
```
Response:
```json
{
  "file_types": [
    {"id": "giaoan", "label": "Giáo án"},
    {"id": "baigiang", "label": "Bài giảng"},
    {"id": "powerpoint", "label": "PowerPoint"},
    {"id": "excel", "label": "Excel"}
  ]
}
```

### 4. **GET /api/files** - Lấy danh sách files với bộ lọc
```
GET http://localhost:8000/api/files?age_group=choi4_5&file_type=giaoan&search=toan
```

Query Parameters:
- `age_group` (optional): Filter theo nhóm tuổi (nhatre1_2, mam2_3, choi4_5, la5_6)
- `file_type` (optional): Filter theo loại file (giaoan, baigiang, powerpoint, excel)
- `search` (optional): Tìm kiếm trong tên file

Response:
```json
{
  "total": 5,
  "items": [
    {
      "id": "choi4_5_giaoan_1",
      "title": "bai_hoc_phai_trai",
      "description": "Giáo án",
      "category": "Giáo án",
      "ageGroup": "Lớp Chồi (4 - 5 tuổi)",
      "ageGroupId": "choi4_5",
      "fileType": "Giáo án",
      "fileTypeId": "giaoan",
      "fileName": "bai_hoc_phai_trai.docx",
      "filePath": "choi4_5/giaoan/bai_hoc_phai_trai.docx",
      "fileExtension": ".docx",
      "fileSize": 25600,
      "createdAt": "2025-01-01T10:30:00",
      "downloads": 0,
      "views": 0,
      "comments": 0
    }
  ]
}
```

### 5. **GET /api/stats** - Lấy thống kê
```
GET http://localhost:8000/api/stats
```
Response:
```json
{
  "total_files": 42,
  "by_age_group": {
    "nhatre1_2": {"label": "Nhà trẻ (1 - 2 tuổi)", "count": 5},
    "mam2_3": {"label": "Lớp Mầm (2 - 3 tuổi)", "count": 12},
    "choi4_5": {"label": "Lớp Chồi (4 - 5 tuổi)", "count": 15},
    "la5_6": {"label": "Lớp Lá (5 - 6 tuổi)", "count": 10}
  },
  "by_file_type": {
    "giaoan": {"label": "Giáo án", "count": 20},
    "baigiang": {"label": "Bài giảng", "count": 15},
    "powerpoint": {"label": "PowerPoint", "count": 5},
    "excel": {"label": "Excel", "count": 2}
  }
}
```

---

## 📁 Cấu trúc thư mục backend/data/

```
backend/data/
├── nhatre1_2/          # Nhà trẻ 1-2 tuổi
│   ├── giaoan/
│   ├── baigiang/
│   ├── powerpoint/
│   └── excel/
├── mam2_3/             # Lớp Mầm 2-3 tuổi
│   ├── giaoan/
│   ├── baigiang/
│   ├── powerpoint/
│   └── excel/
├── choi4_5/            # Lớp Chồi 4-5 tuổi
│   ├── giaoan/
│   ├── baigiang/
│   ├── powerpoint/
│   └── excel/
└── la5_6/              # Lớp Lá 5-6 tuổi
    ├── giaoan/
    ├── baigiang/
    ├── powerpoint/
    └── excel/
```

---

## 🧪 Test API với curl

```bash
# Test root endpoint
curl http://localhost:8000/

# Get age groups
curl http://localhost:8000/api/age-groups

# Get files with filter
curl "http://localhost:8000/api/files?age_group=choi4_5&file_type=giaoan"

# Get stats
curl http://localhost:8000/api/stats
```

---

## 🔥 Features

### Backend:
- ✅ FastAPI với auto-generated docs (`/docs`)
- ✅ CORS enabled cho frontend
- ✅ File listing với filters (age_group, file_type, search)
- ✅ Pydantic models cho type safety
- ✅ Statistics endpoint
- ✅ Support multiple file types (.docx, .doc, .pptx, .ppt, .xlsx, .pdf)

### Frontend:
- ✅ React/Next.js với TypeScript
- ✅ Dynamic filtering (class, type, search)
- ✅ API integration với error handling
- ✅ Loading states
- ✅ Fallback to mock data on API error
- ✅ User-friendly labels (Lớp Chồi 4-5 tuổi thay vì choi4_5)

---

## 🐛 Troubleshooting

### Backend không chạy được?
1. Kiểm tra port 8000 có đang được sử dụng không:
   ```bash
   netstat -ano | findstr :8000
   ```
2. Cài lại dependencies:
   ```bash
   pip install -r requirements.txt --force-reinstall
   ```

### Frontend không kết nối được API?
1. Kiểm tra backend đã chạy chưa: `http://localhost:8000`
2. Kiểm tra file `.env.local` có đúng không:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```
3. Restart frontend server sau khi sửa .env.local

### CORS errors?
- Đảm bảo frontend URL (`http://localhost:3000`) đã được thêm vào CORS origins trong `backend/main.py`

---

## 📝 Notes

- API sử dụng **folder structure** để tổ chức files
- Frontend **tự động map** folder names sang labels thân thiện
- Khi thêm files mới, đặt vào đúng thư mục: `backend/data/{age_group}/{file_type}/`
- API sẽ tự động phát hiện và list files mới

---

## 🚀 Production Deployment

### Backend (FastAPI):
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Frontend (Next.js):
```bash
pnpm build
pnpm start
```

Hoặc deploy lên Vercel/Netlify với environment variable:
```
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

