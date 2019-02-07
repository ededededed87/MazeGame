var columnNumber = 0;
var rowNumber = 0;
var mazeSize = 8;

var topWall = "topWall";
var bottomWall = "bottomWall";
var leftWall = "leftWall";
var rightWall = "rightWall";

var personUnicodeSymbol = "\u26F9"
var doorUnicodeSymbol = "\ud83d\udeaa"
var visitedSquares = [0];

var shortestPath = [];
var notInShortestPath = [];

document.addEventListener('DOMContentLoaded', function () {
    loadMaze();
    generateMaze(0);
    // solveMaze();
}, false);

function turnPathOn() {
    solveMaze();
}

function turnPathOff() {

    for (var i = 0; i < mazeSize * mazeSize; i++) {
        
            if (document.getElementById("mazeCellRow" + getRowFromPositionNumber(i) + "Column" + getColumnFromPositionNumber(i)) != null &&
                document.getElementById("mazeCellRow" + getRowFromPositionNumber(i) + "Column" + getColumnFromPositionNumber(i)).classList.contains("highlighted")) {

                document.getElementById("mazeCellRow" + getRowFromPositionNumber(i) + "Column" + getColumnFromPositionNumber(i)).classList.remove("highlighted");

            }
        }
    }

function loadMaze() {
    var mazeContainer = document.getElementById("mazeContainer");
    mazeContainer.innerHTML = (getGridHtml());

}

function solveMaze() {



    for (i = 0; i < shortestPath.length; i++) {
        document.getElementById("mazeCellRow" + getRowFromPositionNumber(shortestPath[i]) + "Column" + getColumnFromPositionNumber(shortestPath[i])).classList.add("highlighted");
    }

    for (i = 0; i < notInShortestPath.length; i++) {
        if (document.getElementById("mazeCellRow" + getRowFromPositionNumber(notInShortestPath[i]) + "Column" + getColumnFromPositionNumber(notInShortestPath[i])) != null &&
            document.getElementById("mazeCellRow" + getRowFromPositionNumber(notInShortestPath[i]) + "Column" + getColumnFromPositionNumber(notInShortestPath[i])).classList.contains("highlighted")) {

            document.getElementById("mazeCellRow" + getRowFromPositionNumber(notInShortestPath[i]) + "Column" + getColumnFromPositionNumber(notInShortestPath[i])).classList.remove("highlighted");

        }

    }



}

function getGridHtml() {
    var htmlString = "";
    for (var i = 0; i < mazeSize; i++) {
        htmlString += "<div class=mazeRow id=row" + i + ">";
        for (var j = 0; j < mazeSize; j++) {

            if (i == 0 && j == 0) {
                htmlString += "<div class=\"mazeSquare leftWall topWall rightWall bottomWall\" id=mazeCellRow" + i + "Column" + j + ">" + personUnicodeSymbol + "</div>";
            }
            else if (i == mazeSize - 1 && j == mazeSize - 1) {
                htmlString += "<div class=\"mazeSquare leftWall topWall rightWall bottomWall\" id=mazeCellRow" + i + "Column" + j + ">" + doorUnicodeSymbol + "</div>";
            }
            else {

                htmlString += "<div class=\"mazeSquare leftWall topWall rightWall bottomWall\" id=mazeCellRow" + i + "Column" + j + "></div>";
            }
        }

        htmlString += "</div>";

    }
    return htmlString;

}



var position = 0;
var pathFoundFlag = false;

