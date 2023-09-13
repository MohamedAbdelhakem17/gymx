const navbtn = document.getElementById("navbtn");
const navbar = document.getElementById("navbar");
const bar = document.getElementById("bar");
const menu = document.getElementsByClassName("menu")[0];
const slid = Array.from(document.getElementsByClassName("slid"));
const links = Array.from(document.getElementsByClassName("link"));
let sections = Array.from(document.getElementsByTagName("section"));
const muscleTarget = document.getElementsByClassName("muscleTarget")[0];
const seeMoreMuscleTarget = document.querySelector("#muscles .seeMore");
const bodyPartList = document.getElementsByClassName("bodyPartList")[0];
const seeMorebodyPartList = document.querySelector("#bodyPartList .seeMore");
const equipmentList = document.getElementsByClassName("equipmentList")[0];
const seeMoreequipmentList = document.querySelector("#equipmentList .seeMore");
const goTop = document.querySelector("#footer .container .gotop");
let select;
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
// navbar Change bgColer
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.style.backgroundColor = "var(--bg-color)";
  } else {
    navbar.style.backgroundColor = "transparent";
  }
});
// page par function
function calcBarWidth() {
  let netHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollFromTop = document.documentElement.scrollTop;
  let width = `${(scrollFromTop / netHeight) * 100}%`;
  return width;
}
window.addEventListener("scroll", () => {
  bar.style.width = calcBarWidth();
});

// slider Functin
function slider() {
  const currentSlide = document.querySelector(".slid.active");
  currentSlide.classList.remove("active");
  const nextSlide = currentSlide.nextElementSibling;
  if (nextSlide) {
    nextSlide.classList.add("active");
  } else {
    slid[0].classList.add("active");
  }
}
setInterval(slider, 5000);
// Change Acive Class in link
links.forEach((link) => {
  link.addEventListener("click", () => {
    links.forEach((link) => link.classList.remove("active"));
    link.classList.add("active");
  });
});
// Change URL on Scrool
window.addEventListener("scroll", () => {
  let active = "";
  sections.forEach((section) => {
    if (section.offsetTop - 300 <= Math.floor(scrollY)) {
      history.pushState(null, null, `#${section.id}`);
      active = section.getAttribute("id");
    }
  });
  links.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${active}`) {
      link.classList.add("active");
    }
  });
});
// function Call Api
function main(url, parent, btn, selector) {
  async function getData() {
    const data = await fetch(url);
    const respons = await data.json();
    return respons;
  }
  // Get Muscles Type From Api And Display
  let genreator = getData();
  genreator.then((data) => {
    genreator = gen(data);
    for (let i = 0; i < 8; i++) {
      display(genreator.next().value);
    }
  });
  // Display Data
  function display(name) {
    let content = `
      <div class="item">
      <div class="inner" key=${name}>
        <div class="icon"><i class="fa-solid fa-dumbbell"></i></div>
        <h3>${name}</h3>
      </div>
    </div>
      `;

    parent.innerHTML += content;
  }
  // Load More Data
  function* gen(arr) {
    yield* arr;
  }
  btn.addEventListener("click", () => {
    for (let i = 0; i < 4; i++) {
      let item = genreator.next();
      if (item.value === undefined) {
        btn.setAttribute("disabled", "disabled");
        btn.innerHTML = "No More Dada To Load";
        break;
      }
      display(item.value);
    }
    bar.style.width = calcBarWidth();
  });

  genreator.then(() => {
    select = [...document.querySelectorAll(selector)];
    select.forEach((el) => {
      el.addEventListener("click", () => {
        let key = el.getAttribute("key");
        navigat(key);
      });
    });
  });
  function navigat(key) {
    url = "../page/details.html?key=" + encodeURIComponent(key);
    window.location.assign(url);
  }
}
// bodyPartList
main(
  "../data/bodyPartList.json",
  bodyPartList,
  seeMorebodyPartList,
  "#bodyPartList .container .bodyPartList .item .inner"
);
// targetList
main(
  "../data/targetList.json",
  muscleTarget,
  seeMoreMuscleTarget,
  "#muscles .container .muscleTarget .item .inner"
);
// equipmentList
main(
  "../data/equipmentList.json",
  equipmentList,
  seeMoreequipmentList,
  "#equipmentList .container .equipmentList .item .inner"
);
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

const reveal = [...document.getElementsByClassName("reveal")];
window.addEventListener("scroll", function () {
  for (let i = 0; i < reveal.length; i++) {
    const windowHeight = window.innerHeight;
    const sectionHeight = reveal[i].getBoundingClientRect().top;
    const point = 150;
    if (sectionHeight < windowHeight - point) {
      reveal[i].classList.add("act");
    } else {
      reveal[i].classList.remove("act");
    }
  }
});
