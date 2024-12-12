    // VanillaTilt uygulanması
    VanillaTilt.init(document.querySelectorAll(".sci li a"), {
        max: 30,
        speed: 400,
        glare: true,
        "max-glare": 0.5
    });

    // Arka plan rengini değiştirme
    let list = document.querySelectorAll(".sci li");
    let bg = document.querySelector("body");

    list.forEach((element) => {
        element.addEventListener("mouseover", function(event) {
            let color = element.style.getPropertyValue("--clr");
            bg.style.backgroundColor = color;
        });
        element.addEventListener("mouseleave", function() {
            bg.style.backgroundColor = '#fff';
        });
    });
