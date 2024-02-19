const form = document.getElementById('loginForm')

form.addEventListener('submit', e => {
    e.preventDefault()

    const data = new FormData(form)

    const obj = {}

    data.forEach((value, key) => (obj[key] = value))

    fetch('/auth', {
        headers: {
            'Content-Type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify(obj)
    })
    .then(res => {
        if (res.redirected) {
            window.location.href = res.url;
        } else {
            return res.json();
        }
    })
    .then(data => {
        if (data.redirect) {
            window.location.href = data.redirect;
        } else {
            console.log(data);
        }
    })
    .catch(err => console.log(err))
});
