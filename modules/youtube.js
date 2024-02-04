function youtube(settings) {
    if(!window.location.href.includes(config.youtube.url)) return;
    console.log("[ MONK MODE ] youtube");

    youtubeElements(settings);
    youtubeHomepage(settings);
}

function youtubeHomepage(settings) {
    if(window.location.pathname!="/" || settings?.blockYoutube) return

    if (settings.blockRecommendations) {
        console.log("blocking recommendations");

        document.querySelector("body").style.overflow="hidden"
        document.querySelector("#primary").style.pointerEvents="none"
        document.querySelector("#primary").style.opacity="0"
    } else {
        document.querySelector("body").style.overflow="auto"
        document.querySelector("#primary").style.pointerEvents="initial"
        document.querySelector("#primary").style.opacity=1
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
}