const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let votes = {A:0,B:0,C:0,D:0,E:0};
const keys = ["A","B","C","D","E"];

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
    cv.cvtColor(src,gray,cv.COLOR_RGBA2GRAY);

    let thresh = new cv.Mat();
    cv.threshold(gray,thresh,150,255,cv.THRESH_BINARY_INV);

    detectRows(thresh);

    src.delete();
    gray.delete();
    thresh.delete();
}

function detectRows(img){

    let rowHeight = img.rows / 5;

    for(let i=0;i<5;i++){

        let roi = img.roi(new cv.Rect(
            0,
            Math.floor(img.rows*0.4 + i*rowHeight*0.7),
            img.cols,
            Math.floor(rowHeight*0.7)
        ));

        let pixels = cv.countNonZero(roi);

        console.log("row",i,"pixels:",pixels);

        // nếu có nhiều pixel đen -> có gạch
        if(pixels < 5000){
            votes[keys[i]]++;
        }

        roi.delete();
    }

    updateUI();
}

function updateUI(){

    document.getElementById("A").innerText=votes.A;
    document.getElementById("B").innerText=votes.B;
    document.getElementById("C").innerText=votes.C;
    document.getElementById("D").innerText=votes.D;
    document.getElementById("E").innerText=votes.E;
}