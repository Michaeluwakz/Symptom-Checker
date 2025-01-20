import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const port = 5000;

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(cors());
app.use(express.json());

app.post('/api/get-advice', async (req, res) => {
  try {
    const { condition, symptoms, severity } = req.body;

    const prompt = `As a medical AI assistant, provide professional advice for the following condition:
    Condition: ${condition}
    Symptoms: ${symptoms}
    Severity: ${severity}
    
    Please provide:
    1. A brief explanation of the condition
    2. Recommended immediate actions
    3. When to seek emergency medical attention
    
    Keep the response concise and professional.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          "role": "system", 
          "content": "You are a medical AI assistant providing advice about health conditions. Always include a disclaimer about consulting healthcare professionals."
        },
        {
          "role": "user",
          "content": prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    res.json({ advice: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to get AI advice' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
