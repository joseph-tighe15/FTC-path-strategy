var c = document.getElementById("main");
var ctx = c.getContext("2d");
const img = new Image(); // Create new img element
img.addEventListener("load", () => {
  ctx.drawImage(img, 0, 0);
});
img.src = "src/assets/field.png"; // Set source path

const rect = c.getBoundingClientRect();
const scaleX = c.width / rect.width;
const scaleY = c.height / rect.height;
var isPressing = false;
c.addEventListener("mousedown", (e)=>{
    ctx.moveTo((e.clientX-rect.left)*scaleX, (e.clientY-rect.top)*scaleY);
    isPressing = true;
});
c.addEventListener("mousemove", (e)=>{
    if (isPressing) {
    ctx.lineTo((e.clientX-rect.left)*scaleX, (e.clientY-rect.top)*scaleY);
    }
});
c.addEventListener("mouseup", (e)=>{
    isPressing = false;
    ctx.lineTo((e.clientX-rect.left)*scaleX, (e.clientY-rect.top)*scaleY);
    ctx.stroke();
});
ctx.strokeStyle = "#ff00ff"