const canvasSize = 16;
const canvas = document.querySelector("#canvas");
const clearButton = document.querySelector("#clear-canvas");
window.onload = init;

function init() {
    createGrid();
    clearButton.addEventListener('click', clearCanvas);
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
    if (displayGridOptions()) {
        if (!canvas.hasChildNodes()) {
            return "Grid has not been initialized!";
        }
        
        const tiles = canvas.childNodes;
        for (let i = 0; i < tiles.length; i++) {
            console.log(tiles[i]);
            if (tiles[i].classList.contains('filled')) {
                eraseTile(tiles[i]);
            }
        }
    }
}

// Options: "New canvas?" and "Cancel". 
function displayGridOptions() {
    return true;
}