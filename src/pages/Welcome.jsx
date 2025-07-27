import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import words from "../constants/words.json";

function Welcome() {
  const navigate = useNavigate();
  const [data, setData] = useState({ name: "", level: "noob" });

  function redirect() {
    if (data.name.trim() === "") {
      toast.error("Please enter your name");
      return;
    }

    const wordList = data.level === "noob" ? words[0].noob : words[1].pro;
    const movie = wordList[Math.floor(Math.random() * wordList.length)];

    navigate("/start", {
      state: {
        data: {
          name: data.name,
          level: data.level,
          word: movie.title.toUpperCase().replace(/\s+/g, ""),
          wordLength: movie.title.replace(/\s+/g, "").length,
          year: movie.year,
          star: movie.star,
          displayTitle: movie.title
        }
      }
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-300 via-blue-200 to-teal-100 py-10">
      <Toaster position="top-right" />
      <div className="max-w-md w-full px-4 mx-auto flex flex-col items-center">
       <h1 className="text-4xl font-extrabold text-purple-800 text-center mb-6 whitespace-nowrap tracking-wide drop-shadow-sm">
  🎬 Guess the Movie Name
</h1>

        <div className="bg-blue-100 shadow-lg rounded-3xl p-6 w-full text-center">
          <label htmlFor="name" className="block text-left mb-1 font-medium text-purple-800">
            Your Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={data.name}
            onChange={e => setData({ ...data, name: e.target.value })}
            onKeyDown={e => e.key === "Enter" && redirect()}
            className="w-full px-4 py-2 mb-4 rounded-md border-2 border-purple-500 text-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <label htmlFor="level" className="block text-left mb-1 font-medium text-purple-800">
            Select Difficulty
          </label>
          <select
            id="level"
            value={data.level}
            onChange={e => setData({ ...data, level: e.target.value })}
            className="w-full px-4 py-2 mb-6 rounded-md border-2 border-purple-500 text-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="noob">🧑‍🎓 Noob</option>
            <option value="pro">🧠 Pro</option>
          </select>

          <button
            onClick={redirect}
            className="w-full py-2 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-xl shadow-md transition"
          >
            🚀 Start Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;