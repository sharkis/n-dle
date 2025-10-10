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
  const colors = new Array(answer.length);
  const t2 = []
  const a2 = []
  // correct letters
  for(i=0;i<answer.length;i++){
    if(testWord[i]==answer[i]){
      colors[i]='green';
    }
    else{
      t2.push(testWord[i]);
      a2.push(answer[i]);
    }
  }
  // misplaced letters
  // this needs to be a recursive thing
  for(i=0;i<t2.length;i++){
    if(a2.includes(t2)){



    }

  }


  // wrong letters


  // assemble entry
}
