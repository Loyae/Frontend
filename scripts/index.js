function landingRequest() {
    var landingURLInput = document.getElementById("landing-url-input").value;
    if(landingURLInput == ""){
        document.getElementById("no-url-error").innerText = "Please enter a URL";
        
    } else {
        //sessionStorage.setItem("landingURLInput", landingURLInput);
        //window.alert(landingURLInput)
        window.location.href = "https://app.loyae.com/diagnose?url=" + landingURLInput;
    }
}