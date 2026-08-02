
let sectionList = document.getElementById("sections_list")
let msgInputEl = document.getElementById("chat_box")
let subBtn = document.getElementById("chat_btn")

let today = new Date()

let day = today.getDate()
let month = today.getMonth() + 1
let year = today.getFullYear()

let date = `${day}/${month}/${year}`

subBtn.addEventListener("click", function() {
    let msg = msgInputEl.value
    sectionList.innerHTML += `
        <div class="section" id="section">
            <p id="msg">${msg}</p>
            <p id="date">${date}</p>
        </div>
    `
    msgInputEl.value = ''
})