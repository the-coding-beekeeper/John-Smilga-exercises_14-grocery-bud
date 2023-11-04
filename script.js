const main = document.querySelector("main");
const inputField = document.getElementById("input-field");
const submitButton = document.querySelector(".submit-button");
const editButton = document.querySelector(".edit-button");
let clearItemsBtn = document.querySelector(".clear-items");
let listItem = document.querySelector(".list-item");
const list = document.getElementById("list");

// *********** clears input field and list items on page load
window.addEventListener("load", () => {
  inputField.value = "";
  while(list.childNodes.length > 0) {
    list.removeChild(list.childNodes[0]);
  }
});

// // *********** event-listener for submit-button  
// submitButton.addEventListener("click", (e) => {
//   e.preventDefault();
//   let inputValue = inputField.value;
//   if(inputValue) {
//     createMessage("item added to the list", "rgb(176, 243, 176)");
//     createListItem();
//     clearItems();
//   } else {
//     createMessage("please enter value", "rgb(242, 168, 180)");
//   }
// });


// *********** creating message after button click
function createMessage(message, backgroundColor) {
  const infoMessage = document.createElement("p");
  infoMessage.id = "info-message";
  infoMessage.innerText = message;
  infoMessage.style.backgroundColor = backgroundColor;
  main.appendChild(infoMessage);
  setInterval(() => {
    infoMessage.remove();
  }, 1000);
}

// *********** creating list-item after button click
function createListItem() {
  listItem = document.createElement("li");
  listItem.classList.add("list-item");
  list.appendChild(listItem);

  const itemInfo = document.createElement("div");
  itemInfo.classList.add("item-info");
  itemInfo.innerText = inputField.value;
  listItem.appendChild(itemInfo);

  const iconWrapper = document.createElement("div");
  iconWrapper.classList.add("icon-wrapper");
  listItem.appendChild(iconWrapper);

  const editIcon = document.createElement("img");
  editIcon.classList.add("icon", "edit-icon");
  editIcon.setAttribute("src", "images/edit.png");
  editIcon.setAttribute("alt", "edit");
  iconWrapper.appendChild(editIcon);

  const deleteIcon = document.createElement("img");
  deleteIcon.classList.add("icon", "delete-icon");
  deleteIcon.setAttribute("src", "images/trash-bin.png");
  deleteIcon.setAttribute("alt", "delete");
  iconWrapper.appendChild(deleteIcon);

  inputField.value = "";
}

// *********** creating a clear-items-button when list-item appears
function clearItems() {
  if(list.childNodes.length === 1) {
    clearItemsBtn = document.createElement("div");
    clearItemsBtn.classList.add("clear-items");
    clearItemsBtn.innerText = "clear items";
    main.appendChild(clearItemsBtn);
  }
}

// *******************************************  
// *********** installation of event-listeners  
main.addEventListener("click", (e) => {
// *********** event-listener for submit-button  
  if(e.target.matches(".submit-button")) {
    e.preventDefault();
    console.log("submit button clicked");
    let inputValue = inputField.value;
    if(inputValue) {
      createMessage("item added to the list", "rgb(176, 243, 176)");
      createListItem();
      clearItems();
    } else {
      createMessage("please enter value", "rgb(242, 168, 180)");
    }
  };

// *********** event-listener for edit-button  
  if(e.target.matches(".edit-button")) {
    e.preventDefault();
    console.log("edit button clicked");
    console.log(listItem);
    const itemInfo = listItem.querySelector(".item-info");
    itemInfo.innerText = inputField.value;
    console.log(itemInfo.innerText);
    submitButton.innerText = "submit";
    submitButton.classList.add("submit-button");
    submitButton.classList.remove("edit-button");
    inputField.value = "";



  }
// *********** clear complete items-list when clear-items-button is clicked  
  if(e.target.matches(".clear-items")) {
    while(list.firstChild) {
      list.removeChild(list.firstChild);
    }
    e.target.parentNode.removeChild(e.target);
    createMessage("empty list", "rgb(242, 168, 180)");
    submitButton.innerText = "submit";
    submitButton.classList.add("submit-button");
    submitButton.classList.remove("edit-button");
    inputField.value = "";
  }

// *********** clear individual items when delete-icon is clicked  
  else if(e.target.matches(".delete-icon")) {
    e.target.closest(".list-item").remove();
    createMessage("item removed", "rgb(242, 168, 180)");
    if(list.childNodes.length === 0) {
      main.removeChild(clearItemsBtn);
    }
    submitButton.innerText = "submit";
    submitButton.classList.add("submit-button");
    submitButton.classList.remove("edit-button");
    inputField.value = "";

  }

  // *********** edit individual items when edit-icon is clicked  
  else if(e.target.matches(".edit-icon")) {
    listItem = e.target.closest(".list-item");
    const itemInfo = listItem.querySelector(".item-info");
    inputField.value = itemInfo.innerText;
    submitButton.innerText = "edit";
    submitButton.classList.add("edit-button");
    submitButton.classList.remove("submit-button");
    // if(e.target.matches(".edit-button")) {
    //   itemInfo.innerText = inputField.value;
    // }
  }
});
