import React,{useCallback} from 'react'
import "./Home.css"
import { MdOutlineDashboard, MdOutlinePayments } from 'react-icons/md'
import { CgMediaLive } from 'react-icons/cg'
import { TbDeviceDesktopAnalytics, TbBriefcase, TbChartInfographic } from 'react-icons/tb'
import { AiTwotoneSecurityScan, AiOutlineMenuFold, AiOutlineLogout } from 'react-icons/ai'
import { HiOutlineMenuAlt1 } from 'react-icons/hi'
import { FiCamera } from 'react-icons/fi'
import { BsClockHistory } from 'react-icons/bs'
import {AiOutlineSearch} from 'react-icons/ai'
import {BsFillBellFill} from 'react-icons/bs'
import { FaPhone, FaUserAlt } from 'react-icons/fa'
import {BiChevronRight} from 'react-icons/bi'
import { VscNote } from 'react-icons/vsc'
import { BiFileBlank } from 'react-icons/bi'
import lefta from '../../images/left.svg'
import {FaFileInvoiceDollar} from 'react-icons/fa'

import {BiSolidFolderOpen} from 'react-icons/bi'
import {MdOutlineMenu} from 'react-icons/md'
import { useState } from 'react'
import {BiBuildingHouse} from 'react-icons/bi'
import Dashboard from './Dashboard'
import 'react-calendar/dist/Calendar.css';
import {VscSourceControl} from 'react-icons/vsc'
import Users from './Users/Users'
import Presence from './Presence/Presence'
import Prod from './Productivity/Prod'
import Userdata from './Userdata/Userdata'
import {MdOutlineArrowForwardIos,MdOutlineArrowBackIosNew} from 'react-icons/md'
import Snapshot from './Snapshot/Snapshot'
import Apps from './App/App'
import Projects from './Projects/Projects'
import Track from './Track/Track'
import Reports from './Report/Report'
import Leave2 from './Leave/Leave2'
import Notes from './Notes/Notes'
import Emp from './Employeetype/Emp'
import Jobsite from './Jobsite/Jobsite'
import { useEffect } from 'react'
import Client from './Client/Client'
import ChPresence from './ChPresence/ChPresence'
import Admin from './Admin/Admin'
import { tz } from '../apis'
import axios from 'axios'

import lko from '../../images/lko2.png'


import home from '../../images/home.png'
import home2 from '../../images/hom2.png'


import comp from '../../images/comp.svg'
import comp2 from '../../images/comp2.png'


import live from '../../images/live.png'
import live2 from '../../images/live2.svg'


import doc from '../../images/doc.svg'
import doc2 from '../../images/doc2.svg'


import user from '../../images/user.svg'
import user2 from '../../images/user2.svg'


import prod from '../../images/prod.svg'
import prod2 from '../../images/prod2.svg'

import leave from '../../images/leave.svg'
import leave2 from '../../images/leave2.svg'



import gps from '../../images/gps.svg'
import gps2 from '../../images/gps2.svg'
import att from '../../images/att.svg'
import att2 from '../../images/att2.svg'


import chat from '../../images/chat.svg'
import chat2 from '../../images/chat2.svg'


import invoice from '../../images/invoice.svg'
import invoice2 from '../../images/invoice2.svg'
import bus from '../../images/bus.svg'

import beel from '../../images/beel.png'

