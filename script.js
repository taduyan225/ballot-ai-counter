
//sao đéo đổi gì hết vậy ? 
// ===== CAMERA SETUP =====

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// mở camera
navigator.mediaDevices.getUserMedia({ video: true })
.then(stream => {
    video.srcObject = stream;
})
.catch(err => {
    console.error("Camera error:", err);
});


// ===== DATA =====

let votes = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0
};

const candidateKeys = ["A","B","C","D","E"];


// ===== CAPTURE BALLOT =====

function captureBallot(){

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video,0,0);

    processBallot(canvas);
}



// ===== PROCESS IMAGE =====

function processBallot(canvas){

    let src = cv.imread(canvas);

    let gray = new cv.Mat();
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

    let thresh = new cv.Mat();

    // phát hiện nét bút
    cv.threshold(
        gray,
        thresh,
        120,
        255,
        cv.THRESH_BINARY_INV
    );

    detectCandidates(thresh);

    src.delete();
    gray.delete();
    thresh.delete();
}



// ===== DETECT CROSSED LINES =====

function detectCandidates(binaryImg){

    let rowHeight = Math.floor(binaryImg.rows / 5);

    for(let i=0;i<5;i++){

        let roi = binaryImg.roi(
            new cv.Rect(
                0,
                i * rowHeight,
                binaryImg.cols,
                rowHeight
            )
        );

        let pixelCount = cv.countNonZero(roi);

        console.log("Row", i, "pixels:", pixelCount);

        // nếu ít pixel đen -> không bị gạch
        if(pixelCount < 2000){

            let key = candidateKeys[i];
            votes[key]++;

        }

        roi.delete();
    }

    updateResults();
}



// ===== UPDATE UI =====

function updateResults(){

    document.getElementById("A").innerText = votes.A;
    document.getElementById("B").innerText = votes.B;
    document.getElementById("C").innerText = votes.C;
    document.getElementById("D").innerText = votes.D;
    document.getElementById("E").innerText = votes.E;

}



// ===== RESET FUNCTION =====

function resetVotes(){

    votes = {
        A:0,
        B:0,
        C:0,
        D:0,
        E:0
    };

    updateResults();
}
