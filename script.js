const bannerInput = document.getElementById('banner-input')
const banner = document.getElementById('banner');
bannerInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            banner.src = e.target.result;
            localStorage.setItem('img', e.target.result)
        };
        reader.readAsDataURL(file);
    }
});



//location code

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        document.getElementById("demo").innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    document.getElementById("demo").innerHTML = "Latitude: " + latitude + "<br>Longitude: " + longitude;
}


//mic code 


const showauido = document.querySelector('.showauido');
const clearrecording = document.querySelector('.clear-recording')

clearrecording.addEventListener('click', () => {
    showauido.style.display = 'none';

})


let mediaRecorder;
let audioChunks = [];
async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
    });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.addEventListener('dataavailable', event => {
        audioChunks.push(event.data);
    });
    mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks);
        const audioUrl = URL.createObjectURL(audioBlob);
        saveAudio(audioUrl)
    });
    mediaRecorder.start();
}

function stopRecording() {
    mediaRecorder.stop();

}

function listAudiosFromLocalStorage() {
    const keys = Object.keys(localStorage)
    const audioContainer = document.getElementById('audioContainer');
    for (const key of keys) {
        if (key === "audio") {
            audioContainer.innerHTML += `<audio controls id="audioPlayer" src=${localStorage[key]}></audio>`
            clearrecording.style.display = 'block'
        }
    }
    audioContainer.style.display = 'block';
}

function saveAudio(audioUrl) {
    localStorage.setItem('audio', audioUrl);
    listAudiosFromLocalStorage()
}


//Popup code

const pageAvatar = document.querySelector('.page1-banner-avatar');
const popup = document.querySelector('.popup-box');
const popupclose = document.querySelector('#popup-close');
let flag = true;

pageAvatar.addEventListener('click', () => {
    if (flag == true) {
        popup.style.display = 'block';
        flag = false;
    } else {
        popup.style.display = 'none';
        flag = true;
    }
})

popupclose.addEventListener('click', () => {
    popup.style.display = 'none'
})




// avatar code 

const avatar = document.querySelector('#avatar');
const page1cir = document.querySelector('#page1-cir');

page1cir.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            avatar.src = e.target.result;
            popup.style.display = 'none'
            localStorage.setItem('imgee', e.target.result)
        };
        reader.readAsDataURL(file);
    }
});

//camera code



const videoElement = document.getElementById("video-preview");
const canvasElement = document.getElementById("canvas-preview");
const captureButton = document.getElementById("capture-btn");
const switchOnCameraButton = document.querySelector('.switch-on-camera-btn')
const box = document.querySelector('.circlee');
let pic = document.querySelector('.pic');
let isCameraOn = false;
let stream = null;
const popupcamera = document.querySelector('.popup-camera');
const popupgallary = document.querySelector('.popup-gallary');

// Function to access the camera
function accessCamera() {
    if (!isCameraOn) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (videoStream) {
                stream = videoStream;
                videoElement.srcObject = stream;
                videoElement.style.display = "block";
                isCameraOn = true;
                captureButton.style.display = "block";
                popupcamera.style.display = 'none';
                popupgallary.style.display = 'none';


            })
            .catch(function (error) {
                console.error("Error accessing the camera:", error);
            });
    } else {
        stream.getTracks().forEach((track) => {
            track.stop();
        });
        videoElement.srcObject = null;
        videoElement.style.display = "none";
        isCameraOn = false;
        popup.style.display = 'none';

        captureButton.style.display = "none";
        popupcamera.style.display = 'block';
        popupgallary.style.display = 'block';

    }
}
switchOnCameraButton.addEventListener("click", accessCamera);
// Capture button click event
captureButton.addEventListener("click", function () {
    const context = canvasElement.getContext("2d");
    // Set canvas size to match video
    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;
    // Draw video frame onto canvas
    context.drawImage(
        videoElement,
        0,
        0,
        canvasElement.width,
        canvasElement.height
    );
    // Convert canvas to image data URL
    canvasElement.style.display = "none"
    captureButton.style.display = 'none'
    stream.getTracks().forEach((track) => {
        track.stop();
    });

    popup.style.display = 'none';
    isCameraOn = true;
    const imageDataUrl = canvasElement.toDataURL("image/png");
    console.log(imageDataUrl);

    avatar.src = imageDataUrl;
    videoElement.style.display = "none";
    // Show input field for image name
    imageNameInput.style.display = "block";
});




