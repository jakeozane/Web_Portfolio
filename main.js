document.addEventListener('DOMContentLoaded', bindEmail);

function bindEmail() {
    document.getElementById('emailSubmit').addEventListener('click', function(event) {
    let req = new XMLHttpRequest();
    let payload = {
        email: null
    };
    payload.email = document.getElementById('email').value;
    req.open('POST', 'https://reqbin.com/echo/post/json', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function(){
        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            document.getElementById('email').textContent = response.email;
            console.log(JSON.parse(req.responseText));
        } else {
            console.log('Error in network request: ' + req.status);
        }
    });
    req.send(JSON.stringify(payload));
    event.preventDefault();
    });
}