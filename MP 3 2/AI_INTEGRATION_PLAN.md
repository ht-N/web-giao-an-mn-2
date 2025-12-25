# Kế hoạch Tích hợp AI (Gemini) vào Dự án Mô phỏng Hóa học

Dựa trên codebase hiện tại (React + Vite + Tailwind), đây là kế hoạch chi tiết để tích hợp Google Gemini API một cách chặt chẽ và bảo mật.

## 1. Kiến trúc Hệ thống

Hiện tại dự án là một Single Page Application (SPA) thuần túy chạy trên trình duyệt. Để bảo mật API Key của Gemini và xử lý logic phức tạp, chúng ta cần thêm một **Backend Server** nhỏ.

*   **Frontend (React)**: Giao diện người dùng, gửi câu hỏi/dữ liệu hóa học lên server.
*   **Backend (Node.js/Express)**:
    *   Lưu trữ API Key (trong biến môi trường `.env`).
    *   Nhận yêu cầu từ Frontend.
    *   Gọi Google Gemini API.
    *   Trả kết quả về cho Frontend.

## 2. Các Tính năng AI Đề xuất

1.  **Dự đoán Phản ứng (Reaction Predictor)**:
    *   Input: Các chất tham gia (ví dụ: "H2 + O2").
    *   Output: Phương trình cân bằng, điều kiện phản ứng, hiện tượng, và giải thích cơ chế.
2.  **Trợ lý Ảo Hóa học (AI Assistant)**:
    *   Giải đáp thắc mắc về các chất đang xem trong mô phỏng 3D.
    *   Cảnh báo an toàn (ví dụ: "Chất này có độc không?").
3.  **Tạo Bài tập/Quiz**:
    *   Tự động tạo câu hỏi trắc nghiệm dựa trên chủ đề đang học.

## 3. Các bước Thực hiện (Implementation Steps)

### Giai đoạn 1: Thiết lập Backend (Server)
Để đảm bảo tính "chặt chẽ", chúng ta không gọi API trực tiếp từ React.

1.  Tạo thư mục `server` tại thư mục gốc.
2.  Khởi tạo dự án Node.js: `npm init -y`.
3.  Cài đặt thư viện:
    *   `express`: Web framework.
    *   `cors`: Cho phép Frontend gọi API.
    *   `dotenv`: Quản lý biến môi trường.
    *   `@google/generative-ai`: SDK của Gemini.
4.  Tạo file `server/index.js` để xử lý endpoint `/api/chat`.
5.  Tạo file `server/.env` chứa `GEMINI_API_KEY`.

### Giai đoạn 2: Xây dựng Giao diện AI (Frontend)

1.  Tạo Component `AIAssistant.jsx`:
    *   Giao diện khung chat hoặc Form nhập liệu.
    *   Có thể thu nhỏ/mở rộng (Floating Action Button) để không che mất mô phỏng 3D.
2.  Tích hợp vào `App.jsx` hoặc `Navbar`:
    *   Thêm nút "Hỏi AI" trên thanh điều hướng.
3.  Kết nối API:
    *   Sử dụng `fetch` hoặc `axios` để gửi dữ liệu đến `http://localhost:3000/api/chat`.

### Giai đoạn 3: Prompt Engineering (Kỹ thuật đặt câu lệnh)

Để AI trả lời chính xác về hóa học, cần thiết lập "System Instruction" cho Gemini:
*   "Bạn là một chuyên gia hóa học. Hãy trả lời ngắn gọn, chính xác. Nếu là phản ứng, hãy cân bằng phương trình..."

## 4. Ví dụ Luồng hoạt động

1.  Người dùng đang xem mô hình "Sulfuric Acid".
2.  Người dùng mở AI Assistant và hỏi: "Chất này tác dụng với đường thì sao?"
3.  Frontend gửi câu hỏi + ngữ cảnh "Sulfuric Acid" về Backend.
4.  Backend gọi Gemini với prompt chuyên gia.
5.  Gemini trả về: "H2SO4 đặc có tính háo nước mạnh, sẽ than hóa đường (C12H22O11) thành than (C)..."
6.  Frontend hiển thị câu trả lời.

---
**Bạn có muốn tôi bắt đầu thực hiện Giai đoạn 1 (Thiết lập Backend) ngay bây giờ không?**
