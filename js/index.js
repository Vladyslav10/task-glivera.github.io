(function () {
  const mainLink = document.querySelector(".menu__link-mes");
  const back = document.querySelector(".main__back");

  mainLink.addEventListener("click", function () {
    const w = window.innerWidth;
    if (w < 768) {
      document.querySelector("aside").classList.add("hide");
      document.querySelector(".main").classList.add("active");
      back.classList.add("active");
    }
    null;
  });

  back.addEventListener("click", function () {
    if (back.classList.contains("active")) {
      document.querySelector("aside").classList.remove("hide");
      document.querySelector(".main").classList.remove("active");
      back.classList.remove("active");
    }
  });

  const links = document.querySelectorAll(".menu__link-new");
  if (links.length > 0) {
    for (let index = 0; index < links.length; index++) {
      const element = links[index];
      element.addEventListener("click", function () {
        const pageName = element.textContent;
        localStorage.setItem("name", `${pageName}`);
      });
    }
  }
})();

///////////////////////////////BODY//////////////////////////////////////////////////////////////

(function () {
  const data = [
    {
      id: "1",
      userName: "Александр Антонов",
      selected: false,
      archived: true,
      text: "здравствуйте. как долго придется ждать нож который",
      date: "13/04/2018",
      time: "14:02",
      read: true,
    },
    {
      id: "2",
      userName: "Gun Machine",
      selected: false,
      archived: false,
      text: "а почему на ноже нет ни одной царапины?",
      date: "01/12/2018",
      time: "00:14",
      read: true,
    },
    {
      id: "3",
      userName: "Диана Павлова",
      selected: false,
      archived: false,
      text: "нет, мне не нужно. если и вам тоже пофиг, то выбросьте",
      date: "13/04/2018",
      time: "14:02",
      read: true,
    },
    {
      id: "4",
      userName: "Otto Zweig",
      selected: false,
      archived: false,
      text: "thank you!  that’s great!",
      date: "01/12/2018",
      time: "00:14",
      read: true,
    },
    {
      id: "5",
      userName: "Александр Антонов",
      selected: false,
      archived: true,
      text: "здравствуйте. как долго придется ждать нож который",
      date: "13/04/2018",
      time: "14:02",
      read: true,
    },
    {
      id: "6",
      userName: "Gun Machine",
      selected: false,
      archived: false,
      text: "а почему на ноже нет ни одной царапины?",
      date: "01/12/2018",
      time: "00:14",
      read: false,
    },
    {
      id: "7",
      userName: "Диана Павлова",
      selected: false,
      archived: false,
      text: "нет, мне не нужно. если и вам тоже пофиг, то выбросьте",
      date: "13/04/2018",
      time: "14:02",
      read: true,
    },
    {
      id: "8",
      userName: "Otto Zweig",
      selected: false,
      archived: false,
      text: "thank you!  that’s great!",
      date: "01/12/2018",
      time: "00:14",
      read: false,
    },
  ];
  const bodyBlock = document.querySelector(".body-main");
  const deleteMes = document.getElementById("delete");
  const archiveMes = document.getElementById("toarchive");
  const unreaded = document.getElementById("unread");
  const archive = document.getElementById("archive");
  const count = document.querySelector(".menu__link-mes-count");
  const input = document.querySelector(".input__search");
  let selected = false;
  let users = [...data];
  
  
  input.addEventListener('keyup', function(e) {
    const inputValue = input.value.toLowerCase();
      if(inputValue === '') {
        bodyBlock.addEventListener("click", setSelected);
        selected = false;
        deleteMes.classList.remove("hidden");
        getMessages(users);
        document
          .querySelectorAll(".body-main__row")
          .forEach((el) => el.classList.remove("hidden-input"));
        messagesCheck();
        archiveCheck();
        selectCheck()
      } else {
        let arr = [...users].filter(el => el.userName.toLowerCase().includes(inputValue));
        if(arr.length === 0) {
          bodyBlock.innerHTML =`<div class="body-main__alert">Чатов нет</div>`
        } else {
          selected = true;
          deleteMes.classList.add("hidden");
          bodyBlock.removeEventListener("click", setSelected);
          getMessages(arr);
          document
            .querySelectorAll(".body-main__row")
            .forEach((el) => el.classList.add("hidden-input"));
          messagesCheck();
          archiveCheck();
          selectCheck()
        }
      }
  });

  function setSelected(e) {
    const curEl = e.target.closest(".body-main__row");
    curEl.classList.toggle("active");
    const curElId = curEl.id;
    const idx = users.findIndex(el => el.id === curElId);
    if (curEl.classList.contains("active")) {
      users[idx].selected = true;
    } else {
      users[idx].selected = false;
    }
  }

  function selectCheck() {
    if (selected) {
      archiveMes.innerText = "Bсе";
    } else {
      archiveMes.innerText = "Добавить в архив";
    }
  }

  function changeCount() {
    let unreadMes = 0;
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if (element.read === false) {
        unreadMes++;
      }
    }
    count.innerText = `${unreadMes}`;
  }
  changeCount();

  getMessages(users);

  function getMessages(items) {
    bodyBlock.innerHTML = ``;
    for (const el of items) {
      bodyBlock.innerHTML += `
          <div id=${el.id} class="body-main__row">
              <div class="body-main__check">
                <input type="checkbox">
                <span class='checked-area'><span/>
              </div>
              <div class="body-main__avatar">
                <img src="img/right/profile_1_.svg" alt="user avatar">
                <span data-archive=${el.archived} class='body-main__archive'><img src="img/right/archive.svg" alt="package pic"></span>
              </div>
              <p class="body-main__name">${el.userName}</p>
              <p data-read=${el.read} class="body-main__message">${el.text}</p>
              <div class="body-main__date">
                <p>${el.date}</p>
                <p>${el.time}</p>   
              </div>
          </div>
        `;
    }
  }

  function archiveCheck() {
    const arc = document.querySelectorAll(".body-main__archive");
    arc.forEach((item) => {
      if (item.dataset.archive === "false") {
        item.style.display = "none";
      } else {
        item.style.display = "inline";
      }
    });
  }
  archiveCheck();

  function messagesCheck() {
    const messages = document.querySelectorAll(".body-main__message");
    messages.forEach((item) => {
      if (item.dataset.read === "false") {
        item.classList.add("unreaded");
      } else {
        item.classList.add("readed");
      }
    });
  }
  messagesCheck();

  unreaded.addEventListener("click", function () {
    selected = true;
    deleteMes.classList.add("hidden");
    bodyBlock.removeEventListener("click", setSelected);
    let arr = [...users].filter((el) => el.read === false);
    if(arr.length === 0) {
      bodyBlock.innerHTML =`<div class="body-main__alert">Чатов нет</div>`
    } else {
      getMessages(arr);
    }
    document
      .querySelectorAll(".body-main__row")
      .forEach((el) => el.classList.add("hidden-input"));
    archiveCheck();
    messagesCheck();
    selectCheck();
  });
  archive.addEventListener("click", function () {
    selected = true;
    deleteMes.classList.add("hidden");
    bodyBlock.removeEventListener("click", setSelected);
    let arr = [...users].filter((el) => el.archived === true);
    if(arr.length === 0) {
      bodyBlock.innerHTML =`<div class="body-main__alert">Чатов нет</div>`
    } else {
      getMessages(arr);
    }
    document
      .querySelectorAll(".body-main__row")
      .forEach((el) => el.classList.add("hidden-input"));
    archiveCheck();
    messagesCheck();
    selectCheck();
  });

  bodyBlock.addEventListener("click", setSelected);

  deleteMes.addEventListener("click", function () {
    users = users.filter((item) => item.selected === false);
    if(users.length === 0) {
      bodyBlock.innerHTML =`<div class="body-main__alert">Чатов нет</div>`
    } else {
      getMessages(users);
    }
    archiveCheck();
    messagesCheck();
  });

  archiveMes.addEventListener("click", function () {
    selected = false;
    bodyBlock.addEventListener("click", setSelected);
    deleteMes.classList.remove("hidden");
    document.querySelectorAll(".body-main__row").forEach((el) => {
      if (el.classList.contains("hidden-input")) {
        el.classList.remove("hidden-input");
      }
    });
    let pos =[];
    const id = users
      .filter((el) => el.selected === true)
      .map((el) => el.id);
    for (let index = 0; index < id.length; index++) {
      const element = id[index];
      const idx = users.findIndex(el => el.id === element);
      pos.push(idx);
    };
    pos.map((item) => {
      if (users[item].archived === false) {
        users[item].archived = true;
        users[item].selected = false;
      } else {
        users[item].selected = false;
      }
    });
    getMessages(users);
    archiveCheck();
    messagesCheck();
    selectCheck();
  });

  window.onunload = function () {
    localStorage.removeItem("name");
  };
})();

