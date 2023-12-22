

const item = JSON.parse(localStorage.getItem("list"));
console.log(item);

const totalGuest = document.querySelector(".search .last-item");

const totalNoGuest = parseInt(item[3][0], 10);

if (totalNoGuest === 1) {
  totalGuest.textContent = `1 Guest`;
} else {
  totalGuest.textContent = `${totalNoGuest} Guests`;
}

const finalDate = document.querySelector(".search .mid-item");
finalDate.textContent = `${item[1][0]} ${item[1][1]} - ${item[2][0]} ${item[1][1]}`;

/*calculate number of days*/
const monthsCheckIn = [
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
let i = 0;
let month = item[1][1];
monthsCheckIn.forEach((x) => {
  if (x === month) {
    month = i;
    return;
  }
  i++;
});

const checkIn = new Date(
  parseInt(item[1][2], 10),
  month,
  parseInt(item[1][0], 10),
  0,
  0,
  0
);
console.log(checkIn);

let j = 0;
let monthOut = item[2][1];
monthsCheckIn.forEach((x) => {
  if (x === monthOut) {
    monthOut = j;
    return;
  }
  j++;
});

const checkOut = new Date(
  parseInt(item[2][2], 10),
  monthOut,
  parseInt(item[2][0], 10),
  0,
  0,
  0
);
console.log(checkOut);

const inDays = checkIn.getTime();
const outDays = checkOut.getTime();

const leftTime = outDays - inDays;
let days;

if (leftTime === 0) {
  days = 1;
} else {
  days = Math.floor(leftTime / 86400000) + 1;
}

const navPlace = document.querySelector(
  ".navbar .search .search-bar .first-item"
);

/**********flag *********************/
const storedFlag = JSON.parse(localStorage.getItem("err"));
console.log(storedFlag);


/*show photos*/

const showBtn = document.querySelector(".box .flex .show");
const overlay = document.querySelector(".overlay");

showBtn.addEventListener("click", () => {
  overlay.style.display = "block";
  document.body.style.overflow = "hidden";
});

const backBtn = document.querySelector(".overlay .back-btn");
backBtn.addEventListener("click", () => {
  overlay.style.display = "none";
  document.body.style.overflow = "";
});

/*amenities*/

const amenities = {
  2: "Kitchen",
  4: "Wifi",
  5: "Air conditioning",
  7: "Pool",
  8: "Kitchen",
  9: "Free parking on premises",
  11: "Smoking allowed",
  12: "Pets allowed",
  15: "Gym",
  16: "Breakfast",
  21: "Elevator",
  25: "Hot tub",
  27: "Indoor fireplace",
  30: "Heating",
  33: "Washer",
  34: "Dryer",
  35: "Smoke alarm",
  36: "Carbon monoxide alarm",
  44: "Hangers",
  45: "Hair dryer",
  46: "Iron",
  47: "Laptop-friendly workspace",
  51: "Self check-in",
  58: "TV",
  64: "High chair",
  78: "Private bathroom",
  109: "Wide hallways",
  110: "No stairs or steps to enter",
  111: "Wide entrance for guests",
  112: "Step-free path to entrance",
  113: "Well-lit path to entrance",
  114: "Disabled parking spot",
  115: "No stairs or steps to enter",
  116: "Wide entrance",
  117: "Extra space around bed",
  118: "Accessible-height bed",
  120: "No stairs or steps to enter",
  121: "Wide doorway to guest bathroom",
  123: "Bathtub with bath chair",
  125: "Accessible-height toilet",
  127: "No stairs or steps to enter",
  128: "Wide entryway",
  136: "Handheld shower head",
  286: "Crib",
  288: "Electric profiling bed",
  289: "Mobile hoist",
  290: "Pool with pool hoist",
  291: "Ceiling hoist",
  294: "Fixed grab bars for shower",
  295: "Fixed grab bars for toilet",
  296: "Step-free shower",
  297: "Shower chair",
  347: "Piano",
  608: "Extra space around toilet",
  609: "Extra space around shower",
};

const amenitiesBtn = document.querySelector(".amenities .amenities-btn");
const aOverlay = document.querySelector(".amenities .amenities-overlay");
const allA = document.querySelector(".amenities .all-amenities");

amenitiesBtn.addEventListener("click", () => {
  aOverlay.style.display = "block";
  allA.style.top = "50%";
});

aOverlay.addEventListener("click", (e) => {
  console.log(e.currentTarget);
  e.stopPropagation();
  aOverlay.style.display = "none";
  allA.style.top = "-50%";
});

function getRandomAmenities() {
  const allAmenities = Object.values(amenities);
  const uniqueRandomAmenities = [];

  while (uniqueRandomAmenities.length < 22) {
    const randomIndex = Math.floor(Math.random() * allAmenities.length);
    const randomAmenity = allAmenities[randomIndex];

    if (!uniqueRandomAmenities.includes(randomAmenity)) {
      uniqueRandomAmenities.push(randomAmenity);
    }
  }

  return uniqueRandomAmenities;
}

const randomAmenitiesArray = getRandomAmenities();

const aLeft = document.querySelector(".amenities .amenities-left");
const aRight = document.querySelector(".amenities .amenities-right");

let h = 0;

for (let h = 0; h < 5; h++) {
  const p = document.createElement("p");
  p.textContent = randomAmenitiesArray[h];
  aLeft.append(p);
}

for (let h = 5; h < 10; h++) {
  const p = document.createElement("p");
  p.textContent = randomAmenitiesArray[h];
  aRight.append(p);
}

const showAmenities = document.querySelector(".amenities .all-amenities");

randomAmenitiesArray.forEach((x) => {
  const p = document.createElement("p");
  p.textContent = x;
  showAmenities.append(p);
});

/********************display cart***********************/

const cartIn = document.querySelector(".flex-right .in-out .in .change");
const cartOut = document.querySelector(".flex-right .in-out .out .change");
const cartGuest = document.querySelector(".flex-right .cart .guest");
const finalPerPriceDisplay = document.querySelector(
  ".flex-right .money .per-person .one-person"
);
const finalPriceDisplay = document.querySelector(
  ".flex-right .cart .final-pay"
);

const countMoney = document.querySelector(
  ".flex-right .cart .money .calculate-money"
);
const countTotalMoney = document.querySelector(
  ".flex-right .cart .money .calculate-total-money"
);

cartGuest.textContent = `Number of guest: ${totalNoGuest}`;

let finalPerPrice;
let finalPrice;

if (!storedFlag) {
  countMoney.textContent = `12,000 X ${days}`;
  finalPerPrice = 12000 * days - 2000 + 999;
  finalPrice = finalPerPrice * totalNoGuest;
  finalPerPriceDisplay.innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i> ${finalPerPrice}`;
  finalPriceDisplay.innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i> ${finalPrice}`;
} else {
  countMoney.textContent = `10,000 X ${days}`;
}

cartIn.textContent = `${item[1][0]} ${item[1][1]} ${item[1][2]}`;
cartOut.textContent = `${item[2][0]} ${item[2][1]} ${item[2][2]}`;

const houseTitle = document.querySelector(".box .flex h1");
const houseType = document.querySelector(
  ".flex-box .flex-left .sub-heading .title-type"
);
const houseAddress = document.querySelector(
  ".flex-box .flex-left .sub-heading .address"
);

const houseBaths = document.querySelector(".flex-box .flex-left .baths");

if (!storedFlag) {
  houseBaths.innerHTML = `
<p><i class="fa-solid fa-people-roof"></i> 1 rooms</p>
<p><i class="fa-solid fa-bed"></i> 2 bed</p>
<p><i class="fa-solid fa-shower"></i> 2 bathroom</p>                    
`;

  houseTitle.textContent = "Dudley Manor";
  houseType.textContent = "Room in Badowala";
  houseAddress.textContent = "Badowala, Uttarakhand, India";
  navPlace.textContent = "India";
} else {
  houseBaths.innerHTML = `
<p><i class="fa-solid fa-people-roof"></i> 2 rooms</p>
<p><i class="fa-solid fa-bed"></i> 1 bed</p>
<p><i class="fa-solid fa-shower"></i> 2 bathroom</p>                    
`;

  navPlace.textContent = item[0];
}

const calculatedMoney = document.querySelector(".money .calculate-total-money");

if (!storedFlag) {
  calculatedMoney.innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i> ${
    days * 12000
  }`;
} else {
  calculatedMoney.innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i> ${
    days * 12000
  }`;
}

/*display images*/

const houseImage = document.querySelector(".box .image");

if (!storedFlag) {

  houseImage.innerHTML = `
<div class="div see">
    <img src="../assets/villa1.jpg" alt="photo">
</div>
<div class="div none">
    <img src="../assets/villa2.jpg" alt="photo">
</div>
<div class="div none">
    <img src="../assets/villa6.jpg" alt="photo">
</div>
<div class="div none">
    <img src="../assets/villa4.jpg" alt="photo">
</div>
<div class="div none">
    <img src="../assets/villa5.jpg" alt="photo">
</div>
`;
} else {

  houseImage.innerHTML = `
<div class="div see">
    <img src="https://media.istockphoto.com/id/1301652138/photo/image-of-orange-sunset-with-cityscape-of-ghaziabad-urban-sprawl-india-viewed-from-residential.jpg?s=612x612&w=0&k=20&c=7d7Az3V9PnSlosFKHhZqt61Yl_m0Oppoix1mBrYDYys=" alt="photo">
</div>
<div class="div none">
    <img src="https://media.istockphoto.com/id/1301652138/photo/image-of-orange-sunset-with-cityscape-of-ghaziabad-urban-sprawl-india-viewed-from-residential.jpg?s=612x612&w=0&k=20&c=7d7Az3V9PnSlosFKHhZqt61Yl_m0Oppoix1mBrYDYys=" alt="photo">
</div>
<div class="div none">
    <img src="https://media.istockphoto.com/id/1301652138/photo/image-of-orange-sunset-with-cityscape-of-ghaziabad-urban-sprawl-india-viewed-from-residential.jpg?s=612x612&w=0&k=20&c=7d7Az3V9PnSlosFKHhZqt61Yl_m0Oppoix1mBrYDYys=" alt="photo">
</div>
<div class="div none">
    <img src="https://media.istockphoto.com/id/1301652138/photo/image-of-orange-sunset-with-cityscape-of-ghaziabad-urban-sprawl-india-viewed-from-residential.jpg?s=612x612&w=0&k=20&c=7d7Az3V9PnSlosFKHhZqt61Yl_m0Oppoix1mBrYDYys=" alt="photo">
</div>
<div class="div none">
    <img src="https://media.istockphoto.com/id/1301652138/photo/image-of-orange-sunset-with-cityscape-of-ghaziabad-urban-sprawl-india-viewed-from-residential.jpg?s=612x612&w=0&k=20&c=7d7Az3V9PnSlosFKHhZqt61Yl_m0Oppoix1mBrYDYys=" alt="photo">
</div>
`;
}

const houseShowPhotos = document.querySelector(".overlay .photo");

const hostImg = document.querySelector(".flex-left .host-img");
if (!storedFlag) {
  hostImg.innerHTML = `
<img src="../assets/host.jpg" alt="">
`;
} else {
  hostImg.innerHTML = `
<img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" alt="">
`;
}

const changeRate = document.querySelector(
  ".rates-reviews .flex-rates .change-rate"
);
const changeReview = document.querySelector(
  ".rates-reviews .flex-review .change-review"
);
const hostName = document.querySelector(".flex-left .flex-host .host-name");

if (!storedFlag) {
  hostName.innerHTML = `
<p>Hosted by Anil</p>
<p>Super host</p>
`;

  changeRate.textContent = "4.2";
  changeReview.textContent = "54";
} else {
  hostName.innerHTML = `
<p>Hosted by Reevati</p>
<p>Super host</p>
`;
}
