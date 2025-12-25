# 🚀 Hướng Dẫn Nhanh - Tích Hợp AI

## Bước 1: Cài đặt Backend

```bash
cd server
npm install
cp .env.example .env
# Thêm GEMINI_API_KEY vào file .env
npm start
```

## Bước 2: Cài đặt Frontend

```bash
# Ở thư mục gốc
npm install
npm run dev
```

## Bước 3: Sử dụng

1. Mở trình duyệt tại `http://localhost:5173`
2. Điều hướng đến trang **Simulation**
3. Chọn phản ứng **"Phản Ứng Baeyer-Villiger"**
4. Nhấn nút **"Tạo Câu Hỏi Trắc Nghiệm"**
5. AI sẽ tạo 5 câu hỏi trắc nghiệm!

## ⚠️ Lưu ý

- Đảm bảo backend đang chạy tại `http://localhost:5174`
- Cần có Google Gemini API Key (lấy tại: https://makersuite.google.com/app/apikey)
- API Key phải được thêm vào `server/.env`

## 🐛 Xử lý lỗi

**Lỗi: "Không thể kết nối đến server"**
- Kiểm tra backend có đang chạy không
- Kiểm tra port 5174 có bị chiếm dụng không

**Lỗi: "API Key không hợp lệ"**
- Kiểm tra GEMINI_API_KEY trong file `.env`
- Đảm bảo không có khoảng trắng thừa

