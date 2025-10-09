window.addEventListener("load", (event) => {
  window.ndle = {
    history: [],
    curWord: "",
    nguess: 6,
    n: 5,
  };
});
document.getElementById("n").addEventListener("change", async (e) => {
  window.ndle.n = e.target.value;
  const response = await fetch("//127.0.0.1:8001", {
    method: "POST",
    body: window.ndle.n,
  });
  window.ndle.curWord = (await response.text()).trim();
  // reset input
  document.getElementById("stdin").value = "";
  document.getElementById("stdin").maxlength = window.ndle.n;
});
document.getElementById("stdin").addEventListener("keyup", (e) => {
  if (e.key === "Enter" || event.keyCode === 13) {
    // check word
    console.log("user pressed enter");
    const testWord = document.getElementById("stdin").value;
    // TODO: make sure input is right length
    console.log(testWord.length, window.ndle.curWord.length);
    if (testWord.length !== window.ndle.curWord.length) {
      // alert incorrect length
    } else if (testWord !== window.ndle.curWord) {
      historyEntry = compareWords(testWord, window.ndle.curWord);
      // TODO: create colored letter indicators
      document.getElementById("guesshistory").appendChild(historyEntry);
      window.ndle.history.push(testWord);
      document.getElementById("stdin").value = "";
    } else {
      // win condition
    }
  }
});

function compareWords(testWord, answer) {
  console.log("comparing words", testWord, answer);
  const historyEntry = document.createElement("div");
  correctletters =[];
  for (i = 0; i < answer.length; i++) {
    const letterspan = document.createElement("span");
    // check for correct letters
    // check remaining letters to see if there are out-of-place letters
    if (answer[i] == testWord[i]) {
      letterspan.className = "greenletter";
      correctletters.push(i);

    } else {
      letterspan.className = "wrongletter";
    }
    letterspan.innerHTML = testWord[i];
    historyEntry.appendChild(letterspan);
  }
  console.log("returning history entry", historyEntry);
  return historyEntry;
}
