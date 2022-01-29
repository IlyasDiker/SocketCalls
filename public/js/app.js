const chatForm = document.querySelector('#chat-form');
const chatBox = document.querySelector('#chat-box-messages');
const usersBox = document.querySelector('#chat-box-header');
const messageTemplate = document.querySelector('#message-template');
const userTemplate = document.querySelector('#user-template');

const selfUser = {
    id: '',
    name: 'Guest',
}

let username = window.prompt("Enter a username");

selfUser.name = username;
const socket = io();

setTimeout(()=>{
    
    socket.on("connect", () => {
        console.log(socket.id);
        selfUser.id = socket.id;
    
        socket.emit("userJoined", selfUser);
    });
    
    socket.on('message', (message)=>{
        console.log('%capp.js line:4 message', 'color: #007acc;', message);
    })
    
    socket.on('userJoined', (user)=>{
        console.log(user);
        let userContainer = userTemplate.content.cloneNode(true);
        console.log(userContainer.querySelector('#user-bubble'));
        userContainer.querySelector('#user-bubble').innerHTML = user.name;
        console.log(usersBox);
        usersBox.prepend(userContainer);
    })
    
    socket.on('chatMessage', (data)=>{
        let msgContainer = messageTemplate.content.cloneNode(true);
        msgContainer.querySelector('#msg-value').textContent = data;
        chatBox.prepend(msgContainer);
    })
    
    chatForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        let input = e.target.elements.msg;
        let msg = input.value;
        input.value = '';
    
        socket.emit('chatMessage', msg);
    })

})

