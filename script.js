
let sectionList = document.getElementById("sections_list")
let msgInputEl = document.getElementById("chat_box")
let subBtn = document.getElementById("chat_btn")

let body = document.getElementById("body_el")
// let today = new Date()

// let day = today.getDate()
// let month = today.getMonth() + 1
// let year = today.getFullYear()

// let date = `${day}/${month}/${year}`

let messages = JSON.parse(localStorage.getItem("messages"))

if (messages === null) {
    messages = []
}
let editMode = null

function renderMsg() {
    passwordArea.style.animation = "fadeOut 0.5s"
    mainArea.style.animation = "fadeIn 0.5s"
    setInterval(() => {
        passwordArea.style.display = "none"
        mainArea.style.display = "flex"
    }, 500);
    sectionList.innerHTML = ""

    if (messages.length === 0) {
        sectionList.innerHTML = `
            <div class="empty_state" id="empty_state">
                <div class="icon" id="icon">🔒</div>
                <h2>Vault Empty</h2>
                <p>
                    No confidential files stored. <br>
                    Store your first secret.
                </p>
            </div>
        `
    }

    messages.forEach((item, index) => {
        sectionList.innerHTML += `
            <div class="section" id="section" data-index="${index}" style="animation-delay: ${index * 0.1}s">
                <button class="dlt_btn" id="dlt_btn" onclick="dltMsg(event, ${index})">Remove</button>
                <button class="edit_btn" id="edit_btn" onclick="editMsg(${index})">Edit</button>
                <button class="copy_btn" id="copy_btn" onclick="copyMsg(${index})">Copy</button>
                <p id="msg">${item.message}</p>
                <p id="date">${item.date}</p>
            </div>
        `
    });
}

function dltMsg(event, index) {
    if (confirm("Delete this message?")) {
        messages.splice(index, 1)
        localStorage.setItem("messages", JSON.stringify(messages))
        renderMsg()
    }
}

subBtn.addEventListener("click", function () {

    if (msgInputEl.value === "") {
        return
    }

    let today = new Date()
    let day = String(today.getDate()).padStart(2, "0")
    let month = today.toLocaleString("en-US", { month: "short" })
    let year = today.getFullYear()
    let date = `${day}-${month}-${year}`

    if (editMode === null) {
        messages.push({
            message: msgInputEl.value,
            date: date
        })
        setTimeout(() => {
            alertNoti("Saved", "#5dff62")
        }, 700);
    } else {
        messages[editMode].message = msgInputEl.value
        messages[editMode].date = date
        editMode === null
        subBtn.textContent = "➤"
        setTimeout(() => {
            alertNoti("Edited", "#D4D7DE")
        }, 700);
    }

    localStorage.setItem("messages", JSON.stringify(messages))
    msgInputEl.value = ''
    msgInputEl.blur()
    subBtn.blur()
    renderMsg()
})

// renderMsg()

let passwordInput = document.getElementById("password_input")
let passwordArea = document.getElementById("password_area")
let passwordText = document.getElementById("pass_text")
let mainArea = document.getElementById("main_area")
let passVerify = document.getElementById("pass_verify")

let PIN = localStorage.getItem("pin")
if (PIN === null) {
    passwordText.textContent = "Create PIN to continue"
} else {
    passwordText.textContent = "Enter PIN to continue"
}

function pinNum(num) {
    if (passwordInput.value.length < 4) {
        passwordInput.style.animation = "none"
        passwordInput.value += num
        passVerify.innerHTML = ``
    }
}

function clearPin() {
    passwordInput.value = ""
}

function checkPin() {
    if (PIN === null) {
        if (passwordInput.value.length !== 4) {
            passVerify.textContent = "Enter 4 digit PIN"
            passwordInput.value = ""
            return
        }
        localStorage.setItem("pin", passwordInput.value)

        passVerify.textContent = " "
        PIN = localStorage.getItem("pin")
        passwordInput.value = ''
        renderMsg()
    } else {
        // let Pin = '1234'
        if (passwordInput.value === PIN) {
            // passVerify.textContent = "Correct PIN"
            // passVerify.style.color = "green"
            // renderMsg()

            setTimeout(() => {
                renderMsg()
            }, 500)
            passwordInput.style.color = "#5dff62"
        } else {
            passwordInput.style.color = "#FF5D73"
            passVerify.style.color = "#FF5D73"
            passwordInput.style.animation = "shake 0.5s"
            setTimeout(() => {
                passwordInput.value = ""
                passVerify.innerHTML = `For Reset double click on C`
                passwordInput.style.color = "#F7F8FA"
            }, 1500)


        }
    }
}

let resetBtn = document.getElementById("reset_btn")

resetBtn.addEventListener("dblclick", function () {
    if (confirm("Reset your PIN?")) {
        localStorage.removeItem("pin")
        PIN = null
        localStorage.removeItem("messages")
        messages = []
        localStorage.removeItem("messages")
        passwordInput.value = ""
        passwordText.textContent = "Create new PIN to continue"
        passVerify.textContent = " "
    }
})

// dot random motion and animation 
for (let i = 1; i < 50; i++) {
    let dot = document.createElement("div")
    dot.className = "dot"
    dot.style = `--i: ${i}`
    body.appendChild(dot)

    function moveDot() {
        dot.style.left = Math.random() * window.innerWidth + "px"
        dot.style.top = Math.random() * window.innerHeight + "px"
    }
    moveDot()
}

let inputArea = document.getElementById("input_area")
let headArea = document.getElementById("bottom_head_area")
let headText = document.getElementById("bottom_text_area")
let bottomLogo = document.getElementById("bottom_logo")

inputArea.addEventListener("focusin", function () {
    headArea.style.width = "10%"
    headText.style.display = "none"
    bottomLogo.style.display = "block"
})

inputArea.addEventListener("focusout", function () {
    headArea.style.width = "80%"
    bottomLogo.style.display = "none"
    setTimeout(() => {
        headText.style.display = "flex"
    }, 400);
})

function editMsg(index) {
    editMode = index
    msgInputEl.value = messages[index].message
    msgInputEl.focus()

    subBtn.textContent = "✓"
}

function copyMsg(index) {
    navigator.clipboard.writeText(messages[index].message)
    alertNoti("Copied", "#5dff62")
}

let notiAlert = document.getElementById("noti_alert")

function alertNoti(text, color) {
    notiAlert.textContent = text
    notiAlert.style.color = color
    notiAlert.style.display = "flex"
    headArea.style.width = "35%"
    setTimeout(() => {
        notiAlert.style.display = "none"
        headArea.style.width = "80%"
    }, 4000)
}