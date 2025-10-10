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
  const colors = Array(answer.length).fill('gray');
  const correct = answer.split("");
  // correct letters
  for(i=0;i<answer.length;i++){
    if(testWord[i]==answer[i]){
      colors[i]='green';
      correct[i]=null;
    }
  }
  // misplaced letters
  // this needs to be a recursive thing
  for(i=0;i<answer.length;i++){
    if(colors[i]=='gray' && correct.includes(testWord[i])){
      colors[i]='yellow';
      correct[correct.indexOf(testWord[i])]=null;
    }
  }

  // assemble entry
  const entry = document.createElement("div");
  for(i=0;i<testWord.length;i++){
    const letter = document.createElement("span");
    letter.textContent = testWord[i];
    letter.style.backgroundColor = colors[i];
    letter.style.color = "white";
    entry.appendChild(letter);
  }
  return entry;
}
