
let sectionList = document.getElementById("sections_list")
let msgInputEl = document.getElementById("chat_box")
let subBtn = document.getElementById("chat_btn")

// let today = new Date()

// let day = today.getDate()
// let month = today.getMonth() + 1
// let year = today.getFullYear()

// let date = `${day}/${month}/${year}`

let messages = JSON.parse(localStorage.getItem("messages"))

if (messages === null) {
    messages = []
}

function renderMsg() {
    sectionList.innerHTML = ""

    if (messages.length === 0) {
        sectionList.innerHTML = `
            <div class="empty_state" id="empty_state">
                <div class="icon" id="icon">💜</div>
                <h2>No saved messages</h2>
                <p>
                    Your personal messages will appear here. <br>
                    Write your first message below!
                </p>
            </div>
        `
    }

    messages.forEach(item => {
        sectionList.innerHTML += `
            <div class="section" id="section">
                <p id="msg">${item.message}</p>
                <p id="date">${item.date}</p>
            </div>
        `
    });
}

subBtn.addEventListener("click", function () {

    if (msgInputEl.value === "") {
        return
    }

    let today = new Date()
    let day = today.getDate()
    let month = today.getMonth() + 1
    let year = today.getFullYear()
    let date = `${day}/${month}/${year}`
 
    messages.push({
        message: msgInputEl.value,
        date: date
    })

    localStorage.setItem("messages", JSON.stringify(messages))
    msgInputEl.value = ''
    renderMsg()
})

renderMsg()
