import React, { useEffect, useRef, useState } from 'react'
import { GiEnergyArrow } from 'react-icons/gi'
import { RiLightbulbFlashLine, RiTimerFlashFill } from 'react-icons/ri'
import { BiTime } from 'react-icons/bi'
import { MdSnooze } from 'react-icons/md'
import { AiOutlineReload } from 'react-icons/ai'
import { BsFileBarGraphFill } from 'react-icons/bs'
import { tz } from '../../apis'
import Calendar from 'react-calendar'
import {MdOutlineDateRange} from 'react-icons/md'
import ReactToPrint from 'react-to-print';
import as from '../../../images/219983.png'
import axios from 'axios'

import XLSX from 'sheetjs-style'
import { FaUserNurse } from 'react-icons/fa'
import { MdOutlineAccessTimeFilled } from 'react-icons/md'
import jsPDF from 'jspdf';

import * as file from 'file-saver'
const Reports = () => {
    const [showcalender, setshowcalender] = useState(false)

    const [showcalender2, setshowcalender2] = useState(false)
    const [value, valuex] = useState(new Date());
    const [value2, valuex2] = useState(new Date());
    const [stdate, setstdate] = useState("")
    const [eddate, seteddate] = useState("")
    function onxhange(e) {
        valuex(e)
        var ustime = e.toLocaleString("en-US", { hour12: false })
        console.log(ustime)
        setshowcalender(false)
        var yt = ustime.split(', ')
        setstdate(yt[0])
        console.log(yt[0])
    }


    function onxhange2(e) {
        valuex2(e)

        var ustime = e.toLocaleString("en-US", { hour12: false })
        console.log(ustime)
        setshowcalender2(false)
        var yt = ustime.split(', ')
        seteddate(yt[0])
        console.log(yt[0])
    }

    var styl1p =
    {
        border: {
            right: {
                style: "thin",
                color: { rgb: 'FFFFFF' }
            },
            left: {
                style: "thin",
                color: { rgb: 'FFFFFF' }
            },
            bottom: {
                style: "thin",
                color: { rgb: 'FFFFFF' }
            },
            top: {
                style: "thin",
                color: { rgb: 'FFFFFF' }
            },
        },
        font: {
            name: "arial",
            bold: true,
            sz: 10,
            color: { rgb: 'FFFFFF' }
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

    var cstyl2x =
    {
        border: {
            right: {
                style: "thin",
                color: { rgb: "8DB2D5" }
            },
            left: {
                style: "thin",
                color: { rgb: "8DB2D5" }
            },
            bottom: {
                style: "thin",
                color: { rgb: "8DB2D5" }
            },
            top: {
                style: "thin",
                color: { rgb: "8DB2D5" }
            },
        },
        font: {
            name: "arial",
            bold: false,
            sz: 10,
            color: '000000'
        },
        alignment: {
            vertical: "center",
            horizontal: "center",
        },
        numFmt: "$#,###.00"
    };
    var styl2xp =
    {
        border: {
            right: {
                style: "thin",
                color: { rgb: "8DB2D5" }
            },
            left: {
                style: "thin",
                color: { rgb: "8DB2D5" }
            },
            bottom: {
                style: "thin",
                color: { rgb: "8DB2D5" }
            },
            top: {
                style: "thin",
                color: { rgb: "8DB2D5" }
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
            sz: 10,
            color: '000000'
        },
        alignment: {
            vertical: "center",
            horizontal: "center",
        },
    };
    var cstyl2xp =
    {
        border: {
            right: {
                style: "thin",
                color: { rgb: "8DB2D5" }
            },
            left: {
                style: "thin",
                color: { rgb: "8DB2D5" }
            },
            bottom: {
                style: "thin",
                color: { rgb: "8DB2D5" }
            },
            top: {
                style: "thin",
                color: { rgb: "8DB2D5" }
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
            sz: 10,
            color: '000000'
        },
        alignment: {
            vertical: "center",
            horizontal: "center",
        },
        numFmt: "$#,###.00"
    };
    var styl2x =
    {
        border: {
            right: {
                style: "thin",
                color: { rgb: "8DB2D5" }
            },
            left: {
                style: "thin",
                color: { rgb: "8DB2D5" }
            },
            bottom: {
                style: "thin",
                color: { rgb: "8DB2D5" }
            },
            top: {
                style: "thin",
                color: { rgb: "8DB2D5" }
            },
        },
        font: {
            name: "arial",
            bold: false,
            sz: 10,
            color: '000000'
        },
        alignment: {
            vertical: "center",
            horizontal: "center",
        },
    };
    function reportsa() {
    }
    const [Daily, setDaily] = useState('reportcard')
    const [weekly, setweekly] = useState('reportcard2')
    const [yearly, setyearly] = useState('reportcard2')
    function custom() {
        setrtype('custom')
        setadduser('adduser')
    }
    function Dailys(val) {
        if (val === 'daily') {
            setDaily('reportcard')
            setweekly('reportcard2')
            setyearly('reportcard2')
            setrtype('daily')
            setadduser('adduser')
        }
        else if (val === 'weekly') {
            setDaily('reportcard2')
            setweekly('reportcard')
            setyearly('reportcard2')
            setrtype('weekly')
            setadduser('adduser')
        } else {
            setDaily('reportcard2')
            setweekly('reportcard2')
            setyearly('reportcard')
            setrtype('yearly')
            if(val==='yearly'){

                setadduser('adduser')
                }
        }

    }
    const [adduser, setadduser] = useState('adduser2')
    const [ptype, setptype] = useState('ap')
    const [sites, setsites] = useState()
    const [users, setusers] = useState()
    const [auser, setauser] = useState()
    const [aproject, setaproject] = useState()
    const [datep, setdatep] = useState('')
    useEffect(() => {
        axios.get(`${tz}/jobsite/getall`).then(res2 => {
            console.log(res2)
            setsites(res2.data.Jobsite)
            setaproject(res2.data.Jobsite[0])


        })

        axios.get(`${tz}/att/time`).then(res => {

            var dateput = res.data.Date.split(', ')
            setdatep(dateput[0])

        })
        axios.get(`${tz}/siteuser/getall`).then(res2 => {
            console.log(res2)

            setusers(res2.data.Siteuserd)

            setauser(res2.data.Siteuserd[0])

        })

        return () => {

        }
    }, [])


    function setuserx(val) {
        setdull(true)
        users && users.forEach(element => {
            if (element._id === val) {
                setauser(element)
            }
        });

    }


    function setprojectx(val) {
        sites && sites.forEach(element => {
            if (element._id === val) {
                setaproject(element)
            }
        });
    }

    const [c, setc] = useState(1)
    const [dull, setdull] = useState(true)
    const [rtype, setrtype] = useState('daily')
    function exports() {
        const filetype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
        var ext = '.xlsx'

        const myHeader = ["DATE", "JOBSITE", "NAME", 'CLOCKIN TIME', 'CLOCKOUT TIME', 'WORKING HOURS', 'STATUS', 'LATE'];
        const ws = XLSX.utils.json_to_sheet(attreport, { header: myHeader })

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
        for (var k = 0; k < attreport.length + 1; k++) {
            if (k === 0) {

                ws[`B${k + 1}`].s = styl1p
                ws[`A${k + 1}`].s = styl1p
                ws[`C${k + 1}`].s = styl1p
                ws[`D${k + 1}`].s = styl1p
                ws[`E${k + 1}`].s = styl1p
                ws[`F${k + 1}`].s = styl1p
                ws[`G${k + 1}`].s = styl1p
                ws[`H${k + 1}`].s = styl1p
            }
            else {
                if (k % 2 === 0) {

                    ws[`B${k + 1}`].s = styl2x
                    ws[`A${k + 1}`].s = styl2x
                    ws[`C${k + 1}`].s = styl2x
                    ws[`D${k + 1}`].s = styl2x
                    ws[`E${k + 1}`].s = styl2x
                    ws[`F${k + 1}`].s = cstyl2x
                    ws[`G${k + 1}`].s = styl2x
                    ws[`H${k + 1}`].s = cstyl2x
                } else if (k % 2 !== 0) {

                    ws[`B${k + 1}`].s = styl2xp
                    ws[`A${k + 1}`].s = styl2xp
                    ws[`C${k + 1}`].s = styl2xp
                    ws[`D${k + 1}`].s = styl2xp
                    ws[`E${k + 1}`].s = styl2xp
                    ws[`F${k + 1}`].s = cstyl2xp
                    ws[`G${k + 1}`].s = styl2xp
                    ws[`H${k + 1}`].s = cstyl2xp
                }

            }
        }




        ws['!cols'] = wscols;
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] }
        const excelbuffer = XLSX.write(wb, { booktype: 'xlsx', type: 'array' })
        const dar = new Blob([excelbuffer], { type: filetype })
        file.saveAs(dar, `${auser.name}-${aproject.clientname}-${datep}.xlsx`,)



        setdull(true)
    }
    const [atttfor, setatttfor] = useState([])
    const componentRefx = useRef()
    function generatereport() {
        setattreport([])
        if (ptype === 'ap') {
            axios.post(`${tz}/siteatt/findbyname`, {
                id: auser._id

            }).then(res2 => {
                console.log(res2)

                if (res2.data.Siteatt.length > 0) {
                    setc(1)

                    prepare(res2.data.Siteatt)
                }
                else {
                    setc(0)
                }

            })
        }
        else {
            axios.post(`${tz}/siteatt/findbynameandproject`, {
                id: auser._id,
                pid: aproject._id

            }).then(res2 => {
                console.log(res2)
                if (res2.data.Siteatt.length > 0) {
                    setc(1)

                    prepare(res2.data.Siteatt)
                }
                else {
                    setc(0)
                }
            })
        }
    }

    const [attreport, setattreport] = useState([])
    const [formansh, setformansh] = useState(false)

    function findday(att) {
        var att2 = att
        var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        days.forEach((ele, index2) => {
            var found = false
            if (att2.length > 0) {
                att2.forEach((element, index) => {
                    if (element.day && element.day === ele) {
                        found = true


                    }
                    if (index === att2.length - 1 && found === false) {

                        att2.push({

                            date: '0/0/0',
                            day: ele,
                            wh: '0',
                        })

                    }
                })
            }
            else {

                att2.push({

                    date: '0/0/0',
                    day: ele,
                    wh: '0',
                })



            }
        });
        return att2
    }
    const [atttfor2, setatttfor2] = useState([])

    function preparefor2(val) {
        setdull(true)
        Dailys('yearly2')
        var attr = atttfor

        attr.forEach((element, index) => {
            element.att = findday(element.att)
            if (index === attr.length - 1) {
                setatttfor2(attr)
            }

        });
        setformansh(true)

    }
    function preparefor() {
        setatttfor([])

        axios.post(`${tz}/siteatt/findbyproject`, {

            id: aproject._id

        }).then(res2m => {
            console.log(res2m)

            setdull(false)
            if (res2m.data.Siteatt.length > 0) {

                var date = new Date();
                var day = date.getDay();
                var prevMonday = new Date();
                if (date.getDay() == 0) {
                    prevMonday.setDate(date.getDate() - 7);
                }
                else {
                    prevMonday.setDate(date.getDate() - (day - 1));
                }

                var rt = new Date('2023-04-23')
                console.log(prevMonday)
                console.log(prevMonday > rt)

                function preparez(atts, users, prevMonday) {
                    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

                    users.forEach(element => {
                        var u = {
                            user: element.userid,
                            payrate: element.payrate,
                            name: element.name,

                            perdiem: element.perdiem,

                            onperdiem: element.onperdiem,
                            att: [],
                            wh: 0,

                        }

                        var wh = 0;
                        var wm = 0;
                        atts.forEach(val => {
                            var ty = val.date.split('/')
                            console.log(ty)
                            let date_1 = new Date(`${ty[0]}/${ty[1]}/${ty[2]}`);
                            let date_2 = new Date(prevMonday);
                            //setprmo(date_2) 
                            var d = new Date(`${ty[0]}/${ty[1]}/${ty[2]}`);

                            console.log(d)

                            var dayName = days[d.getDay()];
                            if (date_1 > date_2 && val.userid === element.userid) {

                                var tx = val.workinghours !== '-' ? val.workinghours.split(':') : [0, 0]
                                wh = parseInt(tx[0]) + wh
                                wm = parseInt(tx[1]) + wm
                                console.log(wh)
                                console.log(wm)
                                u.att.push({
                                    date: val.date,
                                    day: dayName,
                                    wh: tx[0],


                                })
                            }




                        });
                        u.wh = Math.floor(wh)

                        console.log(u)
                        setatttfor(pr => [...pr, u])
                        console.log(atttfor)
                    });
                }

                preparez(res2m.data.Siteatt, aproject.user, prevMonday)


            }
            else {


            }
        })

    }

    const [pending2, setpending2] = useState([])
    const [clk, setclk] = useState([])
    function prepareforx() {

        axios.get(`${tz}/att/time`).then(resx => {
            console.log(resx)

            var dateput = resx.data.Date.split(', ')
            axios.post(`${tz}/siteatt/findbydateandproject`, {
                date: dateput[0],
                id: aproject._id
            }).then(rex => {

                setpending2([])
                aproject.user.forEach((ele, index) => {
                    if (index === aproject.user.length - 1) {
                        setreportx(true)
                    }

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

                    }
                });


            })

        })


    }
    function prepare(arrayx) {
        setattreport([])
        console.log(arrayx)
        arrayx.forEach(val => {


            if (rtype === 'daily') {


                let date_1 = new Date(val.date);
                let date_2 = new Date(stdate);
                let difference = date_1.getTime() - date_2.getTime();
                console.log(difference);
                let TotalDays = Math.ceil(-1 * difference / (1000 * 3600 * 24));
                console.log(TotalDays);
                if (date_1.getTime()===date_2.getTime()) {
           

                    setattreport(pr => [...pr, {


                        ["DATE"]: val.date,
                        ["JOBSITE"]: val.projectname,
                        ["NAME"]: val.username,
                        ["CLOCKIN TIME"]: val.time,
                        ["CLOCKOUT TIME"]: val.chkouttime,
                        ["WORKING HOURS"]: val.workinghours,
                        ["STATUS"]: val.status,
                        ["LATE"]: val.late,


                    }])
                }
            }
            else if (rtype === 'weekly') {

                let date_1 = new Date(val.date);
                let date_2 = new Date();
                let difference = date_1.getTime() - date_2.getTime();
                console.log(difference);
                let TotalDays = Math.ceil(-1 * difference / (1000 * 3600 * 24));
                console.log(TotalDays);
                if (TotalDays <= 7) {

                    setattreport(pr => [...pr, {


                        ["DATE"]: val.date,
                        ["JOBSITE"]: val.projectname,
                        ["NAME"]: val.username,
                        ["CLOCKIN TIME"]: val.time,
                        ["CLOCKOUT TIME"]: val.chkouttime,
                        ["WORKING HOURS"]: val.workinghours,
                        ["STATUS"]: val.status,
                        ["LATE"]: val.late,


                    }])
                }
            }
            else if (rtype === 'yearly') {

                let date_1 = new Date(val.date);
                let date_2 = new Date();
                let difference = date_1.getTime() - date_2.getTime();
                console.log(difference);
                let TotalDays = Math.ceil(-1 * difference / (1000 * 3600 * 24));
                console.log(TotalDays);
                if (TotalDays <= 366) {

                    setattreport(pr => [...pr, {


                        ["DATE"]: val.date,
                        ["JOBSITE"]: val.projectname,
                        ["NAME"]: val.username,
                        ["CLOCKIN TIME"]: val.time,
                        ["CLOCKOUT TIME"]: val.chkouttime,
                        ["WORKING HOURS"]: val.workinghours,
                        ["STATUS"]: val.status,
                        ["LATE"]: val.late,


                    }])
                }
            }
            else {
                    let date = new Date(val.date);
                    let startDateObj = new Date(stdate);
                    let endDateObj = new Date(eddate);
                    
                    if (date >= startDateObj && date <= endDateObj) {
                      setattreport(pr => [...pr, {
                        ["DATE"]: val.date,
                        ["JOBSITE"]: val.projectname,
                        ["NAME"]: val.username,
                        ["CLOCKIN TIME"]: val.time,
                        ["CLOCKOUT TIME"]: val.chkouttime,
                        ["WORKING HOURS"]: val.workinghours,
                        ["STATUS"]: val.status,
                        ["LATE"]: val.late,
                      }]);
                    }
                  
            }
            setdull(false)

        });

    }

    const [adduser3, setadduser3] = useState('adduser2')
    const [reportx, setreportx] = useState(false)
    const componentRef = useRef()
    const [adduser4, setadduser4] = useState('adduser2')
    return (
        <>

            {reportx &&
                <div className="eas">
                    <ReactToPrint

                        trigger={() => <button className='ss33' id='90'>Export to Pdf</button>}
                        content={() => componentRef.current}
                    />

                    <button className='ss333' onClick={e => setreportx(false)}>Cancel</button>

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


                            This form is being utilized by payroll as an expense reimbursement request form for per Diem per our policy that pays for temporary lodging.<br />
                            Below by circling Yes underper Diem for lodging you are under IRS regulations stating that you are requesting reimbursement
                            per Diem for temporary lodging. The IRSor EAS may audit at times and request a copy of your hotel/motel lodging receipt.<br />
                            If you are found to be falsifying this form you will be eligible for disciplinary actionup to and including termination.<br />
                            Per policy you must have live a minimum of 50 miles from the jobsite to receive per diem and staying in local lodgingat the job site.<br />
                            Sunday per diem is available for those that live farther than 75 miles from the job siteand obtain lodging on sunday night.<br />
                            If you elect to drive back and forth from a jobsite each daythat is cosidered a daily commute and willnot be considered "Hours worked" or eligible to receive per diem.<br />
                            If driving back and forth you should not mark the per diem and lodging box below.<br />
                        </h3>
                        <h3 className='ar3'>
                            All employees should sign only themselves in and out each day. If you signin/out someone else or allow someone else to sign you in/out you will be subject to disciplinary action up to and including termination.</h3>

                        <div className="jobdate">
                            <h1>Job # {aproject && aproject.no}</h1>
                            <h1>Project Name:  {aproject && aproject.sitename}</h1>
                        </div>
                        <div className="jobdate">
                            <h1>Date # {datep}</h1>
                            <h1>Super:  {auser && auser.name}</h1>
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
                                            {val.username.substring(0, 20)}
                                        </div><div className="boxs1 minwidth2 blackfont ">
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
                                            {val.name.substring(0, 20)}
                                        </div><div className="boxs1 minwidth2 blackfont ">
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
                                )) :
                                    aproject && aproject.user.map(val => (
                                        <div className="colhead">
                                            <div className="boxs1 minwidth blackfont">
                                                {val.empno}

                                            </div>
                                            <div className="boxs1 blackfont minwidth2x">
                                                {val.name.substring(0, 20)}
                                            </div>
                                            <div className="boxs1 minwidth2 blackfont ">
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

            {
                formansh &&
                <div className="eas">

                    <ReactToPrint

                        trigger={() => <button className='ss33' id='printbtn'>Export To pdf!</button>
                        }
                        content={() => componentRefx.current}
                    />



                    <button className='ss333' onClick={e => setformansh(false)}>Cancel</button>
                    <div className="a4p">

                        <div className="a4" ref={componentRefx}>
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
                                        {aproject && aproject.clientname}</h4>

                                </div>
                                <div className="rwdiv1">
                                    <div className="undertexr">
                                        Job no: <div className="underlinea">
                                            {aproject && aproject.no}
                                        </div>
                                    </div>
                                    <div className="undertexr">
                                        Project: <div className="underlinea">
                                            {aproject && aproject.sitename}
                                        </div>
                                    </div>
                                    <div className="undertexr">
                                        Location: <div className="underlinea">
                                            {aproject && aproject.address.substring(0, 25)}
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className='tablemen'>
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

                                    <div>O.N</div>
                                </div>

                                {atttfor.length > 0 &&
                                    atttfor.map((val, index) => (
                                        <div className='re4'>

                                            <div className='bigname'>{val.name.split(' ').slice(0, 2).join(' ')}</div>
                                            <div className='bigname'>Tade</div>
                                            <div>
                                                {val.att.map(element => (
                                                    <>{
                                                        element.day === 'Monday' && element.wh}</>

                                                ))}

                                            </div>

                                            <div> {val.att.map(element => (
                                                <>{
                                                    element.day === 'Tuesday' && element.wh}</>

                                            ))}</div>
                                            <div> {val.att.map(element => (
                                                <>{
                                                    element.day === 'Wednesday' && element.wh}</>

                                            ))}</div>
                                            <div> {val.att.map(element => (
                                                <>{
                                                    element.day === 'Thursday' && element.wh}</>

                                            ))}</div>
                                            <div> {val.att.map(element => (
                                                <>{
                                                    element.day === 'Friday' && element.wh}</>

                                            ))}</div>
                                            <div> {val.att.map(element => (
                                                <>{
                                                    element.day === 'Saturday' && element.wh}</>

                                            ))}</div>
                                            <div> {val.att.map(element => (
                                                <>{
                                                    element.day === 'Sunday' && element.wh}</>

                                            ))}</div>

                                            <div>
                                                {val.wh}
                                            </div>
                                            <div
                                                className='ggg'  >
                                                {val.wh > 40 ? val.wh - 40 : 0}
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


                </div>
            }
            <div className={adduser}>
                <div className="subadduser">
                    {c === 1 ?

                        rtype === 'custom' ?
                            <>

                                <div className="drange">
                                    <div className="inputnax">
                                        <p>Start Date</p>
                                        <div onClick={e => setshowcalender(true)} className="dates">


                                            {showcalender ?
                                                <div>
                                                    <Calendar onChange={onxhange}
                                                        value={value} />
                                                </div> :
                                                <p className='dateppp'> <MdOutlineDateRange className='mddd' /> {stdate}</p>

                                            }
                                        </div>
                                    </div>
                                    <div className="inputnax">
                                        <p>End Date</p>
                                        <div onClick={e => setshowcalender2(true)} className="dates">


                                            {showcalender2 ?
                                                <div>
                                                    <Calendar onChange={onxhange2}
                                                        value={value2} />
                                                </div> :
                                                <p className='dateppp'> <MdOutlineDateRange className='mddd' />{eddate}</p>

                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="inputname inui">
                                    <h1>Select User</h1>
                                    <select name="cars" id="cars" onChange={e => setuserx(e.target.value)} >
                                        {users && users.map(val => (

                                            <option value={val._id}>{val.name}</option>
                                        ))

                                        }

                                    </select>
                                </div>
                                <div className="inputname inputname2">
                                    <h1>Project</h1>
                                    <div className="rdio">
                                        <input onClick={e => setptype('ap')} type="radio" checked={ptype === 'ap'} />
                                        <h3 onClick={e => setptype('ap')} >All Projects</h3>

                                        <input onClick={e => setptype('cp')} type="radio" checked={ptype === 'cp'} />
                                        <h3 onClick={e => setptype('cp')} >Custom Project</h3>
                                    </div>
                                </div>
                                {ptype === 'cp' &&
                                    <div className="inputname inui">
                                        <h1>Choose Jobsite</h1>
                                        <select name="cars" id="cars" onChange={e => setprojectx(e.target.value)} >
                                            {sites && sites.map(val => (

                                                <option value={val._id}>{val.sitename}</option>
                                            ))

                                            }

                                        </select>
                                    </div>

                                }

                                {ptype !== 'cp' &&
                                    <div className="inputname inui">

                                    </div>

                                }


                                {dull ?
                                    <>

                                        <button style={{ marginLeft: '20px' }} className='btn1 btn3x'  >Export</button>

                                        <button className='btn1' onClick={e => generatereport()} >Generate</button>
                                    </> :
                                    <>
                                        <button style={{ marginLeft: '20px' }} className='btn1' onClick={e => exports()} >Export</button>

                                        <button className='btn1 btn3x'  >Generate</button>
                                    </>
                                }


                                <button onClick={e => setadduser('adduser2')} className='btn2'>Cancel</button>
                                <div className="inputname"></div>
                                
                                <div className="inputname inui" style={{ height: '12px' }}></div>
                            </> : 
                            rtype==='daily'?
                            <>


                                <div className="inputname inui">
                                <div className="drange">
                                    <div className="inputnax">
                                        <p>Choose date</p>
                                        <div onClick={e => setshowcalender(true)} className="dates">


                                            {showcalender ?
                                                <div>
                                                    <Calendar onChange={onxhange}
                                                        value={value} />
                                                </div> :
                                                <p className='dateppp'> <MdOutlineDateRange className='mddd' /> {stdate}</p>

                                            }
                                        </div>
                                    </div>
                                 
                                </div>
                                    <h1>Select User</h1>
                                    <select name="cars" id="cars" onChange={e => setuserx(e.target.value)} >
                                        {users && users.map(val => (

                                            <option value={val._id}>{val.name}</option>
                                        ))

                                        }

                                    </select>
                                </div>
                                <div className="inputname inputname2">
                                    <h1>Project</h1>
                                    <div className="rdio">
                                        <input onClick={e => setptype('ap')} type="radio" checked={ptype === 'ap'} />
                                        <h3 onClick={e => setptype('ap')} >All Projects</h3>

                                        <input onClick={e => setptype('cp')} type="radio" checked={ptype === 'cp'} />
                                        <h3 onClick={e => setptype('cp')} >Custom Project</h3>
                                    </div>
                                </div>
                                {ptype === 'cp' &&
                                    <div className="inputname inui">
                                        <h1>Choose Jobsite</h1>
                                        <select name="cars" id="cars" onChange={e => setprojectx(e.target.value)} >
                                            {sites && sites.map(val => (

                                                <option value={val._id}>{val.sitename}</option>
                                            ))

                                            }

                                        </select>
                                    </div>

                                }

                                {ptype !== 'cp' &&
                                    <div className="inputname inui">

                                    </div>

                                }


                                {dull ?
                                    <>

                                        <button style={{ marginLeft: '20px' }} className='btn1 btn3x'  >Export</button>

                                        <button className='btn1' onClick={e => generatereport()} >Generate</button>
                                    </> :
                                    <>
                                        <button style={{ marginLeft: '20px' }} className='btn1' onClick={e => exports()} >Export</button>

                                        <button className='btn1 btn3x'  >Generate</button>
                                    </>
                                }


                                <button onClick={e => setadduser('adduser2')} className='btn2'>Cancel</button>
                                <div className="inputname"></div>
                                <div className="inputname inui" style={{ height: '12px' }}></div>
                            </>: <>


<div className="inputname inui">

    <h1>Select User</h1>
    <select name="cars" id="cars" onChange={e => setuserx(e.target.value)} >
        {users && users.map(val => (

            <option value={val._id}>{val.name}</option>
        ))

        }

    </select>
</div>
<div className="inputname inputname2">
    <h1>Project</h1>
    <div className="rdio">
        <input onClick={e => setptype('ap')} type="radio" checked={ptype === 'ap'} />
        <h3 onClick={e => setptype('ap')} >All Projects</h3>

        <input onClick={e => setptype('cp')} type="radio" checked={ptype === 'cp'} />
        <h3 onClick={e => setptype('cp')} >Custom Project</h3>
    </div>
</div>
{ptype === 'cp' &&
    <div className="inputname inui">
        <h1>Choose Jobsite</h1>
        <select name="cars" id="cars" onChange={e => setprojectx(e.target.value)} >
            {sites && sites.map(val => (

                <option value={val._id}>{val.sitename}</option>
            ))

            }

        </select>
    </div>

}

{ptype !== 'cp' &&
    <div className="inputname inui">

    </div>

}


{dull ?
    <>

        <button style={{ marginLeft: '20px' }} className='btn1 btn3x'  >Export</button>

        <button className='btn1' onClick={e => generatereport()} >Generate</button>
    </> :
    <>
        <button style={{ marginLeft: '20px' }} className='btn1' onClick={e => exports()} >Export</button>

        <button className='btn1 btn3x'  >Generate</button>
    </>
}


<button onClick={e => setadduser('adduser2')} className='btn2'>Cancel</button>
<div className="inputname"></div>
<div className="inputname inui" style={{ height: '12px' }}></div>
</>
                        :
                        <div className="inputname inui">
                            <h1>No Data to Show</h1>
                            <button className='ag' onClick={e => setc(1)}>Search Again</button>
                        </div>

                    }




                </div>

            </div>
            <div className={adduser3}>
                <div className="subadduser">
                    {c === 1 ?

                        <>



                            <div className="inputname inui">
                                <h1>Choose Jobsite</h1>
                                <select name="cars" id="cars" onChange={e => setprojectx(e.target.value)} >
                                    {sites && sites.map(val => (

                                        <option value={val._id}>{val.sitename}</option>
                                    ))

                                    }

                                </select>
                            </div>



                            {ptype !== 'cp' &&
                                <div className="inputname inui">

                                </div>

                            }


                            {dull ?
                                <>

                                    <button style={{ marginLeft: '20px' }} className='btn1 btn3x'  >Export</button>

                                    <button className='btn1' onClick={e => preparefor()} >Generate</button>
                                </> :
                                <>
                                    <button style={{ marginLeft: '20px' }} className='btn1' onClick={e => preparefor2()} >Export</button>

                                    <button className='btn1 btn3x'  >Generate</button>
                                </>
                            }


                            <button onClick={e => setadduser3('adduser2')} className='btn2'>Cancel</button>
                            <div className="inputname"></div>
                            <div className="inputname inui" style={{ height: '12px' }}></div>
                        </>
                        :
                        <div className="inputname inui">
                            <h1>No Data to Show</h1>
                            <button className='ag' onClick={e => setc(1)}>Search Again</button>
                        </div>

                    }




                </div>

            </div>
            <div className={adduser4}>
                <div className="subadduser">
                    {c === 1 ?

                        <>



                            <div className="inputname inui">
                                <h1>Choose Jobsite</h1>
                                <select name="cars" id="cars" onChange={e => setprojectx(e.target.value)} >
                                    {sites && sites.map(val => (

                                        <option value={val._id}>{val.sitename}</option>
                                    ))

                                    }

                                </select>
                            </div>



                            {ptype !== 'cp' &&
                                <div className="inputname inui">

                                </div>

                            }


                            <>


                                <button className='btn1' onClick={e => prepareforx()} style={{ marginLeft: '20px' }} >Generate</button>
                            </>

                            <button onClick={e => setadduser4('adduser2')} className='btn2'>Cancel</button>
                            <div className="inputname"></div>
                            <div className="inputname inui" style={{ height: '12px' }}></div>
                        </>
                        :
                        <div className="inputname inui">
                            <h1>No Data to Show</h1>
                            <button className='ag' onClick={e => setc(1)}>Search Again</button>
                        </div>

                    }




                </div>

            </div>
            <div className="prodi ghbtn">
                <h1>Attendance Report</h1>
                <div className="prodiheadere">
                    <div className={Daily} onClick={e => Dailys('daily')}>
                        <div className="circx">
                            <BsFileBarGraphFill className='sio' />
                        </div>
                        <div className="subreportcard">
                            <h1>Daily Report</h1>
                        </div>
                    </div>
                    <div className={weekly} onClick={e => Dailys('weekly')}>
                        <div className="circx">
                            <BsFileBarGraphFill className='sio' />
                        </div>
                        <div className="subreportcard">
                            <h1>Weekly Report</h1>
                        </div>
                    </div>
                    <div className={yearly} onClick={e => Dailys('yearly')}>
                        <div className="circx">
                            <BsFileBarGraphFill className='sio' />
                        </div>
                        <div className="subreportcard">
                            <h1>Yearly Report</h1>
                        </div>
                    </div>
                    <div className={Daily} onClick={e => custom('daily')}>
                        <div className="circx">
                            <BsFileBarGraphFill className='sio' />
                        </div>
                        <div className="subreportcard">
                            <h1>Custom range</h1>
                        </div>
                    </div>


                </div>



            </div>
            <div className="prodi ghbtn">

                <h1>Foreman's Report</h1>
                <div className="prodiheadere">

                    <div className='reportcard' onClick={e => setadduser3('adduser')}>
                        <div className="circf">
                            <FaUserNurse className='sio' />
                        </div>
                        <div className="subreportcard" >
                            <h1>Foreman's Report</h1>
                        </div>
                    </div>


                </div>




            </div>

            <div className="prodi ghbtn">
                <h1>EAS Report</h1>
                <div className="prodiheadere">
                    <div className='reportcard' onClick={e => setadduser4('adduser')}>
                        <div className="circf2">
                            <MdOutlineAccessTimeFilled className='sio2' />
                        </div>
                        <div className="subreportcard" >
                            <h1>EAS Report</h1>
                        </div>
                    </div>


                </div>




            </div>
        </>
    )
}

export default Reports







