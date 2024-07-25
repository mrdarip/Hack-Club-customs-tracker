let launchingOnGithubPages = window.location.hostname === "mrdarip.github.io";

function githubifyRoute(route) {
    return launchingOnGithubPages ? "/Hack-Club-customs-tracker/" + route : route;
}

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
    fetch(githubifyRoute("/data/countries.json")).then(response => response.json()).then(data => {
        countries = data.countries;
        setCountries();
    });
}

function initializeProducts() {
    fetch(githubifyRoute("/data/products.json")).then(response => response.json()).then(data => {
        products = data.productsAndImage;
        setProducts(selectedCountry);
    });
}

function initializeCustoms() {
    fetch(githubifyRoute("/data/customs.json")).then(response => response.json()).then(data => {
        customs = data.customs;
    });
}



function setProducts(countryCode) {
    var productsArea = document.getElementById("productsArea");
    productsArea.innerHTML = "";

    var currentCountryCustoms = customs[countryCode];
    if(currentCountryCustoms != undefined){
        var productsToDisplay = currentCountryCustoms["products"];
        var productsCodes = Object.keys(productsToDisplay);

        var currency = countries.find(country => country.code == countryCode).currency;
        for (var i = 0; i < productsCodes.length; i++) {
            var productInfo = products[productsCodes[i]];
            var productCustoms = productsToDisplay[productsCodes[i]];

            var maxCustom = Math.max.apply(null, Object.values(productCustoms));
            var minCustom = Math.min.apply(null, Object.values(productCustoms));
            var averageCustomFromProductCustoms = Object.values(productCustoms).reduce((a, b) => a + b, 0) / Object.keys(productCustoms).length;                       

            var productDiv = document.createElement("div");

            productDiv.className = "product";
            productDiv.innerHTML = "<img src='" + productInfo.image + "' alt='product image' width='100' height='100'>" +
                "<h2>" + productInfo.name + "</h2>"+
                "<p>Max custom: " + maxCustom + " " + currency +"</p>"+
                "<p>Min custom: " + minCustom + " " + currency +"</p>"+
                "<p>Average custom: " + averageCustomFromProductCustoms + " " + currency +"</p>";
                
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