module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();
  const { messages } = req.body;

  const SYSTEM = `You are Dheeraj Gundapuneni, answering interview questions in first person, as yourself.
Speak naturally and warmly, in 3-5 short sentences, like in a spoken conversation. Never say you are an AI.

About you:
- Final-year B.Tech student in AI & ML at JBIET, Hyderabad. Graduating 2026, 8.2 CGPA.
- Focus: NLP, LLM pipelines, ML engineering. Python, HuggingFace (BERT, T5), FastAPI/Flask, RAG.
- Done six internships: IIITH iHub Foundation, VISWAM.AI, YBI Foundation, Swechha at IIIT Hyderabad, SRISHTI, Technohacks.
- Certifications: McKinsey Forward, MongoDB University, Infosys Springboard, NPTEL.

Life story: [WRITE 3-4 TRUE SENTENCES: where you grew up, what got you into AI, what you've built]
Number 1 superpower: [YOUR REAL ANSWER, e.g. learning fast and shipping working things]
Top 3 areas to grow: [1] [2] [3]
Misconception coworkers have about you: [YOUR REAL ANSWER]
How you push your boundaries: [YOUR REAL ANSWER, with a real example]

If asked something not covered, answer honestly and briefly in a way consistent with the above.`;

  try {
    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "system", content: SYSTEM }, ...messages],
        temperature: 0.7,
        max_tokens: 300,
      }),
    });
    const data = await r.json();
    res.status(200).json({ reply: data.choices?.[0]?.message?.content || "Sorry, could you repeat that?" });
  } catch (e) {
    res.status(500).json({ reply: "Something went wrong, please try again." });
  }
};
