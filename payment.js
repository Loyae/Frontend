const urlParams = new URLSearchParams(window.location.search);
const amount = urlParams.get('amount');

redirect = "https://api.loyae.com/checkout/checkout.html?amount="+amount;
document.getElementById("link").href = redirect;
window.location.href = redirect;

/*
document.getElementById('amount').textContent = "$"+amount;



if(amount == 0){
    window.alert("Amount: $0; Go back to the plugin and select the pages to optimize.")
}


fetch("https://api.loyae.com/logquery?log="+"Payment page $"+amount)




document.getElementById('paymentForm').addEventListener('submit', function(event) {
event.preventDefault();
var formData = new FormData(document.getElementById('paymentForm'));



fetch("https://api.loyae.com/logquery?log=pressed pay")


var apiUrl = 'https://api.loyae.com/optimize/fund?'+
    "email="+ encodeURIComponent(formData.get('email')) +
    "&fname="+ encodeURIComponent(formData.get('fname')) +
    "&lname="+ encodeURIComponent(formData.get('lname')) +
    "&number="+ encodeURIComponent(formData.get('cardnumber')) +
    "&cvc="+ encodeURIComponent(formData.get('cvc')) +
    "&expm="+ encodeURIComponent(formData.get('expmonth')) +
    "&expy="+ encodeURIComponent(formData.get('expyear')) +
    "&amount="+ encodeURIComponent(amount) +
    "&discount=NONE"+
    "&address="+ encodeURIComponent(formData.get('adr')) +
    "&city="+ encodeURIComponent(formData.get('city')) +
    "&state="+ encodeURIComponent(formData.get('state')) +
    "&zip="+ encodeURIComponent(formData.get('zip')) +
    "&country="+encodeURIComponent(formData.get('country'))


    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        if (data.Err === false) {
            document.getElementById('code').textContent = data.Code;
        } else {
            alert('Error: ' + data.Message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});






 function copyText() {
        // Get the text from the span
        var codeText = document.getElementById("code").innerText;

        // Create a temporary input element
        var tempInput = document.createElement("input");
        tempInput.value = codeText;

        // Append the input element to the body
        document.body.appendChild(tempInput);

        // Select the text in the input element
        tempInput.select();
        tempInput.setSelectionRange(0, 99999);

        // Copy the selected text
        document.execCommand("copy");

        // Remove the temporary input element
        document.body.removeChild(tempInput);

        if(codeText == "_ _ _ _ _ _"){
        alert("You have not paid yet; no code copied.");
        } else {
          alert("Copied Code: " + codeText);
        }
    }

    // Add an event listener to the copy button
    document.getElementById("copyButton").addEventListener("click", copyText);
    */
