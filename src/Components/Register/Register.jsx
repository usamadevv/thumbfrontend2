import React from 'react'
import { FaRegBell } from 'react-icons/fa'
import { BiLogOutCircle } from 'react-icons/bi'
import { HiOutlineMail } from 'react-icons/hi'
import { BsCreditCard2FrontFill } from 'react-icons/bs'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { useState } from 'react'
import { BiUserCircle } from 'react-icons/bi'
import { FiDownload } from 'react-icons/fi'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { AiOutlineReload } from 'react-icons/ai'
import { RiCloseFill } from 'react-icons/ri'
import prof from '../../images/prof.png'
import { FiCheckCircle } from 'react-icons/fi'
import tre from '../../images/tre.jpg'
import ReactToPrint from 'react-to-print';
import Calendar from 'react-calendar';
import { MdOutlineDateRange } from 'react-icons/md'
import 'react-calendar/dist/Calendar.css';
import { AiFillEye } from 'react-icons/ai'
import { RiBuildingLine } from 'react-icons/ri'

import { GrUserWorker } from 'react-icons/gr'
import { FaUser } from 'react-icons/fa'
import { FaUserCheck, FaUserTimes, FaUserEdit } from 'react-icons/fa'
import { GrFormClose } from 'react-icons/gr'
import { ImCheckmark } from 'react-icons/im'
import XLSX from 'sheetjs-style'
import { FiLogOut } from 'react-icons/fi'
import jsPDF from 'jspdf';

import * as file from 'file-saver'
import axios from 'axios'
import { useEffect } from 'react';
import { tz } from '../apis';
import { TbFileInvoice } from 'react-icons/tb'
import { useRef } from 'react'
import './Register.css'
import { IoClose } from 'react-icons/io5'