import beel2 from '../../images/beel2.png'
import Notes2 from './Notes/Notes2'
import Chclient from './Client/Chclient'
import Menu from './Employeetype/Menu'
import Invoice from './Jobsite/invoice'
import Files from './Jobsite/Files'
import Formdat from './Formdata'
import { useSocket } from '../Context/SocketContext'
import { useNavigate } from 'react-router-dom'
import Siteview from './Jobsite/Siteview'
import Payrollfiles from './Jobsite/Payrollfiles'
const Sector = ({ radius, startAngle, endAngle, fillColor }) => {
  // Convert angles to radians
  const startRadians = (startAngle * Math.PI) / 180;
  const endRadians = (endAngle * Math.PI) / 180;

  // Calculate coordinates for the sector path
  const x1 = radius * Math.cos(startRadians);
  const y1 = radius * Math.sin(startRadians);
  const x2 = radius * Math.cos(endRadians);
  const y2 = radius * Math.sin(endRadians);

  // Create the path string for the sector
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1; // Determine if we need a large arc flag
  const pathData = `M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

  return (
    <svg width={radius * 2} height={radius * 2} viewBox={`-${radius} -${radius} ${radius * 2} ${radius * 2}`}>
      <path d={pathData} fill={fillColor} />
    </svg>
  );
};
const Home = () => {
    const [datax, setdatax] = useState()
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
  





useEffect(() => {



  if(localStorage.getItem('userid')&&localStorage.getItem('userid').length>0){
if(localStorage.getItem('emptype')==='admin'){

    axios.post(`${tz}/admin/login2`,
    {
        email:localStorage.getItem('username')
    }).then(res=>
        {
            console.log(res
                )
                setdatax(res.data.Admin)
        })
    
}
else{

    window.location.pathname='/user'
}
  }
  else{
    window.location.pathname='/login'
  }

  return () => {
    
  }
}, [])
function setis(val){
  seti(55)
  setTimeout(() => {
    seti(val)
  }, 100);
}

function logout(){
    localStorage.removeItem('userid')
    window.location.pathname='/login'
}
    const [i, seti] = useState(0)
    const [grp1, setgrp1] = useState('group1')
    const [grp2, setgrp2] = useState('group2')
    const [grp3, setgrp3] = useState('group2')
    function shsecond(){
        setgrp2('group1')
        setgrp3('group2')
        setgrp1('group2')
    }
    function shf(){
        setgrp2('group2')
        setgrp3('group2')
        setgrp1('group1')
    }
    
    function sht(){
        setgrp2('group2')
        setgrp3('group1')
        setgrp1('group2')
    }
    const [left, setleft] = useState('left')
    const [right, setright] = useState('right smallright')
    return (
    <>
    {datax&&
        <div className="dashboard">
        {calling&&<div className='calloo' >

<p>{sender2&&sender2} is Calling...   </p>
<div className="niu" onClick={e=>handleSubmitForm(sender2)}>
    <FaPhone className='po' />

</div>
</div>

}
        <div className={left}>
          {left==='left'?
            <h1 onClick={e=>setleft('left smallleft')}>
<img src={lko} onClick={e=>setleft('left smallleft')} className='lkologo' alt="" />

<div className="leftar">
  <img src={lefta} alt="" />
</div>

            </h1>:
            <div className="rnd" onClick={e=>setleft('left')}>
              <BiChevronRight className='rgt' />
            </div>

          }
            <h5 className='manax'>Management & HR</h5>
            <p className={`${grp1} ${i===0&&'activemenu'}`} onClick={e => setis(0)} >
              {i===0?              
           <img src={home} className='iconj'  alt="" />:
           <img src={home2} className='iconj' alt="" />
            }
               
                <p>Dashboard</p></p>

          {datax.stream==='Allowed'&&
            <p className={`${grp1} ${i===1&&'activemenu'}`} onClick={e => setis(1)}>
               {i===1?              
           <img src={live2} className='iconj'  alt="" />:
           <img src={live} className='iconj' alt="" />
            }<p>Live Stream</p></p>
          

          }
 {datax.company==='Allowed'&&
            <p className={`${grp2} ${i===16&&'activemenu'}`} onClick={e => setis(16)} >
              
              {i===16?              
           <img src={comp} className='iconj'  alt="" />:
           <img src={comp2} className='iconj' alt="" />
            }
               
               <p>Company</p></p>

          }  
  {datax.site==='Allowed'&&
           <p className={`${grp2} ${i===13&&'activemenu'}`} onClick={e => setis(13)} > <BiBuildingHouse className='iconj' /> <p>Site Projects</p></p>
           
          }

{datax.staff==='Allowed'&&
          
          <p className={`${grp1} ${i===5&&'activemenu'}`} onClick={e => setis(5)} >
            
            {i===5?              
           <img src={user2} className='iconj'  alt="" />:
           <img src={user} className='iconj' alt="" />
            } <p>Manage Users</p></p>
             
          }

 
{datax.productivity==='Allowed'&&
          
          <p className={`${grp1} ${i===4&&'activemenu'}`} onClick={e => setis(4)}> 
 {i===4?              
           <img src={prod} className='iconj'  alt="" />:
           <img src={prod2} className='iconj' alt="" />
            }<p>Productivity</p></p>
            
          }
            {datax.presence==='Allowed'&&
          
          <p className={`${grp1} ${i===2&&'activemenu'}`} onClick={e => setis(2)}>
            {i===2?              
           <img src={att} className='iconj'  alt="" />:
           <img src={att2} className='iconj' alt="" />
            } <p>Attendance</p></p>
           
          }
            {datax.presence==='Allowed'&&
          
          <p className={`${grp1} ${i===2&&'activemenu'}`} onClick={e => setis(87)}><TbDeviceDesktopAnalytics className='iconj' /> <p>Live view</p></p>
           
          }
           {datax.presence==='Allowed'&&
          
          <p className={`${grp1} ${i===2&&'activemenu'}`} onClick={e => setis(41)}><MdOutlinePayments className='iconj' /> <p>Payroll</p></p>
           
          }
           {datax.company==='Allowed'&&
          <p className={`${grp2} ${i===61&&'activemenu'}`} onClick={e => setis(61)} > 
        {i===61?              
           <img src={invoice} className='iconj'  alt="" />:
           <img src={invoice2} className='iconj' alt="" />
            } <p>Invoicing</p></p>

        }

           <p  className={`${grp1} ${i===0&&'activemenu'} gri`} onClick={e => shsecond()} > <MdOutlineArrowForwardIos className='iconj' /> <p>Staff</p></p>


            <p className={`${grp2} ${i===0&&'activemenu'} gri`} onClick={e => shf()} > <MdOutlineArrowBackIosNew className='iconj' /> <p>Staff</p></p>
          
            <p className={`${grp3} ${i===9&&'activemenu'}`}  onClick={e => setis(32)}> 
            {i===32?              
           <img src={doc} className='iconj'  alt="" />:
           <img src={doc2} className='iconj' alt="" />
            }<p>Forms</p></p>

<h5 className='mana'> Workspace</h5>
    {datax.snaps==='Allowed'&&
             <p className={`${grp2} ${i===6&&'activemenu'}`} onClick={e => setis(6)}><FiCamera className='iconj'  /> <p>Snapshots</p></p>
            
          }
    {datax.apps==='Allowed'&&
            <p className={`${grp2} ${i===7&&'activemenu'}`} onClick={e => setis(7)}><VscNote className='iconj' /> <p>Applications</p></p>
          
          }


           
          
            
          
          <p className={`${grp2} ${i===0&&'activemenu'} gri`}  onClick={e => sht()} > <MdOutlineArrowForwardIos className='iconj' /> <p>Staff</p></p>

            <p className={`${grp3} ${i===0&&'activemenu'} gri`}  onClick={e => shsecond()} > <MdOutlineArrowBackIosNew className='iconj' /> <p>Staff</p></p>
          
{datax.gps==='Allowed'&&
             <p className={`${grp3} ${i===9&&'activemenu'}`}  onClick={e => setis(9)}>
            {i===9?              
           <img src={gps} className='iconj'  alt="" />:
           <img src={gps2} className='iconj' alt="" />
            }<p>GPS Location</p></p>

           
          }
    {datax.leave==='Allowed'&&
            <p className={`${grp3} ${i===11&&'activemenu'}`} onClick={e => setis(11)}>
           {i===11?              
           <img src={leave} className='iconj'  alt="" />:
           <img src={leave2} className='iconj' alt="" />
            }<p>Leave</p></p>
           
          }

          
          <p className={`${grp3} ${i===12&&'activemenu'}`} onClick={e => setis(12)}> 
          {i===12?              
           <img src={chat} className='iconj'  alt="" />:
           <img src={chat2} className='iconj' alt="" />
            }<p>Notes</p> <div className="nut nutx">{datax.contacts&&datax.contacts.map(obj => obj.unseen).reduce((a, b) => a + b, 0)}</div> </p>
         
          <h5 className='mana'> General</h5>
          {datax.reports==='Allowed'&&
             <p  className={`${grp3} ${i===10&&'activemenu'}`} onClick={e => setis(10)}><BsClockHistory className='iconj' /><p>Reports</p></p>
            
          }
    {datax.admin==='Allowed'&&
              <p className={`grts ${i===14&&'activemenu'}`} onClick={e => setis(14)}> <VscSourceControl className='iconj' /> <p>Admin Control</p></p>
            
          }
           
          <p className={`grts ${i===8&&'activemenu'}`} onClick={e => setis(8)}> <TbBriefcase className='iconj' /> <p>Projects</p></p>
            <p className={`${grp3} ${i===123&&'activemenu'}`} onClick={e=>logout()}><AiOutlineLogout className='iconj' /><p>Logout</p></p>


        </div>
        <div className="mobileleft">
         
         
  {datax.presence==='Allowed'&&
          
          <p className={`${grp1} ${i===2&&'activemenu'}`} onClick={e => setis(2)}><TbDeviceDesktopAnalytics className='iconj' /> <p>Attendance</p></p>
           
          }


{datax.staff==='Allowed'&&
          
          <p className={`${grp1} ${i===5&&'activemenu'}`} onClick={e => setis(5)} > <FaUserAlt className='iconj' /> <p>Manage Users</p></p>
             
          }
<div className="btnhh">
<p className={`${grp1} ${i===0&&'activemenu'}`} onClick={e => setis(0)} > <MdOutlineDashboard className='iconj' /> </p>

</div>
   {datax.site==='Allowed'&&
           <p className={`${grp1}  ${i===13&&'activemenu'}`} onClick={e => setis(13)} > <BiBuildingHouse className='iconj' /> <p>Site Projects</p></p>
           
          }
           {datax.company==='Allowed'&&
            <p className={`${grp1}  ${i===16&&'activemenu'}`} onClick={e => setis(46)} > <MdOutlineMenu className='iconj' /> <p>More</p></p>

          }


        </div>
        <div className={right}>
          <div className="rheader">

            <div className="h1">
              {i===16?
          <>
            <h1 className='headering'>
              Company
            </h1> 
             <p className='headeringpara' >
             Companies are basically registered clients
           </p></>
            :
               i===0?
               <>
               <h1 className='headering' >
                  Dashboard
                </h1>
                <p className='headeringpara' >
                  Let's overview important updates
                </p>
               </>
                :
            i===2?
         <h1 className='headering'>Timesheets</h1>   :

            <></> 
            }
            </div>
           

<div className="menucentr">
  <input type="text" placeholder='Search features..' />

</div>
<div className="menuend">

 <img src={beel2} className='iconbeel' alt="" />
 <img src={beel} className='iconbeel' alt="" />
  <div className="grcircle">

  </div>
  Alex
</div>
          </div>
            {
                i === 0 &&
                <Dashboard />

            }{i === 1 &&
                <Users />

            }
            {i === 46 &&
                <Menu />

            }
            {i === 2 &&
                <ChPresence />

            }
            {i === 4 &&
                <Prod />

            }
             {i === 87 &&
                <Siteview />

            }
            {
                i === 5 &&
                <Emp />
            }
            {i===6&&
            <Snapshot />

            }
              {i===7&&
            <Apps />

            }
            {i===8&&
            <Projects />

            }
            {i===9&&
            <Track />

            }
              {i===10&&
            <Reports />

            }
            {i===11&&
            <Leave2 />

            }
            {i===12&&
            <Notes2 />
            

            }
             {i===13&&
            <Jobsite />
            

            }
            {i===16&&
           <Chclient />
           

           }
           {i===14&&
          <Admin />
          

          } {i===62&&
            <Files />
            
  
            }{i===61&&
              <Files />
              
    
              }
              {i===41&&
              <Payrollfiles />
              
    
              }
              
              
              {i===32&&
                <Formdat />
                
      
                }


        </div>
    </div>

    }
    </>
    )
}

export default Home