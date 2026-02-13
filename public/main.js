function Go2Create() {
    window.location.href = "/create"
};

async function LoadReviews() {
    await fetch('/cineline', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        data.forEach((review) => {
            const button = document.createElement("button");
            button.textContent = review.review_name;
            button.onclick = () => {
                window.location.href = "/user/?id=" + review.user_id;
            }
            document.querySelector("#content").appendChild(button);
        })
        // document.querySelector('#content').innerHTML = reviews.review_name + reviews.review_content;
        console.log("fetch works");
    })
}

window.onload = function() {
    LoadReviews();
    console.log("onload works")
}