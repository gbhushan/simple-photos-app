"use strict";

const HEADER_TITLE = "Gallery";
const CLOSE_BUTTON_TEXT = "Close";
const IMAGE_URL = "/data/photos.json";

window.addEventListener("DOMContentLoaded", () => {
  // initialize the application
  init();
});

async function init() {
  const body = document.querySelector("body");

  const loadingComponent = createLoadingComponent();

  const store = [];

  // create the modal component for our application
  const modal = await createModalContent().then(res =>
    appendItems(createModalComponent(), [res])
  );

  // append 3 components to our application
  const itemsToAppend = [createHeader(), createSection(), modal, loadingComponent];

  // handling closing of modal
  document.addEventListener("click", event => {
    if (!modal.classList.contains("hide") && event.target.nodeName !== "IMG") {
      modal.classList.toggle("hide");
    }
  });

  // append 3 components to body
  appendItems(body, itemsToAppend)
    .then(async () => {
      // initialize the loader
      document.querySelector('.loader').classList.toggle('hide');

      // population of store, TO-DO: error handling
      const data = await fetch(IMAGE_URL)
        .then((res) => res.json())
        .then(data => data)
        .catch(err => err);

      store.push(...data);

      // append the Image List Container to the main section
      appendItems(document.querySelector("section"), [createListItemContainer()]).then(
        (res) => {

          const listContainer = res.querySelector(".list-container");

          // setting grid row and column properties dynamically
          listContainer.style["grid-template-columns"] =
            "repeat(4, auto)";
          listContainer.style[
            "grid-template-rows"
          ] = `repeat(${Math.ceil(data.length / 4)}, 20vw)`;

          // populates all the images from the store and appends to the Image List Container
          appendItems(
            listContainer,
            createImageContainers(store)
          ).then(parent => {
            // hide the loader
            loadingComponent.classList.toggle('hide');
            parent.addEventListener(
              "click",
              handleImageClick.bind(this, store, modal)
            );
          });
        }
      );
    })
    .catch(err => {
      throw new Error(err);
    });
}

/**
 * Creates and returns a loading component
 * @returns {loader}
 */
function createLoadingComponent() {
  const loader = document.createElement('div');
  loader.textContent = "Loading...";
  loader.classList.add('loader', 'hide');
  return loader;
}

/**
 * Event Handler on Image click
 * @property {store} data store
 * @property {modal} modal component
 * @property {event} dispatched event properties
 * @returns void
 */
function handleImageClick(store, modal, event) {
  if (event.target.nodeName !== "IMG") {
    return false;
  }
  const indexPosition = Array.prototype.indexOf.call(
    event.target.parentElement.parentElement.childNodes,
    event.target.parentElement
  );

  modal.classList.toggle("hide");

  const imageElement = modal.querySelector("img");

  imageElement.setAttribute("src", store[indexPosition].urls.regular);
  imageElement.setAttribute("alt", store[indexPosition].description || "image");
}

/**
 * Creates a list of images and returns that list
 * @property {parent} parent Dom Element
 * @property {items} list of items to be appended as child to parent element
 * @returns {parent}
 */
function createImageContainers(data) {
  const result = [];
  for (let i = 0; i < data.length; i += 1) {
    const list = document.createElement("li");
    // const list = document.createElement("div");

    const img = document.createElement("IMG");
    img.setAttribute("src", data[i].urls.small);
    img.setAttribute("alt", data[i].description || "image");

    list.appendChild(img);

    result.push(list);
  }
  return result;
}

/**
 * Append list of items to parent
 * @property {parent} parent Dom Element
 * @property {items} list of items to be appended as child to parent element
 * @returns {parent}
 */
function appendItems(parent, items) {
  return new Promise(async (resolve, reject) => {
    try {
      await items.forEach(item => {
        parent.appendChild(item);
      });
      resolve(parent);
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Creates and returns a section element
 * @returns {section}
 */
function createSection() {
  const section = document.createElement("section");
  section.classList.add("section");
  return section;
}

/**
 * Creates and returns a header element
 * @returns {header}
 */
function createHeader() {
  const header = document.createElement("header");
  header.classList.add("header");
  const h1 = document.createElement("h1");
  h1.textContent = HEADER_TITLE;
  header.appendChild(h1);
  return header;
}

/**
 * Creates and returns an unordered list element
 * @returns {ul}
 */
function createListItemContainer() {
  const listItem = document.createElement("ul");
  // const listItem = document.createElement("div");
  listItem.classList.add("list-container");
  return listItem;
}

/**
 * Creates and returns a modal component
 * @returns {Modal}
 */
function createModalComponent() {
  const modal = document.createElement("div");
  modal.classList.add("modal", "hide");
  return modal;
}

/**
 * Creates and returns modal content
 * @returns {ModalContent}
 */
function createModalContent() {
  const modalContentContainer = document.createElement("div");
  modalContentContainer.classList.add("modal-content");

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("image-container");

  imgContainer.appendChild(document.createElement("IMG"));

  const closeButton = document.createElement("input");
  closeButton.setAttribute("type", "button");
  closeButton.setAttribute("value", CLOSE_BUTTON_TEXT);

  closeButton.addEventListener("click", event => {
    const modal = event.target.parentElement.parentElement;
    modal.classList.toggle("hide");
  });

  return appendItems(modalContentContainer, [imgContainer, closeButton]);
}
