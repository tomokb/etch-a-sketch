const canvasSize = 16;
const canvas = document.querySelector("#canvas");
const clearButton = document.querySelector("#clear-canvas");
const chooseColorButton = document.querySelector("#choose-color");

const clearOptions = document.querySelector("#clear-options");
const colorOptions = document.querySelector("#color-options");

const span1 = document.querySelectorAll(".close")[0];
const span2 = document.querySelectorAll(".close")[1];

window.onload = init;

function init() {
    createGrid();
    clearButton.addEventListener('click', displayGridOptions);
    chooseColorButton.addEventListener('click', displayColorOptions);

    // TODO: refactor
    span1.addEventListener('click', () => closeModal(clearOptions));
    span2.addEventListener('click', () => closeModal(colorOptions));

    window.addEventListener('click', (e) => {
        if (e.target === clearOptions) {
            closeModal(clearOptions);
        }
        if (e.target === colorOptions) {
            closeModal(colorOptions);
        }
       
    });
}

function setCanvasSize(newSize) {
    canvasSize = newSize;
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

function deleteGrid() {
    console.log("Deleting grid...");
    while(canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
    }
}

function fillTile(tile) {
    tile.classList.add('filled');
}

function eraseTile(tile) {
    tile.classList.remove('filled');
}

function clearCanvas() {
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

// Options: "New canvas" and "Cancel". 
function displayGridOptions() {
    clearOptions.style.display = "block";

    // New canvas
    const newSize = 16;
    if (newSize !== canvasSize) {
        setCanvasSize(newSize);
        deleteGrid();
        createGrid();
    }
    clearCanvas();
    //createGrid(newSize);
    return true;

    // Cancel
    return false;
}

// Options: "any RGB value," "randomize color," and "each pass adds 10% black." 
function displayColorOptions() {
    colorOptions.style.display = "block";
    return true;
}

function displayOptions(optionsPanel) {
    optionsPanel.style.display = "block";
    return true;
}

function closeModal(modal) {
    modal.style.display = "none";
}