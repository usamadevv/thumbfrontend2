import React, { useRef, useState } from 'react'
import { GiEnergyArrow } from 'react-icons/gi'
import { RiLightbulbFlashLine, RiTimerFlashFill } from 'react-icons/ri'
import { BiTime } from 'react-icons/bi'
import {HiArrowLeft, HiOutlineMail} from 'react-icons/hi'
import { MdKeyboardArrowRight, MdKeyboardBackspace, MdOutlineKeyboardArrowRight, MdSnooze } from 'react-icons/md'
import { AiFillCamera, AiOutlineReload } from 'react-icons/ai'
import axios from 'axios'
import { useEffect } from 'react'

import {HiUser} from 'react-icons/hi'
import {FaPencilAlt,FaBuilding, FaPhone, FaArrowRight, FaCaretDown} from 'react-icons/fa'
import {IoClose, IoLockClosedOutline} from 'react-icons/io5'

import ana  from '../../../images/ana.svg'

import inv  from '../../../images/inv.svg'
import * as turf from '@turf/turf'
import ReactPaginate from 'react-paginate';
import {MdLocationOn} from 'react-icons/md'
import { tz } from '../../apis'

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AiFillDelete } from 'react-icons/ai'
import XLSX from 'sheetjs-style'
import jsPDF from 'jspdf';


import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';


