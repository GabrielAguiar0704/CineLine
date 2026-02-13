function Signup() {
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const name = document.querySelector("#name").value;
    const mail = document.querySelector("#email").value;

    if (!username || !password || !name || !mail) {
        alert("Preencha todos os campos!");
        return;
    }
    console.log(username, password, name, mail);

    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password,
            name: name,
            mail: mail
        })
    })
        .then(res => res.json())
    .then(data => {
        if(data.success == true){
            sessionStorage.setItem('User', username);
            window.location.href = "/"
        }
    })
    .catch((err) => console.error(err));
};