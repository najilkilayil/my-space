
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
            <div class="section" id="section" data-index="${index}" style="animation-delay: ${index*0.1}s">
                <button class="dlt_btn" id="dlt_btn" onclick="dltMsg(event, ${index})">Remove</button>
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
    let month = today.toLocaleString("en-US", {month: "short"})
    let year = today.getFullYear()
    let date = `${day}-${month}-${year}`

    messages.push({
        message: msgInputEl.value,
        date: date
    })

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
        passwordInput.style.borderColor = "#00E5C3"
        passwordInput.style.boxShadow = "0 0 25px rgba(0, 229, 195, 0.35)"
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
            passwordInput.style.borderColor = "green"
            passwordInput.style.boxShadow = "0 0 25px green"
        } else {
            passVerify.textContent = "For Reset double click on C"
            passVerify.style.color = "red"
            passwordInput.value = ""

            passwordInput.style.borderColor = "#FF5D73"
            passwordInput.style.boxShadow = "0 0 25px #FF5D73"
            passwordInput.style.animation = "shake 0.5s"
        }
    }
}

let resetBtn = document.getElementById("reset_btn")

resetBtn.addEventListener("dblclick", function() {
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