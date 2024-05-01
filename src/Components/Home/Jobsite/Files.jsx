
import React, { useState } from 'react'

import {BsFolder} from 'react-icons/bs'





import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';

import { GiEnergyArrow } from 'react-icons/gi'
import { RiLightbulbFlashLine, RiTimerFlashFill } from 'react-icons/ri'
import { BiTime } from 'react-icons/bi'
import { MdSnooze } from 'react-icons/md'
import { AiOutlineReload } from 'react-icons/ai'
import axios from 'axios'
import { useEffect } from 'react'
import { VscChromeClose } from 'react-icons/vsc'
import { HiArrowLeft } from 'react-icons/hi'
import { BsClockFill } from 'react-icons/bs'

import { IoClose } from 'react-icons/io5'
import { FaFileImage } from 'react-icons/fa'
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';


import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import ReactPaginate from 'react-paginate';


import { FaBuilding } from 'react-icons/fa'
import { MdLocationOn } from 'react-icons/md'
import { FaPencilAlt } from 'react-icons/fa'


import XLSX from 'sheetjs-style'
import jsPDF from 'jspdf';
import ReactToPrint from 'react-to-print';

import * as file from 'file-saver'
import { AiFillDelete } from 'react-icons/ai'
import html2canvas from 'html2canvas'
import { tz } from '../../apis'
import { useRef } from 'react'
import { async } from '@firebase/util'

import g from '../../../images/g.png'
import g2 from '../../../images/g2.png'
import Invoice from './invoice'
import { addJobiste, addPayroll, findClientById, getAactiveSiteusers, getActiveClients, getAllClients, getAllJobsites, loginAdmin2, sendClientInvoice, updateClient, updateClientOnly, updateJobiste } from '../../../Utils/api';
const Files = ({props}) => {
    const [files, setfiles] = useState([])
const [companies, setcompanies] = useState([])

const mapContainer = useRef(null);
mapboxgl.accessToken = 'pk.eyJ1IjoidXNhbWE3ODZhIiwiYSI6ImNsZXZwbDV5ZTF0M3Ezc3Axdmhmb2Z3bmwifQ.b3u24ezWs8--UJphBNY1rA'

function importthis(val) {
    console.log(val)
    setinvoiced(val)
    
    setdivfile(val._id)
   for(var i=0;i<2;i++){
    setpreparedata([]);
    setapplyperdiemx(val.pdapplied === 'true');
  
    let counter = 0;
  
    val.invoicedetails.forEach((element) => {
      setpreparedata((prevData) => [
        ...prevData,
        {
        

            siteid:element.p_siteid,
            userid: element.p_userid,
            perdiemel:element.p_perdiemel,
            onperdiemel:element.p_onperdiemel,
            p_perdiem:element.p_perdiem, 
         p_onperdiem:element.p_onperdiem,
          Taxes: element.taxes,
          Client: incname,
          Date: element.date,
          Employee: element.empname,
          skill: element.skill,
          days: element.days,
          Hrs: Number(element.hrs),
          Payrate: Number(element.payrate),
          distance: parseInt(element.distance),
          Ot_Hrs: Number(element.othrs),
          OT_Pay_rate: Number(element.otpayrate),
          nc_4: element.nc === 'no' ? '-' : Number(element.nc),
          total: Number(element.total),
          deductions: Number(element.deductions),
          net: Number(element.net),
          perdiem: Number(element.perdiem),
          onperdiem: Number(element.onperdiem),
        },
      ]);
  
      counter++;
  
      if (counter === val.invoicedetails.length) {
   
      }
    });
  
    setadduserd('adduser2');
   }
}
function savepayroll(){
    var updatedata=preparedata
    const updatedData = updatedata.map(element => {
        // Check if the element's siteid and userid match the provided values
        if (element.siteid  && element.userid) {
            // Find the site corresponding to siteid
            const site = data.find(site => site._id === element.siteid);
            if (site) {
                // Find the user corresponding to userid in the site's users array
                const user = site.user.find(user => user.userid === element.userid);
                
                if (user) {
                    // Update OT_Pay_rate with user's otpayrate
                    return {
                        ...element,
                        OT_Pay_rate: Number(user.otpayrate),
                        Client:comp.username,
                        Payrate:Number(user.cpr==='0'?user.payrate:user.cpr),
                        perdiem:element.p_perdiem,
                        onperdiem:element.p_onperdiem,
                        total: ((Number(user.cpr==='0'?user.payrate:user.cpr)) * (Number(element.Hrs))) + (Number(element.Ot_Hrs) * (Number(user.otpayrate))),
                        net:
                        ((Number(user.cpr==='0'?user.payrate:user.cpr)) * Number(element.Hrs)) + (Number(element.Ot_Hrs) * (Number(user.otpayrate)))
                        +(element.onperdiemel==='Yes'?Number(element.onperdiem):0)
                        +(element.perdiemel==='Yes'?Number(element.perdiem)*Number(element.days):0)
    -
                        (
                            element.nc_4 === 'no'|| element.nc_4 === '-'|| element.nc_4===0
                              ? 0
                              : (
                                  (Number(user.cpr==='0'?user.payrate:user.cpr) * 0) +
                                  (0 * parseInt(user.otpayrate))
                                ) * 4 / 100
                          )-(element.deductions)
                         
                    };
                }
            }
            else{
                const user = empdata.find(user => user._id === element.userid);
                return {
                    ...element,
                    OT_Pay_rate: Number(user.otpayrate),
                    Client:comp.username,
                    perdiem:element.p_perdiem,
                    onperdiem:element.p_onperdiem,
                    Payrate:Number(user.cpr==='0'?user.payrate:user.cpr),
                    total: ((Number(user.cpr==='0'?user.payrate:user.cpr,)) * (Number(element.Hrs))) + (Number(element.Ot_Hrs) * (Number(user.otpayrate))),
                    net:
                    ((Number(user.cpr==='0'?user.payrate:user.cpr,)) * Number(element.Hrs)) + (Number(element.Ot_Hrs) * (Number(user.otpayrate)))
                    +(element.onperdiemel==='Yes'?Number(element.onperdiem):0)
                    +(element.perdiemel==='Yes'?Number(element.perdiem)*Number(element.days):0)
    -
                    (
                        element.nc_4 === 'no'|| element.nc_4 === '-'|| element.nc_4===0
                          ? 0
                          : (
                              (Number(user.cpr==='0'?user.payrate:user.cpr,) * 0) +
                              (0 * parseInt(user.otpayrate))
                            ) * 4 / 100
                      )-(element.deductions)
                     
                };
    
            }
        }
        return element; // Return the original element if no update is made
    });
    console.log(updatedData)
    console.log(updatedata)
    var postData={
        data:updatedData,
        companyid:selected,
        status:'Pending',
        by:datax.name,
        createdon:new Date().toLocaleDateString('en-US'),
        date:invoiced.weekno,

    }
      
        addPayroll(postData).then(rees=>{
    alert("Payroll saved")
        })
    
    
    }
    

const mapContainer2 = useRef(null);
const map = useRef(null);
const [lng, setLng] = useState(-70.9);
const [lat, setLat] = useState(42.35);
const [zoom, setZoom] = useState(9);
const [inpex, setinpex] = useState('inpex')
const [latlang, setlatlang] = useState()


const [taskname, settaskname] = useState('')
const [taskdesc, settaskdesc] = useState('')
const [tasks, settasks] = useState([])
function addtask() {

    settasks(tsk => [...tsk, { name: taskname, description: taskdesc }])
    settaskdesc('')
    settaskname('')
}

const mapContainer3 = useRef(null);
const map3 = useRef(null);
const [lng3, setLng3] = useState(-70.9);
const [lat3, setLat3] = useState(42.35);
const [zoom3, setZoom3] = useState(9);

var marker3 = useRef()
const map2 = useRef(null)

var marker2 = useRef()
const [lng2, setLng2] = useState(-70.9);
const [lat2, setLat2] = useState(42.35);
const [zoom2, setZoom2] = useState(9);
const [adduserd, setadduserd] = useState('adduser2')
var marker = useRef()
function setmapxs() {
    setmapx('mapx3')
    setinpex('inpex')
}
const [chklatlang, setchklatlang] = useState()
function ddd() {
    setinpex('mapxs')
    setmapx('map')

    setcfm(true)
    map.current = new mapboxgl.Map({
        container: mapContainer.current,

        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: zoom
    });

    const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: false
    });

    // Add the geocoder to the map
    map.current.addControl(geocoder);

    map.current.on('style.load', function () {

        map.current.resize()
        geocoder.on('result', function (e) {

            setaddress(e.result.place_name)
            if (marker.current) marker.current.remove()
            marker.current = new mapboxgl.Marker()
                .setLngLat(e.result.center)
                .addTo(map.current)
            setlatlang(JSON.stringify({ lng: e.result.center[0], lat: e.result.center[1] }))

            setchklatlang({ lng: e.result.center[0], lat: e.result.center[1] })

        });

        map.current.on('click', function (e) {
            var coordinates = e.lngLat;
            if (marker.current) marker.current.remove()
            marker.current = new mapboxgl.Marker()
                .setLngLat(coordinates)
                .addTo(map.current)
            setlatlang(JSON.stringify(coordinates))

            setchklatlang(coordinates)

        });


    });

}

