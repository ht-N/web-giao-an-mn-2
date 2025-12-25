require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = process.env.GEMINI_API_KEY || "AIzaSyB9HlQwgcMofZ4t4y7dx4hHyekAe5ZCiPM";
const genAI = new GoogleGenerativeAI(API_KEY);

async function findWorkingModel() {
    try {
        console.log("Fetching available models...");
        // We have to use REST to get the list because SDK might mask them or requires knowing the name
        const startUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

        // Simple fetch using node's fetch or curl. Let's rely on genAI to try known candidates if list fails,
        // but better to try the candidates from the grep output we saw earlier + standard ones.

        const candidates = [
            "gemini-flash-latest",
            "gemini-pro-latest",
            "gemini-exp-1206",
            "gemini-2.0-flash-exp",
            "models/gemini-2.5-flash"  // Try with prefix explicitly? likely not needed but worth a shot if SDK doesn't add it
        ];
        for (const modelName of candidates) {
            process.stdout.write(`Testing ${modelName}... `);
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Hi");
                console.log(`✅ WORKS!`);
                console.log(`>>> RECOMMENDED MODEL: ${modelName}`);
                return;
            } catch (error) {
                if (error.message.includes("404")) console.log("❌ 404 Not Found");
                else if (error.message.includes("429")) console.log("❌ 429 Quota Exceeded");
                else console.log(`❌ Error: ${error.message.substring(0, 50)}...`);
            }
        }
        console.log("❌ No working model found in candidates list.");

    } catch (error) {
        console.error("Fatal Error:", error);
    }
}

findWorkingModel();
