document.addEventListener("DOMContentLoaded", function() {
    const userCard = document.querySelector(".user-card");
  
    // Simulate loading process
    setTimeout(() => {
      // Remove skeleton class and show real content
      userCard.classList.remove("skeleton");
      userCard.querySelectorAll(".hide-text").forEach(el => {
        el.classList.remove("hide-text");
      });
      document.querySelector(".user-avatar").style.visibility = "visible"; // Show avatar after loading
      document.querySelector(".user-cover").style.background = "url('https://picsum.photos/640/360') center/cover"; // Real background image
    }, 3000); // 3 seconds delay
  });
  