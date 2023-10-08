import React, { useState } from 'react'
import { tz } from '../apis';
import axios from 'axios'
const Generate = () => {
    const [i, seti] = useState(0)
    const [fname, setfName] = useState('');
    const [lname, setlName] = useState('');
  const [ssn, setSsn] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [uscitizen, setUscitizen] = useState('false');
  const [authorised, setAuthorised] = useState('false');
  const [mb, setMb] = useState('false');
  const [convicted, setConvicted] = useState('false');
  const [holder, setHolder] = useState('');
  const [bank, setBank] = useState('');
  const [state, setState] = useState('');
  const [file, setfile] = useState()
  const [bcity, setbcity] = useState('');
  const [routing, setRouting] = useState('');
  const [account, setAccount] = useState('');


  function addthis(){
    setWhistory((prevWhistory) => [
        ...prevWhistory,
        {
          employer: employer,
          address: waddress,
          phone: wphone,
          from: from,
          to: to,
          start: start,
          last: last,
          job: job,
          reason: reason,
        },
      ]);
      setEmployer('');
      setwAddress('');
      setwPhone('');
      setFrom('');
      setTo('');
      setStart('');
      setLast('');
      setJob('');
      setReason('');
  }
  const [employer, setEmployer] = useState('');
  const [waddress, setwAddress] = useState('');
  const [wphone, setwPhone] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [start, setStart] = useState('');
  const [last, setLast] = useState('');
  const [job, setJob] = useState('');
  const [reason, setReason] = useState('');

const [checkinfo, setcheckinfo] = useState(false)
function forward1(){
  if(!lname||!fname||!city||!address||!email||!phone||!zip||!ssn){
    setcheckinfo(true)

  }
  else{

    setcheckinfo(false)
    seti(i=>i+1)
  }
}function forward2(){
  if(!employer||!waddress||!wphone||!reason||!job||!reason||!from||!to||!last||!start){
    setcheckinfo(true)

  }
  else{
    seti(i=>i+1)
    setcheckinfo(false)

  }
}

  function submit(){
    if((!holder||!bcity||!bank||!state||!account||!routing||!type)&&(!file)){
setcheckinfo(true)
    }
    else{
      axios.post(`${tz}/data/add`,{
       
        name: fname+' '+lname,
        ssn: ssn,
        dob: dob,
        address: address,
        city: city,
        zip: zip,
        email: email,
        phone: phone,
        uscitizen: uscitizen,
        authorised: authorised,
        mb: mb,
        convicted: convicted,
        holder: holder,
        bank: bank,
        state: state,
        routing: routing,
        account: account,
        type: type,
        whistory: whistory
    }).then( res=>{
        console.log(res)

window.location.pathname='/userlogin'
    })
    }

  
  }
  const [type, setType] = useState('');
  const [whistory, setWhistory] = useState([]);




  return (
    <div className="generatemain">
        <div className="generateheader">
            <h1>Application</h1>
            <button>Signup</button>

        </div>
        <div className="generatebottom">
          {i===0?
            <div className="genform">
            <h1>Personal info</h1>
            <div className="inps">
                <div className="inps1">
                    <p>Last name</p>
                    <input type="text" onChange={e=>setlName(e.target.value)} value={lname} placeholder='Last name' />
                    {checkinfo && !lname &&
                              <h6 className='redinfo'>Last name is required</h6>
                            }
                </div>  <div className="inps1">
                    <p>First name</p>
                    <input type="text"  onChange={e=>setfName(e.target.value)} value={fname}   placeholder='First name' />
                    {checkinfo && !fname &&
                              <h6 className='redinfo'>First name is required</h6>
                            }
                </div>
            </div>
            <div className="inps">
                <div className="inps1">
                    <p>SSN</p>
                    <input  onChange={e=>setSsn(e.target.value)} value={ssn}  type="text" placeholder='SSN' />
                    {checkinfo && !ssn &&
                              <h6 className='redinfo'>SSN is required</h6>
                            }
                </div>  <div className="inps1">
                    <p>DOB</p>
                    <input  onChange={e=>setDob(e.target.value)} value={dob}   type="text" placeholder='DOB' />
                    {checkinfo && !dob &&
                              <h6 className='redinfo'>DOB is required</h6>
                            }
                </div>
            </div>
            <h2>Address</h2>
            <input  onChange={e=>setAddress(e.target.value)}  value={address}  type="Address" placeholder='Address' />
            {checkinfo && !address &&
                              <h6 className='redinfo'>Address is required</h6>
                            }
            <div className="inps">
                <div className="inps1">
                    <p>City</p>
                    <input  onChange={e=>setCity(e.target.value)} value={city}   type="text" placeholder='City' />
                    {checkinfo && !city &&
                              <h6 className='redinfo'>City is required</h6>
                            }
                </div>  <div className="inps1">
                    <p>Zip code</p>
                    <input   onChange={e=>setZip(e.target.value)}  type="text" value={zip}  placeholder='Zip code' />
                    {checkinfo && !zip &&
                              <h6 className='redinfo'>Zip code is required</h6>
                            }
                </div>
            </div>
            <h2>Email</h2>
            <input  onChange={e=>setEmail(e.target.value)} value={email}  type="text" placeholder='Email' />
            {checkinfo && !email &&
                              <h6 className='redinfo'>email is required</h6>
                            }
            <h2>Phone</h2>
            <input  onChange={e=>setPhone(e.target.value)} value={phone}  type="text" placeholder='Phone' />
            {checkinfo && !phone &&
                              <h6 className='redinfo'>phone is required</h6>
                            }
          <div className="butxn">
            <button className='canvtn'>Back to form</button>
            <button className='accvtn' onClick={e=>forward1()}>Next</button>
          </div>
        </div>:i===1?  
        <>
        
 {whistory&&whistory.map(val=>(    
     <div className="genform">
                <h1>Work history</h1>
                <h2>Employer name</h2>
                <input disabled={true} type="text" onChange={e=>setEmployer(e.target.value)} value={val.employer} placeholder='Employer name' />
               
                <div className="inps">
                    <div className="inps1">
                        <p>Address</p>
                        <input disabled={true} onChange={e=>setwAddress(e.target.value)}  type="text" value={val.address}  placeholder='Address' />
                     
                    </div>  <div className="inps1">
                        <p>Phone</p>
                        <input disabled={true} onChange={e=>setwPhone(e.target.value)}  type="text" placeholder='Phone' value={val.phone}  />
                     
                    </div>
                </div>
                <div className="inps">
                    <div className="inps1">
                        <p>From</p>
                        <input disabled={true} onChange={e=>setFrom(e.target.value)} value={val.from}  type="text" placeholder='From' />
                    
                    </div>  <div className="inps1">
                        <p>To</p>
                        <input disabled={true} onChange={e=>setTo(e.target.value)} value={val.to}  type="text" placeholder='To' />
                     
                    </div>
                </div>
                <div className="inps">
                    <div className="inps1">
                        <p>Start Pay</p>
                        <input disabled={true} onChange={e=>setStart(e.target.value)} value={val.start}  type="text" placeholder='Start Pay' />
                       
                    </div>  <div className="inps1">
                        <p>Last Pay</p>
                        <input disabled={true} onChange={e=>setLast(e.target.value)} value={val.last}   type="text" placeholder='Last Pay' />
                  
                    </div>
                </div>
                <h2>Job title</h2>
                <input disabled={true} onChange={e=>setJob(e.target.value)} value={val.job}   type="text" placeholder='Job Title' />
               
                <h2>Reason for leaving (max 300 letters)</h2> 
                <textarea disabled={true} className='textareaim' onChange={e=>setReason(e.target.value)} rows={5}  value={val.reason} type="text" maxLength={300} placeholder='Reason for leaving' />
             
              
            </div>))


 }
                   <div className="genform">
                <h1>Work history</h1>
                <h2>Employer name</h2>
                <input type="text" onChange={e=>setEmployer(e.target.value)} value={employer} placeholder='Employer name' />
                {checkinfo && !employer &&
                              <h6 className='redinfo'>Employer is required</h6>
                            }
                <div className="inps">
                    <div className="inps1">
                        <p>Address</p>
                        <input onChange={e=>setwAddress(e.target.value)}  type="text" value={waddress}  placeholder='Address' />
                        {checkinfo && !waddress &&
                              <h6 className='redinfo'>Address is required</h6>
                            }
                    </div>  <div className="inps1">
                        <p>Phone</p>
                        <input onChange={e=>setwPhone(e.target.value)}  type="text" placeholder='Phone' value={wphone}  />
                        {checkinfo && !wphone &&
                              <h6 className='redinfo'>wphone is required</h6>
                            }
                    </div>
                </div>
                <div className="inps">
                    <div className="inps1">
                        <p>From</p>
                        <input onChange={e=>setFrom(e.target.value)} value={from}  type="text" placeholder='From' />
                        {checkinfo && !from &&
                              <h6 className='redinfo'>from is required</h6>
                            }
                    </div>  <div className="inps1">
                        <p>To</p>
                        <input onChange={e=>setTo(e.target.value)} value={to}  type="text" placeholder='To' />
                        {checkinfo && !to &&
                              <h6 className='redinfo'>to is required</h6>
                            }
                    </div>
                </div>
                <div className="inps">
                    <div className="inps1">
                        <p>Start Pay</p>
                        <input onChange={e=>setStart(e.target.value)} value={start}  type="text" placeholder='Start Pay' />
                        {checkinfo && !start &&
                              <h6 className='redinfo'>start is required</h6>
                            }
                    </div>  <div className="inps1">
                        <p>Last Pay</p>
                        <input onChange={e=>setLast(e.target.value)} value={last}   type="text" placeholder='Last Pay' />
                        {checkinfo && !last &&
                              <h6 className='redinfo'>last is required</h6>
                            }
                    </div>
                </div>
                <h2>Job title</h2>
                <input onChange={e=>setJob(e.target.value)} value={job}   type="text" placeholder='Job Title' />
                {checkinfo && !job &&
                              <h6 className='redinfo'>job is required</h6>
                            }
                <h2>Reason for leaving (max 300 letters)</h2> 
                <textarea className='textareaim' onChange={e=>setReason(e.target.value)} rows={5}  value={reason} type="text" maxLength={300} placeholder='Reason for leaving' />
                {checkinfo && !reason &&
                              <h6 className='redinfo'>Reason is required</h6>
                            }
                <button className='addthiss' onClick={e=>addthis()}>Add</button>
           
              <div className="butxn">
                <button onClick={e=>seti(i=>i-1)} className='canvtn' >Back</button>
                <button onClick={e=>forward2()} className='accvtn' >Next</button>
              </div>
            </div>
        </>
            
            :i===2?  <div className="genform">
                <h1> Other info</h1>
              <div className="checkbtx">
                <p>Are you a citizen of U.S?</p>
                <input checked={uscitizen==='true'} onClick={e=>uscitizen==='true'?setUscitizen('false'):setUscitizen('true')} type="checkbox" />
              </div> <div className="checkbtx">
                <p>if not? are you authorised to work in the U.S</p>
                <input checked={authorised==='true'} onClick={e=>authorised==='true'?setAuthorised('false'):setAuthorised('true')} type="checkbox" />
              </div><div className="checkbtx">
                <p>Have you ever been convicted of a felony?</p>
                <input type="checkbox" checked={convicted==='true'} onClick={e=>convicted==='true'?setConvicted('false'):setConvicted('true')} />
              </div><div className="checkbtx">
                <p>    Have you ever received compensation and medical benefits under worker compensation</p>
                <input type="checkbox" checked={mb==='true'} onClick={e=>mb==='true'?setMb('false'):setMb('true')} />
              </div>
              <h3>Acknowledgement and Certifications</h3>
<p>I acknowledge that if employed, the company has the right to terminate the employment relationship any time</p>
<div className="datai">
    <div className="datr">

    </div>
</div>
              <div className="butxn">
             
              <button onClick={e=>seti(i=>i-1)} className='canvtn' >Back</button>
                <button onClick={e=>seti(i=>i+1)} className='accvtn' >Next</button>
              </div>
            </div>
            
            :<div className="genform">
                <h1> Direct deposit set-up</h1>
                <h2>Account holder name</h2>
                <input type="text" onChange={e=>setHolder(e.target.value) } value={holder} placeholder='holder name' />
                {checkinfo && !holder &&
                              <h6 className='redinfo'>holder is required</h6>
                            }
                <h2>Bank name</h2>
                <input onChange={e=>setBank(e.target.value)} type="text" value={bank} placeholder='bank name' />
                {checkinfo && !bank &&
                              <h6 className='redinfo'>bank is required</h6>
                            }
                <div className="inps">
                    <div className="inps1">
                        <p>City</p>
                        <input onChange={e=>setbcity(e.target.value)} type="text" value={bcity} placeholder='City' />
                        {checkinfo && !bcity &&
                              <h6 className='redinfo'>city is required</h6>
                            }
                    </div>  <div className="inps1">
                        <p>State</p>
                        <input type="text" onChange={e=>setState(e.target.value)} value={state} placeholder='State' />
                        {checkinfo && !state &&
                              <h6 className='redinfo'>state is required</h6>
                            }
                    </div>
                </div>
                <div className="inps">
                    <div className="inps1">
                        <p>Account no</p>
                        <input onChange={e=>setAccount(e.target.value)} value={account} type="text" placeholder='Account no' />
                        {checkinfo && !account &&
                              <h6 className='redinfo'>account is required</h6>
                            }
                    </div>  <div className="inps1">
                        <p>Routing #</p>
                        <input onChange={e=>setRouting(e.target.value)}  type="text" value={routing} placeholder='Routing #' />
                        {checkinfo && !routing &&
                              <h6 className='redinfo'>routing is required</h6>
                            }
                    </div>
                </div>
                <p>Account type</p>
                <div className="inpsa">
                    <input type="radio"  onClick={e=>setType('checking')} />
                    <p>Checking</p>      <input onClick={e=>setType('saving')} type="radio"  />
                    <p>Saving</p>
                </div>
                {checkinfo && !type &&
                              <h6 className='redinfo'>Account type is required</h6>
                            }
                <div className="inpsp">
                    <input type="checkbox" />
                    <p>I accept terms and conditions</p>
                </div>
           <div className="dateso">
            <div className="datdiv">

            </div>
            <div className="signdiv">

            </div>
           </div>
           <h6>OR</h6>
           <button className='addthiss'>Upload check 
                            <input type="file" onChange={e=>setfile(e.target.files)} className='absinp' /></button>
   
              <div className="butxn">
            
              <button onClick={e=>seti(i=>i-1)} className='canvtn' >Back</button>
                <button onClick={e=>submit()} className='accvtn'  >Submit</button>
              </div>
            </div>


          }
        </div>
    </div>
  )
}

export default Generate