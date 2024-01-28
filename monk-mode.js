// window.addEventListener("yt-navigate-start",youtube); 

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


// document.addEventListener('DOMContentLoaded', function() {
//     console.log('The DOM has been fully loaded');

// });
// window.addEventListener('popstate', function() {
//     // Handle the navigation event
//     console.log('Navigated to:', window.location.href);
    
//     unblock_page();
// });

// main();

//////


function updateVisibility(part, shouldBeBlocked) {
    const elements = document.querySelectorAll(part.patterns.join(","));

    elements.forEach(element => {
        element.style.display = shouldBeBlocked?'none':'block';
    });
}

function applySettings() {
    chrome.storage.local.get(null, function(settings) {
        // Check and apply settings for each YouTube part

        updateVisibility(config.youtube.parts.shorts, settings.blockShorts);
        updateVisibility(config.youtube.parts.comments, settings.blockComments);
        updateVisibility(config.youtube.parts.recommendations, settings.blockRecommendations);
        updateVisibility(config.youtube.parts.live_chat, settings.blockLive_chat);
        updateVisibility(config.youtube.parts.likes, settings.blockLikes);
        updateVisibility(config.youtube.parts.views, settings.blockViews);

        // Add or modify additional parts as necessary
    });
}

// Listen for changes in storage and apply the corresponding setting updates
chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {

        // Check if the change is relevant to your settings and apply them
        if (key.startsWith('block')) {
            applySettings();
        }
    }
});

// Apply settings on initial load
applySettings();

// Listen for messages from the popup, in case immediate action is required
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "updateSettings") {
        applySettings(); // Apply settings if a message is received to update settings
        sendResponse({status: "success"});
    }
    
});