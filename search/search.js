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


let checkInYear = item[1][2];
let finalCheckin = [checkInYear, i, checkInDate];
searchCheckin = finalCheckin.join("-"); /////////////////////////


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


let finalAdult = `${item[3][1]}`;

let finalChild = `${item[3][2]}`;
let finalInfant = `${item[3][3]}`;
let finalPet = `${item[3][4]}`;

const grid = document.querySelector(".box .grid");
const errorCard= document.querySelector(".box .errorCard");

/*************************** On load ***********************************/
const loader = document.querySelector(".container .wrapper .loader");
const wrapper = document.querySelector(".container .wrapper");
/*window.addEventListener("load", ()=>{
  loader.style.display = "block";
  wrapper.style.display = "block";
  fetchData();
})*/

/*************************** API call **********************************/
async function fetchData() {
  const url = `https://airbnb13.p.rapidapi.com/search-location?location=${searchCity}&checkin=${searchCheckin}&checkout=${searchCheckout}&adults=${finalAdult}&children=${finalChild}&infants=${finalInfant}&pets=${finalPet}&page=1&currency=INR`;
  const options = {
    method: "GET",
    headers: {
      'X-RapidAPI-Key': 'e14b049c4bmsha4f6036285213f0p13d02ajsn30735b7791fe',
      'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
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
}



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
let flag =true;


searchIcon.addEventListener("click", (e) => {
  e.preventDefault();
  let cityName = inputName.value.trim();
  if(cityName.length<1){
    cityName = "paris";
  }
  const cityArr = cityName.split(" ");
  if (cityArr.length > 1) {
    cityName = cityArr.join("-");
  }
  console.log(cityName);
  searchCity = cityName;
  console.log(searchCity);
  loader.style.display = "block";
  wrapper.style.display = "block";
  grid.innerHTML = ``;
  fetchData();

});

/**************** displaying data **************************/

let property = {
  heading: "",
  type: "",
  address: "",
  price: 14000,
  host: {
    persons: 1,
    img: ""
  },
  details: {
    room: 1,
    bed: 2,
    bath: 2
  },
  rating: {
    rate: 4.2,
    review: 56
  }
};


/*const propertyString = JSON.stringify(property);
const sizeInBytes = new Blob([propertyString]).size;
console.log("Size of property object in bytes:", sizeInBytes);*/


function displayCard(data) {

  loader.style.display = "none";
  wrapper.style.display = "none";

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
      console.log("card is clicked", x)
      flag = true;
      localStorage.setItem("err", JSON.stringify(flag));
      property.heading =  x.name || "";
      property.type = x.type || "";
      property.address = x.address || "";
      property.price = pay || 0;
      property.host.persons = x.persons || 1;
      property.host.img= x.hostThumbnail || "";
      property.details.room = x.beds || 0;
      property.details.bed = x.bedrooms || 0;
      property.details.bath = x.bathrooms || 0;
      property.rating.rate = x.rating || 0;
      property.rating.review = x.reviewsCount || 0;

      const pics = x.images;

      let finalPics = [];

      for(let i=0; i<8; i++){
        finalPics.push(pics[i]);
      }

      localStorage.setItem("property", JSON.stringify(property));
      localStorage.setItem("images", JSON.stringify(finalPics));

      window.location.href = "../listing/listing.html";
    })
  });
}



function displayError() {

  loader.style.display = "none";
  wrapper.style.display = "none";

  grid.innerHTML = ``;
  errorCard.innerHTML = ``;

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
                <div class="image">
                  <img src="../assets/villa1.jpg"
                    alt="No photos available">
                </div>
                <div class="card-content">
                      <p>Room in Badowala</p>
                      <h2>Dudley Manor</h2>

                      <p class="beds"><span>bedroom: 1</span> <span>bed: 2</span> <span>bath: 2</span></p>

                      <p>
                         Free Parking | Mountain view | Kitchen
                      </p>

                  <div class="card-bottom">
                    <div class="rating-review">
                        <p class="star">
                            <span class="rates">4.2</span>
                            <span><i class="fa-solid fa-star fa-2xs" style="color: #f59e0b;"></i></span>
                        </p>
                        <span class="review">(54 reviews)</span>
                    </div>

                    <div class="price"><i class="fa-solid fa-indian-rupee-sign"></i>
                        12,000 /night
                    </div>
                  </div>
                </div>
    `;
    grid.append(card);

    const pElement = document.createElement("p");
    pElement.innerHTML = `Sorry, No more rooms available right now!`;
    pElement.className = "error";

    errorCard.append(pElement);

      flag = false;
      localStorage.setItem("err", JSON.stringify(flag));
    
    card.addEventListener("click", ()=>{
      window.location.href = "../listing/listing.html";
    })
}
