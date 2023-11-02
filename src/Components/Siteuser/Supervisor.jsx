import React from 'react'
import { FaRegBell } from 'react-icons/fa'
import { BiLogOutCircle } from 'react-icons/bi'
import './Siteuser.css'
import { BsCreditCard2FrontFill } from 'react-icons/bs'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'

import u from '../../images/u.jpeg'

import { FaPencilAlt} from 'react-icons/fa'
import {IoClose} from 'react-icons/io5'
import {HiUser} from 'react-icons/hi'
import {BiFileBlank} from 'react-icons/bi'
import {BsClockFill} from 'react-icons/bs'
import {RiCloseFill} from 'react-icons/ri'

import {TbBuildingCommunity} from 'react-icons/tb'
import { FaUserAlt } from 'react-icons/fa'
import {AiOutlineSearch} from 'react-icons/ai'
import {BsFillBellFill} from 'react-icons/bs'
import {FaFileInvoiceDollar} from 'react-icons/fa'
import {FiLogOut} from 'react-icons/fi'
import {AiOutlineSwap} from 'react-icons/ai'
import aa from '../../images/aa.png'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {FaUserCheck,FaUserTimes,FaUserEdit,FaBuilding} from 'react-icons/fa'
import prof from '../../images/prof.png'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'
import { useState } from 'react'
import { BiUserCircle } from 'react-icons/bi'
import { FiDownload } from 'react-icons/fi'

import { AiOutlineReload } from 'react-icons/ai'
import { AiOutlineDashboard } from 'react-icons/ai'
import ReactToPrint from 'react-to-print';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaRegBuilding } from 'react-icons/fa'
import { GrFormClose } from 'react-icons/gr'
import XLSX from 'sheetjs-style'
import jsPDF from 'jspdf';
import { TbBuildingFactory2 } from 'react-icons/tb'
import * as file from 'file-saver'
import axios from 'axios'
import { useEffect } from 'react';
import { tz } from '../apis';
import { TbFileInvoice } from 'react-icons/tb'
import { useRef } from 'react'
import { IoAnalytics } from 'react-icons/io5'
import { AiOutlineProfile, AiOutlineMessage } from 'react-icons/ai'
import date from 'date-and-time';
import Attendence from './Attendence'
import Leave from './Leave'
import Notes from './Notes'
import Profile2 from './Profile2'
import Reports from './Reports'
import Empnotes from '../Home/Notes/Empnotes'
import Supernotes from '../Home/Notes/Supernotes'
import SwipeableButton from './Button'

const Supervisor = () => {
    
  const [value, value2] = useState(new Date());

  function onxhange(e){


    var ustime=e.toLocaleString("en-US", {hour12:false})
    console.log(ustime)
    setshowcalender(false)
    var yt=ustime.split(', ')
    setdatep(yt[0])
    console.log(yt[0])
    mopenthis(project,yt[0])
  }
  function mopenthis(val,datex) {
    setchkou(0)
    setpending2([])

   
        setdatep(datex)
        axios.post(`${tz}/siteatt/findbydateandproject`, {
            date: datex,    
            id: val._id
        }).then(rex => {

            val.user.forEach(ele => {
                var y = 0
                rex.data.Siteatt.forEach((ele2, index) => {
                    if (ele2.userid === ele.userid) {
                        y = 1
                    }

                    if (index === rex.data.Siteatt.length - 1) {
                        if (y === 0) {

                            setpending2(pending2 => [...pending2, ele])
                        }
                    }


                });
            });

            setclk(rex.data.Siteatt)
            rex.data.Siteatt.forEach(element => {
                if (element.chkouttime !== '-') {
                    setchkou(chkou => chkou + 1)

                }
            });


        })

   

}
const [searchvalu, setsearchvalu] = useState('')
const [datep, setdatep] = useState('')
const [openp, setopenp] = useState(false)
const [showcalender, setshowcalender] = useState(false)
const [prodata, setprodata] = useState()
    const [pending2, setpending2] = useState([])
    const [chkou, setchkou] = useState(0)
    const [clk, setclk] = useState()
    function openthis(val) {
        setchkou(0)

        axios.get(`${tz}/att/time`).then(resx => {
            console.log(resx)

            var dateput = resx.data.Date.split(', ')
            setdatep(dateput[0])
            axios.post(`${tz}/siteatt/findbydateandproject`, {
                date: dateput[0],
                id: val._id
            }).then(rex => {

                setpending2([])
                val.user.forEach(ele => {
                    var y = 0
                    rex.data.Siteatt.forEach((ele2, index) => {
                        if (ele2.userid === ele.userid) {
                            y = 1
                        }

                        if (index === rex.data.Siteatt.length - 1) {
                            if (y === 0) {

                                setpending2(pending2 => [...pending2, ele])
                            }
                        }


                    });
                });

                setclk(rex.data.Siteatt)
                rex.data.Siteatt.forEach(element => {
                    if (element.chkouttime !== '-') {
                        setchkou(chkou => chkou + 1)

                    }
                });


            })

        })

    }
const [changep, setchangep] = useState('Change Profile')
    function fileupload(filex){
        setchangep('Uploading...')
        var d= new Date()
        console.log(d.getTime())
        
    const storage = getStorage();
    const storageRef = ref(storage, `images/${d.getTime().toString()}`);
    
    const uploadTask = uploadBytesResumable(storageRef, filex);
    
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        // Handle unsuccessful uploads
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
    
          var uu2 = localStorage.getItem('siteuserid')
          axios.post(`${tz}/super/profilechange`,{
             
             
         _id:uu2,
         imgurl:downloadURL
        }).then((resa2)=>{
            alert('Profile picture changed successfully')
            window.location.reload()
    
            
           
    
        })
    
    
        });
      }
    );
    }
    
    const [notibox, setnotibox] = useState('notibox2')
    const componentRef = useRef();
    const componentRef2 = useRef();
    const [datec, setdatec] = useState('')
    const [grey, setgrey] = useState(false)
    const [attid, setattid] = useState()
    const [allg, setallg] = useState(false)
    const [show, setshow] = useState(false)
    const [siteall, setsiteall] = useState()
    const [chkintime, setchkintime] = useState('')
const [allactive, setallactive] = useState()
const [allprojects, setallprojects] = useState()
    useEffect(() => {

 

        var uu = localStorage.getItem('siteuserapi')
        var uu2 = localStorage.getItem('siteuserid')
        var utype = localStorage.getItem('siteusertype')
        if (uu && uu2 && uu2.length > 2 && uu === '^%$234' && utype === 'supervisor') {
            axios.get(`${tz}/siteuser/active`).then(res1 => {
setallactive(res1.data.Siteuserd)
            })
            axios.post(`${tz}/super/find`, {
                Supervisor_id: uu2
            }).then(res1 => {
                console.log(res1)
                setuser(res1.data.Supervisor[0])

                axios.get(`${tz}/jobsite/getall`).then(res2 => {
setallprojects(res2.data.Jobsite)
                })
                axios.post(`${tz}/jobsite/find`, {
                    Jobsite_id: res1.data.Supervisor[0].siteid
                }).then(res2 => {
                    console.log(res2)
                    setshow(true)
                    res2.data.Jobsite&&setproject(res2.data.Jobsite[0])



                    axios.post(`${tz}/siteatt/findbyproject`,{
                        
                        id:res2.data.Jobsite&&res2.data.Jobsite[0]._id
            
                    }).then(res2m => {
                        console.log(res2m)
                      if(res2m.data.Siteatt.length>0){
                        
                            var date = new Date();
                            var day = date.getDay();
                            var prevMonday = new Date();
                            if(date.getDay() == 0){
                                prevMonday.setDate(date.getDate() - 7);
                            }
                            else{
                                prevMonday.setDate(date.getDate() - (day-1));
                            }

                            var rt= new Date('2023-04-23')
                        console.log(prevMonday)
                        console.log(prevMonday>rt)
                        
                     prepare(res2m.data.Siteatt,res2.data.Jobsite[0].user,prevMonday)
                    }
                    else{


                        prepare2(res2m.data.Siteatt,res2.data.Jobsite[0].user,prevMonday)
                    }
                    })
                    




                    res2.data.Jobsite&&
                    openthis(res2.data.Jobsite[0])


                })

            })
        }
        else {
            window.location.pathname = 'userlogin'
        }
        return () => {

        }
    }, [])
    const [attreport, setattreport] = useState([])
    const [prmo, setprmo] = useState()
    
function prepare(atts,users,prevMonday){
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    users.forEach(element => {
        var u={user:element.userid,
            payrate:element.payrate,
            name:element.name,

            perdiem:element.perdiem,

            onperdiem:element.onperdiem,
            att:[],
            wh:0,
        
        }
        
        var wh=0;
        var wm=0;
        atts.forEach(val => {
            var ty=val.date.split('/')
            console.log(ty)
            let date_1 = new Date(`${ty[0]}/${ty[1]}/${ty[2]}`);
    let date_2 = new Date(prevMonday);       
    setprmo(date_2) 
    var d = new Date(`${ty[0]}/${ty[1]}/${ty[2]}`);

    console.log(d)      
    
var dayName = days[d.getDay()];
    if(date_1>date_2&&val.userid===element.userid){
        
        var tx=val.workinghours!=='-'?val.workinghours.split(':'):[0,0]
        wh=parseInt(tx[0])+wh
        wm=parseInt(tx[1])+wm
console.log(wh)
console.log(wm)
        u.att.push({
            date:val.date,
            day:dayName,
            wh:tx[0],

        
        })
    }
    
  
            
        
        });
        u.wh=Math.floor(wh)
        
        console.log(u)
           setattreport(pr => [...pr,u])
    });
}

function prepare2(atts,users,prevMonday){
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    users.forEach(element => {
        var u={user:element.userid,
            name:element.name,
            att:[],
            wh:0,
        
        }
        
        var wh=0;
        var wm=0;
      
           setattreport(pr => [...pr,u])
    });
}
    const [user, setuser] = useState()
    const [project, setproject] = useState()
    function logout() {



        localStorage.removeItem('siteuserid')
        localStorage.removeItem('siteuserapi')
        window.location.reload()

    }
    const [i, seti] = useState(97)

    const [notibox2, setnotibox2] = useState('notibox3 notibox2')

    const [open, setopen] = useState(0)
    const [linked, setlinked] = useState([])
    const [att, setatt] = useState()
    function open2(val) {
        axios.post(`${tz}/siteatt/findbynameandproject`, {
            id: user._id,
            pid: val
        }).then(resq => {
            console.log(resq)
            setatt(resq.data.Siteatt)
            seti(49)




        })
    }
    const [cprojectname, setcprojectname] = useState('')
    function setcproject2(val){
        var tr=val.split('#1234')
        setcproject(tr[0])
        setcprojectname(tr[1])

    }
    const [cproject, setcproject] = useState('')
