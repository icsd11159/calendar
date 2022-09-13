import React from 'react';
import "./calendarStyle.css";
import moment from 'moment';

function Calendar(props) {
  // your calendar implementation Goes here!
  // Be creative
  const days =['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] ;


  let getDaysArray = (year, month) =>{
    var monthIndex = month - 1; // 0..11 instead of 1..12
    var names = days;
    var date = new Date(year, monthIndex, 1);
    var result = [];
    while (date.getMonth() == monthIndex) {
      result.push(date.getDate() + '-' + names[date.getDay()]);
      date.setDate(date.getDate() + 1);
    }
    return result;
  }

let daysofMonth = getDaysArray(2022,9);
let thisweekdays=daysofMonth.filter((d,ind)=>d.split('-')[1]==='Thursday')
let firstDay;
//daysofMonth.filter((d,ind)=>{if(d.split('-')[0]==='1') {firstDay= ind}})
console.log(firstDay);
console.log(thisweekdays)
  return (
    <div className="container">
        <h1>Calendar</h1> 
        <h3>September</h3> 
        <div style={{display: 'flex',height: '100%'}}>
          {days.map((day,placement)=>{
            let thisweekdays=daysofMonth.filter((d,ind)=>d.split('-')[1]===day)
            if(parseInt(thisweekdays[0].split('-')[0])===1){
              firstDay=placement;
            }
            if(firstDay===undefined){
              thisweekdays= ['',...thisweekdays]
            }else if(placement>firstDay && thisweekdays.length<5){
              thisweekdays= [...thisweekdays,'']
            }
         console.log(thisweekdays);
            return (
              <div className='header'>
            <div className='header-titles'>
            {day}
            </div>
            { thisweekdays.map((week,w)=>{
            return (
            <div className='buttonDays'>
         
            {week ?week.split('-')[0]:''}
            
            </div>)
            })}
          
            </div>
            )
          })}
      </div>
   
    </div>
  )
}

export default Calendar;