function ddd2(val) {
    map3.current = new mapboxgl.Map({
        container: mapContainer3.current,

        style: 'mapbox://styles/mapbox/streets-v12',
        center: JSON.parse(val.latlang),
        zoom: zoom
    });

    const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: false
    });

    // Add the geocoder to the map
    map3.current.addControl(geocoder);

    map3.current.resize()

    map3.current.on('style.load', function () {
        if (val.latlang) {
            marker3.current = new mapboxgl.Marker()
                .setLngLat(JSON.parse(val.latlang))
                .setPopup(
                    new mapboxgl.Popup({ offset: 0 }) // add popups
                        .setHTML(
                            `<h3>${val.clientname}</h3><p>${val.sitename}</p>`
                        )
                )
                .addTo(map3.current)
            setlatlang(JSON.parse(val.latlang))

        }
        geocoder.on('result', function (e) {
            if (marker3.current) marker3.current.remove()
            marker3.current = new mapboxgl.Marker()
                .setLngLat(e.result.center)
                .addTo(map3.current)
            setlatlang(JSON.stringify({ lng: e.result.center[0], lat: e.result.center[1] }))

            setchklatlang({ lng: e.result.center[0], lat: e.result.center[1] })

        });



    });

}
const [itemOffset, setItemOffset] = useState(0);
const [kshow, setkshow] = useState(false)
const endOffset = itemOffset + 5;
console.log(`Loading items from ${itemOffset} to ${endOffset}`);
const [currentItems, setcurrentItems] = useState([])
const [pageCount, setpageCount] = useState(0)

const handlePageClick = (event) => {
    const newOffset = (event.selected * 5) % data.length;
    console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
    );

    setItemOffset(newOffset);

    setcurrentItems(data.slice(newOffset, newOffset + 5))

};
var styl1 =
{
    border: {
        right: {
            style: "thin",
            color: "000000"
        },
        left: {
            style: "thin",
            color: "000000"
        },
        bottom: {
            style: "thin",
            color: "000000"
        },
        top: {
            style: "thin",
            color: "000000"
        },
    },
    font: {
        name: "arial",
        bold: true,
        sz: 10
    },
    alignment: {
        vertical: "center",
        horizontal: "center",
    },							// set the style for target cell
    fill: {
        fgColor: {

            theme: 8,
            tint: 0.3999755851924192,
            rgb: '9CCEB8'
        }
    },
};
var styl2 =
{
    border: {
        right: {
            style: "thin",
            color: "000000"
        },
        left: {
            style: "thin",
            color: "000000"
        },
        bottom: {
            style: "thin",
            color: "000000"
        },
        top: {
            style: "thin",
            color: "000000"
        },
    },
    font: {
        name: "arial",
        bold: true,
        sz: 10
    },
    alignment: {
        vertical: "center",
        horizontal: "center",
    },
};
var styleforaddress =
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

        color: { rgb: '4069A7' }
    },
    alignment: {
        vertical: "center",
        horizontal: "left",
    },
};
var styleforaddress2 =
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

        color: { rgb: '4069A7' }
    },
    alignment: {
        vertical: "center",
        horizontal: "center",
    },
};
var cstyl2 =
{
    border: {
        right: {
            style: "thin",
            color: "000000"
        },
        left: {
            style: "thin",
            color: "000000"
        },
        bottom: {
            style: "thin",
            color: "000000"
        },
        top: {
            style: "thin",
            color: "000000"
        },
    },
    font: {
        name: "arial",
        bold: true,
        sz: 10
    },
    alignment: {
        vertical: "center",
        horizontal: "center",
    },
    numFmt: "$#,###.00"
};
const outside=useRef()

const [boxprojects, setboxprojects] = useState('boxprojects2')
const [address, setaddress] = useState('')
const [pno, setpno] = useState('')
const [adduser, setadduser] = useState('adduser2')
const [i, seti] = useState(0)
const [taxes, settaxes] = useState('taxes')
const [circle, setcircle] = useState('circle')
const [is, setis] = useState(0)


const [taxes2, settaxes2] = useState('taxes')
const [circle2, setcircle2] = useState('circle')
const [is2, setis2] = useState(0)
const [data, setdata] = useState()
const [sname, setsname] = useState('')
const [userid, setuserid] = useState('')
const [name, setname] = useState('')
const [cname, setcname] = useState('')
const [skill, setskill] = useState('')
const [payrate, setpayrate] = useState('')
const [otpayrate, setotpayrate] = useState('')
const [data2, setdata2] = useState([])
const [mkup, setmkup] = useState(0)
const [currid, setcurrid] = useState('')
const [address2, setaddress2] = useState('')
const [pno2, setpno2] = useState('')
const [pname2, setpname2] = useState('')


const [filter, setfilter] = useState('jobsite')
const [searchval, setsearchval] = useState('')

const [preparedata, setpreparedata] = useState([])


