var fridayEl = document.querySelector('.friday')
var saturdayEl = document.querySelector('.saturday')
var sundayEl = document.querySelector('.sunday')
var addEventEl = document.querySelector("#addEvent")
var eventEl = document.querySelector('.event')
var tripEl = document.querySelector('.trip')
var tripData = []
tripData.push(document.querySelector('#day'))
tripData.push(document.querySelector('#time'))
tripData.push(document.querySelector('#dayNight'))
tripData.push(document.querySelector('#description'))

var weekend = [];
var dataCount = [0, 0, 0];
var limit = 10;
var user={
    time:"",
    dayNight:"",
    description:""
};

function saveEvent(event){
    event.preventDefault();
    var whichOne= 0;
    var index=0;
    
    whichOne = counter(tripData[0].value)
    index = updateData(whichOne);
    localStorage.removeItem('weekend');
    localStorage.setItem('weekend', JSON.stringify(weekend));

    turnOffForm();
    orderData();
    console.log(weekend);
}

function updateData(length){
    //if we reach our limit on reminders and users want to add a new reminder than we
    //replace the first reminder made with the new one
    if(dataCount[length] >= limit){
        for(var i=0; i<weekend.length; i++){
            if(tripData[0].value === weekend[i].day){
                if(weekend[i].next){
                    weekend[i] = {
                        day:tripData[0].value,
                        time:tripData[1].value, 
                        dayNight:tripData[2].value,
                        description:tripData[3].value,
                        next:false
                    }
                    if( (i+1) > weekend.length){
                        weekend[0].next=true;
                        return i;
                    }
                    else{
                        weekend[(i+1)].next=true;
                        return i;
                    }
                }
            }
        }
    }
    //if this is the first event for a certain day on our planner
    else if(dataCount[length] === 1){
        weekend.push(
            {day:tripData[0].value,
            time:tripData[1].value, 
            dayNight:tripData[2].value,
            description:tripData[3].value,
            next:true}
        );
        return weekend.length-1;
    }
    //if we are just adding in a new event
    else{
        weekend.push({
            day:tripData[0].value,
            time:tripData[1].value, 
            dayNight:tripData[2].value,
            description:tripData[3].value,
            next:false
        });
        return weekend.length-1;
    }
}

function counter (day){
    if(day === 'friday'){
        dataCount[0]++;
        return 0;
    }
    else if(day === 'saturday'){
        dataCount[1]++;
        return 1;
    }
    else{
        dataCount[2]++;
        return 2;
    }
}

function cancelSave(event){
    var element=event.target;
    if(element.matches('button')){
        if(Number(element.getAttribute('data-store')) === 0){
            turnOffForm();
        }
    }
}

function turnOffForm(){
    eventEl.classList.add('invisible');
    addEventEl.disable=false;
}
function turnOnForm(){
    //
    eventEl.classList.remove('invisible');
    addEventEl.disable=true;
}

function displayEvent(data, order){
    var day = document.querySelector('.'+data[0].day);
    day.textContent= '';
    
    for(var i=0; i<data.length; i++){
        var div = document.createElement("div");
        div.classList.add('day');
        div.setAttribute('data-placement', data[order[i]].time);

        var header = document.createElement("h3");
        header.textContent = data[order[i]].time + " " + data[order[i]].dayNight;

        var event = document.createElement("p")
        event.textContent = data[order[i]].description

        div.appendChild(header);
        div.appendChild(event);
        day.appendChild(div)
    }
}

function orderData(){
    var day1=[];
    var day2=[];
    var day3=[];

    for(var j=0; j < weekend.length; j++){
        if(weekend[j].day == 'friday'){
            day1.push(weekend[j]);
        }
        else if(weekend[j].day == 'saturday'){
            day2.push(weekend[j]);
        }
        else{
            day3.push(weekend[j]);
        }
    }
    placement(day1);
    placement(day2);
    placement(day3);
        /*for(var i=0; i < weekend.length; i++){
            var time = childList[i].getAttribute('data-placement');
            var greater = compareTime(time, newtime);
            if(greater){
                min = i;
            }
        }
        if(max === 0){
            var temp = document.createElement('div');
            temp = childList[0];
            console.log(temp);
            childList[0]= div;
            childList[0].appendChild(temp);
        }
        childList[max].appendChild(div);
        max=0;*/
}

function placement (data){
    console.log(data);
    if(data.length === 0){
        return;
    }
    var order = [];
    var length = data.length;
    var index=0;
    while(order.length != length){
        //
        if(index >=length){
            break;
        }
        var min = "100:100 pm";
        for(var i=0; i< data.length; i++){
            var check= compareTime(data[i].time + ' ' + data[i].dayNight, min)
            console.log(check)
            if(check && !order.includes(i)){
                order[index]=i;
                min = data[i].time + ' ' + data[i].dayNight;
            }
        }
        index++;
    }
    displayEvent(data, order)
}

function minTime(){

}

function compareTime(time, newTime){
    newTime = newTime.split(':');
    var newMinute = newTime[1].split(' ');

    time = time.split(':');
    var minute =time[1].split(' ');
    console.log(time)
    console.log(newTime)
    if( (minute[1] == 'am')  && (newMinute[1] == 'pm') ){
        return true;
    }
    else if ( (minute[1] == 'pm') && (newMinute[1] == 'am') ){
        return false;
    }
    else if((Number(time[0]) == 12) && ( Number(newTime[0]) != 12)){
        return true;
    }
    else if( (Number(time[0]) != 12) && ( Number(newTime[0]) == 12) ){
        return false;
    }
    else{
        if( Number(time[0])  <=  Number(newTime[0])){
            //
            if( Number(minute[0])  <=  Number(newMinute[0]) ){
                //
                return true;

            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    }
}

function plannedEvents(){
    
    if(localStorage.getItem('weekend') != null){
        weekend = JSON.parse(localStorage.getItem('weekend'));
        orderData();
    }
}

plannedEvents();

addEventEl.addEventListener("click", turnOnForm)
tripEl.addEventListener("submit", saveEvent)
tripEl.addEventListener("click", cancelSave)

