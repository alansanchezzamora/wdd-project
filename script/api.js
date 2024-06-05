function getUniversitiesInfo() {
  let param = document.getElementById("param").value;

  fetch(`https://university-data.p.rapidapi.com/api/v2/rank/${param}`, {
    method: "GET",
    headers: {
      "x-rapidapi-key": "911fd11df8mshd6a9e7b4d29b587p12d469jsne619f374ffbe",
      "x-rapidapi-host": "university-data.p.rapidapi.com",
    },
  })
    .then((response) => response.json()) // Wait for the response and convert it to JSON
    .then((schools) => {
      showUniversities(schools); // Call showUniversities with the fetched data
      initializeProductEventHandlers(); // Initialize event handlers after generating the HTML
    })
    .catch((err) => console.error(err)); // Log any errors
}

function showUniversities(schools) {
  let schoolsContainer = document.querySelector(".products-container");
  let schoolsCards = document.querySelector(".products-preview");

  let htmlcard = "";
  let htmlpreview = "";

  document.getElementById("hero").style.display = "none";
  document.getElementById("search-bar").style.top = "14%";

  schools.forEach((school, index) => {
    console.log(`Index: ${index}, School: ${school.Name}`); // Log the index and the school name
    htmlcard += `
        <div class="product" data-name="p-${index}">
            <img src="${school.Logo}" alt="logo-${school.Name}" onerror="this.onerror=null;this.src='images/generic-logo.jpg';">
            <h3>${school.Name}</h3>
            <div class="price">${school.Country}</div>
        </div>`;

    htmlpreview += `
        <div class="preview" data-target="p-${index}">
        <i class="fas fa-times"></i>

            <img src="${school.Logo}" alt="logo-${
      school.Name
    }" onerror="this.onerror=null;this.src='images/generic-logo.jpg';">
            <h3>${school.Name}</h3>
            <div class="stars">
            <p> ${school.Type} </p>
                <span>Rank : ${index + 1}</span>
            </div>
            <p>Established ${school.Established}</p>
            
            <p> President : ${school.President} </p>
            <P> Endowment : ${school.Endowment} </p>
            <p> Total Students : ${school.Students.Total}</p>
            <div>${school.Location.City}, ${school.Location.State}</div>
            <div class="buttons">
                <a href="https://${
                  school.Website
                }" target="_blank"  class="cart">${school.Website}</a>
            </div>
        </div>`;
  });

  // Update the HTML content after the loop
  schoolsContainer.innerHTML = htmlcard;
  schoolsCards.innerHTML = htmlpreview;
}

function initializeProductEventHandlers() {
  let previewContainer = document.querySelector(".products-preview");
  let previewBox = previewContainer.querySelectorAll(".preview");

  document
    .querySelectorAll(".products-container .product")
    .forEach((product) => {
      product.onclick = () => {
        previewContainer.style.display = "flex";
        let name = product.getAttribute("data-name");
        previewBox.forEach((preview) => {
          let target = preview.getAttribute("data-target");
          if (name === target) {
            preview.classList.add("active");
          }
        });
      };
    });

  previewBox.forEach((close) => {
    close.querySelector(".fa-times").onclick = () => {
      close.classList.remove("active");
      previewContainer.style.display = "none";
    };
  });
}

// Example usage (uncomment the following line to call getUniversitiesInfo when needed):
// getUniversitiesInfo();
