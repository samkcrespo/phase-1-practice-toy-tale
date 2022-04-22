let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  toyFormContainer.addEventListener("submit", (e) => {
    console.log(e);
    e.preventDefault();
    postToy(e.target.name.value, e.target.url.value);
  });
});

fetch("http://localhost:3000/toys")
  .then((res) => res.json())
  .then((toys) => displayToys(toys));

function displayToys(toys) {
  toys.forEach((toy) => {
    const collection = document.querySelector("#toy-collection");
    const divCard = document.createElement("div");
    divCard.setAttribute("class", "card");

    collection.append(divCard);

    const toyName = document.createElement("h2");
    const toyImg = document.createElement("img");
    toyImg.setAttribute("class", "toy-avatar");
    const toyLikes = document.createElement("p");
    const btn = document.createElement("button");
    btn.setAttribute("class", "like-btn");
    btn.setAttribute("id", "toy_id");
    toyName.innerText = toy.name;
    toyImg.src = toy.image;
    toyLikes.innerText = toy.likes + " Likes";

    btn.innerText = "Like";
    const id = toys.id;
    divCard.append(toyName, toyImg, toyLikes, btn);

    btn.addEventListener("click", () => {
      const count = parseInt(toyLikes.innerText);
      toyLikes.innerText = `${count + 1} Likes`;
    });
  });
}

function postToy(name, url) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: name,
      image: url,
      likes: 0,
    })
      .then((res) => res.json())
      .then((data) => data),
  });
}
