function speak() {
    let input = document.getElementById("text").value;
    // Create a SpeechSynthesisUtterance
    const utterance = new SpeechSynthesisUtterance(input);

    // Select a voice
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[0]; // Choose a specific voice

    // Speak the text
    speechSynthesis.speak(utterance);
}

