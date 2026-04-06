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
canvas.addEventListener("pointerdown", (e) => {
  isDrawing = true;
  draw(e.offsetX, e.offsetY); 
});

// pointermove tracks the finger or mouse
canvas.addEventListener("pointermove", (e) => {
  draw(e.offsetX, e.offsetY);
});

// pointerup and pointerleave act as the safety "off" switch
canvas.addEventListener("pointerup", () => (isDrawing = false));
canvas.addEventListener("pointerleave", () => (isDrawing = false));

// For IOS versions touch
canvas.addEventListener("touchstart", (e) => {
  if (e.target === canvas) e.preventDefault();
}, { passive: false });

canvas.addEventListener("touchmove", (e) => {
  if (e.target === canvas) e.preventDefault();
}, { passive: false });

// THE "DOWNLOAD" LOGIC
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

 // Find Share button/icon in the DOM
const shareBtn = document.querySelector('#shareBtn');  // or whatever your share ID is

if (shareBtn) {
  shareBtn.addEventListener("click", async () => {
    
    //  Turn the canvas into a Blob (just like your download logic)
    canvas.toBlob(async (blob) => {
      const file = new File([blob], "my_painting.png", { type: "image/png" });

      // Check if the browser supports sharing files (mobile Safari/Chrome usually do)
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: "Check out my painting!",
            text: "I made this on my digital canvas."
          });
        } catch (err) {
          console.log("User cancelled or share failed:", err);
        }
      } else {
        alert("Sharing isn't supported on this browser. Try downloading instead!");
      }
    }, "image/png");
  });
}

