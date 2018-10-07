var featured = document.getElementById("featured");
var id = sessionStorage.getItem('productID');
description(setupDetailPage,id)

function setupDetailPage(obj) {
    console.log(id);
    console.log(obj);
    obj.photos.forEach(function(photo){
        if(photo.type == "SCREEN_SHOT_LARGE") { 
            var a = document.createElement("a");
            a.setAttributeNode(newClass("carousel-item"));
            var image = document.createElement("img");
            image.src = photo.url
            a.appendChild(image);
            featured.appendChild(a);
        }
    })
    
    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true
    });
}

function newClass(value) {
    var newClass = document.createAttribute("class")
    newClass.value = value
    return newClass
}