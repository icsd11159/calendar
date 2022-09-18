import React,{useState,useEffect} from 'react';
import "./calendarStyle.css";
import {getWeather} from '../services/api.js'
import { Box,
  Button,
  Heading,
  Text} from 'rebass';

  import { Input,
    Select,
    Label,Textarea} from '@rebass/forms';
  

function Calendar(props) {
  // your calendar implementation Goes here!
  // Be creative
  const daysString =['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] ;
  const monthString =['January', 'February','March','April','May', 'June', 'Jule', 'August', 'September', 'October', 'November', 'December'] ;
  const days =[0, 1, 2, 3, 4, 5, 6] ;
  //const time = ['00:00','01:00'] for select time
  const [reminder, setReminder] = useState({'28-0':[{time:'00:00', day:'28-0',city:'Athens',reminder:'GoToMAS'}]});
  const [openReminder, setOpenReminder] = useState(false);
  const [thisopenReminder, setthisopenReminder] = useState('28-0');
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState('2022');
  const [prevyear, setprevYear] = useState('2021');
  const [nextyear, setnextYear] = useState('2023');
 
  const [prevmonths, setprevmonths] = useState([]);
  const [nextmonths, setnextmonths] = useState([]);
  
  useEffect(() => {
    localStorage.setItem('reminder', JSON.stringify(reminder));
  }, [reminder]);


  let getDaysArray = (prevyear=null) =>{
    let thisyear= prevyear?prevyear:year
    let monthAll=[]
    for(let m=0; m<12; m++ ){
    let names = days;
    let date = new Date(thisyear, m, 1);
    let result = [];
      while (date.getMonth() == m) {
        result.push(date.getDate() + '-' + names[date.getDay()]);
        date.setDate(date.getDate() + 1);
      }
      monthAll.push(result)
    }
  
    return monthAll;
  }
  const [allmonths, setallMonths] = useState(getDaysArray());
  const [daysofPastMonth, setdaysofPastMonth] = useState(allmonths[month-1]);
  const [daysofNextMonth, setdaysofNextMonth] = useState(allmonths[month+1]);
  
  useEffect(() => {
    setallMonths(getDaysArray());
    setprevmonths(getDaysArray(prevyear));
    setnextmonths(getDaysArray(nextyear));
  }, [year]);
/*   useEffect(() => {
    setdaysofPastMonth(allmonths && allmonths[month-1]);
    setdaysofNextMonth(allmonths && allmonths[month-1])
  }, [month]); */
  const  getWeatherCity=()=>{
   
    let result='Rainy';
    console.log(reminder);

    let url = 'forecasts/v1/daily/5day/AIzaSyDFXtbSXAtxY1z9TtGhVUIRWlyizReXEc8?';
    reminder[thisopenReminder] && reminder[thisopenReminder][0] && reminder[thisopenReminder][0].city && getWeather(url).then((res)=>{
      if(res && res.data){
      console.log(res); //i am letting this as I can not make API call because I don't have API KEY
      result='Rainy'
    }else{
      result='Rainy'
     }
       
    }).catch((err) => {
     //=this.setState({ errorMessage: "Error with the users: " + err });
     result='Rainy'

      console.log(err);
    });
    let addweather={...reminder};
    addweather[thisopenReminder][0].weather=result
  

    setReminder(addweather)
  }
   

 
  let daysofMonth = allmonths && allmonths[month];
  //let daysofPastMonth = allmonths && allmonths[month-1];
  //let daysofNextMonth = allmonths && allmonths[month+1];
  let firstDay=daysofMonth && daysofMonth[0] && parseInt(daysofMonth[0].split('-')[1]);
  let nextDaysMonth=0;
 

// const items = JSON.parse(localStorage.getItem('items'));

  const handleReminderChange = (event,index) => {
 
    let editReminder={...reminder};
    editReminder[thisopenReminder][index]={ ...editReminder[thisopenReminder][index],[event.target.id]:event.target.value}
    setReminder(editReminder)


  }
  const prevMont = ()=>{
    console.log(month);

    if(month===1){
     
      setMonth(0)
      console.log('prevmonths');
      console.log(prevmonths);
      daysofMonth = allmonths && allmonths[0];
      setdaysofPastMonth(prevmonths && prevmonths[1]);
      setdaysofNextMonth(allmonths && allmonths[month+1]);

    //  daysofPastMonth = prevmonths && prevmonths[11];
      //daysofNextMonth = nextmonths && nextmonths[month+1];
      firstDay=daysofMonth && daysofMonth[0] && parseInt(daysofMonth[0].split('-')[1]);
      nextDaysMonth=0;
    } else if(month===0){
     
      setprevYear(''+(parseInt(year)-2)+'')
      setnextYear(year)
      setallMonths(prevmonths)
      setYear(''+(parseInt(year)-1)+'')
      setMonth(11)
      setdaysofPastMonth(prevmonths && prevmonths[1]);
      setdaysofNextMonth(allmonths && allmonths[month+1])
      }else{
        setdaysofPastMonth(allmonths && allmonths[month-1]);
    setdaysofNextMonth(allmonths && allmonths[month+1])
    setMonth(month-1)

    }
   
  
  }
  const nextMont = ()=>{
    if(month===10){
      setMonth(month+1)
      setallMonths(nextmonths)

      daysofMonth = allmonths && allmonths[1];
  
      setdaysofPastMonth(prevmonths && prevmonths[month-1]);
      setdaysofNextMonth(nextmonths && nextmonths[0]);
      firstDay=daysofMonth && daysofMonth[0] && parseInt(daysofMonth[0].split('-')[1]);
    } if(month===11){
   
      setMonth(0)
      setnextYear(''+(parseInt(year)+2)+'')
      setprevYear(year)
      setYear(''+(parseInt(year)+1)+'')
      setdaysofPastMonth(allmonths && allmonths[11]);
      setdaysofNextMonth(nextmonths && nextmonths[1])
      
      }else{
     
      setdaysofPastMonth(allmonths && allmonths[month]);
      setdaysofNextMonth(allmonths && allmonths[month+2])
      setMonth(month+1)
    }

  }
  const addNewReminder = () =>{
    let newReminder={...reminder};
    if(newReminder[thisopenReminder] === undefined){
      newReminder={...newReminder,[thisopenReminder]:[{time:'',city:'',reminder:''}]};
    }else{
      newReminder[thisopenReminder].push({time:'',city:'',reminder:''});
    }
    setReminder(newReminder); 
 
  }

  const removeReminder = (time,index) => {
    let newr={...reminder};
    newr[thisopenReminder]=newr[thisopenReminder].filter((rem,ind)=>rem.time!==time)

    setReminder(newr)
  }



  return (
    <div className="container">
      
        <h1>Calendar</h1> 
        <div style={{display:'flex',padding:'1px'}}>
        <span style={{ width:'30%' ,marginTop: '1rem', cursor: 'pointer'}} onClick={prevMont}>{' prev  '}</span><span style={{ width:'40%', textAlign:'center', fontWeight:'bold', fontSize:'medium'}}>{monthString[month]}{' '}{year}</span><span style={{ width:'30%', textAlign:'right', cursor: 'pointer'}} onClick={nextMont}>{'  next '}</span>
        </div>
        <div style={{display: 'flex',height: '100%'}}>
          {daysofMonth && daysofMonth[0] && daysofPastMonth && daysofPastMonth[0] &&  days.map((day,placement)=>{
            
            let thisweekdays=daysofMonth.filter((d,ind)=>parseInt(d.split('-')[1])===day)
          
            if(placement<firstDay && firstDay-placement<5){
              thisweekdays= [daysofPastMonth[daysofPastMonth.findLastIndex((t) => (parseInt(t.split('-')[1])===day))],...thisweekdays]
            
            }else if(placement>firstDay && thisweekdays.length<5){
              thisweekdays= [...thisweekdays,daysofNextMonth[nextDaysMonth]]
              nextDaysMonth++;
            }
        
            return (
              <div className='header'>
            <div className='header-titles'>
            {daysString[placement]}
            </div>
            { thisweekdays && thisweekdays[0] && thisweekdays.map((week,w)=>{
            return (
            <div className='buttonDays'
             style={{
              padding:'2px',
              fontWeight:'bold',
              color:parseInt(week.split('-')[1])===0 || parseInt(week.split('-')[1]===6)?'rgb(6, 85, 122)':'black',
              backgroundColor:parseInt(week.split('-')[1])===0 || parseInt(week.split('-')[1])===6?'lightgrey':'white'
             }}
             onClick={() => {
              setOpenReminder(true)
              setthisopenReminder(week)
            }}
            >
             <div>
            {week ?week.split('-')[0]:''}
            </div>
     
              
              {reminder && reminder[week] && <Text label='dd'  style={{color:'black'}} >{reminder[week].length} reminder(s) <br/></Text>}
              {reminder && reminder[week] && reminder[week][0] && reminder[week][0].city && reminder[week][0].weather && <Text label='dd'  style={{color:'black'}} >{reminder[week][0].city} :  {reminder[week][0].weather} <br/></Text>}
               
      
            </div>)
            })}
          
            </div>
            )
          })}
 
<Box
  display={openReminder?'block':'none'}
  style={{
    border:  '1px solid black',
    backgroundColor:'white',
    color:'rgb(6, 85, 122)',
    position: 'absolute',
    maxHeight: '40%',
    padding: '1%',
    overflowY: 'scroll',
    width:'300px',
    boxShadow: '3px 8px grey'

  }}
  sx={{
    mx: 'auto',
    px: 3
  }}>
<Heading color={'rgb(6, 85, 122)'}  textAlign='center'> Reminder for {thisopenReminder.split('-')[0]}/{month}</Heading> 
<div style={{borderTop: '2px solid rgb(6, 85, 122)'}}></div>

{reminder && reminder[thisopenReminder] && reminder[thisopenReminder].map((day,index)=>{
 return <React.Fragment key={'fragment'+thisopenReminder+index}>
  
  <div style={{display:'flex',padding:'2px'}}>
  Time:
  <Input
    id='time'
    name='time'
    type='string'
    key={'time'+thisopenReminder+index}
    sx={{
      maxWidth: 100,
      mx: 'auto',
      px: 3
    }}
    maxLength={5}
    placeholder='etc 01:12'
    value={day.time}
    onChange = {e=>handleReminderChange(e,index)}
  />

  </div>
  <div>
  City:
  <Input
    id='city'
    name='city'
    type='string'
    key={'city'+thisopenReminder+index}
    sx={{
      maxWidth: 300,
      mx: 'auto',
      px: 3
    }}
    placeholder='Athens'
    value={reminder[thisopenReminder] && reminder[thisopenReminder][0] && reminder[thisopenReminder][0].city}
    onChange = {e=>handleReminderChange(e,index)}
  />
  </div>
  <Label htmlFor='reminder'>Reminder</Label>
  <Textarea
    id='reminder'
    name='reminder'
    key={'reminder'+thisopenReminder+index}
    type='string'
    value={day.reminder}
    maxLength={30}
    onChange = {e=>handleReminderChange(e,index)}
  />
    <Button backgroundColor={'red'} marginTop={'2px'} variant='outline' mr={2} onClick={e=>{removeReminder(day.time,index)}}>Remove Reminder</Button>
   <div style={{borderTop: '2px solid rgb(6, 85, 122)'}}></div>
  </React.Fragment>
})}

  <Button backgroundColor={'green'} marginTop={'2px'} variant='outline' mr={2} onClick={addNewReminder}>Add Reminder</Button>
  <Button backgroundColor={'rgb(6, 85, 122)'} marginTop={'2px'}   variant='outline' mr={1} onClick={e=>{setOpenReminder(false);getWeatherCity()}}>OK</Button>
</Box>
  
      </div>

    </div>
    
  )
}

export default Calendar;