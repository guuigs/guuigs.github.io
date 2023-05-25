document.addEventListener('DOMContentLoaded', function() {
	const video = document.getElementById("video");
	const playPauseButton = document.getElementById("playPauseButton");
	const muteUnmuteButton = document.getElementById("muteUnmuteButton");
	const progress = document.querySelector('#progress');
  const phraseContainer = document.getElementById("phraseContainer");
  const nextContainer = document.getElementById("nextContainer");


  let isPlaying = false;
  let currentPhraseIndex = 0;
  let nextPhraseIndex = 1;
  let timers = [];
  let isVideoStarted = false;
let delayTimeout;

function togglePlayPause() {
  if (video.paused || video.ended) {
    if (!isVideoStarted) {
      isVideoStarted = true;
      video.addEventListener('timeupdate', handleTimeUpdate);
    }

    if (delayTimeout) {
      clearTimeout(delayTimeout);
    }

    startTimer(currentPhraseIndex);

    video.play();
    playPauseButton.innerHTML = "pause";
    isPlaying = true;
  } else {
    video.pause();
    playPauseButton.innerHTML = "play";
    stopAllTimers();
    isPlaying = false;
  }
}

function handleTimeUpdate() {
  const currentTimePercentage = video.currentTime / video.duration;

  if (currentTimePercentage >= phraseTimes[currentPhraseIndex + 1]) {
    video.removeEventListener('timeupdate', handleTimeUpdate);

    currentPhraseIndex = (currentPhraseIndex + 1) % phraseTimes.length;
    nextPhraseIndex = (nextPhraseIndex + 1) % phraseTimes.length;

    phrases[currentPhraseIndex].classList.add('active');
    phrases[nextPhraseIndex].classList.add('next');

    if (currentPhraseIndex === 0) {
      phrases[phraseTimes.length - 1].classList.remove('active');
    } else {
      phrases[currentPhraseIndex - 1].classList.remove('active');
    }
    phrases[currentPhraseIndex].classList.remove('before');
    phrases[nextPhraseIndex].classList.remove('next');

    phrases.forEach((phrase, index) => {
      if (index === currentPhraseIndex) {
        phrase.style.opacity = phraseOpacity.active;
      } else if (index === nextPhraseIndex) {
        phrase.style.opacity = phraseOpacity.next;
      } else {
        phrase.style.opacity = phraseOpacity.autre;
      }
    });

    delayTimeout = setTimeout(() => {
      handleTimeUpdate();
    }, 100);
  }
}

  

  
	function toggleMuteUnmute() {
	  if (video.muted) {
		video.muted = false;
		muteUnmuteButton.innerHTML = "mute";
	  } else {
		video.muted = true;
		muteUnmuteButton.innerHTML = "unmute";
	  }
	}
	
  
	function updateProgress() {
    const progressPercentage = (video.currentTime / video.duration) * 100;
    progress.style.width = progressPercentage + '%';
  
    const currentTimePercentage = video.currentTime / video.duration;
  
    if (currentTimePercentage >= phraseTimes[currentPhraseIndex + 1]) {
      // Passer à la phrase suivante
      currentPhraseIndex = (currentPhraseIndex + 1) % phraseTimes.length;
      nextPhraseIndex = (nextPhraseIndex + 1) % phraseTimes.length;
  
      // Mettre à jour l'affichage des phrases
      phrases[currentPhraseIndex].classList.add('active');
      phrases[nextPhraseIndex].classList.add('next');
  
      if (currentPhraseIndex === 0) {
        phrases[phraseTimes.length - 1].classList.remove('active');
      } else {
        phrases[currentPhraseIndex - 1].classList.remove('active');
      }
      phrases[currentPhraseIndex].classList.remove('before');
      phrases[nextPhraseIndex].classList.remove('next');
  
      // Mettre à jour l'opacité des phrases
      phrases.forEach((phrase, index) => {
        if (index === currentPhraseIndex) {
          phrase.style.opacity = phraseOpacity.active;
        } else if (index === nextPhraseIndex) {
          phrase.style.opacity = phraseOpacity.next;
        } else {
          phrase.style.opacity = phraseOpacity.autre;
        }
      });
  
      // Démarrer le minuteur pour la phrase suivante
      startTimer(currentPhraseIndex);
    }
  }
  
  
  
	playPauseButton.addEventListener("click", togglePlayPause);
  muteUnmuteButton.addEventListener("click", toggleMuteUnmute);
  video.addEventListener('timeupdate', updateProgress);
  
  const phrases = [
    "I love you...",
    "...",
    "Sunny, yesterday my life was filled with rain",
    "Sunny, you smiled at me and really eased the pain",
    "The dark days are gone",
    "And the bright days are here	",
    "My Sunny one shines so sincere",
    "Sunny one so true, I love you",
    "Sunny, thank you for the sunshine bouquet (that sweet bouquet)",
    "Sunny, thank you for the love you brought my way",
    "You gave to me your all and all",
    "Now I feel ten feet tall",
    "Sunny one so true, I love you",
    "Sunny, thank you for the truth you let me see",
    "Sunny, thank you for the facts from A to Z",
    "My life was torn like a windblown sand",
    "And the rock was formed when you held my hand",
    "Sunny one so true, I love you",
    "Sunny (...)",
    "Sunny, thank you for the smile upon your face",
    "Sunny, thank you for the gleam that shows its grace",
    "You're my spark of nature's fire",
    "You're my sweet complete desire",
    "Sunny one so true, I love you",
    "Sunny, yesterday my life was filled with rain",
    "Sunny, you smiled at me and really eased the pain",
    "The dark days are gone",
    "And the bright days are here",
    "My Sunny one shines so sincere",
    "Sunny one so true, I love you",
    "I love you (you're my baby)",
    "I love you (Sunny)",
    "I love you",
    "I love you (Sunny)",
  ];

  
  function updatePhrase() {
    const phraseContainer = document.getElementById("phraseContainer");
    phraseContainer.innerText = phrases[currentPhraseIndex];

    const nextContainer = document.getElementById("nextContainer");
    nextContainer.innerText = phrases[nextPhraseIndex];
  }

  function nextPhrase() {
    currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
    nextPhraseIndex = (nextPhraseIndex + 1) % phrases.length;
    updatePhrase();
  }
  
  function startTimer(index) {
    const delays = [3000, 25000, 8000, 7000, 2000, 2000, 4000, 8500, 7500, 6000, 5500, 3800, 8000, 8000, 7700, 3500, 4000, 8000, 31000, 8000, 8000, 4000, 4000, 8000, 7500, 7500, 2200, 2000, 4000, 8000, 4000, 3000, 4000, 3000];
    const delay = delays[index % delays.length];

    timers[index] = setTimeout(() => {
      nextPhrase();
      startTimer(currentPhraseIndex);
    }, delay);
  }

  function stopAllTimers() {
    timers.forEach(timerId => clearTimeout(timerId));
    timers = [];
  }


//-------------------------------------------------
// MICRO 

let mic, fft;
const numColumns = 50;

var sketch1 = function(p) {
  p.setup = function() {
    p.createCanvas(200, 100);
    p.mic = new p5.AudioIn();
    p.mic.start();
    p.fft = new p5.FFT();
    p.fft.setInput(p.mic);
    p.noStroke();
  };

  function drawColumns() {
    if (p.mic.enabled) {
      let spectrum = p.fft.analyze();
      let columnWidth = p.width / numColumns;

      for (let i = 0; i < numColumns; i++) {
        let startIdx = Math.floor(p.map(i, 0, numColumns, 0, spectrum.length));
        let endIdx = Math.floor(p.map(i + 1, 0, numColumns, 0, spectrum.length));
        let sum = 0;

        for (let j = startIdx; j < endIdx; j++) {
          sum += spectrum[j];
        }

        let avg = sum / (endIdx - startIdx);
        let columnHeight = p.map(avg, 0, 255, 0, p.height);
        let x = i * columnWidth;
        let y = p.height - columnHeight;

        p.fill(255, 255, 0); // Yellow color (red: 255, green: 255, blue: 0)
        p.rect(x, y, columnWidth, columnHeight);
      }
    }
  }

  p.draw = function() {
    p.clear();
    p.background(220, 10);
    drawColumns();
  };
};

var sketch2 = function(p) {
  p.setup = function() {
    p.createCanvas(200, 100);
    p.mic = new p5.AudioIn();
    p.mic.start();
    p.fft = new p5.FFT();
    p.fft.setInput(p.mic);
    p.noStroke();
  };

  function drawColumns() {
    if (p.mic.enabled) {
      let spectrum = p.fft.analyze();
      let columnWidth = p.width / numColumns;

      for (let i = 0; i < numColumns; i++) {
        let startIdx = Math.floor(p.map(i, 0, numColumns, 0, spectrum.length));
        let endIdx = Math.floor(p.map(i + 1, 0, numColumns, 0, spectrum.length));
        let sum = 0;

        for (let j = startIdx; j < endIdx; j++) {
          sum += spectrum[j];
        }

        let avg = sum / (endIdx - startIdx);
        let columnHeight = p.map(avg, 0, 255, 0, p.height);
        let x = i * columnWidth;
        let y = p.height - columnHeight;

        p.fill(255, 255, 0); // Yellow color (red: 255, green: 255, blue: 0)
        p.rect(x, y, columnWidth, columnHeight);
      }
    }
  }

  p.draw = function() {
    p.clear();
    p.background(220, 10);
    drawColumns();
    p.push();
    p.translate(0, p.height);
    p.scale(1, -1); // Flip the canvas vertically
    p.pop();
  };
};

var Spectrum = document.getElementById("Spectrum");
var SpectrumMirror = document.getElementById("SpectrumMirror");

new p5(sketch1, Spectrum);
new p5(sketch2, SpectrumMirror);
  
});


//--------------------------------------------------