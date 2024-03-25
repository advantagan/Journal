let promptArray = [];

let entryArray = [];

let currentPrompt = "";

const journalpromptform = document.getElementById("journalpromptform");
const journalentryform = document.getElementById("journalentryform");

function selectRandomPrompt() {
  const randomindex = Math.floor(Math.random() * promptArray.length);
  currentPrompt = promptArray[randomindex];
}

function displayPromptDropDown() {
  const selectjournalprompt = document.getElementById("selectjournalprompt");
  selectjournalprompt.value = currentPrompt;
  selectjournalprompt.innerHTML = "";
  promptArray.forEach((prompt) => {
    selectjournalprompt.innerHTML += `<option value="${prompt}">${prompt}</option>`;
  });
}

function showPromptForm() {
  journalpromptform.style.display = "block";
  journalentryform.style.display = "none";
}

function showEntryForm() {
  journalpromptform.style.display = "none";
  journalentryform.style.display = "block";
  selectRandomPrompt();
  displayPromptDropDown();
}

function addjournalPrompt(e) {
  e.preventDefault();
  const journalPromptinput = document.getElementById("journalpromptinput");
  const text = journalPromptinput.value;
  if (text.trim().length === 0) {
    return;
  }
  promptArray.push(text);
  journalPromptinput.value = "";
  localStorage.setItem("promptArray", JSON.stringify(promptArray));
  renderPromptList();
}

function addJournalEntry(e) {
  e.preventDefault();
  const taskinput = document.getElementById("taskinput");
  const text = taskinput.value;
  console.log(text);
  taskinput.value = "";
  taskarray.push({ id: new Date().valueOf(), task: text, is_completed: false });
  saveTaskList();
  renderTaskList();
}
function renderPromptList() {
  const journalPromptlist = document.getElementById("promptlist");
  journalPromptlist.innerHTML = "";
  promptArray.forEach((prompt) => {
    journalPromptlist.innerHTML += `<li>${prompt}</li>`;
  });
}

const displayPromptArray = localStorage.getItem("promptArray");
if (displayPromptArray !== null) {
  promptArray = JSON.parse(displayPromptArray);
  renderPromptList();
}
