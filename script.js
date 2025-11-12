const DEFAULT_COLOR = "rgb(0, 0, 0)";
const ERASER_COLOR = "rgb(232, 228, 228)";

let currentColor = DEFAULT_COLOR;

const container = document.querySelector("#container");
const resetBtn = document.querySelector("#resetBtn");
const clearBtn = document.querySelector("#clearBtn");

const drawBtn = document.getElementById("drawBtn");
const eraseBtn = document.getElementById("eraseBtn");

drawBtn.onclick = () => setCurrentColor(DEFAULT_COLOR);
eraseBtn.onclick = () => setCurrentColor(ERASER_COLOR);

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function createGrid(size) {
  container.innerHTML = "";
  const squareSize = 960 / size;

  for (let i = 0; i < size * size; i++) {
    const newSquare = document.createElement("div");
    newSquare.classList.add("singleSquare");
    newSquare.style.width = `${squareSize}px`;
    newSquare.style.height = `${squareSize}px`;
    newSquare.addEventListener("mouseover", drawErase);
    newSquare.addEventListener("mousedown", drawErase);
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

function setCurrentColor(newColor) {
  currentColor = newColor;
}

function drawErase(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  
  // Get current background color
  const current = getComputedStyle(e.target).backgroundColor;
  
  // Extract RGB values from target color
  const targetRGB = currentColor.match(/\d+/g).join(', ');
  
  // Extract RGB values from current color to check if it's the same color
  const currentRGB = current.match(/\d+/g)?.slice(0, 3).join(', ');
  
  let currentAlpha = 0;
  
  // If same color, get current alpha; if different color, start fresh at 0
  if (currentRGB === targetRGB) {
    if (current.includes('rgba')) {
      currentAlpha = parseFloat(current.split(',')[3]) || 0;
    } else if (current.includes('rgb')) {
      // 'rgb' format means fully opaque (alpha = 1.0)
      currentAlpha = 1.0;
    }
  }
  
  // Increase by 0.1, cap at 1.0
  e.target.style.backgroundColor = `rgba(${targetRGB}, ${Math.min(currentAlpha + 0.1, 1)})`;
}
