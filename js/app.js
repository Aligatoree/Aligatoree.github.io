import * as jsFunctions from "./modules/functions.js";

jsFunctions.isWebp();

document.addEventListener("DOMContentLoaded", function (e) {
  const lang = navigator.language;
  const ruText = document.getElementsByClassName("_ru");
  const enText = document.getElementsByClassName("_en");
  const ru = document.getElementById("ru");
  const en = document.getElementById("en");
  const header = document.getElementById("header");
  const headerMini = document.getElementById("header__mini");
  const info = document.getElementById("info");
  const title = document.getElementsByClassName("header__title");
  const popup = document.getElementById("info_popup");
  const skillsName = document.getElementsByClassName("skills__name");
  const main = document.getElementById("main");
  let resize;
  let scroll;
  let currentLanguage;

  checkLanguage();
  setLanguage();

  header.addEventListener("click", (e) => {
    if (e.target.id == "en" || e.target.id == "ru") {
      if (!e.target.classList.contains("_active")) {
        en.classList.toggle("_active");
        ru.classList.toggle("_active");
        langSwitch();
        setTimeout(setInfoHeight, 400);
      }
    } else if (
      e.target.classList.contains("header__title_name") ||
      e.target.id == "blur"
    ) {
      switchShow(info);
      setInfoHeight();
      if (window.innerWidth <= 1000 && info.classList.contains("_show")) {
        window.scrollTo(0, 0);
      }
      document.body.classList.toggle("_freeze");
    }
    setTimeout(setInfoHeight, 400);
  });
  window.addEventListener("resize", () => {
    clearTimeout(resize);
    resize = setTimeout(setInfoHeight, 100);
  });
  window.addEventListener("scroll", () => {
    clearTimeout(scroll);
    scroll = setTimeout(setHeaderMini, 50);
  });
  main.addEventListener("click", (e) => {
    exampleShow(e);
    skillShow(e);
  });

  function checkLanguage() {
    if (!window.localStorage.getItem("selectedLanguage")) {
      if (lang.indexOf("ru") != -1) {
        currentLanguage = "ru";
      } else {
        currentLanguage = "en";
      }
    } else {
      currentLanguage = window.localStorage.getItem("selectedLanguage");
    }
  }
  function setLanguage() {
    if (currentLanguage === "ru") {
      ru.classList.add("_active");
      langSwitch(ruText);
      window.localStorage.setItem("selectedLanguage", currentLanguage);
    } else {
      en.classList.add("_active");
      langSwitch(enText);
      window.localStorage.setItem("selectedLanguage", currentLanguage);
    }
  }
  function langSwitch(target) {
    if (!target) {
      textShow(ruText);
      textShow(enText);
      if (currentLanguage === "ru") {
        currentLanguage = "en";
      } else {
        currentLanguage = "ru";
      }
      window.localStorage.setItem("selectedLanguage", currentLanguage);
    } else {
      textShow(target);
    }
  }
  function setInfoHeight() {
    if (window.innerWidth <= 1000 && info.classList.contains("_show")) {
      window.scrollTo(0, 0);
    }
    if (title[1].getBoundingClientRect().top) {
      popup.style.height =
        "calc(100vh - " +
        (title[1].getBoundingClientRect().top +
          title[1].getBoundingClientRect().height +
          10) +
        "px";
    } else {
      popup.style.height =
        "calc(100vh - " +
        (title[0].getBoundingClientRect().top +
          title[0].getBoundingClientRect().height +
          10) +
        "px";
    }
  }
  function setHeaderMini() {
    if (scrollY > header.getBoundingClientRect().height - 60) {
      if (headerMini.classList.contains("_disappear")) {
        headerMini.classList.remove("_disappear");
        setTimeout(() => {
          headerMini.classList.remove("_hide");
          headerMini.classList.add("_show");
        }, 50);
      }
    } else {
      headerMini.classList.add("_hide");
      headerMini.classList.remove("_show");
      setTimeout(() => {
        headerMini.classList.add("_disappear");
      }, 200);
    }
  }
  function textShow(lang) {
    for (let i = 0; i < lang.length; i++) {
      if (lang == ruText) {
        clearTimeout();
        ruText[i].classList.toggle("_lang_show");
        enText[i].classList.toggle("_lang_hide");
        setTimeout(() => {
          enText[i].classList.toggle("_disappear");
        }, 200);
      } else {
        clearTimeout();
        enText[i].classList.toggle("_lang_show");
        ruText[i].classList.toggle("_lang_hide");
        setTimeout(() => {
          ruText[i].classList.toggle("_disappear");
        }, 200);
      }
    }
  }
  function switchShow(target) {
    target.classList.toggle("_show");
    target.classList.toggle("_hide");
  }
  function exampleShow(e) {
    if (e.target.classList.contains("example__show")) {
      e.target.classList.toggle("_active");
    }
  }
  function skillShow(e) {
    if (e.target.classList.contains("skills__name")) {
      switchShow(e.target);
    } else if (e.target.classList.contains("skill__switch")) {
      for (let i = 0; i < skillsName.length; i++) {
        skillsName[i].classList.add("_hide");
        skillsName[i].classList.remove("_show");
      }
    }
  }
});
