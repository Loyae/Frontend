var URL = "";
var APIURL = "https://bouncy-party-production.up.railway.app";//"http://localhost:8080";
//https://ancient-thicket-11529.herokuapp.com

var invalidURL = false;

function gauge(id, num){
    document.getElementById(id).querySelector(".gauge").style= "opacity: 0." + (num.toString() + 10) + ";"
    document.getElementById(id).querySelector(".gauge .fill").style= "width: " + num.toString() + "%;"
}


if(sessionStorage.getItem("landingURLInput") != ""){
    URL = sessionStorage.getItem("landingURLInput");
    stats();
    meta();
    validator();
    //delete storage
    sessionStorage.removeItem("landingURLInput")

    //window.alert(sessionStorage.getItem("landingURLInput"))
}

function request() {
    
    
    URL = document.getElementById("url-input").value

    stats();
    //compress(URL);
    meta();
    validator();

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

    var OGMetaTags = [  "keywords",
		                "description",
		                "title",
		                "url",
		                "site_name",
                        "image"];
    //var currentMeta = ":";
    

    var requestStats = APIURL +`/stats?url=${encodeURIComponent(URL)}`

    var request = new XMLHttpRequest()
    request.open("GET", requestStats)
    request.onload = () => {
        var response = JSON.parse(request.responseText) 

        if(response.Err == true && invalidURL == false){
            window.alert("Invalid URL")
            invalidURL = true
            return
        }

        document.querySelector("#size_out").querySelector(".output").querySelector("span").innerText = response.InternalSiteSize + " MB"
        //gauge("size_out", 40)

        document.querySelector("#current_meta_out").querySelector(".output").querySelector("span").innerHTML = 
        "<b>Description: </b> " + response.FetchMeta.description + "<br/>" +
        "<b>Keywords: </b>" + response.FetchMeta.keywords + "<br/>" +
        "<b>ViewPort: </b>" + response.FetchMeta.viewport + "<br/>" +
        "<b>Robots: </b>" + response.FetchMeta.robots

        
        if(response.FetchMeta.description != null){
            //window.alert("test")
            gauge(`current_meta_out`, 50)
            if(response.FetchMeta.keywords != null){
                gauge(`current_meta_out`, 98)
            }
        }
        

       
        
        //document.querySelector("#validator_out").querySelector("span").innerText = response.Validator
        //renderValidatorToHtml("#validator_out")

        //document.querySelector("#sitemap_out").querySelector("span").innerText = response.FetchSitemapLinks

//document.querySelector("#current_og_meta_out").querySelector("span").innerText = response.FetchMetaOG.description

//for(i = 0; i < OGMetaTags.length; i++){
            //OGMetaTagsHTML = OGMetaTags[0] + ": " + response.FetchMetaOG.OGMetaTags[0] + "\n";
            
        //}

document.querySelector("#current_og_meta_out").querySelector(".output").innerHTML = "<b>Description: </b>" + response.FetchMetaOG.description + "<br/><b>Keywords: </b>" + response.FetchMetaOG.keywords + "<br/><b>Title: </b>" + response.FetchMetaOG.title + `<br/><b>OG Meta Image: </b> <img src=\"` + response.FetchMetaOG.image + `\"` + `/>`;

if(response.FetchMetaOG.description != null){
    //window.alert("test")
    gauge(`current_og_meta_out`, 10)
    if(response.FetchMetaOG.keywords != null){
        gauge(`current_og_meta_out`, 20)
        if(response.FetchMetaOG.title != null){
            gauge(`current_og_meta_out`, 50)
            if(response.FetchMetaOG.image != null){
                gauge(`current_og_meta_out`, 98)
            }
        }
    }
}

        
        /*document.querySelector("#import_sizes_out").querySelector("span").innerText = response.FetchImportSizes.CSSSize
        document.querySelector("#import_sizes_out").querySelector("span").innerText = response.FetchImportSizes.IFRAMESize*/
        document.querySelector("#import_sizes_out").querySelector(".output").querySelector("span").innerHTML = "<b>Image Size: </b>" + response.FetchImportSizes.IMAGESize + " KB <br/>" + "<b>CSS Size: </b>" + response.FetchImportSizes.CSSSize + " KB <br/>" + "<b>JavaScript Size </b>" + response.FetchImportSizes.JSSize + " KB <br/>" + "<b>Iframe Size </b>" + response.FetchImportSizes.IFRAMESize + "KB"

        totalImportSize = Number(response.FetchImportSizes.IMAGESize) + Number(response.FetchImportSizes.CSSSize) + Number(response.FetchImportSizes.JSSize) + Number(response.FetchImportSizes.IFRAMESize)
        //window.alert(totalImportSize)
        gauge(`import_sizes_out`, ceil(totalImportSize / 4))
        /*document.querySelector("#import_sizes_out").querySelector("span").innerText = response.FetchImportSizes.JSSize*/

        document.querySelector("#request_speed_out").querySelector(".output").querySelector("span").innerText = response.RequestSpeed + " Nanoseconds?"
    
        document.querySelector("#domain_out").querySelector("span").innerText = response.Whois.domain
 
        //document.querySelector("#favicon_out").querySelector("span").innerText = response.Whois.favicon
        document.getElementById("favicon_out").src=response.Whois.favicon
        document.querySelector("#current_title_out").querySelector("span").innerHTML = response.Whois.title + "<span style=\"color: green\">, 202</span>"

        //document.querySelector("#current_title_out").querySelector("span").querySelector("span").innerText = 



        document.querySelector("#current_alt_out").querySelector(".output").innerHTML = `
        <table style="width:80%; font-size: 10px">
        <tr>
          <th>Image</th>
          <th>Alt Data</th>
        </tr>

        <tr>
          <td><img src="` + response.FetchAlt[0][0] + `" height="40"/></td>
          <td>` + response.FetchAlt[0][2] + `</td>
        </tr>

        <tr>
        <td><img src="` + response.FetchAlt[1][0] + `" height="40"/></td>
        <td>` + response.FetchAlt[1][2] + `</td>
        </tr>

        <tr>
        <td><img src="` + response.FetchAlt[2][0] + `" height="40"/></td>
        <td>` + response.FetchAlt[2][2] + `</td>
        </tr>

        <tr>
        <td><img src="` + response.FetchAlt[3][0] + `" height="40"/></td>
        <td>` + response.FetchAlt[3][2] + `</td>
        </tr>

        <tr>
        <td><img src="` + response.FetchAlt[4][0] + `" height="40"/></td>
        <td>` + response.FetchAlt[4][2] + `</td>
        </tr>
      </table>`
  
        //src
        //response.FetchAlt[i][1] //href
        //alt

        
        
        


        

        

    /*
        

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

        

        for(i = 0; i < metaTags.length; i++){
            document.querySelector("#current_meta_out").querySelector("span").innerText = response.FetchMeta.MetaTags[i]
        }
    */
    }
    
    request.send();

    //interpretMessage(message);

}