//////////////////////////////Bottom//////////////////////////////////////////////////////////////

(function () {
  const paginationArea = document.querySelector(".bottom-main__pagination");
  const nextbtn = document.querySelector(".bottom-main__image");
  let curPage = 1;
  const users = 984;
  const perPage = 8;
  let pages = Math.ceil(users / perPage);

  paginationArea.innerHTML = pagCreator(pages, curPage);

  function click(el, curpage) {
    curpage = Number(el);
    pagCreator(pages, curpage);
  }

  function pagCreator(pages, curPage) {
    let spanTag = "";
    let active;
    let beforePage = curPage - 1;
    let afterPage = curPage + 1;

    if (curPage > 2) {
      spanTag += `<span class="bottom-main__pagination-element">1</span>`;
      if (curPage > 3) {
        spanTag += `<span class="bottom-main__dots">...</span>`;
      }
    }

    if (curPage === pages) {
      beforePage = beforePage - 2;
    } else if (curPage === pages - 1) {
      beforePage = beforePage - 1;
    }

    if (curPage === 1) {
      afterPage = afterPage + 2;
    } else if (curPage === 2) {
      afterPage = afterPage + 1;
    }

    for (var plength = beforePage; plength <= afterPage; plength++) {
      if (plength > pages) {
        continue;
      }
      if (plength === 0) {
        plength = plength + 1;
      }
      if (curPage === plength) {
        active = "active";
      } else {
        active = "";
      }
      spanTag += `<span class="bottom-main__pagination-element ${active}">${plength}</span>`;
    }

    if (curPage < pages - 1) {
      if (curPage < pages - 2) {
        spanTag += `<span class="bottom-main__dots">...</span>`;
      }
      spanTag += `<span class="bottom-main__pagination-element">${pages}</span>`;
    }

    paginationArea.innerHTML = spanTag;
    return spanTag;
  }

  nextbtn.addEventListener("click", function () {
    if (curPage === pages) {
      curPage = 1;
      pagCreator(pages, curPage);
    } else {
      curPage++;
      pagCreator(pages, curPage);
    }
  });
})();