function save() {
    const currentWeekNumber = Math.ceil((new Date() - new Date(new Date().getFullYear(), 0, 1) + 1) / 604800000);
    const currentYear = new Date().getFullYear();

    var ts = []

    preparedata.forEach((val, index) => {


        ts.push({

            taxes: val.Taxes,
            date: val.Date,
            empname: val.Employee,
            skill: val.skill,
            hrs: val.Hrs,
            payrate: val.Payrate,
            distance: val.distance,
            othrs: val.Ot_Hrs,
            otpayrate: val.OT_Pay_rate,
            nc: val.nc_4,
            total: val.total,
            deductions: val.deductions,
            net: val.net,
            perdiem: applyperdiemx ? val.perdiem : 0,
            onperdiem: applyperdiemx ? val.onperdiem : 0,
            days: applyperdiemx ? val.days : 0,
        })
        if (index === preparedata.length - 1) {

            if (l === 2) {

                var postData= {

                    date: indate,
                    weekno: currentWeekNumber,
                    year: currentYear,
                    no: inno,
                    _id: currid,
                    due: indue,
                    total: Number(totalall).toFixed(2).toLocaleString('en'),
                    paid: 0,
                    balance: Number(totalall).toFixed(2).toLocaleString('en'),
                    status: 'pending',
                    reporttype: 'invoice',
                    perdiemapplied: applyperdiemx,

                    filename: inname + '-' + incname + '-' + new Date().toLocaleDateString('en-US'),

                    data: ts




                }
                updateClientOnly(postData).then(res => {
                    console.log(res)
                    alert('Saved')



                })
            }
            else {
                var postData={


                    _id: currid,
                    reporttype: 'report',
                    perdiemapplied: applyperdiemx,
                    weekno: currentWeekNumber,
                    year: currentYear,
                    filename: inname + '-' + incname + '-' + new Date().toLocaleDateString('en-US'),







                    data: ts




                }
                updateClientOnly(postData).then(res => {
                    console.log(res)
                    alert('Saved')


                })
            }
        }

    })





}
const [clientadd, setclientadd] = useState('')
const [last2, setlast2] = useState('')
function preparesheet(valx) {
    console.log(ind)
    console.log(lastselected)
    console.log(ind.search(lastselected))
    if (ind.search(lastselected) >= 0||lastcom===last2) {
        setk(1)
        setl(valx)
        if (valx === 2) {
            var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
            setinno(seq)

            const date = new Date();

            const date3 = new Date();

            var result = date3.setDate(date.getDate() + 20);
            const date2 = new Date(result)

            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();


            let day2 = date2.getDate();
            let month2 = date2.getMonth() + 1;
            let year2 = date2.getFullYear();

            // This arrangement can be altered based on how we want the date's format to appear.
            let currentDate = `${month}-${day}-${year}`;
            setindate(currentDate)
            let currentDate2 = `${month2}-${day2}-${year2}`;
            setindue(currentDate2)
            var tempprepare = preparedata;
            setpreparedata([])
            data.forEach((val, index) => {

                if (ind.search(' ' + index.toString() + ' ') >= 0) {


                    setinname(val.sitename)

                    var postData={
                        Client_id: val.clientid
                    }
                    findClientById(postData).then(res => {
                        setinadd(res.Client[0].address)
                    })

                    setinnum(val.no)
                    setmkup(val.markup)
                    setincname(val.clientname)
                    setperdiemamnt1(Number(val.perdiemamnt))
                    setonperdiemamnt1(Number(val.onperdiemamnt))


                    val.user.length > 0 && val.user.forEach((element, indx) => {
                        console.log(val)
                        if (valx === 2) {

                            setcurrid(val.clientid)


                        }
                        console.log(indx)
                        console.log(tempprepare)

                        setpreparedata(pr => [...pr, {
                            Taxes: element.taxes,
                            Client: val.clientname,
                            Date: '1-1-2023',
                            Employee: element.name,
                            skill: element.skill,
                            Hrs: (allhours.find(obj => obj.userid === element.userid&& obj.siteid === val._id)?.Hrs)||0,
                            Payrate: valx === 1 ? Number(element.payrate) : Number(element.payrate) + Number(element.payrate) * Number(val.markup) / 100,
                            siteid:val._id,
                            userid: element.userid,
                            distance: parseInt(element.distance),
                            days: (allhours.find(obj => obj.userid === element.userid&& obj.siteid === val._id)?.days)||0,
                            perdiemel: (allhours.find(obj => obj.userid === element.userid&& obj.siteid === val._id)?.perdiemel)||element.perdiem, onperdiemel: (allhours.find(obj => obj.userid === element.userid&& obj.siteid === val._id)?.onperdiemel)||element.onperdiem,
                            perdiem: applyperdiemx ? (allhours.find(obj => obj.userid === element.userid&& obj.siteid === val._id)?.perdiem)||0 : 0, onperdiem: applyperdiemx ? (allhours.find(obj => obj.userid === element.userid&& obj.siteid === val._id)?.onperdiem)||0 : 0,
                            Ot_Hrs: (allhours.find(obj => obj.userid === element.userid&& obj.siteid === val._id)?.Ot_Hrs)||0,
                            OT_Pay_rate: Number(element.otpayrate) + Number(element.otpayrate) * Number(val.markup) / 100,
                            nc_4: element.nc === 'no' ? '-' : ((Number(element.payrate) * 0) + (0 * Number(element.otpayrate))) * 4 / 100,
                            total: (Number(element.payrate) * (allhours.find(obj => obj.userid === element.userid&& obj.siteid === val._id)?.Hrs)||0) + ((allhours.find(obj => obj.userid === element.userid&& obj.siteid === val._id)?.Ot_Hrs)||0 * Number(element.otpayrate)),
                            deductions: 0,
                            net: (Number(element.payrate) * (allhours.find(obj => obj.userid === element.userid&& obj.siteid === val._id)?.Hrs)||0) + ((allhours.find(obj => obj.userid === element.userid&& obj.siteid === val._id)?.Ot_Hrs)||0 * Number(element.otpayrate)) - 0 - (element.nc === 'no' ? 0 : ((Number(element.payrate) * 0) + (0 * parseInt(element.otpayrate))) * 4 / 100)




                        }])

                    });
                }

            });
        }
        else {
            var tempprepare = preparedata;
            setpreparedata([])
            data.forEach((val, index) => {

                if (ind.search(' ' + index.toString() + ' ') >= 0) {

                    setinadd(val.address)

                    setinname(val.sitename)

                    setinnum(val.no)
                    setmkup(val.markup)
                    setincname(val.clientname)
                    setperdiemamnt1(Number(val.perdiemamnt))
                    setonperdiemamnt1(Number(val.onperdiemamnt))


                    val.user.length > 0 && val.user.forEach((element, indx) => {
                        console.log(val)
                        if (valx === 2) {

                            setcurrid(val.clientid)


                        }

                        setpreparedata(pr => [...pr, {
                            Taxes: element.taxes,
                            Client: val.clientname,
                            Date: '1-1-2023',
                            Employee: element.name,
                            skill: element.skill,
                            Hrs: (allhours.find(obj => obj.userid === element.userid&& obj.siteid === val._id)?.Hrs)||0,
                            Payrate: valx === 1 ? Number(element.payrate) : Number(element.payrate) + Number(element.payrate) * Number(val.markup) / 100,
                            siteid:val._id,

                            userid: element.userid,
                            distance: parseInt(element.distance),
                            days: (allhours.find(obj => obj.userid === element.userid&& obj.siteid === val._id)?.days)||0,
                            perdiemel: (allhours.find(obj => obj.userid === element.userid&& obj.siteid === val._id)?.perdiemel)||element.perdiem, onperdiemel: (allhours.find(obj => obj.userid === element.userid&& obj.siteid === val._id)?.onperdiemel)||element.onperdiem,
                            perdiem: applyperdiemx ? (allhours.find(obj => obj.userid === element.userid&& obj.siteid === val._id)?.perdiem)||0 : 0, onperdiem: applyperdiemx ? (allhours.find(obj => obj.userid === element.userid&& obj.siteid === val._id)?.onperdiem)||0 : 0,


                            Ot_Hrs: (allhours.find(obj => obj.userid === element.userid&& obj.siteid === val._id)?.Ot_Hrs)||0,
                            OT_Pay_rate: Number(element.otpayrate) + Number(element.otpayrate) * Number(val.markup) / 100,
                            nc_4: element.nc === 'no' ? '-' : ((Number(element.payrate) * 0) + (0 * Number(element.otpayrate))) * 4 / 100,
                            total: (Number(element.payrate) * (allhours.find(obj => obj.userid === element.userid&& obj.siteid === val._id)?.Hrs)||0) + ((allhours.find(obj => obj.userid === element.userid&& obj.siteid === val._id)?.Ot_Hrs)||0 * Number(element.otpayrate)),
                            deductions: 0,
                            net: (Number(element.payrate) * (allhours.find(obj => obj.userid === element.userid&& obj.siteid === val._id)?.Hrs)||0) + ((allhours.find(obj => obj.userid === element.userid&& obj.siteid === val._id)?.Ot_Hrs)||0 * Number(element.otpayrate)) - 0 - (element.nc === 'no' ? 0 : ((Number(element.payrate) * 0) + (0 * parseInt(element.otpayrate))) * 4 / 100)




                        }])

                    });
                }

            });

        }
    }
    else {
        setpreparedata([])
        if (valx === 2) {
            var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
            setinno(seq)
        }
        setl(valx)
        setpreparedata([])
        console.log(data)
        if (valx === 2) {
            data.forEach((val, index) => {
                if (valx === 2) {


                    console.log(val.address)

                    const date = new Date();

                    const date3 = new Date();

                    var result = date3.setDate(date.getDate() + 20);
                    const date2 = new Date(result)

                    let day = date.getDate();
                    let month = date.getMonth() + 1;
                    let year = date.getFullYear();


                    let day2 = date2.getDate();
                    let month2 = date2.getMonth() + 1;
                    let year2 = date2.getFullYear();

                    // This arrangement can be altered based on how we want the date's format to appear.
                    let currentDate = `${month}-${day}-${year}`;
                    setindate(currentDate)
                    let currentDate2 = `${month2}-${day2}-${year2}`;
                    setindue(currentDate2)

                }
                if (ind.search(' ' + index.toString() + ' ') >= 0) {
                    var postData={
                        Client_id: val.clientid
                    }
                    findClientById(postData).then(res => {
                        setinadd(res.Client[0].address)
                    })


                    setinname(val.sitename)

                    setinnum(val.no)
                    setmkup(val.markup)
                    setincname(val.clientname)



                    setperdiemamnt1(Number(val.perdiemamnt))
                    setonperdiemamnt1(Number(val.onperdiemamnt))


                    val.user.length > 0 && val.user.forEach(element => {
                        console.log(val)
                        if (valx === 2) {

                            setcurrid(val.clientid)


                        }

                        setpreparedata(pr => [...pr, {
                            Taxes: element.taxes,
                            Client: val.clientname,
                            Date: '1-1-2023',
                            Employee: element.name,
                            skill: element.skill,
                            userid: element.userid,
                            siteid:val._id,

                            Hrs: 0,
                            Payrate: valx === 1 ? Number(element.payrate) : Number(element.payrate) + Number(element.payrate) * Number(val.markup) / 100,

                            distance: parseInt(element.distance),
                            days: 0,
                            perdiemel: element.perdiem, onperdiemel: element.onperdiem,

                            Ot_Hrs: 0,
                            OT_Pay_rate: Number(element.otpayrate) + Number(element.otpayrate) * Number(val.markup) / 100,
                            nc_4: element.nc === 'no' ? '-' : ((Number(element.payrate) * 0) + (0 * Number(element.otpayrate))) * 4 / 100,
                            total: (Number(element.payrate) * 0) + (0 * Number(element.otpayrate)),
                            deductions: 0,
                            net: (Number(element.payrate) * 0) + (0 * Number(element.otpayrate)) - 0 - (element.nc === 'no' ? 0 : ((Number(element.payrate) * 0) + (0 * parseInt(element.otpayrate))) * 4 / 100)




                        }])

                    });
                }

            });
            setk(1)
            console.log(preparedata)
        }
        else {
            data.forEach((val, index) => {

                if (valx === 2) {

                    setmkup(val.markup)
                    setinnum(val.no)
                    setinadd(val.address)
                    setinname(val.sitename)
                    console.log(val.address)

                    const date = new Date();

                    const date3 = new Date();

                    var result = date3.setDate(date.getDate() + 20);
                    const date2 = new Date(result)

                    let day = date.getDate();
                    let month = date.getMonth() + 1;
                    let year = date.getFullYear();


                    let day2 = date2.getDate();
                    let month2 = date2.getMonth() + 1;
                    let year2 = date2.getFullYear();

                    // This arrangement can be altered based on how we want the date's format to appear.
                    let currentDate = `${month}-${day}-${year}`;
                    setindate(currentDate)
                    let currentDate2 = `${month2}-${day2}-${year2}`;
                    setindue(currentDate2)

                }
                if (ind.search(' ' + index.toString() + ' ') >= 0) {


                    setperdiemamnt1(Number(val.perdiemamnt))
                    setonperdiemamnt1(Number(val.onperdiemamnt))


                    setinname(val.sitename)
                    setincname(val.clientname)
                    val.user.length > 0 && val.user.forEach(element => {
                        console.log(val)

                        setcurrid(val.clientid)



                        setpreparedata(pr => [...pr, {
                            Taxes: element.taxes,
                            Client: val.clientname,
                            Date: '1-1-2023',
                            Employee: element.name,
                            Hrs: 0,
                            days: 0,
                            distance: parseInt(element.distance),

                            userid: element.userid,
                            siteid:val._id,

                            Payrate: valx === 1 ? parseInt(element.payrate) : parseInt(element.payrate),
                            Ot_Hrs: 0,
                            OT_Pay_rate: parseInt(element.otpayrate),
                            nc_4: element.nc === 'no' ? '-' : ((parseInt(element.payrate) * 0) + (0 * parseInt(element.otpayrate))) * 4 / 100,
                            total: (parseInt(element.payrate) * 0) + (0 * parseInt(element.otpayrate)),
                            deductions: 0,
                            net: (parseInt(element.payrate) * 0) + (0 * parseInt(element.otpayrate)) - 0 - (element.nc === 'no' ? 0 : ((parseInt(element.payrate) * 0) + (0 * parseInt(element.otpayrate))) * 4 / 100)


                            ,
                            perdiemel: element.perdiem, onperdiemel: element.onperdiem,

                        }])

                    });
                }

            });
            setk(1)
            console.log(preparedata)
        }
    }

}