function viewprof(val){
    axios.post(`${tz}/siteuser/find`,{
        Siteuserd_id:val,
    }).then(res2 => {
        console.log(res2)
        setprodata(res2.data.Siteuserd[0])
        setopenp(true)
       
    })

}
const [allwill, setallwill] = useState('allwill2')
function setsallwill(){
    setallwill('allwill')
setallactive(allactive.filter(ar => !project.user.find(rm => (rm.userid === ar._id) )))

}
const [process, setprocess] = useState(false)
function clockin(user) {
    
setprocess(true)

    axios.get(`${tz}/att/time`).then(res => {

        var dateput = res.data.Date.split(', ')
        var late = dateput[1].split(':')
        setchkintime(dateput[1])

     

        axios.post(`${tz}/siteatt/findbydateandname`, {
date:dateput[0],
id:user.userid

        }).then(res3=>{
            console.log(res3)
            if(res3.data.Siteatt.length===0){
                axios.post(`${tz}/siteatt/add`, {
                    empno:user.empno,
                    projectid: project._id,
                    date: dateput[0],
                    time: dateput[1],
                    chkouttime: '-',
                    status: 'Present',
                    userid: user.userid,
                    username: user.name,
                    late: 'On time',
                    projectname:project&&project.sitename,
                    workinghours:'-',
                    perdiem:user.perdiem,
                    onperdiem:user.onperdiem,
                    food:user.food
    
    
                }).then(res2 => {
                    console.log(res2)
                    openthis(project)
                    axios.post(`${tz}/siteatt/findbydateandchk`, {
                        date:dateput[0],
                        id:user._id,
                        chkouttime:'-'
                    }).then(resq => {
                        console.log(resq)
                        setprocess(false)
                    setselected('')
        
        
                    })
    
                    setgrey(true)
    
                })
            }
            else{
alert('Already clocked in Page is going to reload')
window.location.reload()
            }
        })
          
        
    })



}
function clockinx(user) {
console.log(user)

    axios.get(`${tz}/att/time`).then(res => {

        var dateput = res.data.Date.split(', ')
        var late = dateput[1].split(':')
        setchkintime(dateput[1])

     

            axios.post(`${tz}/siteatt/add`, {
                empno:user.empno,
                projectid: project._id,
                date: dateput[0],
                time: dateput[1],
                chkouttime: '-',
                status: 'Present',
                userid: user.userid,
                username: user.username,
                late: 'On time',
                projectname:project&&project.sitename,
                workinghours:'-'


            }).then(res2 => {
                console.log(res2)
                openthis(project)
                axios.post(`${tz}/siteatt/findbydateandchk`, {
                    date:dateput[0],
                    id:user._id,
                    chkouttime:'-'
                }).then(resq => {
                    console.log(resq)
                
    
    
                })

                setgrey(true)

            })
        
    })



}
function findday(att){
var att2=att
    var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];
days.forEach((ele,index2) => {
    var found=false
   if( att2.length>0){ 
   att2.forEach((element,index) => {
      if(element.day&&element.day===ele){
        found=true


      }  
      if(index===att2.length-1&&found===false){
       
        att2.push({

            date:'0/0/0',
            day:ele,
            wh:'0',
        })

      }
    })}
    else{
      
              att2.push({
      
                  date:'0/0/0',
                  day:ele,
                  wh:'0',
              })
      
            
          
    }
});
return att2    
}

const [selected, setselected] = useState('')
function selectthisuser(val){
    setselected(val)
}
function updatesite()

{
    
    var uu2 = localStorage.getItem('siteuserid')
    axios.post(`${tz}/super/updatesite`, {
    _id: uu2,
    site:cprojectname,
    siteid:cproject
}).then(res1 => {
    window.location.reload()

})
    
}

function setformanreports(val){
    console.log(attreport)
    var attr=attreport

    attr.forEach((element,index) => {
       element.att= findday(element.att)
       if(index===attr.length-1){
        setattreport(attr)
       }

    });

    setformanreport(true)

}