import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import * as file from 'file-saver'
import Mapview from './Mapview'
import Mapview2 from './Mapview2'
import { BsBuilding } from 'react-icons/bs'
import { Calendar } from 'react-calendar'
import Loader from './Loader'
import { createSiteUser, createSkill, deleteSiteUser, getAactiveSiteusers, getActiveClients, getAllJobsites, getAllSkills, updateSiteUser, updateSiteUserOfficialPhoto, updateSiteUserUpdateTravel, updateSiteUserUpdateTravelMiles } from '../../../Utils/api'
const Siteemp = ({props}) => {
    const [clientidd, setclientidd] = useState('')
    function setclientx(val){
        var r=val.split('4x3cd')
        console.log(r)
        setclient(r[0])
        setclientidd(r[1])

    }

    const [currone2, setcurrone2] = useState()
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + 10;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const [currentItems, setcurrentItems] = useState([])
    const [pageCount, setpageCount] = useState(0)
    
    const handlePageClick = (event) => {
        const newOffset = (event.selected * 10) % data.length;
        console.log(
          `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
      
        setItemOffset(newOffset);
      
        setcurrentItems(data.slice(newOffset,newOffset+10 ))
      
      };
    const [adduser, setadduser] = useState('adduser2 fixedarea')
    const [i, seti] = useState(0)
    const [taxes, settaxes] = useState('taxes')
    const [circle, setcircle] = useState('circle')

    const [taxes4, settaxes4] = useState('taxes')
    const [circle4, setcircle4] = useState('circle')


    const [taxes5, settaxes5] = useState('taxes')
    const [circle5, setcircle5] = useState('circle')
    const [is, setis] = useState(0)

    var marker=useRef(null)
    mapboxgl.accessToken='pk.eyJ1IjoidXNhbWE3ODZhIiwiYSI6ImNsZXZwbDV5ZTF0M3Ezc3Axdmhmb2Z3bmwifQ.b3u24ezWs8--UJphBNY1rA'

    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);
    const [latlang, setlatlang] = useState()
    const [taxes2, settaxes2] = useState('taxes')
    const [circle2, setcircle2] = useState('circle')
    const [is2, setis2] = useState(0)


    const [taxes3, settaxes3] = useState('taxes')
    const [circle3, setcircle3] = useState('circle')
    const [is3, setis3] = useState(0)



    const [data, setdata] = useState()

    const [itin, setitin] = useState('')
    const [address, setaddress] = useState('-')
    const [status, setstatus] = useState('Active')
    const [phone, setphone] = useState('-')
    const [checkinfo, setcheckinfo] = useState(false)
    const [client, setclient] = useState('')
    const [skildata, setskildata] = useState()
    const [supervisors, setsupervisors] = useState()

    const [from, setfrom] = useState('')
    const [to, setto] = useState('')
const [fromcalendar, setfromcalendar] = useState(false)
const [tocalendar, settocalendar] = useState(false)
    useEffect(() => {
      
        getAactiveSiteusers().then(res => {
            console.log(res)
            setdata(res.Siteuserd)

        setcurrentItems(res.Siteuserd.slice(itemOffset, endOffset))
        setpageCount(Math.ceil(res.Siteuserd.length / 10))
        })
        axios.get(`${tz}/super/getall`, {
            headers: {
                'Content-Type': 'application/json',
                // Add Authorization header with the token
                'Authorization': `${props}`
            }
        }).then(res => {
            console.log(res)
            setsupervisors(res.data.Supervisor)
        })
        getAllSkills().then(res => {
            console.log(res)
            setskildata(res.Skillsdata)
            setskill(res.Skillsdata&&res.Skillsdata[0].name)
        })

        return () => {

        }
    }, [])

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
    const [superemail, setsuperemail] = useState('')
    const [superpass, setsuperpass] = useState('')
    const [supermode, setsupermode] = useState('true')

    const [superallow, setsuperallow] = useState('true')


    const [supersite, setsupersite] = useState('')  
      const [email, setemail] = useState('')
    function req() {


        if (actiontype === 'update') {
            var postData= {
                name: name,
                nc: nc,
                taxas: taxas,
                skill: skill,
                pr: pr,
                otpr: parseFloat(pr) + parseFloat(pr) / 2,
                jobn: jobn,
                phone: phone,
                address: address,
                supermode:supermode,
                superallow:superallow,
                supersite:supersite,
                itin: itin,
                status: status,
                client: client,
                cpr:cpr,
                clientid:clientidd,
                _id: idb,
                idno: idno,
                email: email&&email.toLowerCase(),
                password: password,
                langlat:latlang,





            }
           updateSiteUser(postData).then(res => {
               getAactiveSiteusers().then(res => {
                    console.log(res)
                    setdata(res.Siteuserd)
                    setadduser('adduser2')


                    setsteps(0)
                    setcheckinfo(false)
                    setids('')

            setcurrentItems(res.Siteuserd.slice(itemOffset, endOffset))
            setpageCount(Math.ceil(res.Siteuserd.length / 10))
                    setactiontype('edit')
setlatlang('')
                    setname('')
                    setclient('')
                    setskill('')
                    setcpr('')
                    setpr('')
                    setaddress('')
                    setphone('')
                    setitin('')
                    setstatus('Active')
                    setidb('')
                    setnc('')
                    settaxas('')
                    setemail('')
                    setpassword('')
                    setsupermode('false')

                    setsuperallow('false')

                    setsupersite('')

                })
            })
        }
        else {
            var postData=  {
                name: name,
                nc: nc,
                taxes: taxas,
                skill: skill,
                payrate: pr,
                cpr:cpr,
                otpayrate: parseFloat(pr) + parseFloat(pr) / 2,
                jobn: jobn,
                phone: phone,
                address: address,
                itin: itin,
                status: status,
                langlat:latlang,
                clientid:clientidd,
                supermode:supermode,
                superallow:superallow,
                supersite:supersite,
                client: client,
                idno: idno,
                email:email&&email.toLowerCase(),
              password:password


            }
            createSiteUser(postData).then(res2 => {
              if(res2.Siteuserd==='user exist'){
alert('User already exist')
              }
              else{
                getAactiveSiteusers().then(res => {
                    console.log(res)
                    setdata(res.Siteuserd)
                    setadduser('adduser2')


                    setsteps(0)
                    setcheckinfo(false)
                    setids('')
            setcurrentItems(res.Siteuserd.slice(itemOffset, endOffset))
            setpageCount(Math.ceil(res.Siteuserd.length / 10))
                })
              }
            })


        }
    }
    const [sname, setsname] = useState('')
    const [sid, setsid] = useState('')
    const [supername, setsupername] = useState('')
    const [sstatus, setsstatus] = useState('')
    const [sadd, setsadd] = useState('')
    const [sphone, setsphone] = useState('')


    function reqx() {

        setids('')

        if (actiontype === 'update') {
            axios.post(`${tz}/super/update`, {
                name: supername,
                siteid: sid,
                sitename: sname,
                phone: sphone,
                address: sadd,
                status: sstatus,
                _id: csr


            }).then(res => {

                axios.get(`${tz}/super/getall`).then(res => {
                    console.log(res)
                    setsupervisors(res.data.Supervisor)
                    setadduser('adduser2')
                })
            })
        }
        else {
            axios.post(`${tz}/super/add`, {
                name: supername,
                siteid: sid,
                sitename: sname,
                phone: sphone,
                address: sadd,
                status: sstatus,
                email:superemail.toLowerCase(),
                pass:superpass


            }).then(res2 => {
                axios.get(`${tz}/super/getall`).then(res => {
                    console.log(res)
                    setsupervisors(res.data.Supervisor)
                    setadduser('adduser2')
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


            if(is2===1){

                setis2(0)
                turnon2()
    
                }
        }
        else {

            settaxas('no')

            setcircle('circle')
            settaxes('taxes')
            setis(0)
        }

    }
const [is4, setis4] = useState(0)

const [is5, setis5] = useState(0)
const [kshow, setkshow] = useState(false)

function setmapxs(){
   
    setmapx('mapx3')
    setinpex('inpex inpexnew')
 
    setsteps(3)


}


const [amountd, setamountd] = useState(0)
    function turnon4() {
        if (is4 === 0) {

            setcircle4('circle2')
            settaxes4('taxes2')

            setis4(1)
        }
        else {

setamountd(0)
            setcircle4('circle')
            settaxes4('taxes')
            setis4(0)
        }

    }
    function turnon5() {
        if (is5 === 0) {
setsupermode('true')
            setcircle5('circle2')
            settaxes5('taxes2')

            setis5(1)
        }
        else {

            setsupermode('false')
            setcircle5('circle')
            settaxes5('taxes')
            setis5(0)
        }

    }
    function turnon2() {
        if (is2 === 0) {
            setnc('4')
            if(is===1){

            setis(0)
            turnon()

            }
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
    function turnon3() {
        if (is3 === 0) {
            alert('active')
            setstatus('Active')

            setcircle3('circle2')
            settaxes3('taxes2')
            setis3(1)
        }
        else {

            alert('inactivecall')
            setcircle3('circle')
            settaxes3('taxes')
            setis3(0)

            setstatus('Inactive')
        }

    }
  
    const [name, setname] = useState('')
    const [skill, setskill] = useState('')
    const [jobn, setjobn] = useState('')
    const [nc, setnc] = useState('')
    const [taxas, settaxas] = useState('')
    const [pr, setpr] = useState('')
    const [otpr, setotpr] = useState('')
    const [ids, setids] = useState('')
    const [sites, setsites] = useState()
    const [steps, setsteps] = useState(0)
    const [travellogs, settravellogs] = useState(false)
    function deleteuser() {
        if (showusers == 'users') {
            console.log(ids)
            var r = ids.split('4sd')
            r[r.length - 1] = r[r.length - 2]
            setdata()
            var postData={
                ids: r



            }
            deleteSiteUser(postData).then(res => {
                console.log(res)
                setids('')
                getAactiveSiteusers().then(res2 => {
                    console.log(res2)
                    setdata(res2.Siteuserd)
                    setadduser('adduser2')
                    setids('')


            setcurrentItems(res2.Siteuserd.slice(itemOffset, endOffset))
            setpageCount(Math.ceil(res2.Siteuserd.length / 10))
                })
            })
        }
        else {
            console.log(ids)
            var r = ids.split('4sd')
            r[r.length - 1] = r[r.length - 2]
            setsupervisors()
            axios.post(`${tz}/super/deletedata`, {
                ids: r



            }, {
                headers: {
                    'Content-Type': 'application/json',
                    // Add Authorization header with the token
                    'Authorization': `${props}`
                }
            }).then(res => {
                console.log(res)
                setids('')
                axios.get(`${tz}/super/getall`).then(res2 => {
                    console.log(res2)
                    setsupervisors(res2.data.Supervisor)
                    setadduser('adduser2')
                    setids('')


            setcurrentItems(res2.data.Siteuserd.slice(itemOffset, endOffset))
            setpageCount(Math.ceil(res2.data.Siteuserd.length / 10))
                })
            })
        }

    }
    function formatPhoneNumber(number) {
        // Remove all non-digit characters
        const cleanNumber = number.replace(/\D/g, '');
        
        // Format the number in USA phone number format
        const formattedNumber = cleanNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        
        return formattedNumber;
    }
    
    const [actiontype, setactiontype] = useState('edit')
    const [clients, setclients] = useState()
    useEffect(() => {
        getActiveClients().then(res => {
            console.log(res)
            setclients(res.Client)
            setclient(res.Client&&res.Client[0].username)
        })
       getAllJobsites().then(res => {
            console.log(res)
            setsites(res.Jobsite)
        })

        return () => {

        }
    }, [])
    const [csr, setcsr] = useState('')
    function fileupload(filex){
     
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
    var postData={
             
             
        _id:currone._id,
        imgurl:downloadURL
       }
          updateSiteUserOfficialPhoto(postData).then((resa2)=>{
             // Find the index of the item with the given ID
    const itemIndex = currentItems.findIndex(item => item._id === currone._id);

    if (itemIndex !== -1) {
      // Create a new array with the updated item
      const updatedItems = [...currentItems];
      updatedItems[itemIndex] = {
        ...updatedItems[itemIndex],
        imgurl2: downloadURL
      };
      

      // Update the state with the updated array
      setcurrentItems(updatedItems);


      
setcurrone(updatedItems[itemIndex])

    }

    const itemIndex2 = data.findIndex(item => item._id === currone._id);

    if (itemIndex2 !== -1) {
      // Create a new array with the updated item
      const updatedItems2 = [...data];
      updatedItems2[itemIndex2] = {
        ...updatedItems2[itemIndex2],
        imgurl2: downloadURL
      };

      // Update the state with the updated array
      setdata(updatedItems2);

  }
            alert('Profile picture changed successfully')
           
    
            
           
    
        })
    
    
        });
      }
    );
    }
    function updateuser() {
      
            setactiontype('update')
            setadduser('adduser fixedarea')
            var idx = ids.split('4sd')
            data.forEach(val => {
                if (val._id === currone._id) {
                    setname(val.name)
                    setidno(val.idno)
                    setclient(val.client)
                    setclientidd(val.clientid)
                    setskill(val.skill)
                    setpr(val.payrate)
                    setcpr(val.cpr)
                    setaddress(val.address)
                    setphone(val.phone)
                    setitin(val.itin)
                    setstatus(val.status)

                    setidb(val._id)
                    setnc(val.nc)
                    settaxas(val.taxes)
setlatlang(val.langlat)

                    setamountd(val.amountd)
                    setemail(val.email)
                    setpassword(val.password)
                    if (val.nc === '4') {
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
                    if (val.taxes === 'yes') {
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
                    if (val.amountd) {
                        setamountd(val.amountd)

                        setcircle4('circle2')
                        settaxes4('taxes2')
                        setis4(1)
                    }
                    else {

                        setamountd(0)

                        setcircle4('circle')
                        settaxes4('taxes')
                        setis4(0)
                    }
                    if (val.supermode&&val.supermode==='true') {
                      setsupersite(val.supersite)
                      setsupermode('true')

                        setcircle5('circle2')
                        settaxes5('taxes2')
                        setis5(1)
                    }
                    else {
                        setsupermode('false')

                        setamountd(0)

                        setcircle5('circle')
                        settaxes5('taxes')
                        setis5(0)
                    }

                }

            });
        


    }
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
    const [prdata, setprdata] = useState([])

    const [arr, setarr] = useState([])

    const [inpex, setinpex] = useState('inpex inpexnew')
    const [mapx, setmapx] = useState('mapx')

    const map2=useRef(null)

    const mapContainer2=useRef(null)
    function ddd(){
        setinpex('mapxs')
        setmapx('map')
            map2.current = new mapboxgl.Map({
            container: mapContainer2.current,
          
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
            });
          
          const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
            marker:false
          });
          
          // Add the geocoder to the map
          map2.current.addControl(geocoder);
          
            map2.current.on('style.load', function() {
          
          map2.current.resize()
          geocoder.on('result', function(e) {

          setaddress(e.result.place_name)
            if(marker.current) marker.current.remove()
            marker.current=new mapboxgl.Marker()
            .setLngLat(e.result.center)
            .addTo(map2.current)
            setlatlang( JSON.stringify({lng:e.result.center[0],lat:e.result.center[1]}))
            
              });
          
              map2.current.on('click', function(e) {
                var coordinates = e.lngLat;
          if(marker.current) marker.current.remove()
            marker.current=new mapboxgl.Marker()
            .setLngLat(coordinates)
            .addTo(map2.current)
            setlatlang(JSON.stringify(coordinates))
            
              });
          
          
            });
            
    }
    function prepare() {
        setarr([])
        data.forEach((val, index) => {

            console.log(arr)
            if (ids.search(val._id) >= 0) {
                setarr(arrr => [...arrr, {
                    name: val.name,
                    nc: val.nc,
                    taxes: val.taxes,
                    skill: val.skill,
                    payrate: val.payrate,
                    otpayrate: val.otpayrate,
                    phone: val.phone,
                    address: val.address,
                    itin: val.itin,
                    status: val.status,
                    client: val.client

                }])
            }

        })
        alert('Report prepared please generate...')

    }

    function exports() {

        console.log(arr)
        const filetype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
        var ext = '.xlsx'


        const myHeader = ["name", "client", "skill", 'address', 'phone', 'payrate', 'otpayrate', 'nc', 'taxes', 'itin', 'status'];

        const ws = XLSX.utils.json_to_sheet(arr, { header: myHeader })

        var wscols = [
            { wch: 15 },
            { wch: 25 },
            { wch: 20 },
            { wch: 20 },
            { wch: 15 },
            { wch: 7 },
            { wch: 8 },
            { wch: 10 },
            { wch: 7 },
            { wch: 8 },
            { wch: 12 },
        ];
        for (var k = 0; k < arr.length + 1; k++) {
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

            }
        }




        ws['!cols'] = wscols;
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] }
        const excelbuffer = XLSX.write(wb, { booktype: 'xlsx', type: 'array' })
        const dar = new Blob([excelbuffer], { type: filetype })
        file.saveAs(dar, 'Userdata.xlsx',)
        setarr([])



    }
    function selectthis(val){
        setcurrone(val)

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    function selectthis2(val){
        setcurrone(val)
        setkshow(true)
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
    const [password, setpassword] = useState('')
    const [idb, setidb] = useState('')
    function closewin() {
        setadduser('adduser2')
        setactiontype('edit')
       

    }
        


    
  const [value, value2] = useState(new Date());

    const [o, seto] = useState(0)
    function addskills() {
        var postData={
            name: skillname,



        }
        createSkill(postData).then(res => {
            getAllSkills().then(res => {
                setskildata(res.Skillsdata)
                
            })
        })

    }
    function deg2rad(deg) {
        return deg * (Math.PI/180);
    }
    
    function haversine(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c; // Distance in kilometers
        return distance;
    }
    
    function calculatePathDistance(latlngArray) {
        let totalDistance = 0;
        for (let i = 0; i < latlngArray.length - 1; i++) {
            const lat1 = latlngArray[i][0];
            const lon1 = latlngArray[i][1];
            const lat2 = latlngArray[i + 1][0];
            const lon2 = latlngArray[i + 1][1];
            totalDistance += haversine(lat1, lon1, lat2, lon2);
        }
        return totalDistance;
    }
    function setshowusersx(val) {

        
            setshowusers(val)
            setusertype('user')
            setids('')
        
      
    }

    function onChangexd(e){


        var ustime=e.toLocaleString("en-US", {hour12:false})
        console.log(ustime)
        setfromcalendar(false)
        var yt=ustime.split(', ')
        setfrom(yt[0])
        settocalendar(true)
      }
      function onChangexd2(e){
        
        
    // Function to parse date strings in the format "mm/dd/yyyy" where month starts from 1


    
        var ustime=e.toLocaleString("en-US", {hour12:false})
        console.log(ustime)
        settocalendar(false)
        var yt=ustime.split(', ')
        setto(yt[0])
        
        function parseDate(dateString) {
            const [month, day, year] = dateString.split('/');
            return new Date(year, month - 1, day); // Adjust month by subtracting 1
        }
        
        // Example usage
        var updatedItems = {... currone};
        var arr = [];
        setselectedtravel(null);
        console.log(currone)
        currone.travel.forEach(element => {
       
            const parsedElementDate = parseDate(element.date);
            const parsedFromDate = parseDate(from);
            const parsedYtDate = parseDate(yt[0]);
        
            if (parsedElementDate > parsedFromDate && parsedElementDate < parsedYtDate) {
                arr.push(element);
            }
        });
        
        updatedItems.travel = arr;
        setselectedtravel(updatedItems);
        console.log("Filtered travel items:", arr);



      }


    function setadduserx(){
        setadduser('adduser2')
        setsteps(0)
        setcheckinfo(false)
        setactiontype('edit')
        setlatlang('')
                            setname('')
                            setclient('')
                            setskill('')
                            setpr('')
                            setcpr('')
                            setaddress('')
                            setphone('')
                            setitin('')
                            setstatus('Active')
                            setidb('')
                            setnc('')
                            settaxas('')
                            setemail('')
                            setpassword('')
                            setidno('')
    }
    const [filter, setfilter] = useState('name')
    const [searchval, setsearchval] = useState('')
    function fillall() {
        console.log(ids)
        if (o === 0) {
            setarr([])
            seto(1)
            setids('')
            data&&data.forEach(elem => {
                setids(ids => ids + elem._id + '4sd')
                setarr(arrr => [...arrr, {
                    name: elem.name,
                    nc: elem.nc,
                    taxes: elem.taxes,
                    skill: elem.skill,
                    payrate: elem.payrate,
                    otpayrate: elem.otpayrate,
                    phone: elem.phone,
                    address: elem.address,
                    itin: elem.itin,
                    status: elem.status,
                    client: elem.client,
                    email:elem.email,
                    password:elem.password

                }])
            });
        }
        else {
            setarr([])
            setids('')
            seto(0)

        }

    }
    const [cpr, setcpr] = useState(0)
    const [currone, setcurrone] = useState()
    function generateid() {
        var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);

        setidno('CF' + seq)


    }
    function clientx(val) {
        var t = val.split('xcv4')
        setsid(t[1])
        setsname(t[0])

    }
    const [idno, setidno] = useState('')
    const [aduser, setaduser] = useState('adduser2')
    function setstepscheck(){
        if(steps===1){
            if(!pr){

                setcheckinfo(true)
                }
                else{
        
                    setcheckinfo(false)
                setsteps(steps=>steps+1)
                }  
        }
        else if(steps===2){
            if(!latlang){

                setcheckinfo(true)
                }
                else{
        
                    setcheckinfo(false)
                setsteps(steps=>steps+1)
                }  
        }
      else{
        if(!email||!password||!idno||!name){

            setcheckinfo(true)
            }
            else{
    
                setcheckinfo(false)
            setsteps(steps=>steps+1)
            }
      }
    }
    const [toupdate, settoupdate] = useState(null)
    function updatetravelmiles(val)
    {
        settoupdate(val)

    }
    const [skillname, setskillname] = useState('')
    function deleteskill(val) {
    var postData={
        id: val,



    }
        deleteskill(postData).then(res => {
            getAllSkills().then(res => {
                setskildata(res.Skillsdata)
            })
        })
    }
    const [showusers, setshowusers] = useState('users')
    function openskil() {
        
        setaduser('adduser')
    }
    const [boxfixed, setboxfixed] = useState(false)
    const [searchby, setsearchby] = useState('name')

    function updatetravel(val) {
        var postData={
            _id:currone._id,
            val


        }
        updateSiteUserUpdateTravel(postData).then(res => {
        console.log(res)
        })

    }
    const [totalMiles, setTotalMiles] = useState(0);
    const [usertype, setusertype] = useState('user')
    const [trvl, settrvl] = useState(false)
    const [loading, setloading] = useState(false)
    function convertToAmPm(time24) {
        // Extract hours, minutes, and seconds from the time string
        const [hours, minutes, seconds] = time24.split(':').map(Number);
        
        // Determine whether it's AM or PM
        const period = hours >= 12 ? 'PM' : 'AM';
    
        // Convert hours to 12-hour format
        const hours12 = hours % 12 || 12; // 0 should be converted to 12 for 12-hour format
    
        // Return the time in AM/PM format
        return `${hours12}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${period}`;
    }
    
   async  function showtravel(){
    setselectedtravel([])
setloading(true)
    async function getNearbyLocation(coordinates, accessToken) {
        try {
            // Make a GET request to Mapbox Geocoding API for reverse geocoding
            const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?access_token=pk.eyJ1IjoiYXlhYW56YXZlcmkiLCJhIjoiY2ttZHVwazJvMm95YzJvcXM3ZTdta21rZSJ9.WMpQsXd5ur2gP8kFjpBo8g`);
    console.log(response.data)
     
            const nearbyAddress = response.data.features.length>0&&response.data.features[0].place_name || 'Unknown Address';

            return nearbyAddress;
        } catch (error) {
            console.error('Error getting nearby location address:', error);
            throw error;
        }
    }
    function calculateTotalTimeInMinutes(startTime, endTime) {
      if(startTime&&endTime&&endTime!='-'){
          // Convert start time to minutes
          const [startHours, startMinutes] = startTime.split(':').map(Number);
          const startTimeMinutes = startHours * 60 + startMinutes;
      
          // Convert end time to minutes
          const [endHours, endMinutes] = endTime.split(':').map(Number);
          const endTimeMinutes = endHours * 60 + endMinutes;
      
          // Calculate difference in minutes
          const totalTimeMinutes = endTimeMinutes - startTimeMinutes;
          console.log(totalTimeMinutes)
          return totalTimeMinutes;
      }
      else{
        return 0
      }
    }
    
    const getEquallySpacedIndexes = (length) => {
        // Calculate the step size to ensure that we have 10 equally spaced indexes
        const step = Math.max(Math.floor(length / 10), 1);
      
        // Initialize an array to store the selected indexes
        const indexes = [];
      
        // Push the first index
        indexes.push(0);
      
        // Push the equally spaced indexes
        for (let i = step; i < length; i += step) {
          indexes.push(i);
        }
      
        // Push the last index
        indexes.push(length - 1);
      
        return indexes;
      };
