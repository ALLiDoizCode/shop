$(".button-collapse").sideNav();

var noImage = "https://api.codeswholesale.com/assets/images/no-image.jpg";
var cards = document.getElementById("cards");
var menu = document.getElementById("menu");
var featured = document.getElementById("featured");
var searchInput = document.getElementById("search");
var close = document.getElementById("close");
var marker = 0
var menuCells = [];

platforms(gotPlatforms);
products(gotProducts,"Steam",0);
var objects;

close.onclick = function(){
    searchInput.value = ""
}

searchInput.onkeyup = function() {
    search(searchInput.value)
}

function search(name) {
    while (cards.firstChild) {
        cards.removeChild(cards.firstChild);
    }
    objects.forEach(function(item){
        console.log(item)
        if(item.images[0].image != undefined) {
            var lowercaseName = item.name.toLowerCase();
            if(lowercaseName.includes(name)){
                cards.appendChild(makeCard(item))
            }
            
        }
    });
}

function gotProducts(obj) {
    objects = obj
    obj.forEach(function(item){
        console.log(item)

        if(item.images[0].image != undefined) {
            cards.appendChild(makeCard(item))
        }
    });
}

function gotPlatforms(obj){
    obj.reverse().forEach(function(platform){
        if(platform.name != "None"){
            var cell = makeCell(platform.name);
            menuCells.push(cell);
            if(platform.name == obj[0].name){
                cell.setAttributeNode(newClass("collection-item active"));
            }
            menu.appendChild(cell);
        }
    })
}

function makeCell(name) {
    var cell = document.createElement("a");
    cell.setAttributeNode(newClass("collection-item"));
    cell.innerHTML = name
    cell.onclick = function(){
        menuCells.forEach(function(currentCell){
            currentCell.setAttributeNode(newClass("collection-item"));
        })
        cell.setAttributeNode(newClass("collection-item active"));
        while (cards.firstChild) {
            cards.removeChild(cards.firstChild);
        }
        var platformString = cell.innerHTML.replace(/\s/g,'')
        products(gotProducts,platformString,0); 
    }
    return cell
}

function makeCard(item) {
    var a = document.createElement("a");
    var div = document.createElement("div");
    div.setAttributeNode(newClass('col s12 m6 l4 id="ProductCard"'));
    a.appendChild(div);
    var card = document.createElement("div");
    card.setAttributeNode(newClass("card Large"));

    var cardImage = document.createElement("div");
    cardImage.setAttributeNode(newClass("card-image waves-effect waves-block waves-light"));
    
    var image = document.createElement("img");
    image.setAttributeNode(newClass("activator"));
    image.src = item.images[1].image
    image.onclick = function(){
        console.log("boom");
    }

    var cardContent = document.createElement("div");
    cardContent.setAttributeNode(newClass("card-content"));

    var cardPrice = document.createElement("span");
    cardPrice.setAttributeNode(newClass("card-title"));
    cardPrice.innerHTML = item.prices[0].value+" XRP";

    var cardTitle = document.createElement("p");
    //cardTitle.setAttributeNode(newClass("card-title"));
    cardTitle.innerHTML = item.name

    var cardDescription = document.createElement("p");

    var cardAction = document.createElement("div");
    cardAction.setAttributeNode(newClass("card-action"));

    var btn = document.createElement("a");
    btn.setAttributeNode(newClass("waves-effect waves-light btn"));
    btn.innerHTML = "Buy"
    btn.href = "#"

    card.appendChild(cardImage);
    cardImage.appendChild(image);
    //cardImage.appendChild(cardTitle);
    cardContent.appendChild(cardPrice)
    cardContent.appendChild(cardTitle)
    card.appendChild(cardContent);
    item.languages.forEach(function(lang){
        var detail = document.createElement("a");
        detail.href = "#"
        detail.innerHTML = lang;
        cardAction.appendChild(detail);
    })
    cardAction.appendChild(btn)
    card.appendChild(cardAction);
    div.appendChild(card);
    
    return a
} 

function newClass(value) {
    var newClass = document.createAttribute("class")
    newClass.value = value
    return newClass
}
