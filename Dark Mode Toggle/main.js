document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Check for saved user preference
    const darkMode = localStorage.getItem('darkMode');
    
    // Set initial theme based on saved preference
    if (darkMode === 'enabled') {
      enableDarkMode();
    }
    
    // Toggle dark mode when the button is clicked
    toggle.addEventListener('click', function() {
      if (body.classList.contains('dark-theme')) {
        disableDarkMode();
      } else {
        enableDarkMode();
      }
    });
    
    // Functions to handle dark mode
    function enableDarkMode() {
      body.classList.add('dark-theme');
      toggle.classList.add('active');
      localStorage.setItem('darkMode', 'enabled');
    }
    
    function disableDarkMode() {
      body.classList.remove('dark-theme');
      toggle.classList.remove('active');
      localStorage.setItem('darkMode', null);
    }
  });