const btnHTML = document.querySelector("#btn-html")
const btnCSS = document.querySelector("#btn-css")
const btnJS = document.querySelector("#btn-js")

function showTextHTML() {
    if (btnHTML.textContent == "▲") {
        btnHTML.textContent = "▼";
        document.querySelector("#html-text").style.display = "block"
    } else {
        btnHTML.textContent = "▲";
        document.querySelector("#html-text").style.display = ""
    }
}

function showTextCSS() {
    if (btnCSS.textContent == "▲") {
        btnCSS.textContent = "▼";
        document.querySelector("#css-text").style.display = "block"
    } else {
        btnCSS.textContent = "▲";
        document.querySelector("#css-text").style.display = ""
    }
}

function showTextJS() {
    if (btnJS.textContent == "▲") {
        btnJS.textContent = "▼";
        document.querySelector("#js-text").style.display = "block"
    } else {
        btnJS.textContent = "▲";
        document.querySelector("#js-text").style.display = ""
    }
}

btnHTML.addEventListener("click", showTextHTML)
btnCSS.addEventListener("click", showTextCSS)
btnJS.addEventListener("click", showTextJS)