const selectEle = document.getElementById("select-trip");
const startDateEle = document.getElementById("start-date-op");
const returnDateEle = document.getElementById("return-date-op");
const btnEle = document.getElementById("submit-btn");
const oneWaySpan = document.getElementById("one-way-date");
const departSpan = document.getElementById("depart-date");
const returnSpan = document.getElementById("return-date");
const oneWayMessage = document.getElementById("one-way-message");
const roundTripMessage = document.getElementById("round-trip-message");

// Hide return date initially
returnDateEle.style.display = "none";

// Show/hide return date based on selection
selectEle.addEventListener("change", function() {
    if (selectEle.value === "One way") {
        returnDateEle.style.display = "none";
    } else {
        returnDateEle.style.display = "block";
    }
});

function formSubmit(event) {
    event.preventDefault(); // Prevent form from submitting and reloading page
    
    // Get today's date (without time)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const startDate = new Date(startDateEle.value);
    
    // Check if start date is in the past
    if (startDate < today) {
        alert("Start date cannot be in the past");
        return;
    }
    
    if (selectEle.value === "One way") {
        roundTripMessage.style.display = "none";
        oneWaySpan.textContent = startDateEle.value;
        oneWayMessage.style.display = "block";
    } else {
        const returnDate = new Date(returnDateEle.value);
        
        // Check if return date is in the past
        if (returnDate < today) {
            alert("Return date cannot be in the past");
            return;
        }
        
        // Check if depart date is after return date
        if (startDate > returnDate) {
            alert("Depart date cannot be later than return date");
            return;
        }
        
        oneWayMessage.style.display = "none";
        departSpan.textContent = startDateEle.value;
        returnSpan.textContent = returnDateEle.value;
        roundTripMessage.style.display = "block";
    }
}

btnEle.addEventListener("click", formSubmit);