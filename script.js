const container = document.querySelector("#container");
const resetBtn = document.querySelector("#resetBtn");
const clearBtn = document.querySelector("#clearBtn");

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function createGrid(size) {
  container.innerHTML = "";
  const squareSize = 960 / size;

  for (let i = 0; i < size * size; i++) {
    const newSquare = document.createElement("div");
    newSquare.classList.add("singleSquare");
    newSquare.style.width = `${squareSize}px`;
    newSquare.style.height = `${squareSize}px`;
    newSquare.addEventListener('mouseover', drawBW)
    newSquare.addEventListener('mousedown', drawBW)
    container.appendChild(newSquare);
  }
}
createGrid(16); // default upon loading

resetBtn.addEventListener("click", () => {
  let newSize = prompt("Enter new grid size (max 100):");
  newSize = parseInt(newSize);
  if (newSize > 0 && newSize <= 100) {
    createGrid(newSize);
  } else {
    alert("Please enter a number between 1 and 100");
  }
});

clearBtn.addEventListener("click", () => {
    createGrid(16);
});

function drawBW(e) {
  if (e.type === 'mouseover' && !mouseDown) return
  e.target.style.backgroundColor = '#000000'
}