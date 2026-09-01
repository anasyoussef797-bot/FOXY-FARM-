import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getAIClient() {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (e) {
      console.warn('Failed to initialize GoogleGenAI client:', e);
    }
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', app: 'FOXY FARM' });
  });

  // AI Farm Tutor & Homework Assistant
  app.post('/api/ai/ask-mentor', async (req, res) => {
    const { character, subject, prompt, context } = req.body;
    const client = getAIClient();

    if (!client) {
      // High-quality smart mock response if API key is not configured
      const fallbackResponses: Record<string, string> = {
        Foxy: `🦊 *Foxy tips his farmer hat!* "Great question about ${subject || 'farming and science'}! In sustainable Egyptian agriculture, crop rotation and smart irrigation (like drip watering) preserve soil nutrients and save up to 40% of water. Keep going with your homework quest, young farmer!"`,
        Adam: `👨‍🌾 *Adam checks the soil sensor!* "Let's break this math and science puzzle down step-by-step: Remember to calculate the area first (Length × Width), then multiply by seed density. You've got this!"`,
        Talia: `👩‍🌾 *Talia smiles with her botanical notepad!* "Fascinating botany question! Photosynthesis converts sunlight, water, and carbon dioxide into glucose and oxygen ($6CO_2 + 6H_2O \\rightarrow C_6H_{12}O_6 + 6O_2$). That's why keeping our plants well-watered and under bright sunlight makes them grow so vibrant!"`,
        Spark: `⚡ *Spark the farm droid beeps excitedly!* "Data analysis complete! Sustainable energy in farming combines solar-powered water pumps with automated harvest timers for 98.4% efficiency. Mission parameters verified!"`,
      };

      const reply =
        fallbackResponses[character] ||
        `🌾 Welcome to Foxy Farm! Working through your homework mission strengthens your farm's productivity and unlocks rare crops. Question: "${prompt}". Remember to observe the natural cycles and review your lesson notes!`;

      return res.json({
        reply,
        model: 'educational-mentor-fallback',
        character: character || 'Foxy',
      });
    }

    try {
      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are ${character || 'Foxy'}, a friendly and encouraging educational farm mentor for students in the FOXY FARM platform (an educational gamification project by Impact Hub Egypt).
Subject: ${subject || 'Science, Math, Environmental Studies, Agriculture'}.
Context: ${JSON.stringify(context || {})}.
Student's prompt / homework question: "${prompt}".

Provide an engaging, supportive, easy-to-understand explanation with educational tips, real-world examples (especially relevant to Egyptian biodiversity, Nile agriculture, green tech, or problem-solving), and a motivational call-to-action for their farm. Keep the response under 150 words.`,
      });

      return res.json({
        reply: response.text || 'Keep learning and farming with Foxy!',
        model: 'gemini-2.5-flash',
        character: character || 'Foxy',
      });
    } catch (err: any) {
      console.error('Error generating AI response:', err);
      return res.json({
        reply: `🦊 "Great effort on your question! Remember that every question brings your farm closer to a bountiful harvest. Keep exploring and completing missions!"`,
        character: character || 'Foxy',
        note: 'fallback on error',
      });
    }
  });

  // AI Quiz Generator Endpoint
  app.post('/api/ai/generate-quiz', async (req, res) => {
    const { topic, gradeLevel } = req.body;
    const client = getAIClient();

    if (!client) {
      // Default structured farm quiz
      return res.json({
        quiz: {
          topic: topic || 'Plant Biology & Water Conservation',
          questions: [
            {
              id: 'q1',
              question: 'Which irrigation method is most effective for saving water in arid agricultural regions?',
              options: ['Flood irrigation', 'Drip irrigation', 'Sprinkler at noon', 'Open trench'],
              correctIndex: 1,
              explanation: 'Drip irrigation delivers water directly to the plant roots with minimal evaporation!',
            },
            {
              id: 'q2',
              question: 'What is the primary role of nitrogen (N) in plant growth?',
              options: ['Root strengthening only', 'Leaf growth and chlorophyll production', 'Seed germination in winter', 'Attracting pollinator bees'],
              correctIndex: 1,
              explanation: 'Nitrogen is vital for leaf development and building green chlorophyll!',
            },
            {
              id: 'q3',
              question: 'Which of the following Egyptian crops was historically revered along the fertile Nile delta?',
              options: ['Wheat and Flax', 'Coffee beans', 'Pineapples', 'Cocoa trees'],
              correctIndex: 0,
              explanation: 'Ancient Egyptian farmers thrived on wheat, barley, and flax grown in fertile silt soils!',
            },
          ],
        },
      });
    }

    try {
      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Generate 3 fun educational multiple-choice quiz questions for students about "${topic || 'Sustainable Agriculture and Science'}" at grade level "${gradeLevel || 'Middle School'}".
Return ONLY raw valid JSON with the schema:
{
  "topic": "${topic}",
  "questions": [
    {
      "id": "q1",
      "question": "string",
      "options": ["A", "B", "C", "D"],
      "correctIndex": 0,
      "explanation": "string"
    }
  ]
}`,
      });

      const text = response.text || '';
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return res.json({ quiz: parsed });
      }
      throw new Error('Could not parse JSON from Gemini response');
    } catch (err) {
      console.error('Quiz generator error:', err);
      return res.json({
        quiz: {
          topic: topic || 'Farm Science',
          questions: [
            {
              id: 'q1',
              question: 'What gas do plants absorb during photosynthesis?',
              options: ['Oxygen', 'Carbon Dioxide', 'Helium', 'Nitrogen'],
              correctIndex: 1,
              explanation: 'Plants absorb Carbon Dioxide ($CO_2$) and produce Oxygen ($O_2$).',
            },
          ],
        },
      });
    }
  });

  // Vite middleware for development vs static build for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🦊 FOXY FARM server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
