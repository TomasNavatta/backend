const socket = io()

const chatbox = document.getElementById('chatbox')
const chatContainer = document.getElementById('chatContainer')

const getUser = async () =>{
    try {
        const user = await Swal.fire({
            title: "Enter your name",
            input: 'text',
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
            }
          });

          socket.emit('newUser',  user.value)

          socket.on('userConnected', user => {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: `${user} se conecto`
              });
          })
          

          chatbox.addEventListener('keyup', async (e) => {
            if (e.key === 'Enter') {
                const data = {
                    message: chatbox.value,
                    user: user.value
                };
        
                chatbox.value = '';
                socket.emit('messages', data);
        
                // fetch ma enviar los msj del chat a la base de datos
                try {
                    await fetch('/api/messages', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        
                        body: JSON.stringify(data)
                        
                    });
                    console.log('data:',data);
                } catch (error) {
                    console.error('Error al enviar el mensaje al servidor:', error);
                }
            }
        });
    } catch (error) {
        console.log(error);
    }
    
}

getUser()



socket.on('messagesLogs', data =>{
    let messages = ''
    data.forEach(chat => ( 
        messages += `${chat.user}: ${chat.message} <br>`
    ));

    chatContainer.innerHTML = messages
})




