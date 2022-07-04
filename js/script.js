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

let displayTextOnSquare = function (key){
    if (allSquares[currentSquare]==undefined){
        return;
    }
    allSquares[currentSquare].textContent=key.toUpperCase();
}

let isRoom = function (){
    //change to currentSquare==gridsize?? 
    if (currentSquare==5)
        {
            return false;
        }else{
            return true;
        }
}

let checkExactPlace = function (guess){
    for (let i=0; i<currentWordArray.length;i++){
        if (guess[i]==currentWordArray[i]){
            colorArray[i]="g";
        }
    }
}

let changeBackgroundColors = function (){
    for (let i=0; i<currentWordArray.length;i++){
        if (colorArray[i]=="y"){
            allSquares[i].style.backgroundColor="yellow";
        }else if (colorArray[i]=="g"){
            allSquares[i].style.backgroundColor="green";
        }else if (colorArray[i]==undefined){
            allSquares[i].style.backgroundColor="gray";
        }else{
            console.log("Something went wrong!");
        }
    }
}

let checkWrongPlace = function(guess){
    currentWordArray.forEach(letter =>{
        for (let i=0;i<currentWordArray.length;i++){
            if (letter==guess[i]){
                colorArray[i]="y";
            }
        }
    });
}
let checkWin = function(element){
    if (element=="g"){
        return true;
    }else{
        return false;
    }
}

let gradeGuess = function(guess){
    colorArray=[];
    checkWrongPlace(guess);
    checkExactPlace(guess);
    changeBackgroundColors();
    let win = colorArray.every(checkWin);
    //winner is logged to console
    console.log(win);
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
    gradeGuess(guess);
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

let generateNewWord = function (){
    //generate a new word here using random
    currentWord="earth";
    currentWordArray=currentWord.toUpperCase().split("");
}

const gameContainer = document.querySelector('.game-space');
let gridSize=5;
let currentRow=0;
let currentSquare=0;
let allSquares;
let colorArray=[];
drawGrid(gameContainer,gridSize);
const allRows=document.querySelectorAll('.row');
let currentWord;
let currentWordArray;
//Start of game
generateNewWord();
addKeyPressListener();
