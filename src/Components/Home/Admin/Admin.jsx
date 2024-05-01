import React, { useState } from 'react'
import { useEffect } from 'react'
import { IoSettingsSharp } from 'react-icons/io5'
import { createAdmin, deleteAdmin, getAdminList, getEmailList, updateAdmin, updateEmailinfo } from '../../../Utils/api'
const Admin = ({ props }) => {

    const [adduser, setadduser] = useState('adduser2')
    const [i, seti] = useState(0)
    const [data, setdata] = useState()
    const [emailpass, setemailpass] = useState('')
    const [actiontype, setactiontype] = useState('edit')
    const [emailemail, setemailemail] = useState('')
    const [o, seto] = useState(0)
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [streamaccess, setstreamaccess] = useState('Allowed')
    const [name, setname] = useState('')
    const [presenceaccess, setpresenceaccess] = useState('Allowed')
    const [staffaccess, setstaffaccess] = useState('Allowed')
    const [prodaccess, setprodaccess] = useState('Allowed')
    const [siteaccess, setsiteaccess] = useState('Allowed')
    const [companyaccess, setcompanyaccess] = useState('Allowed')
    const [appsaccess, setappsaccess] = useState('Allowed')
    const [snapaccess, setsnapaccess] = useState('Allowed')
    const [gpsaccess, setgpsaccess] = useState('Allowed')
    const [leaveaccess, setleaveaccess] = useState('Allowed')
    const [notesaccess, setnotesaccess] = useState('Allowed')
    const [reportsaccess, setreportsaccess] = useState('Allowed')
    const [adminccess, setadminccess] = useState('Allowed')
    const [ids, setids] = useState('')
    const [idcr, setidcr] = useState('')
    const [arr, setarr] = useState([])
    const [Emailc, setEmailc] = useState(false)
    function updatead() {
        var currentid = ids.split('4sd')

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
    useEffect(() => {

        getAdminList().then(res => {
            console.log(res)
            setdata(res.Admin)
        })
        getEmailList().then(res => {
            console.log(res)
            setemailemail(res.Leave[0].email)
        })

        return () => {

        }
    }, [])


    async function addcreden() {
        var postData = { email: emailemail, pass: emailpass }
        updateEmailinfo(postData).then(data => {
            console.log(data)
            setEmailc(false)
            alert('Credentials are updated')
        })
            .catch(error => {
                console.error('Error:', error);
            });


    }
    function addadmin() {
        if (email && password) {

        }

        else {
            alert('Please Complete All Fields')
        }
    }
    function closewin() {
        setadduser('adduser2')
        setactiontype('edit')

    }
    function deleteuser() {
        console.log(ids)
        var r = ids.split('4sd')
        r[r.length - 1] = r[r.length - 2]
        var postData = { ids: r }
        deleteAdmin(postData).then(data => {
            setids('')
            getAdminList().then(res => {
                setdata(res.Admin)
                setadduser('adduser2')
            })

        })
            .catch(error => {
                console.error('Error:', error);
            });


    }
    const [role, setrole] = useState('')
    function fillall() {
        console.log(ids)
        if (o === 0) {
            setarr([])
            seto(1)
            setids('')
            data.forEach(elem => {
                setids(ids => ids + elem._id + '4sd')
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
        else {
            setarr([])
            setids('')
            seto(0)

        }

    }
    function addadmin2() {
        setactiontype('edit')
        setadduser('adduser')

    }
    function addadmin() {
        if (actiontype === 'edit') {
            if (email && password) {
                var postData = {
                    email: email.toLowerCase(),
                    password: password,
                    site: siteaccess,
                    stream: streamaccess,
                    presence: presenceaccess,
                    productivity: prodaccess,
                    staff: staffaccess,
                    company: companyaccess,
                    snaps: snapaccess,
                    apps: appsaccess,
                    gps: gpsaccess,
                    leave: leaveaccess,
                    note: notesaccess,
                    reports: reportsaccess,
                    admin: adminccess,

                    role1: role,
                    name: name


                }
                createAdmin(postData).then(res2 => {
                    if (res2.Admin === 'exist') {
                        alert('User already exist')
                    }
                    else {

                        console.log(res2)
                        getAdminList().then(res => {
                            console.log(res)
                            setdata(res.Admin)
                            setadduser('adduser2')
                        })
                    }
                })

            }
            else {
                alert("Please fill all required fields")
            }
        }
        else {
            var postData = {
                _id: idcr,
                email: email.toLowerCase(),
                password: password,
                site: siteaccess,
                stream: streamaccess,
                presence: presenceaccess,
                productivity: prodaccess,
                staff: staffaccess,
                company: companyaccess,
                snaps: snapaccess,
                apps: appsaccess,
                gps: gpsaccess,
                leave: leaveaccess,
                note: notesaccess,
                reports: reportsaccess,
                admin: adminccess,
                role: role,
                name: name



            }


            updateAdmin(postData).then(res2 => {
                console.log(res2)
                getAdminList().then(res => {
                    console.log(res)
                    setdata(res.Admin)
                    setadduser('adduser2')
                    setids('')
                })

            })

        }
    }
    return (
        <>


            {i === 0 &&
                <>
                    <div className={adduser}>
                        <div className="subadduser">

                            <>
                                <div className="inputname">
                                    <h1>Name</h1>
                                    <input value={name} onChange={e => setname(e.target.value)} type="text" />

                                </div>         <div className="inputname">
                                    <h1>Email</h1>
                                    <input value={email} onChange={e => setemail(e.target.value)} type="text" />

                                </div>

                                <div className="inputname">
                                    <h1>Password</h1>
                                    <input value={password} onChange={e => setpassword(e.target.value)} type="text" />

                                </div>
                                <div className="inputname">
                                    <h1>Role</h1>
                                    <input value={role} onChange={e => setrole(e.target.value)} placeholder='e.g Admin' type="text" />

                                </div>

                                <div className="inputname">
                                    <h1>Stream Access</h1>




                                    <select name="cars" id="cars" value={streamaccess} onChange={e => setstreamaccess(e.target.value)}>

                                        <option value='Allowed'>Allowed</option>
                                        <option value='Not Allowed'>Not Allowed</option>

                                    </select>



                                </div>
                                <div className="inputname">
                                    <h1>Presence Access</h1>




                                    <select name="cars" id="cars" value={presenceaccess} onChange={e => setpresenceaccess(e.target.value)}>

                                        <option value='Allowed'>Allowed</option>
                                        <option value='Not Allowed'>Not Allowed</option>

                                    </select>



                                </div>


                                <div className="inputname">
                                    <h1>Productivity Access</h1>




                                    <select name="cars" id="cars" value={prodaccess} onChange={e => setprodaccess(e.target.value)}>

                                        <option value='Allowed'>Allowed</option>
                                        <option value='Not Allowed'>Not Allowed</option>

                                    </select>



                                </div>
                                <div className="inputname">
                                    <h1>Staff Access</h1>




                                    <select name="cars" id="cars" value={staffaccess} onChange={e => setstaffaccess(e.target.value)}>

                                        <option value='Allowed'>Allowed</option>
                                        <option value='Not Allowed'>Not Allowed</option>

                                    </select>



                                </div>


                                <div className="inputname">
                                    <h1>Jobsite Access</h1>




                                    <select name="cars" id="cars" value={siteaccess} onChange={e => setsiteaccess(e.target.value)}>

                                        <option value='Allowed'>Allowed</option>
                                        <option value='Not Allowed'>Not Allowed</option>

                                    </select>



                                </div>


                                <div className="inputname">
                                    <h1>Snapshot  Access</h1>




                                    <select name="cars" id="cars" value={snapaccess} onChange={e => setsnapaccess(e.target.value)}>

                                        <option value='Allowed'>Allowed</option>
                                        <option value='Not Allowed'>Not Allowed</option>

                                    </select>



                                </div>
                                <div className="inputname">
                                    <h1>Apps Access</h1>




                                    <select name="cars" id="cars" value={appsaccess} onChange={e => setappsaccess(e.target.value)}>

                                        <option value='Allowed'>Allowed</option>
                                        <option value='Not Allowed'>Not Allowed</option>

                                    </select>



                                </div>

                                <div className="inputname">
                                    <h1>GPS Access</h1>
                                    <select name="cars" id="cars" value={gpsaccess} onChange={e => setgpsaccess(e.target.value)}>
                                        <option value='Allowed'>Allowed</option>
                                        <option value='Not Allowed'>Not Allowed</option>
                                    </select>
                                </div>
                                <div className="inputname">
                                    <h1>Leave Access</h1>
                                    <select name="cars" id="cars" value={leaveaccess} onChange={e => setleaveaccess(e.target.value)}>
                                        <option value='Allowed'>Allowed</option>
                                        <option value='Not Allowed'>Not Allowed</option>
                                    </select>
                                </div>
                                <div className="inputname">
                                    <h1>Reports Access</h1>
                                    <select name="cars" id="cars" value={reportsaccess} onChange={e => setreportsaccess(e.target.value)}>
                                        <option value='Allowed'>Allowed</option>
                                        <option value='Not Allowed'>Not Allowed</option>
                                    </select>
                                </div>

                                <div className="inputname">
                                    <h1>Admin Management</h1>
                                    <select name="cars" id="cars" value={adminccess} onChange={e => setadminccess(e.target.value)}>
                                        <option value='Allowed'>Allowed</option>
                                        <option value='Not Allowed'>Not Allowed</option>
                                    </select>
                                </div>

                                <div className="inputname" style={{ paddingBottom: '20px' }}></div>
                                <button onClick={e => addadmin()} className='btn1'>Submit</button>
                                <button onClick={e => closewin()} className='btn2'>Cancel</button>
                            </>
                        </div>

                    </div>
                </>

            }
            <div className="sitemap">
                <div className="newst">
                    <div className="ssemailc">
                        {Emailc ?
                            <div className="formcon">
                                <input type="text" onChange={e => setemailemail(e.target.value)} value={emailemail} />
                                <input type="text" onChange={e => setemailpass(e.target.value)} />
                                <button onClick={e => addcreden()}>Update Credentials</button>
                            </div>
                             :
                            <button onClick={e => setEmailc(true)} ><IoSettingsSharp /> Email configuration  </button>

                        }


                    </div>
                    <div className="newst2" style={{ marginTop: '20px' }}>

                        {ids.search('4sd') >= 0 && ids.split('4sd').length === 2 &&
                            <button onClick={e => updatead()} >Update</button>

                        }
                        <button className='deleter' onClick={e => deleteuser()} > Delete</button>
                        <button onClick={e => addadmin2()} >+ Add Admin</button>
                    </div>
                </div>
                <div className="tablerow">
                    <div className="subtable">
                        <div className="headertable clop">
                            <span className='sxx'><input type="checkbox" checked={o === 1} onClick={e => fillall()} /> </span>

                            <h4 style={{ width: "40px" }}>No.</h4>



                            <h3 style={{ width: "300px" }}>Email</h3>

                            <h3 style={{ width: "90px" }}>Password</h3>

                            <h6>Stream</h6>

                            <h6>Presence</h6>
                            <h3 style={{ width: "90px" }}>Productivity</h3>
                            <h4 style={{ width: "90px" }}>Staff</h4>

                            <h4 style={{ width: "90px" }}>Jobsite</h4>

                            <h4 style={{ width: "90px" }}>Company</h4>

                            <h4 style={{ width: "90px" }}>Snapshot</h4>

                            <h4 style={{ width: "90px" }}>Apps</h4>

                            <h4 style={{ width: "90px" }}>GPS</h4>

                            <h4 style={{ width: "90px" }}>Leaves</h4>

                            <h4 style={{ width: "90px" }}>Reports</h4>

                            <h4 style={{ width: "90px" }}>Admin</h4>



                        </div>
                        {data && data.map((val, index) => (
                            <>
                                <div className="headertable">
                                    <span className='sxx'> <input type="checkbox" checked={ids.search(val._id) >= 0} onClick={e => ids.search(val._id) >= 0 ? setids(ids.replace(val._id + '4sd', '')) : setids(ids + val._id + '4sd')} /> </span>

                                    <h4 style={{ width: "40px" }}>{index}</h4>

                                    <h3 style={{ width: "300px" }}>{val.email}</h3>

                                    <h3 style={{ width: "90px" }}>{val.password}</h3>
                                    <h6> {val.stream}</h6>

                                    <h6 >{val.presence}</h6>

                                    <h3 style={{ width: "90px" }}>{val.productivity}</h3>
                                    <h4 style={{ width: "90px" }} >{val.staff}</h4>
                                    <h4 style={{ width: "90px" }} >{val.site}</h4>
                                    <h4 style={{ width: "90px" }} >{val.company}</h4>

                                    <h4 style={{ width: "90px" }} >{val.snaps}</h4>
                                    <h4 style={{ width: "90px" }} >{val.apps}</h4>

                                    <h4 style={{ width: "90px" }} >{val.gps}</h4>

                                    <h4 style={{ width: "90px" }} >{val.leave}</h4>

                                    <h4 style={{ width: "90px" }} >{val.reports}</h4>

                                    <h4 style={{ width: "90px" }} >{val.admin}</h4>


                                </div>
                            </>
                        ))

                        }
                    </div>
                </div>

            </div></>
    )
}

export default Admin