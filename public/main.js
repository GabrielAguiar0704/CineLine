const access_token = sessionStorage.getItem('Access_Token')
function Go2Create() {
    window.location.href = "/create"
};

async function LoadReviews() {
    await fetch('/cineline', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${access_token}`
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        data.forEach((review) => {
            const button = document.createElement("button");
            button.textContent = review.review_name;
            button.className = "review-button";
            button.onclick = () => {
                window.location.href = "/review/?id=" + review.review_id;
                // window.location.href = "/user/?id=" + review.user_id;
            }
            document.querySelector("#content").appendChild(button);
        })
        // document.querySelector('#content').innerHTML = reviews.review_name + reviews.review_content;
        console.log("fetch works");
    })
    .catch((err) => {
        console.log(err)
    })
}

window.onload = function() {
    LoadReviews();
    console.log("onload works")
}