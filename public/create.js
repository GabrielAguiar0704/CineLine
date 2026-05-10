function Create() {
    const access_token = sessionStorage.getItem('Access_Token');
    const title = document.querySelector('#title').value;
    const type = document.querySelector('#type').value;
    const genre = document.querySelector('#genre').value;
    const content = document.querySelector('#content').textContent;
    const userid = sessionStorage.getItem('Id');
    console.log("Título: "+title, "\nTipo: "+type, "\nGênero: "+genre, "\n"+type, ": "+content);

    if (title !== '') {
        fetch('/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${access_token}`
            },
            body: JSON.stringify({
                title: title,
                type: type,
                genre: genre,
                content: content,
                user_id: userid
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.success == true){
                window.location.href = "/cineline"
            }
        })
        .catch((err) => console.error(err));
    }
    else {
        alert("Por favor, insira o nome da obra como título.");
    }
}