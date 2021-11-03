const buttonElement = document.getElementById('log-button');
const tableElement = document.getElementById('log-table');


const toggleHiddenElement = domElement => {
    if (domElement.style.display === 'none') {
        domElement.style.display = 'block';
    } else {
        domElement.style.display = 'none';
    }
};


buttonElement.addEventListener('click', () => {
    toggleHiddenElement(tableElement)
});