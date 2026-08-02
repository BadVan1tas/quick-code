import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    if (!query || typeof query !== "string") {
      return NextResponse.json({ text: "Meow! Please type a question or prompt." });
    }

    const raw = query.trim();
    const q = raw.toLowerCase();

    // ─── 1. SMART MATH EVALUATOR ───
    // Matches expressions like "2+2", "what is 2 + 2", "10 * 5", "100 / 4", "50 - 12", etc.
    const mathMatch = q.match(/(?:what is\s+)?(\d+(?:\.\d+)?\s*[\+\-\*\/\%]\s*\d+(?:\.\d+)?(?:\s*[\+\-\*\/\%]\s*\d+(?:\.\d+)?)*)/i);
    if (mathMatch && mathMatch[1]) {
      const expr = mathMatch[1].replace(/\s+/g, "");
      try {
        // Safe math evaluation for basic operators +, -, *, /, %
        if (/^[\d\.\+\-\*\/\%\(\)]+$/.test(expr)) {
          const result = Function(`"use strict"; return (${expr})`)();
          return NextResponse.json({
            text: `🐱 **CatBot Math AI**: ${mathMatch[1]} = **${result}**! 🐾`,
            source: "math",
          });
        }
      } catch (_) {}
    }

    // Direct math standalone number checks like "2+2"
    if (/^\d+\s*[\+\-\*\/]\s*\d+$/.test(raw)) {
      try {
        const result = Function(`"use strict"; return (${raw})`)();
        return NextResponse.json({
          text: `🐱 **CatBot Math AI**: ${raw} = **${result}**! 🐾`,
          source: "math",
        });
      } catch (_) {}
    }

    // ─── 2. CLEAN WIKIPEDIA & DUCKDUCKGO WEB SEARCH ENGINE ───
    // Clean search term: remove "what is", "who is", "tell me about", "define"
    const cleanedTerm = raw
      .replace(/^what\s+is\s+(a\s+|an\s+|the\s+)?/i, "")
      .replace(/^who\s+is\s+(a\s+|an\s+|the\s+)?/i, "")
      .replace(/^tell\s+me\s+about\s+/i, "")
      .replace(/^define\s+/i, "")
      .replace(/^explain\s+/i, "")
      .trim();

    if (cleanedTerm.length > 1) {
      // Wikipedia Live REST Summary API
      try {
        const wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cleanedTerm)}`;
        const wikiRes = await fetch(wikiUrl, { headers: { "User-Agent": "QuikCodeCatBot/1.0" } });

        if (wikiRes.ok) {
          const wikiData = await wikiRes.json();
          if (wikiData.extract && wikiData.type === "standard") {
            return NextResponse.json({
              text: `🐱 **CatBot Internet Intelligence**:\n\n${wikiData.extract}\n\n*(Source: Live Wikipedia Search)*`,
              source: "internet",
            });
          }
        }
      } catch (wikiErr) {
        console.warn("Wikipedia fetch error:", wikiErr);
      }

      // DuckDuckGo Instant Answer API Fallback
      try {
        const ddgUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(cleanedTerm)}&format=json&no_html=1&skip_disambig=1`;
        const ddgRes = await fetch(ddgUrl);
        if (ddgRes.ok) {
          const ddgData = await ddgRes.json();
          if (ddgData.AbstractText) {
            return NextResponse.json({
              text: `🐱 **CatBot Web Answer**:\n\n${ddgData.AbstractText}\n\n*(Source: DuckDuckGo Live Knowledge)*`,
              source: "internet",
            });
          }
        }
      } catch (ddgErr) {
        console.warn("DuckDuckGo fetch error:", ddgErr);
      }
    }

    // ─── 3. BUILT-IN TECH & GENERAL KNOWLEDGE KNOWLEDGE BASE ───
    if (q.includes("python")) {
      return NextResponse.json({
        text: `🐱 **CatBot Tech AI**: Python is a high-level, interpreted programming language known for readable syntax. It's widely used in Data Science, AI/Machine Learning (PyTorch, TensorFlow), and web backends (Django, FastApi)!`,
      });
    }

    if (q.includes("javascript") || q.includes("js")) {
      return NextResponse.json({
        text: `🐱 **CatBot Tech AI**: JavaScript is the programming language of the Web! Powered by V8 and Node.js engines, it runs frontend frameworks like React/Next.js and backend services. QuikCode builds full-stack apps using JS/TypeScript!`,
      });
    }

    if (q.includes("react")) {
      return NextResponse.json({
        text: `🐱 **CatBot Tech AI**: React is a popular open-source frontend UI library built by Meta. It enables component-based development, Virtual DOM reconciliation, and hooks for high-performance interactive web apps!`,
      });
    }

    if (q.includes("next.js") || q.includes("nextjs")) {
      return NextResponse.json({
        text: `🐱 **CatBot Tech AI**: Next.js is Vercel's React framework for production! It provides App Router, React Server Components (RSC), automatic code splitting, static site generation (SSG), and server-side rendering (SSR). QuikCode is built on Next.js 16!`,
      });
    }

    if (q.includes("ai") || q.includes("artificial intelligence") || q.includes("llm") || q.includes("gpt")) {
      return NextResponse.json({
        text: `🐱 **CatBot AI Knowledge**: Artificial Intelligence (AI) and Large Language Models (LLMs) process natural language, perform reasoning, and generate content. QuikCode builds custom AI Agents, LLM pipelines, and chat assistants for businesses!`,
      });
    }

    // Default Fallback
    return NextResponse.json({
      text: `🐾 I am CatBot, your AI Assistant! I can solve math problems (like "2+2" or "100/5"), answer general knowledge questions, explain tech topics, or recommend the best development plan for your project!`,
    });
  } catch (err: any) {
    return NextResponse.json({ text: "🐱 Meow! Ask me any math question (like 2+2) or general topic!" });
  }
}
