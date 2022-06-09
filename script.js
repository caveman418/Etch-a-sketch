const slider = document.getElementById('myRange');
const output = document.querySelector('.sliderOutput');
const grid = document.querySelector('.grid');
const resizeButton = document.querySelector('.resize');

output.textContent = slider.value;

slider.addEventListener('input', () => {
    output.textContent = slider.value; //when slider is moved, number underneath is updated
});

function resize(e) {
    grid.textContent = ''; //clear grid

    for (let i = 1; i <= slider.value**2; i++) {
        const div = document.createElement('div');
        div.classList.add('box');
        div.style.cssText = 'width: ' + (100/slider.value) + '%'; //makes n divs fit into 100% of the canvas (width is set to make flex wrap work)

        div.addEventListener('mousedown', (e) => { //adds event listener to every single div
            e.target.classList.add('activated');
        });
        div.addEventListener('mouseenter', (e) => { 
            e.target.classList.add('activated');
        });
        
        grid.appendChild(div);
    }
}

resize(); //initialize 16x16 grid when page is loaded

resizeButton.addEventListener('click', resize); //run resize function above when resize button is clicked