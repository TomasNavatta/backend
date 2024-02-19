const form = document.getElementById('signupform');
const errorMessage = document.getElementById('error-message');

errorMessage.style.display = 'none';

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const obj = {};

    data.forEach((value, key) => (obj[key] = value));

    const fetchParams = {
        url: '/users',
        headers: {
            'Content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(obj),
    };

    try {
        const response = await fetch(fetchParams.url, {
            headers: fetchParams.headers,
            method: fetchParams.method,
            body: fetchParams.body,
        });

        const result = await response.json();
        if (response.ok) {
            window.location.href = '/login';
        } else if (response.status === 400 && result.error === 'Email already exists') {
            errorMessage.textContent = 'Este correo electrónico ya está registrado';
            errorMessage.style.display = 'block'; 
        } else {
            errorMessage.textContent = 'Error al intentar registrarse';
            errorMessage.style.display = 'block'; 
        }
    } catch (error) {
        console.log(error);
    }
});

