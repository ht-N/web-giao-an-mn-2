/**
 * Test Gamma API - Debug script
 * Chạy: node test-gamma-api.js
 */

require('dotenv').config();
const axios = require('axios');

const GAMMA_API_KEY = process.env.GAMMA_API_KEY;
const GAMMA_API_BASE = 'https://public-api.gamma.app/v1.0';

async function testGammaAPI() {
    console.log('=== TEST GAMMA API ===\n');

    if (!GAMMA_API_KEY) {
        console.error('❌ GAMMA_API_KEY không được cấu hình trong .env');
        return;
    }

    console.log('✅ GAMMA_API_KEY đã được cấu hình\n');

    // Step 1: POST tạo slide với exportAs: "pptx"
    console.log('=== Step 1: Tạo slide với exportAs: "pptx" ===\n');

    const postBody = {
        inputText: "# Test Slide Mầm Non\n\n## Slide 1: Chào mừng\nXin chào các bé!\n\n## Slide 2: Nội dung\nHôm nay chúng ta học về con vật",
        textMode: "preserve",
        format: "presentation",
        exportAs: "pptx",
        numCards: 3,
        textOptions: {
            language: "vi"
        },
        sharingOptions: {
            externalAccess: "view"
        }
    };

    console.log('Request body:');
    console.log(JSON.stringify(postBody, null, 2));
    console.log('\n');

    try {
        const postResponse = await axios.post(
            `${GAMMA_API_BASE}/generations`,
            postBody,
            {
                headers: {
                    'X-API-KEY': GAMMA_API_KEY,
                    'Content-Type': 'application/json'
                },
                timeout: 30000
            }
        );

        console.log('POST Response:');
        console.log(JSON.stringify(postResponse.data, null, 2));
        console.log('\n');

        const generationId = postResponse.data.generationId;

        if (!generationId) {
            console.error('❌ Không lấy được generationId');
            return;
        }

        console.log(`✅ generationId: ${generationId}\n`);

        // Step 2: Poll để lấy kết quả
        console.log('=== Step 2: Poll để lấy kết quả ===\n');

        for (let i = 1; i <= 15; i++) {
            console.log(`Poll attempt ${i}...`);

            const pollResponse = await axios.get(
                `${GAMMA_API_BASE}/generations/${generationId}`,
                {
                    headers: {
                        'X-API-KEY': GAMMA_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    timeout: 10000
                }
            );

            const data = pollResponse.data;
            console.log(`  status: ${data.status}`);
            console.log(`  gammaUrl: ${data.gammaUrl || 'N/A'}`);
            console.log(`  pptxUrl: ${data.pptxUrl || 'N/A'}`);
            console.log(`  pdfUrl: ${data.pdfUrl || 'N/A'}`);

            if (data.status === 'completed') {
                console.log('\n=== KẾT QUẢ CUỐI CÙNG ===');
                console.log(JSON.stringify(data, null, 2));

                if (data.pptxUrl) {
                    console.log('\n✅ CÓ pptxUrl! Link tải PPTX:');
                    console.log(data.pptxUrl);
                } else {
                    console.log('\n⚠️ KHÔNG CÓ pptxUrl trong response');
                }

                break;
            }

            if (data.status === 'failed') {
                console.error('\n❌ Generation failed:', data);
                break;
            }

            // Đợi 5 giây trước khi poll tiếp
            await new Promise(r => setTimeout(r, 5000));
        }

    } catch (error) {
        console.error('❌ Error:', error.response?.data || error.message);
    }
}

testGammaAPI();
