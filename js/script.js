let drawGrid = function (container,gridSize){
    for (let i=0; i<gridSize;i++){
        row = document.createElement("div");
        container.appendChild(row);
        row.classList.add("row");
            for (let j=0; j<gridSize;j++){
                square = document.createElement("div");
                row.appendChild(square);
                square.classList.add("square");
            }
    }
}

let toggleSquare = function (square){
    if (square.style.backgroundColor){
        square.style.removeProperty('background-color')
    }else{
        square.style.backgroundColor="#E8A87C";
    }
}

/*let awaitInput = function (square){
    //listen for inputs here and enter them on the grid
    //add button to the side of each row with arrow to submit grid
    //impliment check system for words
}
*/

let addSquareListeners = function (gameContainer){
    let square = gameContainer.querySelectorAll(".square");
    square.forEach(element => {
        element.addEventListener('mouseover', () => {
            toggleSquare(element);
        })
        element.addEventListener('mouseleave', () => {
            toggleSquare(element);
        })
    });
}

let displayTextOnSquare = function (key){
    if (allSquares[currentSquare]==undefined){
        return;
    }
    allSquares[currentSquare].textContent=key.toUpperCase();
}

let isRoom = function (){
    if (currentSquare==5)
        {
            return false;
        }else{
            return true;
        }
}

let gradeGuess = function(){
    //check for matches in both arrays
}

let submitRow = function (){
    let guess = [];
    for (let i=0; i<5; i++){
        if (allSquares[i].textContent==""){
            return;
        }
        guess[i]=allSquares[i].textContent;
    }
    if (!currentRow<gridSize){
        currentRow++;
    }
    gradeGuess();
    currentSquare=0;
}

let removeSquareText = function (){
    reduceSquare();
    if (allSquares[currentSquare]==undefined){
        return;
    }
    allSquares[currentSquare].textContent="";
}


let increaseSquare = function(){
    currentSquare++;
    if (currentSquare>(currentRow+1)*5){
        currentSquare=(currentRow+1)*5;
    }
}

let reduceSquare = function(){
    currentSquare--;
    if (currentSquare<(currentRow)*5){
        currentSquare=(currentRow)*5;
    }
}
let game = function (key){
    allSquares=allRows[currentRow].querySelectorAll('.square');
    switch (key){
        case "Enter":
            submitRow();
            break;
        case ".":
            removeSquareText();
            break;
        default:
            if(isRoom()==true){
                displayTextOnSquare(key);
                increaseSquare();
            }
    }
    
}

let addKeyPressListener = function (){
    document.addEventListener('keypress',(e)=>{
        game(e.key);
    })
}

const gameContainer = document.querySelector('.game-space');
let gridSize=5;
let currentRow=0;
let currentSquare=0;
let currentWord="earth";
let currentWordArray=currentWord.toUpperCase().split("");
let allSquares;
drawGrid(gameContainer,gridSize);
const allRows=document.querySelectorAll('.row');
addSquareListeners(gameContainer);
addKeyPressListener();
