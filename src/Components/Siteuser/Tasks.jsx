import React, { useState } from 'react'
import { BiUserCircle } from 'react-icons/bi'
import axios from 'axios'
import 'react-calendar/dist/Calendar.css';
import { GiEnergyArrow } from 'react-icons/gi'
import { RiLightbulbFlashLine, RiTimerFlashFill } from 'react-icons/ri'
import { BiTime } from 'react-icons/bi'
import { MdSnooze } from 'react-icons/md'
import {MdLocationOn} from 'react-icons/md'
import { tz } from '../apis';
import {IoClose} from 'react-icons/io5'
import { useEffect } from 'react';
import SwipeableButton from './Button';
const Tasks = ({props}) => {
    
const [adduser, setadduser] = useState('adduser2')
const [value, onChange] = useState(new Date());

const [name, setname] = useState('')
const [email, setemail] = useState('')
const [pass, setpass] = useState('')
const [c, setc] = useState(0)

function onChanges(e) {
console.log(e)
    
}
const [date, setdate] = useState('')
const [username, setusername] = useState('Lynda koo')
const [leave, setleave] = useState('')
function submit() {
    
    axios.post(`${tz}/leave/add`,{
        username:props.user.name,
        status:'Pending',
        date:date,
        leave:leave,
        sender:props.user._id
    }).then( res=>{
        console.log(res)
        
    }).then(()=>{
        setadduser('adduser2')
         axios.post(`${tz}/leave/finduserdata`,{
            sender:props.user._id
         }).then(res=>{
            console.log(res)
            setuserd(res.data.Leave)
    })
    })
    
}
const [userd, setuserd] = useState()
const [filter, setfilter] = useState('All')
const [sitestasks, setsitestasks] = useState()
const [aatt, setaatt] = useState()
const [atask, setatask] = useState('')
const [ntask, setntask] = useState('')
function readytoupdate(val){
  setntask(val)
  
}
function updatetask(){

    axios.post(`${tz}/siteatt/updatetask`,{
        _id:aatt._id,
 
        task:ntask
        
     }).then(resww=>{
        console.log(resww)
        setatask(ntask)
setntask('')
       setadduser('adduser2')
     })
} 
const [datec, setdatec] = useState('')
useEffect(() => {
        
    axios.get(`${tz}/att/time`).then(res1 => {
        console.log(res1)

        var dateput = res1.data.Date.split(', ')

        setdatec(dateput[0])
        axios.post(`${tz}/siteatt/findbydateandchk`,{
            id:props.user._id,
            date:dateput[0],
            chkouttime:'-'
            
         }).then(resw=>{
        if(resw){
             
        console.log(resw)
        setatask(resw.data.Siteatt[0].task)
        setaatt(resw.data.Siteatt[0])
        axios.post(`${tz}/jobsite/find`,{
            Jobsite_id:resw.data.Siteatt[0].projectid
         }).then(res=>{
            console.log(res)
            setsitestasks(res.data.Jobsite)
    })
        }
        })


    })


  return () => {
    
  }
}, [])
var data2=['Jose Ros','Lynda Game','Alex Kuu','John Voo','Tros poo']


var data=[
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",


]
const [task, settask] = useState('')
const [tasks, settasks] = useState([])
const [mem, setmem] = useState([])
const [confirmsh, setconfirmsh] = useState(false)

const [mems, setmems] = useState('')
const [title, settitle] = useState('')
const [last, setlast] = useState('')
function addtask() {
settasks(tsk=>[...tsk,task])
settask('')
}
function addtask2() {
    setmem(tsk=>[...tsk,mems])

    }

    return (
        <div className='divleave'>
        
  
        <div className={adduser}>
            <div className="subadduser">
          
              <>
      

    
              </>

              


            </div>

        </div>
        <div className="usersdata">

            <div className="topusersdata hideonmobile">
                <BiUserCircle className='usio' />
                <h1>Tasks</h1>
              
            </div>
            <div className="hideondesk widthfull widthei">
            <div className="topl2">

</div>

   <div className="topl2">
</div>

            {sitestasks&&sitestasks.map(val=>(
<><div className="flextask">
{

val.task&&val.task.map(val2=>(
    val2.name===atask?
    
    <div className="endtp endpt">
   
{ntask===val2.name&&ntask.length>0?
      <SwipeableButton onSuccess={e=>updatetask()} color='#414EC6' text='SLIDE TO CONFIRM' />:

<button className='endt3' onClick={e=>readytoupdate(val2.name)}>{val2.name} - {val2.description}</button>

}

</div>: 
    <div className="endtp endpt">
   
{ntask===val2.name&&ntask.length>0?
      <SwipeableButton onSuccess={e=>updatetask()} color='#414EC6' text='SLIDE TO CONFIRM' />:

<button className='endt2' onClick={e=>readytoupdate(val2.name)}>{val2.name} - {val2.description}</button>

}

</div>
))


}
</div>
</>
))

}
         
            </div>
   

<div className="tablerow">
              <div className="subtable">
              <div className="headertable clop headerxtab">
                    <h1>Task</h1>
                    <h2>Jobsite</h2>
                    <h2>Company</h2>
                    <h3>Status</h3>


                </div>
                {sitestasks&&sitestasks.map(val2=>(
                  val2.task&&val2.task.map(val=>(
                    <>
                    <div className="headertable headerxtab">
                   <h1>{val.name}</h1>
                   <h2>{val2.sitename}</h2>
                   <h2>{val2.clientname}</h2>
                
                <h2 style={{color:'rgb(3, 143, 9'}}>Active</h2>
             

               </div>
                   </>
                  ))
                ))

                }

              </div>
            </div>


        </div></div>
    )
}

export default Tasks