function generateMaze(startingPosition) {

    if (!visitedSquares.includes(startingPosition)) {
        visitedSquares.push(startingPosition);
    }

    if (startingPosition == ((mazeSize * mazeSize) - 1) && !pathFoundFlag) {
        shortestPath = visitedSquares.slice(0);
        for (i = 0; i < mazeSize * mazeSize - 1; i++) {
            if (!visitedSquares.includes(i)) {
                notInShortestPath.push(i);
            }
        }
        pathFoundFlag = true;
    }

    position = startingPosition;

    var indexOfCurrentPosition = visitedSquares.indexOf(position);

    if (visitedSquares.length >= mazeSize * mazeSize) {
        return;
    }

    var squareAboveCurrentPosition = (getRowFromPositionNumber(position) != 0) ? position - mazeSize : 0;
    var squareBelowcurrentPosition = (getRowFromPositionNumber(position) != mazeSize - 1) ? position + mazeSize : 0;
    var squareLeftOfCurrentPosition = (getColumnFromPositionNumber(position) != 0) ? position - 1 : 0;
    var squareRightOfCurrentPosition = (getColumnFromPositionNumber(position) != mazeSize - 1) ? position + 1 : 0;

    if (
        visitedSquares.includes(squareAboveCurrentPosition) &&
        visitedSquares.includes(squareBelowcurrentPosition) &&
        visitedSquares.includes(squareLeftOfCurrentPosition) &&
        visitedSquares.includes(squareRightOfCurrentPosition)
    ) {
        if (!notInShortestPath.includes(visitedSquares[indexOfCurrentPosition]) && !pathFoundFlag) {
            notInShortestPath.push(visitedSquares[indexOfCurrentPosition]);
        }
        generateMaze(visitedSquares[indexOfCurrentPosition - 1]);
        return;

    }

    var allowedDirections = ["up", "down", "left", "right"]

    var randomDirection = allowedDirections[Math.floor(Math.random() * allowedDirections.length)]

    var test = true;
    while (test) {
        switch (randomDirection) {
            case "up":
                if (!visitedSquares.includes(squareAboveCurrentPosition)) {

                    document.getElementById("mazeCellRow" + getRowFromPositionNumber(position) + "Column" + getColumnFromPositionNumber(position)).classList.remove(topWall);
                    position = position - mazeSize;
                    document.getElementById("mazeCellRow" + getRowFromPositionNumber(position) + "Column" + getColumnFromPositionNumber(position)).classList.remove(bottomWall);
                    generateMaze(position);
                    test = false;
                    break;

                }
                else {
                    index = allowedDirections.indexOf("up");
                    allowedDirections.splice(index, 1);
                    randomDirection = allowedDirections[Math.floor(Math.random() * allowedDirections.length)]
                    break;
                }

            case "down":

                if (!visitedSquares.includes(squareBelowcurrentPosition)) {

                    document.getElementById("mazeCellRow" + getRowFromPositionNumber(position) + "Column" + getColumnFromPositionNumber(position)).classList.remove(bottomWall);
                    position = position + mazeSize;
                    document.getElementById("mazeCellRow" + getRowFromPositionNumber(position) + "Column" + getColumnFromPositionNumber(position)).classList.remove(topWall);
                    generateMaze(position);
                    test = false;
                    break;

                }
                else {
                    index = allowedDirections.indexOf("down");
                    allowedDirections.splice(index, 1);
                    randomDirection = allowedDirections[Math.floor(Math.random() * allowedDirections.length)]
                    break;
                }

            case "left":
                if (!visitedSquares.includes(squareLeftOfCurrentPosition)) {

                    document.getElementById("mazeCellRow" + getRowFromPositionNumber(position) + "Column" + getColumnFromPositionNumber(position)).classList.remove(leftWall);
                    position = position - 1;
                    document.getElementById("mazeCellRow" + getRowFromPositionNumber(position) + "Column" + getColumnFromPositionNumber(position)).classList.remove(rightWall);
                    generateMaze(position);
                    test = false;
                    break;

                }
                else {
                    index = allowedDirections.indexOf("left");
                    allowedDirections.splice(index, 1);
                    randomDirection = allowedDirections[Math.floor(Math.random() * allowedDirections.length)]
                    break;
                }

            case "right":

                if (!visitedSquares.includes(squareRightOfCurrentPosition)) {

                    document.getElementById("mazeCellRow" + getRowFromPositionNumber(position) + "Column" + getColumnFromPositionNumber(position)).classList.remove(rightWall);
                    position = position + 1;
                    document.getElementById("mazeCellRow" + getRowFromPositionNumber(position) + "Column" + getColumnFromPositionNumber(position)).classList.remove(leftWall);
                    generateMaze(position);
                    test = false;
                    break;
                }
                else {
                    index = allowedDirections.indexOf("right");
                    allowedDirections.splice(index, 1);
                    randomDirection = allowedDirections[Math.floor(Math.random() * allowedDirections.length)]
                    break;
                }
            default:
                return;
        }
    }
}

