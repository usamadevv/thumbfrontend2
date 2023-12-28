import React, { useCallback, useRef, useState } from 'react'
import { BiUserCircle } from 'react-icons/bi'
import axios from 'axios'
import 'react-calendar/dist/Calendar.css';
import { GiEnergyArrow } from 'react-icons/gi'
import { RiLightbulbFlashLine, RiTimerFlashFill } from 'react-icons/ri'
import { BiTime } from 'react-icons/bi'
import { MdKeyboard, MdKeyboardBackspace, MdSnooze } from 'react-icons/md'
import { tz } from '../../apis';
import { useEffect } from 'react';

import prof from '../../../images/prof.png'
import msgic from '../../../images/msg.png'
import {RiSendPlaneFill} from 'react-icons/ri'
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../Context/SocketContext';
import { FaPhone } from 'react-icons/fa';
const Notes2 = () => {

    const [emailw, setEmailw] = useState("");
    const [room, setRoom] = useState( new Date().getTime().toString())
    const socket = useSocket();
    const navigate = useNavigate();
    const handleSubmitForm = useCallback(
      (ee) => {

        localStorage.setItem('remotecaller',ee)
      
        socket.emit("room:join", { email:ee, room,sender:emailw });

      },
      [emailw, room, socket]
    );
  const [sender2, setsender2] = useState('')
const [calling, setcalling] = useState(false)
    const handleJoinRoom = useCallback(

      (data) => {
        const { email, room,sender } = data;
        setsender2(sender)
        console.log(data)
    
        console.log(localStorage.getItem('username'))

        if(data.email===localStorage.getItem('username')){
           setcalling(true)
           setRoom(room)


        }
        else{

            navigate(`/room/${room}`);
        }

      },
      [navigate]
    );
  
  
    useEffect(() => {
       
      socket.on("room:join", handleJoinRoom);

      socket.on("room:callto", handleJoinRoom);
      return () => {
        socket.off("room:join", handleJoinRoom);
      };
    }, [socket, handleJoinRoom]);
  


    
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

const [senderids, setsenderids] = useState(localStorage.getItem('userid'))
const [sender, setsender] = useState(localStorage.getItem('username'))
const [reciever, setreciever] = useState('') 
const [seen, setseen] = useState('false')
const [note, setnote] = useState('')
const [time, settime] = useState('02:23')
function submit() {
    
    axios.post(`${tz}/note/add`,{
        sender:sender,
        reciever:reciever,
        recieverid:recid,
        seen:seen,
        note:note,
        time:time
    }).then( res=>{
        console.log(res)
        
    }).then(()=>{
        setadduser('adduser2')
         axios.get(`${tz}/note/getall`).then(res=>{
            console.log(res)
            setuserd(res.data.Notes)
    })
    })
    
}
const [userd, setuserd] = useState()
const [addedusers, setaddedusers] = useState()
const [userd2, setuserd2] = useState()
const [data2, setdata2] = useState()
const [sitestaff, setsitestaff] = useState()
useEffect(() => {

    axios.get(`${tz}/note/getall`).then(res=>{
        console.log(res)
        setuserd(res.data.Notes)
    }).catch(err=>console.log(err))
 
    axios.get(`${tz}/siteuser/getall`).then(resx=>{
        console.log(resx)
        var sstaff=resx.data.Siteuserd
        axios.post(`${tz}/admin/find`,{
            _id:localStorage.getItem('userid')
    
        }).then(res=>{
            
            console.log(res)
            setaddedusers(res.data.Admin)
            setEmailw(res.data.Admin.email)
            axios.get(`${tz}/super/getall`).then(resxx=>{
                console.log(resxx)
            
                var sstaff2=resxx.data.Supervisor
                setuserd2(  sstaff2.sort((a, b) => {
                    const dateA = res.data.Admin.contacts.find(obj => obj.userid === a._id)?.timestamp || '';
                    const dateB = res.data.Admin.contacts.find(obj => obj.userid === b._id)?.timestamp || '';
                
                    // Use the Intl.Collator to compare ISO 8601 date strings
                    return new Intl.Collator(undefined, { numeric: true }).compare(dateB, dateA);
                }))


        })
           
            
            // Sort arrayOfObjects2 based on the dates in arrayOfObjects
          setsitestaff(  sstaff.sort((a, b) => {
            const dateA = res.data.Admin.contacts.find(obj => obj.userid === a._id)?.timestamp || '';
            const dateB = res.data.Admin.contacts.find(obj => obj.userid === b._id)?.timestamp || '';
        
            // Use the Intl.Collator to compare ISO 8601 date strings
            return new Intl.Collator(undefined, { numeric: true }).compare(dateB, dateA);
        }))
           
            
        
    
        }).catch(err=>console.log(err))
    
    }).catch(err=>console.log(err))

    
   
  return () => {
    
  }
}, [])
const [activeflt, setactiveflt] = useState('user')
const [process, setprocess] = useState(false)
var data=[
    {
        name:'usama',
        role:'User',
        status:'no new notes'
    },
    {
        name:'usama',
        role:'User',
        status:'no new notes'
    },
    {
        name:'usama',
        role:'User',
        status:'no new notes'
    },
    {
        name:'usama',
        role:'User',
        status:'no new notes'
    },{
        name:'usama',
        role:'User',
        status:'no new notes'
    },
    {
        name:'usama',
        role:'User',
        status:'no new notes'
    },
    {
        name:'usama',
        role:'User',
        status:'no new notes'
    }


]
const [task, settask] = useState('')
const [tasks, settasks] = useState([])
const [mem, setmem] = useState([])

const [title, settitle] = useState('')
const [last, setlast] = useState('')
const [emptype, setemptype] = useState('office')
function startchat(val){
var y=0
if(addedusers&&addedusers.addedusers&&addedusers.addedusers.length>0){
    addedusers.addedusers.forEach((element,index) => {
    if(element.userid===val._id){
        y=1
        setadduser('adduser2')
        openthischat(element,utype)


    }
    else if(index===addedusers.addedusers.length-1){
if(y===0){
    
    axios.post(`${tz}/admin/addchat`,{
        _id:localStorage.getItem('userid'),
            name:val.name,
            userid:val._id,
            status:'No new chats',
            role:'User'
    
    
    
    
        }).then(res2=>{  
            axios.post(`${tz}/siteuser/addchat`,{
                _id:val._id,
                    name:val.name,
                    userid:localStorage.getItem('userid'),
                    status:'No new chats',
                    role:'User'
            
            
            
            
                }).then(res2x=>{  
                
                    console.log(res2)
        
                    axios.post(`${tz}/admin/find`,{
                        _id:localStorage.getItem('userid')
                
                    }).then(res=>{
                        setadduser('adduser2')
                        console.log(res)
                        setaddedusers(res.data.Admin)
                    }).catch(err=>console.log(err))
                
                })        
       
        })
}
    }

});
}
else{
    
    axios.post(`${tz}/admin/addchat`,{
        _id:localStorage.getItem('userid'),
            name:val.name,
            userid:val._id,
            status:'No new chats',
            role:'User'
    
    
    
    
        }).then(res2=>{  
            axios.post(`${tz}/siteuser/addchat`,{
                _id:val._id,
                    name:val.name,
                    userid:localStorage.getItem('userid'),
                    status:'No new chats',
                    role:'User'
            
            
            
            
                }).then(res2x=>{  
                
                    console.log(res2)
        
                    axios.post(`${tz}/admin/find`,{
                        _id:localStorage.getItem('userid')
                
                    }).then(res=>{
                        setadduser('adduser2')
                        console.log(res)
                        setaddedusers(res.data.Admin)
                    }).catch(err=>console.log(err))
                
                })        
       
        })
}


}
const [activeid, setactiveid] = useState()

function openthischat(val,val2){

    axios.post(`${tz}/admin/viewed`,{
        sender:localStorage.getItem('userid') ,
               user:val._id,
               unseen:0
       
           }).then( resx=>{
              
           })
    setutype(val2)
    console.log(val)
    setactiveid(val)
    axios.post(`${tz}/note/find`,{
      
        senderid:localStorage.getItem('userid'),
        recieverid:val._id
       }).then( res=>{
        setmessages(res.data.Notes)
        
        setlsection('leftsection leftsectionp')
        messageEl.current.addEventListener('DOMNodeInserted', event => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
          });
         
       })
    


}
function deleted(val){
    axios.post(`${tz}/note/delete`,{
     _id:val
    }).then( res=>{
        console.log(res)
        
        axios.get(`${tz}/note/getall`).then(resa=>{
            console.log(resa)
            setuserd(resa.data.Notes)
    })
    })
}
const [msg, setmsg] = useState('')
function sendmsg(){
    setprocess(true)
    
    if(activeid){
        axios.get(`${tz}/att/time`).then(res1 => {
            console.log(res1)
    
            var dateput = res1.data.Date.split(', ')
           
        axios.post(`${tz}/note/add`,{
            sender:sender,
            senderid:localStorage.getItem('userid'),
            reciever:activeid.name,
            recieverid:activeid._id,
            seen:'false',
            note:msg,
            time:dateput[1],
            date:dateput[0]
    
        }).then( res=>{
            console.log(res)
           
           if(utype==='user'){
            axios.post(`${tz}/siteuser/adduser`,{
                sender: activeid._id,
                       user:localStorage.getItem('userid'),
                       unseen:1
               
                   }).then( resx=>{
                      
                       axios.post(`${tz}/admin/adduser`,{
                           sender:localStorage.getItem('userid'),
                                  user:activeid._id,
                                  unseen:0
                          
                              }).then( resx2=>{
                                  setadduser('adduser2')
                                  setmsg('')
                                  openthischat(activeid,utype)
                                  console.log(resx)
                  setprocess(false)
                  
                              })
       
                   })
           }
           else{
            axios.post(`${tz}/super/adduser`,{
                sender: activeid._id,
                       user:localStorage.getItem('userid'),
                       unseen:1
               
                   }).then( resx=>{
                      
                       axios.post(`${tz}/admin/adduser`,{
                           sender:localStorage.getItem('userid'),
                                  user:activeid._id,
                                  unseen:0
                          
                              }).then( resx2=>{
                                  setadduser('adduser2')
                                  setmsg('')
                                  openthischat(activeid,utype)
                                  console.log(resx)
                  
                                  setprocess(false)
                  
                              })
       
                   })
           }


           
        })
    
        })
    }
    else{
        alert('Please select user!')
        setprocess(false)
                  
    }
    

}
const [searchval, setsearchval] = useState('')
const messageEl = useRef(null);
const [messages, setmessages] = useState()
const [utype, setutype] = useState('user')


