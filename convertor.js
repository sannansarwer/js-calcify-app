const category = document.getElementById("category");

const fromValue = document.getElementById("fromValue");
const toValue = document.getElementById("toValue");

const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");

const result = document.getElementById("result");


// Load Units
const loadUnits = () => {

    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";

    const selectedCategory = category.value;

    if (selectedCategory === "Temperature") {

        temperatureUnits.forEach(unit => {

            fromUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
            toUnit.innerHTML += `<option value="${unit}">${unit}</option>`;

        });

    } else {

        Object.keys(units[selectedCategory]).forEach(unit => {

            fromUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
            toUnit.innerHTML += `<option value="${unit}">${unit}</option>`;

        });

    }

    // Set default selected units
    fromUnit.selectedIndex = 0;
    toUnit.selectedIndex = 1;

    convert();
}


// Temperature Conversion
const convertTemperature = (value, from, to) => {

    let celsius;

    switch (from) {

        case "Celsius":
            celsius = value;
            break;

        case "Fahrenheit":
            celsius = (value - 32) * 5 / 9;
            break;

        case "Kelvin":
            celsius = value - 273.15;
            break;
    }

    switch (to) {

        case "Celsius":
            return celsius;

        case "Fahrenheit":
            return (celsius * 9 / 5) + 32;

        case "Kelvin":
            return celsius + 273.15;

    }

}


// Convert Function
const convert = () => {

    const value = Number(fromValue.value);

    if (isNaN(value)) {

        toValue.value = "";
        result.value = "";

        return;

    }

    const from = fromUnit.value;
    const to = toUnit.value;

    let answer;

    if (category.value === "Temperature") {

        answer = convertTemperature(value, from, to);

    } else {

        const baseValue = value * units[category.value][from];

        answer = baseValue / units[category.value][to];

    }

    toValue.value = answer.toFixed(4);

    result.value = `${value} ${from} = ${answer.toFixed(4)} ${to}`;

}


// Events

category.addEventListener("change", () => {

    loadUnits();

    convert();

});

fromValue.addEventListener("input", convert);

fromUnit.addEventListener("change", convert);

toUnit.addEventListener("change", convert);


// Initial Load
loadUnits();