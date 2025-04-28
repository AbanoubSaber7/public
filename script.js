// Geometric Calculations Script
// Handles dynamic input fields, calculations, and result display

document.addEventListener('DOMContentLoaded', function() {
    const shapeSelect = document.getElementById('shape');
    const inputsDiv = document.getElementById('inputs');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultsDiv = document.getElementById('results');

    // Input templates for each shape
    const inputTemplates = {
        square: [
            { label: 'Side Length', id: 'side', type: 'number', min: '0', step: 'any', required: true }
        ],
        rectangle: [
            { label: 'Width', id: 'width', type: 'number', min: '0', step: 'any', required: true },
            { label: 'Height', id: 'height', type: 'number', min: '0', step: 'any', required: true }
        ],
        triangle: [
            { label: 'Base', id: 'base', type: 'number', min: '0', step: 'any', required: true },
            { label: 'Height', id: 'height', type: 'number', min: '0', step: 'any', required: true },
            { label: 'Side A', id: 'sideA', type: 'number', min: '0', step: 'any', required: false },
            { label: 'Side B', id: 'sideB', type: 'number', min: '0', step: 'any', required: false },
            { label: 'Side C', id: 'sideC', type: 'number', min: '0', step: 'any', required: false }
        ],
        circle: [
            { label: 'Radius', id: 'radius', type: 'number', min: '0', step: 'any', required: true }
        ],
        cube: [
            { label: 'Edge Length', id: 'edge', type: 'number', min: '0', step: 'any', required: true }
        ]
    };

    // Render input fields based on selected shape
    function renderInputs(shape) {
        inputsDiv.innerHTML = '';
        inputTemplates[shape].forEach(input => {
            const label = document.createElement('label');
            label.htmlFor = input.id;
            label.textContent = input.label + (input.required ? ' *' : '');
            const field = document.createElement('input');
            field.type = input.type;
            field.id = input.id;
            field.min = input.min;
            field.step = input.step;
            if (input.required) field.required = true;
            field.placeholder = input.label;
            inputsDiv.appendChild(label);
            inputsDiv.appendChild(field);
        });
    }

    // Perform calculations based on shape and inputs
    function calculate() {
        const shape = shapeSelect.value;
        let area = null, perimeter = null, volume = null, surfaceArea = null;
        let output = '';
        try {
            switch (shape) {
                case 'square': {
                    const side = parseFloat(document.getElementById('side').value);
                    if (isNaN(side) || side <= 0) throw 'Please enter a valid side length.';
                    area = side * side;
                    perimeter = 4 * side;
                    output = `Area: ${area.toFixed(2)}<br>Perimeter: ${perimeter.toFixed(2)}`;
                    break;
                }
                case 'rectangle': {
                    const width = parseFloat(document.getElementById('width').value);
                    const height = parseFloat(document.getElementById('height').value);
                    if (isNaN(width) || width <= 0 || isNaN(height) || height <= 0) throw 'Please enter valid width and height.';
                    area = width * height;
                    perimeter = 2 * (width + height);
                    output = `Area: ${area.toFixed(2)}<br>Perimeter: ${perimeter.toFixed(2)}`;
                    break;
                }
                case 'triangle': {
                    const base = parseFloat(document.getElementById('base').value);
                    const height = parseFloat(document.getElementById('height').value);
                    const sideA = parseFloat(document.getElementById('sideA').value);
                    const sideB = parseFloat(document.getElementById('sideB').value);
                    const sideC = parseFloat(document.getElementById('sideC').value);
                    if (isNaN(base) || base <= 0 || isNaN(height) || height <= 0) throw 'Please enter valid base and height.';
                    area = (base * height) / 2;
                    output = `Area: ${area.toFixed(2)}`;
                    if (!isNaN(sideA) && !isNaN(sideB) && !isNaN(sideC) && sideA > 0 && sideB > 0 && sideC > 0) {
                        perimeter = sideA + sideB + sideC;
                        output += `<br>Perimeter: ${perimeter.toFixed(2)}`;
                    } else {
                        output += '<br>Perimeter: (Enter all three sides for perimeter)';
                    }
                    break;
                }
                case 'circle': {
                    const radius = parseFloat(document.getElementById('radius').value);
                    if (isNaN(radius) || radius <= 0) throw 'Please enter a valid radius.';
                    area = Math.PI * radius * radius;
                    perimeter = 2 * Math.PI * radius;
                    output = `Area: ${area.toFixed(2)}<br>Circumference: ${perimeter.toFixed(2)}`;
                    break;
                }
                case 'cube': {
                    const edge = parseFloat(document.getElementById('edge').value);
                    if (isNaN(edge) || edge <= 0) throw 'Please enter a valid edge length.';
                    volume = Math.pow(edge, 3);
                    surfaceArea = 6 * edge * edge;
                    output = `Volume: ${volume.toFixed(2)}<br>Surface Area: ${surfaceArea.toFixed(2)}`;
                    break;
                }
                default:
                    output = 'Please select a shape.';
            }
        } catch (err) {
            output = `<span style='color:red;'>${err}</span>`;
        }
        resultsDiv.innerHTML = output;
    }

    // Update input fields on shape change
    shapeSelect.addEventListener('change', function() {
        renderInputs(this.value);
        resultsDiv.innerHTML = '';
    });

    // Calculate on button click
    calculateBtn.addEventListener('click', function(e) {
        calculate();
    });

    // Calculate in real time as user types
    inputsDiv.addEventListener('input', function() {
        calculate();
    });

    // Initial render
    renderInputs(shapeSelect.value);

    // Contact form basic validation (optional, can be expanded)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for contacting us!');
            contactForm.reset();
        });
    }
});
