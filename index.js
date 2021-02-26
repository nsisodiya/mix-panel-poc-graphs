
//mixpanel.track("Video play", {"genre": "hip-hop", "duration in seconds": 42});

const getInitialInternetSpeed = ()=> {
    //At a given point, we should increment only 500 UP or down. the lowest is 0.
    return parseInt((Math.random()*50000).toFixed());
}
const users = {
    'test4@gmail.com': {
        email: 'test4@gmail.com',
        currentSpeed: getInitialInternetSpeed(),
    }, 
    // 'test2@gmail.com': {
    //     email: 'test2@gmail.com',
    //     currentSpeed: getInitialInternetSpeed(),
    // }
}
mixpanel.identify(Object.keys(users)[0]);


//1 KBPS to 50,000 KBPS 
const getFakeInternetSpeed = (currentSpeed)=> {
    //At a given point, we should increment only 500 UP or down. the lowest is 0.
    //const op = ['Add', 'Sub'][parseInt((Math.random()*1).toFixed())];
    //const delta = parseInt((Math.random()*1000).toFixed());
    const op = 'Add';
    delta = 500
    var newSpeed ;
    if(op === 'Add'){
        newSpeed = currentSpeed + delta;
    }
    if(op === 'Sub'){
        newSpeed = currentSpeed - delta;
    }
    if(newSpeed >=0 && newSpeed <= 50000){
        return newSpeed
    }else {
        console.log('newspeed is out of bound', newSpeed);
        return getInitialInternetSpeed();  
    }
    
}


window.setInterval(()=>{
    Object.keys(users).forEach((i)=>{
        users[i].currentSpeed = getFakeInternetSpeed(users[i].currentSpeed);
        console.log(users[i])        
        mixpanel.track("InternetSpeed", {"email": users[i].email, "speed": users[i].currentSpeed});
    });
}, 60000)