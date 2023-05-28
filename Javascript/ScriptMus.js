console.log("HEllo World");

const startButton = document.getElementById('startButton');
startButton.addEventListener("click", enregistre);

const finBouton = document.getElementById('finButton');
finBouton.addEventListener("click", finEnr);

let enregistrementAudioData = [];
function enregistre(){
    navigator.mediaDevices.getUserMedia({ audio:true})
    .then(oui)
    .catch(non)
}

function finEnr() {
    mediaRecorder.stop();
    const enregistreBlobAudio = new Blob(enregistrementAudioData, {type: 'audio/webm'});
    //Creation de l'element audio 
    const elementAudio = document.createElement('audio');
    elementAudio.src = URL.createObjectURL(enregistreBlobAudio);
    elementAudio.controls = true;
    document.body.appendChild(elementAudio);

    enregistrementAudioData = [];
}

function oui(stream) {
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();
    mediaRecorder.addEventListener('dataavailable', handleDataAvailable);
}

function non(error) {
    console.error("Erreur, ne peu pas acceder au micro");
}

function handleDataAvailable(event) {
    enregistrementAudioData.push(event.data);
}