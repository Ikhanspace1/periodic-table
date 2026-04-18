document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('periodic-table');
    const searchBtn = document.getElementById('search-btn');
    const atomicInput = document.getElementById('atomic-number');

    // Generate periodic table
    ELEMENTS.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('element', element.category);
        div.id = `element-${element.atomicNumber}`;
        div.innerHTML = `
            <div class="element-symbol">${element.symbol}</div>
            <div class="element-atomic">${element.atomicNumber}</div>
        `;
        div.addEventListener('click', () => displayElement(element));
        table.appendChild(div);
    });

    // Search button event
    searchBtn.addEventListener('click', searchElement);
    atomicInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchElement();
    });

    function searchElement() {
        const atomicNumber = parseInt(atomicInput.value);
        if (atomicNumber >= 1 && atomicNumber <= 118) {
            const element = ELEMENTS.find(e => e.atomicNumber === atomicNumber);
            if (element) displayElement(element);
        } else {
            alert('Please enter a valid atomic number (1-118).');
        }
    }

    function displayElement(element) {
        // Remove previous highlights
        document.querySelectorAll('.element.highlight').forEach(el => 
            el.classList.remove('highlight')
        );

        // Highlight selected element
        const elementDiv = document.getElementById(`element-${element.atomicNumber}`);
        elementDiv.classList.add('highlight');
        elementDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Display element info
        const infoBox = document.getElementById('element-info');
        document.getElementById('element-name').textContent = element.name;
        document.getElementById('element-symbol').textContent = element.symbol;
        document.getElementById('element-atomic').textContent = element.atomicNumber;
        document.getElementById('element-mass').textContent = element.mass;
        document.getElementById('element-category').textContent = element.category.replace('-', ' ').toUpperCase();
        document.getElementById('element-config').textContent = element.config;

        infoBox.classList.remove('hidden');
        infoBox.classList.add('show');

        // Update input field
        atomicInput.value = element.atomicNumber;
    }
});
