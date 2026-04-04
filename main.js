const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// 1. FILL WHITE BACKGROUND AT START
c.fillStyle = "white";
c.fillRect(0, 0, canvas.width, canvas.height);

// 2. SET BRUSH TO PINK
c.fillStyle = "hotpink";
let isDrawing = false;

function draw(x, y) {
  if (isDrawing) {
    c.beginPath();
    c.arc(x, y, 10, 0, Math.PI * 2);
    c.fill(); 
  }
}

// Drawing Event Listeners
canvas.addEventListener("mousemove", (event) => draw(event.offsetX, event.offsetY));
canvas.addEventListener("mousedown", () => (isDrawing = true));
canvas.addEventListener("mouseup", () => (isDrawing = false));

// 3. THE "FORCE DOWNLOAD" LOGIC
document.querySelector("a").addEventListener("click", (event) => {
  event.preventDefault(); // Stop the "broken" default click

  // toBlob is the most reliable way to make macOS recognize the file
  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link and trigger it immediately
    const tempLink = document.createElement("a");
    tempLink.href = url;
    tempLink.download = "my_painting.png";
    
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    
    // Cleanup the memory after the download starts
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }, "image/png");
});

// Swatches
const swatches = document.querySelectorAll('.swatch');

// Add click listener to each one
swatches.forEach(swatch => {
  swatch.addEventListener('click', () => {
    // Update the brush color
    const newColor = swatch.getAttribute('data-color');
    c.fillStyle = newColor;

    // Optional: Visual 'active' state
    swatches.forEach(s => s.classList.remove('active'));
    swatch.classList.add('active');
  });
});



