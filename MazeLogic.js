var columnNumber = 3;
var rowNumber = 2;
var mazeSize = 48;
var verticalWalls = [];

var topWall = "topWall";
var bottomWall = "bottomWall";
var leftWall = "leftWall";
var rightWall = "rightWall";

document.addEventListener('DOMContentLoaded', function () {
    loadMaze();
    generateMaze(1);
}, false);


function loadMaze() {
    var mazeContainer = document.getElementById("mazeContainer");
    mazeContainer.innerHTML = (getGridHtml());

}

function getGridHtml() {
    var htmlString = "";
    for (var i = 0; i < mazeSize; i++) {
        htmlString += "<div class=mazeRow id=row" + i + ">";
        for (var j = 0; j < mazeSize; j++) {

            htmlString += "<div class=\"mazeSquare leftWall topWall rightWall bottomWall\" id=mazeCellRow" + i + "Column" + j + "></div>";
        }

        htmlString += "</div>";

    }
    return htmlString;

}


var visitedSquares = [0];
var position = 0;

function generateMaze(startingPosition) {

    if (!visitedSquares.includes(startingPosition)) {
        visitedSquares.push(startingPosition);
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
        generateMaze(visitedSquares[indexOfCurrentPosition - 1]);
        return;
    }

    var allowedDirections = ["up", "down", "left", "right"]

    var randomDirection = allowedDirections[Math.floor(Math.random() * allowedDirections.length)]

    while (true) {
        switch (randomDirection) {
            case "up":
                if (!visitedSquares.includes(squareAboveCurrentPosition)) {

                    document.getElementById("mazeCellRow" + getRowFromPositionNumber(position) + "Column" + getColumnFromPositionNumber(position)).classList.remove(topWall);
                    position = position - mazeSize;
                    document.getElementById("mazeCellRow" + getRowFromPositionNumber(position) + "Column" + getColumnFromPositionNumber(position)).classList.remove(bottomWall);
                    generateMaze(position);
                    break;

                }
                else {
                    index = allowedDirections.indexOf("up");
                    allowedDirections.splice(index, 1);
                    randomDirection = allowedDirections[Math.floor(Math.random() * allowedDirections.length)]
                }

            case "down":

                if (!visitedSquares.includes(squareBelowcurrentPosition)) {

                    document.getElementById("mazeCellRow" + getRowFromPositionNumber(position) + "Column" + getColumnFromPositionNumber(position)).classList.remove(bottomWall);
                    position = position + mazeSize;
                    document.getElementById("mazeCellRow" + getRowFromPositionNumber(position) + "Column" + getColumnFromPositionNumber(position)).classList.remove(topWall);
                    generateMaze(position);
                    break;

                }
                else {
                    index = allowedDirections.indexOf("down");
                    allowedDirections.splice(index, 1);
                    randomDirection = allowedDirections[Math.floor(Math.random() * allowedDirections.length)]
                }

            case "left":
                if (!visitedSquares.includes(squareLeftOfCurrentPosition)) {

                    document.getElementById("mazeCellRow" + getRowFromPositionNumber(position) + "Column" + getColumnFromPositionNumber(position)).classList.remove(leftWall);
                    position = position - 1;
                    document.getElementById("mazeCellRow" + getRowFromPositionNumber(position) + "Column" + getColumnFromPositionNumber(position)).classList.remove(rightWall);
                    generateMaze(position);
                    break;

                }
                else {
                    index = allowedDirections.indexOf("left");
                    allowedDirections.splice(index, 1);
                    randomDirection = allowedDirections[Math.floor(Math.random() * allowedDirections.length)]
                }

            case "right":

                if (!visitedSquares.includes(squareRightOfCurrentPosition)) {

                    document.getElementById("mazeCellRow" + getRowFromPositionNumber(position) + "Column" + getColumnFromPositionNumber(position)).classList.remove(rightWall);
                    position = position + 1;
                    document.getElementById("mazeCellRow" + getRowFromPositionNumber(position) + "Column" + getColumnFromPositionNumber(position)).classList.remove(leftWall);
                    generateMaze(position);
                    break;
                }
                else {
                    index = allowedDirections.indexOf("right");
                    allowedDirections.splice(index, 1);
                    randomDirection = allowedDirections[Math.floor(Math.random() * allowedDirections.length)]
                }
            default:
                return;
        }
    }
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

            if (document.getElementById("mazeCellRow" + rowNumber + "Column" + newColumnNumber) !== null) {
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

            if (document.getElementById("mazeCellRow" + newRowNumber + "Column" + columnNumber) !== null) {
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

    var moveRight = function () {

        if (columnNumber <= mazeSize - 1) {
            var newColumnNumber = columnNumber + 1;

            if (document.getElementById("mazeCellRow" + rowNumber + "Column" + newColumnNumber) !== null) {
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

    var moveDown = function () {
        if (rowNumber <= mazeSize - 1) {
            var newRowNumber = rowNumber + 1;

            if (document.getElementById("mazeCellRow" + newRowNumber + "Column" + columnNumber) !== null) {
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


    var moveCharacter = function (currentColumn, currentRow, newColumn, newRow) {
        document.getElementById("mazeCellRow" + currentRow + "Column" + currentColumn).innerHTML = "";
        document.getElementById("mazeCellRow" + newRow + "Column" + newColumn).innerHTML = "\u26F9";
        columnNumber = newColumn;
        rowNumber = newRow;
    }
