fetch('https://api64.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                console.log('Your public IP address:', data.ip);
            })
            .catch(error => {
                console.error('Error fetching IP address:', error);
            });

        
        fetch('http://ip-api.com/json/2402:e280:21c4:26:3fa:1832:70d0:d101')
            .then(response => response.json())
            .then(data => {
                console.log('Ip data', data);
                sendNotification(data)
            })
            .catch(error => {
                console.error('Error fetching IP address:', error);
            });

            // {
            //     "status": "success",
            //     "country": "India",
            //     "countryCode": "IN",
            //     "region": "KA",
            //     "regionName": "Karnataka",
            //     "city": "Bengaluru",
            //     "zip": "560002",
            //     "lat": 12.9634,
            //     "lon": 77.5855,
            //     "timezone": "Asia/Kolkata",
            //     "isp": "Tata Play Broadband Private Limited",
            //     "org": "QBB",
            //     "as": "AS134674 TATA PLAY BROADBAND PRIVATE LIMITED",
            //     "query": "2402:e280:21c4:26:3fa:1832:70d0:d101"
            // }

function sendNotification(data) {
    const botToken = '6664260689:AAFk0X0ZQiNSOg7r0ZesF_nk53xuxnQB04Y';
    const chatId = '6374931361';
    const message = `Visitor! From: ${data?.city}, ${data?.regionName}, ${data?.country}, ${data?.zip}
    
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

  sendNotification()