function download(url, filename) {
    fetch(url).then(function(t) {
        return t.blob().then((b)=>{
            var a = document.createElement("a");
            a.href = URL.createObjectURL(b);
            a.setAttribute("download", filename);
            a.click();
        }
        );
    });
    }


    // function download(url, filename) {
    //     fetch(url).then(function(t) {
    //         return t.blob().then((b)=>{
    //             var a = document.createElement("a");
    //             a.href = URL.createObjectURL(b);
    //             a.setAttribute("download", filename);
    //             a.click();
    //         }
    //         );
    //     });
    //     }

function compress(){





    var requestCompress = APIURL + `/compress?url=${encodeURIComponent(URL)}`

   // download(requestCompress,"cc.html")

   


    reduction = 5

    var request = new XMLHttpRequest()
    request.open("GET", requestCompress)
    request.onload = () => {
        var response = JSON.parse(request.responseText) 

        if(response.Err == true && invalidURL == false){
            window.alert("Invalid URL")
            invalidURL = true
            return
        }

        reduction = response.Reduction
        
        var tab = window.open('about:blank', '_blank');
        tab.document.write(response.CompressedHTML); // where 'html' is a variable containing your HTML
        tab.document.close(); // to finish loading the page


        document.querySelector("#compressed_reduction").innerText = reduction

}
request.send();

if(reduction > 100){ reduction = 100}

gauge(`compression`, Number(reduction))
}


function meta(){
    var requestGeneratedMeta = APIURL +`/meta?url=${encodeURIComponent(URL)}`

    var request = new XMLHttpRequest()
    request.open("GET", requestGeneratedMeta)
    request.onload = () => {
        var response = JSON.parse(request.responseText) 

        if(response.Err == true && invalidURL == false){
            window.alert("Invalid URL")
            invalidURL = true
            return
        }

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

        if(response.Err == true && invalidURL == false){
            window.alert("Invalid URL")
            invalidURL = true
            return
        }

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



 function copyToClipboard(id) {
    var copyText = document.getElementById(id).querySelector(".output").querySelector("textarea")
    copyText.select();
    copyText.setSelectionRange(0, 99999); 
    document.execCommand("copy");
    alert("Copied!: " + copyText.value);
}