/////////////////////MODAL WINDOW/////////////////////////////////
(function () {
  const body = document.querySelector("body");
  const linkArea = document.querySelector(".aside__buy");
  const popupLinks = document.querySelectorAll(".popup-link");
  const popupCloseIcon = document.querySelectorAll(".close-popup");
  const lockPadding = document.querySelectorAll(".lock-padding");
  let unlock = true;
  const timeout = 800;

  linkArea.addEventListener("click", function (e) {
    const popupName = linkArea.children[0]
      .getAttribute("href")
      .replace("#", "");
    const currentPopup = document.getElementById(popupName);
    popupOpen(currentPopup);
  });

  if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
      const popupLink = popupLinks[index];
      popupLink.addEventListener("click", function (e) {
        const popupName = popupLink.getAttribute("href").replace("#", "");
        const currentPopup = document.getElementById(popupName);
        popupOpen(currentPopup);
        e.preventDefault();
      });
    }
  }

  if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];
      el.addEventListener("click", function (e) {
        popupClose(el.closest(".popup"));
        e.preventDefault();
      });
    }
  }

  function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
      const popupActive = document.querySelector(".popup.open");
      if (popupActive) {
        bodyLock();
        popupClose(popupActive, false);
      } else {
        bodyLock();
      }

      currentPopup.classList.add("open");
      currentPopup.addEventListener("click", function (e) {
        if (!e.target.closest(".popup__content")) {
          popupClose(e.target.closest(".popup"));
        }
      });
    }
  }

  function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
      popupActive.classList.remove("open");
      if (doUnlock) {
        bodyUnLock();
      }
    }
  }

  function bodyLock() {
    const findPaddingValue =
      window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = findPaddingValue;
      }
    }

    body.style.paddingRight = findPaddingValue;
    body.classList.add("lock");

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }

  function bodyUnLock() {
    setTimeout(function () {
      if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
          const el = lockPadding[index];
          el.style.paddingRight = "0px";
        }
      }

      body.style.paddingRight = "0px";
      body.classList.remove("lock");
    }, timeout);

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }
})();
