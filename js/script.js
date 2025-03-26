document.addEventListener("DOMContentLoaded", function () {
  const glideWrapper = document.getElementById("glide-wrapper");

  fetch("publications.json")
    .then((response) => response.json())
    .then((publications) => {
      publications.forEach((publication) => {
        const glideSlide = document.createElement("li");
        glideSlide.classList.add("glide__slide");

        const link = document.createElement("a");
        link.href = `/publications.html?id=${publication.id}`;
        link.classList.add("carousel-item");

        // Image container
        const imgWrapper = document.createElement("div");
        imgWrapper.classList.add("carousel-img-wrapper");

        const img = document.createElement("img");
        img.src = publication.frontcover || "assets/default_cover.jpg";
        img.alt = publication.title;
        img.classList.add("carousel-img");

        imgWrapper.appendChild(img);

        // Caption
        const caption = document.createElement("div");
        caption.classList.add("carousel-caption");
        
         // Use innerHTML to include both title and author
        caption.innerHTML = `${publication.title.replace(/\n/g, "<br>")}<br><span class="author-text"><em>${publication.author || ""}</em></span>`;
        

        // Structure
        link.appendChild(imgWrapper);
        link.appendChild(caption);
        glideSlide.appendChild(link);
        glideWrapper.appendChild(glideSlide);
      });

      // Initialize Glide.js
      new Glide(".glide", {
        type: "carousel",
        perView: window.innerWidth < 768 ? 1 : 3,
        focusAt: "center",
        gap: 20,
        breakpoints: {
          768: {
            perView: 1,
            focusAt: "center",
            gap: 10,
          },
        },
      }).mount();
    })
    .catch((error) => console.error("Error fetching publications:", error));
});


async function fetchFooter(){
  fetch("footer.html")
      .then(response => response.text())
      .then(data => document.getElementById("footer-container").innerHTML = data)
      .catch(error => console.error("Error loading footer:", error));
}

document.addEventListener("DOMContentLoaded", fetchFooter);
