const canvasMinSize = 16;
const canvasMaxSize = 100;
const canvasPixelWidth = 480;
let canvasSize = canvasMinSize;
const canvas = document.querySelector("#canvas");
const newCanvasButton = document.querySelector("#new-canvas");
const chooseColorButton = document.querySelector("#choose-color");

const newCanvasOptions = document.querySelector("#new-canvas-options");
const colorOptions = document.querySelector("#color-options");

const span1 = document.querySelectorAll(".close")[0];
const span2 = document.querySelectorAll(".close")[1];

const canvasRange = document.querySelector('input[name=canvas-range]');
const canvasRangeLabel = document.querySelector('#canvas-size');

const colorOption = document.querySelector('input[name=color]');
const colorPreview = document.querySelector('#color-preview');
let currentColor = '#000';
let previewColor = '#000';
//colorPreview.style['background-color'] = `${color.value}`;

// const monochrome = hsl(0, 100, 10);
window.onload = init;

function init() {
    createGrid();
    newCanvasButton.addEventListener('click', displayNewCanvasOptions);
    chooseColorButton.addEventListener('click', displayColorOptions);

    // TODO: refactor (decouple JS logic from HTML)
    span1.addEventListener('click', () => closeModal(newCanvasOptions));
    span2.addEventListener('click', () => closeModal(colorOptions));

    window.addEventListener('click', (e) => {
        if (e.target === newCanvasOptions) {
            closeModal(newCanvasOptions);
        }
        if (e.target === colorOptions) {
            closeModal(colorOptions);
        }
    });

    colorPreview.addEventListener('input', updatePreviewColor)
    colorOption.addEventListener('input', updateCurrentColor);
    canvasRange.addEventListener('input', updateCanvasRangeLabel);
}

function updatePreviewColor(e) {

}

function updateCurrentColor(e) {
    switch (e.target.value) {
        case "user-select":
            currentColor = colorPreview.value;
            break;
        case "randomize": 
            break;
        case "monochrome":
            break;
    }
}

function randomizeColor() {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}

// Each pass adds 10% black (reduces lightness by 10%)
function monochromeColor() {
    let lightnessPercentage = 10;
}

function updateCanvasRangeLabel(e) {
    updateCanvasSize(e.target.value);
    canvasRangeLabel.textContent = `x ${canvasSize}`;
}

function updateCanvasSize(newSize) {
    // New canvas
    if (newSize !== canvasSize && newSize >= canvasMinSize && newSize <= canvasMaxSize) {
        canvasSize = newSize;
        deleteGrid();
        createGrid();
    }
}

// Default size is 16 x 16 tiles
function createGrid() {
    for (let i = 0; i < canvasSize * canvasSize; i++) {
        const tile = document.createElement('div');
        canvas.appendChild(tile);
        tile.addEventListener('mouseenter', () => fillTile(tile));
    }
    // CSS
    const tileSize = canvasPixelWidth / canvasSize;
    canvas.style['grid-template'] = `repeat(${canvasSize}, ${tileSize}px) / repeat(${canvasSize}, ${tileSize}px)`;
    console.log(`repeat(${canvasSize}, ${tileSize}px) / repeat(${canvasSize}, ${tileSize}px)`);
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
        if (tile.classList !== undefined) { // tile.classList returns undefined when tile is text and not an element
            if (tile.classList.contains("filled")) {
                eraseTile(tile);
            }
        } 
    }
}

function displayNewCanvasOptions() {
    displayOptions(newCanvasOptions);
    clearCanvas();
}

function displayColorOptions() {
    displayOptions(colorOptions);
}

function displayOptions(optionsPanel) {
    optionsPanel.style.display = "block";
    return true;
}

function closeModal(modal) {
    modal.style.display = "none";
}

function createModal(id) {
    const modal = document.createElement("div");
    const modalContent = document.createElement("div");
    const cancel = document.createElement("span");
    span.textContent = '&times;';
    modalContent.appendChild(cancel);
    modal.appendChild(modalContent);

    modal.setAttribute('id', id);
    modal.setAttribute('class', 'modal');
    modalContent.setAttribute('class', 'modal-content');
    cancel.setAttribute('class', 'close');
    return modal;
}