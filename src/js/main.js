var c = document.getElementById("main");
var ctx = c.getContext("2d");
const img = new Image(); // Create new img element
img.addEventListener("load", () => {
  ctx.drawImage(img, 0, 0);
});
img.src = "src/assets/field.png"; // Set source path
var paths = []
colors = []
const rect = c.getBoundingClientRect();
const scaleX = c.width / rect.width;
const scaleY = c.height / rect.height;
var isPressing = false;
c.addEventListener("mousedown", (e)=>{
    colors.push(ctx.strokeStyle);
    paths.push([[(e.clientX-rect.left)*scaleX, (e.clientY-rect.top)*scaleY]])
    ctx.beginPath();
    ctx.moveTo(paths[paths.length-1][0][0], paths[paths.length-1][0][1]);
    isPressing = true;
});
c.addEventListener("mousemove", (e)=>{
    if (isShift) {
        return;
    }
    if (isPressing) {
        paths[paths.length-1].push([(e.clientX-rect.left)*scaleX, (e.clientY-rect.top)*scaleY])
        ctx.lineTo(paths[paths.length-1][paths[paths.length-1].length-1][0], paths[paths.length-1][paths[paths.length-1].length-1][1]);
        ctx.stroke();
    }
});
c.addEventListener("mouseup", (e)=>{
    isPressing = false;
    paths[paths.length-1].push([(e.clientX-rect.left)*scaleX, (e.clientY-rect.top)*scaleY])
    ctx.lineTo(paths[paths.length-1][paths[paths.length-1].length-1][0], paths[paths.length-1][paths[paths.length-1].length-1][1]);
    ctx.stroke();
});
ctx.strokeStyle = "#ff00ff"
document.getElementById("lineColor").value = "#ff00ff"
document.getElementById("lineColor").addEventListener("change", (e)=>{
    ctx.strokeStyle = document.getElementById("lineColor").value;
});
function reset() {
    ctx.fillStyle = "white";
    ctx.rect(0, 0, c.width, c.height);
    ctx.fill();
    ctx.drawImage(img, 0, 0);
}
document.getElementById("reset").addEventListener("click", reset);

document.getElementById("back-one").addEventListener("click", (e)=>{
    reset();
    paths.pop()
    var i = 1;
    for (let path of paths) {
        ctx.strokeStyle = colors[i];
        ctx.beginPath();
        ctx.moveTo(path[0][0], path[0][1]);
        for (let dot of path) {
            ctx.lineTo(dot[0], dot[1]);
            ctx.stroke();
        }
        i++;
    }
    ctx.strokeStyle = document.getElementById("lineColor").value;
});
var isShift = false
document.addEventListener('keydown', function(event) {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') {
    event.preventDefault(); 
    document.getElementById("back-one").click();
  }
  isShift = event.key === "Shift"
});
document.addEventListener('keyup', (event)=>{
  isShift = event.key !== "Shift"
});
document.getElementById("print").addEventListener('click', () => {
    const dataUrl = c.toDataURL('image/png');
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head>
            <title>Print Canvas</title>
            <style>
                /* Reset margins for screen display */
                html, body { margin: 0; padding: 0; width: 100%; height: 100%; }
                img { width: 100%; display: block; height: auto; }
                
                /* Force full-bleed printing across all browsers */
                @media print {
                    @page { margin: 0; size: auto; }
                    html, body { margin: 0; padding: 0; width: 100%; }
                    img { width: 100% !important; height: auto !important; display: block !important; }
                }
            </style>
        </head>
        <body>
            <img id="printImg" src="${dataUrl}" />
            <script>
                const img = document.getElementById('printImg');
                img.onload = () => {
                    window.focus();
                    setTimeout(() => {
                        window.print();
                        window.close();
                    }, 250); // Prevents the infinite spinning loader bug
                };
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
});
