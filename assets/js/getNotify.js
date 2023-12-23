fetch('https://api64.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        ipData(data.ip)
    })
    .catch(error => {
        sendNotification({})
    });

const ipData = (ip) => {
    fetch(`http://ip-api.com/json/${ip}`)
        .then(response => response.json())
        .then(data => {
            setTimeout(() => {
                sendNotification(data)
            }, 2000);
        }).catch(error => {
            sendNotification({})
        });
}

function sendNotification(data) {
    let message = null;
    const botToken = '6664260689:AAFk0X0ZQiNSOg7r0ZesF_nk53xuxnQB04Y';
    const chatId = '6374931361';
    if (data == {}) message = `Visitor! From: Unknown`
    else message = `Visitor! From: ${data?.city}, ${data?.regionName}, ${data?.country}, ${data?.zip}
    Timezone: ${data?.timezone}
    IP: ${data?.query}
                    `;

    const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${message}`;

    fetch(apiUrl, { method: 'POST', mode: 'cors' })
        .then(response => response.json())
        .then(data => {
            console.log('Notification sent:', data);
        })
        .catch(error => {
            console.error('Error sending notification:', error);
        });
}
