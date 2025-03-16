document.addEventListener("DOMContentLoaded", () => {

    
    // Function to extract query parameters from the URL
    function getQueryParam(param) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    }
  
    const publicationId = getQueryParam("id");
  
    if (!publicationId) {
      document.querySelector(".publication-container").textContent =
        "Publication ID is missing.";
      return;
    }
  
    fetch("publications.json")
      .then((response) => response.json())
      .then((publications) => {
        const publication = publications.find(
          (pub) => pub.id === parseInt(publicationId)
        );
  
        if (!publication) {
          document.querySelector(".publication-container").textContent =
            "Publication not found.";
          return;
        }
  
        // Populate the page with publication details
        const coverImage = document.getElementById("frontcover");
        document.getElementById("publication-title").textContent =
          publication.title;
        document.getElementById("publication-author").textContent =
          "By " + publication.author;
        document.getElementById("publication-content").textContent =
          publication.content;
        document.getElementById("spread01").src = publication.spread01;
        document.getElementById("spread02").src = publication.spread02;
        document.getElementById("spread03").src = publication.spread03;

        const specsSection = document.getElementById("publication-specs");
        const specs = publication.specs;
        let specsHTML = "<ul>";
    for (const [key, value] of Object.entries(specs)) {
      specsHTML += `<li><strong>${key}:</strong> ${value}</li>`;
    }
    specsHTML += "</ul>";

    // Insert the HTML into the specs section
    specsSection.innerHTML = specsHTML;
      
    // Set the initial image source
    coverImage.src = publication.frontcover;
    coverImage.alt = publication.title;
      // Add event listener for click to toggle between front and back covers
      let showingFront = true; // Track which image is currently displayed

      coverImage.addEventListener("click", () => {
        if (showingFront) {
          coverImage.src = publication.backcover; // Show back cover
        } else {
          coverImage.src = publication.frontcover; // Show front cover
        }
        showingFront = !showingFront; // Toggle state
      });
      })
      .catch((error) =>
        console.error("Error fetching publication details:", error)
      );
  });
  