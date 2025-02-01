import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./App.css";

function App() {
  const [character, setCharacter] = useState("🤖 Robot");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [lesson, setLesson] = useState("Variables");

  // Hardcoded Gemini API key
  const apiKey = "AIzaSyBff1SEonj5-IkejzH-hPWZQQTI-GSuH4k";

  const askAI = async () => {
    if (!apiKey) {
      alert("API key is missing. Please check your code.");
      return;
    }

    try {
      // Initialize Gemini
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      // Generate response
      const prompt = `You are a friendly Python tutor for children. Explain concepts in simple terms. Your character is ${character}. Answer this question: ${question}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setAnswer(text);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setAnswer("Oops! Something went wrong. Please try again.");
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Python Buddy 🐍</h1>
        <p className="tagline">Your AI-powered Python tutor for kids!</p>
      </header>

      <div className="container">
        <div className="description-section">
          <div className="description-card">
            <p>
              Python Buddy is an AI-powered Python tutor designed to make learning coding fun and accessible for children. With a playful and interactive interface, kids can explore Python concepts in an engaging way, guided by a friendly AI tutor. Whether it’s understanding variables, loops, or functions, Python Buddy breaks down complex ideas into simple, easy-to-understand explanations.
            </p>
            <p>
              Our unique features include <strong>customizable AI tutor characters</strong> (like a robot, dinosaur, or superhero) that children can choose based on their interests, and <strong>interactive homework assignments</strong> at the end of each lesson to reinforce learning. The design focuses on simplicity, interactivity, and a child-friendly experience, with bright colors, large buttons, and clear navigation. Python Buddy is not just a tutor—it’s a companion for every child’s coding journey!
            </p>
          </div>
        </div>

        <div className="ai-section">
          <div className="sidebar">
            <h2>Choose Your Tutor</h2>
            <select value={character} onChange={(e) => setCharacter(e.target.value)}>
              <option value="🤖 Robot">🤖 Robot</option>
              <option value="🦖 Dinosaur">🦖 Dinosaur</option>
              <option value="🦸 Superhero">🦸 Superhero</option>
            </select>
          </div>

          <div className="main">
            <h2>Ask Your AI Tutor</h2>
            <input
              type="text"
              placeholder="Type your question about Python here..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button onClick={askAI}>Ask</button>
            {answer && <div className="answer">{answer}</div>}

            <h2>Homework Assignment</h2>
            <select value={lesson} onChange={(e) => setLesson(e.target.value)}>
              <option value="Variables">Variables</option>
              <option value="Loops">Loops</option>
              <option value="Functions">Functions</option>
            </select>
            {lesson === "Variables" && (
              <p>
                <strong>Homework:</strong> Create a variable called <code>age</code> and set it to your age. Then print it!
              </p>
            )}
            {lesson === "Loops" && (
              <p>
                <strong>Homework:</strong> Write a loop that prints numbers from 1 to 10.
              </p>
            )}
            {lesson === "Functions" && (
              <p>
                <strong>Homework:</strong> Create a function called <code>greet</code> that prints "Hello, Python Buddy!"
              </p>
            )}
          </div>
        </div>
      </div>

      <footer>
        <p>Made with ❤️ by Python Buddy</p>
      </footer>
    </div>
  );
}

export default App;