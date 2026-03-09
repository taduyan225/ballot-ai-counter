const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let votes = {
A:0,
B:0,
C:0,
D:0,
E:0
};

const candidates = ["A","B","C","D","E"];

// mở camera
navigator.mediaDevices.getUserMedia({video:true})
.then(stream=>{
video.srcObject = stream;
});

function captureBallot(){

canvas.width = video.videoWidth;
canvas.height = video.videoHeight;

ctx.drawImage(video,0,0);

processImage(canvas);

}

function processImage(canvas){

let src = cv.imread(canvas);

let gray = new cv.Mat();
cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

let blur = new cv.Mat();
cv.GaussianBlur(gray, blur, new cv.Size(5,5),0);

let edges = new cv.Mat();
cv.Canny(blur, edges, 50,150);

// tìm line
let lines = new cv.Mat();
cv.HoughLinesP(edges, lines,1,Math.PI/180,100,100,10);

let crossedRows = [];

for(let i=0;i<lines.rows;i++){

let line = lines.data32S.slice(i*4,(i*4)+4);

let x1 = line[0];
let y1 = line[1];
let x2 = line[2];
let y2 = line[3];

// chỉ lấy line gần ngang
if(Math.abs(y1-y2) < 10){

crossedRows.push(y1);

}

}

detectCandidates(crossedRows);

src.delete();
gray.delete();
blur.delete();
edges.delete();
lines.delete();

}

function detectCandidates(lines){

// vị trí dòng ứng viên tương đối
let rows = [300,360,420,480,540];

for(let i=0;i<rows.length;i++){

let crossed = false;

for(let y of lines){

if(Math.abs(y-rows[i]) < 20){

crossed = true;
break;

}

}

if(!crossed){

votes[candidates[i]]++;

}

}

updateUI();

}

function updateUI(){

document.getElementById("A").innerText = votes.A;
document.getElementById("B").innerText = votes.B;
document.getElementById("C").innerText = votes.C;
document.getElementById("D").innerText = votes.D;
document.getElementById("E").innerText = votes.E;

}