function getPositionFromRowAndColumn(row, column) {
    return ((mazeSize * (row)) + column);
}

function getRowFromPositionNumber(positionNumber) {

    return Math.floor(positionNumber / mazeSize);

}

function getColumnFromPositionNumber(positionNumber) {

    return positionNumber % mazeSize;

}

document.onkeydown = function (e) {
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

var moveLeft = function () {
    if (columnNumber >= 0) {
        var newColumnNumber = columnNumber - 1;

        if (!document.getElementById("mazeCellRow" + rowNumber + "Column" + columnNumber).classList.contains(leftWall) &&
            !document.getElementById("mazeCellRow" + rowNumber + "Column" + newColumnNumber).classList.contains(rightWall)) {
            moveCharacter(columnNumber, rowNumber, newColumnNumber, rowNumber);
        }
    }
}

var moveUp = function () {
    if (rowNumber >= 0) {
        var newRowNumber = rowNumber - 1;

        if (!document.getElementById("mazeCellRow" + rowNumber + "Column" + columnNumber).classList.contains(topWall) &&
            !document.getElementById("mazeCellRow" + newRowNumber + "Column" + columnNumber).classList.contains(bottomWall)) {
            moveCharacter(columnNumber, rowNumber, columnNumber, newRowNumber);
        }
    }
}

var moveRight = function () {
    if (columnNumber <= mazeSize - 1) {
        var newColumnNumber = columnNumber + 1;

        if (!document.getElementById("mazeCellRow" + rowNumber + "Column" + columnNumber).classList.contains(rightWall) &&
            !document.getElementById("mazeCellRow" + rowNumber + "Column" + newColumnNumber).classList.contains(leftWall)) {
            moveCharacter(columnNumber, rowNumber, newColumnNumber, rowNumber);
        }
    }
}

var moveDown = function () {
    if (rowNumber <= mazeSize - 1) {
        var newRowNumber = rowNumber + 1;

        if (!document.getElementById("mazeCellRow" + rowNumber + "Column" + columnNumber).classList.contains(bottomWall) &&
            !document.getElementById("mazeCellRow" + newRowNumber + "Column" + columnNumber).classList.contains(topWall)) {
            moveCharacter(columnNumber, rowNumber, columnNumber, newRowNumber);
        }
    }
}


var moveCharacter = function (currentColumn, currentRow, newColumn, newRow) {
    document.getElementById("mazeCellRow" + currentRow + "Column" + currentColumn).innerHTML = "";
    document.getElementById("mazeCellRow" + newRow + "Column" + newColumn).innerHTML = personUnicodeSymbol;
    columnNumber = newColumn;
    rowNumber = newRow;

    if (rowNumber == mazeSize - 1 && columnNumber == mazeSize - 1) {
        window.alert("You win!");
        resetMaze();
    }
}

var resetMaze = function () {
    document.getElementById("mazeContainer").innerHTML = "";
    loadMaze();
    resetVariables();
    generateMaze(0);
}

function resetVariables(){
    visitedSquares = [];
    shortestPath = [];
    notInShortestPath = [];
    columnNumber = 0;
    rowNumber = 0;
}
