const access_token = sessionStorage.getItem('Access_Token');
async function LoadReview() {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get("id");
    await fetch('/review', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${access_token}`
        },
        body: JSON.stringify({
            review_id: id
        })
    })
    .then(res => res.json())
    .then(data => {
        const review = data.review;
        document.querySelector('.title').innerHTML = review.review_name;
        document.querySelector('.content').innerHTML = review.review_content;
        document.querySelector('.author').innerHTML = "By: " + data.user;
    })
}

window.onload = function() {
    LoadReview();
}