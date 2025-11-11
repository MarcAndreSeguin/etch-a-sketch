const container = document.querySelector("#container");


container.innerHTML=''

for (let i = 0; i < 16; i++) {
    const newSquare = document.createElement("div");
    const squareSize = 960 / 4

    newSquare.classList.add('singleSquare');
    newSquare.style.width=`${squareSize}px`;
    newSquare.style.height=`${squareSize}px`;
    container.appendChild(newSquare);
}

