function Login() {
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    if (!username || !password) {
        alert("Preencha todos os campos!");
        return;
    }

    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(res => res.json())
    .then(data => {
        if(data.success == true){
            sessionStorage.setItem('User', username);
            window.location.href = "/cineline"
        }
        if(data.success == false){
            alert("Dados incorretos")
        }
    })
    .catch((err) => console.error(err));
};