function hyu() {
setattreport([])
        var uu = localStorage.getItem('siteuserapi')
        var uu2 = localStorage.getItem('siteuserid')
        var utype = localStorage.getItem('siteusertype')
      
           
            axios.post(`${tz}/super/find`, {
                Supervisor_id: uu2
            }).then(res1 => {
                console.log(res1)
                setuser(res1.data.Supervisor[0])
               
                axios.post(`${tz}/jobsite/find`, {
                    Jobsite_id: res1.data.Supervisor[0].siteid
                }).then(res2 => {
                    console.log(res2)
                    setshow(true)
                    res2.data.Jobsite&&setproject(res2.data.Jobsite[0])



                    axios.post(`${tz}/siteatt/findbyproject`,{
                        
                        id:res2.data.Jobsite&&res2.data.Jobsite[0]._id
            
                    }).then(res2m => {
                        console.log(res2m)
                      if(res2m.data.Siteatt.length>0){
                        
                            var date = new Date();
                            var day = date.getDay();
                            var prevMonday = new Date();
                            if(date.getDay() == 0){
                                prevMonday.setDate(date.getDate() - 7);
                            }
                            else{
                                prevMonday.setDate(date.getDate() - (day-1));
                            }

                            var rt= new Date('2023-04-23')
                        console.log(prevMonday)
                        console.log(prevMonday>rt)
                        
                        
                     prepare(res2m.data.Siteatt,res2.data.Jobsite[0].user,prevMonday)
                    }
                    else{


                    }
                    })
                    




                    res2.data.Jobsite&&
                    openthis(res2.data.Jobsite[0])


                })

            })
      
    
}
const [showusers, setshowusers] = useState('ci')
const [adduser, setadduser] = useState('adduser2')
function addthis(val){


    axios.post(`${tz}/jobsite/adduser`,{
_id:project._id,
        name:val.name,
        userid:val._id,
        payrate:val.payrate,
        otpayrate:val.otpayrate,
        paid:0,
        skill:val.skill,
        empno:val.idno,  
        taxes:val.taxes,  
        nc:val.nc,  
    }).then(resm => {
setallwill('allwill2')

setallactive(allactive.filter(ar => !(val._id===ar._id) ))
hyu()
    }
)}
function setdisplay(val){
    setshowusers(val)

}
    function openhistory() {
        setlinked([])
        if (user.linkedsites && user.linkedsites.length > 0) {
            siteall.forEach(element => {

                user.linkedsites.forEach(ele => {
                    if (element._id === ele.projectid) {

                        setlinked(linked => [...linked, element])
                    }
                });

            });

            seti(48)
        }
        else {
            alert('No History found')
        }

    }

    useEffect(() => {
      
        setadduser('adduser2')
          return () => {
            
          }
        }, [i])
    const [searchval, setsearchval] = useState('')
    const [atten, setatten] = useState(false)
    function clockout(val){


       
        var t1=chkintime


        axios.post(`${tz}/siteuser/find`,{

            Siteuserd_id:val.userid
        }).then(resm => {

            axios.get(`${tz}/att/time`).then(res => {

                var dateput = res.data.Date.split(', ')
                var late = dateput[1].split(':')
    
                axios.post(`${tz}/siteatt/findbydateandname`, {
                    date:dateput[0],
                    id:val.userid,
                }).then(resqa => {
        console.log(resqa)
    
        
        var t2=dateput[1]
        var t=resqa.data.Siteatt[0].time.split(":")
        var tx=t2.split(":")
        var chkin=parseInt(t[0])*60+parseInt(t[1])
        var chkut=parseInt(tx[0])*60+parseInt(tx[1])
      var minsa=(chkut-chkin)%60
       var hrsa=Math.floor((chkut-chkin)/60)
    
                axios.post(`${tz}/siteatt/updatetimelat`, {
                    _id:val._id,
                    time: dateput[1],
                    wh:`${hrsa}:${minsa}`,
                    wages:Math.ceil(hrsa*resm.data.Siteuserd[0].payrate+(minsa/60)*resm.data.Siteuserd[0].otpayrate)
    
                }).then(res2 => {
                    console.log(res2)
                    setgrey(false)
                    openthis(project)
                    setselected('')
        
        
                
    
    
    
                })
                })
    
                
             
            })
        })

    }
    function setis(){
        seti(988)
        setshowusers('ci')
    }
    
    const [formanreport, setformanreport] = useState(false)
    const [report, setreport] = useState(false)
    function openreport(){
        setreport(true)
        

    }
    function setvalues(val){
        setdisplay2(true)
        setshowusers(val)
    }
    const [display2, setdisplay2] = useState(false)
    return (
        <>    
        
        {openp&&
        <div className="profio">
               <div className="profilepage maxsizing">
                <RiCloseFill className='ioyt' onClick={e=>setopenp(false)} />
           <img src={prof} alt="" />
           <h1>Name:</h1>
           <h6>{prodata.name}</h6> 
            <h1>Skill:</h1>
           <h6>{prodata.skill}</h6>
        
           <h1>Phone :</h1>
           <h6  > <a href={`tel:${prodata.phone}`}>{prodata.phone}</a> </h6>
           <h6></h6>
           <h1>Status:</h1>
           <h6>{prodata.status}</h6>
   
           
       </div>
        </div>

        }   {show &&
            <>
            {atten===false?<div className='dashsite'>
{formanreport&&
  <div className="eas">
  <ReactToPrint
 
 trigger={() => <button className='ss33'>Export To pdf!</button>}
 content={() => componentRef2.current}
/>

<button className='ss333' onClick={e=>setformanreport(false)}>Cancel</button>

 <div className="a4" ref={componentRef2}>
    <div className="rw1">
        <div className="rwdiv1">
            <h1>232323</h1>
            <p>Week Ending</p>
            <h1>232323</h1>
            <p>Time keeper Sign</p>
            <h1>232323</h1>
            <p>Foreman's sign</p>

        </div>
        <div className="rwdiv2">
         <h3>   Foreman's Report</h3>
         <h4>
            {project&&project.clientname}</h4>

        </div>
        <div className="rwdiv1">
            <div className="undertexr">
                Job no: <div className="underlinea">
                   {project&&project.no}
                </div>
            </div>
            <div className="undertexr">
                Project: <div className="underlinea">
                    {project&&project.sitename}
                </div>
            </div>
            <div className="undertexr">
                Location: <div className="underlinea">
                  {project&&project.address.substring(0,25)}
                </div>
            </div>

        </div>
    </div>

    <div className="tablef2or">
        <div className="tablef2orhead">
            <div className="subbox2 subbox1">
                Employee Name


            </div>
            <div className="subbox2">

            </div>
            
            <div className="subbox2">
                
            </div>
            <div className="subbox2">
                MON
            </div>
            <div className="subbox2">
                TUE
            </div>
            <div className="subbox2">
              WED  
            </div>
            <div className="subbox2">
                THU
            </div>
            <div className="subbox2">
                FRI
            </div>
            <div className="subbox2">
               SAT 
            </div>
            <div className="subbox2">
                SUN
            </div>
            <div className="subbox2">
                TOTAL
            </div>

        </div>
          <div className="tablef2orhead">
            <div className="subbox2 subbox1">


            </div>
            <div className="subbox2">
<div className="subpart2">

</div>
<div className="subpart">
    
</div>
            </div>
            <div className="subbox2">
            <div className="subpart2">

</div>
<div className="subpart">
    
</div>
            </div>
            <div className="subbox2">
            <div className="subpart2">
REG
</div>
<div className="subpart">
    OT
</div>
            </div>
            <div className="subbox2">
            <div className="subpart2">
                REG

</div>
<div className="subpart">
    OT
    
</div>
            </div>
            <div className="subbox2">
            <div className="subpart2">
                REG

</div>
<div className="subpart">
    OT
    
</div>
            </div>
            <div className="subbox2">
            <div className="subpart2">
                REG

</div>
<div className="subpart">
    OT
    
</div>
            </div>
            <div className="subbox2">
            <div className="subpart2">
                REG

</div>
<div className="subpart">
    OT
    
</div>
            </div>
            <div className="subbox2">
            <div className="subpart2">
                REG

</div>

<div className="subpart">
    OT
    
</div>
            </div>
            <div className="subbox2">
            <div className="subpart2">
                REG

</div>
<div className="subpart">
    OT
    
</div>
            </div>
           
            <div className="subbox2">
            <div className="subpart2">
REG
</div>
<div className="subpart">
OT    
</div>
            </div>

        </div>
       {attreport.length>0&&
       attreport.map(val=>(
        <div className="tablef2orhead tablef2orheadx">
        <div className="subbox2 subheight subbox1">
<p>{val.name}</p>

        </div>
        <div className="subbox2">
<div className="subpart2">

</div>
<div className="subpart">

</div>
        </div>
        <div className="subbox2">
        <div className="subpart2">

</div>
<div className="subpart">

</div>
        </div>
        <div className="subbox2">
        <div className="subpart2">
{val.att.map(element => (
    <>{
        element.day==='Monday'&&element.wh}</>
    
))}
</div>
<div className="subpart">

</div>
        </div>
        <div className="subbox2">
        <div className="subpart2">
        {val.att.map(element => (
    <>{
        element.day==='Tuesday'&&element.wh}</>
    
))}

</div>
<div className="subpart">


</div>
        </div>
        <div className="subbox2">
        <div className="subpart2">
        {val.att.map(element => (
    <>{
        element.day==='Wednesday'&&element.wh}</>
    
))}

</div>
<div className="subpart">
<div className="subpart">
    <h1>How to as</h1>
</div>

</div>
        </div>
        <div className="subbox2">
        <div className="subpart2">
            
        {val.att.map(element => (
    <>{
        element.day==='Thursday'&&element.wh}</>
    
))}
</div>
<div className="subpart">


</div>
        </div>
        <div className="subbox2">
        <div className="subpart2">
        {val.att.map(element => (
    <>{
        element.day==='Friday'&&element.wh}</>
    
))}

</div>
<div className="subpart">


</div>
        </div>
        <div className="subbox2">
        <div className="subpart2">
        {val.att.map(element => (
    <>{
        element.day==='Saturday'&&element.wh}</>
    
))}

</div>
<div className="subpart">


</div>
        </div>
        <div className="subbox2">
        <div className="subpart2">
            
        {val.att.map(element => (
    <>{
        element.day==='Sunday'&&element.wh}</>
    
))}

</div>
<div className="subpart">

<div className="absval">
    
Total
</div>

</div>
        </div>
       
        <div className="subbox2">
        <div className="subpart2">
            {val.wh>40?40:val.wh}
            <div className="absval">
                
            {val.wh>40?40:val.wh}
            </div>

</div>
<div className="subpart">
<div className="absval avf">
    
{val.wh>40?val.wh-40:0}
<div className="absval ">
                
{val.wh>40?val.wh-40:0}
                </div>
</div>
</div>
        </div>

    </div>
       ))

       }
    </div>

    <div className="rwdiv1x">
            <div className="undertexrx undertexr">
                Authorizing Signature: <div className="underlinea underline2">
               
                </div>
            </div>
            <div className="undertexr undertexrx">
            Authorizing Signature: <div className="underlinea underline2">
                 
                </div>
            </div>

        </div>
 </div>
</div>

}
{display2&&
<div className="eas">
<div className="a4 a4x" style={{position:'relative'}}>

<GrFormClose className='grno' onClick={e => setdisplay2(false)} />
    {
showusers==='ns'?
<div className="tablerow ">
<div className="subtable">
    <div className="headertable clop ">
        <h1 style={{ width: "200px" }}>User</h1>
        <h2 style={{ width: "200px" }}>Skill</h2>


    </div>
    {clk && clk.length > 0 
    ? pending2 && pending2.map(val => (
        <>
            <div className="headertable" >
                <h1 style={{ width: "200px" }}>{val.name.substring(0, 50)}</h1>
                

                <h5 className='h5'><div className="tinvoice" onClick={e => viewprof(val.userid)}>
                        {val.skill}</div> </h5>



            </div>
        </>
    )) :
        project && project.user.map(val => (
            <>
                <div className="headertable" >
                    <h1 style={{ width: "200px" }}>{val.name.substring(0, 50)}</h1>
                   

                    <h5 className='h5'><div className="tinvoice" onClick={e => viewprof(val.userid)}>
                        {val.skill}</div> </h5>



                </div>
            </>
        ))

    }
</div>
</div>
        
        
        :
        showusers==='ci'?
        <div className="tablerow">
                                                    <div className="subtable">
                                                        <div className="headertable clop ">
                                                            <h1 style={{ width: "200px" }}>User</h1>
                                                            <h2 style={{ width: "100px" }}>Date</h2>
                                                            <h3 style={{ width: "100px" }}>Clockin Time</h3>

                                                            <h3 style={{ width: "100px" }}>Clockout Time</h3>
                                                            <h3 style={{ width: "100px" }}>Working Time</h3>
                                                            <h4 style={{ width: "100px" }}>Status</h4>
                                                            <h5 style={{ width: "100px" }}>Late</h5>


                                                        </div>
                                                        {clk && clk.map(val => (
                                                            <>
                                                              {val.chkouttime==='-'&&  <div className="headertable" >
                                                                    <h1 style={{ width: "200px" }}>{val.username.substring(0, 50)}</h1>
                                                                    <h2 style={{ width: "100px" }}> <div className="tinvoice">
                                                                        {val.date}</div> </h2>
                                                                    <h3 style={{ width: "100px" }} >{val.time}</h3>
                                                                    <h3 style={{ width: "100px" }} >{val.chkouttime}</h3>
                                                                    <h3 style={{ width: "100px" }} >{val.workinghours}</h3>
                                                                    {val.status === 'Absent' ?
                                                                        <div style={{ width: "100px" }} className="yellowlabel">

                                                                            <h6 >{val.status}</h6>
                                                                        </div> :
                                                                        <div style={{ width: "100px" }} className="greenlabel">

                                                                            <h6 >{val.status}</h6>
                                                                        </div>

                                                                    }
                                                                    <h5 style={{ width: "100px" }} >{val.late}</h5>



                                                                </div>}
                                                            </>
                                                        ))

                                                        }
                                                    </div>
                                                </div>
    
    
    :
    <div className="tablerow">
    <div className="subtable">
        <div className="headertable clop ">
            <h1 style={{ width: "200px" }}>User</h1>
            <h2 style={{ width: "100px" }}>Date</h2>
            <h3 style={{ width: "100px" }}>Clockin Time</h3>

            <h3 style={{ width: "100px" }}>Clockout Time</h3>
            <h3 style={{ width: "100px" }}>Working Time</h3>
            <h4 style={{ width: "100px" }}>Status</h4>
            <h5 style={{ width: "100px" }}>Late</h5>


        </div>
        {clk && clk.map(val => (
            <>
              {val.chkouttime!=='-'&&  <div className="headertable" >
                    <h1 style={{ width: "200px" }}>{val.username.substring(0, 50)}</h1>
                    <h2 style={{ width: "100px" }}> <div className="tinvoice">
                        {val.date}</div> </h2>
                    <h3 style={{ width: "100px" }} >{val.time}</h3>
                    <h3 style={{ width: "100px" }} >{val.chkouttime}</h3>
                    <h3 style={{ width: "100px" }} >{val.workinghours}</h3>
                    {val.status === 'Absent' ?
                        <div style={{ width: "100px" }} className="yellowlabel">

                            <h6 >{val.status}</h6>
                        </div> :
                        <div style={{ width: "100px" }} className="greenlabel">

                            <h6 >{val.status}</h6>
                        </div>

                    }
                    <h5 style={{ width: "100px" }} >{val.late}</h5>



                </div>}
            </>
        ))

        }
    </div>
</div>
}
</div>
</div>

}

{i===988&&
<>
        <div className="attend">

        <IoClose className='iov' onClick={e=>seti(97)} />
<h1>{
showusers==='ci'?"Clocked inn Users":showusers==='ns'?"Pending Users":showusers==='co'?"Clocked Out Users":"On Leave"}</h1>

<input className='slectsearch' type="text" onChange={e=>setsearchvalu(e.target.value)} placeholder='Enter User number...' />
    {showusers==='ns'?
    <div className="newst nbest">
   <div className="tablerow tablefx">
            <div className="headertable clop">
             
             <h3 style={{width:'40px'}}>Profile</h3>
            <h3 className="mlll">
                    ID
                </h3>
                <h1 className="">
                    EMPLOYEE NAME
                </h1>
                
                <h2 className="">
                    SIGN IN
                    
                    </h2><h3 className="">
                   
                    </h3>
                
            </div>
          {
            clk && clk.length > 0 ? pending2 && pending2.map(val => (
             searchvalu.length>0?
            val.name&&val.name.toLowerCase().search(searchvalu.toLowerCase())>=0&&
            <div className="headertable clop">
            <div className="imgh">
                <img src={allactive&&allactive.find(item => item._id === val.userid)?.imgurl||prof} alt="" />
            </div>
            <h3 className="mlll">
            {val.empno}
            </h3><h1 className="  ">
            {val.name}
            </h1>
            {!process?
            <div className="  ">
         
         
         {selected===val.userid?

         
      <SwipeableButton onSuccess={e=>clockin(val)} color='#414EC6' text='SLIDE TO CONFIRM' />:<button onClick={e=>selectthisuser(val.userid)}  className='btnin'><FaBuilding /> Clock inn</button>

         }

             
             </div>:
             <h2 className="  ">
             IN
              
              </h2>

            }
          
            
        </div>
             :
            <div className="headertable clop">
                <div className="imgh">
                    <img src={allactive&&allactive.find(item => item._id === val.userid)?.imgurl||prof} alt="" />
                </div>
            <h3 className="mlll">
            {val.empno}
            </h3>   <h1 className="  ">
            {val.name}
            </h1> {!process?
            <h2 className="  ">
        
        {selected===val.userid?

        
      <SwipeableButton onSuccess={e=>clockin(val)} color='#414EC6' text='SLIDE TO CONFIRM' />:<button onClick={e=>selectthisuser(val.userid)}  className='btnin'><FaBuilding /> Clock inn</button>

        }

             
             </h2>:
             <h2 className="  ">
             IN
              
              </h2>

            }
            
        </div>
            )):
          project && project.user.map(val=>(

            searchvalu.length>0?
            val.name&&val.name.toLowerCase().search(searchvalu.toLowerCase())>=0&&

             <div className="headertable clop">
               <div className="imgh">
                <img src={allactive&&allactive.find(item => item._id === val.userid)?.imgurl||prof} alt="" />
               </div>
           <h3 className="mlll">
             {val.empno}
             </h3> <h1 className="  ">
             {val.name}
             </h1> {!process?
            <h2 onClick={e=>clockin(val)} className="  ">
    
    {selected===val.userid?

    
      <SwipeableButton onSuccess={e=>clockin(val)} color='#414EC6' text='SLIDE TO CONFIRM' />:<button onClick={e=>selectthisuser(val.userid)}  className='btnin'><FaBuilding /> Clock inn</button>

    }

             
             </h2>:
             <h2 className="  ">
             IN
              
              </h2>

            }
             
         </div>:
           
           <div className="headertable clop">
           <div className="imgh" >
           <img src={allactive&&allactive.find(item => item._id === val.userid)?.imgurl||prof} alt="" />

           </div>
           <h3 className="mlll">
           {val.empno}
           </h3>   <h1 className="  ">
           {val.name}
           </h1>{!process?
            <h2 className="  ">
            {selected===val.userid?

            
      <SwipeableButton onSuccess={e=>clockin(val)} color='#414EC6' text='SLIDE TO CONFIRM' />:<button onClick={e=>selectthisuser(val.userid)}  className='btnin'><FaBuilding /> Clock inn</button>

            }

             
             </h2>:
             <h2 className="  ">
             IN
              
              </h2>

            }
           
       </div>
          ))

          }
          
        </div>
 <div className="comdet comdef nominh astat">
   {showusers==='ci'?
 <div className="btng2">
 <div className="cbr">
     <div className="cbr2">
         
     </div>
 </div>
 <h1>
Clocked inn Users
 </h1>
<p>
{clk && clk.length - chkou}</p>
</div>
   :
   <div onClick={e=>setshowusers('ci')} className="btng">
   <div className="cbr">
       <div className="cbr2">
           
       </div>
   </div>
   <h1>
Clocked inn Users
   </h1>
<p>
{clk && clk.length - chkou}</p>
</div>

   }
   {showusers==='ns'?
 <div className="btng2">
 <div className="cbr">
     <div className="cbr2">
         
     </div>
 </div>
 <h1>
Pending Users
 </h1>
                                      
                                      




<p> {project && clk && project.user.length - clk.length} </p>
</div>
   :
   <div className="btng" onClick={e=>setshowusers('ns')}>
   <div className="cbr">
       <div className="cbr2">
           
       </div>
   </div>
   <h1>
Pending Users
   </h1>
<p> {project && clk && project.user.length - clk.length} </p>
</div>

   }

    


</div>
    </div>
         
        
        :
        showusers==='ci'?
        <div className="newst nbest">
    <div className="tablerow tablefx">
        <div className="headertable  clop">
          <h3 style={{width:'40px'}}>Profile</h3>
        <h3 className="mlll">
             ID
            </h3> <h1 className=" ">
                EMPLOYEE NAME
            </h1>
           
            <h2 className="">
                SIGN OUT
                
                </h2> 
            
        </div>
      {
        clk && clk.map(val => (
          val.chkouttime==='-'&&
        <>{
          searchvalu.length>0?
          val.username&&val.username.toLowerCase().search(searchvalu.toLowerCase())>=0&&
        <div className="headertable">
           <div className="imgh">
                <img src={allactive&&allactive.find(item => item._id === val.userid)?.imgurl||prof} alt="" />
            </div>
         <h3 className="mlll">
          {val.empno}
          </h3> <h1 className="  ">
          {val.username}
          </h1>
             <h3   className="  ">
              {selected===val.userid?

    
      <SwipeableButton onSuccess={e=>clockout(val)} color='#fe8686' text='SLIDE TO CONFIRM' />:<button onClick={e=>selectthisuser(val.userid)}  className='btnout'><FaBuilding /> Clock out</button>

    }
              </h3>
          
      </div>:
        <div className="headertable">
           <div className="imgh">
                <img src={allactive&&allactive.find(item => item._id === val.userid)?.imgurl||prof} alt="" />
            </div>
         <h3 className="mlll">
        {val.empno}
        </h3> <h1 className="  ">
        {val.username}
        </h1>
         <h3   className="  ">
          
              {selected===val.userid?

    
      <SwipeableButton onSuccess={e=>clockout(val)} color='#fe8686' text='SLIDE TO CONFIRM' />:<button onClick={e=>selectthisuser(val.userid)}  className='btnout'><FaBuilding /> Clock oit</button>

    }
            </h3>
        
    </div>}
    </>
        ))

      }
      
    </div>
    <div className="comdet comdef nominh astat">
   {showusers==='ci'?
 <div className="btng2">
 <div className="cbr">
     <div className="cbr2">
         
     </div>
 </div>
 <h1>
Clocked inn Users
 </h1>
<p>
{clk && clk.length - chkou}</p>
</div>
   :
   <div onClick={e=>setshowusers('ci')} className="btng">
   <div className="cbr">
       <div className="cbr2">
           
       </div>
   </div>
   <h1>
Clocked inn Users
   </h1>
<p>
{clk && clk.length - chkou}</p>
</div>

   }
   {showusers==='ns'?
 <div className="btng2">
 <div className="cbr">
     <div className="cbr2">
         
     </div>
 </div>
 <h1>
Pending Users
 </h1>
                                      
                                      




<p> {project && clk && project.user.length - clk.length} </p>
</div>
   :
   <div className="btng" onClick={e=>setshowusers('ns')}>
   <div className="cbr">
       <div className="cbr2">
           
       </div>
   </div>
   <h1>
Pending Users
   </h1>
<p> {project && clk && project.user.length - clk.length} </p>
</div>

   }


    


</div>

        </div>
    
    
    :
    <div className="newst nbest">

        
    <div className="tablerow tablefx">
        <div className="headertable  clop">
          
        <h3 className="mlll">
                ID
            </h3>      <h1 className=" ">
                EMPLOYEE NAME
            </h1>
           
            <h2 className="">
                SIGN IN
                
                </h2> <h3 className="">
                Time in
                </h3><h3 className="">
                SIGN OUT
                </h3><h3 className="">
                Time Out
                </h3><h3 className="">
Perdiem                </h3><h3 className="">
    Food
                </h3>
            
        </div>
      {
        clk && clk.map(val => (
          val.chkouttime!=='-'&&
        <>{
          searchvalu.length>0?
          val.username&&val.username.toLowerCase().search(searchvalu.toLowerCase())>=0&&
        <div className="headertable">
         
         <h1 className="mlll">
          {val.empno}
          </h1>   <h1 className="  ">
          {val.username}
          </h1><h2 className="  ">
             IN
              
              </h2>
              <h3 className=" ">
            {val.time}
              </h3><h3   className="  ">
                Out 
              </h3><h3 className=" ">
            {val.chkouttime}
              </h3><h3 className=" ">
              {val.perdiem}               
              </h3><h3 className=" ">
              {val.food}
              </h3>
          
      </div>:
        <div className="headertable">
         
         <h3 className="mlll">
        {val.empno}
        </h3>    <h1 className="  ">
        {val.username}
        </h1><h2 className="  ">
           IN
            
            </h2>
            <h3 className=" ">
          {val.time}
            </h3><h3   className="  ">
          Out 
            </h3><h3 className=" ">
          {val.chkouttime}
            </h3><h3 className=" ">
            {val.perdiem}               
            </h3><h3 className=" ">
            {val.food}
            </h3>
        
    </div>}
    </>
        ))

      }
      
    </div>

    <div className="comdet comdef nominh astat">
   {showusers==='ci'?
 <div className="btng2">
 <div className="cbr">
     <div className="cbr2">
         
     </div>
 </div>
 <h1>
Clocked inn Users
 </h1>
<p>
{clk && clk.length - chkou}</p>
</div>
   :
   <div onClick={e=>setshowusers('ci')} className="btng">
   <div className="cbr">
       <div className="cbr2">
           
       </div>
   </div>
   <h1>
Clocked inn Users
   </h1>
<p>
{clk && clk.length - chkou}</p>
</div>

   }
   {showusers==='ns'?
 <div className="btng2">
 <div className="cbr">
     <div className="cbr2">
         
     </div>
 </div>
 <h1>
Pending Users
 </h1>
                                      
                                      




<p> {project && clk && project.user.length - clk.length} </p>
</div>
   :
   <div className="btng" onClick={e=>setshowusers('ns')}>
   <div className="cbr">
       <div className="cbr2">
           
       </div>
   </div>
   <h1>
Pending Users
   </h1>
<p> {project && clk && project.user.length - clk.length} </p>
</div>

   }
   {showusers==='co'?
 <div className="btng2" > 
 <div className="cbr">
     <div className="cbr2">
         
     </div>
 </div>
 <h1>
Clocked Out Users
 </h1>
<p>  {chkou}</p>
</div>
   :
   <div className="btng" onClick={e=>setshowusers('co')}>
   <div className="cbr">
       <div className="cbr2">
           
       </div>
   </div>
   <h1>
Clocked Out Users
   </h1>
<p>  {chkou}</p>
</div>

   }
   {showusers==='ss'?
 <div className="btng2">
 <div className="cbr">
     <div className="cbr2">
         
     </div>
 </div>
 <h1>
On Leave
 </h1>
<p>0</p>
</div>
   :
   <div className="btng" onClick={e=>setshowusers('ss')}>
   <div className="cbr">
       <div className="cbr2">
           
       </div>
   </div>
   <h1>
On Leave
   </h1>
<p>0</p>
</div>

   }
    


</div>

        </div>
       
        
    }
         

        </div>
        {report&&
        <div className="eas">
             <ReactToPrint
            
            trigger={() => <button className='ss33' id='90'>Export to Pdf</button>}
            content={() => componentRef.current}
          />
          
      <button className='ss333' onClick={e=>setreport(false)}>Cancel</button>

            <div className="a4" ref={componentRef}>
           
                <h1>EAS Project Sit Sign In / Out  </h1>
                <p>This form will be used for payroll purposes, if an employee fails to sign this form he/she will not be paid for this day.</p>
<p>By signing this form you are affirming the following statemeents</p>
<h2>**On this day i came to work fit for duty and ready to work safely. I left this project site with good condition and no accidents to report.**</h2>
      <h3>Esta forma sera usada con el proposito de compensarle con su sueldo de acuredo con sa presencia en sa trabajo.
        <br />
En este dia yo fui a trabajar listo para completar mi trabajo con seguridad. Termine ef dia dejando mi trabajo sin accidentes que reporter. 
</h3>
<h2 className='bordernoe'>Per Diem:</h2>
<h3 className='ar3'>


This form is being utilized by payroll as an expense reimbursement request form for per Diem per our policy that pays for temporary lodging.<br/>
Below by circling Yes underper Diem for lodging you are under IRS regulations stating that you are requesting reimbursement
per Diem for temporary lodging. The IRSor EAS may audit at times and request a copy of your hotel/motel lodging receipt.<br/>
If you are found to be falsifying this form you will be eligible for disciplinary actionup to and including termination.<br/>
Per policy you must have live a minimum of 50 miles from the jobsite to receive per diem and staying in local lodgingat the job site.<br/>
Sunday per diem is available for those that live farther than 75 miles from the job siteand obtain lodging on sunday night.<br/>
If you elect to drive back and forth from a jobsite each daythat is cosidered a daily commute and willnot be considered "Hours worked" or eligible to receive per diem.<br/>
If driving back and forth you should not mark the per diem and lodging box below.<br/>
</h3>
<h3 className='ar3'>
All employees should sign only themselves in and out each day. If you signin/out someone else or allow someone else to sign you in/out you will be subject to disciplinary action up to and including termination.</h3> 

<div className="jobdate">
<h1>Job # {project&&project.no}</h1>
    <h1>Project Name:  {project&&project.sitename}</h1>
</div>
<div className="jobdate">
<h1>Date # {datep}</h1>
    <h1>Super:  {user&&user.name}</h1>
</div>
<div className="topcolumn topcola">
            <div className="colhead colhead3 ">
                <div className="boxs1 minwidth">
                    EMP #

                </div>
                <div className="boxs1 minwidth2x">
                    Employee Name
                </div>
                
                <div className="boxs1 minwidth2">
                    Sign in
                    
                    </div>
                    <div className="boxs1 minwidth">
                     Time in
                    
                    </div>
                    
                    <div className="boxs1 minwidth2">
                    Sign out
                    </div>
                    <div className="boxs1 minwidth">
                     Time out
                    
                    </div>
                    <div className="boxs1 minwidth2">
                    PERDIEM ELIGIBLE
                    </div><div className="boxs1 minwidth2">
SUNDAY              PERDIEM ELIGIBLE                
                    </div><div className="boxs1 minwidth2">
                   SUPER INTENDENT PERDIEM MEAL
                    </div>
                
            </div>

            {
               clk && clk.map(val => (
                <div className="colhead">
                <div className="boxs1 minwidth blackfont">
                {val.empno}

                </div>
                <div className="boxs1 blackfont minwidth2x">
                {val.username.substring(0,20)}
                </div><div  className="boxs1 minwidth2 blackfont ">
      {val.empno}
                    
                    </div>
                    <div className="boxs1 blackfont minwidth">
                 {val.time}
                    
                    </div><div className="boxs1 blackfont minwidth2 ">
               {val.empno}
                    </div>
                    <div className="boxs1 blackfont minwidth">
               {val.chkouttime}
                    
                    </div><div className="boxs1 minwidth2 blackfont">
                    Yes
                    </div><div className="boxs1 minwidth2 blackfont">
No           
                    </div><div className="boxs1 minwidth2 blackfont">
                Yes
                    </div>
                
            </div>
            )) 
            }
          {
            clk && clk.length > 0 ? pending2 && pending2.map(val => (
                <div className="colhead">
                <div className="boxs1 minwidth blackfont">
                {val.empno}

                </div>
                <div className="boxs1 blackfont minwidth2x">
                {val.name.substring(0,20)}
                </div><div onClick={e=>clockin(val)} className="boxs1 minwidth2 blackfont ">
      X
                    
                    </div>
                    <div className="boxs1 blackfont minwidth">
                 X
                    
                    </div><div className="boxs1 blackfont minwidth2 ">
               X
                    </div>
                    <div className="boxs1 blackfont minwidth">
               X
                    
                    </div><div className="boxs1 minwidth2 blackfont">
                    Yes
                    </div><div className="boxs1 minwidth2 blackfont">
No           
                    </div><div className="boxs1 minwidth2 blackfont">
                Yes
                    </div>
                
            </div>
            )):
          project && project.user.map(val=>(
             <div className="colhead">
             <div className="boxs1 minwidth blackfont">
           {val.empno}

             </div>
             <div className="boxs1 blackfont minwidth2x">
             {val.name.substring(0,20)}
             </div>
             <div  className="boxs1 minwidth2 blackfont ">
    X
                 
                 </div>

                      <div className="boxs1 blackfont minwidth">
                X
                    
                    </div>
                 
                 <div className="boxs1 blackfont  minwidth2">
               X
                 </div>
                 <div className="boxs1 blackfont minwidth">
                   X
                    
                    </div>
                 <div className="boxs1 blackfont minwidth2">
                Yes
                 </div><div className="boxs1 blackfont minwidth2">
No                
                 </div><div className="boxs1 blackfont minwidth2">
           Yes
                 </div>
             
         </div>
          ))

          }
          
        </div>





            </div>
        </div>

        }
        </>}
        <div className=" mobileleft lefty">
            
            <div className="imgh" onClick={e => seti(4)}>
            {user&&!user.imgurl?
    
    <img src={prof} alt="" className='resizeimg' />:
    
    <img className='resizeimg' src={user.imgurl} alt=""  style={{marginBottom:0}} />

    }
            </div>
    
              
                <h3 onClick={e => seti(97)}>
                 <button className='btnhh'>    <AiOutlineDashboard className='icondash1' />
</button>
                
                </h3>
                <h3 onClick={e => seti(199)} style={{width:'max-content',position:'relative'}}>
                    <AiOutlineMessage className='icondash1' />

                    Notes
                    <div className="nut  " style={{left:'-20px',position:'absolute'}} >{user&&user.contacts&&user.contacts.map(obj => obj.unseen).reduce((a, b) => a + b, 0)}</div> 
              

                </h3>
              

            


            </div>
            <div className="sidesite left">
                <h1>{project&&project.clientname}</h1>
                <h3 onClick={e => seti(97)}>
                    <AiOutlineDashboard className='icondash1' />

                    Dashboard
                </h3>

                <h3 onClick={e => seti(4)}>
                    <FaUserAlt className='icondash1' />

                    Profile
                </h3>
   {/*             <h3 onClick={e => seti(11)}>
                    <FaRegBuilding className='icondash1' />

Projects
                </h3>
                */}
                <h3 onClick={e => seti(16)}>
                    <FaFileInvoiceDollar className='icondash1' />

                    Reports
                </h3>
                <h3 onClick={e => seti(199)}>
                    <FaRegBuilding className='icondash1' />

                    Notes
                    <div className="nut nutx">{user&&user.contacts&&user.contacts.map(obj => obj.unseen).reduce((a, b) => a + b, 0)}</div> 
                </h3>
                <h3 onClick={e => setadduser('adduser')} className='buttson'>
                    
                
                    
                <AiOutlineSwap className='icondash1' />
                    Change Project
                </h3>

                <h3 onClick={e => logout()}>
                    <FiLogOut className='icondash1' />

                    Logout
                </h3>


            </div>
            <div className="right ">

            <div className="rheader">
            <div className="h1">
             
            </div>

<div className="menuend">
 
  <div className="grcircle">
    {
        user.imgurl? <img className='imgur2' src={user.imgurl} />
        :<></>
    }

  </div>
  {user&&user.name}
</div>
          </div>

            <div className={adduser}>
            <div className="subadduser">
        
         <>
              
                
         <div className="inputname inui">
             <h1>Choose Projects</h1>
             <select name="cars" id="cars"  onChange={e=>setcproject2(e.target.value)} >
{allprojects&&allprojects.map(val=>(

<option value={val._id+'#1234'+val.sitename}>{val.sitename}</option>
))

}

</select>
         </div>
       


         <button className='btn1 ' onClick={e=>updatesite()} style={{marginLeft:'10px'}} >Confirm</button>

         


         <button onClick={e=>setadduser('adduser2')}  className='btn2'>Cancel</button>
<div className="inputname"></div>
<div className="inputname inui" style={{height:'12px'}}></div>
       </>
     

         

              


            </div>

        </div>
{i===97&&
<div className="newsts">
<div className="firstx"> 


<div className="comdet nomaxh ajob no nomargin">
    {project&&project?
      <>  <h1></h1>
   
        <div className="divx vgc">
       <div className="bcircle " onClick={e=>setis()}>
            <BsClockFill className='fabv' />

        </div>
        <p>Crew</p>
       </div>
     
       <div className="cinfo sde">
        <h1>
            <MdLocationOn className='mdl' />Project
              <div onClick={e=>setadduser('adduser')}  className="penh2 hideondeskx " >
            <FaPencilAlt className='fadd' />


        </div> </h1>
        <p>{project&&project.sitename}</p>

       </div>
       <div className="cinfo ">
        <h1>
            <MdLocationOn className='mdl' />Project no  </h1>
        <p>{project&&project.no}</p>
       </div>
       <div className="cinfo">
        <h1>
            <MdLocationOn className='mdl' />Company  </h1>
        <p>{project&&project.clientname}</p>
       </div>
       <div className="cinfo">
        <h1>
            <MdLocationOn className='mdl' />Site address</h1>
        <p>{project&&project.address}</p>
       </div>
      
    <div className="badge" onClick={e => seti(16)} style={{height:'25px',cursor:'pointer'}}>


                    Reports
            
    </div>
    <div className="badge badge2" onClick={e => logout()} style={{height:'25px',cursor:'pointer'}}>


Logout

</div>


      </>
       :
       <div className="divx">
       
        <p>Select Company to view</p>
        <div className="badge badge2" onClick={e => logout()} style={{height:'25px',cursor:'pointer'}}>


Logout

</div>

       </div> }

    </div>
<div className="astat">
   {showusers==='ci'?
 <div className="btng2">
 <div className="cbr">
     <div className="cbr2">
         
     </div>
 </div>
 <h1>
Clocked inn Users
 </h1>
<p>
{clk && clk.length - chkou}</p>
</div>
   :
   <div onClick={e=>setshowusers('ci')} className="btng">
   <div className="cbr">
       <div className="cbr2">
           
       </div>
   </div>
   <h1>
Clocked inn Users
   </h1>
<p>
{clk && clk.length - chkou}</p>
</div>

   }
   {showusers==='ns'?
 <div className="btng2">
 <div className="cbr">
     <div className="cbr2">
         
     </div>
 </div>
 <h1>
Pending Users
 </h1>
                                      
                                      




<p> {project && clk && project.user.length - clk.length} </p>
</div>
   :
   <div className="btng" onClick={e=>setshowusers('ns')}>
   <div className="cbr">
       <div className="cbr2">
           
       </div>
   </div>
   <h1>
Pending Users
   </h1>
<p> {project && clk && project.user.length - clk.length} </p>
</div>

   }
   {showusers==='co'?
 <div className="btng2" > 
 <div className="cbr">
     <div className="cbr2">
         
     </div>
 </div>
 <h1>
Clocked Out Users
 </h1>
<p>  {chkou}</p>
</div>
   :
   <div className="btng" onClick={e=>setshowusers('co')}>
   <div className="cbr">
       <div className="cbr2">
           
       </div>
   </div>
   <h1>
Clocked Out Users
   </h1>
<p>  {chkou}</p>
</div>

   }
   {showusers==='ss'?
 <div className="btng2">
 <div className="cbr">
     <div className="cbr2">
         
     </div>
 </div>
 <h1>
On Leave
 </h1>
<p>0</p>
</div>
   :
   <div className="btng" onClick={e=>setshowusers('ss')}>
   <div className="cbr">
       <div className="cbr2">
           
       </div>
   </div>
   <h1>
On Leave
   </h1>
<p>0</p>
</div>

   }
    


</div>
{
showusers==='ns'?
<div className="tablerow tablef2 lilmargin">
<div className="subtable">
    <div className="headertable clop ">
        <h1 style={{ width: "200px" }}>User</h1>
        <h2 style={{ width: "200px" }}>Profile</h2>


    </div>
    {clk && clk.length > 0 ? pending2 && pending2.map(val => (
        <>
            <div className="headertable" >
                <h1 style={{ width: "200px" }}>{val.name.substring(0, 50)}</h1>
                

                <h5 className='h5'><div className="tinvoice" onClick={e => viewprof(val.userid)}>
                    View profile</div> </h5>



            </div>
        </>
    )) :
        project && project.user.map(val => (
            <>
                <div className="headertable" >
                    <h1 style={{ width: "200px" }}>{val.name.substring(0, 50)}</h1>
                    <h2 style={{ width: "200px" }}> <div className="tinvoice" onClick={e => viewprof(val.userid)}>
                        {val.skill}</div> </h2>

                </div>
            </>
        ))

    }
</div>
</div>
        
        
        :
        showusers==='ci'?
        <div className="tablerow tablef2 lilmargin">
                                                    <div className="subtable">
                                                        <div className="headertable clop ">
                                                            <h1 style={{ width: "200px" }}>User</h1>
                                                            <h2 style={{ width: "100px" }}>Profile</h2>


                                                        </div>
                                                        {clk && clk.map(val => (
                                                            <>
                                                              {val.chkouttime==='-'&&  <div className="headertable" >
                                                                    <h1 style={{ width: "200px" }}>{val.username.substring(0, 50)}</h1>
                                                                    <h2 style={{ width: "100px" }}> <div onClick={e=>viewprof(val.userid)} className="tinvoice">
                                                                       View profile</div> </h2>
                                                                 

                                                                </div>}
                                                            </>
                                                        ))

                                                        }
                                                    </div>
                                                </div>
    
    
    :
    <div className="tablerow tablef2 lilmargin">
    <div className="subtable">
        <div className="headertable clop ">
            <h1 style={{ width: "200px" }}>User</h1>
            <h2 style={{ width: "100px" }}>Profile</h2>


        </div>
        {clk && clk.map(val => (
            <>
              {val.chkouttime!=='-'&&  <div className="headertable" >
                    <h1 style={{ width: "200px" }}>{val.username.substring(0, 50)}</h1>
                    <h2 style={{ width: "100px" }}> <div className="tinvoice" onClick={e=>viewprof(val.userid)}>
                        View profile</div> </h2>



                </div>}
            </>
        ))

        }
    </div>
</div>
}

</div>
<div className="secondx">
<div className="seconditem hideonmobile">
<h1>Notifications</h1>
<div className="notr">
  <div className="vcircle">
<TbBuildingCommunity className='tbg' />
  </div>
  <div className="textr">
    <h1>Ebel Checked in at jobsite ABC</h1>
    <p>12/09/2022</p>
  </div>

</div>
<div className="notr">
  <div className="vcircle tbgp">
<TbBuildingCommunity className='tbg tbg2' />
  </div>
  <div className="textr">
    <h1>Ebel Checked in at jobsite ABC</h1>
    <p>12/09/2022</p>
  </div>

</div>
<div className="notr">
  <div className="vcircle">
<TbBuildingCommunity className='tbg' />
  </div>
  <div className="textr">
    <h1>Ebel Checked in at jobsite ABC</h1>
    <p>12/09/2022</p>
  </div>

</div>
<div className="notr">
  <div className="vcircle">
<TbBuildingCommunity className='tbg' />
  </div>
  <div className="textr">
    <h1>Ebel Checked in at jobsite ABC</h1>
    <p>12/09/2022</p>
  </div>

</div>
<div className="notr">
  <div className="vcircle tbgp">
<TbBuildingCommunity className='tbg tbg2' />
  </div>
  <div className="textr">
    <h1>Ebel Checked in at jobsite ABC</h1>
    <p>12/09/2022</p>
  </div>

</div>
      </div>
      <div className="seconditem hideonmobile scxx ">
<h1>Ongoing Tasks</h1>
<div className="notrx">
  <div className="rowbr">
    <div className="textx">
      <h1>Ac Fitting</h1>
      <p>Environmental</p>
    </div>
    <div className="imgh">
      <img src={u} alt="" />

      <img src={u} alt="" />

      <img src={u} alt="" />
    </div>
  </div>
  <div className="pgress">
    <div className="subpgress" style={{width:'70%'}}>

    </div>
  </div>

</div>
<div className="notrx">
  <div className="rowbr">
    <div className="textx">
      <h1>Ac Fitting</h1>
      <p>Environmental</p>
    </div>
    <div className="imgh">
      <img src={u} alt="" />

      <img src={u} alt="" />

      <img src={u} alt="" />
    </div>
  </div>
  <div className="pgress">
    <div className="subpgress" style={{width:'70%'}}>

    </div>
  </div>

</div>
<div className="notrx">
  <div className="rowbr">
    <div className="textx">
      <h1>Ac Fitting</h1>
      <p>Environmental</p>
    </div>
    <div className="imgh">
      <img src={u} alt="" />

      <img src={u} alt="" />

      <img src={u} alt="" />
    </div>
  </div>
  <div className="pgress">
    <div className="subpgress" style={{width:'70%'}}>

    </div>
  </div>

</div>
<div className="notrx">
  <div className="rowbr">
    <div className="textx">
      <h1>Ac Fitting</h1>
      <p>Environmental</p>
    </div>
    <div className="imgh">
      <img src={u} alt="" />

      <img src={u} alt="" />

      <img src={u} alt="" />
    </div>
  </div>
  <div className="pgress">
    <div className="subpgress" style={{width:'70%'}}>

    </div>
  </div>

</div>

      </div>
</div>
</div>

}

                {i === 0 &&
                    <>
                    <div className={allwill}>
<div className="bgwill">

<GrFormClose className='grno' onClick={e => setallwill('allwill2')} />
    <div className="searinput">
        <input type="text" onChange={e=>setsearchval(e.target.value)} placeholder='Type User Number..'/>
<div className="allactive">
    {searchval.length>0?allactive&&allactive.map(val=>(
      val.name&&val.name.toLowerCase().search(searchval.toLowerCase())>=0&&
      <div className="justmem">
      <p>{val.name}</p>
      <button onClick={e=>addthis(val)}>+ Add</button>
  </div>
    )):allactive&&allactive.map(val=>(
        <div className="justmem">
            <p>{val.name}</p>
            <button onClick={e=>addthis(val)}>+ Add</button>
        </div>))}
</div>
    </div>

</div>
                    </div>



<div className="cdf" style={{width:'95%'}}>
    {/*

<button className='usiosub' onClick={e=>setformanreports(true)}>Foreman's Report</button>
                */}

<button className='usiosub' onClick={e=>setatten('true')}>Attendance</button>
<button className=' ussi' onClick={e=>setsallwill('allwill')} >+ Add user</button>


<div className="displayatend">
{user&&!user.imgurl?
        
        <img src={prof} alt="" className='resizeimg' />:
        
        <img className='resizeimg' src={user.imgurl} alt="" />

        }
</div>
</div>
                        <div className="clientpro">
                            <div className="projectscard">

                                <div className="procard">
                                    <h1>Active Jobsite</h1>
                                    <h4 className='cardh2'>{project && project.sitename}</h4>

                                    <h2 className='cardh3' > <TbBuildingFactory2 />  </h2>
                                    <h6 className='cardf3' > {project && project.address.substring(0, 50)}</h6>
                                    <div className="circlelast"></div>

                                    <div className="circlelast2"></div>

                                </div>
                                <div className="datep">
                                    <img src={aa} alt="" />
                                    {datep}

                                </div>
                                {showcalender ?
                                    <div>
                                        <Calendar onChange={onxhange}
                                            value={value} />
                                    </div>:
                                <button onClick={e => setshowcalender(true)} className='cht'> Choose Date</button>

                                }

                            </div>
                        </div>
                        <>

                            <div className="clockhead">
                               
                            </div>
                            <div className="clientpro clientproh">
                                <h1>User Stats</h1>
                                <div className="projectscard">
                                    <div className="balance balancec" onClick={e=>setvalues('ci')}>  <div className="mhg mhg3">

                                        <FaUserCheck className='mhgf mhgf3' />
                                    </div>
                                        <div className="detbalance">
                                            <h1>Clocked in</h1>
                                            <h3>{clk && clk.length - chkou}</h3>
                                        </div>
                                    </div>
                                    <div className="balance balancec"  onClick={e=>setvalues('ns')}>
                                        <div className="mhg">

                                            <FaUserTimes className='mhgf' />
                                        </div>
                                        <div className="detbalance">
                                            <h1>Pending</h1>
                                            <h3>{project && clk && project.user.length - clk.length} </h3>
                                        </div>
                                    </div>
                                    <div className="balance balancec"  onClick={e=>setvalues('co')}>  <div className="mhg mhg2">

                                        <FiLogOut className='mhgf mhgf2' />
                                    </div>
                                        <div className="detbalance">
                                            <h1>Clocked Out </h1>
                                            <h3>{chkou}</h3>
                                        </div>
                                    </div>
                                    <div className="balance balancec">  <div className="mhg mhg2x">

                                        <FaUserEdit className='mhgf mhgf2x' />
                                    </div>
                                        <div className="detbalance" onClick={e=>setvalues('cis')}>
                                            <h1>On Leave </h1>
                                            <h3>{0} </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    
                        </>


                    </>

                }
                {i === 49 &&


                    <><div className="clienthead  ">
                        <h6>Jobsites</h6>


                    </div>

                        <div className="tablerow">
                            <div className="subtable">
                                <div className="headertable clop ">
                                    <h1 style={{ width: "200px" }}>User</h1>
                                    <h2 style={{ width: "100px" }}>Date</h2>
                                    <h3 style={{ width: "100px" }}>Clockin Time</h3>

                                    <h3 style={{ width: "100px" }}>Clockout Time</h3>
                                    <h3 style={{ width: "100px" }}>Working Time</h3>
                                    <h4 style={{ width: "100px" }}>Status</h4>
                                    <h5 style={{ width: "100px" }}>Late</h5>


                                </div>
                                {att && att.map(val => (
                                    <>
                                        <div className="headertable" >
                                            <h1 style={{ width: "200px" }}>{val.username.substring(0, 50)}</h1>
                                            <h2 style={{ width: "100px" }}> <div className="tinvoice">
                                                {val.date}</div> </h2>
                                            <h3 style={{ width: "100px" }} >{val.time}</h3>
                                            <h3 style={{ width: "100px" }} >{val.chkouttime}</h3>
                                            <h3 style={{ width: "100px" }} >{val.workinghours}</h3>
                                            {val.status === 'Absent' ?
                                                <div style={{ width: "100px" }} className="yellowlabel">

                                                    <h6 >{val.status}</h6>
                                                </div> :
                                                <div style={{ width: "100px" }} className="greenlabel">

                                                    <h6 >{val.status}</h6>
                                                </div>

                                            }
                                            <h5 style={{ width: "100px" }} >{val.late}</h5>



                                        </div>
                                    </>
                                ))

                                }
                            </div>
                        </div>
                    </>


                }
                {i === 1 &&
                    <Attendence props={{
                        user: user,
                        date: datec

                    }} />

                }   
                
                {i === 16 &&
                    <Reports props={{
                        user: user,
                        project:project,
                        attreport:attreport

                    }}  />

                }
                  {i === 199 &&
                    <Supernotes 
                    props={{
                        user: user,
                        project:project,
                     

                    }} 
                    />

                }
                {i === 11 &&
                    <>  <div className="projectview">
                        <h4>     <span></span> <p>Active</p></h4>
                        <h1>Site : <p className='greenp'>{project.sitename}</p></h1>
                        <h1 className='teamm'>Supervisor: </h1>
                        <div className="teamates">
                            <button>{user.name}</button>



                        </div>

                        <h1 className='teamm'>Employees: </h1>

                        <div className="tablerow">
                            <div className="subtable">
                                <div className="headertable clop">
                                    <h1>Employee</h1>

                                    <h6>Skill</h6>
                                    <h4>Phone</h4>


                                </div>
                                {project && project.user.map(val => (
                                    <>
                                        <div className="headertable">
                                            <h1><img src='' alt="" className='valimg' /> {val.name}</h1>

                                            <h6>{val.skill}</h6>

                                            <h1>{val.address}</h1>
                                            <h6>{val.phone}</h6>


                                        </div>
                                    </>
                                ))

                                }
                            </div>
                        </div>

                    </div>
                    </>

                }
                {i === 2 &&
                    <Leave props={{
                        user: user,
                        date: datec

                    }} />

                }

                {i === 3 &&
                    <Notes props={{
                        user: user,
                        date: datec

                    }} />

                }
                {i === 4 &&
                    <>
                    <div className="newst nbest">
                        <div className="firstx">


<div className="comdet hideshonmovil comdefxs">
{user?
      <>  <div className="penh " >
            <FaPencilAlt className='fadd' />

            <input type='file' onChange={e=>fileupload(e.target.files[0])} />
        </div>
    
        <div className="divx">
       <div className="bcircle">
        {
            user.imgurl?
            <img className='imgur' src={user.imgurl} alt="" />
            
            :

            <HiUser className='fabv' />
        }

        </div>
        <p>{user.name}</p>

        <p className='skl'>Supervisor</p>
       </div>
  
       <div className="cinfo">
        <h1>
            <MdLocationOn className='mdl' />Project </h1>
        <p>{user.sitename}</p>
       </div>
       <div className="cinfo">
        <h1>
            <MdLocationOn className='mdl' />Phone</h1>
        <p>{user.phone}</p>
       </div>
       <div className="cinfo">
        <h1>
            <MdLocationOn className='mdl' />Address </h1>
        <p>{user.address}</p>
       </div>
       
       <div className="badge">
        {user.status}
       </div>
       </>
       :
       <div className="divx">
       
        <p>Select Company to view</p>
       </div> }
</div>
                        </div>
         
                    </div>

                       
                    </>

                }
                {i === 48 &&

                    <div className='clientpro clienttro'>
                        <div className="clienthead  ">
                            <h6>Jobsites</h6>


                        </div>

                        <div className="tablerow">
                            <div className="subtable">
                                <div className="headertable clop ">
                                    <h1 style={{ width: "200px" }}>Sitename</h1>
                                    <h2 style={{ width: "200px" }}>Client Name</h2>


                                </div>
                                {linked && linked.map(val => (
                                    <>
                                        <div className="headertable" >
                                            <h1 style={{ width: "200px" }}>{val.sitename}</h1>
                                            <h2 style={{ width: "250px" }}> <div className="tinvoice">
                                                {val.clientname}</div> </h2>

                                            <h5 className='h5'><button onClick={e => open2(val._id)} className='manx man'>Work History</button></h5>



                                        </div>
                                    </>
                                ))

                                }
                            </div>
                        </div>


                    </div>}

            </div>



        </div>:
        <>
        <div className="attend">

    {showusers==='ns'?
            <div className="topcolumn">
            <div className="headertable clop">
             
                <div className=" ">
                    EMPLOYEE NAME
                </div><div className="">
                    SIGN IN
                    
                    </div><div className="">
                    SIGN OUT
                    </div><div className="">
                    PERDIEM ELIGIBLE
                    </div><div className="">
SUNDAY              PERDIEM ELIGIBLE                
                    </div><div className="">
                   SUPER INTENDENT PERDIEM MEAL
                    </div>
                
            </div>
          {
            clk && clk.length > 0 ? pending2 && pending2.map(val => (
             searchvalu.length>0?
            val.name&&val.name.toLowerCase().search(searchvalu.toLowerCase())>=0&&
            <div className="headertable">
            
            <div className="boxs1 nbox blackfont">
            {val.name}
            </div>
            {!process?
            <div onClick={e=>clockin(val)} className="boxs1 blackfont bgred">
            IN
             
             </div>:
             <div className="boxs1 blackfont bgred">
             IN
              
              </div>

            }
            <div className="boxs1 blackfont bggreen">
              OUT
                </div><div className="boxs1 blackfont">
                {val.perdiem}
                </div><div className="boxs1 blackfont">
                {val.perdiem}           
                </div><div className="boxs1 blackfont">
                {val.food}
                </div>
            
        </div>
             :
            <div className="colhead">
            
            <div className="boxs1 nbox blackfont">
            {val.name}
            </div> {!process?
            <div onClick={e=>clockin(val)} className="boxs1 blackfont bgred">
            IN
             
             </div>:
             <div className="boxs1 blackfont bgred">
             IN
              
              </div>

            }<div className="boxs1 blackfont bggreen">
              OUT
                </div><div className="boxs1 blackfont">
                {val.perdiem}
                </div><div className="boxs1 blackfont">
                {val.perdiem}           
                </div><div className="boxs1 blackfont">
                {val.food}
                </div>
            
        </div>
            )):
          project && project.user.map(val=>(

            searchvalu.length>0?
            val.name&&val.name.toLowerCase().search(searchvalu.toLowerCase())>=0&&

             <div className="colhead">
           
             <div className="boxs1 nbox blackfont">
             {val.name}
             </div> {!process?
            <div onClick={e=>clockin(val)} className="boxs1 blackfont bgred">
            IN
             
             </div>:
             <div className="boxs1 blackfont bgred">
             IN
              
              </div>

            }<div className="boxs1 blackfont bggreen">
               OUT
                 </div><div className="boxs1 blackfont">
                 {val.perdiem}
                 </div><div className="boxs1 blackfont">
                 {val.perdiem}                
                 </div><div className="boxs1 blackfont">
                 {val.food}
                 </div>
             
         </div>:
           
           <div className="colhead">
           
           <div className="boxs1 nbox blackfont">
           {val.name}
           </div>{!process?
            <div onClick={e=>clockin(val)} className="boxs1 blackfont bgred">
            IN
             
             </div>:
             <div className="boxs1 blackfont bgred">
             IN
              
              </div>

            }<div className="boxs1 blackfont bggreen">
             OUT
               </div><div className="boxs1 blackfont">
               {val.perdiem}
               </div><div className="boxs1 blackfont">
               {val.perdiem}                
               </div><div className="boxs1 blackfont">
               {val.food}
               </div>
           
       </div>
          ))

          }
          
        </div>:
        showusers==='ci'?
        <div className="topcolumn">
        <div className="colhead colhead2  udpo">
          
            <div className="boxs1 nbox">
                EMPLOYEE NAME
            </div>
           
            <div className="boxs1">
                SIGN IN
                
                </div> <div className="boxs1">
                Time in
                </div><div className="boxs1">
                SIGN OUT
                </div><div className="boxs1">
                Time Out
                </div><div className="boxs1">
Perdiem                </div><div className="boxs1">
    Food
                </div>
            
        </div>
      {
        clk && clk.map(val => (
          val.chkouttime==='-'&&
        <>{
          searchvalu.length>0?
          val.username&&val.username.toLowerCase().search(searchvalu.toLowerCase())>=0&&
        <div className="colhead">
         
          <div className="boxs1 blackfont nbox">
          {val.username}
          </div><div className="boxs1 blackfont bggreen">
             IN
              
              </div>
              <div className="boxs1 blackfont">
            {val.time}
              </div><div onClick={e=>clockout(val)}  className="boxs1 blackfont bgred2">
            OUT
              </div><div className="boxs1 blackfont">
            {val.chkouttime}
              </div><div className="boxs1 blackfont">
              {val.perdiem}               
              </div><div className="boxs1 blackfont">
              {val.food}
              </div>
          
      </div>:
        <div className="colhead">
         
        <div className="boxs1 blackfont nbox">
        {val.username}
        </div><div className="boxs1 blackfont bggreen">
           IN
            
            </div>
            <div className="boxs1 blackfont">
          {val.time}
            </div><div onClick={e=>clockout(val)}  className="boxs1 blackfont bgred2">
          OUT
            </div><div className="boxs1 blackfont">
          {val.chkouttime}
            </div><div className="boxs1 blackfont">
            {val.perdiem}               
            </div><div className="boxs1 blackfont">
            {val.food}
            </div>
        
    </div>}
    </>
        ))

      }
      
    </div>
    
    
    :
           <div className="topcolumn">
           <div className="colhead colhead2 udpo">
             
               <div className="boxs1 nbox">
                   EMPLOYEE NAME
               </div><div className="boxs1">
                   SIGN IN
                   
                   </div>
                   <div className="boxs1">
                   Time in</div>
                   <div className="boxs1">
                   SIGN OUT
             
                   </div>
                   <div className="boxs1">
                   Time Out</div><div className="boxs1">
  Perdiem          
                   </div><div className="boxs1">
                    Food
                   </div>
               
           </div>
         {
           clk && clk.map(val => (
             val.chkouttime!=='-'&&
<>
        {  searchvalu.length>0?
          val.username&&val.username.toLowerCase().search(searchvalu.toLowerCase())>=0&&
             
             <div className="colhead">
          
             <div className="boxs1 nbox blackfont">
             {val.username}
             </div><div  className="boxs1 blackfont bggreen">
                IN
                 
                 </div>
                 <div className="boxs1 blackfont">
                 {val.time}
                 </div>
                 <div className="boxs1 blackfont bggreen">
               OUT
                 </div><div className="boxs1 blackfont">
                 {val.chkouttime}
                 </div><div className="boxs1 blackfont">
                 {val.perdiem}                
                 </div><div className="boxs1 blackfont">
                 {val.food}
                 </div>
             
         </div>:
          <div className="colhead">
          
          <div className="boxs1 nbox blackfont">
          {val.username}
          </div><div  className="boxs1 blackfont bggreen">
             IN
              
              </div>
              <div className="boxs1 blackfont">
              {val.time}
              </div>
              <div className="boxs1 blackfont bggreen">
            OUT
              </div><div className="boxs1 blackfont">
              {val.chkouttime}
              </div><div className="boxs1 blackfont">
              {val.perdiem}                
              </div><div className="boxs1 blackfont">
              {val.food}
              </div>
          
      </div>}
      </>
           ))
   
         }
         
       </div>
        
    }
            <div className="bottombar">

                
                

<input className='slectsearch' type="text" onChange={e=>setsearchvalu(e.target.value)} placeholder='Enter User number...' />
                <button onClick={e=>setdisplay('ci')} className={showusers==='ci'?'backm':'view'}>Clock inn {clk && clk.length - chkou}</button>
                <button onClick={e=>setdisplay('co')} className={showusers==='co'?'backm':'view'}>Clock out {chkou} </button>
                <button onClick={e=>setdisplay('ns')} className={showusers==='ns'?'backm':'view'}>Out {project && clk && project.user.length - clk.length} </button>

{/*
                <button onClick={e=>openreport()} className='view'>Report</button>*/}
                
                
                
                <button className='backm' onClick={e=>seti(97)}>Back</button>

            </div>

        </div>
        {report&&
        <div className="eas">
             <ReactToPrint
            
            trigger={() => <button className='ss33' id='90'>Export to Pdf</button>}
            content={() => componentRef.current}
          />
          
      <button className='ss333' onClick={e=>setreport(false)}>Cancel</button>

            <div className="a4" ref={componentRef}>
           
                <h1>EAS Project Sit Sign In / Out  </h1>
                <p>This form will be used for payroll purposes, if an employee fails to sign this form he/she will not be paid for this day.</p>
<p>By signing this form you are affirming the following statemeents</p>
<h2>**On this day i came to work fit for duty and ready to work safely. I left this project site with good condition and no accidents to report.**</h2>
      <h3>Esta forma sera usada con el proposito de compensarle con su sueldo de acuredo con sa presencia en sa trabajo.
        <br />
En este dia yo fui a trabajar listo para completar mi trabajo con seguridad. Termine ef dia dejando mi trabajo sin accidentes que reporter. 
</h3>
<h2 className='bordernoe'>Per Diem:</h2>
<h3 className='ar3'>


This form is being utilized by payroll as an expense reimbursement request form for per Diem per our policy that pays for temporary lodging.<br/>
Below by circling Yes underper Diem for lodging you are under IRS regulations stating that you are requesting reimbursement
per Diem for temporary lodging. The IRSor EAS may audit at times and request a copy of your hotel/motel lodging receipt.<br/>
If you are found to be falsifying this form you will be eligible for disciplinary actionup to and including termination.<br/>
Per policy you must have live a minimum of 50 miles from the jobsite to receive per diem and staying in local lodgingat the job site.<br/>
Sunday per diem is available for those that live farther than 75 miles from the job siteand obtain lodging on sunday night.<br/>
If you elect to drive back and forth from a jobsite each daythat is cosidered a daily commute and willnot be considered "Hours worked" or eligible to receive per diem.<br/>
If driving back and forth you should not mark the per diem and lodging box below.<br/>
</h3>
<h3 className='ar3'>
All employees should sign only themselves in and out each day. If you signin/out someone else or allow someone else to sign you in/out you will be subject to disciplinary action up to and including termination.</h3> 

<div className="jobdate">
<h1>Job # {project&&project.no}</h1>
    <h1>Project Name:  {project&&project.sitename}</h1>
</div>
<div className="jobdate">
<h1>Date # {datep}</h1>
    <h1>Super:  {user&&user.name}</h1>
</div>
<div className="topcolumn topcola">
            <div className="colhead colhead3 ">
                <div className="boxs1 minwidth">
                    EMP #

                </div>
                <div className="boxs1 minwidth2x">
                    Employee Name
                </div>
                
                <div className="boxs1 minwidth2">
                    Sign in
                    
                    </div>
                    <div className="boxs1 minwidth">
                     Time in
                    
                    </div>
                    
                    <div className="boxs1 minwidth2">
                    Sign out
                    </div>
                    <div className="boxs1 minwidth">
                     Time out
                    
                    </div>
                    <div className="boxs1 minwidth2">
                    PERDIEM ELIGIBLE
                    </div><div className="boxs1 minwidth2">
SUNDAY              PERDIEM ELIGIBLE                
                    </div><div className="boxs1 minwidth2">
                   SUPER INTENDENT PERDIEM MEAL
                    </div>
                
            </div>

            {
               clk && clk.map(val => (
                <div className="colhead">
                <div className="boxs1 minwidth blackfont">
                {val.empno}

                </div>
                <div className="boxs1 blackfont minwidth2x">
                {val.username.substring(0,20)}
                </div><div  className="boxs1 minwidth2 blackfont ">
      {val.empno}
                    
                    </div>
                    <div className="boxs1 blackfont minwidth">
                 {val.time}
                    
                    </div><div className="boxs1 blackfont minwidth2 ">
               {val.empno}
                    </div>
                    <div className="boxs1 blackfont minwidth">
               {val.chkouttime}
                    
                    </div><div className="boxs1 minwidth2 blackfont">
                    Yes
                    </div><div className="boxs1 minwidth2 blackfont">
No           
                    </div><div className="boxs1 minwidth2 blackfont">
                Yes
                    </div>
                
            </div>
            )) 
            }
          {
            clk && clk.length > 0 ? pending2 && pending2.map(val => (
                <div className="colhead">
                <div className="boxs1 minwidth blackfont">
                {val.empno}

                </div>
                <div className="boxs1 blackfont minwidth2x">
                {val.name.substring(0,20)}
                </div><div onClick={e=>clockin(val)} className="boxs1 minwidth2 blackfont ">
      X
                    
                    </div>
                    <div className="boxs1 blackfont minwidth">
                 X
                    
                    </div><div className="boxs1 blackfont minwidth2 ">
               X
                    </div>
                    <div className="boxs1 blackfont minwidth">
               X
                    
                    </div><div className="boxs1 minwidth2 blackfont">
                    Yes
                    </div><div className="boxs1 minwidth2 blackfont">
No           
                    </div><div className="boxs1 minwidth2 blackfont">
                Yes
                    </div>
                
            </div>
            )):
          project && project.user.map(val=>(
             <div className="colhead">
             <div className="boxs1 minwidth blackfont">
           {val.empno}

             </div>
             <div className="boxs1 blackfont minwidth2x">
             {val.name.substring(0,20)}
             </div>
             <div  className="boxs1 minwidth2 blackfont ">
    X
                 
                 </div>

                      <div className="boxs1 blackfont minwidth">
                X
                    
                    </div>
                 
                 <div className="boxs1 blackfont  minwidth2">
               X
                 </div>
                 <div className="boxs1 blackfont minwidth">
                   X
                    
                    </div>
                 <div className="boxs1 blackfont minwidth2">
                Yes
                 </div><div className="boxs1 blackfont minwidth2">
No                
                 </div><div className="boxs1 blackfont minwidth2">
           Yes
                 </div>
             
         </div>
          ))

          }
          
        </div>





            </div>
        </div>

        }
        </>
}
</>
        }
        
        
        </>
    )
}

export default Supervisor