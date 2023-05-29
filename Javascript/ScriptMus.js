let recordedChunks = [];
    let recordedBlob;
    let audioElement;

    // Access the microphone and start recording
    function startRecording() {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function (stream) {
          const mediaRecorder = new MediaRecorder(stream);

          mediaRecorder.addEventListener('dataavailable', function (event) {
            recordedChunks.push(event.data);
          });

          mediaRecorder.start();
        })
        .catch(function (error) {
          console.error('Error accessing the microphone:', error);
        });
    }

    // Stop recording and store the recorded audio in a variable
    function stopRecording() {
      if (recordedChunks.length === 0) {
        console.warn('No recorded audio available.');
        return;
      }

      const blob = new Blob(recordedChunks, { type: 'audio/webm' });
      const url = URL.createObjectURL(blob);
      recordedBlob = blob;

      // Create an audio element and set its source to the recorded audio
      audioElement = new Audio(url);
      audioElement.controls = true;
      document.body.appendChild(audioElement);

      // Enable the "Play Recording" button
      document.getElementById('playButton').disabled = false;

      // Reset the recording chunks for a new recording
      recordedChunks = [];
    }

    // Play the recorded audio
    function playRecording() {
      if (!recordedBlob) {
        console.warn('No recorded audio available.');
        return;
      }

      const url = URL.createObjectURL(recordedBlob);

      // Update the audio element source and play the recording
      audioElement.src = url;
      audioElement.play();
    }

    // Event listeners for the buttons
    document.getElementById('startButton').addEventListener('click', startRecording);
    document.getElementById('stopButton').addEventListener('click', stopRecording);
    document.getElementById('playButton').addEventListener('click', playRecording);