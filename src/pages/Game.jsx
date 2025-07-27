import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import WordDisplay from "../components/WordDisplay";
import toast, { Toaster } from "react-hot-toast";
import { VscDebugRestart } from "react-icons/vsc";
import { IoHome } from "react-icons/io5";
import words from "../constants/words.json";

function Game() {
  const location = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [input, setInput] = useState("");
  const [attempts, setAttempts] = useState([]);
  const [flag, setFlag] = useState(true);
  const [green, setGreen] = useState([]);
  const [chanceCount, setChanceCount] = useState(10);
  const [hint1Used, setHint1Used] = useState(false);
  const [hint2Used, setHint2Used] = useState(false);

  const { word, wordLength, year, star, name, level, displayTitle } = location.state?.data || {};
  const rerenderKey = location.state?.key;

  // Reset game state when a new word arrives
  useEffect(() => {
    if (!location.state) {
      navigate("/");
    } else {
      inputRef.current?.focus();
      setInput("");
      setAttempts([]);
      setFlag(true);
      setGreen([]);
      setChanceCount(10);
      setHint1Used(false);
      setHint2Used(false);
    }
  }, [rerenderKey]); // 👈 watches for restart trigger

  function result(greens) {
    setGreen(greens);
    setFlag(false);
  }

  function handleWord() {
    if (!flag || chanceCount <= 0) return;

    if (input.length !== wordLength) {
      toast.error(`Please enter a ${wordLength}-letter word`);
      return;
    }

    let g = [], y = [], usedIndexes = [];

    for (let i = 0; i < wordLength; i++) {
      if (input[i] === word[i]) {
        g.push(i);
        usedIndexes.push(i);
      }
    }

    for (let i = 0; i < wordLength; i++) {
      if (g.includes(i)) continue;
      for (let j = 0; j < wordLength; j++) {
        if (input[i] === word[j] && !usedIndexes.includes(j) && i !== j) {
          y.push(i);
          usedIndexes.push(j);
          break;
        }
      }
    }

    setAttempts(prev => [...prev, { input, yellow: y, green: g }]);
    setInput("");
    setChanceCount(prev => Math.max(prev - 1, 0));

    if (g.length === wordLength || chanceCount - 1 <= 0) {
      result(g);
    }
  }

  function generateKey() {
    return Math.random().toString(36).substring(2, 10); // simple unique string
  }

  function restartGame() {
    const wordList = level === "noob" ? words[0].noob : words[1].pro;
    const movie = wordList[Math.floor(Math.random() * wordList.length)];
    const newKey = generateKey();

    navigate("/start", {
      state: {
        key: newKey,
        data: {
          name,
          level,
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

        <div className="bg-blue-100 shadow-lg rounded-3xl p-6 w-full mb-6 text-center">
          <h2 className="text-lg font-bold text-blue-900 mb-1">Welcome, {name}</h2>
          <p className="text-sm font-medium text-blue-700">Difficulty: {level}</p>
          <p className="text-sm font-medium text-blue-900 mb-4">
            Chances Left: <span className="font-bold text-red-600">{chanceCount}</span>
          </p>

          <div className="flex justify-center gap-4 mb-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center px-3 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-md transition"
            >
              <IoHome className="mr-2" />
              Home
            </button>
            <button
              onClick={restartGame}
              className="flex items-center px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md transition"
            >
              <VscDebugRestart className="mr-2" />
              Restart
            </button>
          </div>

          <div className="flex justify-center gap-4">
            <button
              disabled={hint1Used || chanceCount > 2}
              onClick={() => {
                toast(`📅 Release Year: ${year}`);
                setHint1Used(true);
              }}
              className={`px-4 py-1 font-semibold rounded-lg shadow transition ${
                hint1Used || chanceCount > 2
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-yellow-400 hover:bg-yellow-500 text-black"
              }`}
            >
              🎁 Hint: Year
            </button>

            <button
              disabled={hint2Used || chanceCount > 1}
              onClick={() => {
                toast(`🌟 Star Cast: ${star}`);
                setHint2Used(true);
              }}
              className={`px-4 py-1 font-semibold rounded-lg shadow transition ${
                hint2Used || chanceCount > 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-pink-400 hover:bg-pink-500 text-white"
              }`}
            >
              🎁 Hint: Lead Actor
            </button>
          </div>
        </div>

        {flag && (
          <div className="w-full flex flex-col items-center mb-6">
            <input
              ref={inputRef}
              type="text"
              value={input}
              maxLength={wordLength}
              disabled={!flag || chanceCount <= 0}
              className="text-center text-xl font-bold py-3 px-4 rounded-lg border-2 border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full mb-4 bg-white disabled:opacity-50"
              onChange={e => setInput(e.target.value.toUpperCase())}
              onKeyDown={e => e.key === "Enter" && handleWord()}
              placeholder={`🔤 Enter ${wordLength}-letter word`}
            />
            <button
              disabled={!flag || chanceCount <= 0}
              onClick={handleWord}
              className={`w-full py-2 font-bold text-white rounded-xl transition ${
                flag && chanceCount > 0
                  ? "bg-purple-700 hover:bg-purple-800 shadow-md"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              ✅ Check
            </button>
          </div>
        )}

        {flag && (
          <div className="space-y-2 w-full">
            {attempts.map((value, id) => (
              <WordDisplay
                key={id}
                title={value.input}
                yellow={value.yellow}
                green={value.green}
              />
            ))}
          </div>
        )}

        {!flag && (
          <div className="mt-16 w-full text-center bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-2xl p-8 shadow-xl animate-pulse">
            <h2 className="text-4xl font-extrabold text-white drop-shadow-lg mb-2">
              {green.length === wordLength ? "🎊 YOU CRACKED IT!" : "😔 YOU MISSED IT!"}
            </h2>
            <p className="text-lg text-white font-medium">
              The mystery movie was <span className="font-bold underline decoration-white">{displayTitle}</span>.
            </p>
            <p className="mt-3 text-white text-md italic">
              {green.length === wordLength
                ? `That was blockbuster-level guessing, ${name}! 🍿🌟`
                : `Better luck next time, ${name}. 🎬🫣`}
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={restartGame}
                className="px-4 py-2 bg-white text-purple-700 font-semibold rounded-lg shadow hover:bg-purple-50 transition"
              >
                🔁 Play Again
              </button>
              <button
                onClick={() => navigate("/")}
                className="px-4 py-2 bg-white text-gray-700 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
                           >
                🏠 Back Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Game;