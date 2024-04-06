let journalArray = [];

let promptArray = [];

let entryArray = [];

let currentPrompt = "";

let currentjournal = "";
const newjournalform = document.getElementById("newjournalform");
const journalpromptform = document.getElementById("journalpromptform");
const journalentryform = document.getElementById("journalentryform");
const secondcolumn = document.getElementById("secondcolumn");

function selectJournal(journal) {
  currentjournal = journal;
  localStorage.setItem("currentjournal", JSON.stringify(currentjournal));
  displayJournalButtons();
  const newjournal_entryprompt = document.getElementById(
    "newjournal_entryprompt"
  );
  newjournal_entryprompt.style.display = "block";
  renderPromptList();
  secondcolumn.style.display = "block";
  renderEntryList();
}

function saveEntryList() {
  localStorage.setItem("entryArray", JSON.stringify(entryArray));
}
function renderEntryList() {
  const entrylist = document.getElementById("entrylist");
  entrylist.innerHTML = "";
  entryArray
    .filter((item) => item.journal === currentjournal)
    .forEach((arrayitem) => {
      entrylist.innerHTML += `<tr><td>${arrayitem.date}</td>
      <td>${arrayitem.prompt}</td>
      <td>${arrayitem.entry}</td>
      </tr>`;
    });
}

function selectRandomPrompt() {
  const randomindex = Math.floor(Math.random() * promptArray.length);
  currentPrompt = promptArray[randomindex].prompt;
}

function displayPromptDropDown() {
  const selectjournalprompt = document.getElementById("selectjournalprompt");
  selectjournalprompt.value = currentPrompt;
  selectjournalprompt.innerHTML = "";
  promptArray
    .filter((item) => item.journal === currentjournal)
    .forEach((prompt) => {
      selectjournalprompt.innerHTML += `<option value="${prompt.prompt}">${prompt.prompt}</option>`;
    });
}

function showSetupForm() {
  newjournalform.style.display = "block";
  journalpromptform.style.display = "none";
  journalentryform.style.display = "none";
}

function showPromptForm() {
  journalpromptform.style.display = "block";
  newjournalform.style.display = "none";
  journalentryform.style.display = "none";
}

function showEntryForm() {
  journalpromptform.style.display = "none";
  newjournalform.style.display = "none";
  journalentryform.style.display = "block";
  selectRandomPrompt();
  displayPromptDropDown();
}

function addNewJournal(e) {
  e.preventDefault();
  const journalinput = document.getElementById("journalinput");
  const text = journalinput.value;
  if (text.trim().length === 0) {
    return;
  }
  journalArray.push(text);
  journalinput.value = "";
  localStorage.setItem("journalArray", JSON.stringify(journalArray));
  renderJournalList();
  displayJournalButtons();
}

function addjournalPrompt(e) {
  e.preventDefault();
  const journalPromptinput = document.getElementById("journalpromptinput");
  const text = journalPromptinput.value;
  if (text.trim().length === 0) {
    return;
  }
  promptArray.push({ journal: currentjournal, prompt: text });
  journalPromptinput.value = "";
  localStorage.setItem("promptArray", JSON.stringify(promptArray));
  renderPromptList();
}

function addJournalEntry(e) {
  e.preventDefault();
  const journalentryinput = document.getElementById("journalentryinput");
  const text = journalentryinput.value;
  console.log(text);
  journalentryinput.value = "";
  entryArray.push({
    id: new Date().valueOf(),
    entry: text,
    journal: currentjournal,
    prompt: currentPrompt,
    date: new Date(),
  });
  saveEntryList();
  renderEntryList();
}
function renderJournalList() {
  const journallist = document.getElementById("journallist");
  journallist.innerHTML = "";
  journalArray.forEach((journal) => {
    journallist.innerHTML += `<li>${journal}</li>`;
  });
}

function renderPromptList() {
  const journalPromptlist = document.getElementById("promptlist");
  journalPromptlist.innerHTML = "";
  promptArray
    .filter((item) => item.journal === currentjournal)
    .forEach((arrayitem) => {
      journalPromptlist.innerHTML += `<li>${arrayitem.prompt}</li>`;
    });
}

function displayJournalButtons() {
  const journalButtons = document.getElementById("journalbuttons");
  journalButtons.innerHTML = "";
  journalArray.forEach((journal) => {
    journalButtons.innerHTML += `<button class="me-4 btn ${
      currentjournal == journal ? "btn-info" : "btn-primary"
    } " onclick="selectJournal('${journal}')">${journal}</button>`;
  });
}

const displayPromptArray = localStorage.getItem("promptArray");
if (displayPromptArray !== null) {
  promptArray = JSON.parse(displayPromptArray);
  renderPromptList();
}
const displayEntryArray = localStorage.getItem("entryArray");
if (displayEntryArray !== null) {
  entryArray = JSON.parse(displayEntryArray);
  renderEntryList();
}
const displayJournalArray = localStorage.getItem("journalArray");
if (displayJournalArray !== null) {
  journalArray = JSON.parse(displayJournalArray);
  renderJournalList();
  displayJournalButtons();
}
