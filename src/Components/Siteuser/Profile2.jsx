import React, { useEffect, useState } from 'react'
import prof from '../../images/prof.png'

import u from '../../images/u.jpeg'
import { tz } from '../apis'
import {TbBuildingCommunity} from 'react-icons/tb'
import {FaPencilAlt } from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'

import app from '../../firebase.config'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from 'axios'
import { IoClose } from 'react-icons/io5'
const Profile2 = ({props}) => {
const [adduser, setadduser] = useState('adduser2')
const [skildata, setskildata] = useState()

const [name, setname] = useState(props.user.name)
const [skill, setskill] = useState(props.user.skill)
const [phone, setphone] = useState(props.user.phone)
const [status, setstatus] = useState(props.user.status)
const [usermins, setusermins] = useState(0)
function sd(){
 
}
const [userhrs, setuserhrs] = useState(0)
useEffect(() => {

  axios.post(`${tz}/client/find`, {
    Client_id:props.user.clientid


  }
  ).then(res => {
          console.log(res)
    axios.post(`${tz}/siteatt/findbyname`, {
      id:props.user._id
     }).then(resq => {
         console.log(resq)
         var t =Number(res.data.Client[0].weekend)+1

         const currentDate = new Date();
         const dayOfWeek = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
         let daysToLastFriday = dayOfWeek - (t===7?0:t); // Difference between current day and Friday (5)
       
         if (daysToLastFriday <= 0) {
           daysToLastFriday += 7; // Add 7 days to get the previous week's Friday
         }
       
         const lastFridayDate = new Date(currentDate);
         lastFridayDate.setDate(currentDate.getDate() - daysToLastFriday);
       
         const month = lastFridayDate.getMonth() + 1; // Adding 1 since getMonth() is 0-based
           const day = lastFridayDate.getDate();
           const year = lastFridayDate.getFullYear();
       
           const formattedDate = `${month}/${day}/${year}`;

           console.log(formattedDate);
if(props.user.hrsweek&&props.user.hrsweek>=formattedDate){
  setuserhrs(props.user.hrs)
}
else{
  resq.data.Siteatt.forEach(element => {
    if(element.date>=formattedDate){
console.log(element)
var time = element.workinghours.split(':');
var hours = parseInt(time[0]);
var minutes = parseInt(time[1]);

setuserhrs(userhrs=>userhrs+hours)

setusermins(usermins=>usermins+minutes)  

}


     
   });
}
       
      
         


     })


            });
           
       
          return () => {
  
          }
      }, [])
useEffect(() => {
  
    axios.get(`${tz}/skills/getall`).then(res=>{
        console.log(res)
        setskildata(res.data.Skillsdata)
      })
      axios.post(`${tz}/siteuser/find`,{
        Siteuserd_id:props.user._id
    }).then((resa2)=>{
        setname(resa2.data.Siteuserd[0].name)
        setphone(resa2.data.Siteuserd[0].phone)
        setskill(resa2.data.Siteuserd[0].skill)
        setstatus(resa2.data.Siteuserd[0].status)

        
       

    })
  return () => {
    
  }
}, [])
const [changep, setchangep] = useState('Change profile photo')
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

      axios.post(`${tz}/siteuser/profilechange`,{
         
         
     _id:props.user._id,
     imgurl:downloadURL
    }).then((resa2)=>{
        alert('Profile picture changed successfully')
        window.location.reload()

        
       

    })


    });
  }
);
}
const [selectedimg, setselectedimg] = useState('')
function fileupload2(filex){
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

    axios.post(`${tz}/siteuser/updateuserprofile`,{
       
       
   _id:props.user._id,
   idurl:downloadURL,
   id:selecteddocument,
  }).then((resa2)=>{
      alert('Profile picture changed successfully')
    console.log(resa2)

      
     

  })


  });
}
);
}
const [selecteddocument, setselecteddocument] = useState('')
function submit(){
    axios.post(`${tz}/siteuser/updatefromuser`,{
        skill:skill,
        _id:props.user._id,
        name:name,
        phone:phone,
        status:status

    }).then((resa)=>{

        axios.post(`${tz}/siteuser/find`,{
         
         
            Siteuserd_id:props.user._id
        }).then((resa2)=>{
            setname(resa2.data.Siteuserd[0].name)
            setphone(resa2.data.Siteuserd[0].phone)
            setskill(resa2.data.Siteuserd[0].skill)
            setstatus(resa2.data.Siteuserd[0].status)
    alert('Profile updated')
            setadduser('adduser2')
           
    
        })

    })
}
const [cpass, setcpass] = useState('')
const [npass, setnpass] = useState('')
const [cupass, setcupass] = useState('')
const [adduser2, setadduser2] = useState('adduser2')
function changepass(){
if(props.user.password===cupass){
  if(npass===cpass){
    axios.post(`${tz}/siteuser/pass`,{
         
         
      email:props.user.email,
      password:npass,
  }).then((resa2)=>{
alert('Password successfully updated')
setadduser2('adduser2')

  })
  }
  else{
    alert('Password does not match')
  }

}
else{
  alert('Incorrect password')
}
}
  return (
    <>
       <div className={adduser}>
            <div className="subadduser fsubadd">
         
              <>
             
              <button className='updatep rtp'>{changep}

<input type='file' onChange={e=>fileupload(e.target.files[0])} />

</button>
                <div className="inputname">
                    <h1>Phone</h1>
                    <input onChange={e=>setphone(e.target.value)} type="text" value={phone} />

                </div>
                
              
                <button className='btn1f' onClick={e=>submit()}>Submit</button>
                <button onClick={e=>setadduser('adduser2')}  className='btn2'>Cancel</button>
<div className="inputname"></div>
              </>

              


            </div>

        </div>
        <div className={adduser2}>
            <div className="subadduser fsubadd">
         
              <>
             
      
                <div className="inputname">
                    <h1>Current password:</h1>
                    <input onChange={e=>setcupass(e.target.value)} type="text" value={cupass} />

                </div>

                <div className="inputname">
                    <h1>New password:</h1>
                    <input onChange={e=>setnpass(e.target.value)} type="text" value={npass} />

                </div>  
                <div className="inputname">
                    <h1>Confirm new password:</h1>
                    <input onChange={e=>setcpass(e.target.value)} type="text" value={cpass} />

                </div>              
              
                <button className='btn1f' onClick={e=>changepass()}>Submit</button>
                <button onClick={e=>setadduser2('adduser2')}  className='btn2'>Cancel</button>
<div className="inputname"></div>
              </>

              


            </div>

        </div>
        <div className="newst nbest">
                        <div className="firstx">


<div className="comdet comdefxs hideshonmovil">
{name?
      <>  <div className="penh hideonmobile" >
            <FaPencilAlt className='fadd' />

            <input type='text' onClick={e=>setadduser('adduser')} />

        </div>
   
        <div className="divx reldiv">
       <div className="bcircle" >
           {!props.user.imgurl?
        
        <img src={prof} alt=""  className='imgur'/>:
        
        <img className='imgur' src={props.user.imgurl} alt="" />

        }

        </div>
     
<div className="penh  pexn hideondesk" >
            <FaPencilAlt className='fadd' />

            <input type='text' onClick={e=>setadduser('adduser')} />

        </div>
        <p>{name}</p>{/*
        <p className='pbadge'>{skill}</p>*/}
       </div>
  <div className="hrsin">
    <div className="hrsint">

    <p>{Number(userhrs)>40?40:Number(userhrs)+Math.floor(usermins / 60)}</p>
    <h6>Hours</h6>
    </div>
    <div className="hrsmint">

    <p>{Number(userhrs)>40? Number(userhrs)+Math.floor(usermins / 60)-40:0}</p>
    <h6>Overtime </h6>
    </div>
 
  </div>
       <div className="cinfo">
        <h1>
            <MdLocationOn className='mdl' />Skill </h1>
        <p>{skill}</p>
       </div>
       <div className="cinfo">
        <h1>
            <MdLocationOn className='mdl' />Phone</h1>
        <p>{phone}</p>
       </div>
       <div className="cinfo">
        <h1>
            <MdLocationOn className='mdl' />Password  <FaPencilAlt onClick={e=>setadduser2('adduser')} style={{cursor:'pointer'}} /> </h1>
        <p>********</p>
       </div>
      
      
       <div className="badge">
        {status}
       </div>
       <select  className='uploaddoc' name="" id="" onChange={e=>setselecteddocument(e.target.value)}>
<option value=" ">Select document</option>
<option value="SSID">SSID</option>
<option value="Certifications">Certifications</option>
<option value="License">License</option>
<option value="Record certificate">Record certificate</option>

       </select>
       <button className='uploadbc'>Uplaod Document <input onChange={e=>fileupload2(e.target.files[0])} className='posa' type="file" /> </button>
      {
        selectedimg?
<div className="bgimh">
<div className="clsbtn">
<IoClose onClick={e=>setselectedimg('')} />
</div>
  <img src={selectedimg} alt="" />
</div>
        : <div className="imhdata">
        {props.user.ids&&props.user.ids.map(val=>(
          <div className="filed">
            <img src={val.idurl} alt="" onClick={e=>setselectedimg(val.idurl)} />
            <p>{val.idname}</p>
          </div>
        )
        )

        }
       </div>
      }
       </>
       :
       <div className="divx reldiv">
       
        <p>Select Company to view</p>
       </div> }
</div>
                        </div>
                        <div className="secondx">
<div className="seconditem hideonmobile" >
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
   
    </>
  )
}

export default Profile2