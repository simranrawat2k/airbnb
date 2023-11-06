const mountainRetreats = [
  {
    destination: "Mountain Cabin Retreat",
    name: "John",
    totalDays: 7,
    description:
      "A cozy cabin in the heart of the Rockies for a peaceful getaway.",
  },
  {
    destination: "Hills View Chalet",
    name: "Sarah",
    totalDays: 5,
    description:
      "A charming chalet with stunning hill views for a relaxing vacation.",
  },
  {
    destination: "Alpine Adventure Lodge",
    name: "Michael",
    totalDays: 10,
    description:
      "An adventure lodge in the Alps for an adrenaline-packed trip.",
  },
  {
    destination: "Rustic Mountain Cabin",
    name: "Lisa",
    totalDays: 6,
    description: "A rustic cabin in the woods, perfect for nature enthusiasts.",
  },
  {
    destination: "Tropical Island Villa",
    name: "Emily",
    totalDays: 10,
    description: "Beachfront villa on a pristine island for a dreamy vacation.",
  },
  {
    destination: "Private Beach Bungalow",
    name: "Alex",
    totalDays: 8,
    description: "A secluded bungalow on a secluded tropical beach.",
  },
  {
    destination: "Island Paradise Resort",
    name: "Sophie",
    totalDays: 7,
    description:
      "A luxury resort with all-inclusive amenities on a beautiful island.",
  },
  {
    destination: "Beachfront Paradise Cottage",
    name: "Daniel",
    totalDays: 14,
    description: "A cozy beachfront cottage for an extended island vacation.",
  },
  {
    destination: "Urban Loft in New York City",
    name: "David",
    totalDays: 3,
    description:
      "A modern loft in the heart of NYC for an exciting city adventure.",
  },
  {
    destination: "Downtown Condo in Chicago",
    name: "Jessica",
    totalDays: 4,
    description:
      "A chic condo in the downtown area, perfect for exploring the city.",
  },
  {
    destination: "Sunny Apartment in Barcelona",
    name: "Luis",
    totalDays: 5,
    description: "An apartment with a sunny terrace in the heart of Barcelona.",
  },
  {
    destination: "Historic Townhouse in Rome",
    name: "Maria",
    totalDays: 7,
    description:
      "A charming historic townhouse for an authentic Roman experience.",
  },
];

const destination = document.querySelector(".experience .destination");

mountainRetreats.forEach((index) => {
  const divElement = document.createElement("div");
  divElement.className = "people-content";

  divElement.innerHTML = `<span>
<h2>${index.destination}</h2>
<div class="like-icon">
    <i class="fa-regular fa-heart fa-xl hollow"></i>    
    <i class="fa-solid fa-heart fa-xl filled"></i>
</div>
</span>
<div>Name: ${index.name}</div>
<div>Total Days: ${index.totalDays}</div>
<p>${index.description}</p>`;

  destination.append(divElement);
});

const likeIcons = document.querySelectorAll(".like-icon");

likeIcons.forEach((icon) => {
  let itemContainer = null; 

  icon.addEventListener("click", () => {
    const filledHeart = icon.querySelector(".filled");
    const hollowHeart = icon.querySelector(".hollow");

    if (hollowHeart.style.display !== "none") {
      hollowHeart.style.display = "none";
      filledHeart.style.display = "inline-block";

      const title = icon.previousElementSibling.textContent;

      if (itemContainer === null) {
        // Create a new item container if it doesn't exist
        itemContainer = document.createElement("div");
        itemContainer.classList.add("liked-item");

        const likedItem = document.createElement("p");
        likedItem.textContent = title;

        const removeIcon = document.createElement("span");
        removeIcon.innerHTML = "&times;";
        removeIcon.classList.add("like-cross");

        removeIcon.addEventListener("click", () => {
          itemContainer.remove();
          itemContainer = null; // Reset itemContainer
          filledHeart.style.display = "none";
          hollowHeart.style.display = "inline-block";
        });

        itemContainer.appendChild(likedItem);
        itemContainer.appendChild(removeIcon);

        const addLike = document.querySelector(".add-like .like-list");
        addLike.appendChild(itemContainer);
      } else {
        // If the itemContainer already exists, update the title
        const likedItem = itemContainer.querySelector("p");
        likedItem.textContent = title;
      }
    } else {
      filledHeart.style.display = "none";
      hollowHeart.style.display = "inline-block";
      if (itemContainer !== null) {
        itemContainer.remove();
        itemContainer = null; // Reset itemContainer
      }
    }
  });
});
