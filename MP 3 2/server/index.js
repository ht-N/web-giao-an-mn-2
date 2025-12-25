import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { CohereClient } from 'cohere-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5175;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Initialize Cohere AI
if (!process.env.COHERE_API_KEY) {
  console.error('❌ LỖI: COHERE_API_KEY chưa được cấu hình trong file .env');
  process.exit(1);
}

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

// Helper to clean and parse JSON
function tryParseJSON(text) {
  try {
    // 1. Try parsing purely
    return JSON.parse(text);
  } catch (e) {
    // 2. Extract JSON from markdown or surrounding text
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch (e2) {
        // Continue to other fixes if this fails
        console.error("Failed to parse extracted JSON:", e2);
      }
    }

    // 3. Remove markdown code blocks (fallback)
    let clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
    try {
      return JSON.parse(clean);
    } catch (e3) {
      console.error("Failed to parse JSON. Raw text:", text);
      throw e;
    }
  }
}

// Helper function to call Cohere Chat
async function callCohereChat(message, systemPrompt, jsonMode = false) {
  try {
    const response = await cohere.chat({
      message: message,
      preamble: systemPrompt,
      model: 'command-a-03-2025',
      temperature: 0.1,
    });

    let text = response.text;

    if (jsonMode) {
      // Clean up markdown code blocks if present to extract JSON
      if (text.includes('```json')) {
        text = text.split('```json')[1].split('```')[0].trim();
      } else if (text.includes('```')) {
        text = text.split('```')[1].split('```')[0].trim();
      }
    }
    return text;
  } catch (error) {
    console.error("Cohere API Error:", error);
    throw error;
  }
}


// System prompt cho chuyên gia hóa học
// System prompt cho chuyên gia hóa học
const CHEMISTRY_EXPERT_PROMPT = `Bạn là giáo viên Hóa. Tạo câu hỏi trắc nghiệm.
Yêu cầu:
- Bám sát SGK Hóa học Việt Nam.
- 50% Lý thuyết + 50% Bài tập tính toán NHANH.
- Ngắn gọn, súc tích.

Output JSON (NO markdown):
{
  "questions": [
    {
      "question": "Câu hỏi?",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "correctAnswer": 0,
      "explanation": "Giải thích siêu ngắn (1 câu)."
    }
  ]
}`;

// Endpoint để tạo câu hỏi trắc nghiệm
app.post('/api/generate-quiz', async (req, res) => {
  try {
    const { reactionTitle, reactionDescription, numberOfQuestions = 5 } = req.body;

    if (!reactionTitle) {
      return res.status(400).json({ error: 'reactionTitle là bắt buộc' });
    }

    // ... (Guidance logic remains similar, simplified for brevity but keeping core logic) ...
    const titleLower = reactionTitle.toLowerCase();
    let topicType = 'chủ đề hóa học';
    let specificGuidance = '';

    // Slight simplification of logic for brevity, keeping main detection
    if (titleLower.includes('phản ứng') || titleLower.includes('reaction')) {
      topicType = 'phản ứng hóa học';
      specificGuidance = 'Tập trung vào phương trình, cân bằng, và hiện tượng.';
    } else {
      topicType = 'hóa học';
      specificGuidance = 'Tập trung vào tính chất, ứng dụng và đặc điểm.';
    }

    const message = `Hãy tạo ${numberOfQuestions} câu hỏi trắc nghiệm về ${topicType} sau:
    Tên chủ đề: ${reactionTitle}
    ${reactionDescription ? `Mô tả: ${reactionDescription}` : ''}
    ${specificGuidance}
    
    Yêu cầu cụ thể:
    - Mức độ: DỄ (Cơ bản sách giáo khoa THPT).
    - Nguồn: Dựa sát vào kiến thức Sách Giáo Khoa Hóa học phổ thông.
    - Cấu trúc: 50% câu hỏi Lý thuyết + 50% câu hỏi Bài tập tính toán đơn giản.
    - Đảm bảo câu hỏi ngắn gọn, dễ hiểu.
    
    Trả về đúng định dạng JSON đã yêu cầu.`;

    const jsonText = await callCohereChat(message, CHEMISTRY_EXPERT_PROMPT, true);
    const quizData = tryParseJSON(jsonText);

    res.json({
      success: true,
      data: quizData
    });

  } catch (error) {
    console.error('Error generating quiz:', error);
    res.status(500).json({
      success: false,
      error: 'Không thể tạo câu hỏi. Vui lòng thử lại.',
      details: error.message
    });
  }
});

const CHEMISTRY_CHATBOT_PROMPT = `Bạn là giáo viên hóa học chuyên nghiệp. Nhiệm vụ của bạn là trả lời câu hỏi hóa học chính xác, rõ ràng, hữu ích bằng Tiếng Việt.
Sử dụng ký hiệu hóa học chuẩn. Trả lời ngắn gọn (50-150 từ).`;

// Endpoint để chat với AI
app.post('/api/chat', async (req, res) => {
  try {
    const { message, context, conversationHistory = [] } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message là bắt buộc' });
    }

    let preamble = CHEMISTRY_CHATBOT_PROMPT;
    if (context && context.title) {
      preamble += `\nBối cảnh: Đang học về "${context.title}".`;
    }

    // Construct chat history for Cohere
    const chatHistory = conversationHistory.map(msg => ({
      role: msg.role === 'user' ? 'USER' : 'CHATBOT',
      message: msg.content
    }));

    const response = await cohere.chat({
      message: message,
      preamble: preamble,
      chatHistory: chatHistory,
      model: 'command-a-03-2025',
      temperature: 0.7
    });

    res.json({
      success: true,
      response: response.text.trim()
    });

  } catch (error) {
    console.error('Error in chat:', error);
    res.status(500).json({ success: false, error: 'Lỗi server khi chat.' });
  }
});

