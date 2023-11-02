import React, { useEffect, useRef, useState } from 'react'
import { GiEnergyArrow } from 'react-icons/gi'
import { RiLightbulbFlashLine, RiTimerFlashFill } from 'react-icons/ri'
import { BiTime } from 'react-icons/bi'
import {FaUserNurse} from 'react-icons/fa'
import { MdSnooze } from 'react-icons/md'
import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';
import './signfont.css'

import {FiEdit} from 'react-icons/fi'
import ReactToPrint from 'react-to-print';
import { AiOutlineReload } from 'react-icons/ai'
import {RiPagesLine} from 'react-icons/ri'
import {BsFileBarGraphFill} from 'react-icons/bs'
import { tz } from '../apis'
import axios from 'axios'
import {MdOutlineAccessTimeFilled} from 'react-icons/md'

import XLSX from 'sheetjs-style'
import jsPDF from 'jspdf';

import * as file from 'file-saver'
import Superatt from './Superatt'
import SwipeableButton from './Button'
import { IoClose } from 'react-icons/io5'
import { Calendar } from 'react-calendar'
const Reports = ({props}) => {

    const [datep, setdatep] = useState('')
    useEffect(() => {
      console.log(props)
    
      return () => {
        
      }
    }, [])
    
    function dd(){
        setaction(false)

    }


const [showcalender, setshowcalender] = useState(false)

const [showcalenderx, setshowcalenderx] = useState(false)

const [value2, valuex] = useState(new Date());
const [inend, setinend] = useState('')
const [datr, setdatr] = useState('')
function onxhange(e) {
    valuex(e)
    var ustime = e.toLocaleString("en-US", { hour12: false })
    console.log(ustime)
    setshowcalender(false)
    var yt = ustime.split(', ')
    setdatr(yt[0])
}
    const [indexofitem, setindexofitem] = useState(0)
    const [signing, setsigning] = useState(false)
const [sm, setsm] = useState(false)
    const [d1, setd1] = useState(0)
    const [d2, setd2] = useState(0)
    const [d3, setd3] = useState(0)
    const [d4, setd4] = useState(0)
    const [d5, setd5] = useState(0)
    const [d6, setd6] = useState(0)
    const [d7, setd7] = useState(0)
    function setvalues(val){

        var tx= attreportx2
        setattreportx2([])

        tx[val].wh=0
        tx[val].wh=Number(d1)+Number(d2)+Number(d3)+Number(d4)+Number(d5)+Number(d6)+Number(d7)
        console.log( tx[val].wh)
        tx[val].att.forEach(element => {
            if(element.day==='Monday'){
    element.wh=d1
    
            }
            else if(element.day==='Tuesday'){
                element.wh=d2
            }
            else if(element.day==='Wednesday'){
                element.wh=d3
            }   else if(element.day==='Thursday'){
                    element.wh=d4
            }   else if(element.day==='Friday'){
                    element.wh=d5
            }   else if(element.day==='Saturday'){
                    element.wh=d6
            }   else{
                    element.wh=d7
            }
            
        });
        setattreportx2(tx)
        setsm(false)

    }
    function approve(){
        
        setformanreport(true)
    }
    const [name, setname] = useState('')
function openit(val){
    setindexofitem(val)
    setsm(true)
    setname( attreportx2[val].name)
    attreportx2[val].att.forEach(element => {
        if(element.day==='Monday'){
setd1(element.wh)
        }
        else if(element.day==='Tuesday'){
            setd2(element.wh)
        }
        else if(element.day==='Wednesday'){
            setd3(element.wh)
        }   else if(element.day==='Thursday'){
            setd4(element.wh)
        }   else if(element.day==='Friday'){
            setd5(element.wh)
        }   else if(element.day==='Saturday'){
            setd6(element.wh)
        }   else{
            setd7(element.wh)
        }
        
    });

}
    const [clk, setclk] = useState()
    const [attreportx2, setattreportx2] = useState(props.attreport)

    const componentRef = useRef();
    const componentRefx = useRef();
    const [chkou, setchkou] = useState('')
    const [pending2, setpending2] = useState([])
    const [action, setaction] = useState(true)
    function editlist(){
        setaction(true)
    }

    function openthis(val) {

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
    useEffect(() => {
        openthis(props.project)
      
        return () => {
        
        }
      }, [])
      
const [attreportx, setattreportx] = useState(props.attreport)
const [showreport, setshowreport] = useState(true)
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
    const [report, setreport] = useState(false)
function setformanreports(val){
    setsteps(1)
    Dailys('yearly2')
    console.log(attreport)
    var attr=props.attreport

    attr.forEach((element,index) => {
       element.att= findday(element.att)
       if(index===attr.length-1){
        setattreportx(attr)
       }

    });

    setforman2(true)

}


    const componentRef2 = useRef()

    var styl1p=
    {		border: {
        right: {
            style: "thin",
            color: {rgb:'FFFFFF'}
        },
        left: {
            style: "thin",
            color: {rgb:'FFFFFF'}
        },
        bottom: {
            style: "thin",
            color: {rgb:'FFFFFF'}
        },
        top: {
            style: "thin",
            color: {rgb:'FFFFFF'}
        },
    },
        font: {
            name: "arial",
            bold: true,
            sz:10,
            color:{rgb:'FFFFFF'}
        },
        alignment: {
            vertical: "center",
            horizontal: "center",
        },							// set the style for target cell
        fill: {
            fgColor: {
                
                theme: 8,
                tint: 0.3999755851924192,
                rgb: '4480b8'
            }
        },
    };

    var cstyl2x=
    {		border: {
        right: {
            style: "thin",
            color: {rgb:"8DB2D5"}
        },
        left: {
            style: "thin",
            color: {rgb:"8DB2D5"}
        },
        bottom: {
            style: "thin",
            color: {rgb:"8DB2D5"}
        },
        top: {
            style: "thin",
            color: {rgb:"8DB2D5"}
        },
    },
        font: {
            name: "arial",
            bold: false,
            sz:10,
            color:'000000'
        },
        alignment: {
            vertical: "center",
            horizontal: "center",
        },	
        numFmt: "$#,###.00"
    };
        var styl2xp=
    {		border: {
        right: {
            style: "thin",
            color: {rgb:"8DB2D5"}
        },
        left: {
            style: "thin",
            color: {rgb:"8DB2D5"}
        },
        bottom: {
            style: "thin",
            color: {rgb:"8DB2D5"}
        },
        top: {
            style: "thin",
            color: {rgb:"8DB2D5"}
        },
    },
    fill: {
        fgColor: {
            
            theme: 8,
            tint: 0.3999755851924192,
            rgb: 'C2D6E8'
        }
    },
        font: {
            name: "arial",
            bold: false,
            sz:10,
            color:'000000'
        },
        alignment: {
            vertical: "center",
            horizontal: "center",
        },	
    };
    var cstyl2xp=
    {		border: {
        right: {
            style: "thin",
            color: {rgb:"8DB2D5"}
        },
        left: {
            style: "thin",
            color: {rgb:"8DB2D5"}
        },
        bottom: {
            style: "thin",
            color: {rgb:"8DB2D5"}
        },
        top: {
            style: "thin",
            color: {rgb:"8DB2D5"}
        },
    },
    fill: {
        fgColor: {
            
            theme: 8,
            tint: 0.3999755851924192,
            rgb: 'C2D6E8'
        }
    },
        font: {
            name: "arial",
            bold: false,
            sz:10,
            color:'000000'
        },
        alignment: {
            vertical: "center",
            horizontal: "center",
        },	
        numFmt: "$#,###.00"
    };
        var styl2x=
    {		border: {
        right: {
            style: "thin",
            color: {rgb:"8DB2D5"}
        },
        left: {
            style: "thin",
            color: {rgb:"8DB2D5"}
        },
        bottom: {
            style: "thin",
            color: {rgb:"8DB2D5"}
        },
        top: {
            style: "thin",
            color: {rgb:"8DB2D5"}
        },
    },
        font: {
            name: "arial",
            bold: false,
            sz:10,
            color:'000000'
        },
        alignment: {
            vertical: "center",
            horizontal: "center",
        },	
    };
function reportsa(){
}
const [Daily, setDaily] = useState('reportcard')
const [weekly, setweekly] = useState('reportcard2')
const [yearly, setyearly] = useState('reportcard2')
const [yearly2, setyearly2] = useState('reportcard2')

const [steps, setsteps] = useState(0)
const [yearly3, setyearly3] = useState('reportcard2')

function Dailys(val){
    setdull(true)
    if(val==='daily'){
        setDaily('reportcard')
        setweekly('reportcard2')
        setyearly('reportcard2')
        setyearly3('reportcard2')
        setyearly2('reportcard2')
        setrtype('daily')
    }
    else if(val==='weekly'){
        setDaily('reportcard2')
        setweekly('reportcard')
        setyearly('reportcard2')

        setyearly3('reportcard2')
        setyearly2('reportcard2')
        setrtype('weekly')
    }   else  if(val==='yearly'){
        setDaily('reportcard2')
        setweekly('reportcard2')
        
        setyearly3('reportcard2')
        setyearly2('reportcard2')
        setyearly('reportcard')
        setrtype('yearly')
    }
    else  if(val==='yearly2'){
        setDaily('reportcard2')
        setweekly('reportcard2')
        
        setyearly3('reportcard2')
        setyearly2('reportcard')
        setyearly('reportcard2')
        setrtype('yearly2')
    }
    else  if(val==='yearly3'){
        setDaily('reportcard2')
        setweekly('reportcard2')
        
        setyearly3('reportcard')
        setyearly2('reportcard2')
        setyearly('reportcard2')
        setrtype('yearly3')
    }
    
    

}
useEffect(() => {
    Dailys('daily')
    
      return () => {
        
      }
    }, [])
    
const [adduser, setadduser] = useState('adduser2')
const [ptype, setptype] = useState('cp')
const [sites, setsites] = useState()
const [users, setusers] = useState()
const [auser, setauser] = useState()
const [aproject, setaproject] = useState()
const [forman2, setforman2] = useState(false)
useEffect(() => {
    setaproject(props.project)
    axios.get(`${tz}/jobsite/getall`).then(res2 => {
        console.log(res2)
        setsites(res2.data.Jobsite)
      setaproject(res2.data.Jobsite[0])


    })
    axios.get(`${tz}/siteuser/getall`).then(res2 => {
        console.log(res2)
      
        setusers(props.project.user)

        setauser(props.project.user[0])

    })

  return () => {
    
  }
}, [])
function setreports(val)
{Dailys('yearly3')
    setreport(val)
}

function setuserx(val){
    users&&users.forEach(element => {
        if(element.userid===val){
            setauser(element)
        }
    });

}

const [yx, setyx] = useState()
const [currprocess, setcurrprocess] = useState('btns')
const [email, setemail] = useState('')

const [yx2, setyx2] = useState()
const [currprocess2, setcurrprocess2] = useState('btns')
const [email2, setemail2] = useState('')

function con2(){
    const y= document.getElementById('sharereport').innerHTML
    console.log(y)
    setyx(y)
    setcurrprocess('share')
}
function con3(){
    const y= document.getElementById('easreport').innerHTML
    console.log(y)
    setyx2(y)
    setcurrprocess2('share')
}
function con(){

    axios.post(`${tz}/invoice/saveinvoice`,{
        html:yx,
        key:uuidv4(),
        email:email
    }).then(res2 => {
        console.log(res2)
        alert('Report has been sent successfully')
setcurrprocess('btns')

    })

    
}

function con4(){

    axios.post(`${tz}/invoice/saveinvoice`,{
        html:yx2.replace('<div class="prntbtns2 prntbtns"><button class=" no-print btn1 btn3g">Share</button><button class="no-print btn1" id="90">Export to Pdf</button><button class="no-print btn2x btn1">Cancel</button></div>',''),
        key:uuidv4(),
        email:email2
    }).then(res2 => {
        console.log(res2)
        alert('Report has been sent successfully')
setcurrprocess2('btns')

    })

    
}
const [c, setc] = useState(1)
const [dull, setdull] = useState(true)
const [rtype, setrtype] = useState('daily')
function exports() {
    const filetype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    var ext = '.xlsx'
    
const myHeader = ["DATE","JOBSITE","NAME",'CLOCKIN TIME','CLOCKOUT TIME','WORKING HOURS','STATUS','LATE'];
    const ws = XLSX.utils.json_to_sheet(attreport,{header: myHeader})

    var wscols = [
        { wch: 10 },
        { wch: 15 },
        { wch: 20 },
        { wch: 15 },
        { wch: 15 },
        { wch: 15 },
        { wch: 8 },
        { wch: 10 },
        { wch: 7 },
        { wch: 8 },
        { wch: 12 },
    ];
    for(var k=0;k<attreport.length+1;k++ ){
        if(k===0){
            
    ws[`B${k+1}`].s = styl1p
    ws[`A${k+1}`].s= styl1p
    ws[`C${k+1}`].s= styl1p        
    ws[`D${k+1}`].s= styl1p
    ws[`E${k+1}`].s= styl1p
    ws[`F${k+1}`].s= styl1p
    ws[`G${k+1}`].s= styl1p
    ws[`H${k+1}`].s= styl1p
        }
        else{
            if(k%2===0){

                ws[`B${k+1}`].s = styl2x
                ws[`A${k+1}`].s= styl2x
                ws[`C${k+1}`].s= styl2x        
                ws[`D${k+1}`].s= styl2x
                ws[`E${k+1}`].s= styl2x
                ws[`F${k+1}`].s= cstyl2x
                ws[`G${k+1}`].s= styl2x
                ws[`H${k+1}`].s=  cstyl2x
            }else if(k%2!==0){
                
                ws[`B${k+1}`].s = styl2xp
                ws[`A${k+1}`].s= styl2xp
                ws[`C${k+1}`].s= styl2xp        
                ws[`D${k+1}`].s= styl2xp
                ws[`E${k+1}`].s= styl2xp
                ws[`F${k+1}`].s= cstyl2xp
                ws[`G${k+1}`].s= styl2xp
                ws[`H${k+1}`].s=  cstyl2xp
            }

        }
    }




    ws['!cols'] = wscols;
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] }
    const excelbuffer = XLSX.write(wb, { booktype: 'xlsx', type: 'array' })
    const dar = new Blob([excelbuffer], { type: filetype })
    file.saveAs(dar, `${auser.name}-${props.project.sitename}-${datep}.xlsx`,)



    setdull(true)
}

