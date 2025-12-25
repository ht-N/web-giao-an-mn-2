# Chemistry AI Server

Backend server cho tính năng tích hợp AI (Google Gemini) để tạo câu hỏi trắc nghiệm về hóa học.

## 🚀 Cài Đặt

1. **Cài đặt dependencies**
   ```bash
   npm install
   ```

2. **Cấu hình API Key**
   - Copy file `.env.example` thành `.env`:
     ```bash
     cp .env.example .env
     ```
   - Lấy Google Gemini API Key tại: https://makersuite.google.com/app/apikey
   - Mở file `.env` và thêm API key:
     ```
     GEMINI_API_KEY=your_actual_api_key_here
     PORT=5174
     ```

3. **Chạy server**
   ```bash
   npm start
   ```
   
   Hoặc chạy với auto-reload (development):
   ```bash
   npm run dev
   ```

Server sẽ chạy tại `http://localhost:5174`

## 📡 API Endpoints

### POST `/api/generate-quiz`

Tạo câu hỏi trắc nghiệm về một phản ứng hóa học.

**Request Body:**
```json
{
  "reactionTitle": "Phản Ứng Baeyer-Villiger",
  "reactionDescription": "Mô phỏng phản ứng oxy hóa Baeyer-Villiger",
  "numberOfQuestions": 5
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "questions": [
      {
        "question": "Câu hỏi về phản ứng?",
        "options": ["A. Đáp án 1", "B. Đáp án 2", "C. Đáp án 3", "D. Đáp án 4"],
        "correctAnswer": 0,
        "explanation": "Giải thích chi tiết"
      }
    ]
  }
}
```

### GET `/api/health`

Kiểm tra trạng thái server.

**Response:**
```json
{
  "status": "ok",
  "message": "Chemistry AI Server is running"
}
```

## 🔒 Bảo Mật

- API Key được lưu trong file `.env` và không được commit lên git
- Server chỉ chấp nhận requests từ frontend (CORS enabled)
- Đảm bảo không expose API key ra client-side

## 🛠️ Tech Stack

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **@google/generative-ai** - Google Gemini AI SDK
- **dotenv** - Environment variables management
- **cors** - Cross-Origin Resource Sharing

