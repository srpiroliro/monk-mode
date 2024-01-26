
const settings = {
    youtube: {
        status: true,
        block: false,

        parts: {
            shorts: {
                block: true,
                patterns: ["[is-shorts]", "ytd-reel-shelf-renderer", 'ytd-guide-entry-renderer a#endpoint[title="Shorts"]']
            },

            comments: {
                block: false,
                patterns: ["ytd-comments"]
            },

            recommendations: {
                block: false,
                patterns: ["ytd-watch-next-secondary-results-renderer", "ytd-shelf-renderer"]
            },

            live_chat: {
                block: false,
                patterns: ["ytd-live-chat-frame"]
            },

            likes: {
                block: false,
                patterns: ["ytd-toggle-button-renderer"]
            },

            views: {
                block: false,
                patterns: ["ytd-video-primary-info-renderer"]
            }
        }
    }
}

window.addEventListener("yt-navigate-start",youtube); 

function main(){
    generate_block_page();

    youtube();
}

function youtube() {
    if(!window.location.href.includes("youtube.com") || !settings.youtube.status) return;
    console.log("youtube");

    if(settings.youtube.block) 
        return block_page("detected YOUTUBE", "https://youtube.com/");
    
    if(window.location.href.includes("shorts"))
        return block_page("detected YOUTUBE SHORTS", "https://youtube.com/");

    if(settings.youtube.parts.shorts.block){
        const shorts=document.querySelectorAll(settings.youtube.parts.shorts.patterns.join(","));
        if(shorts) 
            shorts.forEach(e=>e.style.display="none");
    }
}


function url_contains(text_list){
    let current_url=window.location.href
    text_list.forEach(element=>{
        if(current_url.includes(element))
            block_page("detected: '"+element+"'");
    });
}

function content_contains(text_list){
    let content=document.getElementsByTagName("body").textContent

    text_list.forEach(e => {
        if(content.includes(e)) block_page("detected: '"+e+"'")
    });
}


document.addEventListener('DOMContentLoaded', function() {
    console.log('The DOM has been fully loaded');

});
window.addEventListener('popstate', function() {
    // Handle the navigation event
    console.log('Navigated to:', window.location.href);
    
    unblock_page();
});

main();