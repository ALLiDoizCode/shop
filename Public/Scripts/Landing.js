$(".button-collapse").sideNav();

var noImage = "https://api.codeswholesale.com/assets/images/no-image.jpg";
var cards = document.getElementById("cards");
var menu = document.getElementById("menu");
var featured = document.getElementById("featured");
var marker = 0
platforms(gotPlatforms);
products(gotProducts,"Steam",marker);
buildFeatured();
function buildFeatured(){
    let ranMaker = Math.floor((Math.random() * 1200) + 0);
    products(function(obj){
        console.log(obj.length);
        for (var i = 0; i < 5; i++) {
           let ran = Math.floor((Math.random() * (obj.length - 1)) + 0);
            if((obj[ran].images[1].image != undefined) && (noImage != obj[ran].images[1].image)) {
                let price = obj[ran].prices[0].value+" XRP";
                let url = obj[ran].images[1].image;
                let name = obj[ran].name
                console.log(price);
                console.log(url);
                console.log(name);
                obj.splice(ran, 1);
                let featuredObject = makeFeatured(url);
                featured.appendChild(featuredObject);
            }else {
                 i = i - 1
            }
        }
        $('.carousel').carousel({
            //fullWidth: true,
            indicators: true
        }); 
    },"Steam",ranMaker); 
}

function gotProducts(obj) {
    marker = marker + 50
    obj.forEach(function(item){
        if(item.images[1].image != undefined) {
            cards.appendChild(makeCard(item))
        }
    });
}

function gotPlatforms(obj){
    obj.reverse().forEach(function(platform){
        if(platform.name != "None"){
            menu.appendChild(makeCell(platform.name));
        }
    })
}

function makeCell(name) {
    var cell = document.createElement("a");
    cell.setAttributeNode(newClass("collection-item"));
    cell.innerHTML = name
    return cell
}

function makeFeatured(url){
    var cell = document.createElement("a");
    cell.setAttributeNode(newClass("carousel-item"));
    cell.href = "#"
    var image = document.createElement("img");
    image.src = url
    cell.appendChild(image);
    return cell
}

function makeCard(item) {
    var div = document.createElement("div");
    div.setAttributeNode(newClass('col s12 m6 l4 id="ProductCard"'));

    var card = document.createElement("div");
    card.setAttributeNode(newClass("card small"));

    var cardImage = document.createElement("div");
    cardImage.setAttributeNode(newClass("card-image"));

    var image = document.createElement("img");
    image.src = item.images[1].image

    var cardContent = document.createElement("div");
    cardContent.setAttributeNode(newClass("card-content"));

    var cardTitle = document.createElement("span");
    cardTitle.setAttributeNode(newClass("card-title"));
    cardTitle.innerHTML = item.name

    var cardDescription = document.createElement("p");

    var cardAction = document.createElement("div");
    cardAction.setAttributeNode(newClass("card-action"));

    var detail1 = document.createElement("a");
    detail1.innerHTML = item.prices[0].value+" XRP";
    detail1.href = "#"

    var btn = document.createElement("a");
    btn.setAttributeNode(newClass("waves-effect waves-light btn"));
    btn.innerHTML = "Buy"
    btn.href = "#"
    /*var btnIcon = document.createElement("i");
    btnIcon.setAttributeNode(newClass("material-icons right"));
    btnIcon.innerHTML = "add"*/

    cardImage.appendChild(image);
    card.appendChild(cardImage);
    cardContent.appendChild(cardTitle);
    cardContent.appendChild(cardDescription)
    card.appendChild(cardContent);
    cardAction.appendChild(btn)
    cardAction.appendChild(detail1);
    item.languages.forEach(function(lang){
        var detail2 = document.createElement("a");
        detail2.href = "#"
        detail2.innerHTML = lang;
        cardAction.appendChild(detail2);
    })
    cardAction.appendChild(btn);
    card.appendChild(cardAction);
    div.appendChild(card);
    
    return div
} 

function newClass(value) {
    var newClass = document.createAttribute("class")
    newClass.value = value
    return newClass
}
