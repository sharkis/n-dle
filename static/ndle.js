window.addEventListener("load", (event) =>{
});
document.getElementById('n').addEventListener('change',async (e)=>{
console.log("select changed");
const response = await fetch("//127.0.0.1:8001",{method:"POST",body:e.target.value});
const word = await response.text();
document.getElementById('secret').innerHTML = word;
});

