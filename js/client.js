const socket = io('http://localhost:8000');
const form = document.getElementById('send-container')
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector('.container')
var audio = new Audio('chat.mp3')

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left') {
        audio.play();
    }

}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.Value;
    append(`you:${message}`, 'right')
    socket.emit('send', message);
    messageInput.Value = ''
})
const name = prompt('Enter your name to join');
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right')
})
socket.on('receive', data => {
    append(`${data.name}:${data.message}`, 'left')
    console.log(data.message)
})
socket.on('left', name => {
    append(`${name}:${data.message}`, 'left')
})