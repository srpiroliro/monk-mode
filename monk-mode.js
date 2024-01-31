

// function main(){
//     generate_block_page();

//     youtube();
// }

// function youtube() {
//     if(!window.location.href.includes("youtube.com") || !settings.youtube.status) return;
//     console.log("youtube");

//     if(settings.youtube.block) 
//         return block_page("detected YOUTUBE", "https://youtube.com/");
    
//     if(window.location.href.includes("shorts"))
//         return block_page("detected YOUTUBE SHORTS", "https://youtube.com/");

//     if(settings.youtube.parts.shorts.block){
//         const shorts=document.querySelectorAll(settings.youtube.parts.shorts.patterns.join(","));
//         if(shorts) 
//             shorts.forEach(e=>e.style.display="none");
//     }
// }


// function url_contains(text_list){
//     let current_url=window.location.href
//     text_list.forEach(element=>{
//         if(current_url.includes(element))
//             block_page("detected: '"+element+"'");
//     });
// }

// function content_contains(text_list){
//     let content=document.getElementsByTagName("body").textContent

//     text_list.forEach(e => {
//         if(content.includes(e)) block_page("detected: '"+e+"'")
//     });
// }





function youtube(settings) {
    if(!window.location.href.includes(config.youtube.url)) return;

    youtubeElements(settings);
    youtubeHomepage(settings);
}

function youtubeHomepage(settings) {
    if(window.location.pathname=="/" || settings?.blockYoutube) return

    if (settings.blockRecommendations) {
        console.log("youtube homepage");

        document.querySelector("body").style.overflow="hidden"
        document.querySelector("#contents.ytd-rich-grid-renderer").style.pointerEvents="none"
    } else {
        document.querySelector("body").style.overflow="auto"
        document.querySelector("#contents.ytd-rich-grid-renderer").style.pointerEvents="initial"
    }


}
function youtubeElements(settings) {
    console.log("youtubeElements", settings)
    youtube_shorts_block = settings.blockShorts;

    const shorts=document.querySelectorAll(config.youtube.parts.shorts.patterns.join(","));
    const comments=document.querySelectorAll(config.youtube.parts.comments.patterns.join(","));
    const recommendations=document.querySelectorAll(config.youtube.parts.recommendations.patterns.join(","));

    if (settings.blockShorts) {
        console.log("blocking",shorts.length,"youtube shorts");

        shorts.forEach(e=>e.style.display="none");
    }

    if (settings.blockComments) {
        console.log("blocking",comments.length,"youtube comments");

        comments.forEach(e=>e.style.display="none");
    }

    if (settings.blockRecommendations) {
        console.log("blocking",recommendations.length,"youtube recommendations");
        
        recommendations.forEach(e=>e.style.display="none");
    }


   
    // updateVisibility(config.youtube.parts.live_chat, settings.blockLive_chat);
    // updateVisibility(config.youtube.parts.likes, settings.blockLikes);
    // updateVisibility(config.youtube.parts.views, settings.blockViews);
}

function updateVisibility(part, shouldBeBlocked) {
    const elements = document.querySelectorAll(part.patterns.join(","));

    elements.forEach(element => {
        element.style.display = shouldBeBlocked?'none':'block';
        // element.style.opacity = shouldBeBlocked?0:1;
    });
}



let youtube_shorts_block = config.youtube.parts.shorts.block;



function applySettings() {
    
    chrome.storage.local.get(null, function(settings) {
        console.log("loaded settings", settings);

        youtube(settings);
        urlDetect(settings);
    });
}

function urlDetect(settings) {
    console.log("urlDetect", window.location.href)

    if (window.location.href.includes(config.youtube.url)) {
        if (settings.blockYoutube) {
            return block_page("detected YOUTUBE", config.youtube.url);
        } else if (settings.blockShorts && window.location.href.includes("shorts")) {
            return block_page("detected YOUTUBE SHORTS", config.youtube.url);
        }
    } else if (window.location.href.includes("twitter.com"))
        return block_page("detected TWITTER");
}

// Listen for changes in storage and apply the corresponding setting updates
chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {

        // Check if the change is relevant to your settings and apply them
        if (key.startsWith('block')) {

            applySettings();
            
            return;
        }
    }
});


// Listen for messages from the popup, in case immediate action is required
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "updateSettings") {
        applySettings(); // Apply settings if a message is received to update settings
        sendResponse({status: "success"});
    }
});


// youtube custom
window.addEventListener("yt-navigate-start", function(event) {
    console.log("yt-navigate-start", event);

    applySettings();
}); 

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOMContentLoaded");

    applySettings();    
});

// Apply settings on initial load

window.addEventListener('load', function() {
   console.log('All assets are loaded') 

})

applySettings();


generate_block_page();
