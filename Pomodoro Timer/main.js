document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('container');
  const timeDisplay = document.getElementById('time');
  const startBtn = document.getElementById('start-btn');
  const resetBtn = document.getElementById('reset-btn');
  const tabs = document.querySelectorAll('.tab');
  
  let timer;
  let minutes = 25;
  let seconds = 0;
  let isRunning = false;
  
  // Mode durations in minutes
  const modes = {
      'pomodoro': 25,
      'short-break': 5,
      'long-break': 15
  };
  
  // Initialize timer display
  updateDisplay();
  
  // Tab click event
  tabs.forEach(tab => {
      tab.addEventListener('click', () => {
          const mode = tab.dataset.mode;
          
          // Remove active class from all tabs
          tabs.forEach(t => t.classList.remove('active'));
          
          // Add active class to clicked tab
          tab.classList.add('active');
          
          // Change container class for styling
          container.className = `container ${mode}`;
          
          // Reset timer
          clearInterval(timer);
          isRunning = false;
          minutes = modes[mode];
          seconds = 0;
          startBtn.textContent = 'START';
          
          // Update display
          updateDisplay();
      });
  });
  
  // Start/Pause button click event
  startBtn.addEventListener('click', () => {
      if (isRunning) {
          // Pause timer
          clearInterval(timer);
          isRunning = false;
          startBtn.textContent = 'START';
      } else {
          // Start timer
          isRunning = true;
          startBtn.textContent = 'PAUSE';
          
          timer = setInterval(() => {
              // Decrease time
              if (seconds === 0) {
                  if (minutes === 0) {
                      // Timer complete
                      clearInterval(timer);
                      isRunning = false;
                      startBtn.textContent = 'START';
                      
                      // Play sound
                      const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
                      audio.play();
                      
                      return;
                  }
                  minutes--;
                  seconds = 59;
              } else {
                  seconds--;
              }
              
              updateDisplay();
          }, 1000);
      }
  });
  
  // Reset button click event
  resetBtn.addEventListener('click', () => {
      // Get current mode
      const activeTab = document.querySelector('.tab.active');
      const mode = activeTab.dataset.mode;
      
      // Reset timer
      clearInterval(timer);
      isRunning = false;
      minutes = modes[mode];
      seconds = 0;
      startBtn.textContent = 'START';
      
      // Update display
      updateDisplay();
  });
  
  // Helper function to update time display
  function updateDisplay() {
      timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
});
