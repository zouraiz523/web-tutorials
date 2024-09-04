document.addEventListener('DOMContentLoaded', () => {
    const counterElement = document.getElementById('counter');
    let counter = 0;

    document.body.addEventListener('click', (e) => {
        if (e.target.id === 'increment') counter++;
        if (e.target.id === 'decrement' && counter > 0) counter--;
        if (e.target.id === 'reset') counter = 0;
        counterElement.textContent = counter;
    });
});
