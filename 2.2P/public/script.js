async function testHello() {
    try {
        const response = await fetch('/api/hello');
        const data = await response.json();
        displayResult(data);
    } catch (error) {
        displayResult({ error: error.message });
    }
}

async function testTime() {
    try {
        const response = await fetch('/api/time');
        const data = await response.json();
        displayResult(data);
    } catch (error) {
        displayResult({ error: error.message });
    }
}

function displayResult(data) {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = JSON.stringify(data, null, 2);
    resultDiv.style.display = 'block';
}