function preparesheetclient(val) {
    setl(val)
    setpreparedata([])
    console.log(data)
    data.forEach((val, index) => {
        if (ind.search(' ' + index.toString() + ' ') >= 0) {
            val.user.length > 0 && val.user.forEach(element => {
                console.log(val)
                setpreparedata(pr => [...pr, {
                    Taxes: element.taxes,
                    Client: val.clientname,
                    Date: '1-1-2023',
                    Employee: element.name,
                    Hrs: 0,
                    Payrate: parseInt(element.payrate),
                    Ot_Hrs: 0,
                    OT_Pay_rate: parseInt(element.otpayrate),
                    nc_4: element.nc === 'no' ? '-' : ((parseInt(element.payrate) * 0) + (0 * parseInt(element.otpayrate))) * 4 / 100,
                    total: (parseInt(element.payrate) * 0) + (0 * parseInt(element.otpayrate)),
                    deductions: 0,
                    net: (parseInt(element.payrate) * 0) + (0 * parseInt(element.otpayrate)) - 0 - (element.nc === 'no' ? 0 : ((parseInt(element.payrate) * 0) + (0 * parseInt(element.otpayrate))) * 4 / 100)




                }])

            });
        }

    });
    setk(1)
    console.log(preparedata)
}
function setcurronex(val) {
    setcurrone(val)
    setkshow(true)
    ddd2(val)
}
function exports() {
    const filetype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    var ext = '.xlsx'

    const myHeader = ["Taxes", "Client", "Date", 'Employee', 'Hrs', 'Payrate', 'Ot_Hrs', 'OT_Pay_rate', 'total', 'nc_4', 'deductions', 'net'];
    const ws = XLSX.utils.json_to_sheet(preparedata, { header: myHeader })

    var wscols = [
        { wch: 6 },
        { wch: 7 },
        { wch: 8 },
        { wch: 20 },
        { wch: 6 },
        { wch: 7 },
        { wch: 8 },
        { wch: 10 },
        { wch: 7 },
        { wch: 8 },
        { wch: 12 },
    ];
    for (var k = 0; k < preparedata.length + 1; k++) {
        if (k === 0) {

            ws[`B${k + 1}`].s = styl1
            ws[`A${k + 1}`].s = styl1
            ws[`C${k + 1}`].s = styl1
            ws[`D${k + 1}`].s = styl1
            ws[`E${k + 1}`].s = styl1
            ws[`F${k + 1}`].s = styl1
            ws[`G${k + 1}`].s = styl1
            ws[`H${k + 1}`].s = styl1
            ws[`I${k + 1}`].s = styl1
            ws[`J${k + 1}`].s = styl1
            ws[`K${k + 1}`].s = styl1
            ws[`L${k + 1}`].s = styl1
        }
        else {

            ws[`B${k + 1}`].s = styl2
            ws[`A${k + 1}`].s = styl2
            ws[`C${k + 1}`].s = styl2
            ws[`D${k + 1}`].s = styl2
            ws[`E${k + 1}`].s = styl2
            ws[`F${k + 1}`].s = cstyl2
            ws[`G${k + 1}`].s = styl2
            ws[`H${k + 1}`].s = cstyl2
            ws[`I${k + 1}`].s = styl2
            ws[`J${k + 1}`].s = styl2
            ws[`K${k + 1}`].s = styl2
            ws[`L${k + 1}`].s = styl2

        }
    }




    ws['!cols'] = wscols;
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] }
    const excelbuffer = XLSX.write(wb, { booktype: 'xlsx', type: 'array' })
    const dar = new Blob([excelbuffer], { type: filetype })
    file.saveAs(dar, 'asd.xlsx',)




}
function exports3() {

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
    const filetype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    var ext = '.xlsx'

    const myHeader = ["Taxes", "Client", "Date", 'Employee', 'Hrs', 'Payrate', 'Ot_Hrs', 'OT_Pay_rate', 'total', 'nc_4', 'deductions', 'net'];
    const ws = XLSX.utils.json_to_sheet(preparedata, { header: myHeader })

    var wscols = [
        { wch: 6 },
        { wch: 7 },
        { wch: 8 },
        { wch: 20 },
        { wch: 6 },
        { wch: 7 },
        { wch: 8 },
        { wch: 10 },
        { wch: 7 },
        { wch: 8 },
        { wch: 12 },
    ];
    for (var k = 0; k < preparedata.length + 1; k++) {
        if (k === 0) {

            ws[`B${k + 1}`].s = styl1p
            ws[`A${k + 1}`].s = styl1p
            ws[`C${k + 1}`].s = styl1p
            ws[`D${k + 1}`].s = styl1p
            ws[`E${k + 1}`].s = styl1p
            ws[`F${k + 1}`].s = styl1p
            ws[`G${k + 1}`].s = styl1p
            ws[`H${k + 1}`].s = styl1p
            ws[`I${k + 1}`].s = styl1p
            ws[`J${k + 1}`].s = styl1p
            ws[`K${k + 1}`].s = styl1p
            ws[`L${k + 1}`].s = styl1p
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
                ws[`I${k + 1}`].s = styl2x
                ws[`J${k + 1}`].s = styl2x
                ws[`K${k + 1}`].s = styl2x
                ws[`L${k + 1}`].s = styl2x
            } else if (k % 2 !== 0) {

                ws[`B${k + 1}`].s = styl2xp
                ws[`A${k + 1}`].s = styl2xp
                ws[`C${k + 1}`].s = styl2xp
                ws[`D${k + 1}`].s = styl2xp
                ws[`E${k + 1}`].s = styl2xp
                ws[`F${k + 1}`].s = cstyl2xp
                ws[`G${k + 1}`].s = styl2xp
                ws[`H${k + 1}`].s = cstyl2xp
                ws[`I${k + 1}`].s = styl2xp
                ws[`J${k + 1}`].s = styl2xp
                ws[`K${k + 1}`].s = styl2xp
                ws[`L${k + 1}`].s = styl2xp
            }

        }
    }




    ws['!cols'] = wscols;
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] }
    const excelbuffer = XLSX.write(wb, { booktype: 'xlsx', type: 'array' })
    const dar = new Blob([excelbuffer], { type: filetype })
    file.saveAs(dar, 'asd.xlsx',)




}
const [totalall, settotalall] = useState(0)
const [markupcuee, setmarkupcuee] = useState(0)
const [multiple, setmultiple] = useState(false)
const [invoiced, setinvoiced] = useState(null)

