const canvasSize = 16;
const canvas = document.querySelector("#canvas");
const clearButton = document.querySelector("#clear-canvas");
const chooseColorButton = document.querySelector("#choose-color");
window.onload = init;

function init() {
    createGrid();
    clearButton.addEventListener('click', clearCanvas);
    chooseColorButton.addEventListener('click', displayColorOptions);
}

// Default size is 16 x 16 tiles
function createGrid() {
    for (let i = 0; i < canvasSize; i++) {
        for (let j = 0; j < canvasSize; j++) {
            const tile = document.createElement('div');
            canvas.appendChild(tile);
            tile.addEventListener('mouseenter', () => fillTile(tile));
        }
    }
}

function fillTile(tile) {
    tile.classList.add('filled');
}

function eraseTile(tile) {
    tile.classList.remove('filled');
}

function clearCanvas() {
    if (!displayGridOptions()) {
        return false;
    }

    if (!canvas.hasChildNodes()) {
        return false;
    }

    const tiles = canvas.childNodes;
    for (let i = 0; i < tiles.length; i++) {
        let tile = tiles[i];
        if (tile.classList !== undefined) { // returns undefined when tile is text and not an element
            if (tile.classList.contains("filled")) {
                eraseTile(tile);
            }
        } 
    }
}

// Options: "New canvas?" and "Cancel". 
function displayGridOptions() {
    return true;
}

// Options: "any RGB value," "randomize color," and "each pass adds 10% black." 
function displayColorOptions() {
    return true;
}