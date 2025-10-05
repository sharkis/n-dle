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
    body: newlength,
  });
  window.ndle.curWord = await response.text();
  // reset input
  document.getElementById("stdin").value = "";
  document.getElementById("stdin").maxlength = window.ndle.n;
});
document.getElementById("stdin").addEventListener("keyup", (e) => {
  if (e.key === "Enter" || event.keyCode === 13) {
    // check word
    const testWord = document.getElementById("stdin").value;
      // TODO: make sure input is right length
    if (testWord !== window.ndle.curWord) {
      const historyEntry = document.createElement("div");
      // TODO: create colored letter indicators
      historyEntry.innerHTML = testWord;
      document.getElementById("guesshistory").appendChild(historyEntry);
      window.ndle.history.push(testWord);
      document.getElementById("stdin").value = "";
    }
    else{
      // win condition

    }
  }
});

function compareWords(testWord, answer){

}