function exports2() {

    var tx = []
    var alltotal = 0
    settxp([])
    const hasDifferentNames = (projects) => {
        const names = new Set(projects.map(project => project.siteid));
        return names.size > 1 ? true : false;

      };
      setmultiple(hasDifferentNames(preparedata))

    preparedata.forEach((val, index) => {

        var tr = parseFloat(val.Payrate)

        var to = parseFloat(val.OT_Pay_rate)

        alltotal = alltotal + parseFloat(tr * val.Hrs + to * val.Ot_Hrs + Number(val.perdiem)*val.days+Number(val.onperdiem)*val.days)
        settotalall(alltotal)
        tx.push({
            ["NAME"]: val.Employee,
            ["REG HRS"]: val.Hrs,
            ["WEEKEND"]: val.Date,
            ["REG RTE"]: Number(tr).toFixed(2).toLocaleString('en'),
            ["OT HRS"]: val.Ot_Hrs,
            ["OT RTE"]: Number(to).toFixed(2).toLocaleString('en'),
            ["TOTAL"]: Number(tr * val.Hrs + to * val.Ot_Hrs + Number(val.perdiem)*val.days+Number(val.onperdiem)*val.days).toFixed(2).toLocaleString('en'),
            ["SKILL"]: val.skill,
            ["site"]: ((found) => found ? found.sitename : 'Project not found')(data.find(project => project._id === val.siteid)), // Output: "Project 2" or "Project not found"
            ["P.D"]: Number(val.perdiem)  + Number(val.onperdiem) ,
            ["days"]: val.days,



        })
        if (preparedata.length - 1 === index) {
            settxp(tx)
            console.log(tx)
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
                    color: { rgb: '3E5B77' }
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
                    color: { rgb: '3E5B77' }
                },
                alignment: {
                    vertical: "center",
                    horizontal: "center",
                },
            };
            var styl1x =
            {
                border: {
                    right: {
                        style: "thin",
                        color: { rgb: '6899c7' }
                    },
                    left: {
                        style: "thin",
                        color: { rgb: '6899c7' }
                    },
                    bottom: {
                        style: "thin",
                        color: { rgb: '6899c7' }
                    },
                    top: {
                        style: "thin",
                        color: { rgb: '6899c7' }
                    },
                },
                font: {
                    name: "arial",
                    bold: true,
                    sz: 10,

                    color: { rgb: '4069A7' }
                },
                alignment: {
                    vertical: "center",
                    horizontal: "center",
                },							// set the style for target cell
                fill: {
                    fgColor: {

                        theme: 8,
                        tint: 0.3999755851924192,
                        rgb: 'FFFFFF'
                    }
                },
            };
            const filetype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
            var ext = '.xlsx'

            const myHeader = ["WEEKEND", "NAME", 'SKILL', "REG HRS", 'REG RTE', 'OT HRS', "OT RTE", 'TOTAL'];
            var prd2 = [
                {

                    ["NAME"]: "val.Employee",
                    ["REG HRS"]: "val.Hrs",
                    ["WEEKEND"]: "val.Date",
                    ["REG RTE"]: "val.Payrate",
                    ["OT HRS"]: "val.Ot_Hrs",
                    ["OT RTE"]: "val.OT_Pay_rate",
                    ["TOTAL"]: "val.total",
                    ["SKILL"]: "val.skill",
                },
                {

                    ["NAME"]: "val.Employee",
                    ["REG HRS"]: "val.Hrs",
                    ["WEEKEND"]: "val.Date",
                    ["REG RTE"]: "val.Payrate",
                    ["OT HRS"]: "val.Ot_Hrs",
                    ["OT RTE"]: "val.OT_Pay_rate",
                    ["TOTAL"]: "val.total",
                    ["SKILL"]: "val.skill",
                }, {

                    ["NAME"]: "val.Employee",
                    ["REG HRS"]: "val.Hrs",
                    ["WEEKEND"]: "val.Date",
                    ["REG RTE"]: "val.Payrate",
                    ["OT HRS"]: "val.Ot_Hrs",
                    ["OT RTE"]: "val.OT_Pay_rate",
                    ["TOTAL"]: "val.total",
                    ["SKILL"]: "val.skill",
                }, {

                    ["NAME"]: "val.Employee",
                    ["REG HRS"]: "val.Hrs",
                    ["WEEKEND"]: "val.Date",
                    ["REG RTE"]: "val.Payrate",
                    ["OT HRS"]: "val.Ot_Hrs",
                    ["OT RTE"]: "val.OT_Pay_rate",
                    ["TOTAL"]: "val.total",
                    ["SKILL"]: "val.skill",
                },

            ]
            console.log(preparedata)
            const ws = XLSX.utils.json_to_sheet(prd2, { header: myHeader })


            var wscols = [

                { wch: 8 },
                { wch: 13 },
                { wch: 15 },

                { wch: 8 },
                { wch: 8 },
                { wch: 8 },
                { wch: 8 },
                { wch: 10 },
                { wch: 7 },
                { wch: 8 },
                { wch: 12 },
            ];



            var wscolsd = [
                { hpx: 20 },

                { hpx: 20 },

                { hpx: 20 },

                { hpx: 20 },

                { hpx: 20 },

                { hpx: 40 },
            ]

            ws['!rows'] = wscolsd

            ws['!cols'] = wscols;
            settxp(tx)

            var ws3 = XLSX.utils.sheet_add_json(ws,
                tx
                , {

                    header: myHeader,
                    skipHeader: false,
                    origin: 'A7'
                });
            var wsx = XLSX.utils.sheet_add_aoa(ws3, [
                [`${compnay}`, '', '', '', '', '', '', ''],

                [`Date: ${indate}`, '', '', '', '', '', '', ''],

                [`Invoice # ${inno}`, '', '', '', '', `${add}`, '', ''],

                [`Project Number ${innum}`, '', '', '', '', `${zpi}`, '', ''],

                [`Project Name: ${inname}`, '', '', '', '', '919-381-0394', '', ''],
                [`${inadd}`, '', '', '', '', 'www.cfi-solutions.com', '', ''],

            ], {

                header: ["note"],
                skipHeader: true,
                origin: 'A1'
            });

            var ws2 = XLSX.utils.sheet_add_aoa(wsx, [

                ['', '', , '', , '', 'Total', alltotal],
                ['', "Thanks for your business. Its a pleasure to work with you on your project."],
            ], {

                header: ["note"],
                skipHeader: true,
                origin: -1
            });
            var g = tx.length + 7
            for (var k = 0; k < g; k++) {
                if (k === 0 || k === 1 || k == 2 || k === 3 || k == 4 || k === 5) {

                    ws2[`B${k + 1}`].s = styleforaddress
                    ws2[`A${k + 1}`].s = styleforaddress
                    ws2[`C${k + 1}`].s = styleforaddress
                    ws2[`D${k + 1}`].s = styleforaddress
                    ws2[`E${k + 1}`].s = styleforaddress
                    ws2[`F${k + 1}`].s = styleforaddress
                    ws2[`G${k + 1}`].s = styleforaddress
                    ws2[`H${k + 1}`].s = styleforaddress
                }
                else if (k === 6) {

                    ws2[`B${k + 1}`].s = styl1x
                    ws2[`A${k + 1}`].s = styl1x
                    ws2[`C${k + 1}`].s = styl1x
                    ws2[`D${k + 1}`].s = styl1x
                    ws2[`E${k + 1}`].s = styl1x
                    ws2[`F${k + 1}`].s = styl1x
                    ws2[`G${k + 1}`].s = styl1x
                    ws2[`H${k + 1}`].s = styl1x
                }
                else {

                    ws2[`B${k + 1}`].s = styl2x
                    ws2[`A${k + 1}`].s = styl2x
                    ws2[`C${k + 1}`].s = styl2x
                    ws2[`D${k + 1}`].s = styl2x
                    ws2[`E${k + 1}`].s = cstyl2x
                    ws2[`F${k + 1}`].s = styl2x
                    ws2[`G${k + 1}`].s = cstyl2x
                    ws2[`H${k + 1}`].s = styl2x

                }
            }

            ws2[`B${tx.length + 9}`].s = styleforaddress
            ws2[`G${tx.length + 8}`].s = styleforaddress2
            ws2[`H${tx.length + 8}`].s = styleforaddress2
            const merge = [
                { s: { r: 0, c: 0 }, e: { r: 0, c: 3 } },
                { s: { r: 1, c: 0 }, e: { r: 1, c: 3 } },
                { s: { r: 2, c: 0 }, e: { r: 2, c: 3 } },
                { s: { r: 3, c: 0 }, e: { r: 3, c: 3 } },
                { s: { r: 4, c: 0 }, e: { r: 4, c: 3 } },
                { s: { r: 5, c: 0 }, e: { r: 5, c: 3 } },

                { s: { r: 1, c: 5 }, e: { r: 1, c: 7 } },
                { s: { r: 0, c: 5 }, e: { r: 0, c: 7 } },
                { s: { r: 2, c: 5 }, e: { r: 2, c: 7 } },
                { s: { r: 3, c: 5 }, e: { r: 3, c: 7 } },
                { s: { r: 4, c: 5 }, e: { r: 4, c: 7 } },
                { s: { r: 5, c: 5 }, e: { r: 5, c: 7 } },


            ];
            ws2["!merges"] = merge;
            const wb = { Sheets: { 'data': ws2 }, SheetNames: ['data'] }
            const excelbuffer = XLSX.write(wb, { booktype: 'xlsx', type: 'array' })
            const dar = new Blob([excelbuffer], { type: filetype })
            /* file.saveAs(dar, 'asd.xlsx',)*/


        }


    });


    setTimeout(() => {
      setaduserl('adduser') }, 10);   // Delay execution by 1 second (1000 milliseconds) }
    }
