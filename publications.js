document.addEventListener("DOMContentLoaded", () => {
  // Function to extract query parameters from the URL
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  // Fetch the publications when the page loads
  fetch("publications.json")
    .then((response) => response.json())
    .then((publications) => {
      const publicationList = document.getElementById("publication-list");
      const publicationContent = document.getElementById("publication-content");

      // Create the left column links dynamically based on the JSON data
      publications.forEach((publication) => {
        const link = document.createElement("a");
        link.href = "#"; // No page reload
        link.textContent = publication.title;
        link.setAttribute("data-id", publication.id); // Store the publication id

        // Add the link to the left column
        const listItem = document.createElement("li");
        listItem.appendChild(link);
        publicationList.appendChild(listItem);

        // Set the click event listener for the link
        link.addEventListener("click", (event) => {
          event.preventDefault();
          const publicationId = event.target.getAttribute("data-id");

          // Find the corresponding publication from the JSON data
          const publication = publications.find((pub) => pub.id === parseInt(publicationId));

          if (publication) {
            // Populate the right column with the publication content
            publicationContent.innerHTML = `
              <h2>${publication.title}</h2>
              <h3>by ${publication.author}</h3>
              <p><strong>Year:</strong> ${publication.specs.year}</p>
              <p><strong>Language:</strong> ${publication.specs.language}</p>
              <p><strong>Pages:</strong> ${publication.specs.pages}</p>
              <p><strong>Physical:</strong> ${publication.specs.physical}</p>
              <p><strong>ISBN:</strong> ${publication.specs.ISBN}</p>
              <p><strong>Content:</strong> ${publication.content}</p>
              <img src="${publication.frontcover}" alt="${publication.title} Front Cover">
              <img src="${publication.backcover}" alt="${publication.title} Back Cover">
              <div>
                <img src="${publication.spread01}" alt="${publication.title} Spread 1">
                <img src="${publication.spread02}" alt="${publication.title} Spread 2">
                <img src="${publication.spread03}" alt="${publication.title} Spread 3">
              </div>
            `;
          }
        });
      });
    })
    .catch((error) => {
      console.error("Error fetching publications:", error);
    });

  // ===== Menu Code ===== (move to main js eventually)
  const burgerIcon = document.getElementById("burger-icon");
  const menuIcon = document.getElementById("menu-icon"); // Get the image element
  const headerMenu = document.getElementById("header-menu");

  let menuOpen = false;

  burgerIcon.addEventListener("click", function () {
    menuOpen = !menuOpen;
    headerMenu.classList.toggle("show");

    // Toggle between the two images
    menuIcon.src = menuOpen ? "assets/SVG/droparrow_L.svg" : "assets/SVG/burger.svg";
  });
});
