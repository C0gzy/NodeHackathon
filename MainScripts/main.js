var AIresponse ;


document.querySelector('.input-box').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevents the default action (form submission, newline, etc.)
      // Your code here...
      const inputValue = document.querySelector('.input-box').value; // Get the value of the input box
      fetch(`/run-ai?input=${encodeURIComponent(inputValue)}`)
      .then(response => response.json())
      .then(data => {
        console.log(data.response[0].text.value);
          AIresponse = data.response[0].text.value;    
            DisplayAIResponse();
      })
    }
  });


function DisplayAIResponse(){

    document.getElementById("AIResponse").innerHTML = AIresponse;

}