var YOUTUBE_SHORTS=true;
console.log("[ MONK-MODE LOADED ]");

// made for youtube.
window.addEventListener("yt-navigate-start",function(event){
    if(YOUTUBE_SHORTS)
        disable_shorts();
})



function disable_shorts() {
    document.querySelector('[is-shorts=""]').style.display = 'none';
    if(window.location.href.includes("shorts"))
        // history.back()
        block_page("detected YOUTUBE SHORTS")
}

function url_contains(text_list){
    let current_url=window.location.href
    text_list.forEach(element=>{
        if(current_url.includes(element))
            block_page("detected: "+element);
    });
}

function content_contains(text_list){}


function block_page(msg=""){
    css_style="display:flex;justify-content:center;align-items:center;height:100vh"
    document.documentElement.innerHTML="";
    document.documentElement.innerHTML="<body style='"+css_style+"'><div><h1>BLOCKED</h1><br><p>"+msg+"</p></div></body>";
    document.documentElement.scrollTop=0;
}