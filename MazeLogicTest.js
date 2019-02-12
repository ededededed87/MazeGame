let testInfo = {};


function resetVariablesShouldSetAllVariablesToNone() {

    testInfo.resetVariablesShouldSetAllVariablesToNone = {};

    //arrange
    visitedSquares = [2,3,4,6,7,23,123123];
    shortestPath = [2,3,4];
    notInShortestPath = [6,7,23,123123];
    columnNumber = 12;
    rowNumber = 5;
    pathFoundFlag = true;
    document.getElementById('showPathRadio').checked = true;
    document.getElementById('hidePathRadio').checked = false;

    //act
    resetVariables();

    //assert
    if (visitedSquares.length === 0) {
        testInfo.resetVariablesShouldSetAllVariablesToNone.visitedSquares = "Passed";
    } else {
        testInfo.resetVariablesShouldSetAllVariablesToNone.visitedSquares = "visitedSquares was not reset correctly";
    }

    if (shortestPath.length === 0) {
        testInfo.resetVariablesShouldSetAllVariablesToNone.shortestPath = "Passed";
    } else {
        testInfo.resetVariablesShouldSetAllVariablesToNone.shortestPath = "shortestPath was not reset correctly";
    }

    if (notInShortestPath.length === 0) {
        testInfo.resetVariablesShouldSetAllVariablesToNone.notInShortestPath = "Passed";
    } else {
        testInfo.resetVariablesShouldSetAllVariablesToNone.notInShortestPath = "notInShortestPath was not reset correctly";
    }

    if (columnNumber === 0) {
        testInfo.resetVariablesShouldSetAllVariablesToNone.columnNumber = "Passed";
    } else {
        testInfo.resetVariablesShouldSetAllVariablesToNone.columnNumber = "columnNumber was not reset correctly";
    }

    if (rowNumber === 0) {
        testInfo.resetVariablesShouldSetAllVariablesToNone.rowNumber = "Passed";
    } else {
        testInfo.resetVariablesShouldSetAllVariablesToNone.rowNumber = "rowNumber was not reset correctly";
    }

    if (!pathFoundFlag) {
        testInfo.resetVariablesShouldSetAllVariablesToNone.pathFoundFlag = "Passed";
    } else {
        testInfo.resetVariablesShouldSetAllVariablesToNone.pathFoundFlag = "pathFoundFlag was not reset correctly";
    }

    if (document.getElementById('showPathRadio').checked === false) {
        testInfo.resetVariablesShouldSetAllVariablesToNone.showPathRadio = "Passed";
    } else {
        testInfo.resetVariablesShouldSetAllVariablesToNone.showPathRadio = "showPathRadio was not reset correctly";
    }

    if (document.getElementById('hidePathRadio').checked === true) {
        testInfo.resetVariablesShouldSetAllVariablesToNone.hidePathRadio = "Passed";
    } else {
        testInfo.resetVariablesShouldSetAllVariablesToNone.hidePathRadio = "hidePathRadio was not reset correctly";
    }
}

function runTests(){
    resetVariablesShouldSetAllVariablesToNone();
    console.log(testInfo);
}
