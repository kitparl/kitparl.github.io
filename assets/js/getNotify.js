fetch('https://ipapi.co/json/')
    .then(response => response.json())
    .then(data => {
        console.log(33, data);
        sendNotification(1,data);
    })
    .catch(error => {
        if(error){
        try {
            ipData();
        } catch(error) {
            sendNotification(3,{});
        }
    }
    });

function ipData(){
    API_KEY = '97037a14e83b484dab33c44fe66af460';
        fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}`,{
        mode: 'cors'
    })
        .then(response => response.json())
        .then(data => {
                sendNotification(2,data)
        }).catch(error => {
            sendNotification({})
        });
}

function sendNotification(type, data) {
    console.log("dfasdft",type);
    current_time = new Date();
    let message = null;
    const botToken = '6664260689:AAFk0X0ZQiNSOg7r0ZesF_nk53xuxnQB04Y';
    const chatId = '6374931361';

    if(type == 1){
        message = `Visitor! From: ${data?.city}, ${data?.region}, ${data?.country_name}, ${data?.postal}
        Timezone: ${data?.timezone}, At: ${CurrentDateAndTime()} IP: ${data?.ip}`
    }else if(type == 2){
        message = `Visitor! From: ${data?.city}, ${data?.state_prov}, ${data?.country_name}, ${data?.zipcode}
        Timezone: ${data?.time_zone.name}, At: ${CurrentDateAndTime()}
    
        IP: ${data?.ip}
                        `;
    }
    else{
            message = `Visitor! From: Unknown`
    }

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
