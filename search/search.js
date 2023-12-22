/*************Get params************/

const item = JSON.parse(localStorage.getItem("list"));
console.log(item);
let searchCity = "";
if (item[0] === "Canada") {
  searchCity = "Toronto";
} else if (item[0] === "Europe") {
  searchCity = "Rome";
} else if (item[0] === "United States") {
  searchCity = "San-Francisco";
} else if (item[0] === "Southeast Asia") {
  searchCity = "Tokyo";
} else if (item[0] === "United Kingdom") {
  searchCity = "London";
} else {
  searchCity = "Paris";
}

console.log(searchCity);

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let searchCheckin = item[1];
let checkInDate = item[1][0];
if (checkInDate.length < 2) {
  checkInDate = "0" + checkInDate;
}

let checkInMonth = item[1][1];
let i = 1;

for (let j = 0; j < months.length; j++) {
  let x = months[j];
  if (x === checkInMonth) {
    if (i < 10) {
      i = "0" + i;
      break;
    }
    break;
  }
  i++;
}

console.log(i);
let checkInYear = item[1][2];
let finalCheckin = [checkInYear, i, checkInDate];
searchCheckin = finalCheckin.join("-"); /////////////////////////
console.log(searchCheckin);

let searchCheckout = item[2];
let checkOutDate = item[2][0];
if (checkOutDate.length < 2) {
  checkOutDate = "0" + checkOutDate;
}

let checkOutMonth = item[2][1];
let q = 1;
for (let j = 0; j < months.length; j++) {
  let x = months[j];
  if (x === checkOutMonth) {
    if (q < 10) {
      q = "0" + q;
      break;
    }
    break;
  }
  q++;
}

let checkOutYear = item[2][2];
let finalCheckout = [checkOutYear, q, checkOutDate];
searchCheckout = finalCheckout.join("-"); /////////////////////////
console.log(searchCheckout);

let finalAdult = `${item[3][1]}`;
console.log(typeof finalAdult, finalAdult);

let finalChild = `${item[3][2]}`;
let finalInfant = `${item[3][3]}`;
let finalPet = `${item[3][4]}`;


/*************************** API call **********************************/
/*async function fetchData() {
  const url = `https://airbnb13.p.rapidapi.com/search-location?location=${searchCity}&checkin=${searchCheckin}&checkout=${searchCheckout}&adults=${finalAdult}&children=${finalChild}&infants=${finalInfant}&pets=${finalPet}&page=1&currency=INR`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "39d605b1eemsh69f325fa8ca8c1dp1fcd7cjsn308c7552e999",
      "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    displayCard(result);
  } catch (error) {
    console.log(error);
    displayError();
  }
}*/

//fetchData();


const popularCities = [
  "Paris",
  "New York City",
  "Tokyo",
  "London",
  "Rome",
  "Goa",
  "Barcelona",
  "Sydney",
  "Dubai",
  "Prague",
  "Rio de Janeiro",
  "Amsterdam",
  "Hong Kong",
  "Venice",
  "San Francisco",
  "Berlin",
  "Bangkok",
  "Singapore",
  "Florence",
  "Cape Town",
  "Marrakech",
];

const searchList = document.querySelector(".search-bar .search-dropdown");
const inputName = document.querySelector(".search-bar .input-name .city-name");

inputName.addEventListener("focus", () => {
  if (inputName.value === "") {
    searchList.style.display = "block";
  }
});

inputName.addEventListener("input", () => {
  if (inputName.value === "") {
    searchList.style.display = "block";
  } else {
    searchList.style.display = "none";
  }
});

document.addEventListener("click", (event) => {
  if (!searchList.contains(event.target) && !inputName.contains(event.target)) {
    searchList.style.display = "none";
  }
});

popularCities.forEach((x) => {
  const pElement = document.createElement("p");
  pElement.textContent = x;
  pElement.style.cursor = "pointer";
  searchList.append(pElement);
  pElement.addEventListener("click", () => {
    inputName.value = x;
    searchList.style.display = "none";
  });
});

const searchIcon = document.querySelector(".search #search-icon");

/*searchIcon.addEventListener("click", () => {
  searchIcon.href = "../listing/listing.html";
});*/

searchIcon.addEventListener("click", (e) => {
  e.preventDefault();
  let cityName = inputName.value.trim();
  const cityArr = cityName.split(" ");
  if (cityArr.length > 1) {
    cityName = cityArr.join("-");
  }
  console.log(cityName);
  searchCity = cityName;
  console.log(searchCity);
  fetchData();

});

/**************** displaying data **************************/

const grid = document.querySelector(".box .grid");

function displayCard(data) {
  grid.innerHTML = ``;

  const item = data.results;

  item.forEach((x) => {
    const money = x.price.priceItems;
    let pay = "";
    if (money.length < 1) {
      pay = "$231";
    } else {
      const bill = money[0].title;
      const moneyArr = bill.split(" ");
      pay = moneyArr[0];
    }

    const amenitiesHTML = x.previewAmenities
      .map((amenity) => `<span>${amenity}</span>`)
      .join(" | ");

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
                <div class="image">
                  <img src="${x.images[0] || ""}"
                    alt="No photos available">
                </div>
                <div class="card-content">
                      <p>${x.type}</p>
                      <h2>${x.name}</h2>

                      <p class="beds"><span>bedroom: ${
                        x.beds
                      }</span> <span>bed: ${x.bedrooms}</span> <span>bath: ${
      x.bathrooms
    }</span></p>

                      <p>
                         ${amenitiesHTML}
                      </p>

                  <div class="card-bottom">
                    <div class="rating-review">
                        <p class="star">
                            <span class="rates">${x.rating || 0}</span>
                            <span><i class="fa-solid fa-star fa-2xs" style="color: #f59e0b;"></i></span>
                        </p>
                        <span class="review">(${
                          x.reviewsCount || 0
                        } reviews)</span>
                    </div>

                    <div class="price">
                        ${pay} /night
                    </div>
                  </div>
                </div>
    `;
    grid.append(card);

    card.addEventListener("click", ()=>{
      console.log("card is clicked", x.name)
    })
  });

}

function displayError() {
  const pElement = document.createElement("p");
  pElement.innerHTML = `Sorry, No rooms available right now!`;
  pElement.className = "error";

  document.querySelector(".box .grid").append(pElement);
}
