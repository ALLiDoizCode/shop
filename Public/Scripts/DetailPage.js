var featured = document.getElementById("featured");
var title = document.getElementById("title");
var info = document.getElementById("info");
var id = sessionStorage.getItem('productID');
description(setupDetailPage,id)

function setupDetailPage(obj) {
    console.log(id);
    console.log(obj);
    title.innerHTML = obj.officialTitle;
    obj.factSheets.forEach(function(desc){
        if (desc.territory == "English") {
            info.innerHTML = desc.description;
        }
    })

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
    
    $('.carousel').carousel({
        fullWidth: true,
        indicators: true
    });
}

function newClass(value) {
    var newClass = document.createAttribute("class")
    newClass.value = value
    return newClass
}