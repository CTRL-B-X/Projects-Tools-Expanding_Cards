const fill = document.querySelector('.fill');
const empties = document.querySelectorAll('.empty');
// Add event listeners for drag events
fill.addEventListener('dragstart', dragStart);
fill.addEventListener('dragend', dragEnd);

// Add event listeners for drag events on empty elements
for (const empty of empties) {
    empty.addEventListener('dragover', dragOver);
    empty.addEventListener('dragenter', dragEnter);
    empty.addEventListener('dragleave', dragLeave);
    empty.addEventListener('drop', dragDrop);
}

// Fetch the background image URL from the API and apply it
const apiUrl = `https://api.unsplash.com/photos/random?client_id=[${keyz}]`; // Replace with your API URL

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const imageUrl = data.imageUrl; // Adjust based on your API's response structure

        // Apply the background image to the `.fill` element
        fill.style.backgroundImage = `url(${imageUrl})`;
        fill.style.backgroundSize = 'cover'; // Optional: Adjust the background size
        fill.style.backgroundPosition = 'center'; // Optional: Center the background image
    })
    .catch(error => console.error('Error fetching image URL:', error));

// Drag event handler functions
function dragStart() {
    this.className += ' hold';
    setTimeout(() => this.className = 'invisible', 0);
}

function dragEnd() {
    this.className = 'fill';
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.className += ' hovered';
}

function dragLeave() {
    this.className = 'empty';
}

function dragDrop() {
    this.className = 'empty';
    this.append(fill);
}
