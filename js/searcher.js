var countries = [];
readAndSetCountries();

async function readAndSetCountries() {
    await fetch("../data/countries.json").then(response => response.json()).then(data => {
        console.log(data);
        countries = data.countries;
        console.log(countries);
        setCountries();
    });
}

function setCountries() {
    var country = document.getElementById("country");
    for (var i = 0; i < countries.length; i++) {
        var option = document.createElement("option");
        option.text = countries[i].name;
        option.value = countries[i].code;
        console.log(countries[i].name);
        country.add(option);
    }
}