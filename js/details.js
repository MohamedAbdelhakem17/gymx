const exercises = window.location.href.split("=")[1];
const exercisesContainer = document.getElementById("exercisesContainer");
const goTop = document.querySelector("#footer .container .gotop");
const links = Array.from(document.getElementsByClassName("link"));

document.title = exercises;
console.log(exercises);
async function getData() {
  let data = await fetch("../data/exercises.json");
  let response = await data.json();
  return response;
}
let respons = getData();
respons.then((data) => {
  let target = data.flat().filter((el) => {
    if (el.target === exercises) {
      return el.target === exercises;
    } else if (el.bodyPart === exercises) {
      return el.bodyPart === exercises;
    } else if (el.equipment === exercises) {
      return el.equipment === exercises;
    }
  });
  target.length = 20;
  display(target);
});
document.getElementById("title").innerHTML = `${exercises} Exercises`;
function display(arr) {
  let content = "";
  arr.forEach((element) => {
    content += `
    <div class="item">
    <div class="inner">
      <img src="${element.gifUrl}" alt="${element.name}" />
      <div class="text">
      <h3>${element.name}</h3>
      <div class="badg">
        <span>${element.bodyPart}</span>
        <span>${element.target}</span>
        <span>${element.equipment}</span>
      </div>
      </div>
    </div>
  </div>
    `;
  });
  exercisesContainer.innerHTML = content;
}
//   copywriter
const year = new Date().getFullYear();
document.querySelector("#footer p").innerHTML += year;
// Go To Top
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    goTop.style.right = "20px";
  } else {
    goTop.style.right = "-10%";
  }
});
goTop.addEventListener("click", () => {
  scroll({
    top: 0,
    behavior: "smooth",
  });
});

// Navbar toggel Function
navbtn.addEventListener("click", navbarToggel);
links.forEach((link) => {
  link.addEventListener("click", navbarToggel);
});
function navbarToggel() {
  menu.classList.toggle("active");
  Array.from(menu.classList).includes("active")
    ? (navbtn.firstElementChild.style.transform = "rotate(90deg)")
    : (navbtn.firstElementChild.style.transform = "rotate(0)");
}
