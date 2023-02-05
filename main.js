function clicked00() {
    if(arr[0][0] === undefined && !isCompleted) {
        arr[0][0] = next;
        draw(0, 0);
    }
}

function clicked01() {
    if(arr[0][1] === undefined && !isCompleted) {
        arr[0][1] = next;
        draw(0, 1);
    }
}

function clicked02() {
    if(arr[0][2] === undefined && !isCompleted) {
        arr[0][2] = next;
        draw(0, 2);
    }
}

function clicked10() {
    if(arr[1][0] === undefined && !isCompleted) {
        arr[1][0] = next;
        draw(1, 0);
    }
}

function clicked11() {
    if(arr[1][1] === undefined && !isCompleted) {
        arr[1][1] = next;
        draw(1, 1);
    }
}

function clicked12() {
    if(arr[1][2] === undefined && !isCompleted) {
        arr[1][2] = next;
        draw(1, 2);
    }
}

function clicked20() {
    if(arr[2][0] === undefined && !isCompleted) {
        arr[2][0] = next;
        draw(2, 0);
    }
}

function clicked21() {
    if(arr[2][1] === undefined && !isCompleted) {
        arr[2][1] = next;
        draw(2, 1);
    }
}

function clicked22() {
    if(arr[2][2] === undefined && !isCompleted) {
        arr[2][2] = next;
        draw(2, 2);
    }
}


function getRandomInteger(n) {
    return Math.floor(Math.random() * n);
}


function getRandomUnfilledCoordinates() {
    let temp = [];

    for (let i = 0; i < arr.length; i++)
        for (let j = 0; j < arr[i].length; j++)
            if (arr[i][j] === undefined)
                temp.push([i, j]);
    
    let result = temp[getRandomInteger(temp.length)];
    arr[result[0]][result[1]] = next;
    console.log(result);
    console.log(arr);
    return result;
}


function draw(i, j) {
    let image = document.createElement("img");

    if (next) {
        image.src = "img/cross-296507.svg";
        image.alt = "Picture of X";
    }

    else {
        image.src = "img/alphabet-150778.svg";
        image.alt = "Picture of O";
    }

    image.style.width = "24vmin";
    image.style.height = "24vmin";

    document.getElementById("span"+ i + j).appendChild(image);
    

    checkWin();

    next = !next;
    isBotTurn = !isBotTurn;

    if (isBotTurn && isBotPlaying && !isCompleted){
        let iAndj = getRandomUnfilledCoordinates();
        draw(iAndj[0], iAndj[1]);
    }

}


function moveToButton() {
    const a = document.createElement("a");
    a.href = "#button";
    a.click();
}


function moveToTop() {
    const a = document.createElement("a");
    a.href = "#";
    a.click();
}


function drawStrike(pos, deg) {
    isCompleted = true;

    let image = document.createElement("img");

    image.id = "strikeOut";
    image.src = "img/strike.svg";
    image.alt = "Striking Out";

    image.style.width = "90vmin";
    image.style.height = "90vmin";
    image.style.display = "block";
    image.style.position = "absolute";
    image.style.objectPosition = "0vmin " + pos + "vmin";
    image.style.transform = "rotate(" + deg+ ")";

    document.getElementById("center").appendChild(image);

    moveToButton();
}


function checkWin() {
    if (arr[0][0] !== undefined) {
        if (arr[0][0] === arr[0][1] && arr[0][0] === arr[0][2]) {
            drawStrike("-30", "0");
        }

        if (arr[0][0] === arr[1][0] && arr[0][0] === arr[2][0]) {
            drawStrike("30", "90deg");
        }

        if (arr[0][0] === arr[1][1] && arr[0][0] === arr[2][2]) {
            drawStrike("0", "45deg");
        }
    }

    if (arr[2][0]!== undefined) {
        if (arr[2][0] === arr[2][1] && arr[2][0] === arr[2][2]) {
            drawStrike("30", "0deg");
        }

        if (arr[2][0] === arr[1][1] && arr[2][0] === arr[0][2]) {
            drawStrike("0", "315deg");
        }
    }

    if (arr[1][0] !== undefined && arr[1][0] === arr[1][1] && arr[1][0] === arr[1][2]) {
        drawStrike("0", "0deg");
    }

    if (arr[0][2] !== undefined && arr[0][2] === arr[1][2] && arr[0][2] === arr[2][2]) {
        drawStrike("-30", "90deg");
    }

    if (arr[0][1] !== undefined && arr[0][1] === arr[1][1] && arr[0][1] === arr[2][1]) {
        drawStrike("0", "90deg");
    }
}


function changeGameModeButtonText() {
    console.log("change game mode");
    if (isBotPlaying)
        document.getElementById("gameModeButton").innerHTML = "Play With Computer";
    else
        document.getElementById("gameModeButton").innerHTML = "Play With Friend";
}


function changeGameMode() {
    resetGame();
    changeGameModeButtonText();
    console.log(isBotPlaying);
    isBotPlaying = !isBotPlaying;
    console.log(isBotPlaying);
}


// Reset
function deleteImagesOnScreen() {
    while(document.getElementById("strikeOut"))
        document.getElementById("strikeOut").remove();

    for (var i = 0; i < arr.length; i++) 
        for (var j = 0; j < arr[i].length; j++) {
            arr[i][j] = undefined;
            document.getElementById("span" + i + j).innerHTML = "";
        }
}


function resetGame() {
    next = true;
    isCompleted = false;
    isBotTurn = false;

    deleteImagesOnScreen();

    moveToTop();
}


// Global Variables Declarations

let isBotPlaying = true;

let isBotTurn = false;

let isCompleted = false;

const arr = [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined]
];

let next = true;


// Saving Load Time in the Middle
function loadImg(src) {
    const img = document.createElement("img");
    img.src = src;

    document.getElementById("body").appendChild(img);
    document.getElementById("body").removeChild(img);
}


loadImg("img/strike.svg");
loadImg("img/alphabet-150778.svg");
loadImg("img/cross-296507.svg");