for(let i=0;i<currone.travel.length;i++){
if(currone.travel[i].coords.length>=1){


   

    if(currone.travel[i].coords.length>10){
        const cf = getEquallySpacedIndexes(currone.travel[i].coords.length).map(index => currone.travel[i].coords[index]);

        const response = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${cf.join(';')}?access_token=pk.eyJ1IjoiYXlhYW56YXZlcmkiLCJhIjoiY2ttZHVwazJvMm95YzJvcXM3ZTdta21rZSJ9.WMpQsXd5ur2gP8kFjpBo8g`);

  
   // Extract total distance in meters from the API response
   const totalDistanceMeters = response.data.routes[0].distance;

   // Convert distance from meters to miles
   const totalDistanceMiles = totalDistanceMeters / 1609.34; // 1 meter ≈ 0.000621371 miles

   // Extract start and end addresses from the API response
   const startAddress = await getNearbyLocation(currone.travel[i].coords[0], 'accessToken');
       const endAddress =  await getNearbyLocation(currone.travel[i].coords[currone.travel[i].coords.length-1], 'sd');
       const updatedItems = currone;
 
       console.log(response.data)

       const pathDistance = calculatePathDistance(currone.travel[i].coords);
       const totaltime=  calculateTotalTimeInMinutes(currone.travel[i].start&&currone.travel[i].start,currone.travel[i].end==='-'?currone.travel[i].start:currone.travel[i].end)
       updatedItems.travel[i].dist=totalDistanceMiles
       updatedItems.travel[i].startloc=startAddress
       updatedItems.travel[i].endloc=endAddress
     console.log(totaltime)
       updatedItems.travel[i].totaltime=totaltime
     
     
       
       setcurrone(updatedItems);
       setselectedtravel(updatedItems);
    }
    else {
           // Extract total distance in meters from the API response
    const totalDistanceMeters = 0;

    // Convert distance from meters to miles
    const totalDistanceMiles = 0; // 1 meter ≈ 0.000621371 miles
    const startAddress = await getNearbyLocation(currone.travel[i].coords[0], 'accessToken');
    const endAddress =  await getNearbyLocation(currone.travel[i].coords[currone.travel[i].coords.length-1], 'sd');
  
   
        const updatedItems = currone;
 


        const pathDistance = calculatePathDistance(currone.travel[i].coords);
        const totaltime=  calculateTotalTimeInMinutes(currone.travel[i].start&&currone.travel[i].start,currone.travel[i].end==='-'?currone.travel[i].start:currone.travel[i].end)
        updatedItems.travel[i].dist=totalDistanceMiles
        updatedItems.travel[i].startloc=startAddress
        updatedItems.travel[i].endloc=endAddress
      console.log(totaltime)
        updatedItems.travel[i].totaltime=totaltime
      
      
        
        setcurrone(updatedItems);
        setselectedtravel(updatedItems);
    }
 
   


  

}
else{
    const updatedItems = currone;
    updatedItems.travel[i].dist=0.00
    updatedItems.travel[i].totaltime=0
    
  
    setcurrone(updatedItems);

  setselectedtravel(updatedItems);
}
   
}

setloading(false)
settrvl(true)

     

        
   
      
  
  
        

    }
    const [selectedtravel, setselectedtravel] = useState()
const [trvl2, settrvl2] = useState(false)
const [cords, setcords] = useState([])
const [newdistance, setnewdistance] = useState(0)
function updatedistance()
{
   
var postData={
    _id:currone._id,
    val:toupdate,
    distance:newdistance


}

updateSiteUserUpdateTravelMiles(postData).then(res => {
console.log(res)
var temptravel=selectedtravel
setselectedtravel(null)
var found=temptravel.travel.findIndex(item=>item._id===toupdate._id)
console.log(found)
temptravel.travel[found].dist=Number(newdistance)

temptravel.travel[found].distance=Number(newdistance)
setselectedtravel(temptravel)

console.log(temptravel)
settoupdate(null)
})

}
const [searchvala, setsearchvala] = useState('')
const [currcom, setcurrcom] = useState('')
useEffect(() => {
if(steps===3){
}
    return () => {
      
    }
  }, [steps])
   function coord(val){
   
setcords(val)
settrvl2(true)
   }
    
    return (
        <>
{trvl?

<div className="trvl" style={{width:'100%',margin:'auto',paddingLeft:40,paddingTop:20}} >

    
<div className="newst1 w700" >

    {trvl2?

    <button className='deleter' onClick={e=>settrvl2(false)}> Back</button>
  
    :


    <>
    
    <>
    <div className="strtprt">
    <MdKeyboardBackspace onClick={e=>settrvl(false)} className='mds' />
     Travel logs 
    </div>
    <div className="endprt">
        <p>Date range:</p>
    <div className="boxfrom"
    onClick={e=>setfromcalendar(true)}
    >
        {fromcalendar&&
              <Calendar onChange={onChangexd} 
              value={value} />
        }
       {from?from:'Start date'}
    </div>
    <p>To:</p>
    <div className="boxfrom" onClick={e=>settocalendar(true)}>
    {tocalendar&&
              <Calendar onChange={onChangexd2} 
              value={value} />
        }
      {to?to:'End date'}
    </div>
    </div>
    
    </>
    </>
    }

  
                   

                </div>
{!trvl2
?

<>

<div className="w74 width70">

    <div className="w74card">
        
 <div className="iconinv">
 <img src={ana} alt="" />
 </div>

 <div className="iconpara">
    <p>Total Miles</p>
    <h1>{
      selectedtravel&&selectedtravel.travel.reduce((accumulator, currentValue) => accumulator + currentValue['dist'], 0).toFixed(2)

            }        </h1>
 </div>
    </div>
    <div className="w74card">
        
        <div className="iconinv">
        <img src={inv} alt="" />
        </div>
       
        <div className="iconpara">
           <p>Travel Time</p>
           <h1 style={{
            fontSize:25
           }} >{
      Math.floor(selectedtravel.travel.reduce((accumulator, currentValue) => accumulator + currentValue['totaltime'], 0)/60 )

            } h {
                Math.floor(selectedtravel.travel.reduce((accumulator, currentValue) => accumulator + currentValue['totaltime'], 0)%60 )
          
                      } m </h1>
        </div>
           </div>

    <div className="w74card">
        
        <div className="iconinv">
        <img src={ana} alt="" />
        </div>
       
        <div className="iconpara">
           <p>Total Days</p>
           <h1>{[...new Set(selectedtravel&&selectedtravel.travel.map(obj => obj.date))].length}</h1>
        </div>
           </div>
           <div className="w74card">
               
               <div className="iconinv">
               <img src={inv} alt="" />
               </div>
              
               <div className="iconpara">
                  <p>Perdiem</p>
                  <h1>56$</h1>
               </div>
                  </div>

</div>
<div className="tablerow hideonmobile width70 "  >
                           <div className="headertable clop sticky">
                          
                                <h4 style={{ width: "120px",paddingLeft:10 }}>Date</h4>

                                <h6  style={{ width: "300px", }} >Start Point </h6>
<h2 style={{
    width:30,
    marginRight:30,
}}></h2>
<h6  style={{ width: "300px", }} >End Point </h6>
                                <h2 >Distance</h2>
                              
                                <h6 >Start time</h6>

                                <h6>End time</h6>
                             
                                <h2 >Perdiem</h2>
                                <h6>Action</h6>
                                


                            </div>
                        <div className="subtable">
                         
                           
                            {selectedtravel.travel && selectedtravel.travel.map(val => (

                                <>
                                    <div className="headertable" >
           
                                        <h4 style={{ width: "120px",paddingLeft:10 }}>{val.date}</h4>
                                        <h6 className='silverfont' style={{ width: "300px", }}  >{val.startloc?val.startloc.substring(0,40):'Unknown address'}</h6>
<h2 style={{
    width:30,
    marginRight:30,
}
} ><MdOutlineKeyboardArrowRight className='grenfont' /></h2>
<h6 className='silverfont' style={{ width: "300px", }}  >{val.endloc?val.endloc.substring(0,40):'Unknown address'}</h6>
                                        
                                        
                                        {toupdate&&toupdate._id===val._id?

                                        <h2 className='savg'>
                                        <input type="number" onChange={e=>setnewdistance(e.target.value)} />
                                        <button onClick={e=>updatedistance()}>Save</button>
                                        </h2  >:
<h2 className='updaten' > {val.distance?Number(val.distance).toFixed(2):val.dist.toFixed(2)}  Miles
                                        <button onClick={e=>updatetravelmiles(val)}><FaPencilAlt /></button>
                                        </h2>
                                        
                                        }
                                    

                                        <h6 >{val.start&&val.start!=='-'?convertToAmPm(val.start):'-'}</h6>

                                        <h6>{val.end&&val.end!=='-'?convertToAmPm(val.end):'-'}</h6>
                                      
                                        <h2>$ 75 </h2>
                                        <h6><div onClick={e=>coord(val.coords)} className="tinvoice" style={{cursor:'pointer'}} >View Route</div></h6>
                                     
                                    </div>
                                </>
                            ))

                            }

  
                        </div>
                    </div>
</>

:
                   <Mapview
                   props={{
                    user: cords,
                

                }} 
                   />
}
</div>

:
        <>
            {i === 0 &&
                <>
                    <div className={aduser}>
                        <div className="subadduser">
                            <div className="addskill">

                                <div className="inputname">
                                    <input onChange={e => setskillname(e.target.value)} type="text" />

                                </div>
                                <button className='man' onClick={e => addskills()}>
                                    Add Skill
                                </button>

                                <button className='manb man' onClick={e => setaduser('adduser2')}>
                                    Cancel
                                </button>



                            </div>
                            <div className="ptabled">
                                <div className="tabled">
                                    <div className="headerd">
                                        Skills

                                    </div>
                                    <div className="headerr">
                                        {skildata && skildata.map((val) => (
                                            <h1>{val.name} <AiFillDelete onClick={e => deleteskill(val._id)} className='deletebin' /> </h1>
                                        ))

                                        }
                                    </div>


                                </div>
                            </div>

                        </div>
                    </div>
                    <div className={adduser}>
                        <div className="subadduser jubadduser hadduser">

                <IoClose className='iov' onClick={e=>setadduserx('adduser2')} />
                            {/*      <div className="inputname">
                    <h1>User type</h1>
                  <div  className="subrad">
                  <input onClick={e=>setusertype('user')}  checked={usertype==='user'}  type="radio" />
<p onClick={e=>setusertype('user')}>Site user</p>
<input onClick={e=>setusertype('supervisor')}  checked={usertype==='supervisor'}  type="radio" />
<p onClick={e=>setusertype('supervisor')}>Site Supervisor</p>
                  </div>
                </div>
    */}

                            {usertype === 'user' &&
                                <>
                                  <div className="prcs prcs2">
                <div className="circ1x">
                  <div className="cbge">
                    1
                  </div>
<h1>User Details</h1>
               
                </div>
               
                {steps>=1
                ?
            
                <div className="circ1x">
                 <div className="cbge">
                    2
                  </div>
<h1>Company Details</h1>
             
                </div>:
                
                <div className="grcirc1x">
                     <div className="cbge">
                    2
                  </div>
                    <h1>Company Details</h1>
                </div>}
                

                {steps>=2
                ?
            
                <div className="circ1x">
                     <div className="cbge">
                    3
                  </div>
<h1>Address</h1>
                </div>:
                
                <div className="grcirc1x">
             <div className="cbge">
                    3
                  </div>
<h1>Address</h1>
                </div>}
               
                {steps>=3
                ?
            
                <div className="circ1x">
                   <div className="cbge">
                    4
                  </div>
<h1>Taxes</h1>
                
                </div>:
                
                <div className="grcirc1x ">
               <div className="cbge">
                    4
                  </div>
                    <h1>Taxes</h1>
            
                </div>}
              </div>
                                   {steps===0?
                                   <> 
                                
                                   <div className="inpex inpexnew">
                                   <h1>Name</h1>
                                   <input value={name} onBlur={e => generateid()} onChange={e => setname(e.target.value)} type="text" />
                                   {checkinfo&&steps===0&&!name&&
                                   <h6 className='redinfo'>Name is required</h6>

                                 }
                               </div>

                               <div className="inpex inpexnew">
                                   <h1>Id no.</h1>
                                   <input value={idno} type="text" />

                               </div>
                               <div className="inpex inpexnew">
                                   <h1>Email</h1>
                                   <input value={email} type="text" onChange={e => setemail(e.target.value)} />
                                 {checkinfo&&steps===0&&!email&&
                                   <h6 className='redinfo'>Email is required</h6>

                                 }

                               </div>
                               <div className="inpex inpexnew">
                                   <h1>Password</h1>
                                   <input value={password} type="text" onChange={e => setpassword(e.target.value)} />
                                   {checkinfo&&steps===0&&!password&&
                                   <h6 className='redinfo'>Password is required</h6>

                                 }
                               </div></>:steps===1?
                               <> 
                         
                                <div className="inpex inpexnew">
                               <h1>Company</h1>



                               {
                                   actiontype === 'update' ?

                                       <select className='select2' name="cars" id="cars"  onChange={e => setclientx(e.target.value)}>
                                           <>
                                               <option value={client}>{client}</option>
                                               {
                                                   clients && clients.map(val => (
                                                       val.username !== client &&
                                                       <option value={val.username+'4x3cd'+val._id}>{val.username}</option>
                                                   ))
                                               }
                                           </>
                                       </select>
                                       :

                                       <select className='select2' name="cars" id="cars"  onChange={e => setclientx(e.target.value)}>

                                           {
                                               clients && clients.map(val => (
                                                <option value={val.username+'4x3cd'+val._id}>{val.username}</option>
                                               ))
                                           }
                                       </select>
                               }



                           </div>
                           <div className="inpexs22 inpex inpexnew">
                               <h1>Skill</h1>

                               <select className='select2' name="cars" id="cars" value={skill} onChange={e => setskill(e.target.value)}>

                                   {
                                       skildata && skildata.map(val => (
                                           <>

                                               <option value={val.name}>{val.name}</option>
                                           </>
                                       ))
                                   }
                               </select>



                           </div> <div className="inpex inpexnew inpexs">
                               <h1>Status</h1>

                               <select  className='select2' name="cars" id="cars" value={status} onChange={e => setstatus(e.target.value)}>
                                   <option value="Active">Active</option>
                                   <option value="Inactive">Inactive</option>
                               </select>



                           </div>
                           <div className="inpexs222 inpex inpexnew">
                               <h1>Pay rate (per/hr)</h1>
                               <input value={pr} type="number" onChange={e => setpr(e.target.value)} />
                               {checkinfo&&steps===1&&!pr&&
                                   <h6 className='redinfo'> Enter Pay rate</h6>

                                 }
                           </div>

                           <div className="inpexs222 inpex inpexnew">
                               <h1>OT Pay rate (per/hr)</h1>
                               <input value={pr && parseFloat(pr) + parseFloat(pr) / 2} type="number" onChange={e => setotpr(e.target.value)} />
        
                           </div>     <div className="inpexs222 inpexnew inpex">
                               <h1>Custom Pay rate</h1>
                               <input  type="number"  onChange={e=>setcpr(e.target.value)} value={cpr} />
        
                           </div>
                           
                           </>
                           
                           :steps===2?
                               <>  
                            
                                 <div className={inpex}>
                               <h1>Address</h1>
                               <input value={address} type="text" onChange={e => setaddress(e.target.value)} />
                               {checkinfo&&steps===2&&!latlang&&
                                   <h6 className='redinfo'>Map location is required for Geo fencing</h6>

                                 }
                           </div>
                           <div className={inpex}>

                           <button onClick={e=>ddd()}>Choose from map</button>
                           </div>
                           <div className={inpex}>
                               <h1>Phone:</h1>
                               <input value={phone} type="text" onChange={e => setphone(e.target.value)} />

                           </div>
                           <div className={inpex}>

                           </div>
                           {steps===2&&
                           <div className={mapx} ref={mapContainer2}></div>
                                    
                                    

                           }
                                  
                                   
                           
                           </>
                           :<>
                   
                           <div className="inpex">
                                        <h1>W - 9 s:  </h1>
                                        <div className={taxes} onClick={e => turnon()}>
                                            <div className={circle}>

                                            </div>
                                        </div>

                                    </div>
                                    <div className="inpex">
                                        <h1>W - 4:  </h1>
                                        <div className={taxes2} onClick={e => turnon2()}>
                                            <div className={circle2}>

                                            </div>
                                        </div>

                                    </div>
                                    <div className="inpex">
                                        <h1>Daily Pay:  </h1>
                                        <div className={taxes4} onClick={e => turnon4()}>
                                            <div className={circle4}>

                                            </div>
                                        </div>
                                      {taxes4==='taxes2'&&
                                        <input type="number" onChange={e=>setamountd(e.target.vlue)} placeholder='Enter Amount ($)' />


                                      }
                                    </div>
                                    <div className="inpex">
                                        <h1>Supervisor access:  </h1>
                                        <div className={taxes5} onClick={e => turnon5()}>
                                            <div className={circle5}>

                                            </div>
                                        </div>
                                      {taxes5==='taxes2'&&
       <select className='select2' name="cars" id="cars"value={supersite}  onChange={e => setsupersite(e.target.value)}>

       {
           sites && sites.map(val => (
            clientidd===val.clientid&&
            <option value={val._id}>{val.sitename}</option>
           ))
       }
   </select>
                                      }
                                    </div>

                           </>
                                   }
                                
                                
                                   


                                    <div className="inputname"></div>
                                    
                                    <div className="inputname"></div>
                                    <div className="inpex2">

                                        {mapx==='mapx'||mapx==='mapx3'?
<>

<button className='btg' onClick={e=>steps>0?setsteps(steps=>steps-1):""}><HiArrowLeft className='btgp'/> Back</button>

<button onClick={e=>steps<3?setstepscheck():req()} className='btn1'>{steps<3?"Next":"Finish"}</button>
</>
                                        :

<button onClick={e=>setmapxs()} className='btn1 upplit'>{steps<3?"Save":"Done"}</button>


                                        }
                </div>
                                </>

                            }

                            {usertype === 'supervisor' &&
                                <>
                                    <div className="inputname">
                                        <h1>Name</h1>
                                        <input value={supername} onChange={e => setsupername(e.target.value)} type="text" />

                                    </div>
                                    <div className="inputname">
                                        <h1>Email</h1>
                                        <input value={superemail} onChange={e => setsuperemail(e.target.value)} type="text" />

                                    </div>  <div className="inputname">
                                        <h1>Password</h1>
                                        <input value={superpass} onChange={e => setsuperpass(e.target.value)} type="text" />

                                    </div>


                                    <div className="inputname">
                                        <h1>Project</h1>




                                        <select name="cars" id="cars" onChange={e => clientx(e.target.value)}>

                                            <option value=''>Choose Project</option>
                                            {
                                                sites && sites.map(val => (
                                                    <option value={val.sitename + 'xcv4' + val._id}>{val.sitename}</option>
                                                ))
                                            }
                                        </select>



                                    </div>
                                    <div className="inputname">
                                        <h1>Status</h1>

                                        <select name="cars" id="cars" value={sstatus} onChange={e => setsstatus(e.target.value)}>
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>



                                    </div>

                                    <div className="inputname">
                                        <h1>Address</h1>
                                        <input value={sadd} type="text" onChange={e => setsadd(e.target.value)} />

                                    </div>
                                    <div className="inputname">
                                        <h1>Phone:</h1>
                                        <input value={sphone} type="text" onChange={e => setsphone(e.target.value)} />

                                    </div>

                                    <div className="inputname"></div>
                                    <div className="inputname"></div>
                                    <button onClick={e => reqx()} className='btn1'>Submit</button>
                                    <button onClick={e => closewin()} className='btn2'>Cancel</button>

                                </>

                            }



                        </div>

                    </div>
                </>

            }
            <div className="sitemap">
             

                <div className="newst nbst" style={{marginTop:'20px'}}>
                <div className="newst1" style={{
                    display:'flex'
                }}>
                {searchby==='name'?
                   <div className="sero">
                   <input type="text" placeholder='Search..' onChange={e=>setsearchval(e.target.value)}/>
                   <select className='select2i'  value={searchby} name="cars" id="cars"  onChange={e => setsearchby(e.target.value)}>
                                    
                                    <option value='name'>By Name</option>
                                    <option value='company'>By Company</option>

                                    </select>
                   </div>
                :
             
                <button className='light hglight mlight' style={{position:'relative'}} onClick={e=>boxfixed?setboxfixed(false):setboxfixed(true)}>{currcom?currcom.username:'Choose Company'}  <FaCaretDown className='fac' /> 

<select className='select2i'  value={searchby} name="cars" id="cars"  onChange={e => setsearchby(e.target.value)}>
                                    
                                               <option value='name'>By Name</option>
                                               <option value='company'>By Company</option>

                                               </select>
                {
                    
                boxfixed&&<div className="boxfixed" >
                <input type="text" onClick={e=>e.stopPropagation()}  onChange={e=>setsearchvala(e.target.value)} placeholder='Search project' />
            {searchval.length===0&&clients&&clients.map(val=>(
            <>
            <div className="headertablenewx" onClick={e=>setcurrcom(val)}  >
                <div className="rond">
                    {val.username.charAt(0)}
                </div>
            <h1 style={{width:"100%"}}>
                
                {val.username}</h1>
            
            
            </div>
            </>
            ))
            
            }
            </div>
            }
                </button>
          
                }
                    <button className='deleter' onClick={e=>deleteuser()}> Delete</button>
                    <button onClick={e=>setadduser('adduser')}>+ Create User</button>

                    <button  className='hideonmobile'  onClick={e => openskil()} >+ Add Skills</button>
                  
<button  className='hideonmobile'   onClick={e => exports()} > Export</button>
                </div>
                <div className="newst2">
                    
                {
                        
                        showusers === 'users'?

                    <button className='whitech'>Users</button>:

                    <button onClick={e=>setshowusersx('users')}  className='purplech'>Users</button>
                    }
                     {
                     showusers === 'supervisors'?

                    <button className='whitech'>Supervisors</button>:

                    <button onClick={e=>setshowusersx('supervisors')}  className='purplech'>Supervisors</button>
                    }
                     
                </div>
            </div>
           
         


                {showusers === 'users' &&

<div className="newst">

<div className="tablerow hideonmobile table2f " >
                           <div className="headertable clop sticky">
                                <span className='sxx'><input type="checkbox" checked={o === 1} onClick={e => fillall()} /> </span>

                                <h4 style={{ width: "80px" }}>No.</h4>


                                <h2 style={{ paddingLeft: '5px' }}>Staff</h2>
                       

                                <h6>Skill</h6>

                                <h6 style={{width:250}} >Company</h6>
                                <h6>Phone</h6>


                            </div>
                        <div className="subtable">
                         
                            {searchval.length > 0 && searchby === 'name' && data && data.map(val => (
                                val.name.toLowerCase().search(searchval.toLowerCase()) >= 0 &&
                                <>
                                    <div className="headertable" onClick={e=>selectthis(val)}>
                                        <span className='sxx'> <input type="checkbox" checked={ids.search(val._id) >= 0} onClick={e => ids.search(val._id) >= 0 ? setids(ids.replace(val._id + '4sd', '')) : setids(ids + val._id + '4sd')} /> </span>

                                        <h4 style={{ width: "80px" }}>{val.idno}</h4>
                                        {ids.search(val._id) >= 0 ?


                                            <h2 className='blackmark' style={{ marginLeft: '5px' }}>{val.name}</h2>
                                            :

                                            <h2 style={{ marginLeft: '5px' }}>{val.name}</h2>

                                        }
                                  
                                        <h6 ><div className="tinvoice">{val.skill}</div></h6>

                                        <h6 style={{width:250}} >{val.client}</h6>
                                        <h6>{val.phone&&formatPhoneNumber(val.phone)}</h6>
                                    

                                    </div>
                                </>
                            ))

                            }
                            {currcom && searchby === 'company' && data && data.map(val => (
                                val.clientid.toLowerCase().search(currcom._id.toLowerCase()) >= 0 &&
                                <>
                                    <div className="headertable" onClick={e=>selectthis(val)}>
                                        <span className='sxx'> <input type="checkbox" checked={ids.search(val._id) >= 0} onClick={e => ids.search(val._id) >= 0 ? setids(ids.replace(val._id + '4sd', '')) : setids(ids + val._id + '4sd')} /> </span>

                                        <h4 style={{ width: "80px" }}>{val.idno}</h4>
                                        {ids.search(val._id) >= 0 ?


                                            <h2 className='blackmark' style={{ marginLeft: '5px' }}>{val.name}</h2>
                                            :

                                            <h2 style={{ marginLeft: '5px' }}>{val.name}</h2>

                                        }
                                     
                                        <h6 ><div className="tinvoice">{val.skill}</div></h6>

                                        <h6 style={{width:250}} >{val.client}</h6>
                                        <h6>{val.phone&&formatPhoneNumber(val.phone)}</h6>


                                    </div>
                                </>
                            ))

                            }
                            {searchval.length === 0 &&searchby==='name'&& currentItems && currentItems.map(val => (

                                <>
                                    <div className="headertable" onClick={e=>selectthis(val)}>
                                        <span className='sxx'> <input type="checkbox" checked={ids.search(val._id) >= 0} onClick={e => ids.search(val._id) >= 0 ? setids(ids.replace(val._id + '4sd', '')) : setids(ids + val._id + '4sd')} /> </span>

                                        <h4 style={{ width: "80px" }}>{val.idno}</h4>
                                        {ids.search(val._id) >= 0 ?


                                            <h2 className='blackmark' style={{ marginLeft: '5px' }}>{val.name}</h2>
                                            :

                                            <h2 style={{ marginLeft: '5px' }}>{val.name}</h2>

                                        }
                                    
                                        <h6 ><div className="tinvoice">{val.skill}</div></h6>

                                        <h6 style={{width:250}} >{val.client}</h6>
                                        <h6>{val.phone&&formatPhoneNumber(val.phone)}</h6>
                                     
                                    </div>
                                </>
                            ))

                            }

  <div className="tablerowp">
  {
    searchval.length<=0&&
    <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
          />
  }
  </div>
                        </div>
                    </div>
                    {!kshow&&data&&data.map(val=>(
    <div className="cardlx hideondesk" onClick={e=>selectthis2(val)}>
        <div className="topcardlx">
        <div className="bcircle birclex">
        {
            val.imgurl?
            <img className='imgur' src={val.imgurl} alt="" />
            
            :

            <HiUser className='fabv' />
        }
       

        </div>
        <div className="detailsx">
            <h1>{val.name?val.name:'No Name'}</h1>
            <p>
                {val.skill&&val.skill.substring(0,20)}
            </p>
      
        </div>

        </div>
    </div>
))

}

    <div className="comdet2 hideonmobile">
    {currone?
      <>  <div className="penh" onClick={e=>updateuser()
        }>
            <FaPencilAlt className='fadd' />

        </div>
        <h1>User info</h1>
   
        <div className="divx divcf">
       <div className="bcircle">
     <div className="iconcha">
     <AiFillCamera className='iconchai' />
     <input type="file" onChange={e=>fileupload(e.target.files[0])} />
     </div>
        {
            currone.imgurl2?
            <img className='imgur' src={currone.imgurl2} alt="" />
            
            : currone.imgurl?
            <img className='imgur' src={currone.imgurl} alt="" />
            
            :

            <HiUser className='fabv' />
        }

        </div>
    <div className="divxinfo">
    <p>{currone.name}</p>
        <p className='sklx'>{currone.skill}</p>

{

}
{
    !loading?
    <p className='sklo' onClick={e=>showtravel()}>Travel logs</p>
    :
    <Loader />
}
    
    </div>
       </div>
    
       <div className="divx2">
        <div className="prt prt2">
<h1>{currone.payrate} $</h1>
<p>Pay rate</p>
        </div>
        <div className="prt prt2">
<h1>{currone.cpr} $</h1>
<p>Custom Pay rate</p>
        </div>
        <div className="prt">
        <h1>{currone.otpayrate} $</h1>
<p>OT Pay rate</p>
        </div>
       </div>
       <div className="cinfo cinfocol"  >
     <div className="mdl2">
     <BsBuilding className='mdl' />
     </div>
       <div className="cinfo">
       <h1>
    Company </h1>
        <p>{currone.client}</p>
       </div>
    
       </div>
       <div className="cinfo cinfocol"  >
     <div className="mdl2">
     <FaPhone className='mdl' />
     </div>
       <div className="cinfo">
       <h1>
    Phone </h1>
        <p>{currone.phone&&formatPhoneNumber(currone.phone)}</p>
       </div>
    
       </div>
    
       <div className="cinfo cinfocol"  >
     <div className="mdl2">
     <HiOutlineMail className='mdl' />
     </div>
       <div className="cinfo">
       <h1>
    Email </h1>
        <p>{currone.email}</p>
       </div>
    
       </div>
     
       <div className="cinfo cinfocol"  >
     <div className="mdl2">
     <IoLockClosedOutline className='mdl' />
     </div>
       <div className="cinfo">
       <h1>
    Password </h1>
        <p>{currone.password}</p>
       </div>
    
       </div>
    
       <div className="badge">
        {currone.status}
       </div>
       </>
       :
       <div className="divx">
       
        <p>Select Company to view</p>
       </div> }

    </div>
    {
        kshow&&

    <div className="comdet2 ">
    {currone?
      <>  <div className="penh botonm" onClick={e=>setkshow(false)
        }>
            <IoClose className='fadd' />

        </div>
        <h1>User info</h1>
   
        <div className="divx">
       <div className="bcircle">
        {
            currone.imgurl?
            <img className='imgur' src={currone.imgurl} alt="" />
            
            :

            <HiUser className='fabv' />
        }

        </div>
        <p>{currone.name}</p>
        <p className='skl'>{currone.skill}</p>
       </div>
       <div className="divx2">
        <div className="prt prt2">
<h1>{currone.payrate} $</h1>
<p>Pay rate</p>
        </div>
        <div className="prt">
        <h1>{currone.otpayrate} $</h1>
<p>OT Pay rate</p>
        </div>
       </div>
       <div className="cinfo">
        <h1>
            <MdLocationOn className='mdl' />Company </h1>
        <p>{currone.client}</p>
       </div>
       <div className="cinfo">
        <h1>
            <MdLocationOn className='mdl' />Phone</h1>
        <p>{currone.phone}</p>
       </div>
       <div className="cinfo">
        <h1>
            <MdLocationOn className='mdl' />Email </h1>
        <p>{currone.email}</p>
       </div>
       <div className="cinfo">
        <h1>
            <MdLocationOn className='mdl' />Password </h1>
        <p>{currone.password}</p>
       </div>
       <div className="badge">
        {currone.status}
       </div>
       </>
       :
       <div className="divx">
       
        <p>Select Company to view</p>
       </div> }

    </div>
    }
</div>

                }
                {showusers === 'supervisors' &&
<>
<div className="newst">

<div className="tablerow hideonmobile table2f " >
                           <div className="headertable clop sticky">
                                <span className='sxx'><input type="checkbox" checked={o === 1} onClick={e => fillall()} /> </span>

                                <h4 style={{ width: "80px" }}>No.</h4>


                                <h2 style={{ paddingLeft: '5px' }}>Staff</h2>
                       

                                <h6>Skill</h6>

                                <h6 style={{width:250}} >Company</h6>
                                <h6>Phone</h6>


                            </div>
                        <div className="subtable">
                         
                            {searchval.length > 0 && searchby === 'name' && data && data.map(val => (
                                val.name.toLowerCase().search(searchval.toLowerCase()) >= 0 &&
                                <>
                                    <div className="headertable" onClick={e=>selectthis(val)}>
                                        <span className='sxx'> <input type="checkbox" checked={ids.search(val._id) >= 0} onClick={e => ids.search(val._id) >= 0 ? setids(ids.replace(val._id + '4sd', '')) : setids(ids + val._id + '4sd')} /> </span>

                                        <h4 style={{ width: "80px" }}>{val.idno}</h4>
                                        {ids.search(val._id) >= 0 ?


                                            <h2 className='blackmark' style={{ marginLeft: '5px' }}>{val.name}</h2>
                                            :

                                            <h2 style={{ marginLeft: '5px' }}>{val.name}</h2>

                                        }
                                  
                                        <h6 ><div className="tinvoice">{val.skill}</div></h6>

                                        <h6 style={{width:250}} >{val.client}</h6>
                                        <h6>{val.phone&&formatPhoneNumber(val.phone)}</h6>
                                    

                                    </div>
                                </>
                            ))

                            }
                            {currcom && searchby === 'company' && data && data.map(val => (
                                val.supermode&&val.supermode==='true'&&
                                val.clientid.toLowerCase().search(currcom._id.toLowerCase()) >= 0 &&
                                <>
                                    <div className="headertable" onClick={e=>selectthis(val)}>
                                        <span className='sxx'> <input type="checkbox" checked={ids.search(val._id) >= 0} onClick={e => ids.search(val._id) >= 0 ? setids(ids.replace(val._id + '4sd', '')) : setids(ids + val._id + '4sd')} /> </span>

                                        <h4 style={{ width: "80px" }}>{val.idno}</h4>
                                        {ids.search(val._id) >= 0 ?


                                            <h2 className='blackmark' style={{ marginLeft: '5px' }}>{val.name}</h2>
                                            :

                                            <h2 style={{ marginLeft: '5px' }}>{val.name}</h2>

                                        }
                                     
                                        <h6 ><div className="tinvoice">{val.skill}</div></h6>

                                        <h6 style={{width:250}} >{val.client}</h6>
                                        <h6>{val.phone&&formatPhoneNumber(val.phone)}</h6>


                                    </div>
                                </>
                            ))

                            }
                            {searchval.length === 0 && searchby === 'name'&& data && data.map(val => (
val.supermode&&val.supermode==='true'&&
                                <>
                                    <div className="headertable" onClick={e=>selectthis(val)}>
                                        <span className='sxx'> <input type="checkbox" checked={ids.search(val._id) >= 0} onClick={e => ids.search(val._id) >= 0 ? setids(ids.replace(val._id + '4sd', '')) : setids(ids + val._id + '4sd')} /> </span>

                                        <h4 style={{ width: "80px" }}>{val.idno}</h4>
                                        {ids.search(val._id) >= 0 ?


                                            <h2 className='blackmark' style={{ marginLeft: '5px' }}>{val.name}</h2>
                                            :

                                            <h2 style={{ marginLeft: '5px' }}>{val.name}</h2>

                                        }
                                    
                                        <h6 ><div className="tinvoice">{val.skill}</div></h6>

                                        <h6 style={{width:250}} >{val.client}</h6>
                                        <h6>{val.phone&&formatPhoneNumber(val.phone)}</h6>
                                     
                                    </div>
                                </>
                            ))

                            }

  
                        </div>
                    </div>
                    {!kshow&&data&&data.map(val=>(
    <div className="cardlx hideondesk" onClick={e=>selectthis2(val)}>
        <div className="topcardlx">
        <div className="bcircle birclex">
        {
            val.imgurl?
            <img className='imgur' src={val.imgurl} alt="" />
            
            :

            <HiUser className='fabv' />
        }
       

        </div>
        <div className="detailsx">
            <h1>{val.name?val.name:'No Name'}</h1>
            <p>
                {val.skill&&val.skill.substring(0,20)}
            </p>
      
        </div>

        </div>
    </div>
))

}

    <div className="comdet2 hideonmobile">
    {currone?
      <>  <div className="penh" onClick={e=>updateuser()
        }>
            <FaPencilAlt className='fadd' />

        </div>
        <h1>User info</h1>
   
        <div className="divx divcf">
       <div className="bcircle">
     <div className="iconcha">
     <AiFillCamera className='iconchai' />
     <input type="file" onChange={e=>fileupload(e.target.files[0])} />
     </div>
        {
            currone.imgurl2?
            <img className='imgur' src={currone.imgurl2} alt="" />
            
            : currone.imgurl?
            <img className='imgur' src={currone.imgurl} alt="" />
            
            :

            <HiUser className='fabv' />
        }

        </div>
    <div className="divxinfo">
    <p>{currone.name}</p>
        <p className='sklx'>{currone.skill}</p>

{

}
{
    !loading?
    <p className='sklo' onClick={e=>showtravel()}>Travel logs</p>
    :
    <Loader />
}
    
    </div>
       </div>
    
       <div className="divx2">
        <div className="prt prt2">
<h1>{currone.payrate} $</h1>
<p>Pay rate</p>
        </div>
        <div className="prt prt2">
<h1>{currone.cpr} $</h1>
<p>Custom Pay rate</p>
        </div>
        <div className="prt">
        <h1>{currone.otpayrate} $</h1>
<p>OT Pay rate</p>
        </div>
       </div>
       <div className="cinfo cinfocol"  >
     <div className="mdl2">
     <BsBuilding className='mdl' />
     </div>
       <div className="cinfo">
       <h1>
    Company </h1>
        <p>{currone.client}</p>
       </div>
    
       </div>
       <div className="cinfo cinfocol"  >
     <div className="mdl2">
     <FaPhone className='mdl' />
     </div>
       <div className="cinfo">
       <h1>
    Phone </h1>
        <p>{currone.phone&&formatPhoneNumber(currone.phone)}</p>
       </div>
    
       </div>
    
       <div className="cinfo cinfocol"  >
     <div className="mdl2">
     <HiOutlineMail className='mdl' />
     </div>
       <div className="cinfo">
       <h1>
    Email </h1>
        <p>{currone.email}</p>
       </div>
    
       </div>
     
       <div className="cinfo cinfocol"  >
     <div className="mdl2">
     <IoLockClosedOutline className='mdl' />
     </div>
       <div className="cinfo">
       <h1>
    Password </h1>
        <p>{currone.password}</p>
       </div>
    
       </div>
    
       <div className="badge">
        {currone.status}
       </div>
       </>
       :
       <div className="divx">
       
        <p>Select Company to view</p>
       </div> }

    </div>
    {
        kshow&&

    <div className="comdet2 ">
    {currone?
      <>  <div className="penh botonm" onClick={e=>setkshow(false)
        }>
            <IoClose className='fadd' />

        </div>
        <h1>User info</h1>
   
        <div className="divx">
       <div className="bcircle">
        {
            currone.imgurl?
            <img className='imgur' src={currone.imgurl} alt="" />
            
            :

            <HiUser className='fabv' />
        }

        </div>
        <p>{currone.name}</p>
        <p className='skl'>{currone.skill}</p>
       </div>
       <div className="divx2">
        <div className="prt prt2">
<h1>{currone.payrate} $</h1>
<p>Pay rate</p>
        </div>
        <div className="prt">
        <h1>{currone.otpayrate} $</h1>
<p>OT Pay rate</p>
        </div>
       </div>
       <div className="cinfo">
        <h1>
            <MdLocationOn className='mdl' />Company </h1>
        <p>{currone.client}</p>
       </div>
       <div className="cinfo">
        <h1>
            <MdLocationOn className='mdl' />Phone</h1>
        <p>{currone.phone}</p>
       </div>
       <div className="cinfo">
        <h1>
            <MdLocationOn className='mdl' />Email </h1>
        <p>{currone.email}</p>
       </div>
       <div className="cinfo">
        <h1>
            <MdLocationOn className='mdl' />Password </h1>
        <p>{currone.password}</p>
       </div>
       <div className="badge">
        {currone.status}
       </div>
       </>
       :
       <div className="divx">
       
        <p>Select Company to view</p>
       </div> }

    </div>
    }
</div>

              {/*     <div className="newst">
                     <div className="tablerow   tablef">
                        <div className="subtable">
                            <div className="headertable clop">
                                <span className='sxx'><input type="checkbox" checked={o === 1} onClick={e => fillall()} /> </span>

                                <h4 style={{ width: "40px" }}>No.</h4>


                                <h2 style={{ paddingLeft: '5px' }}>Name</h2>

                                <h2 style={{ paddingLeft: '5px' }}>Email</h2>
                                <h2 style={{ paddingLeft: '5px' }}>Password</h2>
                                <h1>Project</h1>

                                <h6>Adress</h6>

                                <h6>Phone</h6>
                                <h3 style={{ width: "70px" }}>Status</h3>


                            </div>
                            {supervisors && supervisors.map((val, index) => (
                                <>
                                    <div className="headertable" onClick={e=>setcurrone2(val)}>
                                        <span className='sxx'> <input type="checkbox" checked={ids.search(val._id) >= 0} onClick={e => ids.search(val._id) >= 0 ? setids(ids.replace(val._id + '4sd', '')) : setids(ids + val._id + '4sd')} /> </span>

                                        <h4 style={{ width: "40px" }}>{index + 1}</h4>
                                        <h2 style={{ marginLeft: '5px' }}>{val.name}</h2>

                                        <h2 style={{ marginLeft: '5px' }}>{val.email}</h2>

                                        <h2 style={{ marginLeft: '5px' }}>{val.pass}</h2>
                                        <h1> {val.sitename}</h1>

                                        <h6 >{val.address}</h6>

                                        <h6>{val.phone}</h6>
                                        <h3 style={{ width: "70px" }} >{val.status}</h3>



                                    </div>
                                </>
                            ))

                            }
                        </div>
                    </div>




<div className="comdet">
{currone2?
      <>  <div className="penh" onClick={e=>updateuser()
        }>
            <FaPencilAlt className='fadd' />

        </div>
        <h1>User info</h1>
   
        <div className="divx">
       <div className="bcircle">
        {
            currone2.imgurl?
            <img className='imgur' src={currone2.imgurl} alt="" />
            
            :

            <HiUser className='fabv' />
        }

        </div>
        <p>{currone2.name}</p>
        <p className='skl'>{currone2.skill}</p>
       </div>
  
       <div className="cinfo">
        <h1>
            <MdLocationOn className='mdl' />Project </h1>
        <p>{currone2.sitename}</p>
       </div>
       <div className="cinfo">
        <h1>
            <MdLocationOn className='mdl' />Phone</h1>
        <p>{currone2.phone}</p>
       </div>
       <div className="cinfo">
        <h1>
            <MdLocationOn className='mdl' />Email </h1>
        <p>{currone2.email}</p>
       </div>
       <div className="cinfo">
        <h1>
            <MdLocationOn className='mdl' />Password </h1>
        <p>{currone2.password}</p>
       </div>
       <div className="badge">
        {currone2.status}
       </div>
       </>
       :
       <div className="divx">
       
        <p>Select Company to view</p>
       </div> }
</div>
                   </div>
    */} 
    </>}

            </div></>
            }
            </>
    )
}

export default Siteemp