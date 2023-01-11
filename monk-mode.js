window.addEventListener('locationchange', function () {
    console.log('location changed!');
    console.log(window.location.href)
    document.body.style.border = "5px solid red";
    console.log("helloworld")

    if(window.location.href.includes("/shorts/")){
        console.log("got back")
        window.history.back();
        console.log("new url: "+window.location.href)
    }
});