function generatereport(){
    setattreport([])
    
        axios.post(`${tz}/siteatt/findbynameandproject`,{
            id:auser.userid,
            pid:props.project._id

        }).then(res2 => {
            console.log(res2)
          if(res2.data.Siteatt.length>0){
            setc(1)
            
          prepare(res2.data.Siteatt)
        }
        else{
            setc(0)
        }
        })
    
}

const [attreport, setattreport] = useState([])
function prepare(arrayx){
    setattreport([])
    console.log(arrayx)
    arrayx.forEach(val => {
        

if(rtype==='daily'){

        
    let date_1 = new Date(val.date);
    let date_2 = new Date();
    let difference = date_1.getTime() - date_2.getTime();
    console.log(difference);
    let TotalDays = Math.ceil(-1*difference / (1000 * 3600 * 24));
    console.log(TotalDays);
        if(TotalDays===0||TotalDays===1){
            
        setattreport(pr => [...pr, {


            ["DATE"]:val.date,
            ["JOBSITE"]:val.projectname,
            ["NAME"]:val.username,
            ["CLOCKIN TIME"]:val.time,
            ["CLOCKOUT TIME"]:val.chkouttime,
            ["WORKING HOURS"]:val.workinghours,
            ["STATUS"]:val.status,
            ["LATE"]:val.late,


        }])
        }
}
else if(rtype==='weekly'){
    
    let date_1 = new Date(val.date);
    let date_2 = new Date();
    let difference = date_1.getTime() - date_2.getTime();
    console.log(difference);
    let TotalDays = Math.ceil(-1*difference / (1000 * 3600 * 24));
    console.log(TotalDays);
    if(TotalDays<=7){
            
        setattreport(pr => [...pr, {


            ["DATE"]:val.date,
            ["JOBSITE"]:val.projectname,
            ["NAME"]:val.username,
            ["CLOCKIN TIME"]:val.time,
            ["CLOCKOUT TIME"]:val.chkouttime,
            ["WORKING HOURS"]:val.workinghours,
            ["STATUS"]:val.status,
            ["LATE"]:val.late,


        }])
        }
}
else{
    
    let date_1 = new Date(val.date);
    let date_2 = new Date();
    let difference = date_1.getTime() - date_2.getTime();
    console.log(difference);
    let TotalDays = Math.ceil(-1*difference / (1000 * 3600 * 24));
    console.log(TotalDays);
    if(TotalDays<=366){
            
        setattreport(pr => [...pr, {


            ["DATE"]:val.date,
            ["JOBSITE"]:val.projectname,
            ["NAME"]:val.username,
            ["CLOCKIN TIME"]:val.time,
            ["CLOCKOUT TIME"]:val.chkouttime,
            ["WORKING HOURS"]:val.workinghours,
            ["STATUS"]:val.status,
            ["LATE"]:val.late,


        }])
        }
}
setdull(false)

    });

}
const [formanreport, setformanreport] = useState(false)
const canvasRef1 = useRef(null);
  const canvasRef2 = useRef(null);
  let isDrawing1 = false;
  let isDrawing2 = false;
  let context1;
  let context2;
  const [savedImage1, setSavedImage1] = useState(null);
  const [savedImage2, setSavedImage2] = useState(null);

  const startDrawing1 = (event) => {
    isDrawing1 = true;
    context1 = canvasRef1.current.getContext('2d');
    context1.beginPath();
    context1.moveTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
  };

  const draw1 = (event) => {
    event.preventDefault();
    if (!isDrawing1) return;
    context1.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    context1.stroke();
  };

  const stopDrawing1 = () => {
    if (isDrawing1) {
      context1.closePath();
      isDrawing1 = false;
      saveCanvasImage1();
    }
  };

  const saveCanvasImage1 = () => {
    if (canvasRef1.current) {
      const imageDataURL = canvasRef1.current.toDataURL();
      setSavedImage1(imageDataURL);
    }
  };

  const startDrawing2 = (event) => {
    
    isDrawing2 = true;
    context2 = canvasRef2.current.getContext('2d');
    context2.beginPath();
    context2.moveTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
  };

  const draw2 = (event) => {
    event.preventDefault();
    if (!isDrawing2) return;
    context2.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    context2.stroke();
  };

  const stopDrawing2 = () => {
    if (isDrawing2) {
      context2.closePath();
      isDrawing2 = false;
      saveCanvasImage2();
    }
  };

  const saveCanvasImage2 = () => {
    if (canvasRef2.current) {
      const imageDataURL = canvasRef2.current.toDataURL();
      setSavedImage2(imageDataURL);
    }
  };



    return (
        <>  
          
            <div className={adduser}>
            <div className="subadduser">
         {c===1?
         
         <>
              
                
         <div className="inputname inui">
            <h1>Duration</h1>
            <div className="choptions">
              <div className="kk" onClick={e=>Dailys('daily')}>
              <input type="radio" checked={Daily==='reportcard'} />
                Daily
              </div>
              <div className="kk" onClick={e=>Dailys('weekly')}>

              <input type="radio"  checked={weekly==='reportcard'} />
                Weekly
              </div>
              <div className="kk" onClick={e=>Dailys('yearly')} >
              <input type="radio"  checked={yearly==='reportcard'} />
                Yearly

              </div>
            </div>

            
             <h1>User</h1>
             <select name="cars" id="cars"  onChange={e=>setuserx(e.target.value)} >
{users&&users.map(val=>(

<option value={val.userid}>{val.name}</option>
))

}

</select>
         </div>
         <div className="inputname inputname2">
             <h1>Project</h1>
             <div className="rdio">
                 <h3  onClick={e=>setptype('cp')} >{props.project.sitename}</h3>
             </div>
             </div>


{ptype==='cp'&&
<div className="inputname inui">

</div>

}

      
         {dull?
         <>
         
         <button style={{marginLeft:'20px'}} className='btn1 btn3x'  >Export</button>
         
         <button className='btn1' onClick={e=>generatereport()} >Generate</button>
         </>:
   <>      
         <button style={{marginLeft:'20px'}} className='btn1' onClick={e=>exports()} >Export</button>
         
         <button className='btn1 btn3x'  >Generate</button>
</>
         }


         <button onClick={e=>setadduser('adduser2')}  className='btn2'>Cancel</button>
<div className="inputname"></div>
<div className="inputname inui" style={{height:'12px'}}></div>
       </>
       :
       <div className="inputname inui">
        <h1>No Data to Show</h1>
     <button className='ag' onClick={e=>setc(1)}>Search Again</button>
       </div>

         }

              


            </div>

        </div>
         <div className="prodi ghbtn ytr5">

         {report&&
    
    <div className="eas">
            <div className="a4" id='easreport' ref={componentRef}>
              
              {currprocess2==='btns'?
 <div className="prntbtns2 prntbtns">
 <button className=' no-print btn1 btn3g' onClick={e=>con3()}>Share</button>
    <ReactToPrint
   
   trigger={() => <button className='no-print btn1' id='90'>Export to Pdf</button>}
   content={() => componentRef.current}
 />
 
<button className='no-print btn2x btn1' onClick={e=>setreport(false)}>Cancel</button>
       </div>
: <div className="prntbtns2 prntbtns">
 <input type="text" className='no-print' placeholder='Enter email' onChange={e=>setemail2(e.target.value)} />
 <button onClick={e=>con4()}  style={{width:'80px'}} className='btn1 no-print'>Send</button>

      </div>

              } 
           
                <h1>{props.project.clientname} Sign In / Out  </h1>
            {/*    <p>This form will be used for payroll purposes, if an employee fails to sign this form he/she will not be paid for this day.</p>
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
            */}
<div className="jobdate">
<h1>Job # {props.project&&props.project.no}</h1>
    <h1>Project Name:  {props.project&&props.project.sitename}</h1>
</div>
<div className="jobdate">
<h1>Date # {datep}</h1>
    <h1>Super:  {props.user&&props.user.name}</h1>
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
Over night Perdiem 
                    </div><div className="boxs1 minwidth2">
                 Extra
                    </div>
                
            </div>

            {
               clk && clk.map(val => (
                <div className="colhead">
                <div className="boxs1 minwidth blackfont">
                {val.empno}

                </div>
                <div className="boxs1 blackfont minwidth2x">
                {val.username.substring(0,17)}
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
                    {val.perdiem}
                    </div><div className="boxs1 minwidth2 blackfont">
{val.onperdiem}           
                    </div><div className="boxs1 minwidth2 blackfont">
                X
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
                {val.name.substring(0,17)}
                </div><div  className="boxs1 minwidth2 blackfont ">
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
                    {val.perdiem}
                    </div><div className="boxs1 minwidth2 blackfont">
{val.onperdiem}           
                    </div><div className="boxs1 minwidth2 blackfont">
                X
                    </div>
                
            </div>
            )):
          props.project && props.project.user.map(val=>(
             <div className="colhead">
             <div className="boxs1 minwidth blackfont">
           {val.empno}

             </div>
             <div className="boxs1 blackfont minwidth2x">
             {val.name.substring(0,17)}
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
                {val.perdiem}
                 </div><div className="boxs1 blackfont minwidth2">
{val.onperdiem}                
                 </div><div className="boxs1 blackfont minwidth2">
        X
                 </div>
             
         </div>
          ))

          }
          
        </div>





            </div>
        </div>

        }
         {formanreport&&
     
  <div className="eas">

          



 <div className="a4" id='sharereport' ref={componentRefx}>
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
       
         
         {currprocess==='btns'?
 <div className="prntbtns">
 <button className=' no-print btn1 btn3g' onClick={e=>con2()}>Share</button>
 <ReactToPrint

 trigger={() => <button className='no-print btn1' id='90'>Export to Pdf</button>}
 content={() => componentRefx.current}
/>

<button className='no-print btn2x btn1' onClick={e=>setformanreport(false)}>Cancel</button>
 </div>
         :
         <div className="prntbtns">
            <input type="text" placeholder='Enter email' className='no-print' onChange={e=>setemail(e.target.value)} />
            <button onClick={e=>con()}  style={{width:'80px'}} className='btn1 no-print'>Send</button>
         </div>

         }  
       
         <h3>   {props.user.name}</h3>
         <h4>
            {props.project&&props.project.clientname}</h4>

        </div>
        <div className="rwdiv1">
            <div className="undertexr">
                Job no: <div className="underlinea">
                   {props.project&&props.project.no}
                </div>
            </div>
            <div className="undertexr">
                Project: <div className="underlinea">
                    {props.project&&props.project.sitename}
                </div>
            </div>
            <div className="undertexr">
                Location: <div className="underlinea">
                  {props.project&&props.project.address.substring(0,25)}
                </div>
            </div>

        </div>
    </div>

    <div className="tablefor">
        <div className="tableforhead">
            <div className="subbox2 subbox1">
                Employee Name


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
          <div className="tableforhead">
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
       {attreportx2.length>0&&
       attreportx2.map(val=>(
        <div className="tableforhead tableforheadx">
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
<div className="boxsign boxsign2">

<h1 className='singfont'>{props.user.name}</h1>
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
</div>}
{/*sm&&

<div className="eas eas3">
    <div className="smallbox">
        <h1>Edit info & Hours</h1>
        <div className="inputdet">
            Name
            <input type="text" value={name} onChange={e=>setname(e.target.value)} />
            
        </div>
        <div className="inputdet">
            Trade
            <input type="text"  />
            
        </div>

        <h1>Weekdays</h1>
        <div className="inputdet">
            Monday
            <input type="number" onChange={e=>setd1(e.target.value)} value={d1}  />
            
        </div>
        <div className="inputdet">
            Tuesday
            <input type="number" onChange={e=>setd2(e.target.value)} value={d2} />
            
        </div>
        <div className="inputdet">
            Wednesday
            <input type="number"  onChange={e=>setd3(e.target.value)} value={d3} />
            
        </div>
        <div className="inputdet">
            Thursday
            <input type="number" onChange={e=>setd4(e.target.value)} value={d4} />
            
        </div> <div className="inputdet">
            Friday
            <input type="number"  onChange={e=>setd5(e.target.value)} value={d5} />
            
        </div>
        <div className="inputdet">
            Saturday
            <input type="number" onChange={e=>setd6(e.target.value)} value={d6} />
            
        </div> <div className="inputdet">
            Sunday
            <input type="number"  onChange={e=>setd7(e.target.value)} value={d7} />
            
        </div>
        <div className="inputdet inputdetx">
            <button onClick={e=>setvalues(indexofitem)}>Done</button>
            <button onClick={e=>setsm(false)} className='fwr'>Cancel</button>
        </div>

    </div>
</div>
*/
}

{
    forman2&&steps===1&&
<>    <div className="prntbtns prntpgs">

<div className="inputname dateds">
<h1>Date</h1>
  
{showcalender ?
<div style={{position:'relative'}}>
<IoClose className='iocl' onClick={e=>setshowcalender(false)} />
<Calendar onChange={onxhange}
value={value2} />
</div> :
<input onClick={e=>setshowcalender(true)} value={datr}  type="text" />

}

</div>
    <button className='no-print btn2x btn1' onClick={e=>setsteps(0)}>Back</button>

    
    
       
            </div>
   <div className="eas2x">
  
{action?
  <div className="a4p">

  <div className="a4" >

 
     <div className='tablemen'>
       <div className='re3'>
{action?

<div className='bigname'>Action</div>:<></>

}
         <div className='bigname'>Name</div>
         <div className='bigname'> Tade</div>
         <div>MON</div>

         <div>TUE</div>
         <div>WED</div>
         <div>THU</div>
         <div>FRI</div>
         <div>SAT</div>
         <div>SUN</div>

         <div>Total</div>
         <div>OT</div>
         <div>P.O #</div>
         <div>Cost Code</div>
         <div
        className='ggg'  
         >Days</div>
         <div>Perdiem</div>

         <div>Sunday Perdiem</div>
       </div>

     {  attreportx2.length>0&&
      attreportx2.map((val,index)=>(
       sm&&indexofitem===index?
       <div className='re4'>
{
   action?

   <div className='bigname'> <button className='inpybtn' onClick={e=>setvalues(indexofitem)}>Save</button> </div>:
   <></>
}
       <div className='bigname'>{val.name.split(' ').slice(0,2).join(' ')}</div>
         <div className='bigname'>Tade</div>
         <div>
     
   <>
       
       <input type="text" className='inpy' value={d1} onChange={e=>setd1(e.target.value)} />
       </>
   

           
         </div>

         <div>
     
     <>
         
         <input type="text" className='inpy' value={d2} onChange={e=>setd2(e.target.value)} />
         </>
     
  
             
           </div>

           <div>
     
     <>
         
         <input type="text" className='inpy' value={d3} onChange={e=>setd3(e.target.value)} />
         </>
     
  
             
           </div>
           <div>
     
     <>
         
         <input type="text" className='inpy' value={d4} onChange={e=>setd4(e.target.value)} />
         </>
     
  
             
           </div>
           <div>
     
     <>
         
         <input type="text" className='inpy' value={d5} onChange={e=>setd5(e.target.value)} />
         </>
     
  
             
           </div>
           <div>
     
     <>
         
         <input type="text" className='inpy' value={d6} onChange={e=>setd6(e.target.value)} />
         </>
     
  
             
           </div>
           <div>
     
     <>
         
         <input type="text" className='inpy' value={d7} onChange={e=>setd7(e.target.value)} />
         </>
     
  
             
           </div>
 <div> 
    {val.wh}
 </div>
 <div> 
    {val.wh>40?val.wh-40:0}
 </div>
 
         <div>P.O #</div>
         <div>Cost Code</div>
         <div
         
        className='ggg'  >
           5
         </div>
         <div>
         <p className='sdq'>  {val.perdiem}</p></div>

         <div>
         <p className='sdq'>  {val.onperdiem}</p></div>
       </div>:
          <div className='re4'>
          {
             action?
          
             <div className='bigname'> <FiEdit className='fyd' onClick={e=>openit(index)}/> </div>:
             <></>
          }
                 <div className='bigname'>{val.name.split(' ').slice(0,2).join(' ')}</div>
                   <div className='bigname'>Tade</div>
                   <div>
                   {val.att.map(element => (
             <>{
                 element.day==='Monday'&&element.wh}</>
             
          ))}
                     
                   </div>
          
                   <div> {val.att.map(element => (
             <>{
                 element.day==='Tuesday'&&element.wh}</>
             
          ))}</div>
                   <div> {val.att.map(element => (
             <>{
                 element.day==='Wednesday'&&element.wh}</>
             
          ))}</div>
                   <div> {val.att.map(element => (
             <>{
                 element.day==='Thursday'&&element.wh}</>
             
          ))}</div>
                   <div> {val.att.map(element => (
             <>{
                 element.day==='Friday'&&element.wh}</>
             
          ))}</div>
                   <div> {val.att.map(element => (
             <>{
                 element.day==='Saturday'&&element.wh}</>
             
          ))}</div>
                   <div> {val.att.map(element => (
             <>{
                 element.day==='Sunday'&&element.wh}</>
             
          ))}</div>
           <div> 
              {val.wh}
           </div>
           <div> 
              {val.wh>40?val.wh-40:0}
           </div>
           
                   <div>P.O #</div>
                   <div>Cost Code</div>
                   <div
                   
                  className='ggg'  >
                     5
                   </div>
                   <div>
                   <p className='sdq'>  {val.perdiem}</p></div>
          
                   <div>
                   <p className='sdq'>  {val.onperdiem}</p></div>
                 </div>
     
      ))}
     
     </div>

     <div className="undertexrx undertexr not">
   <div className="boxsign">
    {
        signing?

        <h1 className='singfont'>{props.user.name}</h1>
        :


    <SwipeableButton onSuccess={e=>setsigning(true)} color='#414EC6' text='SLIDE TO SIGN' />
    }
   </div>
        </div>
     <div className="rwdiv1x">
      
             <div className="undertexrx undertexr">
             
                 Authorizing Signature: <div className="underlinea underline2">
                
                 </div>
             </div>
             <div className="undertexr undertexrx now">
             <button onClick={e=>approve()} className='no-print btn1 ' id='printbtn'>Approve & Preview</button>
   
             </div>
 
         </div>
  </div>
 </div>
 :  <div className="a4p">

 <div className="a4" ref={componentRef2}>
  

    <div className='tablemen tablemenh'>
      <div className='re3'>

        <div className='bigname'>Name</div>
        <div className='bigname'> Tade</div>
        <div>MON</div>

        <div>TUE</div>
        <div>WED</div>
        <div>THU</div>
        <div>FRI</div>
        <div>SAT</div>
        <div>SUN</div>

        <div>Total</div>
        <div 
        className='ggg'  >OT</div>{/* <div>P.O #</div> */}
        <div>Cost Code</div>
        <div 
        className='ggg'  >Days</div>
        <div>Perdiem</div>

        <div>Sunday Perdiem</div>
      </div>

    {  attreportx2.length>0&&
     attreportx2.map((val,index)=>(
      <div className='re4'>

      <div className='bigname'>{val.name.split(' ').slice(0,2).join(' ')}</div>
        <div className='bigname'>Tade</div>
        <div>
        {val.att.map(element => (
  <>{
      element.day==='Monday'&&element.wh}</>
  
))}
          
        </div>

        <div> {val.att.map(element => (
  <>{
      element.day==='Tuesday'&&element.wh}</>
  
))}</div>
        <div> {val.att.map(element => (
  <>{
      element.day==='Wednesday'&&element.wh}</>
  
))}</div>
        <div> {val.att.map(element => (
  <>{
      element.day==='Thursday'&&element.wh}</>
  
))}</div>
        <div> {val.att.map(element => (
  <>{
      element.day==='Friday'&&element.wh}</>
  
))}</div>
        <div> {val.att.map(element => (
  <>{
      element.day==='Saturday'&&element.wh}</>
  
))}</div>
        <div> {val.att.map(element => (
  <>{
      element.day==='Sunday'&&element.wh}</>
  
))}</div>

<div> 
    {val.wh}
 </div>
 <div 
        className='ggg'  > 
    {val.wh>40?val.wh-40:0}
 </div>
       {/* <div>P.O #</div> */}
        <div>Cost Code</div>
        <div 
        className='ggg'  >
          5
        </div>
        <div>
          {val.perdiem}</div>

        <div>
          {val.onperdiem}</div>
      </div>
    
     ))}
    
    </div>

<div className="buttonbar">
  <button onClick={e=>editlist()}>Edit List</button>
  <button onClick={e=>approve()} className='gree'>Approve</button>
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
  </div>
  </>
}

        {showreport?
            
            steps===0&&<div className="prodiheadere">
            <div className={Daily} onClick={e=>setshowreport(false)}>
            <div className="circx">
                           <BsFileBarGraphFill className='sio' />
                       </div>
            <div className="subreportcard">
            <h1>Attendance Report</h1>
            </div>
            </div>
          

            <div className={yearly2} onClick={e=>setformanreports()} >
            <div className="circf">
                           <FaUserNurse className='sio' />
                       </div>

            <div className="subreportcard">
            <h1>Timesheets</h1>
            </div>
            </div>
                     {/**  <div className={yearly3} onClick={e=>setreports(true)}>
            <div className="circf2">
                           <MdOutlineAccessTimeFilled className='sio2' />
                       </div>
  <div className="subreportcard">
            <h1>Sign in Sign out Report</h1>
            </div>
            </div> */} 
          


           </div>
           
           :
           
           <>
           <button style={{marginBottom:'-10px',marginTop:'10px'}} className='btnghx' onClick={e=>setshowreport(true)}>Back</button>
            <Superatt  
           props={{
            user:props.user,
            attreport:props.attreport
        
        }}
           />
           </>
          

        }
         



        </div>
        </>
    )
}

export default Reports