const [txp, settxp] = useState()

function adddata() {
    setuserdata(userdata => [...userdata, {
        name: name,
        skill: skill,
        payrate: payrate,
        otpayrate: otpayrate,
        nc: nc,
        taxes: taxas,
        perdiem: 'No',
        onperdiem: 'No',
        distance: 0,
        food: 'No',




    }])
    setj(0)

}
const [userdata, setuserdata] = useState([])
const [empdata, setempdata] = useState()
function allemps(val) {
    var t = val.split('eiuka')
    setuserdata([])
    setcname(t[0])
    setclientid(t[2])
    setclientadd(t[3])
    console.log(t[2])
    setmarkupcuee(parseFloat(t[1]))
    empdata.forEach((element, index) => {
        if (t[0] === element.client) {


            setuserdata(userdata => [...userdata, {
                name: element.name,
                skill: element.skill,
                payrate: element.payrate,
                otpayrate: element.otpayrate,
                nc: element.nc,
                empno: element.idno,
                taxes: element.taxes,
                userid: element._id,
                latlang: element.langlat,
                distance: 0,
                perdiem: 'No',
                onperdiem: 'No',
                food: 'No',




            }])


        }



    });


}

function selectthis(val) {
    setcurrone(val)
    if (val.latlang) {
        marker2.current = new mapboxgl.Marker()
            .setLngLat(JSON.parse(val.latlang))
            .setPopup(
                new mapboxgl.Popup({ offset: 0 }) // add popups
                    .setHTML(
                        `<h3>${val.clientname}</h3><p>${val.sitename}</p>`
                    )
            )
            .addTo(map2.current)
    }


}

const [datax, setdatax] = useState(null)
useEffect(() => {
    var postData={
        email:props
    }
  
   loginAdmin2(postData).then(res=>
        {
            console.log(res
                )
                setdatax(res.Admin)
        })
   getAactiveSiteusers().then(res => {
        console.log(res)
        setempdata(res.Siteuserd)
    })

    getAllJobsites().then(res => {
        console.log(res)
        setdata(res.Jobsite)

        setcurrentItems(res.Jobsite.slice(itemOffset, endOffset))
        setpageCount(Math.ceil(res.Jobsite.length / 5))



        map2.current = new mapboxgl.Map({
            container: mapContainer2.current,

            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng2, lat2],
            zoom: zoom2
        });

        const geocoder2 = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
        });

        // Add the geocoder to the map
        map2.current.addControl(geocoder2);

        map2.current.on('style.load', function () {
            res.Jobsite.forEach(element => {
                if (element.latlang) {
                    marker2.current = new mapboxgl.Marker()
                        .setLngLat(JSON.parse(element.latlang))
                        .setPopup(
                            new mapboxgl.Popup({ offset: 0 }) // add popups
                                .setHTML(
                                    `<h3>${element.clientname}</h3><p>${element.sitename}</p>`
                                )
                        )
                        .addTo(map2.current)


                }

            });


            map2.current.resize()
            geocoder2.on('result', function (e) {
                if (marker2.current) marker2.current.remove()
                marker2.current = new mapboxgl.Marker()
                    .setLngLat(e.result.center)
                    .addTo(map2.current)
                setlatlang(JSON.stringify(e.result.center))

                setlatlang(e.result.center)

            });


        });




    })

    return () => {

    }
}, [])

