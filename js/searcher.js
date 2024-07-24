var countries = [];
var products = {};
var customs = [];

var countrySelector = document.getElementById("country");
var selectedCountry = countrySelector.value;
countrySelector.addEventListener("change", function() {
    selectedCountry = countrySelector.value;
    setProducts(selectedCountry);
    console.log(selectedCountry);
});

populateCountriesList();
initializeCustoms();
initializeProducts();


 function populateCountriesList() {
    fetch("../data/countries.json").then(response => response.json()).then(data => {
        countries = data.countries;
        setCountries();
    });
}

function initializeProducts() {
    fetch("../data/products.json").then(response => response.json()).then(data => {
        products = data.productsAndImage;
        setProducts(selectedCountry);
    });
}

function initializeCustoms() {
    fetch("../data/customs.json").then(response => response.json()).then(data => {
        customs = data.customs;
    });
}



function setProducts(countryCode) {
    var productsArea = document.getElementById("productsArea");
    var currentCountryCustoms = customs[countryCode];
    if(currentCountryCustoms != undefined){
        var productsToDisplay = currentCountryCustoms["products"];
        var productsToDisplayKeys = Object.keys(productsToDisplay);
        for (var i = 0; i < productsToDisplayKeys.length; i++) {
            var product = products[productsToDisplayKeys[i]];
            var productDiv = document.createElement("div");

            productDiv.className = "product";
            productDiv.innerHTML = "<img src='" + product.image + "' alt='product image' width='100' height='100'>" +
                "<p>" + product.name + "</p>"+
                "<p>Price: " + productsToDisplay[product.name]["test"] + "</p>";
                
            productsArea.appendChild(productDiv);
        }
    }
}

function setCountries() {
    var country = document.getElementById("country");
    for (var i = 0; i < countries.length; i++) {
        var option = document.createElement("option");
        option.text = countries[i].name;
        option.value = countries[i].code;
        country.add(option);
    }
}