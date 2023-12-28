//var URL;

function request() {
    
    var URL = document.getElementById("url-input").value

    stats(URL)
    //compress(URL)
    //meta(URL)
    
}

function stats(URL){
    
    var requestStats = `http://127.0.0.1:8080/stats?url=${encodeURIComponent(URL)}`

    var request = new XMLHttpRequest()
    request.open("GET", requestStats)
    request.onload = () => {
        var response = JSON.parse(request.responseText) 
        document.querySelector("#size_out").querySelector("span").innerText = response.InternalSiteSize

        //document.querySelector("#current_meta_out").querySelector("span").innerText = response.FetchMeta.description
        
        //document.querySelector("#validator_out").querySelector("span").innerText = response.Validator
        //renderValidatorToHtml("#validator_out")

        document.querySelector("#sitemap_out").querySelector("span").innerText = response.FetchSitemapLinks

        //document.querySelector("#current_og_meta_out").querySelector("span").innerText = response.FetchMetaOG
        
        /*document.querySelector("#import_sizes_out").querySelector("span").innerText = response.FetchImportSizes.CSSSize
        document.querySelector("#import_sizes_out").querySelector("span").innerText = response.FetchImportSizes.IFRAMESize*/
        document.querySelector("#import_sizes_out").querySelector("span").innerText = response.FetchImportSizes.IMAGESize
//        document.querySelector("#import_sizes_out").querySelector("span").innerText = response.FetchImportSizes.JSSize*/

        document.querySelector("#request_speed_out").querySelector("span").innerText = response.RequestSpeed
    
        document.querySelector("#domain_out").querySelector("span").innerText = response.Whois.domain
 
        document.querySelector("#favicon_out").querySelector("span").innerText = response.Whois.favicon
    
        document.querySelector("#current_title_out").querySelector("span").innerText = response.Whois.title

    
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
    
    }
    
    request.send()

    //interpretMessage(message);

}

function compress(URL){
    var requestStats = `http://127.0.0.1:8080/compress?url=${encodeURIComponent(URL)}`

    var request = new XMLHttpRequest()
    request.open("GET", requestStats)
    request.onload = () => {
        var response = JSON.parse(request.responseText) 

        document.querySelector("#compressed_html_out").querySelector("textarea").innerText = response.FetchSitemapLinks

}

function meta(URL){


}


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