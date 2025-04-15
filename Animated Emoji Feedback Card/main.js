   // Get DOM elements
   const feedbackContainer = document.getElementById('feedbackContainer');
   const emojis = document.querySelectorAll('.emoji');
   const submitBtn = document.getElementById('submitBtn');
   const thankYou = document.getElementById('thankYou');
   const newFeedbackBtn = document.getElementById('newFeedbackBtn');
   

   let selectedRating = null;

  
   emojis.forEach(emoji => {
       emoji.addEventListener('click', () => {
         
           emojis.forEach(e => e.classList.remove('selected'));
           
        
           emoji.classList.add('selected');
           
      
           selectedRating = emoji.getAttribute('data-rating');
           
          
           emoji.style.animation = 'none';
           setTimeout(() => {
               emoji.style.animation = 'bounce 1s';
           }, 10);
       });
   });

 
   submitBtn.addEventListener('click', () => {
       if (selectedRating) {
       
           thankYou.classList.add('show');
           
        
           createConfetti();
       } else {
          
           emojis.forEach(emoji => {
               emoji.style.animation = 'none';
               setTimeout(() => {
                   emoji.style.animation = 'shake 0.5s';
               }, 10);
           });
       }
   });

   newFeedbackBtn.addEventListener('click', () => {
      
       thankYou.classList.remove('show');
       
  
       emojis.forEach(emoji => emoji.classList.remove('selected'));
       document.querySelector('textarea').value = '';
       selectedRating = null;
   });

 
   function createConfetti() {
       const colors = ['#ff6b6b', '#48dbfb', '#feca57', '#1dd1a1', '#5f27cd'];
       
       for (let i = 0; i < 50; i++) {
           const confetti = document.createElement('div');
           confetti.className = 'confetti';
           confetti.style.left = Math.random() * 100 + '%';
           confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
           confetti.style.animationDelay = Math.random() * 2 + 's';
           
           thankYou.appendChild(confetti);
           
          
           setTimeout(() => {
               confetti.remove();
           }, 3000);
       }
   }