import React, { useCallback, useRef, useState } from 'react'
import { BiSearch, BiUserCircle } from 'react-icons/bi'
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
import { addNewChatToAdmin, addNewChatToSiteUser, addNewChatUserToAdmin, adminViewedMessage, createNote, findNotesbyIds, getAactiveSiteusers, getAllNotes, getTime, loginAdmin2 } from '../../../Utils/api';
const Notes2 = ({props}) => {

    const currentDatee = new Date();
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

const [senderids, setsenderids] = useState('')
const [sender, setsender] = useState('')
const [reciever, setreciever] = useState('') 
const [seen, setseen] = useState('false')
const [note, setnote] = useState('')
const [time, settime] = useState('02:23')
function submit() {
    var postData={
        sender:sender,
        reciever:reciever,
        recieverid:recid,
        seen:seen,
        note:note,
        time:time
    }
    createNote(postData).then( res=>{
        console.log(res)
        
    }).then(()=>{
        setadduser('adduser2')
         getAllNotes().then(res=>{
            console.log(res)
            setuserd(res.Notes)
    })
    })
    
}
const [userd, setuserd] = useState()
const [addedusers, setaddedusers] = useState()
const [userd2, setuserd2] = useState()
const [data2, setdata2] = useState()
const [sitestaff, setsitestaff] = useState()
const [timede, settimede] = useState('')
const [found, setfound] = useState(false)
useEffect(() => {
    var datec=new Date()

    var ustime=datec.toLocaleString("en-US", {hour12:false,timeZone: "America/New_York"})
settimede(ustime.split(',')[0])
    
    getAllNotes().then(res=>{
        console.log(res)
        setuserd(res.Notes)
    }).catch(err=>console.log(err))
 
    getAactiveSiteusers().then(resx=>{
        console.log(resx)
        var sstaff=resx.Siteuserd
        var postData={
            email:props
    
        }
        loginAdmin2(postData).then(res=>{
            
            console.log(res)
            setaddedusers(res.Admin)
            setEmailw(res.Admin.email)
            setsender(res.Admin.name)
            setsenderids(res.Admin._id)
            axios.get(`${tz}/super/getall`).then(resxx=>{
                console.log(resxx)
            
                var sstaff2=resxx.data.Supervisor
                setuserd2(  sstaff2.sort((a, b) => {
                    const dateA = res.Admin.contacts.find(obj => obj.userid === a._id)?.timestamp || '';
                    const dateB = res.Admin.contacts.find(obj => obj.userid === b._id)?.timestamp || '';
                
                    // Use the Intl.Collator to compare ISO 8601 date strings
                    return new Intl.Collator(undefined, { numeric: true }).compare(dateB, dateA);
                }))


        })
           
            
            // Sort arrayOfObjects2 based on the dates in arrayOfObjects
          setsitestaff(  sstaff.sort((a, b) => {
            const dateA = res.Admin.contacts.find(obj => obj.userid === a._id)?.timestamp || '';
            const dateB = res.Admin.contacts.find(obj => obj.userid === b._id)?.timestamp || '';
        
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
    var postData={
        _id:addedusers._id,
            name:val.name,
            userid:val._id,
            status:'No new chats',
            role:'User'
    
    
    
    
        }
   addNewChatToAdmin(postData).then(res2=>{  
    var postData2={
        _id:val._id,
            name:val.name,
            userid:addedusers._id,
            status:'No new chats',
            role:'User'
    
    
    
    
        }
            addNewChatToSiteUser(postData2).then(res2x=>{  
                
                    console.log(res2)
        
                    var postData3={
                        email:props
                
                    }
                    loginAdmin2(postData3).then(res=>{
                        setadduser('adduser2')
                        console.log(res)
                        setaddedusers(res.Admin)
                    }).catch(err=>console.log(err))
                
                })        
       
        })
}
    }

});
}
else{
    
    var postData={
        _id:addedusers._id,
            name:val.name,
            userid:val._id,
            status:'No new chats',
            role:'User'
    
    
    
    
        }
   addNewChatToAdmin(postData).then(res2=>{  
    var postData2={
        _id:val._id,
            name:val.name,
            userid:addedusers._id,
            status:'No new chats',
            role:'User'
    
    
    
    
        }
           addNewChatToSiteUser(postData2).then(res2x=>{  
                
                    console.log(res2)
        var postData3={
            email:props
     
         }
                   loginAdmin2(postData3).then(res=>{
                        setadduser('adduser2')
                        console.log(res)
                        setaddedusers(res.Admin)
                    }).catch(err=>console.log(err))
                
                })        
       
        })
}


}
const [activeid, setactiveid] = useState()

function openthischat(val,val2){
var postData={
    sender:addedusers._id ,
           user:val._id,
           unseen:0
   
       }
adminViewedMessage(postData).then( resx=>{
              
           })
    setutype(val2)
    console.log(val)
    setactiveid(val)
    var postData2={
      
        senderid:addedusers._id,
        recieverid:val._id
       }
   findNotesbyIds(postData2).then( res=>{
        setmessages(res.Notes)
        
        setlsection('leftsection leftsectionp')
        messageEl.current.addEventListener('DOMNodeInserted', event => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
          });
         
       })
    


}

const [msg, setmsg] = useState('')
function sendmsg(){
    setprocess(true)
    
    if(activeid){
       getTime().then(res1 => {
            console.log(res1)
    
            var dateput = res1.Date.split(', ')
           var postData={
            sender:sender,
            senderid:addedusers._id,
            reciever:activeid.name,
            recieverid:activeid._id,
            seen:'false',
            note:msg,
            time:dateput[1],
            date:dateput[0]
    
        }
        createNote(postData).then( res=>{
            console.log(res)
        
           if(utype==='user'){
            var postData2={
                sender: activeid._id,
                       user:addedusers._id,
                       unseen:1,
                       msg:msg,
               
                   }
           addNewChatToSiteUser(postData2).then( resx=>{
                      var postData3={
                        sender:addedusers._id,
                               user:activeid._id,
                               unseen:0,
                               msg:msg,
                       
                           }
                       addNewChatUserToAdmin(postData3).then( resx2=>{
                                  setadduser('adduser2')
                                  setmsg('')
                                  openthischat(activeid,utype)
                                  console.log(resx)
                  setprocess(false)
                  socket.emit('newmessage',{activeid:activeid._id,msg:{time:dateput[1],
                
               date:dateput[0],msg:msg },from:addedusers._id})
                  
                              })
       
                   })
           }
           else{
            axios.post(`${tz}/super/adduser`,{
                sender: activeid._id,
                       user:addedusers._id,
                       unseen:1,
                       msg:msg
               
                   }).then( resx=>{
                      
                       axios.post(`${tz}/admin/adduser`,{
                           sender:addedusers._id,
                                  user:activeid._id,
                                  unseen:0
                                  ,
                       msg:msg
                          
                              }, {
                                headers: {
                                    'Content-Type': 'application/json',
                                    // Add Authorization header with the token
                                    'Authorization': `${props}`
                                }
                            }).then( resx2=>{
                                  setadduser('adduser2')
                                  setmsg('')
                                  openthischat(activeid,utype)
                                  console.log(resx)
                  
                                  setprocess(false)
                                  socket.emit('newmessage',{activeid:activeid._id,msg:{time:dateput[1],
                                
                               date:dateput[0],msg:msg },from:addedusers._id})
                                  
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
        
        <div className="usersdatax fullwidthx">

          {  /*<div className="topusersdata fixedheader">
                <BiUserCircle className='usio' />
                <h1>Notes</h1>
              
                <button className='usiosub' onClick={e=>setadduser('adduser')}>+ Add Note</button>
               



            </div>*/
}
          <div className="messagesection hideshonmovil">
            <div  className={lsection}>
                <div className="fixedsearch">
                    <div className='boxmsgg'>
                        <p>Messages</p>
<h4>People, Supervisors etc</h4>



                    </div>
                    <div className="searchbar">
                     <BiSearch className='sear' />
                        <input type="text" onChange={e=>setsearchval(e.target.value)} placeholder='Search users' />
                    </div>
                    <div className="fltbtnsx">
                        <h3 style={{color:activeflt==='super'?'#5D69D4':'grey'}} onClick={e=>setactiveflt('super')}>Supervisors
              
                        </h3>
                        <h3 style={{color:activeflt==='user'?'#5D69D4':'grey'}} onClick={e=>setactiveflt('user')}>Users</h3>

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
          {searchval.length===0&&   <h3
                 className='nutp'
                 >{new Date(addedusers.contacts&&addedusers.contacts.find(person => person.userid === val._id).timestamp).getDate()===currentDatee.getDate()?'Today':
                 new Date(addedusers.contacts&&addedusers.contacts.find(person => person.userid === val._id).timestamp).getDate()===currentDatee.getDate()-1?'Yesterday':
                 `${
                    new Date(addedusers.contacts&&addedusers.contacts.find(person => person.userid === val._id).timestamp).getMonth()+1}/${
                 new Date(addedusers.contacts&&addedusers.contacts.find(person => person.userid === val._id).timestamp).getDate()}`}</h3>
             }
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
   
 {searchval.length===0&&
   <h3
   className='nutp'
   >{new Date(addedusers.contacts&&addedusers.contacts.find(person => person.userid === val._id).timestamp).getDate()===currentDatee.getDate()?'Today':
   new Date(addedusers.contacts&&addedusers.contacts.find(person => person.userid === val._id).timestamp).getDate()===currentDatee.getDate()-1?'Yesterday':
   `${
      new Date(addedusers.contacts&&addedusers.contacts.find(person => person.userid === val._id).timestamp).getMonth()+1}/${
   new Date(addedusers.contacts&&addedusers.contacts.find(person => person.userid === val._id).timestamp).getDate()}`}</h3>
}       
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
                   {searchval.length===0&&
                        <h3
                        className='nutp'
                        >{new Date(addedusers.contacts&&addedusers.contacts.find(person => person.userid === val._id).timestamp).getDate()===currentDatee.getDate()?'Today':
                        new Date(addedusers.contacts&&addedusers.contacts.find(person => person.userid === val._id).timestamp).getDate()===currentDatee.getDate()-1?'Yesterday':
                        `${
                           new Date(addedusers.contacts&&addedusers.contacts.find(person => person.userid === val._id).timestamp).getMonth()+1}/${
                        new Date(addedusers.contacts&&addedusers.contacts.find(person => person.userid === val._id).timestamp).getDate()}`}</h3>
                    

                   }
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

{
    searchval.length===0&&
    <h3
                 className='nutp'
                 >{new Date(addedusers.contacts&&addedusers.contacts.find(person => person.userid === val._id).timestamp).getDate()===currentDatee.getDate()?'Today':
                 new Date(addedusers.contacts&&addedusers.contacts.find(person => person.userid === val._id).timestamp).getDate()===currentDatee.getDate()-1?'Yesterday':
                 `${
                    new Date(addedusers.contacts&&addedusers.contacts.find(person => person.userid === val._id).timestamp).getMonth()+1}/${
                 new Date(addedusers.contacts&&addedusers.contacts.find(person => person.userid === val._id).timestamp).getDate()}`}</h3>
             
}
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
                activeid&&activeid.imgurl?

        <img className='profmsg ' src={activeid.imgurl} alt="" />:
        <img src={prof} alt="" className='profmsg' />
             }
                  <div className="sttus">
                  <h1>{activeid&&activeid.name}</h1>
                  <h6>Offline
                  </h6>
                  </div>
                   
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

                        <>
                           

                        <div className="msgboxs">
                            <h1>{val.note}</h1>
                            <h3> <p>{val.date}</p> <p>{val.time}</p></h3>
                        </div>
                        </>
                        :
                        
                        <>
                  
                        <div className="msgbox">
                        <h1>{val.note}</h1>
                        <h3> <p>{val.date}</p> <p>{val.time}</p></h3>
                    </div>
                    </>

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
            <div className="thirdsection">
                
            </div>
          </div>
        </div></>
    )
}

export default Notes2