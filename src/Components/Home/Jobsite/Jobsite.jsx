import React, { useState } from 'react'
import { GiEnergyArrow } from 'react-icons/gi'
import { RiLightbulbFlashLine, RiTimerFlashFill } from 'react-icons/ri'
import { BiTime } from 'react-icons/bi'
import { MdDelete, MdSnooze } from 'react-icons/md'
import { AiOutlineReload } from 'react-icons/ai'
import {GrFormAdd} from 'react-icons/gr'
import axios from 'axios'
import { useEffect } from 'react'
import { VscChromeClose } from 'react-icons/vsc'
import { HiArrowLeft } from 'react-icons/hi'

import prof from '../../../images/prof.png'
import { BsClockFill } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'
import { FaFileImage } from 'react-icons/fa'
import Slider from '@mui/material/Slider';


import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import * as turf from '@turf/turf';


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
import Tasks from './Tasks'
const Jobsite = () => {

    const mapContainer = useRef(null);
    mapboxgl.accessToken = 'pk.eyJ1IjoidXNhbWE3ODZhIiwiYSI6ImNsZXZwbDV5ZTF0M3Ezc3Axdmhmb2Z3bmwifQ.b3u24ezWs8--UJphBNY1rA'



    function importthis(val) {
        setpreparedata([])
        if (val.pdapplied === 'true') {
            setapplyperdiemx(true)
        } else {
            setapplyperdiemx(false)
        }
        val.invoicedetails.forEach(element => {
            setpreparedata(pr => [...pr, {
                Taxes: element.taxes,
                Client: incname,
                Date: '1-1-2023',
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
                onperdiem: Number(element.onperdiem)




            }])
        })
        setadduserd('adduser2')
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
    var createGeoJSONCircle = function(center, radiusInKm, points) {
        console.log(center)
        if(!points) points = 64;
    
        var coords = {
            latitude: center[1],
            longitude: center[0]
        };
    
        var km = radiusInKm;
    
        var ret = [];
        var distanceX = km/(111.320*Math.cos(coords.latitude*Math.PI/180));
        var distanceY = km/110.574;
    
        var theta, x, y;
        for(var i=0; i<points; i++) {
            theta = (i/points)*(2*Math.PI);
            x = distanceX*Math.cos(theta);
            y = distanceY*Math.sin(theta);
    
            ret.push([coords.longitude+x, coords.latitude+y]);
        }
        ret.push(ret[0]);
    
        return {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": [{
                    "type": "Feature",
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [ret]
                    }
                }]
            }
        };
    };
    const mapContainer3 = useRef(null);
    const map3 = useRef(null);
