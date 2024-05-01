import React, { useState } from 'react'
import 'react-calendar/dist/Calendar.css';
import ReactPaginate from 'react-paginate';
import { FaArrowLeft, FaBuilding } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import XLSX from 'sheetjs-style'
import jsPDF from 'jspdf';
import * as file from 'file-saver'
import { HiArrowLeft } from 'react-icons/hi'
import axios from 'axios'
import { MdDelete, MdLocationOn } from 'react-icons/md'
import { useEffect } from 'react';
import { FaPencilAlt } from 'react-icons/fa'
import ana from '../../../images/ana.svg'
import inv from '../../../images/inv.svg'
import Tasks from '../Jobsite/Tasks';
import { addNewClient, deleteClientData, getActiveClients, getAllClients, getInActiveClients, updateClient, updateClientFunds } from '../../../Utils/api';
import { mapboxToken } from '../../../Utils/mapboxToken';

const Client = ({ props }) => {
    const [adduser, setadduser] = useState('adduser2')
    const [selected, setselected] = useState('active')
    const [actiontype, setactiontype] = useState('edit')
    const [depts, setdepts] = useState([])
    const [deptname, setdeptname] = useState('')
    const [deptemail, setdeptemail] = useState('')
    const [deptpass, setdeptpass] = useState('')
    const [username, setusername] = useState('')
    const [address, setaddress] = useState('')
    const [terms, setterms] = useState('')
    const [phone, setphone] = useState('')
    const [cty, setcty] = useState('')
    const [zip, setzip] = useState('')
    const [state, setstate] = useState('')
    const [ids, setids] = useState('')
    const [idb, setidb] = useState('')
    const [invoicemenu, setinvoicemenu] = useState()
    const [loadding, setloadding] = useState(false)
    const [userd, setuserd] = useState()
    const [currone, setcurrone] = useState()
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + 10;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const [currentItems, setcurrentItems] = useState([])
    const [pageCount, setpageCount] = useState(0)
    const [userd2, setuserd2] = useState([])
    const [pending, setpending] = useState(0)
    const [searchval, setsearchval] = useState('')
    const [cleared, setcleared] = useState(0)
    const [paid, setpaid] = useState(0)
    const [balance, setbalance] = useState(0)
    const [totalx, settotalx] = useState(0)
    const [invoice, setinvoice] = useState(0)
    const [invoicedata, setinvoicedata] = useState()
    const [i, seti] = useState(1)
    const [amount, setamount] = useState(0)
    const [status, setstatus] = useState('')
    const [markup, setmarkup] = useState(0)
    const [itemOffset2, setItemOffset2] = useState(0);
    const endOffset2 = itemOffset2 + 10;
    console.log(`Loading items from ${itemOffset2} to ${endOffset2}`);
    const [currentItems2, setcurrentItems2] = useState([])
    const [pageCount2, setpageCount2] = useState(0)
    const [c, setc] = useState(0)
    const [subpart, setsubpart] = useState('task')
    const [transacid, settransacid] = useState('')
    const [cstatus, setcstatus] = useState('Active')
    const [weekend, setweekend] = useState('0')
    const [steps, setsteps] = useState(0)
    const [adminrights, setadminrights] = useState('Allowed')
    function submit() {
        if (actiontype === 'edit') {
            var postData = {

                username: username,
                address: address + "\n" + cty + " " + state + " " + zip, number: phone,
                terms: terms,
                depts: depts,
                markup: markup,
                status: cstatus,
                weekend: weekend,
                adminrights:adminrights,
            }
            addNewClient(postData).then(res => {
                console.log(res)

            }).then(() => {
                setadduser('adduser2')
                setsteps(0)
                if (selected === 'active') {
                    getActiveClients().then(res2 => {
                        console.log(res2)
                        setuserd(res2.Client)

                        setcurrentItems(res2.Client.slice(itemOffset, endOffset))
                        setpageCount(Math.ceil(res2.Client.length / 10))
                        setadduser('adduser2')
                        setsteps(0)
                    })
                } else if (selected === 'Pending') {
                    getInActiveClients().then(res2 => {
                        console.log(res2)
                        setuserd2(res2.Client)

                        setcurrentItems2(res2.Client.slice(itemOffset2, endOffset2))
                        setpageCount2(Math.ceil(res2.Client.length / 10))
                        setadduser('adduser2')
                        setsteps(0)
                    })
                }
            })
        }
        else {
            setloadding(true)
            console.log('hy')
            setactiontype('edit')
            setcurrone(null)
            var postData = {

                username: username,
                address: address + "\n" + cty + " " + state + " " + zip, number: phone,
                terms: terms,
                depts: depts,
                markup: markup,
                status: cstatus,
                _id: idb,
                weekend: weekend,
                adminrights:adminrights,
            }
            updateClient(postData).then(res => {
                console.log(res)

            }).then(() => {

                if (selected === 'active') {
                    getActiveClients().then(res2 => {
                        console.log(res2)
                        setuserd(res2.Client)
                        setadduser('adduser2')

                        setsteps(0)
                        setsteps(0)
                        setcurrentItems(res2.Client.slice(itemOffset, endOffset))
                        setpageCount(Math.ceil(res2.Client.length / 10))
                        setadduser('adduser2')
                        setsteps(0)
                        setloadding(false)
                    })
                } else if (selected === 'Pending') {
                    setadduser('adduser2')

                    setsteps(0)
                    setsteps(0)

                    getInActiveClients().then(res2 => {
                        console.log(res2)
                        setuserd2(res2.Client)

                        setcurrentItems2(res2.Client.slice(itemOffset2, endOffset2))
                        setpageCount2(Math.ceil(res2.Client.length / 10))
                        setadduser('adduser2')
                        setsteps(0)

                        setloadding(false)
                    })
                }
            })
        }
    }

    function selectthis(val) {
        setcurrone(val)
    }

    const handlePageClick = (event) => {
        const newOffset = (event.selected * 10) % userd.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );

        setItemOffset(newOffset);

        setcurrentItems(userd.slice(newOffset, newOffset + 10))

    };

    useEffect(() => {
        axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/73.07832,33.69003;72.47081,34.10994?access_token=${mapboxToken}`).then(res => {
            console.log(res)
        })
        getAllClients().then(res => {
            console.log(res)
            setuserd(res.Client)
            setcurrentItems(res.Client.slice(itemOffset, endOffset))
            setpageCount(Math.ceil(res.Client.length / 10))
        })

        return () => {

        }
    }, [])




    const handlePageClick2 = (event) => {
        const newOffset = (event.selected * 10) % userd2.length;
        setItemOffset2(newOffset);
        setcurrentItems2(userd2.slice(newOffset, newOffset + 10))

    };

    useEffect(() => {
        getInActiveClients().then(res => {
            console.log(res)
            setuserd2(res.Client)
            setcurrentItems2(res.Client.slice(itemOffset2, endOffset2))
            setpageCount2(Math.ceil(res.Client.length / 10))
        })

        return () => {

        }
    }, [])


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

    function exports2(preparedata) {
        var tx = []
        var alltotal = 0
        preparedata.invoicedetails.forEach((val, index) => {
            alltotal = alltotal + parseFloat(val.total)
            tx.push({
                empname: val.empname,
                hrs: val.hrs,
                date: preparedata.date,
                payrate: val.payrate,
                othrs: val.othrs,
                otpayrate: val.otpayrate,
                total: val.total,
                skill: val.skill,



            })
            if (preparedata.invoicedetails.length - 1 === index) {

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

                const myHeader = ["date", "empname", 'skill', "hrs", 'payrate', 'othrs', 'otpayrate', 'total'];
                var prd2 = [
                    {

                        empname: "val.Employee",
                        hrs: "val.Hrs",
                        date: "val.Date",
                        payrate: "val.Payrate",
                        othrs: "val.Ot_Hrs",
                        otpayrate: "val.OT_Pay_rate",
                        total: "val.total",
                        skill: "val.skill",
                    }, {

                        empname: "val.Employee",
                        hrs: "val.Hrs",
                        date: "val.Date",
                        payrate: "val.Payrate",
                        othrs: "val.Ot_Hrs",
                        otpayrate: "val.OT_Pay_rate",
                        total: "val.total",
                        skill: "val.skill",
                    }, {

                        empname: "val.Employee",
                        hrs: "val.Hrs",
                        date: "val.Date",
                        payrate: "val.Payrate",
                        othrs: "val.Ot_Hrs",
                        otpayrate: "val.OT_Pay_rate",
                        total: "val.total",
                        skill: "val.skill",
                    }, {

                        empname: "val.Employee",
                        hrs: "val.Hrs",
                        date: "val.Date",
                        payrate: "val.Payrate",
                        othrs: "val.Ot_Hrs",
                        otpayrate: "val.OT_Pay_rate",
                        total: "val.total",
                        skill: "val.skill",
                    },

                ]
                console.log(preparedata.invoicedetails)
                const ws = XLSX.utils.json_to_sheet(prd2, { header: myHeader })


                var wscols = [

                    { wch: 8 },
                    { wch: 13 },
                    { wch: 15 },
                    { wch: 6 },
                    { wch: 6 },
                    { wch: 7 },
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

                var ws3 = XLSX.utils.sheet_add_json(ws,
                    tx
                    , {

                        header: myHeader,
                        skipHeader: false,
                        origin: 'A7'
                    });
                var wsx = XLSX.utils.sheet_add_aoa(ws3, [
                    ["CITY FORCE LLC", '', '', '', '', '', '', ''],

                    [`Date: ${preparedata.date}`, '', '', '', '', '', '', ''],

                    [`Invoice # ${preparedata.no}`, '', '', '', '', '', '1106 W CornWallis Road suite 105', ''],

                    [`Project Number `, '', '', '', '', '', '', ''],

                    [`Project Name: `, '', '', '', '', '', 'Durham N.C 27705', ''],
                    [`Address:`, '', '', '', '', '', 'www.cfi-solutions.com', ''],

                ], {

                    header: ["note"],
                    skipHeader: true,
                    origin: 'A1'
                });

                var ws2 = XLSX.utils.sheet_add_aoa(wsx, [

                    ['', '', , '', , '', 'Total', alltotal],
                    ['', '', "Thanks for your business"],
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
                        ws2[`E${k + 1}`].s = styl2x
                        ws2[`F${k + 1}`].s = cstyl2x
                        ws2[`G${k + 1}`].s = styl2x
                        ws2[`H${k + 1}`].s = styl2x

                    }
                }

                ws2[`C${tx.length + 9}`].s = styleforaddress
                ws2[`G${tx.length + 8}`].s = styleforaddress2
                ws2[`H${tx.length + 8}`].s = styleforaddress2
                const merge = [
                    { s: { r: 0, c: 0 }, e: { r: 0, c: 3 } },
                    { s: { r: 1, c: 0 }, e: { r: 1, c: 3 } },
                    { s: { r: 2, c: 0 }, e: { r: 2, c: 3 } },
                    { s: { r: 3, c: 0 }, e: { r: 3, c: 3 } },
                    { s: { r: 4, c: 0 }, e: { r: 4, c: 3 } },
                    { s: { r: 5, c: 0 }, e: { r: 5, c: 3 } },

                    { s: { r: 1, c: 6 }, e: { r: 1, c: 7 } },
                    { s: { r: 0, c: 6 }, e: { r: 0, c: 7 } },
                    { s: { r: 2, c: 6 }, e: { r: 2, c: 7 } },
                    { s: { r: 3, c: 6 }, e: { r: 3, c: 7 } },
                    { s: { r: 4, c: 6 }, e: { r: 4, c: 7 } },
                    { s: { r: 5, c: 6 }, e: { r: 5, c: 7 } },


                ];
                ws2["!merges"] = merge;
                const wb = { Sheets: { 'data': ws2 }, SheetNames: ['data'] }
                const excelbuffer = XLSX.write(wb, { booktype: 'xlsx', type: 'array' })
                const dar = new Blob([excelbuffer], { type: filetype })
                file.saveAs(dar, 'asd.xlsx',)


            }


        });


    }
    function generateid() {
        setidb(Math.floor(Math.random() * (999 - 100 + 1) + 100))
    }

    function recieve(val) {
        seti(0)
        settransacid(val._id)
        setstatus(val.status)
    }
    function openinvoice(val) {
        setinvoice(2)
        setinvoicedata(val.invoicedetails)
        exports2(val)
        setinid(val._id)

    }
    const [inid, setinid] = useState('')
    const [cuurid, setcuurid] = useState('')
    function setadduserx() {
        setadduser('adduser2')
        setsteps(0)
    }
    function openhistory(val) {
        setinvoicemenu(val.invoicedata)
        setcuurid(val._id)
        setinvoice(1)
        val.invoicedata.forEach(element => {
            setpaid(paid => paid + parseInt(element.paid))
            setbalance(balance => balance + parseInt(element.balance))
            settotalx(totalx => totalx + parseInt(element.total))
            if (element.status === 'pending') {
                setpending(pending => pending + 1)
            }
            else {

                setcleared(cleared => cleared + 1)
            }
        });



    }
    function postrecieved() {
        setpaid(0)
        setbalance(0)
        settotalx(0)
        setpending(0)
        setcleared(0)
        var t1 = 0;
        var t2 = 0;
        var t3 = 0;
        invoicemenu.forEach((element, index) => {
            if (element._id === transacid) {
                t1 = parseFloat(element.total) - amount
                t2 = parseFloat(element.balance) - amount
                t3 = parseFloat(element.paid) + parseFloat(amount)
                var postData = {
                    id: cuurid,
                    subid: element._id,
                    paid: t3.toString(),
                    balance: t2,
                    status: status




                }
                updateClientFunds(postData).then(res2 => {
                    console.log(res2)
                    getActiveClients().then(res => {
                        console.log(res)
                        setuserd(res.Client)

                        setcurrentItems(res.Client.slice(itemOffset, endOffset))
                        setpageCount(Math.ceil(res.Client.length / 10))
                        res.Client.forEach(sd => {
                            if (sd._id === cuurid) {



                                openhistory(sd)
                                seti(1)

                            }

                        });

                    })
                })
            }
        });
    }
    function setaddusers() {
        setadduser('adduser')
        setactiontype('edit')
    }
    function adddept() {
        setdepts(userdata => [...userdata, {
            email: deptemail,
            dept: deptname,
            password: deptpass




        }])
        setdeptemail('')
        setdeptname('')
        setdeptpass('')
    }
    function deleteuser() {
        console.log(ids)
        var r = ids.split('4sd')
        r[r.length - 1] = r[r.length - 2]
        setuserd()
        var postData = {
            ids: r



        }
        deleteClientData(postData).then(res => {
            console.log(res)
            setids('')

            if (selected === 'active') {
                getActiveClients().then(res2 => {
                    console.log(res2)
                    setuserd(res2.Client)

                    setcurrentItems(res2.Client.slice(itemOffset, endOffset))
                    setpageCount(Math.ceil(res2.Client.length / 10))
                    setadduser('adduser2')
                })
            } else if (selected === 'Pending') {
                getInActiveClients().then(res2 => {
                    console.log(res2)
                    setuserd2(res2.Client)

                    setcurrentItems2(res2.Client.slice(itemOffset2, endOffset2))
                    setpageCount2(Math.ceil(res2.Client.length / 10))
                    setadduser('adduser2')
                })
            }

        })

    }
    function updateuser() {
        if (selected === 'active') {
            setactiontype('update')
            setadduser('adduser')
            var idx = ids.split('4sd')
            userd.forEach(val => {
                if (val._id === currone._id) {
                    setusername(val.username)
                    setaddress(val.address)
                    setphone(val.number)
                    setterms(val.terms)
                    setmarkup(val.markup)
                    setdepts(val.depts)
                    setcstatus(val.status)
                    setidb(val._id)
                    setadminrights(val.adminrights)

                }

            });
        }
        else {
            setactiontype('update')
            setadduser('adduser')
            var idx = ids.split('4sd')
            userd2.forEach(val => {
                if (val._id === currone._id) {
                    setusername(val.username)
                    setaddress(val.address)
                    setphone(val.number)
                    setterms(val.terms)
                    setmarkup(val.markup)
                    setcstatus(val.status)
                    setidb(val._id)
                    setadminrights(val.adminrights)


                }

            });
        }


    }

    return (
        <>

            {i === 0 &&
                <>
                    <div className='adduser'>


                        <div className="subadduser subadduser2">

                            <>
                                <div className="inputname">
                                    <h1>Recieved Amount</h1>
                                    <input onChange={e => setamount(e.target.value)} type="number" />

                                </div>

                                <div className="inputname">
                                    <h1>Status</h1>
                                    <select value={status} className='select2' onChange={e => setstatus(e.target.value)} name="cars" id="cars">

                                        <option value="pending">Pending</option>
                                        <option value="cleared">Cleared</option>
                                    </select>
                                </div>
                                <div className="inputname"></div>

                                <button onClick={e => postrecieved()} className='btn1'>Recieved</button>
                                <button onClick={e => seti(1)} className='btn2'>Cancel</button>
                                <div className="inputname"></div>
                            </>




                        </div>



                    </div>
                </>

            }
            <div className={adduser}>
                <div className="subadduser hadduser">
                    <IoClose className='iov' onClick={e => setadduserx('adduser2')} />
                    {c === 0 &&
                        <>
                            <div className="prcs">
                                <div className="circ1">
                                    <div className="subcirc">

                                    </div>
                                </div>
                                {steps >= 1 ?
                                    <div className="bare">

                                    </div> :

                                    <div className="bare grbare">

                                    </div>}
                                {steps >= 1
                                    ?

                                    <div className="circ1">
                                        <div className="subcirc">

                                        </div>
                                    </div> :

                                    <div className="circ1 grcirc">
                                        <div className="subcirc grcirc">

                                        </div>
                                    </div>}
                                {steps >= 2 ?
                                    <div className="bare">

                                    </div> :

                                    <div className="bare grbare">

                                    </div>}

                                {steps >= 2
                                    ?

                                    <div className="circ1">
                                        <div className="subcirc">

                                        </div>
                                    </div> :

                                    <div className="circ1 grcirc">
                                        <div className="subcirc grcirc">

                                        </div>
                                    </div>}
                            </div>
                            {steps === 0 ?
                                <>
                                    <h6>
                                        Company info
                                    </h6>
                                    <div className="inpex">
                                        <h1>Company name</h1>
                                        <input onBlur={e => generateid()} onChange={e => setusername(e.target.value)} type="text" placeholder='company name' value={username} />

                                    </div>

                                    <div className="inpex">
                                        <h1>Id no.</h1>
                                        <input type="text" value={idb} placeholder='Id' />

                                    </div>

                                    <div className="inpex">
                                        <h1>Phone:</h1>
                                        <input onChange={e => setphone(e.target.value)} placeholder="Phone" type="text" value={phone} />

                                    </div>
                                </> : steps === 2 ?
                                    <>



                                        <h6>
                                            Address info
                                        </h6>
                                        <div className="inpex">
                                            <h1>Address</h1>
                                            <input onChange={e => setaddress(e.target.value)} placeholder="Address" type="text" value={address} />

                                        </div>

                                        <div className="inpex">
                                            <h1>City</h1>
                                            <input onChange={e => setcty(e.target.value)} placeholder="City" type="text" value={cty} />

                                        </div>

                                        <div className="inpex inpexs">
                                            <h1>State</h1>
                                            <input onChange={e => setstate(e.target.value)} placeholder="State" type="text" value={state} />

                                        </div>

                                        <div className="inpex inpexs2">
                                            <h1>Zip Code</h1>
                                            <input onChange={e => setzip(e.target.value)} placeholder="Zip code" type="text" value={zip} />

                                        </div></>
                                    : steps === 1 ?
                                        <>



                                            <h6>
                                                Departments
                                            </h6>


                                            <div className="tablerow trowx">
                                                <div className="subtable">
                                                    <div className="headertable clop">
                                                        <h1>Email</h1>

                                                        <h6>Password</h6>
                                                        <h4>Department</h4>







                                                    </div>
                                                    {depts && depts.map((val, index) => (
                                                        <>
                                                            <div className="headertable">
                                                                <MdDelete onClick={e => setdepts(depts.filter(vala => vala.email !== val.email))} />
                                                                <h1> <img src='' alt="" className='valimg' /> {val.email}</h1>

                                                                <h6>{val.password}</h6>

                                                                <h3>{val.dept}</h3>




                                                            </div>
                                                        </>
                                                    ))

                                                    }
                                                </div>
                                            </div>

                                            <div className="inpex rowinpex">
                                                <input onChange={e => setdeptemail(e.target.value)} placeholder="Email" type="text" value={deptemail} />
                                                <input onChange={e => setdeptpass(e.target.value)} placeholder="Password" type="text" value={deptpass} />

                                                <input onChange={e => setdeptname(e.target.value)} placeholder="Department" type="text" value={deptname} />

                                            </div>

                                            <div className="inpex " onClick={e => adddept()} style={{ cursor: 'pointer' }} >
                                                + Add Department
                                            </div>

                                        </>



                                        :

                                        <>

                                            <div className="inpex">
                                                <h1>Markup (%):</h1>
                                                <input onChange={e => setmarkup(e.target.value)} placeholder="Markup" type="number" value={markup} />

                                            </div>


                                            <div className="inpex">
                                                <h1>Status</h1>
                                                <select className='select2' onChange={e => setcstatus(e.target.value)} value={cstatus} name="cars" id="cars">

                                                    <option value="Active">Active</option>
                                                    <option value="Inactive">Inactive</option>
                                                </select>
                                            </div>
                                            <div className="inpex">
                                                <h1>Terms</h1>
                                                <select className='select2' onChange={e => setterms(e.target.value)} value={terms} name="cars" id="cars">

                                                    <option value="Net 10">Net 10</option>
                                                    <option value="Net 15">Net 15</option>
                                                    <option value="Net 30">Net 30</option>
                                                </select>
                                            </div>
                                            <div className="inpex">
                                                <h1>Admin Rights:</h1>
                                                <select className='select2' onChange={e => setadminrights(e.target.value)} value={adminrights==='Allowed'?'Allowed':'Not Allowed'} >

                                                    <option value='Allowed'>Allowed</option>
                                                    <option value='Not Allowed'>Not Allowed</option>
                                                </select>
                                            </div>
                                            <div className="inpex">
                                                <h1>Weekend:</h1>
                                                <select className='select2' onChange={e => setweekend(e.target.value)} value={weekend} name="cars" id="cars">

                                                    <option value="0">Monday</option>
                                                    <option value="1">Tuesday</option>
                                                    <option value="2">Wednesday</option>
                                                    <option value="3">Thursday</option>
                                                    <option value="4">Friday</option>
                                                    <option value="5">Saturday</option>
                                                    <option value="6">Sunday</option>
                                                </select>
                                            </div>
                                        </>

                            }
                            <div className="inputname"></div>
                            <div className="inpex2">
                                <button className='btg' onClick={e => steps > 0 ? setsteps(steps => steps - 1) : ""}><HiArrowLeft className='btgp' /> Back</button>

                                <button onClick={e => steps < 3 ? setsteps(steps => steps + 1) : submit()} className='btn1'>{steps < 3 ? "Next" :

                                    loadding ?
                                        <span className='loaderx3'></span>
                                        : "Finish"


                                }</button>
                            </div>
                            <div className="inputname"></div>
                        </>

                    }


                </div>

            </div>
            <div className="usersdata">


                {invoice === 0 && <div className="newst nbst">
                    <div className="newst1">
                        <input type="text" onChange={e => setsearchval(e.target.value)} placeholder='Search..' />
                        <button className='deleter' onClick={e => deleteuser()}> Delete</button>
                        <button onClick={e => setaddusers()}>+ Add Company</button>
                    </div>
                    <div className="newst2">

                        {
                            selected === 'active' ?

                                <button className='whitech'>Active</button> :

                                <button onClick={e => setselected('active')} className='purplech'>Active</button>
                        }
                        {
                            selected === 'Pending' ?

                                <button className='whitech'>Pending</button> :

                                <button onClick={e => setselected('Pending')} className='purplech'>Pending</button>
                        }

                    </div>
                </div>}

                {invoice !== 1 && <div className="newst nbst">
                    <div className="w74">

                        <div className="w74card">

                            <div className="iconinv">
                                <img src={ana} alt="" />
                            </div>

                            <div className="iconpara">
                                <p>Companies</p>
                                <h1>91</h1>
                            </div>
                        </div>
                        <div className="w74card">

                            <div className="iconinv">
                                <img src={inv} alt="" />
                            </div>

                            <div className="iconpara">
                                <p>Pending Invoices</p>
                                <h1>1</h1>
                            </div>
                        </div>

                        <div className="w74card">

                            <div className="iconinv">
                                <img src={ana} alt="" />
                            </div>

                            <div className="iconpara">
                                <p>Total invoices</p>
                                <h1>$910</h1>
                            </div>
                        </div>
                        <div className="w74card">

                            <div className="iconinv">
                                <img src={inv} alt="" />
                            </div>

                            <div className="iconpara">
                                <p>Companies</p>
                                <h1>91</h1>
                            </div>
                        </div>

                    </div>

                </div>}
                {invoice === 0 &&

                    <div className="newst">
                        {
                            selected === "active" ?
                                <div className="tablerow tablef" >
                                    <div className="subtable">
                                        <div className="headertable clop">
                                            <span className='sxx'>  </span>

                                            <h1>Company</h1>
                                            <h2 style={{ width: '250px' }} >Address</h2>
                                            <h3>Phone</h3>
                                            <h4 style={{ width: '100px' }}>Terms</h4>
                                            <h4 style={{ width: '100px' }}>Markup (%)</h4>

                                            <h4 style={{ width: '100px' }}>Invoices</h4>


                                        </div>
                                        {searchval.length <= 0 && currentItems && currentItems.map(val => (
                                            <>
                                                <div className="headertable" onClick={e => selectthis(val)} >
                                                    <span className='sxx'> <input type="checkbox" checked={ids.search(val._id) >= 0} onClick={e => ids.search(val._id) >= 0 ? setids(ids.replace(val._id + '4sd', '')) : setids(ids + val._id + '4sd')} /> </span>

                                                    <h1 onClick={e => openhistory(val)}> {val.username && val.username.substring(0, 20)}</h1>
                                                    <h2 style={{ width: '250px' }} >{val.address && val.address.substring(0, 30)}</h2>
                                                    <h3>{val.number}</h3>
                                                    <h4 style={{ width: '100px' }}> <button className='trms'>{val.terms}</button> </h4>
                                                    <h4 style={{ width: '100px' }}>{val.markup}%</h4>

                                                    <h4 style={{ width: '100px' }}>{val.invoicedata.length}</h4>


                                                </div>
                                            </>
                                        ))

                                        }
                                        {searchval.length > 0 && userd && userd.map(val => (
                                            <>
                                                {val.username.toLocaleLowerCase().search(searchval.toLocaleLowerCase()) >= 0 &&
                                                    <div className="headertable" onClick={e => selectthis(val)} >
                                                        <span className='sxx'> <input type="checkbox" checked={ids.search(val._id) >= 0} onClick={e => ids.search(val._id) >= 0 ? setids(ids.replace(val._id + '4sd', '')) : setids(ids + val._id + '4sd')} /> </span>

                                                        <h1 onClick={e => openhistory(val)}> {val.username && val.username.substring(0, 20)}</h1>
                                                        <h2 style={{ width: '250px' }} >{val.address && val.address.substring(0, 30)}</h2>
                                                        <h3>{val.number}</h3>
                                                        <h4 style={{ width: '100px' }}> <button className='trms'>{val.terms}</button> </h4>
                                                        <h4 style={{ width: '100px' }}>{val.markup}%</h4>

                                                        <h4 style={{ width: '100px' }}>{val.invoicedata.length}</h4>


                                                    </div>
                                                }
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
                                </div> :

                                <div className="tablerow tablef" >
                                    <div className="subtable">
                                        <div className="headertable clop">
                                            <span className='sxx'>  </span>

                                            <h1>Company</h1>
                                            <h2 style={{ width: '250px' }} >Address</h2>
                                            <h3>Phone</h3>
                                            <h4 style={{ width: '100px' }}>Terms</h4>
                                            <h4 style={{ width: '100px' }}>Markup (%)</h4>

                                            <h4 style={{ width: '100px' }}>Invoices</h4>


                                        </div>
                                        {searchval.length <= 0 && currentItems2 && currentItems2.map(val => (
                                            <>
                                                <div className="headertable" onClick={e => selectthis(val)} >
                                                    <span className='sxx'> <input type="checkbox" checked={ids.search(val._id) >= 0} onClick={e => ids.search(val._id) >= 0 ? setids(ids.replace(val._id + '4sd', '')) : setids(ids + val._id + '4sd')} /> </span>

                                                    <h1 onClick={e => openhistory(val)}> {val.username && val.username.substring(0, 20)}</h1>
                                                    <h2 style={{ width: '250px' }} >{val.address && val.address.substring(0, 30)}</h2>
                                                    <h3>{val.number}</h3>
                                                    <h4 style={{ width: '100px' }}> <button className='trms'>{val.terms}</button> </h4>
                                                    <h4 style={{ width: '100px' }}>{val.markup}%</h4>

                                                    <h4 style={{ width: '100px' }}>{val.invoicedata.length}</h4>


                                                </div>
                                            </>
                                        ))

                                        }
                                        {searchval.length > 0 && userd2 && userd2.map(val => (
                                            <>
                                                {val.username.toLocaleLowerCase().search(searchval.toLocaleLowerCase()) >= 0 &&
                                                    <div className="headertable" onClick={e => selectthis(val)} >
                                                        <span className='sxx'> <input type="checkbox" checked={ids.search(val._id) >= 0} onClick={e => ids.search(val._id) >= 0 ? setids(ids.replace(val._id + '4sd', '')) : setids(ids + val._id + '4sd')} /> </span>

                                                        <h1 > {val.username && val.username.substring(0, 20)}</h1>
                                                        <h2 style={{ width: '250px' }} >{val.address && val.address.substring(0, 30)}</h2>
                                                        <h3>{val.number}</h3>
                                                        <h4 style={{ width: '100px' }}> <button className='trms'>{val.terms}</button> </h4>
                                                        <h4 style={{ width: '100px' }}>{val.markup}%</h4>

                                                        <h4 style={{ width: '100px' }}>{val.invoicedata.length}</h4>


                                                    </div>
                                                }
                                            </>
                                        ))

                                        }
                                    </div>
                                    <ReactPaginate
                                        breakLabel="..."
                                        nextLabel="next >"
                                        onPageChange={handlePageClick2}
                                        pageRangeDisplayed={5}
                                        pageCount={pageCount2}
                                        previousLabel="< previous"
                                        renderOnZeroPageCount={null}
                                    />
                                </div>
                        }
                        <div className="comdet mtop120">
                            {currone ?
                                <>  <div className="penh" onClick={e => updateuser()
                                }>
                                    <FaPencilAlt className='fadd' />

                                </div>
                                    <h1>Company Details</h1>

                                    <div className="divx">
                                        <div className="bcircle">
                                            <FaBuilding className='fabv' />

                                        </div>
                                        <p>{currone.username}</p>
                                    </div>
                                    <div className="cinfo">
                                        <h1>
                                            <MdLocationOn className='mdl' />Company Address </h1>
                                        <p>{currone.address}</p>
                                    </div>
                                    <div className="cinfo">
                                        <h1>
                                            <MdLocationOn className='mdl' />Phone</h1>
                                        <p>{currone.phone}</p>
                                    </div>
                                    <div className="cinfo">
                                        <h1>
                                            <MdLocationOn className='mdl' />Markup </h1>
                                        <p>{currone.markup}</p>
                                    </div>
                                    <div className="cinfo">
                                        <h1>
                                            <MdLocationOn className='mdl' />Status </h1>
                                        <p>{currone.status}</p>
                                    </div></>
                                :
                                <div className="divx">

                                    <p>Select Company to view</p>
                                </div>}

                        </div>
                    </div>

                }

                {invoice === 1 &&
                    <>
                        <div className="backinv">
                            <FaArrowLeft onClick={e => setinvoice(0)} />

                        </div>
                        <div className="switchtask">
                            <button className={`${subpart === 'task' ? 'activeswitch' : 'inactiveswitch'}`} onClick={e => setsubpart('task')} >Tasks</button>

                            <button className={`${subpart === 'invoice' ? 'activeswitch' : 'inactiveswitch'}`} onClick={e => setsubpart('invoice')}  >Invoices</button></div>

                    </>


                }
                {invoice === 1 &&
                    (
                        subpart === 'invoice' ?
                            <>

                                <div className="projectview pv2">
                                    <h1>Pending Invoices: <p>{pending}</p></h1>
                                    <h1>Cleared Invoices: <p>{cleared}</p></h1>
                                    <h1>Wages: <p>{balance}</p></h1>

                                    <h1>Paid: <p>{paid}</p></h1>
                                    <h1>Total: <p>{totalx}</p></h1>



                                </div>

                                <div className="tablerow">
                                    <div className="subtable">
                                        <div className="headertable clop">
                                            <h1 style={{ width: "100px" }}>Date</h1>
                                            <h2 style={{ width: "100px" }}>Type</h2>
                                            <h3 style={{ width: "100px" }}>No.</h3>
                                            <h4 style={{ width: "100px" }}>Due Date</h4>
                                            <h5 style={{ width: "100px" }}>Total Due</h5>
                                            <h6 style={{ width: "100px" }}>Paid</h6>
                                            <h6 style={{ width: "100px" }}>Balance</h6>
                                            <h6 style={{ width: "100px" }}>Status</h6>


                                        </div>
                                        {invoicemenu && invoicemenu.map(val => (
                                            <>
                                                <div className="headertable" >
                                                    <h1 style={{ width: "100px" }}>{val.date}</h1>
                                                    <h2 style={{ width: "100px" }}>Invoice</h2>
                                                    <h3 style={{ width: "100px" }} >{val.no}</h3>
                                                    <h4 style={{ width: "100px" }} >{val.due}</h4>
                                                    <h5 style={{ width: "100px" }} >{val.total}$</h5>
                                                    <h6 style={{ width: "100px" }} >{val.paid}$</h6>
                                                    <h6 style={{ width: "100px" }} >{val.balance}$</h6>
                                                    <h6 style={{ width: "100px" }} >{val.status}</h6>
                                                    <h5 className='h5'><button onClick={e => openinvoice(val)} className='man'>View and Export</button></h5>
                                                    <h5 style={{ width: "50px" }}></h5>
                                                    <h5 className='h5'><button onClick={e => recieve(val)} className='man btnm2 '>Recieve</button></h5>


                                                </div>
                                            </>
                                        ))

                                        }
                                    </div>
                                </div>
                            </>
                            : <Tasks company={cuurid} props={props} />)
                }

                {invoice === 2 &&

                    <div className="tablerow">
                        <div className="subtable">
                            <div className="headertable clop">
                                <h1 style={{ width: "100px" }}>Employee</h1>
                                <h2 style={{ width: "100px" }}>Skill</h2>
                                <h3 style={{ width: "100px" }}>Hrs</h3>
                                <h4 style={{ width: "100px" }}>Payrate</h4>
                                <h5 style={{ width: "100px" }}>OT Hrs</h5>
                                <h6 style={{ width: "100px" }}>OTPayrate</h6>
                                <h6 style={{ width: "100px" }}>Total</h6>


                            </div>
                            {invoicedata && invoicedata.map(val => (
                                <>
                                    <div className="headertable" onClick={e => openinvoice(val.invoicedetails)}>
                                        <h1 style={{ width: "100px" }}>{val.empname}</h1>
                                        <h2 style={{ width: "100px" }}>{val.skill}</h2>
                                        <h3 style={{ width: "100px" }} >{val.hrs}</h3>
                                        <h4 style={{ width: "100px" }} >{val.payrate}$</h4>
                                        <h5 style={{ width: "100px" }} >{val.othrs}</h5>
                                        <h6 style={{ width: "100px" }} >{val.otpayrate}$</h6>
                                        <h6 style={{ width: "100px" }} >{val.total}$</h6>


                                    </div>
                                </>
                            ))

                            }
                        </div>
                    </div>
                }
            </div></>
    )
}

export default Client