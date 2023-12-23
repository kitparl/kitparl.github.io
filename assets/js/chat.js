const ChatKeyIdent = JSON.parse(sessionStorage.getItem('ChatKeyIdent'));
const botToken = '6403083388:AAGZ4EJg9pziA20A9b5euueooH4_GxGGM58';
const chatId = '6374931361'; // Replace with the chat ID where you want to send messages
const messagesDiv = document.getElementById('messages');
let latestUpdateId = 0;

function sendMessage() {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value;

  fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: `${ChatKeyIdent}--> ${message}`,
    }),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Message sent:', data);
    messagesDiv.innerHTML += `<div><strong>You:</strong> ${message}</div>`;
    messageInput.value = '';
    checkForNewMessages();
  })
  .catch(error => {
    console.error('Error sending message:', error);
  });
}

function checkForNewMessages() {
  fetch(`https://api.telegram.org/bot${botToken}/getUpdates?offset=${latestUpdateId + 1}`)
  .then(response => response.json())
  .then(data => {
    data.result.forEach(update => {
      const text = update.message.text;
      const sender = update.message.from.username || 'Anonymous';
      messagesDiv.innerHTML += `<div><strong>Pranshu:</strong> ${text}</div>`;
      latestUpdateId = update.update_id;
    });
  })
  .catch(error => {
    console.error('Error checking for updates:', error);
  });
}

setInterval(checkForNewMessages, 5000);