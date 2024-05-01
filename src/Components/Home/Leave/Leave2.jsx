import React, { useState } from 'react'
import { BiUserCircle } from 'react-icons/bi'
import axios from 'axios'
import 'react-calendar/dist/Calendar.css';
import { GiEnergyArrow } from 'react-icons/gi'
import { RiLightbulbFlashLine, RiTimerFlashFill } from 'react-icons/ri'
import { BiTime } from 'react-icons/bi'
import { MdSnooze } from 'react-icons/md'
import { tz } from '../../apis';
import { useEffect } from 'react';
import { createLeave, getAllLeaves, loginAdmin2, updateLeaveStatus } from '../../../Utils/api';
const Leave2 = ({props}) => {
    
const [adduser, setadduser] = useState('adduser2')
const [value, onChange] = useState(new Date());

const [name, setname] = useState('')
const [email, setemail] = useState('')
const [pass, setpass] = useState('')
const [filter, setfilter] = useState('All')
const [c, setc] = useState(0)

function onChanges(e) {
console.log(e)
    
}
const [date, setdate] = useState('')
const [username, setusername] = useState('Lynda koo')
const [leave, setleave] = useState('')
function submit() {
    var postData={
        username:username,
        status:'Pending',
        date:date,
        leave:leave,
    }
    createLeave(postData).then( res=>{
        console.log(res)
        
    }).then(()=>{
        setadduser('adduser2')
       getAllLeaves().then(res=>{
            console.log(res)
            setuserd(res.Leave)
    })
    })
    
}
const [userd, setuserd] = useState()
const [usert, setusert] = useState()

useEffect(() => {
    getAllLeaves().then(res=>{
        console.log(res)
        setuserd(res.Leave)
    }).catch(err=>console.log(err))
    var postData={
        email:props
    }
    loginAdmin2(postData).then(res=>
        {
            console.log(res
                )
                setusert(res.Admin)
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

function approve(val,val1) {
    var postData={
        status:val1,
        id:val,
        user:usert.name


    }
    updateLeaveStatus(postData).then( res=>{
        console.log(res)
        
    }).then(()=>{
        setadduser('adduser2')
         getAllLeaves().then(res=>{
            console.log(res)
            setuserd(res.Leave)
    })
    })



    
}
const [task, settask] = useState('')
const [tasks, settasks] = useState([])
const [mem, setmem] = useState([])

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
        <>
        
        <div className={adduser}>
            <div className="subadduser">
              {c===0&&
              <>
                <div className="inputname inui">
                    <h1>Leave</h1>
                    <textarea onChange={e=>setleave(e.target.value)} />

                </div>
                <div className="inputname xin">
                    <h1>Leave Date</h1>
                    <input onChange={e=>setdate(e.target.value)}  type="text" />

                </div>
                <div className="inputname"></div>
               
                <div className="inputname inputname2">
                <h1>Send to</h1>
                {mem&&mem.map((val,index)=>(
                    <>
                    <p>{index+1}. {val}</p>
                    </>
                ))

                }
                <select onChange={e=>setmems(e.target.value)} className='select2' name="cars" id="cars">
                    {data2.map(val=>(
                        <>
                        
  <option value={val}>{val}</option>
                        </>
                    ))

                    }
</select>
                </div>
                <button onClick={e=>addtask2()}   className='btn3'>+ Add Recipient</button>
             <div className="inputname3">
             <button onClick={e=>submit()} className='lbtn'>Submit</button>
                <button onClick={e=>setadduser('adduser2')}  className='btn2'>Cancel</button>

             </div>
              </>

              }


            </div>

        </div>

        <div className="usersdata">

            <div className="producheader hideonmobile">
                <span>
                    <div className="ricircle">
                        <div className="priconpar">
                            <RiLightbulbFlashLine className='pricon' />
                        </div>
                        <p className='sss'>{userd&&userd.length}</p>
                    </div>
                    <h1>Total Leaves</h1>

                </span>
                <span>
                    <div className="ricircle">
                        <div className="priconpar pricon2">
                            <BiTime className='pricon ' />
                        </div>
                        <p>4</p>
                    </div>
                    <h1>Vacation Leaves</h1>

                </span>
                <span>
                    <div className="ricircle">
                        <div className="priconpar pricon3">
                            <MdSnooze className='pricon ' />
                        </div>
                        <p>{userd&&userd.length}</p>
                    </div>
                    <h1>Sick Days </h1>

                </span>
                <span>
                    <div className="ricircle">
                        <div className="priconpar pricon4">
                            <RiTimerFlashFill className='pricon ' />
                        </div>
                        <p>8</p>
                    </div>
                    <h1>Days Out</h1>

                </span>

            </div>
            <div className="hideondesk widthfull">
            <div className="topl2">
    <div className="toplsub">
   {filter==='All'?
        <button className='buttonpur'>All</button>:
        <button  onClick={e=>setfilter('All')}>All</button>

   }
{filter==='Approved'?

<button className='buttonpur'>Approved</button>:

<button onClick={e=>setfilter('Approved')}>Approved</button>

}
{
    filter==='Declined'?

    <button className='buttonpur'>Cancelled</button>:

    <button onClick={e=>setfilter('Declined')}>Cancelled</button>
}
    </div>
</div>

            {userd&& filter!=='All'?userd.map(val=>(
<>{
   val.status===filter&&

<div className="cardl">
    <div className="topl">
        <p>Full Day Leave</p>
        {val.status==='Pending'?
                 
                 <button style={{color:'rgb(218, 167, 14)'}}>Day Out</button>
                 :val.status==='Approved'?
                 
                 <button style={{color:'rgb(3, 143, 9',background:'#DBFFF8'}}>Vacation</button>
                 :
                 
                 <button style={{color:'rgb(241, 94, 94)',background:'##FFDADA'}}>Sick Day</button>

                 }

    </div>
    <h3>{val.date}</h3>
    <h1>{val.leave}</h1>

    <div className="topl topll">
            <button  onClick={e=>approve(val._id,'Approved')}  className='lbtn lbtnpp'>Approve</button>
            <button  onClick={e=>approve(val._id,'Declined')}  className='lbtn lbtnpp2 lbtn2'>Decline</button>
        </div>
</div>


}
</>
)):
userd&&userd.map(val=>(
    <>{
     
    
    <div className="cardl">
        <div className="topl">
            <p>Full Day Leave</p>
            {val.status==='Pending'?
                     
                     <button style={{color:'rgb(218, 167, 14)'}}>Day Out</button>
                     :val.status==='Approved'?
                     
                     <button style={{color:'rgb(3, 143, 9',background:'#DBFFF8'}}>Vacation</button>
                     :
                     
                     <button style={{color:'rgb(241, 94, 94)',background:'##FFDADA'}}>Sick Day</button>
    
                     }
    
        </div>
        <h3>{val.date}</h3>
        <h1>{val.leave}</h1>
        <div className="topl topll">
            <button  onClick={e=>approve(val._id,'Approved')}  className='lbtn lbtnpp'>Approve</button>
            <button  onClick={e=>approve(val._id,'Declined')}  className='lbtn lbtnpp2 lbtn2'>Decline</button>
        </div>
    </div>
    
    
    }
    </>
    ))

}
         
            </div>
   
            <div className="tablerow hideonmobile">
              <div className="subtable">
              <div className="headertable clop headerxtab">
                    <h1>Username</h1>
                    <h2>Date</h2>
                    <h2>Leave</h2>
                    <h3>Status</h3>
                    <h2>Action</h2>
                    <h2></h2>
                    <h2>Remarks</h2>
                    <h2></h2>


                </div>
                {userd&&userd.map(val=>(
                    <>
                     <div className="headertable headerxtab">
                    <h1>{val.username}</h1>
                    <h2>{val.date}</h2>
                    <h2>{val.leave.substring(0,15)}</h2>
                 {val.status==='Pending'?
                 
                 <h2 style={{color:'rgb(218, 167, 14)'}}>Day Out</h2>
                 :val.status==='Approved'?
                 
                 <h2 style={{color:'rgb(3, 143, 9'}}>Vacation</h2>
                 :
                 
                 <h2 style={{color:'rgb(241, 94, 94)'}}>Sick Day</h2>

                 }
                       <h2><button onClick={e=>approve(val._id,'Approved')} className='lbtn'>Approve</button></h2>
                       <h2><button onClick={e=>approve(val._id,'Declined')} className='lbtn lbtn2'>Decline</button></h2>

                       <h2>{val.remarks?val.remarks:'none'}</h2>
                </div>
                    </>
                ))

                }
              </div>
            </div>
        </div></>
    )
}

export default Leave2