// API Endpoint cho AI Alchemist
app.post('/api/alchemist', async (req, res) => {
  try {
    const { element1, element2 } = req.body;

    if (!element1 || !element2) return res.status(400).json({ error: 'Thiếu nguyên liệu' });

    const systemPrompt = `Bạn là Trợ lý Hóa học. Nhiệm vụ: Mô phỏng phản ứng 2 chất.
    QUAN TRỌNG: Kiểm tra kỹ kiến thức hóa học trước khi trả lời. Hiện tượng phải CHÍNH XÁC TUYỆT ĐỐI theo thực tế phòng thí nghiệm và SGK.
    
    Yêu cầu:
    1. Chính xác tuyệt đối theo Sách Giáo Khoa (SGK) Hóa học Việt Nam.
    2. Kiểm tra kỹ trạng thái, màu sắc, hiện tượng của chất sản phẩm.
    3. Tốc độ nhanh, ngắn gọn.
    
    Output JSON (NO markdown):
    {
      "resultName": "Tên sản phẩm (hoặc 'Không phản ứng' nếu không có)",
      "equation": "Phương trình cân bằng (Vd: 2H2 + O2 -> 2H2O). KHÔNG dùng dấu gạch dưới (_). Viết thường: H2O.",
      "phenomenon": "Mô tả hiện tượng CHÍNH XÁC (màu sắc dung dịch, màu kết tủa, màu khí, trạng thái...). Kiểm tra lại xem có đúng thực tế không.",
      "explanation": "Giải thích NGẮN (max 2 câu) cơ chế phản ứng theo SGK. Giọng văn vui vẻ, dễ hiểu.",
      "safety": "Cảnh báo an toàn hoặc Fact thú vị",
      "type": "Loại phản ứng (Thế, Oxi hóa - Khử, Trao đổi...)",
      "emoji": "Emoji minh họa chính xác (⚪️, 🌫️, 💥, 💧).",
      "color": "Mã màu HEX đại diện cho sản phẩm/dung dịch sau phản ứng",
      "dangerous": boolean (true nếu nổ, độc hại, ăn mòn mạnh)
    }
    
    Trả về JSON hợp lệ. Không xuống dòng trong chuỗi.`;

    const message = `Trộn: "${element1}" và "${element2}".`;
    const jsonText = await callCohereChat(message, systemPrompt, true);
    const data = tryParseJSON(jsonText);

    res.json(data);
  } catch (error) {
    console.error('Alchemist Error:', error);
    res.json({
      resultName: "Phản ứng thất bại",
      equation: "N/A",
      phenomenon: "Không thể phân tích phản ứng lúc này.",
      explanation: "Có lỗi xảy ra khi hỏi ý kiến các vì sao. Vui lòng thử lại!",
      safety: "An toàn tuyệt đối vì không có gì xảy ra cả.",
      type: "Lỗi",
      emoji: "💨",
      color: "#808080",
      dangerous: false
    });
  }
});

// API Endpoint cho Microscope
app.post('/api/molecule', async (req, res) => {
  try {
    const { substance } = req.body;
    if (!substance) return res.status(400).json({ error: 'Thiếu tên chất' });

    const systemPrompt = `Bạn là chuyên gia hóa học.Cung cấp thông tin về chất được hỏi dưới dạng JSON:
    {
      "valid": true,
        "englishName": "Tên tiếng Anh (để search PubChem)",
          "name": "Tên tiếng Việt",
            "formula": "Công thức",
              "description": "Mô tả ngắn.",
                "moleculeStructure": null,
                  "properties": [
                    { "label": "Công thức hóa học", "value": "..." },
                    { "label": "Khối lượng mol", "value": "..." },
                    { "label": "Trạng thái (đk thường)", "value": "..." },
                    { "label": "Màu sắc", "value": "..." },
                    { "label": "Mùi", "value": "..." },
                    { "label": "Mật độ", "value": "..." },
                    { "label": "Điểm nóng chảy", "value": "..." },
                    { "label": "Điểm sôi", "value": "..." },
                    { "label": "Độ tan trong nước", "value": "..." },
                    { "label": "Độ pH", "value": "..." },
                    { "label": "Tính dễ cháy", "value": "..." }
                  ]
    }
Nếu không tìm thấy: { "valid": false, "error": "Không tìm thấy" } `;

    const jsonText = await callCohereChat(substance, systemPrompt, true);
    let data = tryParseJSON(jsonText);

    if (data.valid && data.englishName) {
      try {
        console.log(`Fetching SDF for ${data.englishName}...`);
        const pubChemRes = await fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(data.englishName)}/SDF`);
        if (pubChemRes.ok) {
          data.moleculeStructure = await pubChemRes.text();
        }
      } catch (e) {
        console.error("PubChem Error", e);
      }
    }

    res.json(data);
  } catch (error) {
    console.error('Molecule API Error:', error);
    res.status(500).json({ valid: false, error: 'Lỗi server.' });
  }
});

app.get('/api/health', (req, res) => res.json({ status: 'ok', provider: 'cohere' }));

app.listen(PORT, () => {
  console.log(`🚀 Server (Cohere) running on port ${PORT}`);
});
