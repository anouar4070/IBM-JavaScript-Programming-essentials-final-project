let searchbtn = document.getElementById("searchbtn");
let clearbtn = document.getElementById("clearbtn");
let result = document.getElementById("resultContainer");
let mydiv = document.getElementById("dropdown");
let close = document.getElementById("close-btn");
let query = document.getElementById("searchinput");

const clearsearch = () => {
  query.value = "";
  mydiv.style.display = "none";
  result.innerHTML = "";
};

clearbtn.addEventListener("click", clearsearch);

const showResult = (name, img, info) => {
  mydiv.style.display = "block";
  result.innerHTML += `
    <div class="search-result-item">
      <h2 class="title">${name}</h2>
      <img class="search-img" src=${img} alt="${name}">
      <p class="description">${info}</p>
    </div>
  `;
};

const closeDropdown = () => {
  mydiv.style.display = "none";
  query.value = "";
  result.innerHTML = "";
};

close.addEventListener("click", closeDropdown);

const searchError = () => {
  mydiv.style.display = "block";
  result.innerHTML = `<p class="notfound">Sorry, we can't find your search</p>`;
};

fetch("travelrecommendation.json")
  .then((res) => res.json())
  .then((data) => {
    const search = () => {
      let searchQuery = query.value.toLowerCase();
      let notfound = true;
      result.innerHTML = ""; // Clear previous results

      [...data.countries, ...data.temples, ...data.beaches].forEach((item) => {
        if (item.cities) {
          item.cities.forEach((city) => {
            if (city.name.toLowerCase().includes(searchQuery)) {
              showResult(city.name, city.imageUrl, city.description);
              notfound = false;
            }
          });
        } else if (item.name.toLowerCase().includes(searchQuery)) {
          showResult(item.name, item.imageUrl, item.description);
          notfound = false;
        }
      });

      if (notfound) {
        searchError();
      }
    };

    searchbtn.addEventListener("click", search);
    query.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        search();
      }
    });
  });
