let promptArray=[]

const journalpromptform=document.getElementById("journalpromptform")
const journalentryform=document.getElementById("journalentryform")

function showPromptForm(){

journalpromptform.style.display="block"
journalentryform.style.display="none"
}


function showEntryForm(){
    journalpromptform.style.display="none"
    journalentryform.style.display="block"


}


function addjournalPrompt(){
    const journalPromptinput=document.getElementById("journalpromptinput")
    const text=journalPromptinput.value
promptArray.push(text)
journalPromptinput=""
}

function addtask(e){
    e.preventDefault()
        const taskinput=document.getElementById("taskinput")
    const text=taskinput.value
    console.log(text)
taskinput.value=""
taskarray.push({ id:new Date().valueOf(), task:text,is_completed:false})
saveTaskList()
renderTaskList()
}