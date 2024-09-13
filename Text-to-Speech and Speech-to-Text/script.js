  // Text to Speech Function
  function speakText() {
    const text = document.getElementById('textToSpeak').value;
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-US'; // Set language
    speechSynthesis.speak(speech);
}

// Speech to Text Function
function startRecognition() {
    // Check if browser supports SpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert('Your browser does not support Speech Recognition.');
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; // Set language
    recognition.interimResults = false; // Display results as they're recognized
    recognition.maxAlternatives = 1; // Number of alternative transcriptions provided per result

    recognition.start();

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById('recognizedText').textContent = transcript;
    };

    recognition.onerror = (event) => {
        console.error('Recognition error:', event.error);
    };

    recognition.onend = () => {
        console.log('Speech recognition service disconnected');
    };
}