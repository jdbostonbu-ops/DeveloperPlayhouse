# 🤖Welcome to the Developer Playhouse—create something beautiful before the machines take over. 
I stumbled upon this JS design while learning about the `anchor element` and using `the download attribute to save a <canvas>` as a PNG. While taking Google's Web Development courses, I was introduced to the MDN Web Docs site, which led me to a playground demo of a painting app. I used this as a foundation and added my own features—like a color swatch, a share button, a 'clear canvas' button and brush size buttons. I built the navigation bar to showcase how that same `<a>` element can handle emails, calls, and downloads to demonstrate the `anchor element’s <a>` versatility, all decorated with subtle animations [MDN anchor element lesson](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#using_the_download_attribute_to_save_a_canvas_as_a_png)
 
- I encourage users to use this demo site to create their own logo if they have that artistic vibe.

``This project is a digital canvas designed for collaboration, experimentation, and learning how attributes can be applied.``

### 👤 Author
**Jacqueline**  
[Check out my GitHub Profile](https://github.com/jdbostonbu-ops)

🚀 **[Visit the Developer Playhouse](https://jdbostonbu-ops.github.io/DeveloperPlayhouse/)**

# 🎨 Recent Masterpiece used as my favicon for the website.
![A Picasso painting from the Developer Playhouse](my_painting-2.png)

# 🌐 Browser & Device Compatibility


| Browser / Device | Status | Performance Notes |
| :--- | :--- | :--- |
| **Google Chrome** | ✅ Compatible | Full support for Chrome and Chromium-based rendering. Share Button shares a painting with a BLACK background canvas. |
| **Safari** | ✅ Compatible | Full support for Safari and WebKit rendering. Share Button shares a painting with a WHITE background canvas.|
| **Microsoft Edge** | ✅ Compatible | Full support for Edge (Chromium) rendering. Share Button shares a painting with a BLACK background canvas. |
| **Firefox** | ⚠️ Partial | Share and Clear Canvas features are unavailable; `Message: Sharing isn't supported on this browser. Try downloading instead!` |
| **iPad / Tablets** | ✅ Compatible | Optimized for touch-to-canvas interactions and 2D drawing. |
| **Microsoft Surface** | ✅ Compatible | Full support for stylus and touch-based state management. |
| **iPhone (iOS)** | ❌ Not Supported | Small-screen iOS is not currently optimized for canvas scaling. |

> **Note:** The Developer Playhouse is a high-precision digital canvas designed for larger viewports. While it works across most modern desktop engines, a tablet or desktop screen is required for the intended creative experience.

# 📖 About the Project
The Playhouse is a space to express yourself through code and color. It serves as a bridge between learning and doing:
- **Lessons learned:** Includes links to the Google online courses and MDN (developer.mozilla.org) resources that I used to build this site including how I learned about how the `download attribute`to save a `<canvas>` as a PNG works `<a href="" download="my_painting.png">Download my painting</a>` which was not used in my code. I used a diferrent method through trial and error because I made the mistake by placing the  `<a href="" download="my_painting.png">Download my painting</a>` further below my nav links which somehow kept interfering with this line `<a href="" download="my_painting.png">Download my painting</a>`, because I wanted it to be located just above the canvas. So, I changed my js to target the first `<a>` without using `dowload=`; however, I did test this with the js with `<a href="" download="my_painting.png">Download my painting</a>` and it works perfectly if I moved it inside my nav without having to write canvas.toBlob etc. Basically, my code is a bit extra because my version is 128 lines versus a much cleaner version which is below with only 98 lines which is much easier after testing both. We learn from our mistakes.

### 💻 The Core Logic
You can copy the full 98 lines script used to test my mistake below:

```javascript
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
let brushSize = 5;

// 1. FILL WHITE BACKGROUND AT START
c.fillStyle = "white";
c.fillRect(0, 0, canvas.width, canvas.height);

// 2. SET BRUSH TO PINK
c.fillStyle = "hotpink";
let isDrawing = false;

function draw(x, y) {
  if (isDrawing) {
    c.beginPath();
    c.arc(x, y, brushSize, 0, Math.PI * 2);
    c.fill(); 
  }
}

// Drawing Event Listeners
canvas.addEventListener("mousemove", (event) =>
  draw(event.offsetX, event.offsetY),
);
canvas.addEventListener("mousedown", () => (isDrawing = true));
canvas.addEventListener("mouseup", () => (isDrawing = false));

// THE "DOWNLOAD" LOGIC
document
  .querySelector("a")
  .addEventListener(
    "click",
    (event) => (event.target.href = canvas.toDataURL()),
  );
  
// Swatches Logic
const swatches = document.querySelectorAll('.swatch');

swatches.forEach(swatch => {
  swatch.addEventListener('click', () => {
    const newColor = swatch.getAttribute('data-color');
    c.fillStyle = newColor;

    swatches.forEach(s => s.classList.remove('active'));
    swatch.classList.add('active');
  });
});

// Share Logic
const shareBtn = document.querySelector('#shareBtn');

if (shareBtn) {
  shareBtn.addEventListener("click", async () => {
    canvas.toBlob(async (blob) => {
      const file = new File([blob], "my_painting.png", { type: "image/png" });

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

// Clear Canvas
const clearBtn = document.querySelector('#clearBtn');
clearBtn.addEventListener('click', () => {
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
});

// Size Selection
const sizeButtons = document.querySelectorAll('.size-btn');

sizeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    brushSize = btn.getAttribute('data-size');
    console.log("Brush size is now: " + brushSize);
  });
});
```

- **Testing:** A dedicated space to test your code and experiment with "features" (not bugs) found in the link that connects you to the MDN playground.
- **Creation:** Use the interactive canvas to build your masterpiece, then save your creation to your local machine before the machines take over.

# 🚀 Key Features
- **Interactive Painting:** Smooth, arc-based brush strokes using the draw function, as the code `c.arc()` for brush strokes and `canvas.toBlob` toBlob() is for saving: It turns the entire canvas image into a "Blob" (Binary Large Object), which is basically a raw file format that browsers use to handle downloads and sharing.
* **It handles the three main "pillars" of a basic drawing app:**
  * **State:** Keeping track of whether the mouse is down (`isDrawing`).
  * **Input:** Listening for mouse movement to get coordinates.
  * **Output:** Using `arc()` to stamp circles onto the canvas and `toDataURL()` to prepare the image for a download link.
- **Dynamic Swatches:** Easily swap between colors with visual 'active' states.
- **Clean Slate:** Every session starts with a crisp white background, ready for your first spark of inspiration.

# 🛠️ Technical Highlights (JavaScript)
The engine behind the Playhouse uses a 2D Canvas API with a few clever tricks:
- **State Management:** Tracks `isDrawing` via mousedown/mouseup listeners to ensure you only paint when you want to.
- **Memory Management:** Automatically revokes object URLs after downloads to keep the browser running lean.
- **Selector Logic:** The script uses `document.querySelector('a')`, which will only pick the first `<a>`tag it finds in the HTML file. In this layout, that first tag is the 'Download' link. Because the code stops searching after the first match, all subsequent links (like MDN or Email) are untouched by the JavaScript and continue to function as regular hyperlinks.

# 🎮 How to Use
- **Pick a color** from the dynamic swatches.
- **Click on the canvas** to start collaborating with the machine.
- **Click the Download Link** to save your `my_painting.png` forever.
- **Share** your masterpiece by text, email, airdrop, save image, assign to contact, add to social media or add to any app listed on your iPhone as a .png file.

