const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', e => {
  console.log('logout');
  fetch('/auth/logout')
    .then(response => response.json())
    .then(data => {
      // Verificar si la sesión se destruyó correctamente antes de redirigir
      if (data.success) {
        window.location.href = '/login';
      } else {
        console.error('Error al destruir la sesión:', data.message);
        // Podrías mostrar un mensaje de error al usuario si lo deseas
      }
    })
    .catch(error => {
      const err = JSON.parse(error);
      console.log(err);
    });
});
