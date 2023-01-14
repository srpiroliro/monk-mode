console.log("[ MONK-MODE LOADED ]");

var YOUTUBE=true;

window.addEventListener("yt-navigate-start",youtube); 

function main(){
    youtube();
}

function youtube() {
    console.log("UPDATED: "+window.location.href);
    console.log("YOUTUBE: "+YOUTUBE);
    console.log("HREF: "+window.location.href.includes("youtube"))
    
    if(!YOUTUBE || !window.location.href.includes("youtube")) {
        console.log("returned")
        return
    }

    // no the most optimized solution due to being executed each time.
    let shorts=document.querySelector('[is-shorts=""]');
    if(shorts) shorts.style.display="none";

    console.log("includes shorts: "+window.location.href.includes("shorts"));
    if(window.location.href.includes("shorts")){
        // history.back()
        block_page("detected YOUTUBE SHORTS");
    }
}

function block_page(msg=""){
    css_style="body{display:flex;justify-content:center;align-items:center;height:95vh;font-size:2em;} *{font-family: 'Courier New', 'Monaco', monospace;background-color: #000000; color:white;}";
    html_msg="<style>"+css_style+"</style><body><div style='text-align:center;'><h1>BLOCKED</h1><b>STOP THE PROCRASTINATION</b><br><br><p>"+msg+"</p><br>go to <a href='https://youtube.com/'>youtube.com</a></div></body>";
    
    document.documentElement.innerHTML="";
    document.documentElement.innerHTML=html_msg;
    document.documentElement.scrollTop=0;
}


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

main();