const Register = () => {
  const [gender, setgender] = useState('Male')
  const [pass, setpass] = useState('')


  const [dob, setdob] = useState('Date of birth')
  const [emailc, setemailc] = useState('')
  const [trades, settrades] = useState(['Sheet Metal','Electrical Ect'])
const [fname, setfname] = useState('')
const [lname, setlname] = useState('')
  const [cpassc, setcpassc] = useState('')

  const [cityu, setcityu] = useState('')
  const [zipu, setzipu] = useState('')
  const [stateu, setstateu] = useState('')

  const [current, setcurrent] = useState('company')
  function setcurrentx(val){
    if(val==='company'){

    }
    else{
      setcurrent(val)
    }
  }
  function regi() {

    if (!companyname || !address || !phone || !emailc || !cemailsyntax) {
      setcheckinfo(true)

    }
    else {
      setcheckinfo(false)
      axios.post(`${tz}/client/addinactive`, {
       email:emailc,
        username: companyname,
        address: address + " " + city + " " + state + " " + zip,
        number: phone,
        terms: '-',
        status: 'Inactive',

        markup: '0',
      }).then(res => {
        setcreated(true)
        console.log(res)

      })
    }
  }
  const [passregex, setpassregex] = useState(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/)
  function regi2() {
    if (!name || !add2 || !skill || !gender || !phone2 ||!validnum|| !email || !emailsyntax || pass !== cpass || !passregex.test(pass)) {
      setcheckinfo(true)
    }
    else {
      setcheckinfo(false)

      axios.post(`${tz}/siteuser/addinactive`, {
        name: name+fname+lname,
        nc: 'no',
        taxes: 0,
        skill: skill,
        payrate: '-',
        otpayrate: '-',
        phone: phone2,
        address: zipu+add2+cityu+stateu,
        itin: ITIN,
        status: 'Inactive',
        client: '-',
        email: email.toLocaleLowerCase(),
        gender: gender,
        dob: day + "/" + month + '/' + year,
        password: pass,




      }).then(res => {
console.log(res)
if(res.data.Siteuserd==='user exist'){
  alert('Email already registered')
  setusteps(0)
}
else{

  setcreated(true)
}
      })
    }
  }

  const [cpass, setcpass] = useState('')
  const [companyname, setcompanyname] = useState('')
  const [compass, setcompass] = useState('')
  function forwardc() {
    if (!companyname || !phone || !emailc || !validnumc|| !cemailsyntax || !passregex.test(compass)||compass!==cpassc) {
      setcheckinfo(true)
    }
    else {
      setcheckinfo(false)

      setcsteps(1)
    }
  } function forwardu() {
    if (!name || !email ||   pass !== cpass || !passregex.test(pass))  {
      setcheckinfo(true)

    }
    else if(usteps===0) {
      setcheckinfo(false)

      setusteps(1)
    }
    else{
      setusteps(2)
    }
  }

  const [address, setaddress] = useState('')
  const [zip, setzip] = useState('')
  const [dobsyntax, setdobsyntax] = useState(true)
  const [value, valuex] = useState(new Date())
  const userdob = (e) => {

    valuex(e)
    var ustime = e.toLocaleString("en-US", { hour12: false })
    console.log(ustime)
    setshowcalender(false)
    var yt = ustime.split(', ')
    setdob(yt[0])
    console.log(yt[0])

  };


  const [city, setcity] = useState('')
  const [state, setstate] = useState('')
  const [phone, setphone] = useState('')

  const [phone2, setphone2] = useState('')
  const [skill, setskill] = useState('')
  const [ITIN, setITIN] = useState('')
  const [emailsyntax, setemailsyntax] = useState(false)
  const [cemailsyntax, setcemailsyntax] = useState(false)
  const useremail = (e) => {
    const inputEmail = e.target.value;
    setemail(inputEmail);

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail);
    if (isValidEmail) {
      setemailsyntax(true)
    } else {


      setemailsyntax(false)
    }
  };
  const cemail = (e) => {
    const inputEmail = e.target.value;
    setemailc(inputEmail);

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail);
    if (isValidEmail) {
      setcemailsyntax(true)
    } else {


      setcemailsyntax(false)
    }
  };

  const [tcs, settcs] = useState('')
  function setbixa(event) {
    event.stopPropagation();
    setbix('bixp2')
    console.log("Inner element clicked");
  }
  const [add2, setadd2] = useState('')
  const [name, setname] = useState('')
  const [checkinfo, setcheckinfo] = useState(false)
  function pathn() {
    if (current === 'user') {
      window.location.pathname = 'siteuser'
    }
    else {
      window.location.pathname = 'client'
    }
  }
  const [skildata, setskildata] = useState('')
  useEffect(() => {

    axios
      .get(`${tz}/skills/getallview`).then(res => {
        console.log(res)
        setskildata(res.data.Skillsdata)
      })


    return () => {

    }
  }, [])
  const [day, setday] = useState('0')
  const [month, setmonth] = useState('month')
  const [year, setyear] = useState('')
  const [otp, setotp] = useState('')
  const [cotp, setcotp] = useState('')
  const [showcode, setshowcode] = useState(0)
  function sendotp() {

    var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    setotp(`45${seq}`)
    axios.post(`${tz}/admin/sendotp`, {
      email: email,
      otp: `45${seq}`

    }).then((res) => {
      console.log(res)
      if (res.data.Admin === 'emailok') {
        setshowcode(1)
        console.log('ok')
      }
      else {
        alert('Email is incorrect')
      }

    })


  }
  const [bix, setbix] = useState('bixp')
  function sendotpc() {

    var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    setcotp(`45${seq}`)
    axios.post(`${tz}/admin/sendotp`, {
      email: emailc,
      otp: `45${seq}`

    }).then((res) => {
      console.log(res)
      if (res.data.Admin === 'emailok') {
        setshowccode(1)
        console.log('ok')
      }
      else {
        alert('Email is incorrect')
      }

    })


  }
  function setthisskill(val){
    setskill(val)
    setboxprojects('boxprojects2')
  }
  const [otpverified, setotpverified] = useState(false)
  function setotpnewx(val) {
    if (val.length >= 6 && val === otp) {

      setotpverified(true)
    }
    else if (val.length >= 6 && val !== otp) {


      setotpverified(false)
    }
    else {

    }

  } function setotpnewx2(val) {
    if (val.length >= 6 && val === cotp) {

      setcotpverified(true)
    }
    else if (val.length >= 6 && val !== cotp) {


      setcotpverified(false)
    }
    else {

    }

  }
  const [trade, settrade] = useState('')
  const [otpnew, setotpnew] = useState('')
  const dates = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
  ];
  const years = [
    1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959,
    1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969,
    1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979,
    1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989,
    1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,
    2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009,
    2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
    2020, 2021, 2022, 2023
  ];
  const [validnum, setvalidnum] = useState(true)
  const [validnumc, setvalidnumc] = useState(true)

  const phoneuser = (event) => {
    const newValue = event.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters

    setphone2(newValue);
    if(newValue.length>10||newValue.length<10){
      setvalidnum(false)
    }
    else{
      setvalidnum(true)
    }

  };

  const phonecompany = (event) => {
    const newValue = event.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    setphone(newValue);
    if(newValue.length>10||newValue.length<10){
      setvalidnumc(false)
    }
    else{
      setvalidnumc(true)
    }
  };

  function settcsx(val){
    settcs(val)
    setboxprojects('boxprojects2')
  }
  const [created, setcreated] = useState(false)
  const [email, setemail] = useState('')
  const [Electrical, setElectrical] = useState(false)
  const [showcalender, setshowcalender] = useState(false)
  const [sheet, setsheet] = useState(false)
  const [other, setother] = useState(false)
  const [showpassword, setshowpassword] = useState(false)
  const [boxprojects, setboxprojects] = useState('boxprojects2')
  const [othertrade, setothertrade] = useState('')
  const [usteps, setusteps] = useState(0)

  const [showccode, setshowccode] = useState(0)
  const [cotpverified, setcotpverified] = useState(false)
  const [csteps, setcsteps] = useState(0)

  useEffect(() => {
 
  
    setboxprojects('boxprojects2')
    settcs('')
    return () => {
    }
  }, [sheet,Electrical])
  
  const [language, setlanguage] = useState('en')
  return (
    <>
      {
        language === 'en' ?
          <div className="register">
            <div className="selecttype">
              {current === 'user' ?
                <>
                  <button onClick={e => setcurrentx('user')} className='purp rad'>User</button>
                  <button
                  style={{
                    cursor:'not-allowed'
                  }}
                  className='groo rad2' onClick={e => setcurrentx('company')}>Company</button></> :
                <>

                  <button className='groo rad' onClick={e => setcurrentx('user')}>User</button>
                  <button
                  
                  className='purp rad2' onClick={e => setcurrentx('company')}>Company</button></>
              }
            </div>
            <div className="register2">

            </div>
            {!created ?
              current === 'company' ?
                <div className="subregister">


                  <div className="subr1">
                    <>
                      {csteps === 0 ?
                        <>



                          <h1>Registration form</h1>
                          <p>Please fill all the required fields</p>
                          <div className="crin ">
                            <input placeholder='Company legal name' onChange={e => setcompanyname(e.target.value)} type="
        " />
                            <RiBuildingLine className='hiout' />
                          </div>
                          {checkinfo && !companyname &&
                            <h6 className='redinfo'>Company Name is required</h6>
                          }
                          <div className="crin crink">
                            <input placeholder='Email' onChange={cemail}  disabled={showccode === 1 ? true : false} type="
        " />

                            {
  cemailsyntax&&!cotpverified&&
  <p style={{cursor:'pointer'}} onClick={e=>sendotpc()}>Get Code</p>
}

                            {
                              cotpverified &&
                              <p style={{ color: 'green', fontSize: 21 }}><FiCheckCircle /></p>
                            }

                          </div>
                          {checkinfo && !emailc &&
                            <h6 className='redinfo'>Email is required</h6>
                          }{checkinfo && !cemailsyntax &&
                            <h6 className='redinfo'>Enter valid email</h6>
                          }

                          {showccode === 1 && emailc.length >= 1 && !cotpverified &&

                            <div className="crin crink">
                              <input onChange={e => setotpnewx2(e.target.value)} placeholder='Enter otp' type="
  " />
                              {
                                emailsyntax &&
                                <p ></p>
                              }

                            </div>

                          }
                          <div className="crin crink">
                            <input placeholder='Password' onChange={e => setcompass(e.target.value)}  type={showpassword ? 'text' : 'password'} />
                            <AiFillEye className='hiout' onClick={e=>setshowpassword(showpassword ? false : true)} />
                          </div>
                          {checkinfo && !passregex.test(compass) &&
                            <h6 className='redinfo'>Password must contain one uppercase one lowercase and number.</h6>
                          }
 <div className="crin crink">
                            <input placeholder='Confirm password' onChange={e => setcpassc(e.target.value)}  type={showpassword ? 'text' : 'password'} />
                            <AiFillEye className='hiout' onClick={e=>setshowpassword(showpassword ? false : true)} />
                          </div>
                          {checkinfo && compass!==cpassc &&
                            <h6 className='redinfo'>Password does not match</h6>
                          }

                         

                          <div className="crin crink">
                            <p>+1</p>
                            <input placeholder='Phone' onChange={phonecompany} value={phone} type="tel" />
                            <BsFillTelephoneFill className='hiout' />
                          </div>
                          {checkinfo && !phone &&
                            <h6 className='redinfo'>Phone is required</h6>
                          }
                          {checkinfo && !validnumc &&
                            <h6 className='redinfo'>Enter valid number</h6>
                          }
                          <div className="crin2 crink" onClick={e => forwardc()}>
                            Next
                          </div></> :
                        <> <h1>Registration form</h1>
                          <p>Please fill all the required fields</p>
                          <div className="crin">
                            <input placeholder='Address' onChange={e => setaddress(e.target.value)} type="
        " />
                          </div>
                          {checkinfo && !address &&
                            <h6 className='redinfo'> address is required</h6>
                          }

                          <div className="crinp crink">
                            <div className="crin  crin3">
                              <input placeholder='city' onChange={e => setcity(e.target.value)} type="
        " />
                              <AiFillEye className='hiout' />
                            </div>

                            <div className="crin  crin4">
                              <input placeholder='state' onChange={e => setstate(e.target.value)} type="
        " />
                              <RiBuildingLine className='hiout' />
                            </div>


                          </div>
                          {checkinfo && !state &&
                            <h6 className='redinfo'>state code is required</h6>
                          }
                          {checkinfo && !city &&
                            <h6 className='redinfo'>city is required</h6>
                          }
                          <div className="crin crink">
                            <input placeholder='Zip code' onChange={e => setzip(e.target.value)} value={zip} type="       " />
                          </div>
                          {checkinfo && !zip &&
                            <h6 className='redinfo'>Zip code is required</h6>
                          }


                          <div className="crin crink">
                       
                            <input placeholder='Trade Company service' onClick={e => setboxprojects('boxprojects')}  value={tcs}       onChange={e => settcs(e.target.value)} type="
        " />


                        {trades.some(item => item.toLowerCase().search(tcs.toLowerCase())>=0) &&tcs.length>=1&&    <div className={boxprojects} >
                              <IoClose onClick={e => setboxprojects('boxprojects2')} className='iocx' />


                              {trades.map(val=>(
val.toLowerCase().search(tcs.toLowerCase())>=0&&      <p className='rowss'  onClick={e => settcsx(val)} >{val}

<p></p>
</p>

                              ))


                              }

                     
                           
                         
                            </div>

                        }


                            {
                              other &&

                              <input type="text" onChange={e => setothertrade(e.target.value)} placeholder="type here" />
                            }
                          </div>
                        {/*  <div className="crin crink" >
                            Upload w9 (optional)
                            <input type="file" className='absinp' />
                          </div>*/}
                          <div className="crin2 crink" onClick={e => regi()}>
                            Submit
                          </div></>

                      }
                   {csteps===0&&   <div className="langu">
Language:
<div className="langus">
  <select name="" id="" onChange={e => setlanguage(e.target.value)} value={language}>
    <option value="en">English</option>

    <option value="sp">Spanish</option>
  </select>

  <div class="dropdown-icon">&#9660;</div>

</div>
</div>
                   }
                    </>

                  </div>
                  <div className="subr2">
                    <div className="abdvg"></div>
                    <img src={tre} alt="" />

                  </div>

                </div> :
                <div className="subregister">


                  <div className="subr1">
                    <>
                      {usteps === 0 ?
                        <>



                          <h1>Registration form</h1>
                          <p>Please fill all the required fields</p>
                         <div className="crinpp">
                         <div className="crin">
                            <input className='vbw' placeholder='First name' onChange={e => setname(e.target.value)} type="
     " />
     
     


                          </div>
                          <div className="crin">
                            <input className='vbw' placeholder='Middle name' onChange={e => setfname(e.target.value)} type="
     " />
     
     


                          </div>
                          <div className="crin">
                            <input className='vbw' placeholder='Last name' onChange={e => setlname(e.target.value)} type="
     " />
     
     


                          </div>
                         </div>
                          {checkinfo && !name &&
                            <h6 className='redinfo'> Name is required</h6>
                          }
                          <div className="crin crink">
                            <input onChange={useremail} value={email} disabled={showcode === 1 ? true : false} placeholder='Enter email' type="
     " />
                            {
  emailsyntax&&!otpverified&&
  <p style={{cursor:'pointer'}} onClick={e=>sendotp()}>Get Code</p>
      }

                            {
                              otpverified &&
                              <p style={{ color: 'green', fontSize: 21 }}><FiCheckCircle /></p>
                            }


                          </div>

                          {checkinfo && !email &&
                            <h6 className='redinfo'>Email is required</h6>

                          } {checkinfo && !emailsyntax &&
                            <h6 className='redinfo'>Enter valid Email</h6>

                          }

                          {showcode === 1 && email.length >= 1 && !otpverified &&

                            <div className="crin crink">
                              <input onChange={e => setotpnewx(e.target.value)} placeholder='Enter otp' type="
     " />
                              {
                                emailsyntax &&
                                <p ></p>
                              }

                            </div>

                          }
                        
                        <div className="crin crink">
                            <input placeholder='Password' onChange={e => setpass(e.target.value)} value={pass}  type={showpassword ? 'text' : 'password'}  />
                            <AiFillEye onClick={e=>setshowpassword(showpassword?false:true)} />
                          </div>
                          {checkinfo && !pass &&
                            <h6 className='redinfo'>Password is required</h6>
                          } {checkinfo && !passregex.test(pass) &&
                            <h6 className='redinfo'>Password must contain one uppercase one lowercase and number.</h6>
                          }

                          <div className="crin crink">
                            <input placeholder='Confirm password' onChange={e => setcpass(e.target.value)} type={showpassword ? 'text' : 'password'}  />
                            <AiFillEye onClick={e=>setshowpassword(showpassword?false:true)} />
                          </div>
                          {checkinfo && cpass !== pass &&
                            <h6 className='redinfo'>Password does not match</h6>
                          }








                          <div className="crin2 crink" onClick={e => forwardu()}>
                            Next
                          </div>
                   
                   {/*       <button className='uploadbc2' onClick={e => window.location.pathname = '/generate'}> Fill out Application  <p className={bix} >
                            <IoClose onClick={setbixa} className='iocx ' />
                            By filling out application you will be creating a resume that you can easily shared and store for future use. You will also be in front road sit for companies to contact and hire you asap. At the best pay rate available in your town. This i pop up note

                        </p> </button>*/}
                        </> :usteps===1?

<> <h1>Registration form</h1>
<p>Please fill all the required fields</p>

<div className="cftr">
  <label>DOB</label>



  <select onChange={e => setmonth(e.target.value)} value={month}  >
    <option value="01">January</option>
    <option value="02">February</option>
    <option value="03">March</option>
    <option value="04">April</option>
    <option value="05">May</option>
    <option value="06">June</option>
    <option value="07">July</option>
    <option value="08">August</option>
    <option value="09">September</option>
    <option value="10">October</option>
    <option value="11">November</option>
    <option value="12">December</option>
  </select>
  <select className='dd'  onChange={e => setday(e.target.value)}>
    <option value=""> Day</option>
{dates.map(val=>(

  
<option value={val}>{val}</option>
))

}

  </select>
  <select className='yyyy'  onChange={e =>  setyear(e.target.value)}>
    <option value=""> yyyy</option>
{years.map(val=>(

  
<option value={val}>{val}</option>
))

}

  </select>
</div>
<div className="crin">

  <select name="cars" id="cars" style={{width:'100%'}} onChange={e => setgender(e.target.value)}>




  <option value={''}>Gender</option>
    <option value={'Male'}>Male</option>
    <option value={'Female'}>Female</option>
  </select>

<div class="dropdown-icon dpicon2">&#9660;</div>
</div>

{checkinfo && !gender &&
  <h6 className='redinfo'> Gender is required</h6>
}


{checkinfo && !dobsyntax &&
  <h6 className='redinfo'>Date format (mm-dd-yyyy)</h6>

}




<div className="crin crink">
  <input                type="text"
autoComplete='off'
placeholder='skill'
    onChange={e => setskill(e.target.value)} value={skill} onClick={e => setboxprojects('boxprojects')} />
  <GrUserWorker className='hiout' />
{skill.length>0&&skildata.some(item => item.name.toLowerCase().search(skill.toLowerCase())>=0) &&  <div className={boxprojects} style={{paddingLeft:5}} >
   


{skill.length>0&&skildata&&skildata.map(val=>(
val.name.toLowerCase().search(skill.toLowerCase())>=0&&  <p onClick={e=>setthisskill(val.name)}>
{val.name}
<p></p>
</p>    
))

}
 

  </div>

}
</div>

{checkinfo && !skill &&
  <h6 className='redinfo'>Skill is required</h6>
}
<div className="crin crink">
  <p>+1</p>
  <input placeholder='Phone' 
     value={phone2}
     onChange={phoneuser}
  type="tel" />
  <BsFillTelephoneFill className='hiout' />

</div>
{checkinfo && !phone2 &&
  <h6 className='redinfo'>Enter phone number</h6>
} {checkinfo && !validnum &&
  <h6 className='redinfo'>Enter valid number</h6>
}


<div className="crin2 crink" onClick={e => forwardu()}>
  Next
</div></>
:
                        
                        <> <h1>Registration form</h1>
                          <p>Please fill all the required fields</p>

                       
                        

                          <div className="crin crink">
                            <input placeholder='Address' onChange={e => setadd2(e.target.value)} type="
     " />
                            <RiBuildingLine className='hiout' />
                          </div>
                          {checkinfo && !add2 &&
                            <h6 className='redinfo'>Address is required</h6>
                          }
                            <div className="crin crink" >
                            <input placeholder='Apartment number' onChange={e => setadd2(e.target.value)} type="
     " />
                            <RiBuildingLine className='hiout' />
                          </div>
                          {checkinfo && !add2 &&
                            <h6 className='redinfo'>Address is required</h6>
                          }


<div className="crinpp"  style={{
 marginTop:25
}} >
                         <div className="crin">
                            <input className='vbw' placeholder='City' onChange={e => setcityu(e.target.value)} type="
     " />
     
     


                          </div>
                          <div className="crin">
                            <input className='vbw' placeholder='State' onChange={e => setstateu(e.target.value)} type="
     " />
     
     


                          </div>
                          <div className="crin">
                            <input className='vbw' placeholder='Zip' onChange={e => setzipu(e.target.value)} type="
     " />
     
     


                          </div>
                         </div>

                          <div className="crin2 crink" onClick={e => regi2()}>
                            Submit
                          </div></>

                      }
               
               {usteps===0&&       <div className="langu">
                        Language:
                        <div className="langus">
                          <select name="" id="" onChange={e => setlanguage(e.target.value)} value={language}>
                            <option value="en">English</option>

                            <option value="sp">Spanish</option>
                          </select>

                          <div class="dropdown-icon">&#9660;</div>

                        </div>
                      </div>

               }
                    </>

                  </div>
                  <div className="subr2">
                    <div className="abdvg"></div>
                    <img src={tre} alt="" />

                  </div>

                </div>

              :
              <div className="subregister subreg">

                <div className="circltick">
                  <ImCheckmark className='cfgt' />
                </div>
                <h1>Your Account is active. You can login now</h1>

                <p>Password: {pass}</p>
                <button className='loog' onClick={e => pathn()} >Login</button>


              </div>

            }
          </div> : <>
            <div className="register">
              <div className="selecttype">
                {current === 'user' ?
                  <>
                    <button onClick={e => setcurrentx('user')} className='purp rad'>Usuario</button>
                    <button  style={{
                    cursor:'not-allowed'
                  }} className='groo rad2' onClick={e => setcurrentx('company')}>Empresa</button>
                  </>
                  :
                  <>
                    <button className='groo rad' onClick={e => setcurrentx('user')}>Usuario</button>
                    <button className='purp rad2' onClick={e => setcurrentx('company')}>Empresa</button>
                  </>
                }
              </div>
           
              {!created ?
                current === 'company' ?
                  <div className="subregister">
                    <div className="subr1">
                      <>
                        {csteps === 0 ?
                          <>
                            <h1>Formulario de Registro</h1>
                            <p>Por favor complete todos los campos requeridos</p>
                            <div className="crin">
                              <input placeholder='Empresa' onChange={e => setcompanyname(e.target.value)} type="text" />
                              <RiBuildingLine className='hiout' />
                            </div>
                            {checkinfo && !companyname &&
                              <h6 className='redinfo'>Nombre de la Empresa es obligatorio</h6>
                            }
                            <div className="crin crink">
                              <input placeholder='Correo electrónico' onChange={cemail} disabled={showccode === 1 ? true : false} type="email" />

                              {cemailsyntax && !cotpverified &&
                                <p style={{ cursor: 'pointer' }} onClick={e => sendotpc()}>Obtener Código</p>
                        }

                              {cotpverified &&
                                <p style={{ color: 'green', fontSize: 21 }}><FiCheckCircle /></p>
                              }

                            </div>
                            {checkinfo && !emailc &&
                              <h6 className='redinfo'>Correo electrónico es obligatorio</h6>
                            }
                            {checkinfo && !cemailsyntax &&
                              <h6 className='redinfo'>Ingrese un correo electrónico válido</h6>
                            }
                            {/*checkinfo && !cotpverified &&
                              <h6 className='redinfo'>El correo electrónico no está verificado</h6>
                          */}
                            {showccode === 1 && emailc.length >= 1 && !cotpverified &&
                              <div className="crin crink">
                                <input onChange={e => setotpnewx2(e.target.value)} placeholder='Ingrese el código' type="number" />
                                {emailsyntax &&
                                  <p ></p>
                                }
                              </div>
                            }
                            <div className="crin crink">
                              <input placeholder='Contraseña' onChange={e => setcompass(e.target.value)} type={showpassword ? 'text' : 'password'}  />
                            <AiFillEye onClick={e=>setshowpassword(showpassword?false:true)} />
                         
                            </div>
                            {checkinfo && !passregex.test(compass) &&
                              <h6 className='redinfo'>La contraseña debe contener una mayúscula, una minúscula y un número.</h6>
                            }
                            <div className="crin crink">
                            <input placeholder='Confirmar contraseña' onChange={e => setcpassc(e.target.value)}  type={showpassword ? 'text' : 'password'} />
                            <AiFillEye className='hiout' onClick={e=>setshowpassword(showpassword ? false : true)} />
                          </div>
                          {checkinfo && compass!==cpassc &&
                            <h6 className='redinfo'>La contraseña no coincide.</h6>
                          }
                          
                            <div className="crin crink">
                              <p>+1</p>
                              <input placeholder='Teléfono' onChange={phonecompany} value={phone} type="tel" />
                              <BsFillTelephoneFill className='hiout' />
                            </div>
                            {checkinfo && !phone &&
                              <h6 className='redinfo'>Teléfono es obligatorio</h6>
                            }
                            {checkinfo && !validnumc &&
                            <h6 className='redinfo'>Número de teléfono válido</h6>
                          }
                            <div className="crin2 crink" onClick={e => forwardc()}>
                              Siguiente
                            </div>
                          </>
                          :
                          <>
                            <h1>Formulario de Registro</h1>
                            <p>Por favor complete todos los campos requeridos</p>
                            <div className="crin">
                              <input placeholder='Dirección' onChange={e => setaddress(e.target.value)} type="text" />
                            </div>
                            {checkinfo && !address &&
                              <h6 className='redinfo'>Dirección es obligatorio</h6>
                            }
                            <div className="crinp crink">
                              <div className="crin  crin3">
                                <input placeholder='Ciudad' onChange={e => setcity(e.target.value)} type="text" />
                                <AiFillEye className='hiout' />
                              </div>
                              <div className="crin  crin4">
                                <input placeholder='Estado' onChange={e => setstate(e.target.value)} type="text" />
                                <RiBuildingLine className='hiout' />
                              </div>
                            </div>
                            {checkinfo && !state &&
                              <h6 className='redinfo'>Estado es obligatorio</h6>
                            }
                            {checkinfo && !city &&
                              <h6 className='redinfo'>Ciudad es obligatorio</h6>
                            }
                            <div className="crin crink">
                              <input placeholder='Código Postal' onChange={e => setzip(e.target.value)} value={zip} type="text" />
                            </div>
                            {checkinfo && !zip &&
                              <h6 className='redinfo'>Código Postal es obligatoria</h6>
                            }

<div className="crin crink">
                            <p>{sheet === true&&'Sheet Metal, '}{Electrical === true&&'Electrical,  '}</p>
                            <input placeholder='Servicio de la Empresa Comercial' onClick={e => setboxprojects('boxprojects')}  value={tcs}       onChange={e => settcs(e.target.value)} type="
        " />


{trades.some(item => item.toLowerCase().search(tcs.toLowerCase())>=0) &&tcs.length>=1&&    <div className={boxprojects} >
                              <IoClose onClick={e => setboxprojects('boxprojects2')} className='iocx' />


                              {trades.map(val=>(
val.toLowerCase().search(tcs.toLowerCase())>=0&&      <p className='rowss'  onClick={e => settcsx(val)} >{val}

<p></p>
</p>

                              ))


                              }

                     
                           
                         
                            </div>

                        }

                            {
                              other &&

                              <input type="text" onChange={e => setothertrade(e.target.value)} placeholder="escriba aquí" />
                            }
                          </div>


                            <div className="crin2 crink" onClick={e => regi()}>
                              Enviar
                            </div>
                          </>
                        }
                     {csteps===0&&   <div className="langu">
                          Language:
                          <div className="langus">
                            <select name="" id="" onChange={e => setlanguage(e.target.value)} value={language}>
                              <option value="en">English</option>

                              <option value="sp">Spanish</option>
                            </select>

                            <div class="dropdown-icon">&#9660;</div>

                          </div>
                        </div>

                     }
                      </>
                    </div>
                    <div className="subr2">
                      <div className="abdvg"></div>
                      <img src={tre} alt="" />
                    </div>
                  </div>
                  :
                  <div className="subregister">
                    <div className="subr1">
                      <>
                        {usteps === 0 ?
                          <>
                            <h1>Formulario de Registro</h1>
                            <p>Por favor complete todos los campos requeridos</p>
                            <div className="crinpp">
                         <div className="crin">
                            <input className='vbw' placeholder='First name' onChange={e => setname(e.target.value)} type="
     " />
     
     


                          </div>
                          <div className="crin">
                            <input className='vbw' placeholder='Middle name' onChange={e => setfname(e.target.value)} type="
     " />
     
     


                          </div>
                          <div className="crin">
                            <input className='vbw' placeholder='Last name' onChange={e => setlname(e.target.value)} type="
     " />
     
     


                          </div>
                         </div>
                            {checkinfo && !name &&
                              <h6 className='redinfo'>Nombre es obligatorio</h6>
                            }
                            <div className="crin crink">
                              <input onChange={useremail} value={email} disabled={showcode === 1 ? true : false} placeholder='Ingrese el correo electrónico' type="email" />
                              {5===4&&emailsyntax && !otpverified &&
                                <p style={{ cursor: 'pointer' }} onClick={e => sendotp()}>Obtener Código</p>
                              }
                              {otpverified &&
                                <p style={{ color: 'green', fontSize: 21 }}><FiCheckCircle /></p>
                              }
                            </div>
                            {checkinfo && !email &&
                              <h6 className='redinfo'>Correo electrónico es obligatorio</h6>
                            }
                            {checkinfo && !emailsyntax &&
                              <h6 className='redinfo'>Ingrese un correo electrónico válido</h6>
                            }
                            {checkinfo && !otpverified &&
                              <h6 className='redinfo'>El correo electrónico no está verificado</h6>
                            }
                            {showcode === 1 && email.length >= 1 && !otpverified &&
                              <div className="crin crink">
                                <input onChange={e => setotpnewx(e.target.value)} placeholder='Ingrese el código' type="number" />
                                {emailsyntax &&
                                  <p ></p>
                                }
                              </div>
                            }
                                <div className="crin crink">
                              <input placeholder='Contraseña' onChange={e => setpass(e.target.value)} type={showpassword ? 'text' : 'password'}  />
                            <AiFillEye onClick={e=>setshowpassword(showpassword?false:true)} />
                            </div>
                            {checkinfo && !pass &&
                              <h6 className='redinfo'>Contraseña es obligatoria</h6>
                            }
                            {checkinfo && !passregex.test(pass) &&
                              <h6 className='redinfo'>La contraseña debe contener una mayúscula, una minúscula y un número.</h6>
                            }
                            <div className="crin crink">
                              <input placeholder='Confirmar contraseña' onChange={e => setcpass(e.target.value)} type={showpassword ? 'text' : 'password'}  />
                            <AiFillEye onClick={e=>setshowpassword(showpassword?false:true)} />
                            </div>
                            {checkinfo && cpass !== pass &&
                              <h6 className='redinfo'>Las contraseñas no coinciden</h6>
                            }

                        
                         








                            <div className="crin2 crink" onClick={e => forwardu()}>
                              Siguiente
                            </div>
                         {/*   <button className='uploadbc2' onClick={e => window.location.pathname = '/generate'}> Llenar solicitud <p className={bix} >
                            <IoClose onClick={setbixa} className='iocx ' />
                            Al completar la solicitud, creará un currículum que puede compartir y almacenar fácilmente para uso futuro. También estará en primera fila para que las empresas se comuniquen con usted y lo contraten lo antes posible. A la mejor tasa de pago disponible en su ciudad. Esta nota emergente
                          </p> </button>*/}
                          </>
                          :
                          <>
                            <h1>Formulario de Registro</h1>
                            <p>Por favor complete todos los campos requeridos</p>
                         
                            <div className="cftr">
                            <label>DOB</label>

                            <select onChange={e => setmonth(e.target.value)} value={month}>
                          
                              <option value="01">January</option>
                              <option value="02">February</option>
                              <option value="03">March</option>
                              <option value="04">April</option>
                              <option value="05">May</option>
                              <option value="06">June</option>
                              <option value="07">July</option>
                              <option value="08">August</option>
                              <option value="09">September</option>
                              <option value="10">October</option>
                              <option value="11">November</option>
                              <option value="12">December</option>
                            </select>
                            <select className='dd'  onChange={e => setday(e.target.value)}>
                              <option value=""> Day</option>
                          {dates.map(val=>(

                            
<option value={val}>{val}</option>
                          ))

                          }

                            </select>

                            <select className='yyyy'  onChange={e =>  setyear(e.target.value)}>
                              <option value=""> yyyy</option>
                          {years.map(val=>(

                            
<option value={val}>{val}</option>
                          ))

                          }

                            </select>
                          </div>
                            <div className="crin">
                              <select name="cars" id="cars" value={gender} style={{width:'100%'}}  onChange={e => setgender(e.target.value)}>
                                <option value={'Hombre'}>Hombre</option>
                                <option value={'Mujer'}>Mujer</option>
                              </select>


                       
                           
                          <div class="dropdown-icon dpicon2">&#9660;</div>
               
                            </div>
                            {checkinfo && !gender &&
                              <h6 className='redinfo'>Género es obligatorio</h6>
                            }

                            {checkinfo && !dobsyntax &&
                              <h6 className='redinfo'>Formato de fecha (mm-dd-aaaa)</h6>
                            }
                            <div className="crin crink">
                              <input placeholder='Dirección' onChange={e => setadd2(e.target.value)} type="text" />
                              <RiBuildingLine className='hiout' />
                            </div>
                            {checkinfo && !add2 &&
                              <h6 className='redinfo'>Dirección es obligatoria</h6>
                            }
                        

<div className="crin crink">
                            <input placeholder='Habilidad'
                              onChange={e => setskill(e.target.value)} value={skill} type="
     "  onClick={e => setboxprojects('boxprojects')} />
                            <GrUserWorker className='hiout' />
                         {skill.length>0&&skildata.some(item => item.name.toLowerCase().search(skill.toLowerCase())>=0)&&   <div className={boxprojects} style={{paddingLeft:5}} >
                             
                      

                        {skill.length>0&&skildata&&skildata.map(val=>(
                    val.name.toLowerCase().search(skill.toLowerCase())>=0&&  <p onClick={e=>setthisskill(val.name)}>
                      {val.name}
                      <p></p>
                    </p>    
                        ))

                        }
                           
                        
                            </div>

                         }
                          </div>
                            {checkinfo && !skill &&
                              <h6 className='redinfo'>Habilidad es obligatoria</h6>
                            }
                            <div className="crin crink">
                              <p>+1</p>
                              <input placeholder='Teléfono' onChange={phoneuser} value={phone2} type="tel" />
                              <BsFillTelephoneFill className='hiout' />
                            </div>
                            {checkinfo && !phone2 &&
                              <h6 className='redinfo'>Ingrese el número de teléfono</h6>
                            }    {checkinfo && !validnum &&
                              <h6 className='redinfo'>INúmero de teléfono válido</h6>
                            }
                            <div className="crin2 crink" onClick={e => regi2()}>
                              Enviar
                            </div>
                          </>
                        }
                {usteps===0&&        <div className="langu">
                          Language:
                          <div className="langus">
                            <select name="" id="" onChange={e => setlanguage(e.target.value)} value={language}>
                              <option value="en">English</option>

                              <option value="sp">Spanish</option>
                            </select>

                            <div class="dropdown-icon">&#9660;</div>

                          </div>
                        </div>

                }
                      </>
                    </div>
                    <div className="subr2">
                      <div className="abdvg"></div>
                      <img src={tre} alt="" />
                    </div>
                  </div>
                :
                <div className="subregister subreg">
                  <div className="circltick">
                    <ImCheckmark className='cfgt' />
                  </div>
                  <h1>Su cuenta está activa. Ahora puede iniciar sesión</h1>
                  <p>Contraseña: {pass}</p>
                  <button className='loog' onClick={e => pathn()} >Iniciar Sesión</button>
                </div>
              }
            </div>
          </>
      }</>
  )
}

export default Register