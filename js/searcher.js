var countries = [];
var products = [];

var countrySelector = document.getElementById("country");
var selectedCountry = countrySelector.value;
countrySelector.addEventListener("change", function() {
    selectedCountry = countrySelector.value;
});

readAndSetCountries();
readAndSetProducts();

 function readAndSetCountries() {
    fetch("../data/countries.json").then(response => response.json()).then(data => {
        countries = data.countries;
        setCountries();
    });
}

function readAndSetProducts() {
    fetch("../data/products.json").then(response => response.json()).then(data => {
        products = data.productsAndImage;
        setProducts();
    });
}

function setProducts() {
    var productsArea = document.getElementById("productsArea");
    for (var i = 0; i < products.length; i++) {
        var product = products[i];
        var productDiv = document.createElement("div");

        productDiv.className = "product";
        productDiv.innerHTML = "<img src='" + product.image + "' alt='product image' width='100' height='100'>" +
            "<p>" + product.name + "</p>";
            
        productsArea.appendChild(productDiv);
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