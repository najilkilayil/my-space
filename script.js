
let sectionList = document.getElementById("sections_list")
let msgInputEl = document.getElementById("chat_box")
let subBtn = document.getElementById("chat_btn")

subBtn.addEventListener("click", function() {
    let msg = msgInputEl.value
    sectionList.innerHTML += `
        <div class="section" id="section">
            <p id="msg">${msg}</p>
            <p id="date">13/7/26</p>
        </div>
    `
    msgInputEl.value = ''
})