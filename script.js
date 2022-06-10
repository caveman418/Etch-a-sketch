let isPainting = false;
let isRgb = false;
let isEraser = false;

const slider = document.getElementById('myRange');
const output = document.querySelector('.sliderOutput');
const grid = document.querySelector('.grid');
const resizeButton = document.querySelector('.resize');
const clearButton = document.querySelector('.clear');
const rgbSwitch = document.querySelector('.checkrgb');
const eraserButton = document.querySelector('.eraser');

output.textContent = `${slider.value} x ${slider.value}`; //initialize grid size number underneath slider (16)

slider.addEventListener('input', () => {
    output.textContent = `${slider.value} x ${slider.value}`; //when slider is moved, number underneath is updated
});

function draw(e) { //prioritizes eraser mode over rgb mode if both are activated
    if (isEraser) {
        e.target.style.backgroundColor = 'rgb(245,245,245)';
    } else if (isRgb) {
        e.target.style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16);
    } else {
        e.target.style.backgroundColor = document.querySelector('.colorpicker').value;
    }
};

function resize(e) { //clears grid and adds new divs with event listeners attached to each
    grid.textContent = ''; //clear grid

    for (let i = 1; i <= slider.value**2; i++) {
        const div = document.createElement('div');
        div.classList.add('box');
        div.style.cssText = 'width: ' + (100/slider.value) + '%'; //makes n divs fit into 100% of the canvas (width is set to make flex wrap work)
        div.style.backgroundColor = 'rgb(245, 245, 245)';

        div.addEventListener('mousedown', (e) => { //add these following event listeners to each div as they're created
            isPainting = true;
            draw(e);
        });
        div.addEventListener('mouseup', (e) => {
            isPainting = false;
        })
        div.addEventListener('mouseenter', (e) => {
            if (isPainting) {
                draw(e);
            }
        });
        
        grid.appendChild(div); //put the div with all those settings into the canvas
    }
}

resize(); //initialize 16x16 grid when page is loaded

resizeButton.addEventListener('click', resize); //run resize function above when resize button is clicked

clearButton.addEventListener('click', resize); //the clear button does the exact same as the resize button

rgbSwitch.addEventListener('click', (e) => {isRgb = !isRgb}); //toggles rgb mode

eraserButton.addEventListener('click', (e) => {isEraser = !isEraser}); //toggles rgb mode