function req() {
    if (actiontype === 'update') {
        var postData={
            clientid: clientid,
            clientname: cname,
            status: 'Active',
            sitename: sname,
            markup: markupcuee,
            user: userdata,
            no: pno,
            task: tasks,
            address: address,
            latlang: latlang,
            _id: currone._id




        }
        updateJobiste(postData).then(res => {
            getAllJobsites().then(res => {
                setsteps(0)
                setcheckinfo(false)
                console.log(res)
                setdata(res.Jobsite)
                setadduser('adduser2')

                setcurrentItems(res.Jobsite.slice(itemOffset, endOffset))
                setpageCount(Math.ceil(res.Jobsite.length / 5))
                setactiontype('edit')
            })

        })
    }
    else {
        var postData={

            clientid: clientid,
            clientname: cname,
            status: 'Active',
            sitename: sname,
            task: tasks,
            markup: markupcuee,
            user: userdata,
            no: pno,
            address: address,
            perdiemamnt: perdiemamnt,
            onperdiemamnt: onperdiemamnt,
            latlang: latlang
        }

        addJobiste(postData).then(res => {
            getAllJobsites().then(res => {
                setsteps(0)
                setcheckinfo(false)
                console.log(res)
                setdata(res.Jobsite)
                setadduser('adduser2')

                setcurrentItems(res.Jobsite.slice(itemOffset, endOffset))
                setpageCount(Math.ceil(res.Jobsite.length / 5))
            })
        })
    }

}

const [lastselected, setlastselected] = useState('XXXXXX')
const [lastcom, setlastcom] = useState('')
const [allhours, setallhours] = useState([])

const [jobn, setjobn] = useState('')
const [nc, setnc] = useState('')
const [taxas, settaxas] = useState('')
const [pr, setpr] = useState('')
const [otpr, setotpr] = useState('')
const [j, setj] = useState(0)
const [k, setk] = useState(1)

const [ind, setind] = useState('')
function sendemail(val){
    const yx=document.getElementById('shareable').innerHTML

    var postData={
        email:val.email,
        html:yx,
        key:uuidv4(),
    }

    sendClientInvoice(postData).then(rees=>{
console.log(rees)
alert(`Email sent to ${val.dept} department`)
setshowlistviewxx(false)
        })

}


const [steps, setsteps] = useState(0)
const [adduser3, setadduser3] = useState('adduser2')
const [tempjson, settempjson] = useState()
const [upind, setupind] = useState(0)


const [l, setl] = useState(2)
const [currone, setcurrone] = useState()
const [clients, setclients] = useState()
useEffect(() => {
    getAllClients().then(res => {
        console.log(res)
        setclients(res.Client)
    })

    return () => {

    }
}, [])
const [clientid, setclientid] = useState('')
function skipthis(element) {

    var y = preparedata
    setpreparedata([])
    y.forEach((elemen, index) => {
        if (index === element) {

        }
        else {
            setpreparedata(pre => [...pre, elemen])
        }


    });
}

const [deleteids, setdeleteids] = useState([])

const [indue, setindue] = useState('')
const [divfile, setdivfile] = useState('')
const [indate, setindate] = useState('')
const [inno, setinno] = useState('')
const [inname, setinname] = useState('')
const [innum, setinnum] = useState('')
const [inadd, setinadd] = useState('')
const [mapx, setmapx] = useState('mapx')
const [cfm, setcfm] = useState(true)

const [currjobid, setcurrjobid] = useState('')

const [selectedweek, setselectedweek] = useState('')
function openfiles(val){
    setselectedweek(val)
    setshowfiles(true)
 
}




const [checkinfo, setcheckinfo] = useState(false)
const [incname, setincname] = useState('')
const componentRef = useRef();


const [compnay, setcompnay] = useState('City Force LLC')
const [adduser2, setadduser2] = useState('adduser2')
const [add, setadd] = useState('1106 W CORNWALLIS RD, STE 105')
const [actiontype, setactiontype] = useState('edit')

const [applyperdiemx, setapplyperdiemx] = useState(true)

const [zpi, setzpi] = useState('Durham NC 27705')
const [mail, setmail] = useState('admin@cfl-solution.com')
const [aduserx, setaduserx] = useState('adduser2')
const [perdiemamnt, setperdiemamnt] = useState(0)
const [perdiemmil, setperdiemmil] = useState(0)

const [onperdiemamnt, setonperdiemamnt] = useState(34)
const [onperdiemmil, setonperdiemmil] = useState(0)

const [perdiemamnt1, setperdiemamnt1] = useState(34)
const [perdiemmil1, setperdiemmil1] = useState(0)

