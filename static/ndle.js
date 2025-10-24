window.addEventListener("load", () => {
  window.ndle = {
    history: [],
    curWord: "",
    nguess: 6,
    n: 5,
    player: localStorage.getItem("playerName") || null,
  };
  if (!window.ndle.player) {
    const name = prompt("Enter your name:");
    localStorage.setItem("playerName", name);
    window.ndle.player = name;
  }
  fetchWord();
  loadLeaderboard(); // show leaderboard at start
});

document.getElementById("n").addEventListener("change", () => {
  fetchWord();
});

document.getElementById("stdin").addEventListener("keyup", async (e) => {
  if (e.key === "Enter" || e.keyCode === 13) {
    const testWord = document.getElementById("stdin").value.trim();
    if (testWord.length !== window.ndle.curWord.length) {
      alert("Incorrect length!");
      return;
    }

    if (testWord !== window.ndle.curWord) {
      const historyEntry = compareWords(testWord, window.ndle.curWord);
      document.getElementById("guesshistory").appendChild(historyEntry);
      window.ndle.history.push(testWord);
      document.getElementById("stdin").value = "";

      if (window.ndle.history.length >= window.ndle.nguess) {
        alert(`Out of guesses! The word was: ${window.ndle.curWord}`);
        await saveGameResult(false);
        fetchWord();
      }
    } else {
      alert("You win!");
      await saveGameResult(true);
      fetchWord();
    }
  }
});

function compareWords(testWord, answer) {
  const colors = Array(answer.length).fill("gray");
  const correct = answer.split("");
  for (let i = 0; i < answer.length; i++) {
    if (testWord[i] === answer[i]) {
      colors[i] = "green";
      correct[i] = null;
    }
  }
  for (let i = 0; i < answer.length; i++) {
    if (colors[i] === "gray" && correct.includes(testWord[i])) {
      colors[i] = "yellow";
      correct[correct.indexOf(testWord[i])] = null;
    }
  }

  const entry = document.createElement("div");
  for (let i = 0; i < testWord.length; i++) {
    const letter = document.createElement("span");
    letter.textContent = testWord[i];
    letter.style.backgroundColor = colors[i];
    letter.style.color = "white";
    entry.appendChild(letter);
  }
  return entry;
}

async function fetchWord() {
  window.ndle.n = document.getElementById("n").value;
  const response = await fetch("//127.0.0.1:8001", {
    method: "POST",
    body: window.ndle.n,
  });
  window.ndle.curWord = (await response.text()).trim();
  window.ndle.history = [];
  document.getElementById("guesshistory").innerHTML = "";
  document.getElementById("stdin").value = "";
  document.getElementById("stdin").maxlength = window.ndle.n;
}

/* ========== Supabase Integration ========== */

// Save game result
async function saveGameResult(solved) {
  const guesses = window.ndle.history.length + (solved ? 1 : 0);
  const playerName = window.ndle.player;

  const { error } = await window.supabase
    .from("games")
    .insert([{ player_name: playerName, guesses, solved }]);

  if (error) {
    console.error("Error saving game:", error);
  } else {
    console.log("Game saved.");
    loadLeaderboard();
  }
}

// Load leaderboard
async function loadLeaderboard() {
  const { data, error } = await window.supabase
    .from("games")
    .select("player_name, guesses, solved, created_at")
    .eq("solved", true)
    .order("guesses", { ascending: true })
    .limit(10);

  if (error) {
    console.error("Error loading leaderboard:", error);
    return;
  }

  const div = document.getElementById("leaderboard");
  if (!div) return;

  div.innerHTML = "<h3>Leaderboard</h3>" +
    data
      .map(
        (g, i) =>
          `${i + 1}. ${g.player_name} — ${g.guesses} guesses`
      )
      .join("<br>");
}

