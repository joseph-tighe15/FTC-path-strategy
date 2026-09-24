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
document.addEventListener('keydown', function(event) {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') {
    event.preventDefault(); 
    document.getElementById("back-one").click();
  }
});