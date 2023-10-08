import React, { useState } from 'react'
import { GiEnergyArrow } from 'react-icons/gi'
import { RiLightbulbFlashLine, RiTimerFlashFill } from 'react-icons/ri'
import { BiTime } from 'react-icons/bi'
import { MdSnooze } from 'react-icons/md'
import { AiOutlineReload } from 'react-icons/ai'
import axios from 'axios'
import { useEffect } from 'react'
import { tz } from '../apis'

import {AiFillDelete} from 'react-icons/ai'
import XLSX from 'sheetjs-style'
import jsPDF from 'jspdf';
import * as file from 'file-saver'
import { FiEdit } from 'react-icons/fi'
const Formdat = () => {

const [adduser, setadduser] = useState('adduser2')
const [i, seti] = useState(0)
const [taxes, settaxes] = useState('taxes')
const [circle, setcircle] = useState('circle')
const [is, setis] = useState(0)



const [activetab, setactivetab] = useState(0)
const [data, setdata] = useState()

function updatead(){
    var currentid=ids.split('4sd')
  
    const foundObject = data.find(obj => obj._id === currentid[0]);

    if (foundObject) {
      setemail(foundObject.email);
      setpassword(foundObject.password);
      setsiteaccess(foundObject.site);
      setstreamaccess(foundObject.stream);
      setpresenceaccess(foundObject.presence);
      setprodaccess(foundObject.productivity);
      setstaffaccess(foundObject.staff);
      setcompanyaccess(foundObject.company);
      setsnapaccess(foundObject.snaps);
      setappsaccess(foundObject.apps);
      setgpsaccess(foundObject.gps);
      setleaveaccess(foundObject.leave);
      setnotesaccess(foundObject.note);
      setreportsaccess(foundObject.reports);
      setadminccess(foundObject.admin);
      setrole(foundObject.role1);
      setname(foundObject.name);
      setidcr(foundObject._id)
    } else {
      // Handle case when object with the given ID is not found
    }
    setactiontype('update')
    setadduser('adduser')
}
const [actiontypex, setactiontypex] = useState('edit')
useEffect(() => {
  axios.get(`${tz}/data/getall`).then(res=>{
    console.log(res)
    setdata(res.data.Formdat)
  })

  return () => {
    
  }
}, [])



const [actiontype, setactiontype] = useState('edit')


  function addadmin(){
    if(email&&password){

    }

    else{
        alert('Please Complete All Fields')
    }
  }

const [idb, setidb] = useState('')
function closewin() {
    setadduser('adduser2')
    setactiontype('edit')
    
}
const [o, seto] = useState(0)

const [idno, setidno] = useState('')
const [aduser, setaduser] = useState('adduser2')
const [skillname, setskillname] = useState('')
const [email, setemail] = useState('')
const [password, setpassword] = useState('')
const [streamaccess, setstreamaccess] = useState('Allowed')
const [presenceaccess, setpresenceaccess] = useState('Allowed')
const [staffaccess, setstaffaccess] = useState('Allowed')
const [prodaccess, setprodaccess] = useState('Allowed')
const [siteaccess, setsiteaccess] = useState('Allowed')
const [companyaccess, setcompanyaccess] = useState('Allowed')
const [appsaccess, setappsaccess] = useState('Allowed')
const [snapaccess, setsnapaccess] = useState('Allowed')
const [currone, setcurrone] = useState()
function setdetailsx(val){
    setdetails(1)
    setcurrone(val)

}
const [gpsaccess, setgpsaccess] = useState('Allowed')
const [leaveaccess, setleaveaccess] = useState('Allowed')
const [notesaccess, setnotesaccess] = useState('Allowed')
const [reportsaccess, setreportsaccess] = useState('Allowed')
const [adminccess, setadminccess] = useState('Allowed')
const [projectsaccess, setprojectsaccess] = useState('Allowed')
const [admin, setadmin] = useState()
const [ids, setids] = useState('')
function deleteuser() {
    console.log(ids)
    var r=ids.split('4sd')
    r[r.length-1]= r[r.length-2]
 
    axios.post(`${tz}/admin/deletedata`,{
      ids:r



    }).then(res=>{  
        console.log(res)
        setids('')
        axios.get(`${tz}/admin/getall`).then(res2=>{
           
            setdata(res2.data.Admin)
            setadduser('adduser2')
          })
    })
    
}
const [idcr, setidcr] = useState('')
const [arr, setarr] = useState([])
function updateuser() {
    setactiontype('update')
    setadduser('adduser')
    var idx=ids.split('4sd')
    data.forEach(val => {
        if(val._id===idx[0]){
            setemail(val.email)
            setpassword(val.password)
            setstreamaccess(val.stream)
            setpresenceaccess(val.presence)
            setprodaccess(val.productivity)
            setsiteaccess(val.site)
            setstaffaccess(val.staff)
            setcompanyaccess(val.company)
            setsnapaccess(val.snaps)
            setappsaccess(val.apps)
            setgpsaccess(val.gps) 
            setleaveaccess(val.leave)
            setreportsaccess(val.reports)
            setadminccess(val.admin)
            setidcr(val._id)
        
          
        }
        
    });

    
}
const [role, setrole] = useState('')
function fillall(){
    console.log(ids)
    if(o===0){
        setarr([])
        seto(1)
        setids('')
        data.forEach(elem => {
            setids(ids=>ids+elem._id+'4sd')
           {/*} setarr(arrr=>[...arrr,{    
                name:elem.name,
                nc:elem.nc,
                taxes:elem.taxes,
                skill:elem.skill,
                payrate:elem.payrate,
                otpayrate:elem.otpayrate,
                phone:elem.phone,
                address:elem.address,
                itin:elem.itin,
                status:elem.status,
                client:elem.client
                
            }])*/}
        });
    }
    else{
        setarr([])
        setids('')
        seto(0)

    }

}
function addadmin2(){
    setactiontype('edit')
    setadduser('adduser')

}
const [details, setdetails] = useState(0)
function addadmin(){
  if(actiontype==='edit'){
    if(email&&password){
        axios.post(`${tz}/admin/add`,{
           email: email.toLowerCase(),
           password:password,
           site:siteaccess,
           stream:streamaccess,
           presence:presenceaccess,
           productivity:prodaccess,
           staff:staffaccess,
           company:companyaccess,
           snaps:snapaccess,
           apps:appsaccess,
           gps:gpsaccess,
           leave:leaveaccess,
           note:notesaccess,
           reports:reportsaccess,
           admin:adminccess,
   
           role1:role,
           name:name
   
   
       }).then(res2=>{  
           if(res2.data.Admin==='exist'){
               alert('User already exist')
           }
          else{
   
           console.log(res2)
           axios.get(`${tz}/admin/getall`).then(res=>{
               console.log(res)
               setdata(res.data.Admin)
               setadduser('adduser2')
             })
          }
       })
       
      }
      else{
       alert("Please fill all required fields")
      }
  }
  else{
    axios.post(`${tz}/admin/update`,{
_id:idcr,
        email: email.toLowerCase(),
        password:password,
        site:siteaccess,
        stream:streamaccess,
        presence:presenceaccess,
        productivity:prodaccess,
        staff:staffaccess,
        company:companyaccess,
        snaps:snapaccess,
        apps:appsaccess,
        gps:gpsaccess,
        leave:leaveaccess,
        note:notesaccess,
        reports:reportsaccess,
        admin:adminccess,
        role:role,
        name:name



    }).then(res2=>{  
      
    

        console.log(res2)
        axios.get(`${tz}/admin/getall`).then(res=>{
            console.log(res)
            setdata(res.data.Admin)
            setadduser('adduser2')
            setids('')
          })
       
    })
    
  }
}
const [currid, setcurrid] = useState('')
const [name, setname] = useState('')
const [citizenship, setcitizenship] = useState('all')
  return (
    <>
  
    <div className="sitemap">
    <div className="newst">{
        details===1?
        <div className="newst2"> <button className='deleter' style={{marginTop:20}} onClick={e=>setdetails(0)} > Back</button></div>:
        <p></p>
    }
                    <div className="newst2" style={{marginTop:'20px'}}>

{/*ids.search('4sd')>=0&&ids.split('4sd').length===2&&
<button onClick={e=>updatead()} >Update</button>

  */}
             {    /*   <button className='deleter' onClick={e=>deleteuser()} > Delete</button>
                    <button  onClick={e=>addadmin2()} >+ Add Admin</button>*/}
                    </div>
                </div>

                <div className="newst">{
        details===0?

        <select className='select2s' name="cars" id="cars"  onChange={e => setcitizenship(e.target.value)}>

            <option value='all'>All</option>
            <option value='us'>U.S Citizens</option>       <option value='non'>Non U.S Citizens</option>           
  
    </select>:
        <p></p>
    }
                    <div className="newst2" style={{marginTop:'20px'}}>

{/*ids.search('4sd')>=0&&ids.split('4sd').length===2&&
<button onClick={e=>updatead()} >Update</button>

  */}
             {    /*   <button className='deleter' onClick={e=>deleteuser()} > Delete</button>
                    <button  onClick={e=>addadmin2()} >+ Add Admin</button>*/}
                    </div>
                </div>{details===0?
    <div className="tablerow">
              <div className="subtable">
              <div className="headertable clop">
                <span className='sxx'><input type="checkbox"  checked={o===1} onClick={e=>fillall() } /> </span>
                
                <h4 style={{width:"40px"}}>No.</h4>
              
              
            
                <h3 style={{width:"150px"}}>Name</h3>
                
                <h3 style={{width:"140px"}}>Email</h3>
                    
                    <h6>SSN</h6>
                    
                    <h6>Address</h6>
                    <h3 style={{width:"90px"}}>DOB</h3>
                    <h4 style={{width:"90px"}}>Phone</h4>

                    <h4 style={{width:"90px"}}>U.S citizen</h4>
                    
                  


                </div>
                {  citizenship==='all'&&data&&data.map((val,index)=>(
                  
                    <>
                     <div className="headertable">
                     <span className='sxx'> <input type="checkbox"  checked={ids.search(val._id)>=0} onClick={e=>ids.search(val._id)>=0?setids(ids.replace(val._id+'4sd','')):setids(ids+val._id+'4sd')} /> </span>
        
                <h4 style={{width:"40px"}}>{index}</h4>
                  
                <h3 style={{width:"150px"}}>{val.name}</h3>
                  
                    <h3 style={{width:"140px"}}>{val.email}</h3>
                    <h6> {val.ssn}</h6>
                    
                    <h6 >{val.address}</h6>
                    
                    <h3 style={{width:"90px"}}>{val.dob}</h3>
                    <h4 style={{width:"90px"}} >{val.phone}</h4>
                    <h4 style={{width:"90px"}} >{val.uscitizen==='true'?"yes":'no'}</h4>
                                      
                <div className="bigname" style={{width:'max-content'}}>
                <button style={{fontSize:14,width:'max-content'}} onClick={e=>setdetailsx(val)} ><FiEdit /> Details</button>
                </div>

                </div>
                    </>
                ))

                }    {  citizenship==='non'&&data&&data.map((val,index)=>(
                  val.uscitizen==='false'&&
                    <>
                     <div className="headertable">
                     <span className='sxx'> <input type="checkbox"  checked={ids.search(val._id)>=0} onClick={e=>ids.search(val._id)>=0?setids(ids.replace(val._id+'4sd','')):setids(ids+val._id+'4sd')} /> </span>
        
                <h4 style={{width:"40px"}}>{index}</h4>
                  
                <h3 style={{width:"150px"}}>{val.name}</h3>
                  
                    <h3 style={{width:"140px"}}>{val.email}</h3>
                    <h6> {val.ssn}</h6>
                    
                    <h6 >{val.address}</h6>
                    
                    <h3 style={{width:"90px"}}>{val.dob}</h3>
                    <h4 style={{width:"90px"}} >{val.phone}</h4>
                    <h4 style={{width:"90px"}} >{val.uscitizen==='true'?"yes":'no'}</h4>
                                      
                <div className="bigname" style={{width:'max-content'}}>
                <button style={{fontSize:14,width:'max-content'}} onClick={e=>setdetailsx(val)} ><FiEdit /> Details</button>
                </div>

                </div>
                    </>
                ))

                } {  citizenship==='us'&&data&&data.map((val,index)=>(
                    val.uscitizen==='true'&&
                      <>
                       <div className="headertable">
                       <span className='sxx'> <input type="checkbox"  checked={ids.search(val._id)>=0} onClick={e=>ids.search(val._id)>=0?setids(ids.replace(val._id+'4sd','')):setids(ids+val._id+'4sd')} /> </span>
          
                  <h4 style={{width:"40px"}}>{index}</h4>
                    
                  <h3 style={{width:"150px"}}>{val.name}</h3>
                    
                      <h3 style={{width:"140px"}}>{val.email}</h3>
                      <h6> {val.ssn}</h6>
                      
                      <h6 >{val.address}</h6>
                      
                      <h3 style={{width:"90px"}}>{val.dob}</h3>
                      <h4 style={{width:"90px"}} >{val.phone}</h4>
                      <h4 style={{width:"90px"}} >{val.uscitizen==='true'?"yes":'no'}</h4>
                                        
                  <div className="bigname" style={{width:'max-content'}}>
                  <button style={{fontSize:14,width:'max-content'}} onClick={e=>setdetailsx(val)} ><FiEdit /> Details</button>
                  </div>
  
                  </div>
                      </>
                  ))
  
                  }
              </div>
            </div>:
            <div className="detailstable">
                <div className="headerdetails">
                    <button onClick={e=>setactivetab(0)} className={activetab===0?'activetab':'nonactive'} >General info</button>
<button  onClick={e=>setactivetab(1)}  className={activetab===1?'activetab':'nonactive'}>
    Work history
</button>
<button  onClick={e=>setactivetab(2)}  className={activetab===2?'activetab':'nonactive'}>Bank Details</button>

                </div>
           {activetab===0?     <div className="detailsbody">
                    <div className="emailfield">
                        <p>Email</p>
                        <input type="text" disabled={true} value={currone.email} />
                    </div>    <div className="emailfield">
                        <p>Full name</p>
                        <input type="text" disabled={true} value={currone.name} />
                    </div>    <div className="emailfield">
                        <p>Phone</p>
                        <input type="text" disabled={true} value={currone.phone} />
                    </div>
                    <div className="emailfield">
                        <p>SSN</p>
                        <input type="text" disabled={true} value={currone.ssn} />
                    </div>    <div className="emailfield">
                        <p>Date of birth</p>
                        <input type="text" disabled={true} value={currone.dob} />
                    </div>    <div className="emailfield">
                        <p>Address</p>
                        <input type="text" disabled={true} value={currone.address} />
                    </div>
                    <div className="emailfield">
                        <p>City</p>
                        <input type="text" disabled={true} value={currone.city} />
                    </div>    <div className="emailfield">
                        <p>Zip</p>
                        <input type="text" disabled={true} value={currone.zip} />
                    </div>    <div className="emailfield">
                        <p>U.S Citizen</p>
                        <input type="text" disabled={true} value={currone.uscitizen==='true'?"Yes":'NO'} />
                    </div><div className="emailfield">
                        <p>Felony Convicted</p>
                        <input type="text" disabled={true} value={currone.convicted==='true'?"Yes":'NO'} />
                    </div>

                </div>:activetab===1?
                <div className="detailsbody">
    <table className='custable' style={{ width: '90%' }}>
      <thead>
        <tr>
          <th> Employer</th> <th> Address</th><th> Phone</th><th> Start Pay</th><th> Last Pay</th>
          <th>From</th>
          <th> To</th>
          <th> Job title</th>
        </tr>
      </thead>
      <tbody>
      

        {currone.whistory&&currone.whistory.map(val=>(
  <tr>
  <td> {val.employer}</td>  <td> {val.address}</td>  <td> {val.phone}</td>  <td> {val.start}</td>  <td> {val.last}</td>
  <td> {val.from}</td>
  <td> {val.to}</td>
  <td> {val.job}</td>
</tr>
        ))}
        
      </tbody>
    </table>
                </div>:
              <div className="detailsbody">
              <div className="emailfield">
                  <p>Account holder name</p>
                  <input type="text" disabled={true} value={currone.holder} />
              </div>    <div className="emailfield">
                  <p>Bank</p>
                  <input type="text" disabled={true} value={currone.bank} />
              </div>    <div className="emailfield">
                  <p>State</p>
                  <input type="text" disabled={true} value={currone.state} />
              </div>
              <div className="emailfield">
                  <p>Routing</p>
                  <input type="text" disabled={true} value={currone.routing} />
              </div>    <div className="emailfield">
                  <p>Account #</p>
                  <input type="text" disabled={true} value={currone.account} />
              </div>    <div className="emailfield">
                  <p>Account type</p>
                  <input type="text" disabled={true} value={currone.type} />
              </div>
           

          </div>

           }
            </div>

}

    </div></>
  )
}

export default Formdat