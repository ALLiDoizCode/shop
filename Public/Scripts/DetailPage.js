var featured = document.getElementById("featured");
var title = document.getElementById("title");
var info = document.getElementById("info");
var cardTags = document.getElementById("cardTags");
var cardBody = document.getElementById("cardBody");
var product = JSON.parse(sessionStorage.getItem('product'));
var videoHeight;
console.log(product);
description(setupDetailPage,product.productId)

function setupDetailPage(obj) {
    console.log(product);
    console.log(obj);
    title.innerText = obj.officialTitle;
    
    setupTags(obj);


    obj.factSheets.forEach(function(desc){
        if (desc.territory == "English") {
            info.innerHTML = desc.description;
        }
    })

    obj.videos.forEach(function(videoObject){
        var a = document.createElement("a");
        a.setAttributeNode(newClass("carousel-item"));
        var url = videoObject.url.slice(0, 24);
        console.log(url)
        var videoID = videoObject.url.slice(32, videoObject.url.length);
        console.log(videoID)
        if(product.platform != "Steam" && (url == "https://www.youtube.com/")){
            var iframeDiv = document.createElement("div");
            iframeDiv.setAttributeNode(newClass("video-container"));
            var iframe = document.createElement("iframe");
            //iframe.width = "853";
            //iframe.height = "480";
            iframe.src = url+"embed/"+videoID;
            iframe.frameborder = 0;
            var newAtr = document.createAttribute("allowfullscreen")
            iframe.setAttributeNode(newAtr);
            if (obj.videos[0].url == videoObject.url){
                var allowAtr = document.createAttribute("allow")
                allowAtr.value = "autoplay"
                iframe.setAttributeNode(allowAtr);
            }
            iframeDiv.appendChild(iframe);
            
            a.appendChild(iframeDiv);
            //obj.videos = []
            
            console.log(videoHeight);
        }else{
            var iframe = document.createElement("video");
            iframe.setAttributeNode(newClass("responsive-video"))
            var newAtr = document.createAttribute("controls")
            iframe.setAttributeNode(newAtr);
            iframe.src = videoObject.url;
            iframe.frameborder = 0;
            a.appendChild(iframe);
            if (obj.videos[0].url == videoObject.url){
                iframe.autoplay = true;
            }
            
            console.log(videoHeight);
        }
        featured.appendChild(a);       
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
    
    cardBody.style.height = "auto";
}

function setupTags(obj) {
    var categoryDiv = document.createElement("div");
    categoryDiv.setAttributeNode(newClass("col s12"));
    var category = document.createElement("p");
    category.setAttributeNode(newClass("flow-text"));
    category.innerText = "Categorys";
    categoryDiv.appendChild(category);
    var tagArray = obj.category.split(", ");
    tagArray.forEach(function(word){
        var tag = document.createElement("blockquote");
        tag.style.margin = 5;
        tag.setAttributeNode(newClass("col s5 m12"));
        tag.style.backgroundColor = "white"
        tag.innerText = word;
        var space = document.createElement("p");
        space.setAttributeNode(newClass("col s1"));
        space.innerText = "    "
        categoryDiv.appendChild(tag);
        //categoryDiv.appendChild(space);
    })
    cardTags.appendChild(categoryDiv);

    var platformDiv = document.createElement("div");
    platformDiv.setAttributeNode(newClass("col s12"));
    var platform = document.createElement("p");
    platform.setAttributeNode(newClass("flow-text"));
    platform.innerText = "Platform";
    platformDiv.appendChild(platform);
    var platformArray = obj.platform.split(", ");
    platformArray.forEach(function(word){
        var tag = document.createElement("blockquote");
        tag.style.margin = 5;
        tag.setAttributeNode(newClass("col s5 m12"));
        tag.style.backgroundColor = "white"
        tag.innerText = word;
        var space = document.createElement("p");
        space.setAttributeNode(newClass("col s1"));
        space.innerText = "    "
        platformDiv.appendChild(tag);
        //platformDiv.appendChild(space);
    })
    cardTags.appendChild(platformDiv);

    var languageDiv = document.createElement("div");
    languageDiv.setAttributeNode(newClass("col s12"));
    var platform = document.createElement("p");
    platform.setAttributeNode(newClass("flow-text"));
    platform.innerText = "Languages";
    languageDiv.appendChild(platform);
    var languageArray = obj.inTheGameLanguages;
    languageArray.forEach(function(word){
        var tag = document.createElement("blockquote");
        tag.style.margin = 5;
        tag.setAttributeNode(newClass("col s5 m12"));
        tag.style.backgroundColor = "white"
        tag.innerHTML = word;
        var space = document.createElement("p");
        space.setAttributeNode(newClass("col s1"));
        space.innerText = "    "
        languageDiv.appendChild(tag);
        //languageDiv.appendChild(space);
    })
    cardTags.appendChild(languageDiv);
}

function newClass(value) {
    var newClass = document.createAttribute("class")
    newClass.value = value
    return newClass
}

function convertFLV(videoElement,url){
    if (flvjs.isSupported()) {
        var flvPlayer = flvjs.createPlayer({
            type: 'flv',
            url: url,
            cors: true
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        //flvPlayer.play();
    }
}

function didResize(){
    var w = window.outerWidth;
    console.log(w);
    if(w > 1800) {
        featured.style.height = "60%"
    }else if (w > 1200) {
        featured.style.height = "50%"
    }else {
        featured.style.height = "30%"
    }
}

/*<ul class="pagination">
    <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
    <li class="active"><a href="#!">1</a></li>
    <li class="waves-effect"><a href="#!">2</a></li>
    <li class="waves-effect"><a href="#!">3</a></li>
    <li class="waves-effect"><a href="#!">4</a></li>
    <li class="waves-effect"><a href="#!">5</a></li>
    <li class="waves-effect"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
  </ul>*/
           