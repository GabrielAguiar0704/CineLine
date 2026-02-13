function Create() {
    const title = document.querySelector('#title').value;
    const type = document.querySelector('#type').value;
    const genre = document.querySelector('#genre').value;
    const content = document.querySelector('#content').value;
    console.log("Título: "+title, "\nTipo: "+type, "\nGênero: "+genre, "\n"+type, ": "+content);

    fetch('/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            type: type,
            genre: genre,
            content: content
        })
    })
    .catch((err) => console.error(err));
}