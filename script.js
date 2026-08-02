
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
    passwordArea.style.display = "none"
    mainArea.style.display = "flex"
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
        passwordInput.value += num
    }
}

function clearPin() {
    passwordInput.value = ""
}

function checkPin() {
    if (PIN === null) {
        if (passwordInput.value.length !== 4) {
            passVerify.textContent = "Enter 4 digit PIN"
            return
        }
        localStorage.setItem("pin", passwordInput.value)

        passVerify.textContent = "PIN created successfully"
        PIN = localStorage.getItem("pin")
        passwordInput.value = ''
        renderMsg()
    } else {
        // let Pin = '1234'
        if (passwordInput.value === PIN) {
            passVerify.textContent = "Correct PIN"
            passVerify.style.color = "green"
            renderMsg()
        } else {
            passVerify.textContent = "Wrong PIN"
            passVerify.style.color = "red"
            passwordInput.value = ""
        }
    }
}