const [onperdiemamnt1, setonperdiemamnt1] = useState(0)
const [onperdiemmil1, setonperdiemmil1] = useState(0)
const [aduserl, setaduserl] = useState('adduser2')


    useEffect(() => {
        getActiveClients().then(res => {
            console.log(res)
            setcompanies(res.Client)
        })

      

        return () => {

        }
    }, [])
    const [selected, setselected] = useState('')
    const [weekends, setweekends] = useState([])
    const [showfiles, setshowfiles] = useState(false)
    const [comp, setcomp] = useState(null)
    const [monthss, setmonthss] = useState(null)
    const getLast12Months = () => {
        const months = [];
        const currentDate = new Date();
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        let currentMonthIndex = currentDate.getMonth();
      
        for (let i = 0; i < 12; i++) {
          months.unshift({ month: currentMonthIndex + 1, name: monthNames[currentMonthIndex] });
          currentMonthIndex = (currentMonthIndex - 1 + 12) % 12;
        }
        return months;
      };
      const [departments, setdepartments] = useState([])
      const [showlistviewxx, setshowlistviewxx] = useState(false)
      function showdepartments(val){
        if(val){
            setshowlistviewxx(val)
            companies&&companies.forEach(element => {
                if(element._id===selected){
                    setdepartments(element.depts)
                }
            });

        }
        else{
            setshowlistviewxx(val)
        }
    }
    function setselectedx(val)
    {
        setcomp(val)
        setshowfiles(false)
        setselected(val._id)
        var ar = [...val.invoicedata]; // Create a shallow copy of the array
        setfiles(ar.reverse()); 
        setdivfile('')
        const distinctWeekNumbers = [...new Set(val.invoicedata.map(obj => obj.weekno))];
setmonthss(getLast12Months().reverse())
setweekends(distinctWeekNumbers)

    }
    const [active, setactive] = useState(1)
  return (

    <>
    
    {active===0?
     
<Invoice onCancel={e=>setactive(1)} props={props} />

:
<>
{aduserl==='adduser'?
txp&&txp.length>0&&<div className={`${aduserl} nobg` }>
<div className="mainpage1" >
  <ReactToPrint

      trigger={() => <button className='exportbtn'>Export To pdf!</button>}
      content={() => componentRef.current}
  />
  <button className='exportbtn2' onClick={e => setaduserl('adduser2')}>Cancel</button>

  <button className='exportbtn3' onClick={e => showlistviewxx?showdepartments(false):showdepartments(true)}>
      Send Email!
      {showlistviewxx&&
    <div className="listview" style={{
    }} onClick={(e) => e.stopPropagation()}>
  
{departments.length>0?
departments.map((val)=>(
  <div className="listviewsub"
    onClick={e => sendemail(val)}
    >
{val.dept}
    </div>
))
:
<div className="listviewsub">
    No department
</div>

}
       
</div>
}
      </button>
      <button className='exportbtn4' onClick={e => savepayroll()}>Send to Payroll</button>
 
  <div className="mainpage" ref={componentRef}>



      <div className="mainpage" id='shareable' >

          <h1 className='invoiceh'>{compnay}<p className='invoicep' >Invoice</p></h1>
          <div className="spanl">
              <h3>
                  Date: <p>{invoiced.date}</p>
              </h3>
              <h3>
                  Invoice #: <p>{invoiced.no}</p>
              </h3>
              <h3>
                  Consumer ID: <p>01238979</p>
              </h3>
              <h3>
                  Due Date: <p>{invoiced.due}</p>
              </h3>

          </div>
          <div className="billto">
              <div className="bill1">
                  <h3>
                      Bill To:
                  </h3>
                  <h2>{incname}</h2>
               
                  {
                            inadd&&inadd.search('\n')>0?
                            <>
                            <h2>{inadd.split('\n')[0]}</h2>
                            <h2>{inadd.split('\n')[1]}</h2>
                            </>
:<>

<h2>
    {inadd}</h2></>

                         }
{!multiple&&<>


<h2>{comp.username}</h2>
                  <h2>
                  {comp.address}
                  </h2></>

}

              </div>
              <div className="bill1">
                 
                  <h2
                  style={{
                    marginTop:10  
                   }}
                  >{add}</h2>
                  <h2>{zpi}</h2>
                  <h2>919-381-0394</h2>
                  <h2>www.cfi-solutions.com</h2>


              </div>
          </div>
          <div className="tavle">
              <div className="tavhead">
                  <h6 style={{ width: '100px' }}>
                      WEEKEND
                  </h6>
                  <h6 style={{ width: '100px' }}>
                      NAME
                  </h6>
                  <h6 style={{ width: '100px' }}>
                      SKILL
                  </h6>

                  {applyperdiemx &&
                      <>
                          <h6 style={{ width: '100px' }}>DAYS</h6>
                          <h6 style={{ width: '100px' }}>P.D</h6>
                      </>
                  }
                  <h6>
                      REG HRS
                  </h6>
                  <h6>REG BILL RTE</h6>
                  <h6>
                      OT HRS
                  </h6>
                  <h6>OT BILL RTE</h6>
                  <h6>TOTAL</h6>




              </div>

              {txp && txp.map((val, index) => (
               val["REG HRS"]>0&&   <>
                      {index % 2 === 0 ?
                          <div key={index} className="tavbody">
                              <h6 style={{ width: '100px' }}>
                                  {val["WEEKEND"]}
                              </h6>
                              <h6 style={{ width: '100px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center' ,textAlign:'center'}}>
                                  {val["NAME"]}
                                  <br/>
                                
                                 {multiple&&
                                  <div className="kge">
                                  {val["site"]}
                                  </div>
                                 }
                              </h6>
                              <h6 style={{ width: '100px'}}>
                                  {val["SKILL"]}
                              </h6>
                              {applyperdiemx &&
                                  <>

                                      <h6 style={{ width: '100px' }}> {val["days"]}</h6>
                                      <h6 style={{ width: '100px' }}>$ {val["P.D"]}</h6>
                                  </>
                              }
                              <h6>
                                  {val["REG HRS"]}
                              </h6>
                              <h6>$ {val["REG RTE"]}</h6>
                              <h6>
                                  {val["OT HRS"]}
                              </h6>
                              <h6>$ {val["OT RTE"]}</h6>

                              <h6 style={{width:100,
                              justifyContent:'flex-end'
                              }} >$ {val["TOTAL"]}</h6>

                          </div> :
                          <div key={index} className="tavbody tavbo">
                              <h6 style={{ width: '100px' }}>
                                  {val["WEEKEND"]}
                              </h6>
                              <h6 style={{ width: '100px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center' ,textAlign:'center'}}>
                                  {val["NAME"]}
                                  <br/>
                                  {multiple&&
                                  <div className="kge">
                                  {val["site"]}
                                  </div>
                                 }
                              </h6>
                              <h6 style={{ width: '100px' }}>
                                  {val["SKILL"]}
                              </h6>

                              {applyperdiemx &&
                                  <>

                                      <h6 style={{ width: '100px' }}> {val["days"]}</h6>
                                      <h6 style={{ width: '100px' }}>$  {val["P.D"]}</h6>
                                  </>
                              }
                              <h6>
                                  {val["REG HRS"]}
                              </h6>
                              <h6>$ {val["REG RTE"]}</h6>
                              <h6>
                                  {val["OT HRS"]}
                              </h6>
                              <h6>$ {val["OT RTE"]}</h6>
                              <h6 style={{width:100
                              ,
                              justifyContent:'flex-end'
                              }} >$ {val["TOTAL"]}</h6>

                          </div>

                      }
                  </>
              ))

              }

              <div className="tavbody tavbodyx">
                  <h6 style={{ width: '100px' }}>

                  </h6>
                  <h6 style={{ width: '100px' }}>

                  </h6>
                  <h6 style={{ width: '100px' }}>

                  </h6>
                  <h6>

                  </h6>
                  <h6></h6>
                  <h6>

                  </h6>
                  <h6>Total</h6>
                  <h6 style={{ width: 'max-content' }}>$ {parseFloat(totalall.toFixed(2))} </h6>

              </div>

              <div className="special">
                  <h1>Special Notes & Instructions</h1>

              </div>


              <h1 className='h1h'>
              Thank you for your business. It is a pleasure to work with you on your project.
              </h1>
          </div>






      </div>

  </div>




</div>
</div>

:
<div className="files">
      
<div className="files1">
    <button onClick={e=>setactive(0)} className='invoicecreate'>+ Create Invoice</button>
<h1>Files</h1>
{companies.map(val=>(
val._id===selected? <div className="rwlis2" onClick={e=>setselectedx(val)}>
<BsFolder className='fate' />   <p>{val.username}</p>
</div>: <div className="rwlis" onClick={e=>setselectedx(val)}>
<BsFolder className='fate' />   <p>{val.username}</p>
</div>
))

}
</div>
{!showfiles?
<div className="files2">
<div className="btn11">

</div>
{
    monthss&&monthss.map(valx=>(
        <>
       {weekends.some(val => val && valx.month === Number(val.split('/')[0]))&&
       <h1 className='cvs' style={{
width:'100%'            
        }} >{valx.name}</h1>
       } 
        {weekends&&weekends.map(val=>(
val&&valx.month===Number(val.split('/')[0])&&<div className='divfile' onClick={e=>openfiles(val)}>

<img src={g2} alt="" />
<h1>Weekend - {val}</h1>
</div>
))

}
        </>
    ))
}

</div>
:
<div className="files2">
<div className="btn11">
{divfile.length>0&&
<button className='btn1' onClick={e=>exports2()}>Open</button>}
</div>
{files&&files.map((val,index)=>(
val.weekno===selectedweek&&
<>{
val._id===divfile? <div className='divfilenew divfilenewx ' onClick={e=>importthis(val)}>

<div className="subfilenew">

<img src={g2} alt="" />
<h1>{val.weekno}  </h1>
</div>
<span>
Updated by: {val.by&&val.by} on {val.created&&val.created}  {val.createdtime&&val.createdtime} 
</span>
</div>: <div className='divfilenew' onClick={e=>importthis(val)}>

<div className="subfilenew">

<img src={g2} alt="" />
<h1>{val.weekno} </h1>
</div>
<span>
Updated by: {val.by&&val.by} on {val.created&&val.created}  {val.createdtime&&val.createdtime} 
</span>
</div>
}   </>
))

}
</div>}
</div>
}
</>
}
    </>

   
   
  )

}

export default Files

