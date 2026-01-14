const btnEle = document.querySelector("#btn")
const btnSpan = document.querySelector("#btn-span")
let displayNum = btnSpan.textContent

function increment() {
    console.log(displayNum)
    displayNum++
    return displayNum
}

function display() {
    increment()
    btnSpan.textContent = displayNum
}

btnEle.addEventListener("click", display)

