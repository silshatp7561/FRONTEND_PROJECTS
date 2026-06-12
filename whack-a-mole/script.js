let boxes = Array.from(document.getElementById("gameboard").children);
let scoretext = document.getElementById("score");

let score = 0;
let molebox="";
boxes.forEach(box => {
    box.addEventListener("click", hitmole);
});
showmole()
function showmole() {
    boxes.forEach(box => {
        box.textContent = "";
    });

    let randomindex = Math.floor(Math.random() * boxes.length);
    molebox=boxes[randomindex]
    molebox.textContent = "🦊";
    setTimeout(showmole, 1000);
}
function hitmole(even)
{
   const clickedcard=event.target;

   if(clickedcard===molebox)
   {
    score++;
    scoretext.textContent=score;
    molebox.textContent="";
   }
}