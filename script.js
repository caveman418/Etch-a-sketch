const slider = document.getElementById('myRange');
const output = document.querySelector('.sliderOutput');
const grid = document.querySelector('.grid');
const resizeButton = document.querySelector('.resize');

output.textContent = slider.value;

slider.addEventListener('input', () => {
    output.textContent = slider.value;

});

resizeButton.addEventListener('click', () => {
    grid.textContent = ''; //clear grid

    for (let i = 1; i <= slider.value**2; i++) {

        const div = document.createElement('div');
        div.classList.add('box');
        div.style.cssText = 'width: ' + (100/slider.value) + '%';

        div.setAttribute('id', 'id:' + i);
        grid.appendChild(div);
    }
})