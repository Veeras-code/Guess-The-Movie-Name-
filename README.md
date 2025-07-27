

## 🎬 Guess the Movie Name

An interactive, single-page web game where players guess the name of a random Telugu or Indian movie within limited chances. The game features dynamic word-length logic, hint systems, celebratory win/lose banners, and smooth UI transitions — all optimized with React, Tailwind CSS, and Vite.

---

### 🚀 Live Demo

Check it out: [https://your-vercel-link.vercel.app](https://your-vercel-link.vercel.app)  
*(Replace this with your deployed Vercel URL)*

---

### 🛠️ Features

- 🔤 Dynamic word generation based on random movie name
- 🕵️‍♂️ Hint system with toggle logic and gating
- 🎉 Win/Lose feedback with banner animations
- 🍿 Toast notifications (via `react-hot-toast`) for user feedback
- 🔄 Full game restart logic with clean state reset
- 🌐 React Router for seamless navigation
- 📱 Fully responsive UI with TailwindCSS
- ⚡ Lightning-fast with Vite dev server

---

### 📦 Tech Stack

| Frontend       | Tooling & Styling      | Feedback & Routing  |
|----------------|------------------------|----------------------|
| React + Vite   | TailwindCSS + PostCSS | react-hot-toast, react-router-dom |

---

### 🧑‍💻 Local Development

```bash
# Clone the repo
git clone https://github.com/Veeras-code/Guess-The-Movie-Name-.git
cd Guess-The-Movie-Name-

# Install dependencies
npm install

# Start dev server
npm run dev
```

---

### 📂 Project Structure

```
src/
├── components/       # Reusable UI blocks (Header, Banner, etc.)
├── pages/            # Game screen, hint view, win/lose logic
├── utils/            # Movie word logic, randomizer, helpers
├── assets/           # Icons, images
├── App.jsx
├── main.jsx
vite.config.js
```

---

### 🔧 Deployment

Built and deployed via [Vercel](https://vercel.com/) using default Vite settings.

```json
// vercel.json
{
  "build": {
    "outputDirectory": "dist"
  }
}
```

---

### 🤔 Future Improvements

- 🎭 Movie categories (Telugu, Bollywood, Hollywood)
- 🧩 Difficulty levels (based on movie obscurity)
- 🔐 Progressive hint reveal system
- 🧠 Leaderboard & streak tracking
- 🧑‍🎨 Custom loading and victory animations

---

### 🙌 Credits

Created by [Veera Naga Sai Doddipatla](https://github.com/Veeras-code), aspiring software developer building modular, intuitive UIs and deploying scalable web games.

---

