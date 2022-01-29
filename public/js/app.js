const chatForm = document.querySelector('#chat-form');
const chatBox = document.querySelector('#chat-box-messages');
const messageTemplate = document.querySelector('#message-template');

const socket = io();

socket.on('message', (message)=>{
    console.log('%capp.js line:4 message', 'color: #007acc;', message);
})

socket.on('chatMessage', (data)=>{
    console.log('%capp.js line:10 data', 'color: #007acc;', data);

    let msgContainer = messageTemplate.content.cloneNode(true);
    console.log(msgContainer.querySelector('#msg-value'));
    msgContainer.querySelector('#msg-value').textContent = data;
    chatBox.prepend(msgContainer);
})

chatForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    let input = e.target.elements.msg
    let msg = input.value;
    input.value = '';

    

    socket.emit('chatMessage', msg);
})