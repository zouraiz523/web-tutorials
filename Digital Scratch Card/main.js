document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('scratch-card');
    const ctx = canvas.getContext('2d');
    const progressBar = document.getElementById('scratch-progress');
    const resetBtn = document.getElementById('reset-btn');
    const scratchText = document.querySelector('.scratch-text');
    
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let scratchedCount = 0;
    const totalPixels = canvas.width * canvas.height;
    const scratchRadius = 20;
    const revealThreshold = 0.5; 
    
   let scratchedPixels = new Array(totalPixels).fill(false);
    
   
    function initCanvas() {
     
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#ccc');
      gradient.addColorStop(0.5, '#ddd');
      gradient.addColorStop(1, '#bbb');
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      
      for (let i = 0; i < 5000; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 1.5;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = Math.random() > 0.5 ? '#c5c5c5' : '#d5d5d5';
        ctx.fill();
      }
      
  
      scratchedCount = 0;
      scratchedPixels.fill(false);
      progressBar.style.width = '0%';
      scratchText.style.display = 'block';
    }
    

    function updateProgress() {
      scratchedCount = scratchedPixels.filter(Boolean).length;
      const percentage = (scratchedCount / totalPixels) * 100;
      progressBar.style.width = `${percentage}%`;
      
      if (percentage >= revealThreshold * 100) {
        // If more than the threshold is scratched, clear the scratch layer completely
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        scratchText.style.display = 'none';
        progressBar.style.width = '100%';
      }
    }
    
    function scratch(x, y) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, scratchRadius, 0, Math.PI * 2);
      ctx.fill();
      
     
      const minX = Math.max(0, Math.floor(x - scratchRadius));
      const maxX = Math.min(canvas.width, Math.ceil(x + scratchRadius));
      const minY = Math.max(0, Math.floor(y - scratchRadius));
      const maxY = Math.min(canvas.height, Math.ceil(y + scratchRadius));
      for (let i = minX; i < maxX; i++) {
        for (let j = minY; j < maxY; j++) {
          const dx = i - x;
          const dy = j - y;
          if (dx * dx + dy * dy <= scratchRadius * scratchRadius) {
            scratchedPixels[j * canvas.width + i] = true;
          }
        }
      }
      
      updateProgress();
    }
    
    
    canvas.addEventListener('mousedown', (e) => {
      isDrawing = true;
      const rect = canvas.getBoundingClientRect();
      lastX = e.clientX - rect.left;
      lastY = e.clientY - rect.top;
      scratch(lastX, lastY);
    });
    
    canvas.addEventListener('mousemove', (e) => {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;
      
      
      const dx = currentX - lastX;
      const dy = currentY - lastY;
      const distance = Math.max(Math.abs(dx), Math.abs(dy));
      for (let i = 0; i < distance; i++) {
        const x = lastX + (dx * i) / distance;
        const y = lastY + (dy * i) / distance;
        scratch(x, y);
      }
      
      lastX = currentX;
      lastY = currentY;
    });
    
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseleave', () => isDrawing = false);
    
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      isDrawing = true;
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      lastX = touch.clientX - rect.left;
      lastY = touch.clientY - rect.top;
      scratch(lastX, lastY);
    });
    
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const currentX = touch.clientX - rect.left;
      const currentY = touch.clientY - rect.top;
      
      const dx = currentX - lastX;
      const dy = currentY - lastY;
      const distance = Math.max(Math.abs(dx), Math.abs(dy));
      for (let i = 0; i < distance; i++) {
        const x = lastX + (dx * i) / distance;
        const y = lastY + (dy * i) / distance;
        scratch(x, y);
      }
      
      lastX = currentX;
      lastY = currentY;
    });
    
    canvas.addEventListener('touchend', () => isDrawing = false);
    canvas.addEventListener('touchcancel', () => isDrawing = false);
    
    resetBtn.addEventListener('click', initCanvas);
    
  
    initCanvas();
  });