const [radius, setradius] = useState(0)
function setradiuss(val){
setradius(val)
    map.current.getSource("polygon").setData(createGeoJSONCircle([chklatlang.lng, chklatlang.lat], val/1000).data) 

   
}
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
                map.current.addSource("polygon", createGeoJSONCircle([e.result.center[0], e.result.center[1] ], 0.5));

                map.current.addLayer({
                    "id": "polygon",
                    "type": "fill",
                    "source": "polygon",
                    "layout": {},
                    "paint": {
                        "fill-color": "blue",
                        "fill-opacity": 0.3
                    }
                });
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
    function exportPdf() {

        html2canvas(document.getElementById("tablerow")).then(canvas => {
            document.body.appendChild(canvas);  // if you want see your screenshot in body.
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save("download.pdf");
        });

    }

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
                    axios.post(`${tz}/client/update`, {

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




                    }).then(res => {
                        console.log(res)
                        alert('Saved')



                    })
                }
                else {
                    axios.post(`${tz}/client/update`, {


                        _id: currid,
                        reporttype: 'report',
                        perdiemapplied: applyperdiemx,
                        weekno: currentWeekNumber,
                        year: currentYear,
                        filename: inname + '-' + incname + '-' + new Date().toLocaleDateString('en-US'),







                        data: ts




                    }).then(res => {
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

                        axios.post(`${tz}/client/findbyid`, {
                            Client_id: val.clientid
                        }).then(res => {
                            setinadd(res.data.Client[0].address)
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
                        axios.post(`${tz}/client/findbyid`, {
                            Client_id: val.clientid
                        }).then(res => {
                            setinadd(res.data.Client[0].address)
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
    function exports2() {

        setaduserl('adduser')
        var tx = []
        var alltotal = 0
        settxp([])
        preparedata.forEach((val, index) => {


            var tr = parseFloat(val.Payrate)

            var to = parseFloat(val.OT_Pay_rate)

            alltotal = alltotal + parseFloat(tr * val.Hrs + to * val.Ot_Hrs + Number(val.perdiem))
            settotalall(alltotal)
            tx.push({
                ["NAME"]: val.Employee,
                ["REG HRS"]: val.Hrs,
                ["WEEKEND"]: val.Date,
                ["REG RTE"]: Number(tr).toFixed(2).toLocaleString('en'),
                ["OT HRS"]: val.Ot_Hrs,
                ["OT RTE"]: Number(to).toFixed(2).toLocaleString('en'),
                ["TOTAL"]: Number(tr * val.Hrs + to * val.Ot_Hrs + Number(val.perdiem)).toFixed(2).toLocaleString('en'),
                ["SKILL"]: val.skill,
                ["P.D"]: Number(val.perdiem) * val.days + Number(val.onperdiem) * val.days,

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
    const [weekend, setweekend] = useState('')
    function allemps(val) {
        var t = val.split('eiuka')
        setuserdata([])
        setcname(t[0])
        setclientid(t[2])
        setclientadd(t[3])
        console.log(t[2])
        setweekend(t[4])
        setmarkupcuee(parseFloat(t[1]))
        empdata.forEach((element, index) => {
            if (t[0] === element.client) {


                setuserdata(userdata => [...userdata, {
                    name: element.name,
                    skill: element.skill,
                    payrate: element.payrate,
                    otpayrate: element.otpayrate,
                    nc: element.nc,
                    cpr:element.cpr,
                    payratetype:'normal',
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

    useEffect(() => {
      axios.post(`${tz}/siteuser/travel`,{
        coords:  [
            [-122.483696, 37.833818],
            [-122.483482, 37.833174],
            [-122.483396, 37.8327],
            [-122.483568, 37.832056],
            [-122.48404, 37.831141],
            [-122.48404, 37.830497],
            [-122.483482, 37.82992],
            [-122.483568, 37.829548],
            [-122.48507, 37.829446],
            [-122.4861, 37.828802],
            [-122.486958, 37.82931],
            [-122.487001, 37.830802],
            [-122.487516, 37.831683],
            [-122.488031, 37.832158],
            [-122.488889, 37.832971],
            [-122.489876, 37.832632],
            [-122.490434, 37.832937],
            [-122.49125, 37.832429],
            [-122.491636, 37.832564],
            [-122.492237, 37.833378],
            [-122.493782, 37.833683]
            ]
      }).then(res=>{
        console.log(res)
      })
    
      return () => {
        
      }
    }, [])
    
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


    useEffect(() => {
        axios.get(`${tz}/siteuser/active`).then(res => {
            console.log(res)
            setempdata(res.data.Siteuserd)
        })

        axios.get(`${tz}/jobsite/getall`).then(res => {
            console.log(res)
            setdata(res.data.Jobsite)

            setcurrentItems(res.data.Jobsite.slice(itemOffset, endOffset))
            setpageCount(Math.ceil(res.data.Jobsite.length / 5))



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
                map2.current.addSource('route', {
                    'type': 'geojson',
                    'data': {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                    'type': 'LineString',
                    'coordinates': [
                    [-122.483696, 37.833818],
                    [-122.483482, 37.833174],
                    [-122.483396, 37.8327],
                    [-122.483568, 37.832056],
                    [-122.48404, 37.831141],
                    [-122.48404, 37.830497],
                    [-122.483482, 37.82992],
                    [-122.483568, 37.829548],
                    [-122.48507, 37.829446],
                    [-122.4861, 37.828802],
                    [-122.486958, 37.82931],
                    [-122.487001, 37.830802],
                    [-122.487516, 37.831683],
                    [-122.488031, 37.832158],
                    [-122.488889, 37.832971],
                    [-122.489876, 37.832632],
                    [-122.490434, 37.832937],
                    [-122.49125, 37.832429],
                    [-122.491636, 37.832564],
                    [-122.492237, 37.833378],
                    [-122.493782, 37.833683]
                    ]
                    }
                    }
                    });
                    map2.current.addLayer({
                    'id': 'route',
                    'type': 'line',
                    'source': 'route',
                    'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                    },
                    'paint': {
                    'line-color': 'green',
                    'line-width': 8
                    }
                    });



                res.data.Jobsite.forEach(element => {
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

 // Get the source data
  const sourceData = map2.current.getSource('route')._data;
  console.log(sourceData)

  // Calculate the total distance along the LineString
  const line = turf.lineString(sourceData.geometry.coordinates);
  const lineDistance = turf.lineDistance(line, { units: 'kilometers' });

  console.log(`Total distance along the line: ${lineDistance} kilometers`);
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
            axios.post(`${tz}/jobsite/updatesite`, {
                clientid: clientid,
                clientname: cname,
                status: 'Active',
                sitename: sname,
                markup: markupcuee,
                user: userdata2,
                no: pno,
                task: tasks,
                radius:radius,
                address: address,
                weekend: weekend,
                latlang: JSON.stringify(chklatlang),
                _id: currone._id




            }).then(res => {
                axios.get(`${tz}/jobsite/getall`).then(res => {
                    setsteps(0)
                    setcheckinfo(false)
                    console.log(res)
                    setdata(res.data.Jobsite)
                    setadduser('adduser2')

                    setcurrentItems(res.data.Jobsite.slice(itemOffset, endOffset))
                    setpageCount(Math.ceil(res.data.Jobsite.length / 5))
                    setactiontype('edit')
                    setuserdata2([])
                    setuserdata([])
                })

            })
        }
        else {

            axios.post(`${tz}/jobsite/add`, {

                clientid: clientid,
                clientname: cname,
                status: 'Active',
                sitename: sname,
                task: tasks,
                markup: markupcuee,
                weekend:weekend,
                user: userdata2,
                no: pno,
                radius:radius,
                address: address,
                perdiemamnt: perdiemamnt,
                onperdiemamnt: onperdiemamnt,
                latlang: latlang,
                
                
            }).then(res => {
                axios.get(`${tz}/jobsite/getall`).then(res => {
                    setsteps(0)
                    setcheckinfo(false)
                    console.log(res)
                    setdata(res.data.Jobsite)
                    setadduser('adduser2')

                    setcurrentItems(res.data.Jobsite.slice(itemOffset, endOffset))
                    setpageCount(Math.ceil(res.data.Jobsite.length / 5))
                    setuserdata2([])
                    setuserdata([])
                })
            })
        }

    }

    function turnon() {
        if (is === 0) {
            settaxas('yes')

            setcircle('circle2')
            settaxes('taxes2')
            setis(1)
        }
        else {

            settaxas('no')

            setcircle('circle')
            settaxes('taxes')
            setis(0)
        }

    }
    function turnon2() {
        if (is2 === 0) {
            setnc('4')

            setcircle2('circle2')
            settaxes2('taxes2')
            setis2(1)
        }
        else {

            setcircle2('circle')
            settaxes2('taxes')
            setis2(0)

            setnc('no')
        }

    }
    const [lastselected, setlastselected] = useState('XXXXXX')
    const [lastcom, setlastcom] = useState('')
    const [allhours, setallhours] = useState([])
    
    function backtop() {
        setk(0)
        setlastselected(ind)
        setlast2(lastcom)
        setallhours(prevData => [...prevData.map(existingObj => preparedata.find(newObj => newObj.siteid === existingObj.siteid&&newObj.userid === existingObj.userid) || existingObj), ...preparedata.filter(newObj => !prevData.find(existingObj => newObj.siteid === existingObj.siteid&&newObj.userid === existingObj.userid))]);
console.log(allhours)

    }

    const [jobn, setjobn] = useState('')
    const [nc, setnc] = useState('')
    const [taxas, settaxas] = useState('')
    const [pr, setpr] = useState('')
    const [otpr, setotpr] = useState('')
    const [j, setj] = useState(0)
    const [k, setk] = useState(0)

    const [ind, setind] = useState('')
    function addindex(index,val) {
        setlastcom(val.clientid)
        if (ind.search(val._id) >= 0) {

            console.log(ind)
            setind(ind.replace(val._id + '4sd', '')) 
        }
        else {

            setind(ind + val._id + '4sd')
            console.log(ind)
        }


    }

    const [steps, setsteps] = useState(0)
    const [adduser3, setadduser3] = useState('adduser2')
    const [tempjson, settempjson] = useState()
    const [upind, setupind] = useState(0)
    function showadd(index) {
        setupind(index)
        setadduser3('adduser')
        console.log(preparedata[index])
        settempjson(preparedata[index])


    }

    function updatedata() {
        var p = preparedata
        p[upind] = tempjson
        p[upind].total = (p[upind].Payrate * p[upind].Hrs) + (p[upind].Ot_Hrs * p[upind].OT_Pay_rate)


        if (tempjson.nc_4 !== '-') {

            p[upind].nc_4 = ((p[upind].Payrate * p[upind].Hrs) + (p[upind].Ot_Hrs * p[upind].OT_Pay_rate)) * 4 / 100

        }

        p[upind].net = p[upind].total - (tempjson.nc_4 !== '-' ? p[upind].nc_4 : 0) - p[upind].deductions + (applyperdiemx ? Number(p[upind].perdiem * p[upind].days) : 0) + (applyperdiemx ? Number(p[upind].onperdiem * p[upind].days) : 0)

        setpreparedata(p)
        setadduser3('adduser2')

    }
    const [l, setl] = useState(0)
    const [currone, setcurrone] = useState()
    const [mx, setmx] = useState(0)
    const [currproject, setcurrproject] = useState()
    function setms(val) {
        setcurrproject(val)
        if (mx === 0) {
            setmx(1)
        } else {
            setmx(0)
        }

    }
    function setnameq(val) {
        empdata.forEach(element => {
            if (element._id === val) {

                setname(element.name)
                setskill(element.skill)
                setpayrate(element.payrate)
                setotpayrate(element.otpayrate)
                setnc(val.nc)
                settaxas(val.taxes)

            }

        });



    }
    const [clients, setclients] = useState()
    useEffect(() => {
        axios.get(`${tz}/client/getall`).then(res => {
            console.log(res)
            setclients(res.data.Client)
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
    const [userdata2, setuserdata2] = useState([])

    function skipthis2(element) {

        var y = userdata
        setuserdata([])
        y.forEach((elemen, index) => {
            if (index === element) {
                setuserdata2(pre => [...pre, elemen])

            }
            else {
                setuserdata(pre => [...pre, elemen])
            }


        });
    }
    function skipthis3(element) {

        var y = userdata2
        setuserdata2([])
        y.forEach((elemen, index) => {
            if (index === element) {
               
                setuserdata(pre => [...pre, elemen])
            }
            else {
                setuserdata2(pre => [...pre, elemen])
           
            }


        });
    }
    const [deleteids, setdeleteids] = useState([])
    function setadduserx() {
        setadduser('adduser2')
        setsteps(0)
        setcheckinfo(false)
        setactiontype('edit')
    }
    function deletedata() {

        console.log(ind)
    
        var r = ind.split('4sd')
        r[r.length - 1] = r[r.length - 2]
        console.log(r)
        data.forEach((element, index) => {
            if (index === data.length - 1) {

            
                axios.post(`${tz}/jobsite/delete`, {
                    ids: r   
                             }).then(res => {
                    console.log(res)
                    setdeleteids([])
                    axios.get(`${tz}/jobsite/getall`).then(res2 => {
                        console.log(res2)
                        setdata(res2.data.Jobsite)
                        setind('')

                        setcurrentItems(res2.data.Jobsite.slice(itemOffset, endOffset))
                        setpageCount(Math.ceil(res2.data.Jobsite.length / 5))
                    })
                })
            } else {

                if (ind.search(' ' + index.toString() + ' ') >= 0) {
                    setdeleteids(del => [...del, element._id])
                    r.push(element._id)



                }
            }

        });


    }
    const [nameskill, setnameskill] = useState([])
    const [indue, setindue] = useState('')
    function postclient() {
        var tx = []

        txp.forEach((val, index) => {
            tx.push({
                empname: val["NAME"],
                hrs: val["REG HRS"],
                date: val["WEEKEND"],
                payrate: val["REG RTE"],
                othrs: val["OT HRS"],
                otpayrate: val["OT RTE"],
                total: val["TOTAL"],
                skill: val["SKILL"],









            })
            if (preparedata.length - 1 === index) {
                axios.post(`${tz}/client/update`, {
                    _id: currid,
                    date: indate,
                    no: inno,
                    due: indue,
                    total: Number(totalall).toFixed(2).toLocaleString('en'),
                    paid: 0,
                    balance: Number(totalall).toFixed(2).toLocaleString('en'),
                    status: 'pending',




                    data: tx




                }).then(res => {
                    console.log(res)
                    alert('Updated')
                    setsteps(0)
                    setcheckinfo(false)
                    {/*     axios.post(`${tz}/noti/add`, {
                    message:`Company Sent an invoice of ${totalall}`,
                    idp:project.clientid,
                    time:dateput[1],
                    status:'att',
                }).then(resp => {
                    console.log(resp)
              
                    
    
    
                })
            */}


                })
            }


        });

    }
    const [indate, setindate] = useState('')
    const [inno, setinno] = useState('')
    const [inname, setinname] = useState('')
    const [innum, setinnum] = useState('')
    const [inadd, setinadd] = useState('')
    const [mapx, setmapx] = useState('mapx')
    const [cfm, setcfm] = useState(true)
    function updateaccount() {
        console.log(preparedata)
        axios.post(`${tz}/siteuser/updatebulk`, {
            preparedata: preparedata



        }).then(res => {
            console.log(res)
            alert('Updated')
            setsteps(0)
            setcheckinfo(false)
            {/*     axios.post(`${tz}/noti/add`, {
             message:`Company Sent an invoice of ${totalall}`,
             idp:project.clientid,
             time:dateput[1],
             status:'att',
         }).then(resp => {
             console.log(resp)
       
             


         })
     */}


        })
    }
    function setaduserl2() {
        setaduserl('adduser2')
        alert('Email sent!')
    }
    function turn(val, index) {
        if (val === 'No') {
            setuserdata(Object.values({ ...userdata, [index]: { ...userdata[index], perdiem: 'Yes' } }))
        }

        else {

            setuserdata(Object.values({ ...userdata, [index]: { ...userdata[index], perdiem: 'No' } }))
        }
    }

    function turn2(val, index) {
        if (val === 'No') {
            setuserdata(Object.values({ ...userdata, [index]: { ...userdata[index], onperdiem: 'Yes' } }))
        }

        else {

            setuserdata(Object.values({ ...userdata, [index]: { ...userdata[index], onperdiem: 'No' } }))
        }
    }

    function turn3(val, index) {
        if (val === 'No') {
            setuserdata(Object.values({ ...userdata, [index]: { ...userdata[index], food: 'Yes' } }))
        }

        else {

            setuserdata(Object.values({ ...userdata, [index]: { ...userdata[index], food: 'No' } }))
        }
    }
    const [checkinfo, setcheckinfo] = useState(false)
    const [incname, setincname] = useState('')
    const componentRef = useRef();


    function setstex() {

        if (steps === 0) {
            if (!sname || !pno || !cname) {
                setcheckinfo(true)

            } else {

                setcheckinfo(false)

                setsteps(steps => steps + 1)
            }
        }
        else if (steps === 1) {
            if (!chklatlang) {
                setcheckinfo(true)

            } else {

                setcheckinfo(false)

                setsteps(steps => steps + 1)
            }
        }

        else if (steps === 2) {
            if (tasks.length === 0) {
                alert('Add at least 1 task')

            } else {


                setsteps(steps => steps + 1)
            }
        }
        else if (steps === 3) {


            setsteps(steps => steps + 1)
            var t = userdata

            setuserdata([])
            const fetchData = async () => {
                const updatedObjects = await Promise.all(
                    t.map(async (obj) => {
                        console.log(obj)
                        const res = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${JSON.parse(obj.latlang).lng},${JSON.parse(obj.latlang).lat};${chklatlang.lng},${chklatlang.lat}?access_token=pk.eyJ1IjoiYXlhYW56YXZlcmkiLCJhIjoiY2ttZHVwazJvMm95YzJvcXM3ZTdta21rZSJ9.WMpQsXd5ur2gP8kFjpBo8g`);
                      console.log(res)
                      console.log(obj.latlang)
                      if(res.data.code==='Ok'){
                        var di = ((res.data.routes[0].distance / 1000) * 0.62) 
                    
                        if (di >= perdiemmil && di >= onperdiemmil) {
                            const updatedObj = { ...obj, distance: di, onperdiem: 'Yes', perdiem: 'Yes', };
                            return updatedObj

                        }
                        else if (di >= perdiemmil && di < onperdiemmil) {
                            const updatedObj = { ...obj, distance: di, onperdiem: 'No', perdiem: 'Yes' };
                            return updatedObj

                        }
                        else if (di < perdiemmil && di >= onperdiemmil) {
                            const updatedObj = { ...obj, distance: di, onperdiem: 'Yes', perdiem: 'No' };
                            return updatedObj

                        }
                        else {
                            const updatedObj = { ...obj, distance: di, onperdiem: 'No', perdiem: 'No' };
                            return updatedObj

                        }
                      }
                      else{
                        const updatedObj = { ...obj, distance: 0, onperdiem: 'No', perdiem: 'No' };
                        return updatedObj 
                      }
                    })
                )
                console.log(updatedObjects)
                setuserdata(updatedObjects)


            };
            fetchData()



        }
        else if(steps===4){

            setsteps(steps => steps + 1)
        }
    }
    const [compnay, setcompnay] = useState('City Force LLC')
    const [adduser2, setadduser2] = useState('adduser2')
    const [add, setadd] = useState('1106 W CORNWALLIS RD, STE 105')
    const [actiontype, setactiontype] = useState('edit')
    const [cname2, setcname2] = useState({})
    function updateuser() {
        setactiontype('update')
        setadduser('adduser fixedarea')
        setclientid(currone.clientid)
        setcname(currone.clientname)
        setsname(currone.sitename)

        const clientWithIdOne = clients.find(client => client._id === currone.clientid)
setcname2(clientWithIdOne)
        settasks(currone.task)
        setmarkupcuee(currone.markup)
        setweekend(currone.weekend)

        setuserdata2(currone.user)
        setpno(currone.no)
        setaddress(currone.address)
        setchklatlang(JSON.parse(currone.latlang))
        allemps(clientWithIdOne.username + 'eiuka' + clientWithIdOne.markup + 'eiuka' + clientWithIdOne._id + 'eiuka' + clientWithIdOne.address+ 'eiuka' + clientWithIdOne.weekend)
      


    }
    const [applyperdiemx, setapplyperdiemx] = useState(false)
    function applyperdiem() {
        const updatedArray = preparedata.map((obj, index) => {
            if (index === preparedata.length - 1) {

                setapplyperdiemx(true)
            }
            if (obj.perdiemel === 'Yes' && obj.onperdiemel === 'Yes') {
                var updobj = {
                    ...obj,
                    perdiem: perdiemamnt1,
                    onperdiem: onperdiemamnt1,
                }
                updobj.total = Number(updobj.total) + Number(perdiemamnt1) * updobj.days + Number(onperdiemamnt1) * updobj.days
                updobj.net = Number(updobj.net) + Number(perdiemamnt1) * updobj.days + Number(onperdiemamnt1) * updobj.days
                return updobj
            }
            else if (obj.perdiemel === 'Yes' && obj.onperdiemel === 'No') {

                var updobj = {
                    ...obj,
                    perdiem: perdiemamnt1,
                    onperdiem: 0,
                }
                updobj.total = Number(updobj.total) + Number(perdiemamnt1) * updobj.days + 0
                updobj.net = Number(updobj.net) + Number(perdiemamnt1) * updobj.days + 0
                return updobj
            }
            else if (obj.perdiemel === 'No' && obj.onperdiemel === 'Yes') {

                var updobj = {
                    ...obj,
                    perdiem: 0,
                    onperdiem: onperdiemamnt1,
                }
                updobj.total = Number(updobj.total) + Number(onperdiemamnt1) * updobj.days + 0
                updobj.net = Number(updobj.net) + Number(onperdiemamnt1) * updobj.days + 0
                return updobj
            }
            else {
                var updobj = {
                    ...obj,
                    perdiem: 0,
                    onperdiem: 0,
                }
                updobj.total = Number(updobj.total) + 0 + 0
                updobj.net = Number(updobj.net) + 0 + 0
                return updobj
            }
        });

        setpreparedata(updatedArray);
        console.log(updatedArray)
        console.log(perdiemamnt1)
        console.log(onperdiemamnt1)

        setadduser2('adduser2')
        console.log(preparedata)




    }
    const [zpi, setzpi] = useState('Durham NC 27705')
    const [mail, setmail] = useState('admin@cfl-solution.com')
    const [aduserx, setaduserx] = useState('adduser2')
    const [perdiemamnt, setperdiemamnt] = useState(0)
    const [perdiemmil, setperdiemmil] = useState(0)
const [usersearch, setusersearch] = useState('')
    const [onperdiemamnt, setonperdiemamnt] = useState(0)
    const [onperdiemmil, setonperdiemmil] = useState(0)

    const [perdiemamnt1, setperdiemamnt1] = useState(0)
    const [perdiemmil1, setperdiemmil1] = useState(0)

    const [onperdiemamnt1, setonperdiemamnt1] = useState(0)
    const [onperdiemmil1, setonperdiemmil1] = useState(0)
    const [aduserl, setaduserl] = useState('adduser2')
    function opm() {
        setaduserx('adduser')
    }
    const [searval, setsearval] = useState('')
    const [adduserd2, setadduserd2] = useState('adduser2')
    function addcom(element){
     
        var usdata = currone.user;

        usdata = [...usdata, {
          name: element.name,
          skill: element.skill,
          payrate: element.payrate,
          otpayrate: element.otpayrate,
          nc: element.nc,
          cpr: element.cpr,
          payratetype: 'normal',
          empno: element.idno,
          taxes: element.taxes,
          userid: element._id,
          latlang: element.langlat,
          distance: 0,
          perdiem: 'No',
          onperdiem: 'No',
          food: 'No',
        }];
        

        axios.post(`${tz}/jobsite/adduser`, {
         
            user: usdata,
           
            _id: currone._id




        }).then(res => {
          console.log(res)
          setadduserd2('adduser2')
          axios.get(`${tz}/jobsite/getall`).then(res => {
           
            setdata(res.data.Jobsite)
            setadduser('adduser2')
setcurrone(null)
            setcurrentItems(res.data.Jobsite.slice(itemOffset, endOffset))
            setpageCount(Math.ceil(res.data.Jobsite.length / 5))
            setactiontype('edit')
        })
        })
    }

    const [taskshow, settaskshow] = useState(false)
    function gototasks(){
        settaskshow(true)
    }
    return (

   <>
   
   
   {taskshow?
   <Tasks/>
:
<>
<div className={adduserd2}>
           <div className="longsub">
               <input type="Search" placeholder='Search..' className='inkl' onChange={e=>setsearval(e.target.value)} />
               <IoClose className='posif' onClick={e => setadduserd2('adduser2')} />
   
               {
                   searval? empdata && empdata.map(val2 => (
                  
                      val2.name.toLowerCase().search(searval.toLowerCase())>=0&&<>
                               <div className="rowval">
                                  <div className="imgh">
                                   {!val2.imgurl?
                                   <img src={prof} alt="" />:
                                   <img src={val2.imgurl} alt="" />

                                   }
                                  </div>
                                   <div className="midone">
                                       <h1>{val2.name}</h1>
                                       <p>{val2.skill}</p>
                                   </div>
                                   <button onClick={e=>addcom(val2)} >Add</button>
                               </div>
                               <div className="linn"></div>
                           </>
                 
                   )):empdata && empdata.map(val2 => (
              
                       <>
                           <div className="rowval">
                              <div className="imgh">
                               {!val2.imgurl?
                               <img src={prof} alt="" />:
                               <img src={val2.imgurl} alt="" />

                               }
                              </div>
                               <div className="midone">
                                   <h1>{val2.name}</h1>
                                   <p>{val2.skill}</p>
                               </div>
                               <button onClick={e=>addcom(val2)}  >Add</button>
                           </div>
                           <div className="linn"></div>
                       </>
             
               ))
               
             
}
           </div>
       </div>
       <div className={aduserl}>
           <div className="mainpage1" >
               <ReactToPrint

                   trigger={() => <button className='ss33'>Export To pdf!</button>}
                   content={() => componentRef.current}
               />
               <button className='ss333' onClick={e => setaduserl('adduser2')}>Cancel</button>

               <button className='ss3333' onClick={e => setaduserl2('adduser2')}>Send Email!</button>
               <div className="mainpage" ref={componentRef}>



                   <div className="mainpage" >

                       <h1 className='invoiceh'>{compnay}<p className='invoicep' >Invoice</p></h1>
                       <div className="spanl">
                           <h3>
                               Date: <p>{indate}</p>
                           </h3>
                           <h3>
                               Invoice #: <p>{inno}</p>
                           </h3>
                           <h3>
                               Consumer ID: <p>01238979</p>
                           </h3>
                           <h3>
                               Due Date: <p>{indue}</p>
                           </h3>

                       </div>
                       <div className="billto">
                           <div className="bill1">
                               <h3>
                                   Bill To:
                               </h3>
                               <h2>{incname}</h2>
                               <h2>{inadd}</h2>

                               <h2>Project # {innum}</h2>
                               <h2>
                                   Project Name: {inname}
                               </h2>

                           </div>
                           <div className="bill1">
                               <h3>
                                   Company:
                               </h3>
                               <h2>{add}</h2>
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
                               <>
                                   {index % 2 === 0 ?
                                       <div className="tavbody">
                                           <h6 style={{ width: '100px' }}>
                                               {val["WEEKEND"]}
                                           </h6>
                                           <h6 style={{ width: '100px' }}>
                                               {val["NAME"]}
                                           </h6>
                                           <h6 style={{ width: '100px' }}>
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
                                           <h6> {val["REG RTE"]}</h6>
                                           <h6>
                                               {val["OT HRS"]}
                                           </h6>
                                           <h6> {val["OT RTE"]}</h6>

                                           <h6> {val["TOTAL"]}</h6>

                                       </div> :
                                       <div className="tavbody tavbo">
                                           <h6 style={{ width: '100px' }}>
                                               {val["WEEKEND"]}
                                           </h6>
                                           <h6 style={{ width: '100px' }}>
                                               {val["NAME"]}
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
                                           <h6> {val["REG RTE"]}</h6>
                                           <h6>
                                               {val["OT HRS"]}
                                           </h6>
                                           <h6> {val["OT RTE"]}</h6>
                                           <h6> {val["TOTAL"]}</h6>

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
                               <h6 style={{ width: 'max-content' }}>{parseFloat(totalall.toFixed(2))} $</h6>

                           </div>

                           <div className="special">
                               <h1>Special Notes & Instruction</h1>

                           </div>


                           <h1 className='h1h'>
                               Thanks for your business. Its a pleasure to work with you on your project.
                           </h1>
                       </div>






                   </div>

               </div>




           </div>
       </div>
       <div className={aduserx}>
           <div className="subadduser subadduserx2">

               <>
                   <div className="inputname">
                       <h1>Company name</h1>
                       <input type="text" onChange={e => setcompnay(e.target.value)} value={compnay} />
                   </div>

                   <div className="inputname">
                       <h1>Address</h1>
                       <input type="text"
                           onChange={e => setadd(e.target.value)} value={add} />
                   </div>

                   <div className="inputname">
                       <h1>Zip code</h1>
                       <input type="text" onChange={e => setzpi(e.target.value)} value={zpi} />
                   </div>

                   <div className="inputname">
                       <h1>Mail:</h1>
                       <input type="text" onChange={e => setmail(e.target.value)} value={mail} />

                   </div>
                   <div className="inputname">

                   </div>
                   <button onClick={e => setaduserx('adduser2')} className='btn1'>Update</button>
                   <button onClick={e => setaduserx('adduser2')} className='btn2'>Cancel</button>



               </>




           </div>




       </div>
       <div className={adduserd}>
           <div className="longsub">
               <IoClose className='posif' onClick={e => setadduserd('adduser2')} />
               {
                   clients && clients.map(val2 => (
                       val2._id === currid &&
                       val2.invoicedata.map(val => (
                           <>
                               <div className="rowval">
                                   <FaFileImage className='fami' />
                                   <div className="midone">
                                       <h1>{val.filename}</h1>
                                       <p>{val.reporttype}</p>
                                   </div>
                                   <button onClick={e => importthis(val)} >Import</button>
                               </div>
                               <div className="linn"></div>
                           </>
                       ))
                   ))
               }

           </div>
       </div>

       {tempjson &&

           <div className={adduser3}>

               <div className="subadduser ">

                   <>
                       <div className="inputname">
                           <h1>Name</h1>
                           <input value={tempjson.Employee} onChange={e => settempjson(tempjson => ({
                               ...tempjson,


                               Employee: e.target.value

                           }))} type="text" />




                       </div>

                       <div className="inputname">
                           <h1>Working Hrs</h1>
                           <input value={tempjson.Hrs} type="text"
                               onChange={e => settempjson(tempjson => ({
                                   ...tempjson,


                                   Hrs: e.target.value

                               }))}
                           />

                       </div>
                       <div className="inputname">
                           <h1>Pay rate (per/hr)</h1>
                           <input value={tempjson.Payrate} type="text"
                               onChange={e => settempjson(tempjson => ({
                                   ...tempjson,


                                   Payrate: e.target.value

                               }))}
                           />

                       </div>
                       <div className="inputname">
                           <h1>OT Hrs</h1>
                           <input value={tempjson.Ot_Hrs} type="text"
                               onChange={e => settempjson(tempjson => ({
                                   ...tempjson,


                                   Ot_Hrs: e.target.value

                               }))}
                           />

                       </div>
                       <div className="inputname">
                           <h1>OT Pay rate (per/hr)</h1>
                           <input value={tempjson.OT_Pay_rate} type="text" onChange={e => settempjson(tempjson => ({
                               ...tempjson,


                               OT_Pay_rate: e.target.value

                           }))} />

                       </div>
                       <div className="inputname">
                           <h1>Deduction</h1>
                           <input value={tempjson.deductions} type="text" onChange={e => settempjson(tempjson => ({
                               ...tempjson,


                               deductions: e.target.value

                           }))} />

                       </div>
                       <div className="inputname">
                           <h1>Days</h1>
                           <input value={tempjson.days} type="text" onChange={e => settempjson(tempjson => ({
                               ...tempjson,


                               days: e.target.value

                           }))} />

                       </div>
                       <div className="inputname"></div>
                       <div className="inputname">
                           <h1>Taxes:  </h1>
                           <div className={taxes} onClick={e => turnon()}>
                               <div className={circle}>

                               </div>
                           </div>

                       </div>
                       <div className="inputname">
                           <h1>NC (4%):  </h1>
                           <div className={taxes2} onClick={e => turnon2()}>
                               <div className={circle2}>

                               </div>
                           </div>

                       </div>

                       <button onClick={e => updatedata()} className='btn1'>Update</button>
                       <button style={{ marginBottom: '30px' }} onClick={e => setadduser3('adduser2')} className='btn2'>Cancel</button>

                   </>




               </div>




           </div>

       }

       <div className={adduser2}>


           <div className="subadduser hadduser ">

               <IoClose className='iov' onClick={e => setadduser2('adduser2')} />
               <>


                   <>
                       <h6>Perdiem & Other Expenses</h6>
                       <div className="inpex inpexs">
                           <h1>Perdiem ($)</h1>
                           <input type="number" onChange={e => setperdiemamnt1(e.target.value)} value={perdiemamnt1} />
                       </div>
                       <div className="inpex inpexs">
                           <h1>Minimum Distance (Mi)</h1>
                           <input type="number" onChange={e => setperdiemmil1(e.target.value)} value={perdiemmil1} />
                       </div>

                       <div className="inpex inpexs">
                           <h1>Overnight Perdiem ($)</h1>
                           <input type="number" onChange={e => setonperdiemamnt1(e.target.value)} value={onperdiemamnt1} />
                       </div>
                       <div className="inpex inpexs">
                           <h1>Minimum Distance (Mi)</h1>
                           <input type="number" onChange={e => setonperdiemmil1(e.target.value)} value={onperdiemmil1} />
                       </div>



                   </>


                   <div className="inpex2">


                       <button onClick={e => applyperdiem('')} className='btn1'>Apply</button>

                       <button onClick={e => setadduser2('adduser2')} className='btn1'>Cancel</button>
                   </div>           <div className="inputname"></div>
               </>




           </div>



       </div>
       {i === 0 &&
           <>
               <div className={adduser}>
                   {j === 1 &&
                       <div className="subadduser subadduser2">

                           <>
                               <div className="inputname">
                                   <h1>Name</h1>


                                   <input type="text" onChange={e => setnameq(e.target.value)} />
                               </div>

                               <div className="inputname">
                                   <h1>Skill</h1>
                                   <input value={skill} type="text" onChange={e => setskill(e.target.value)} />

                               </div>
                               <div className="inputname">
                                   <h1>Pay rate (per/hr)</h1>
                                   <input value={payrate} type="text" onChange={e => setpayrate(e.target.value)} />

                               </div>
                               <div className="inputname">
                                   <h1>OT Pay rate (per/hr)</h1>
                                   <input value={otpayrate} type="text" onChange={e => setotpayrate(e.target.value)} />

                               </div>

                               <div className="inputname">
                                   <h1>Taxes:  </h1>
                                   <div className={taxes} onClick={e => turnon()}>
                                       <div className={circle}>

                                       </div>
                                   </div>

                               </div>
                               <div className="inputname">
                                   <h1>NC (4%):  </h1>
                                   <div className={taxes2} onClick={e => turnon2()}>
                                       <div className={circle2}>

                                       </div>
                                   </div>

                               </div>
                               <div className="inputname">

                               </div>

                               <button onClick={e => adddata()} className='btn1'>Add</button>
                               <button onClick={e => setj(0)} className='btn2'>Back</button>

                           </>




                       </div>

                   }
                   {j === 0 &&
                       <div className="subadduser hadduser hdauser "style={{paddingTop:70}} >

                           <IoClose className='iov' onClick={e => setadduserx('adduser2')} />
                           <> 
                           <div className="prcs prcs2">
           <div className="circ1x">
             <div className="cbge">
               1
             </div>
<h1>Project info</h1>
          
           </div>
          
           {steps>=1
           ?
       
           <div className="circ1x">
            <div className="cbge">
               2
             </div>
<h1>Project Address</h1>
        
           </div>:
           
           <div className="grcirc1x">
                <div className="cbge">
               2
             </div>
               <h1>Project Address</h1>
           </div>}
           

           {steps>=2
           ?
       
           <div className="circ1x">
                <div className="cbge">
               3
             </div>
<h1>Add task</h1>
           </div>:
           
           <div className="grcirc1x">
        <div className="cbge">
               3
             </div>
<h1>Add task</h1>
           </div>}
          
           {steps>=3
           ?
       
           <div className="circ1x">
              <div className="cbge">
               4
             </div>
<h1>Perdiem</h1>
           
           </div>:
           
           <div className="grcirc1x ">
          <div className="cbge">
               4
             </div>
               <h1>Taxes</h1>
       
           </div>}
         </div>

                               {steps === 0 ?
                                   <>
                                       <h6>General info</h6>
                                       <div className="inpex">
                                           <h1>Project name</h1>
                                           <input onChange={e => setsname(e.target.value)} value={sname} type="text" />
                                           {checkinfo && steps === 0 && !sname &&
                                               <h6 className='redinfo'>Project name is required</h6>

                                           }
                                       </div>
                                       <div className="inpex">
                                           <h1>Project no:</h1>
                                           <input onChange={e => setpno(e.target.value)} value={pno} type="text" />
                                           {checkinfo && steps === 0 && !pno &&
                                               <h6 className='redinfo'>Number is required</h6>

                                           }
                                       </div>
                                       <div className="inpex">
                                           <h1>Company</h1>

                                           <select className='select2' name="cars" id="cars" onChange={e => allemps(e.target.value)}>

                                               {!cname2 ? <option >Choose Company</option>
:
<option value={cname2.username + 'eiuka' + cname2.markup + 'eiuka' + cname2._id + 'eiuka' + cname2.address+ 'eiuka' + cname2.weekend}>{cname2.username}</option>
                                                
                                               }
                                               {
                                                   clients && clients.map(val => (
(cname2&&cname2._id!==val._id)&&
                                                       <option value={val.username + 'eiuka' + val.markup + 'eiuka' + val._id + 'eiuka' + val.address+ 'eiuka' + val.weekend}>{val.username}</option>
                                                   ))
                                               }
                                           </select>
                                           {checkinfo && steps === 0 && !cname &&
                                               <h6 className='redinfo'> Select company</h6>

                                           }
                                       </div>

                                   </> :
                                   steps === 1 ?
                                       <>



                                           <div className={mapx} ref={mapContainer}></div>
{
mapx==='map'&&
<div
style={{
width:'20%',
display:'flex',
flexDirection:'column',

}}
>

<p
style={{

marginLeft:10

}}
>Radius:</p>
<Slider style={{
   width:'100%',

marginLeft:10
}} defaultValue={100} max={500}  onChange={e=>setradiuss(e.target.value)} aria-label="Default" valueLabelDisplay="auto" />
</div>
}
                                           <>
                                               <div className={inpex}>
                                                   <h1>Address</h1>
                                                   <input onChange={e => setaddress(e.target.value)} value={address} type="text" />
                                                   {checkinfo && steps === 1 && !chklatlang &&
                                                       <h6 className='redinfo'>Map location is required</h6>

                                                   }
                                               </div>
                                               <div className={inpex}>
                                                   <button onClick={e => ddd()}>Choose from map</button>
                                               </div>
                                           </>



                                       </>
                                       :

                                       steps === 2 ?
                                           <>
                                               <h6>Tasks</h6>
                                               <div className="alltasks">
                                                   {tasks && tasks.map(val => (
                                                       <p>{val.name} - {val.description} <VscChromeClose onClick={e => settasks(tasks.filter(item => item.name !== val.name))} className='sff' /></p>
                                                   ))}
                                               </div>

                                               <div className="inpex">

                                                   <input onChange={e => settaskname(e.target.value)} value={taskname} type="text" placeholder='Task' />

                                               </div>
                                               <div className="inpex" style={{ marginTop: '-10px' }}>
                                                   <input onChange={e => settaskdesc(e.target.value)} value={taskdesc} type="text" placeholder='task no' />

                                               </div>
                                               <div className="inpex">
                                                   <button className='intbtn' onClick={e => addtask()}>+ task</button>
                                               </div>


                                           </> : steps === 3 ?
                                               <>
                                                   <h6>Perdiem & Other Expenses</h6>
                                                   <div className="inpex inpexs">
                                                       <h1>Perdiem ($)</h1>
                                                       <input type="number" onChange={e => setperdiemamnt(e.target.value)} value={perdiemamnt} />
                                                   </div>
                                                   <div className="inpex inpexs">
                                                       <h1>Minimum Distance (Mi)</h1>
                                                       <input type="number" onChange={e => setperdiemmil(e.target.value)} value={perdiemmil} />
                                                   </div>

                                                   <div className="inpex inpexs">
                                                       <h1>Overnight Perdiem ($)</h1>
                                                       <input type="number" onChange={e => setonperdiemamnt(e.target.value)} value={onperdiemamnt} />
                                                   </div>
                                                   <div className="inpex inpexs">
                                                       <h1>Minimum Distance (Mi)</h1>
                                                       <input type="number" onChange={e => setonperdiemmil(e.target.value)} value={onperdiemmil} />
                                                   </div>

                                                   <div className="inpex inpexs">
                                                       <h1>Other Expenses ($)</h1>
                                                       <input type="number" />
                                                   </div>

                                               </> :
                                               steps===4?

<>
<h3 className='adio'>Add users</h3>
<div className="newst1" style={{width:'95%',margin:'auto'}} >

<input type="text" style={{width:'40%'}} placeholder='Search..' onChange={e => setusersearch(e.target.value)} />
</div>
                                               <div className="tablerow trow">
                                       
                                                   <div className="subtable">
                                                       <div className="headertable clop">
                                                 <h2 style={{ width: '50px', paddingLeft: '10px' }}>Add</h2>
                                                           <h1>Employee</h1>

                                                           <h6>Skill</h6>
                                                           <h4 style={{width:'60px'}} >Pay rate</h4>
                                                           <h5 style={{width:'90px'}} >OT Pay rate</h5>

                                                           <h5  style={{width:'80px'}}>Distance</h5>

                                                           <h2 style={{ width: '80px' }}>

                                                               Perdiem
                                                           </h2>
                                                           <h2 style={{ width: '100px' }}>

                                                               O.N Perdiem
                                                           </h2>

                                                           <h2 style={{ width: '80px' }}>

                                                               Food</h2>



                                                           <h3>Taxes</h3>
                                                           <h5>NC(%)</h5>


                                                       </div>
                                                       {usersearch.length===0?
                                                        userdata && userdata.map((val, index) => (
                                                           <>
                                                               <div className="headertable">
                                                            <h2 style={{ width: '50px', paddingLeft: '10px' }}>
                                                                       <GrFormAdd style={{fontSize:'25px'}} onClick={e => skipthis2(index)} /></h2> 
                                                                   <h1>{val.name}</h1>

                                                                   <h6>{val.skill}</h6>

                                                                   <h3  style={{width:'60px'}}>{val.payrate}</h3>
                                                                   <h4  style={{width:'90px'}}>{val.otpayrate}</h4>

                                                                   <h4  style={{width:'80px'}}>{parseInt(val.distance)} Miles</h4>
                                                                   <h2 style={{ width: '80px' }}>
                                                                       {val.perdiem}
                                                                   </h2>
                                                                   <h2 style={{ width: '100px' }}>
                                                                       {val.onperdiem}
                                                                   </h2>




                                                                   <h2 style={{ width: '80px' }}>

                                                                       {val.food === 'No' ?
                                                                           <div className="taxes" onClick={e => turn3(val.food, index)}>
                                                                               <div className="circle">

                                                                               </div>
                                                                           </div> :
                                                                           <h4 className="taxes2" onClick={e => turn3(val.food, index)}>
                                                                               {<div className="circle2">

                                                                               </div>}
                                                                           </h4>

                                                                       }
                                                                   </h2>

                                                                   <h5>{val.taxes}</h5>
                                                                   {
                                                                       val.nc !== 'no' ?

                                                                           <h5>{val.nc}%</h5>
                                                                           :

                                                                           <h5>NO</h5>
                                                                   }


                                                               </div>
                                                           </>
                                                       )):
                                                       userdata && userdata.map((val, index) => (
                                                           val.name.toLowerCase().search(usersearch.toLowerCase())>=0&& <>
                                                           
                                                               <div className="headertable">
                                                            <h2 style={{ width: '50px', paddingLeft: '10px' }}>
                                                                       <GrFormAdd style={{fontSize:'25px'}} onClick={e => skipthis2(index)} /></h2> 
                                                                   <h1>{val.name}</h1>

                                                                   <h6>{val.skill}</h6>

                                                                   <h3  style={{width:'60px'}}>{val.payrate}</h3>
                                                                   <h4  style={{width:'90px'}}>{val.otpayrate}</h4>

                                                                   <h4  style={{width:'80px'}}>{parseInt(val.distance)} Miles</h4>
                                                                   <h2 style={{ width: '80px' }}>
                                                                       {val.perdiem}
                                                                   </h2>
                                                                   <h2 style={{ width: '100px' }}>
                                                                       {val.onperdiem}
                                                                   </h2>




                                                                   <h2 style={{ width: '80px' }}>

                                                                       {val.food === 'No' ?
                                                                           <div className="taxes" onClick={e => turn3(val.food, index)}>
                                                                               <div className="circle">

                                                                               </div>
                                                                           </div> :
                                                                           <h4 className="taxes2" onClick={e => turn3(val.food, index)}>
                                                                               {<div className="circle2">

                                                                               </div>}
                                                                           </h4>

                                                                       }
                                                                   </h2>

                                                                   <h5>{val.taxes}</h5>
                                                                   {
                                                                       val.nc !== 'no' ?

                                                                           <h5>{val.nc}%</h5>
                                                                           :

                                                                           <h5>NO</h5>
                                                                   }


                                                               </div>
                                                           </>
                                                       ))

                                                       }
                                                   </div>
                                               </div>
                                               </>:
                                               <>
                                               <h3 className='adio'>Users</h3>
                                                                                                   <div className="tablerow trow">
                                                                                           
                                                                                                       <div className="subtable">
                                                                                                           <div className="headertable clop">
                                                                                                           <h2 style={{ width: '50px', paddingLeft: '10px' }}>
                                                                                                               Delete</h2> 
                                                          
                                                                                                               <h1>Employee</h1>
                                               
                                                                                                               <h6>Skill</h6>
                                                                                                               <h4 style={{width:'60px'}} >Pay rate</h4>
                                                                                                               <h5 style={{width:'90px'}} >OT Pay rate</h5>
                                               
                                                                                                               <h5  style={{width:'80px'}}>Distance</h5>
                                               
                                                                                                               <h2 style={{ width: '80px' }}>
                                               
                                                                                                                   Perdiem
                                                                                                               </h2>
                                                                                                               <h2 style={{ width: '100px' }}>
                                               
                                                                                                                   O.N Perdiem
                                                                                                               </h2>
                                               
                                                                                                               <h2 style={{ width: '80px' }}>
                                               
                                                                                                                   Food</h2>
                                               
                                               
                                               
                                                                                                               <h3>Taxes</h3>
                                                                                                               <h5>NC(%)</h5>
                                               
                                               
                                                                                                           </div>
                                                                                                           {userdata2 && userdata2.map((val, index) => (
                                                                                                               <>
                                                                                                                   <div className="headertable">
                                                                                                                   <h2 style={{ width: '50px', paddingLeft: '10px' }}>
                                                                       <MdDelete style={{fontSize:'25px'}} onClick={e => skipthis3(index)} /></h2> 
                                                          
                                                                                                             <h1>{val.name}</h1>
                                               
                                                                                                                       <h6>{val.skill}</h6>
                                               
                                                                                                                       <h3  style={{width:'60px'}}>{val.payrate}</h3>
                                                                                                                       <h4  style={{width:'90px'}}>{val.otpayrate}</h4>
                                               
                                                                                                                       <h4  style={{width:'80px'}}>{parseInt(val.distance)} Miles</h4>
                                                                                                                       <h2 style={{ width: '80px' }}>
                                                                                                                           {val.perdiem}
                                                                                                                       </h2>
                                                                                                                       <h2 style={{ width: '100px' }}>
                                                                                                                           {val.onperdiem}
                                                                                                                       </h2>
                                               
                                               
                                               
                                               
                                                                                                                       <h2 style={{ width: '80px' }}>
                                               
                                                                                                                           {val.food === 'No' ?
                                                                                                                               <div className="taxes" onClick={e => turn3(val.food, index)}>
                                                                                                                                   <div className="circle">
                                               
                                                                                                                                   </div>
                                                                                                                               </div> :
                                                                                                                               <h4 className="taxes2" onClick={e => turn3(val.food, index)}>
                                                                                                                                   {<div className="circle2">
                                               
                                                                                                                                   </div>}
                                                                                                                               </h4>
                                               
                                                                                                                           }
                                                                                                                       </h2>
                                               
                                                                                                                       <h5>{val.taxes}</h5>
                                                                                                                       {
                                                                                                                           val.nc !== 'no' ?
                                               
                                                                                                                               <h5>{val.nc}%</h5>
                                                                                                                               :
                                               
                                                                                                                               <h5>NO</h5>
                                                                                                                       }
                                               
                                               
                                                                                                                   </div>
                                                                                                               </>
                                                                                                           ))
                                               
                                                                                                           }
                                                                                                       </div>
                                                                                                   </div>
                                                                                                   </>

                               }


                               {
                                 (  steps === 4||steps===5) && <div className="inputname">
                                 

                                   </div>
                               }

                               <div className="inpex2">

                                   {mapx === 'mapx' || mapx === 'mapx3' ?
                                       <>

                                           <button className='btg' onClick={e => steps > 0 ? setsteps(steps => steps - 1) : ""}><HiArrowLeft className='btgp' /> Back</button>
                                           <button onClick={e => steps < 5 ? setstex() : req()} className='btn1'>{steps < 5 ? "Next" : "Finish"}</button>
                                       </>
                                       :


                                       <button onClick={e => setmapxs('mapx3')} className='btn1'>{steps < 5 ? "Save" : "Done"}</button>

                                   }
                               </div>           <div className="inputname"></div>
                           </>




                       </div>

                   }

               </div>
           </>

       }
       <div className="sitemap">
           {mx === 0 &&
               <>
                   <div className="newst nbst" style={{ 
position:'relative',marginTop: '20px' }}>
                       <div className="newst1 " style={{ position: 'relative' }}>
                           <input type="text" placeholder='Search..' onChange={e => setsearchval(e.target.value)} />
                           <button className='deleter' onClick={e => deletedata()}> Delete</button>
                           <button onClick={e => setadduser('adduser')}>+ Create Project</button>

                           {
                               kshow &&
                               <IoClose className='iov hideondesk iov2' onClick={e => setkshow(false)} />

                           }
                       </div>
                       <div className="newst2" style={{

display:'flex',
justifyContent:'flex-end',

}} >
                           <button style={{
                               position:'absolute',
                               right:0,
                               top:0
                           }} onClick={e=>gototasks()} >Task management</button>
                       </div>

                       {!kshow && <div className="newsts nospacebw  hideondesk">
                           {
                               searchval.length === 0 ?

                                   data && data.map(val => (
                                       <>{


                                           <div onClick={e => setcurronex(val)} className="cardl jobcardl">
                                               <div className="topl">
                                                   <p>Jobsite</p>

                                                   <button style={{ color: 'rgb(3, 143, 9', background: '#DBFFF8' }}>{val.clientname}</button>


                                               </div>
                                               <h3>{val.sitename}</h3>

                                               <h1>No. Of Users: {val.user && val.user.length}</h1>
                                               <h1>{val.user && val.address}</h1>
                                           </div>


                                       }
                                       </>
                                   )) :

                                   data && data.map(val => (
                                       <>{


                                           val.sitename && val.sitename.toLowerCase().search(searchval.toLowerCase()) >= 0 &&
                                           <div onClick={e => setcurronex(val)} className="cardl jobcardl">
                                               <div className="topl">
                                                   <p>Jobsite</p>

                                                   <button style={{ color: 'rgb(3, 143, 9', background: '#DBFFF8' }}>{val.clientname}</button>


                                               </div>
                                               <h3>{val.sitename}</h3>

                                               <h1>No. Of Users: {val.user && val.user.length}</h1>
                                               <h1>{val.user && val.address}</h1>
                                           </div>


                                       }
                                       </>
                                   ))

                           }
                       </div>

                       }
                       <div className="newst2">

                           {/*
                               k === 0 &&
                               <>

                                   <button className='hideonmobile' onClick={e => preparesheet(0)}>Export to excel</button>
                                   <button className='hideonmobile' onClick={e => preparesheet(1)}>Enter Hours</button>
                                   <button className='addemp3 hideonmobile ' onClick={e => preparesheet(2)}> Invoice</button>

                               </>

                   */ }
                           {
                               k === 1 &&

                               <>
                                   <button className=' adfp' onClick={e => backtop()}>Back</button>

                                   <button onClick={e => save()}>Save</button>

                                   <button onClick={e => setadduserd('adduser')}>Import</button>
                                   <button className='addemp2 addemp' onClick={e => applyperdiem()}> Apply Perdiem </button>

                                   <button className='addemp' onClick={e => l === 0 ? exports() : l === 1 ? exports3() : exports2()}>Export</button>
                                   {/*l === 0 &&

                                       <button className='addemp2 addemp' onClick={e => updateaccount()}>Update Account</button>

                           */}
                                   {l === 2 &&
                                       <>

                                           {/*  <button className='addemp2 addemp' onClick={e => postclient()}>Update Account</button>*/}
                                       </>
                                   }
                               </>
                           }

                       </div>
                   </div>


                   {k === 0 &&
                       <>
                           <div className="newst">
                               <div className="tablerow hideonmobile tablef" id='tablerow'>
                                   <div className="subtable">
                                       <div className="headertable clop">
                                           <h2 className='sxx'> Select</h2>
                                           <h1>Project</h1>

                                           <h6>Company</h6>
                                           <h3>Total Employees</h3>
                                           <h3>Status</h3>


                                       </div>
                                       {searchval.length > 0 && filter === 'jobsite' && data && data.map((val, index) => (
                                           val.sitename.toLowerCase().search(searchval.toLowerCase()) >= 0 &&
                                           <>
                                               <div className="headertable" onClick={e => selectthis(val)} >
                                                   <h2 className='sxx'> <input onClick={e => addindex(index,val)} type="checkbox" checked={ind.search(val._id) >= 0 ? true : false} /> </h2>
                                                   <h1>{val.sitename}</h1>

                                                   <h6>{val.clientname}</h6>
                                                   <h3>{val.user.length}</h3>
                                                   <h4>{val.status}</h4>





                                               </div>
                                           </>
                                       ))

                                       }
                                       {searchval.length > 0 && filter === 'company' && currentItems && currentItems.map((val, index) => (
                                           val.clientname.toLowerCase().search(searchval.toLowerCase()) >= 0 &&
                                           <>
                                               <div className="headertable" onClick={e => selectthis(val)} >
                                                   <h2 className='sxx'> <input onClick={e => addindex(index,val)} type="checkbox" checked={ind.search(val._id) >= 0 ? true : false} /> </h2>
                                                   <h1>{val.sitename}</h1>

                                                   <h6>{val.clientname}</h6>
                                                   <h3>{val.user.length}</h3>
                                                   <h4>{val.status}</h4>





                                               </div>
                                           </>
                                       ))

                                       }
                                       {searchval.length === 0 && currentItems && currentItems.map((val, index) => (

                                           <>
                                               <div className="headertable" onClick={e => selectthis(val)} >
                                                   <h2 className='sxx'> <input onClick={e => addindex(index,val)} type="checkbox" checked={ind.search(val._id) >= 0 ? true : false} /> </h2>
                                                   <h1>{val.sitename}</h1>

                                                   <h6>{val.clientname}</h6>
                                                   <h3>{val.user.length}</h3>
                                                   <h4>{val.status}</h4>





                                               </div>
                                           </>
                                       ))

                                       }

                                   </div>
                                   <ReactPaginate
                                       breakLabel="..."
                                       nextLabel="next >"
                                       onPageChange={handlePageClick}
                                       pageRangeDisplayed={5}
                                       pageCount={pageCount}
                                       previousLabel="< previous"
                                       renderOnZeroPageCount={null}
                                   />
                               </div>

                               <div className="comdet hideonmobile">
                                   {currone ?
                                       <>
                                           <h1> Project</h1>
                                           <div className="penh" onClick={e => updateuser()
                                           }>
                                               <FaPencilAlt className='fadd' />

                                           </div>
                                           <div className="divx">
                                               <div className="bcircle">
                                                   <FaBuilding className='fabv' />

                                               </div>
                                               <p>{currone.sitename}</p>
                                               <p>{currone.no}</p>
                                           </div>
                                           <div className="divx2">
                                               <div className="prt prt2" style={{position:'relative'}}>
                                                   <h1>{currone.user.length} </h1>
                                                   <p>Users</p>
                                                   <div className="crfle" onClick={e=>setadduserd2('adduser')}>
                                                       +
                                                   </div>
                                               </div>

                                               <div className="prt">
                                                   <h1>9</h1>
                                                   <p>Clocked inn</p>
                                               </div>
                                           </div>
                                           <div className="cinfo">
                                               <h1>
                                                   <MdLocationOn className='mdl' />Company  </h1>
                                               <p>{currone.clientname}</p>
                                           </div>
                                           <div className="cinfo">
                                               <h1>
                                                   <MdLocationOn className='mdl' />Site address</h1>
                                               <p>{currone.address}</p>
                                           </div>

                                           <div className="badge">{currone.status}</div>
                                       </>
                                       :
                                       <div className="divx">

                                           <p>Select Company to view</p>
                                       </div>}

                               </div>

                               {kshow && <div className="comdet">
                                   {currone ?
                                       <>
                                           <h1> Project</h1>

                                           <div className="divx">
                                               <div className="bcircle">
                                                   <FaBuilding className='fabv' />

                                               </div>
                                               <p>{currone.sitename}</p>
                                               <p>{currone.no}</p>
                                           </div>
                                           <div className="divx2">
                                               <div className="prt prt2">
                                                   <h1>{currone.user.length} </h1>
                                                   <p>Users</p>
                                               </div>
                                               <div className="prt">
                                                   <h1>9</h1>
                                                   <p>Clocked inn</p>
                                               </div>
                                           </div>
                                           <div className="cinfo">
                                               <h1>
                                                   <MdLocationOn className='mdl' />Company  </h1>
                                               <p>{currone.clientname}</p>
                                           </div>
                                           <div className="cinfo">
                                               <h1>
                                                   <MdLocationOn className='mdl' />Site address</h1>
                                               <p>{currone.address}</p>
                                           </div>

                                           <div className="badge">{currone.status}</div>
                                       </>
                                       :
                                       <div className="divx">

                                           <p>Select Company to view</p>
                                       </div>}

                               </div>

                               }
                           </div>

                           <div className="newst hideondesk">
                               <div className="comdetxx" ref={mapContainer3}></div>
                           </div>
                           <div className="newst hideonmobile">
                               <div className="comdetxx" ref={mapContainer2}></div>
                           </div>
                       </>

                   }
                   {k == 1 && l === 2 &&
                       <div className='sssw' style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>


                           <div className="subadduser subadduserx2">

                               <>
                                   <div className="inputname">
                                       <h1>Company </h1>
                                       <input type="text" onChange={e => setincname(e.target.value)} value={incname} />
                                   </div>
                                   <div className="inputname">
                                       <h1>Project name</h1>
                                       <input type="text" onChange={e => setinname(e.target.value)} value={inname} />
                                   </div>

                                   <div className="inputname">
                                       <h1>Invoice #</h1>
                                       <input type="text"
                                           onChange={e => setinno(e.target.value)} value={inno} />
                                   </div>

                                   <div className="inputname">
                                       <h1>Date</h1>
                                       <input type="text" onChange={e => setindate(e.target.value)} value={indate} />
                                   </div>

                                   <div className="inputname">
                                       <h1>Project no:</h1>
                                       <input type="text" onChange={e => setinnum(e.target.value)} value={innum} />

                                   </div>
                                   <div className="inputname">
                                       <h1>Address:</h1>
                                       <input type="text" onChange={e => setinadd(e.target.value)} value={inadd} />

                                   </div> <div className="inputname">
                                       <h1>Due date:</h1>
                                       <input type="text" onChange={e => setindue(e.target.value)} value={indue} />

                                   </div>

                               </>




                           </div>

                           <div className="subadduser subadduserx2 subadduserx3">

                               <>
                                   <h1>{compnay}</h1>
                                   <h1>{add}</h1>
                                   <h1>{zpi}</h1>
                                   <h1>{mail}</h1>
                                   <h3 onClick={e => opm()}>Edit Company</h3>




                               </>




                           </div>


                       </div>

                   }


                   {k === 1 &&
                       <>
                           <div className="tablerow">
                               <div className="subtable">
                                   <div className="headertable clop">
                                       <span className='sxx'> </span>

                                       <h2 style={{ width: '80px', marginBottom: '0px' }}>Taxes</h2>
                                       <h1 style={{ width: '180px' }}>Company</h1>

                                       <h6>Date</h6>
                                       <h3>Contractor name</h3>
                                       <h4 >Distance</h4>
                                       <h4 style={{ width: '80px', marginBottom: '0px' }}>Hrs</h4>

                                       <h4 style={{ width: '80px', marginBottom: '0px' }}>Pay rate</h4>

                                       <h4 style={{ width: '80px', marginBottom: '0px' }}>OT Hrs</h4>

                                       <h4 style={{ width: '80px', marginBottom: '0px' }}>OT Payrate</h4>

                                       <h4 style={{ width: '80px', marginBottom: '0px' }}>Total</h4>
                                       {
                                           applyperdiemx &&
                                           <>

                                               <h4 style={{ width: '80px', marginBottom: '0px' }}>Perdiem</h4>
                                               <h4 style={{ width: '80px', marginBottom: '0px' }}>ON Perdiem</h4>
                                               <h4 style={{ width: '80px', marginBottom: '0px' }}>Days</h4>


                                           </>
                                       }

                                       <h4 style={{ width: '80px', marginBottom: '0px' }}>NC 4%</h4>

                                       <h4 style={{ width: '80px', marginBottom: '0px' }}>Deductions</h4>

                                       <h4 style={{ width: '80px', marginBottom: '0px' }}>Net</h4>
                                       <h5>Action</h5>


                                   </div>
                                   {preparedata && preparedata.map((val, index) => (
                                       <>
                                           <div className="headertable">

                                               <span className='sxx'><AiFillDelete onClick={e => skipthis(index)} /> </span>
                                               <h2 style={{ width: '80px', marginBottom: '0px' }}><img src='' alt="" className='valimg' />{val.Taxes} </h2>
                                               <h1 style={{ width: '180px' }}>{val.Client}</h1>

                                               <h6>{val.Date}</h6>
                                               <h3>{val.Employee}</h3>

                                               <h4>{parseInt(val.distance)} M</h4>
                                               <h4 style={{ width: '80px', marginBottom: '0px' }}  >{val.Hrs}</h4>

                                               <h4 style={{ width: '80px', marginBottom: '0px' }}  >$ {val.Payrate} </h4>

                                               <h4 style={{ width: '80px', marginBottom: '0px' }}  >{val.Ot_Hrs}</h4>

                                               <h4 style={{ width: '80px', marginBottom: '0px' }}  >$ {val.OT_Pay_rate} </h4>

                                               <h4 style={{ width: '80px', marginBottom: '0px' }}  >{parseFloat(val.total.toFixed(2))} </h4>
                                               {
                                                   applyperdiemx &&
                                                   <>

                                                       <h4 style={{ width: '80px', marginBottom: '0px' }}>{parseFloat(val.perdiem.toFixed(2))}  $</h4>
                                                       <h4 style={{ width: '80px', marginBottom: '0px' }}>{val.onperdiem} $</h4>

                                                       <h4 style={{ width: '80px', marginBottom: '0px' }}>{val.days}</h4>
                                                   </>
                                               }

                                               <h4 style={{ width: '80px', marginBottom: '0px' }}  >{val.nc_4 === '-' ? <>0</>

                                                   :
                                                   parseFloat(val.nc_4.toFixed(2))
                                               }</h4>
                                               <h4 style={{ width: '80px', marginBottom: '0px' }}  >
                                                   $ {val.deductions}
                                               </h4>

                                               <h4 style={{ width: '80px', marginBottom: '0px' }}>{parseFloat(val.net.toFixed(2))}</h4>
                                               <h5 className='h5'><button className='man' onClick={e => showadd(index)}>Manage</button></h5>




                                           </div>
                                       </>
                                   ))

                                   }
                               </div>
                           </div>
                       </>

                   }
               </>

           }
           {mx === 1 &&
               <>  <div className="projectview">
                   <h4>     <span></span> <p>Active</p></h4>
                   <h1>Company : <p>{currproject.clientname}</p></h1>
                   <h1>Site : <p className='greenp'>{currproject.sitename}</p></h1>
                   <h1 className='teamm'>Supervisor: </h1>
                   <div className="teamates">
                       <button>Alex Loop</button>



                   </div>

                   <h1 className='teamm'>Employees: </h1>

                   <div className="tablerow">
                       <div className="subtable">
                           <div className="headertable clop">
                               <h1>Employee</h1>

                               <h6>Skill</h6>
                               <h3>Taxes</h3>
                               <h4>Pay rate</h4>
                               <h5>OT Pay rate</h5>
                               <h5>NC(%)</h5>


                           </div>
                           {currproject && currproject.user.map(val => (
                               <>
                                   <div className="headertable">
                                       <h1><img src='' alt="" className='valimg' /> {val.name}</h1>

                                       <h6>{val.skill}</h6>

                                       <h5>{val.taxes}</h5>
                                       <h3>{val.payrate}</h3>
                                       <h4>{val.otpayrate}</h4>
                                       {
                                           val.nc !== 'no' ?

                                               <h5>{val.nc}%</h5>
                                               :

                                               <h5>NO</h5>
                                       }


                                   </div>
                               </>
                           ))

                           }
                       </div>
                   </div>

               </div>
               </>

           }

       </div></>
   }
   </>
    )
}

export default Jobsite