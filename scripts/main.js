var URL = "";
var APIURL = "http://127.0.0.1:8080";



function request() {
    
    
    URL = document.getElementById("url-input").value

    stats();
    //compress(URL);
    meta();
    validator();


    
}

function landingRequest() {
    //window.alert("yes") 
    URL = document.getElementById("landing-url-input").value
    window.location("pages/dashboard.html");
    
   
    stats(URL);
    //compress(URL);
    meta(URL);
    validator(URL);
}
/*
function gauge(id, num){
    document.getElementById(id).querySelector(".cover-degree").style= "transform: rotate(" + num.toString() + "deg) translate3d(0, 0, 0)"
}*/


function stats(){
    //URL = document.getElementById("url-input").value

    /*URL.addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
          event.preventDefault();
          document.getElementById("launch-button").click();
        }
      });*/
    
    var requestStats = APIURL +`/stats?url=${encodeURIComponent(URL)}`

    var request = new XMLHttpRequest()
    request.open("GET", requestStats)
    request.onload = () => {
        var response = JSON.parse(request.responseText) 
        document.querySelector("#size_out").querySelector("span").innerText = response.InternalSiteSize + " KB"
        //gauge("size_out", 40)

        document.querySelector("#current_meta_out").querySelector(".output").querySelector("span").innerText = response.FetchMeta.description
        
        //document.querySelector("#validator_out").querySelector("span").innerText = response.Validator
        //renderValidatorToHtml("#validator_out")

        //document.querySelector("#sitemap_out").querySelector("span").innerText = response.FetchSitemapLinks

        document.querySelector("#current_og_meta_out").querySelector("span").innerText = response.FetchMetaOG.description
        
        /*document.querySelector("#import_sizes_out").querySelector("span").innerText = response.FetchImportSizes.CSSSize
        document.querySelector("#import_sizes_out").querySelector("span").innerText = response.FetchImportSizes.IFRAMESize*/
        document.querySelector("#import_sizes_out").querySelector("span").innerText = response.FetchImportSizes.IMAGESize + " KB"
//        document.querySelector("#import_sizes_out").querySelector("span").innerText = response.FetchImportSizes.JSSize*/

        document.querySelector("#request_speed_out").querySelector("span").innerText = response.RequestSpeed
    
        document.querySelector("#domain_out").querySelector("span").innerText = response.Whois.domain
 
        //document.querySelector("#favicon_out").querySelector("span").innerText = response.Whois.favicon
        document.getElementById("favicon_out").src=response.Whois.favicon
        document.querySelector("#current_title_out").querySelector("span").innerText = response.Whois.title

        document.querySelector("#current_title_out").querySelector("span").querySelector("span").innerText = ", 202"


  

        



        

    /*
        var OGMetaTags = [  "keywords",
		                    "description",
		                    "title",
		                    "url",
		                    "site_name",
                            "image"];

        var metaTags = [    "keywords",
                            "description",
                            "subject",
                            "viewport",
                            "copyright",
                            "language",
                            "robots",
                            "revised",
                            "abstract",
                            "topic",
                            "summary",
                            "Classification",
                            "author",
                            "designer",
                            "copyright",
                            "reply-to",
                            "owner",
                            "url",
                            "identifier-URL",
                            "directory",
                            "category",
                            "coverage",
                            "distribution",
                            "rating",
                            "revisit-after"];

        for(i = 0; i < OGMetaTags.length; i++){
            document.querySelector("#current_og_meta_out").querySelector("span").innerText = response.FetchMetaOG.OGMetaTags[i]
        }

        for(i = 0; i < metaTags.length; i++){
            document.querySelector("#current_meta_out").querySelector("span").innerText = response.FetchMeta.MetaTags[i]
        }
    */
    }
    
    request.send();

    //interpretMessage(message);

}


function compress(){
    var requestCompress = APIURL + `/compress?url=${encodeURIComponent(URL)}`

    var request = new XMLHttpRequest()
    request.open("GET", requestCompress)
    request.onload = () => {
        var response = JSON.parse(request.responseText) 

        document.querySelector("#compressed_html_out").querySelector("textarea").innerText = response.CompressedHTML
        document.querySelector("#compressed_reduction").innerText = response.Reduction

}
request.send();
}


function meta(){
    var requestGeneratedMeta = APIURL +`/meta?url=${encodeURIComponent(URL)}`

    var request = new XMLHttpRequest()
    request.open("GET", requestGeneratedMeta)
    request.onload = () => {
        var response = JSON.parse(request.responseText) 

        document.querySelector("#generated_meta_description").querySelector(".output").querySelector("textarea").innerText = response.GeneratedMetaDescription;

        /*var GeneratedMetaKeywordsResponse
        for(i = 0; i < 10; i++ ){
            GeneratedMetaKeywordsResponse += response.GeneratedMetaKeywords[i][0];
        }*/
        document.querySelector("#generated_meta_keywords").querySelector(".output").querySelector("textarea").innerText = response.GeneratedMetaKeywords;
        

   
    }
    
    request.send();

    

}

function validator(){

    var requestValidator = APIURL +`/validator?url=${encodeURIComponent(URL)}`

    var request = new XMLHttpRequest()
    request.open("GET", requestValidator)
    request.onload = () => {
        var response = JSON.parse(request.responseText) 

        document.getElementById('validator_out').innerHTML = response.validatorHTML;
        

    }
    
    request.send();

    
    
}

/*
function renderValidatorToHtml(id) {
    var str = document.getElementById(id).innerHTML;
   
    var res = str
              .replace(/&amp;/g, '&')
              .replace(/&quot;/g, '\"')
              .replace(/&#39;/g, '\'')
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>');
   
   
    document.getElementById(id).innerHTML = res;
  }

  */