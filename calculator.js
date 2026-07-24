// Elements by ID

const currentDisplay = document.getElementById("currentDisplay");
const previousDisplay = document.getElementById("previousDisplay");

const calcKeys = document.getElementById("calcKeys");

const resetBtn = document.getElementById("resetBtn");
const deleteBtn = document.getElementById("deleteBtn");
const equalBtn = document.getElementById("equalBtn");

const copy = document.getElementById("copy");
const history = document.getElementById("history");
const darkMode = document.getElementById("darkMode");

const calculator = document.querySelector(".calc");

const historyList = document.getElementById("historyList");
const clearHistory = document.getElementById("clearHistory");


// Expression 

let expression = "";
let calculationHistory = [];


// Update Display 

const updateDisplay = () => {                           
    currentDisplay.value = expression || "0";
}; 

updateDisplay();

//  Exact Same Functionallity for updateDisplay //

//  const updateDisplay = () => {
//          if(expression === ""){
//              currentDisplay.value = "0";
//          } else {
//              currentDisplay.value = expression;
//          }
//  }; 


// Click Event & Input Validation

calcKeys.addEventListener("click", (e) => {

    // Ignore clicks that aren't buttons
    if (!e.target.matches("button")) return;

    // Get button value
    const value = e.target.dataset.value;

    // Ignore buttons without data-value (AC, DEL, =)
    if (!value) return;

    // Check if clicked button is an operator
    const isOperator = e.target.classList.contains("operator");

    // Get last character of expression
    const lastCharacter = expression.slice(-1);

    // Don't start with an operator
    if (expression === "" && isOperator) {
        showAlert("Invalid Input","danger");
    }

    // Don't allow two operators together
    if (
        isOperator &&
        ["+", "-", "*", "/"].includes(lastCharacter)
    ) {
        showAlert("Invalid Input","danger");
    }

    // Don't allow multiple decimal points
    if (value === ".") {

        const lastNumber = expression.split(/[+\-*/]/).pop();

        if (lastNumber.includes(".")) {
            showAlert("Invalid Input","primary");
        }
    }

    // Store clicked value
    expression += value;

    // Update calculator display
    updateDisplay();

});


// All Clear (AC)

resetBtn.addEventListener("click", () => {
    
    // Clear the expression
    expression = "";

    // Clear the previous display
    previousDisplay.value = "";

    // Update the current display (shows 0)
    updateDisplay();

});


// Delete Expression (Del)

deleteBtn.addEventListener("click", () => {

    expression = expression.slice(0,-1);
    updateDisplay();

});


// Equal Operations (=)

equalBtn.addEventListener("click", () => {

    // Check if there is anything to calculate
    if(expression === ""){
        showAlert("Enter Values To Calculate","danger");
    }

    // Save the expression
    previousDisplay.value = expression + " = ";

    // Calculate & Error Check
    try{

        const jsExpression = expression.replace(/%/g, "/100");
        const result = eval(jsExpression); // Calculate Result
        currentDisplay.value = result;   // Display Result on Current Display
        expression = result.toString();  // Convert result into String

        const historyItem = `${previousDisplay.value} ${currentDisplay.value}`;
        calculationHistory.push(historyItem);

    }catch (error) {

        currentDisplay.value = "0";
        expression = "";

    } 
    

});



// Dark Mode

darkMode.addEventListener("click", () => {

    calculator.classList.toggle("dark-mode");

    if (calculator.classList.contains("dark-mode")) {
        darkMode.textContent = "Light Mode";
    } else {
        darkMode.textContent = "Dark Mode";
    }

});


// Copy Mode

copy.addEventListener("click", () => {

    const textToCopy = `${previousDisplay.value} ${currentDisplay.value}`;

    navigator.clipboard.writeText(textToCopy);

    showAlert("Copied Successfully","success");

});


// History 

history.addEventListener("click", () => {

    historyList.innerHTML = "";

    calculationHistory.forEach((item) => {

        const li = document.createElement("li");

        li.className = "list-group-item";

        li.textContent = item;

        historyList.appendChild(li);

    });

});

clearHistory.addEventListener("click", () => {

    calculationHistory = [];
    historyList.innerHTML = "";
    showAlert("History Cleared","warning")

});



// Alert Section
const showAlert = (message, type = "success") => {
    const container = document.getElementById("alertContainer");

    const wrapper = document.createElement("div");

    wrapper.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show shadow" role="alert">
            ${message}
            <button type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close">
            </button>
        </div>
    `;

    container.appendChild(wrapper);

    // Auto remove after 3 seconds
    setTimeout(() => {
        const alert = bootstrap.Alert.getOrCreateInstance(wrapper.querySelector(".alert"));
        alert.close();
    }, 2000);
}