function addtask() {
settasks(tsk=>[...tsk,task])
settask('')
}
const [recid, setrecid] = useState('')
function setrecieverfor(val){
    console.log(val)
    var b=val.split('5rt*)(')
    setrecid(b[1])
    setreciever(b[0])

}

const [lsection, setlsection] = useState('leftsection')
function addtask2() {
    setmem(tsk=>[...tsk,reciever])

    }

    return (
        <>
        
        <div className="usersdata fullwidth">

          {  /*<div className="topusersdata fixedheader">
                <BiUserCircle className='usio' />
                <h1>Notes</h1>
              
                <button className='usiosub' onClick={e=>setadduser('adduser')}>+ Add Note</button>
               



            </div>*/
}
          <div className="messagesection hideshonmovil">
            <div  className={lsection}>
                <div className="fixedsearch">
                    <h4>Notes  



                    </h4>
                    <div className="searchbar">
                        <input type="text" onChange={e=>setsearchval(e.target.value)} placeholder='Search...' />
                    </div>
                    <div className="fltbtns">
                        <button style={{background:activeflt==='super'?'#5D69D4':'white',color:activeflt==='super'?'white':'grey'}} onClick={e=>setactiveflt('super')}>Supervisors
              
                        </button>
                        <button style={{background:activeflt==='user'?'#5D69D4':'white',color:activeflt==='user'?'white':'grey'}} onClick={e=>setactiveflt('user')}>Users</button>

                    </div>

                </div>
             {activeflt==='super'&&  <>
                {
                  
                  searchval.length>0?
                  adduser!=='adduser'&&userd2&&userd2.map(val=>(
                    val.name.toLowerCase().search(searchval.toLowerCase())>=0&&
                    <div className={`cardmsg ${activeid&&activeid.name===val.name&&'msgback'}`} onClick={e=>openthischat(val,'super')}>
                    <div className="profmsg">
                        {val.name.charAt(0).toUpperCase()}
                    </div>
             <div className="colcard">
             <h1>{val.name} </h1>
                        <h1>
                        <div className="roli">
                        User
                        </div>
                        </h1>
             </div>
                </div>

                   
                ))
                :
                adduser!=='adduser'&&userd2&&userd2.map(val=>(
                    addedusers&&addedusers.contacts&&addedusers.contacts.find(person => person.userid === val._id)&& 
                    <div className={`cardmsg ${activeid&&activeid.name===val.name&&'msgback'}`} onClick={e=>openthischat(val,'super')}>
   {addedusers.contacts&&addedusers.contacts.find(person => person.userid === val._id).unseen>0&&<div className="nut">
   { addedusers.contacts&&addedusers.contacts.find(person => person.userid === val._id).unseen}
   
   </div>
   } 
                            {val&&!val.imgurl?
        
        <img src={prof} alt="" className='profmsg' />:
        
        <img className='profmsg ' src={val.imgurl} alt="" />

        }
                 <div className="colcard">
                 <h1>{val.name} </h1>
                       <h1>
                       <div className="roli">
                            Supervisor
                            </div>

                       </h1>
                 </div>
                    </div>
                ))

                }
                </>
                }
                {activeflt==='user'&&<>  {
                  
                  searchval.length>0?
                  adduser!=='adduser'&&sitestaff&&sitestaff.map(val=>(
                    val.name.toLowerCase().search(searchval.toLowerCase())>=0&&
                    <div className={`cardmsg ${activeid&&activeid.name===val.name&&'msgback'}`} onClick={e=>openthischat(val,'user')}>
                        {val&&!val.imgurl?
        
        <img src={prof} alt="" className='profmsg' />:
        
        <img className='profmsg ' src={val.imgurl} alt="" />

        }
             <div className="colcard">
             <h1>{val.name} </h1>
                        <h1>

                        <div className="roli">
                        User
                        </div>
                        </h1>
             </div>
                </div>

                   
                ))
                :
                adduser!=='adduser'&&sitestaff&&sitestaff.map(val=>(
                  
                 addedusers&&addedusers.contacts&&addedusers.contacts.find(person => person.userid === val._id)&& 
                 <div className={`cardmsg ${activeid&&activeid.name===val.name&&'msgback'}`} onClick={e=>openthischat(val,'user')}>
{addedusers.contacts&&addedusers.contacts.find(person => person.userid === val._id).unseen>0&&<div className="nut">
{ addedusers.contacts&&addedusers.contacts.find(person => person.userid === val._id).unseen}

</div>
}

                            {val&&!val.imgurl?
        
        <img src={prof} alt="" className='profmsg' />:
        
        <img className='profmsg ' src={val.imgurl} alt="" />

        }
                 <div className="colcard">
                 <h1>{val.name} </h1>
<h1><div className="roli">
                            User
                            </div></h1>

                 </div>
                    </div>
                ))

                }</>}

            </div>
            <div className="rightsection">
                <div className="headermsg">
                    <MdKeyboardBackspace className='mdc' onClick={e=>setlsection('leftsection')} />
             {
                activeid&&activeid.imgurl&&

        <img className='profmsg ' src={activeid.imgurl} alt="" />
             }
                    <h1>{activeid&&activeid.name}</h1>
                   
{calling&&<div className='calloo' >

    <p>{sender2&&sender2} is Calling...   </p>
    <div className="niu" onClick={e=>handleSubmitForm(sender2)}>
        <FaPhone className='po' />

    </div>
</div>

}
                    <FaPhone  onClick={e=>handleSubmitForm(activeid.email)} style={{
                        position:'absolute',
                        top:25,
                        right:10,
                        cursor:'pointer',
                        color:'rgb(93, 105, 212)',
                        fontSize:20

                    }} />

                </div>
                <div className="messagesall" ref={messageEl}>
                    {messages&&messages.length>0?messages.map(val=>(

                        val.senderid===senderids?
                        <div className="msgboxs">
                            <h1>{val.note}</h1>
                            <h3> <p>{val.date}</p> <p>{val.time}</p></h3>
                        </div>
                        :<div className="msgbox">
                        <h1>{val.note}</h1>
                        <h3> <p>{val.date}</p> <p>{val.time}</p></h3>
                    </div>

                    ))
:<>
<div className='startc'>
<img src={msgic} alt="" />
<h4>Start your conversations</h4>
</div>
</>
                    }
                    <div className="sendingnotes">
                        <input placeholder='Type note here...'  value={msg} type="text" onChange={e=>setmsg(e.target.value)} />
                        <button className='sendbtnb' onClick={e=>sendmsg()} >
                        {process?
                            <div className="loader">
                                
                            </div>:<RiSendPlaneFill />

                           }
                        </button>
                    </div>
                </div>


            </div>
          </div>
        </div></>
    )
}

export default Notes2