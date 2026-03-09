const video = document.getElementById("video");

navigator.mediaDevices.getUserMedia({video:true})
.then(stream=>{
video.srcObject = stream;
});

let votes = {
A:0,
B:0,
C:0,
D:0,
E:0
};

function captureBallot(){

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = video.videoWidth;
canvas.height = video.videoHeight;

ctx.drawImage(video,0,0);

detectLines(canvas);

}

function detectLines(canvas){

let src = cv.imread(canvas);

let gray = new cv.Mat();

cv.cvtColor(src,gray,cv.COLOR_RGBA2GRAY);

let edges = new cv.Mat();

cv.Canny(gray,edges,50,150);

// chia vùng phiếu thành 5 dòng
let height = edges.rows/5;

for(let i=0;i<5;i++){

let roi = edges.roi(
new cv.Rect(
0,
i*height,
edges.cols,
height
)
);

let mean = cv.mean(roi)[0];

// nếu ít pixel đen → không bị gạch
if(mean > 200){

let key = Object.keys(votes)[i];
votes[key]++;

}

roi.delete();

}

updateUI();

src.delete();
gray.delete();
edges.delete();

}

function updateUI(){

document.getElementById("A").innerText = votes.A;
document.getElementById("B").innerText = votes.B;
document.getElementById("C").innerText = votes.C;
document.getElementById("D").innerText = votes.D;
document.getElementById("E").innerText = votes.E;

}