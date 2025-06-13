const inputTitle = document.querySelector(".input-title");
const contentTitle = document.querySelector(".input-content");
const tag  = document.querySelector(".input-tag");
const addBtn = document.querySelector(".addnote");
const notebox = document.querySelector(".addnotebox");
const deleteBtn = document.querySelector(".deletebtn");

let notes = JSON.parse(localStorage.getItem('notes')) || [];

document.addEventListener("DOMContentLoaded", function(){
    addBtn.addEventListener("click", addnote);

    notebox.addEventListener("keydown", function (event){
        if(event.key === "Enter"){
            event.preventDefault();
            addnote();
        }
    });

    deleteBtn.addEventListener("click", deletenote);
    rendernotes();
});

function addnote(event){
  const inputvalue = inputTitle.value.trim();
  const contentvalue = contentTitle.value.trim();
  const tagselect = tag.value;

  if(inputvalue !== "" && contentvalue !== "" && tagselect !== ""){
    notes.push({
        id: Date.now(),
        title: inputvalue, 
        content: contentvalue,
        tag: tagselect,
        disabled: false,
    });

    savetolocalstorage();
    rendernotes();
  }
}

function savetolocalstorage(){
    localStorage.setItem("notes", JSON.stringify(notes));
}

function rendernotes() {
  inputTitle.value = "";
  contentTitle.value = "";
  tag.value = "";

  const notesSection = document.querySelector(".notes");
  notesSection.innerHTML = "";

  notes.forEach((element) => {
    const notecontent = document.createElement("div");
    notecontent.className = "noteContainer";

    // Set data-id so we know which note this is
    notecontent.innerHTML = `
      <div data-id="${element.id}">
        <h3>Title: <span contenteditable="true" class="editable-title"> ${element.title}</span></h3>
        <p>Content: <span contenteditable="true" class="editable-content"> ${element.content}</span></p>
        <small>Tag:<span contenteditable="true" class="editable-tag"> ${element.tag}</span></small>
        <br>
        <button class ="singledeletebtn" onclick="deletesinglenote(${element.id})">Delete</button>
      </div>
    `;

    notesSection.appendChild(notecontent);
  });

  addEditListeners(); // Attach edit logic
}
function addEditListeners() {
  const titles = document.querySelectorAll(".editable-title");
  const contents = document.querySelectorAll(".editable-content");
  const tags = document.querySelectorAll(".editable-tag");

  [...titles, ...contents, ...tags].forEach((el) => {
    el.addEventListener("blur", function () {
      const parent = el.closest("div[data-id]");
      const id = Number(parent.getAttribute("data-id"));
      const noteIndex = notes.findIndex(note => note.id === id);

      if (noteIndex !== -1) {
        const newTitle = parent.querySelector(".editable-title").textContent.trim();
        const newContent = parent.querySelector(".editable-content").trim();
        const newTag = parent.querySelector(".editable-tag").textContent.trim();

        notes[noteIndex].title = newTitle;
        notes[noteIndex].content = newContent;
        notes[noteIndex].tag = newTag;

        savetolocalstorage();
      }
    });
  });
}

document.addEventListener("click", function (e) {
  const card = e.target.closest(".noteContainer");
  if (card) {
    card.classList.toggle("expanded");
  }
});



function deletesinglenote(id) {
  notes = notes.filter(note => note.id !== id);
  savetolocalstorage();
  rendernotes();
}

function deletenote(){
    notes = [];
    savetolocalstorage();
    rendernotes();
}
