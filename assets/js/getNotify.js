// fetch('https://api64.ipify.org?format=json')
//     .then(response => response.json())
//     .then(data => {
//         // console.log(data);
//         ipData(data.ip)
//     })
//     .catch(error => {
//         sendNotification({city: "adfa"})
//     });

ipData();

function ipData(){
    API_KEY = '97037a14e83b484dab33c44fe66af460';
        fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}`,{
        mode: 'cors'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setTimeout(() => {
                sendNotification(data)

            }, 2000);
        }).catch(error => {
            sendNotification({})
        });
}

function sendNotification(data) {
    current_time = new Date();
    let message = null;
    const botToken = '6664260689:AAFk0X0ZQiNSOg7r0ZesF_nk53xuxnQB04Y';
    const chatId = '6374931361';
    if (data == {}) message = `Visitor! From: Unknown`
    else message = `Visitor! From: ${data?.city}, ${data?.state_prov}, ${data?.country_name}, ${data?.zipcode}
    Timezone: ${data?.time_zone.name}, At: ${CurrentDateAndTime()}

    IP: ${data?.ip}
                    `;

    const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${message}`;

    fetch(apiUrl, { method: 'POST', mode: 'cors' })
        .then(response => response.json())
        .then(data => {})
        .catch(error => {});
}


function CurrentDateAndTime(){
const currentDate = new Date();

const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();

const formattedCurrentDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;
const formattedCurrentTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

return `${formattedCurrentDate} ${formattedCurrentTime}`

}
