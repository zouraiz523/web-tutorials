        // Elements
        const timeElement = document.getElementById('time');
        const dateElement = document.getElementById('date');
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        
       
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        
        
        function updateClock() {
            const now = new Date();
            
         
            timeElement.textContent = now.toLocaleTimeString(undefined, timeOptions);
            
           
            dateElement.textContent = now.toLocaleDateString(undefined, dateOptions);
        }
        
      
        function toggleDarkMode() {
            document.body.classList.toggle('dark-mode');
            
            
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
        }
        
      
        const savedDarkMode = localStorage.getItem('darkMode') === 'true';
        if (savedDarkMode) {
            document.body.classList.add('dark-mode');
            darkModeToggle.checked = true;
        }
        
       
        darkModeToggle.addEventListener('change', toggleDarkMode);
        
      
        updateClock();
        setInterval(updateClock, 1000);