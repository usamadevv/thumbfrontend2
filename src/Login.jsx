import React, { useEffect } from 'react'
import { useState } from 'react'
import ss from './images/ss.png'
import axios from 'axios'
import { tz } from './Components/apis'
import { adminPass, adminReset, loginAdmin } from './Utils/api'
const Login = () => {

  
  
    const [reset, setreset] = useState(false)
    const [steps, setsteps] = useState(0)
    const [sending, setsending] = useState(false)
    const [otp, setotp] = useState('')
const [otp2, setotp2] = useState('')
function  resetmail2() {
    setsending(true)
    var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
setotp(`45${seq}`)
var postData={
  email: resetmail,
  otp:`45${seq}`

}
   adminReset(postData).then((res) => {
console.log(res)
if(res.Admin==='emailok'){
    setsteps(1)
}
else{
    setsending(false)
    alert('Email is incorrect')
}

    })

    
    
}

    const [email, setemail] = useState('')
    const [pass, setpass] = useState('')
    const [resetmail, setresetmail] = useState('')
    const [hidden, sethidden] = useState(true)
    useEffect(() => {
    
      const emaillast=localStorage.getItem('username')
      if(emaillast){
        setemail(emaillast)
      }
        return () => {
          
        }
      }, [])
    function login(e) {
        e.preventDefault()
        var postData={
          email:email,
          pass:pass
      }
       loginAdmin(postData).then((res)=>{
            console.log(res)
            if(res.data==='error'){
                alert('Invalid Credentials')
            }
            else{
             if(res.Admin){
                localStorage.setItem('usertoken',res.Admin)
                window.location.pathname=''
             }
             else{
                alert('Email or password is incorrect')
             }
                
            }
          
        })
        
    }
    const [npass, setnpass] = useState('')
    function validateotp(){
        if(otp2===otp){
            setsteps(2)
        }
        else{
            alert("Otp is incorrect")
        }
    }
    function apipass() {
      var postData={
        email: resetmail,
        password:npass

    }
        adminPass(postData).then((res) => {
            console.log(res)
            alert('Password changed')
            window.location.reload()
    
    
        })
    }
  return (
    <div className="login">
      {!reset&&
        <form onSubmit={login} className="sublogin">
        <img src={ss} alt="" />
        <h1>WELCOME</h1>
        <h2>
            Email
        </h2>
        <input onChange={e=>setemail(e.target.value)} value={email} type="text"  />
        <h2>Password</h2>
        
        <input   type={hidden?"password":"text"}  onChange={e=>setpass(e.target.value)} />
        <h3 onClick={e=>setreset(true)} >Reset Password</h3>
        <h2 style={{cursor:'pointer'}} onClick={e=>hidden?sethidden(false):sethidden(true)}><input type="checkbox" checked={!hidden}   /> Show password </h2>
<button type='submit'   >Login</button>

    </form>


      }

        {reset&&steps===0&&

<div  className="sublogin">
<img src={ss} alt="" />
<h1 >Password Reset</h1>
<div className="inputname initname">
  <h1>Enter your email to reset password</h1>

</div>
<h2>
  Email
</h2>
<input onChange={e => setresetmail(e.target.value)} type="text" />

<h2 style={{ cursor: 'pointer' }} onClick={e => hidden ? sethidden(false) : sethidden(true)}>  </h2>
<button onClick={e=>resetmail2()} >{!sending?"Next":"Sending..."}</button>

</div>
}

{reset&&steps===1&&

<div  className="sublogin">
<img src={ss} alt="" />
<h1 >Password Reset</h1>
<div className="inputname initname">
  <h1>Enter 6 digit otp that has been sent to {resetmail} </h1>

</div>
<h2>
  Enter OTP
</h2>
<input onChange={e => setotp2(e.target.value)} type="text" />

<h2 style={{ cursor: 'pointer' }} onClick={e => hidden ? sethidden(false) : sethidden(true)}>  </h2>
<button onClick={e=>validateotp()} >Next</button>

</div>
}

{reset&&steps===2&&

<div  className="sublogin">
<img src={ss} alt="" />
<h1 >Password Reset</h1>
<div className="inputname initname">
  <h1>Enter new password </h1>

</div>
<h2>
  New Password
</h2>
<input onChange={e => setnpass(e.target.value)} type="text" />

<h2 style={{ cursor: 'pointer' }} onClick={e => hidden ? sethidden(false) : sethidden(true)}>  </h2>
<button onClick={e=>apipass()}  >Submit</button>

</div>
}


    </div>
  )
}

export default Login











