var columnNumber = 3;
var rowNumber = 2;
var mazeSize = 32;

document.addEventListener('DOMContentLoaded', function() {
    loadMaze();
}, false);


function loadMaze() {
    var mazeContainer = document.getElementById("mazeContainer");
    mazeContainer.innerHTML = (getMazeHtml());
}

function getMazeHtml(){
    var htmlString = "";
    for (var i = 0; i < mazeSize; i++) {
        htmlString += "<div class=mazeRow id=row" + i + ">";
        for (var j = 0; j < mazeSize; j++) {
            if (i === 0 || i === mazeSize - 1 || j === 0 || j === mazeSize - 1 || (i === 4 && j === 5)) {

                    htmlString += "<div class=\"mazeSquare wall\" id=mazeWallRow" + i + "Column" + j + "></div>";
                }                
            
            else {
                if (i === rowNumber && j === columnNumber) {
                    htmlString += "<div class=\"mazeSquare blank\" id=blankSquareRow" + i + "Column" + j + ">\u26F9</div>";
                } 
                else {
                htmlString += "<div class=\"mazeSquare blank\" id=blankSquareRow" + i + "Column" + j + "></div>";
            }
                    }
                }
        htmlString += "</div>";  
    
}
    return htmlString;
}

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            moveLeft();
            break;
        case 38:
            moveUp();
            break;
        case 39:
            moveRight();
            break;
        case 40:
            moveDown();
            break;
    }
};

var moveLeft = function() {
    if (columnNumber >= 0) {
        var newColumnNumber = columnNumber - 1;

        if (document.getElementById("blankSquareRow" + rowNumber + "Column" + newColumnNumber) !== null) {
            moveCharacter(columnNumber, rowNumber, newColumnNumber, rowNumber);
        }
        else {
            window.alert("You can't move left");
        }
        
    }
    else {
        window.alert("You can't move left");
    }
} 

var moveUp = function () {
    if (rowNumber >= 0) {
        var newRowNumber = rowNumber - 1;

        if (document.getElementById("blankSquareRow" + newRowNumber + "Column" + columnNumber) !== null) {
            moveCharacter(columnNumber, rowNumber, columnNumber, newRowNumber);
        }
        else {
            window.alert("You can't move up");
        }
        
    }
    else {
        window.alert("You can't move up");
    }
} 

var moveRight = function() {

    if (columnNumber <= mazeSize - 1) {
        var newColumnNumber = columnNumber + 1;

        if (document.getElementById("blankSquareRow" + rowNumber + "Column" + newColumnNumber) !== null) {
            moveCharacter(columnNumber, rowNumber, newColumnNumber, rowNumber);
        }
        else {
            window.alert("You can't move right");
        }
        
    }
    else {
        window.alert("You can't move right");
    }
} 

var moveDown = function() {
    if (rowNumber <= mazeSize - 1) {
        var newRowNumber = rowNumber + 1;

        if (document.getElementById("blankSquareRow" + newRowNumber + "Column" + columnNumber) !== null) {
            moveCharacter(columnNumber, rowNumber, columnNumber, newRowNumber);
        }
        else {
            window.alert("You can't move down");
        }
        
    }
    else {
        window.alert("You can't move down");
    }
} 


var moveCharacter = function(currentColumn, currentRow, newColumn, newRow) {
   document.getElementById("blankSquareRow" + currentRow + "Column" + currentColumn).innerHTML = "";
   document.getElementById("blankSquareRow" + newRow + "Column" + newColumn).innerHTML = "\u26F9";
    columnNumber = newColumn;
    rowNumber = newRow;
}
