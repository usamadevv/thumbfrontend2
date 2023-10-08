import React, { useState } from 'react'
import Siteemp from '../Siteemp/Siteemp'
import Userdata from '../Userdata/Userdata'
import Siteemp2 from './Siteemp2'
import {FaTools,FaUserPlus ,FaRegBuilding} from 'react-icons/fa'
import {HiOutlineStatusOnline} from 'react-icons/hi'
import { BsBuildingFillGear} from 'react-icons/bs'
import {MdPhoto} from 'react-icons/md'
import {BsFillFileArrowDownFill} from 'react-icons/bs'
import {MdGpsFixed } from 'react-icons/md'
import {BsFileText} from 'react-icons/bs'
import {BsChatRightFill} from 'react-icons/bs'

import {GrDocumentConfig} from 'react-icons/gr'
import {MdControlCamera,MdOutlineMenu} from 'react-icons/md'

import {BsSpeedometer} from 'react-icons/bs'


import {FaSignOutAlt} from 'react-icons/fa'

import Users from '../Users/Users'
import Presence from '../Presence/Presence'
import Prod from '../Productivity/Prod'
import {MdOutlineArrowForwardIos,MdOutlineArrowBackIosNew} from 'react-icons/md'
import Snapshot from '../Snapshot/Snapshot'
import Apps from '../App/App'
import Projects from '../Projects/Projects'
import Track from '../Track/Track'
import Reports from '../Report/Report'
import Leave2 from '../Leave/Leave2'
import Notes from '../Notes/Notes'
import Emp from '../Employeetype/Emp'
import Jobsite from '../Jobsite/Jobsite'
import { useEffect } from 'react'
import Client from '../Client/Client'
import ChPresence from '../ChPresence/ChPresence'
import Admin from '../Admin/Admin'
import { tz } from '../../apis'
import axios from 'axios'
import Notes2 from '../Notes/Notes2'
import Chclient from '../Client/Chclient'




const Menu = () => {
const [i, seti] = useState(33)

function logout(){
    localStorage.removeItem('userid')
    window.location.pathname='/login'
}

  return (
    <>
  {i === 0 &&
                <Users />

            }
           
            {i === 1 &&
                <Prod />

            }
            {i===3&&
            <Snapshot />

            }
              {i===4&&
            <Apps />

            }
          
            {i===5&&
            <Track />

            }
              {i===8&&
            <Reports />

            }
            {i===6&&
            <Leave2 />

            }
            {i===7&&
            <Notes2 />
            

            }
             {i===13&&
            <Jobsite />
            

            }
            {i===2&&
           <Chclient />
           

           }
           {i===9&&
          <Admin />
          

          }
    {i===33&&
<div className=" pempt">
    
        <>
           <div className="emp2e" onClick={e=>seti(0)}>
        <div className="gtr">
                        <HiOutlineStatusOnline className='far2xs' />
                </div>
<p>Live Stream</p>
        </div>
        <div className="emp1e" onClick={e=>seti(1)}>
                <div className="gtr">
                        <BsSpeedometer className='far2xs' />
                </div>
            <p>Productivity</p>

        </div>
     
        
        <div className="emp2e" onClick={e=>seti(2)}>
        <div className="gtr">
                        <FaRegBuilding className='far2xs' />
                </div>
<p>Companies</p>
        </div>
        <div className="emp2e" onClick={e=>seti(3)}>
        <div className="gtr">
                        <HiOutlineStatusOnline className='far2xs' />
                </div>
<p>Snapshots</p>
        </div>
        <div className="emp1e" onClick={e=>seti(4)}>
                <div className="gtr">
                        <BsFillFileArrowDownFill className='far2xs' />
                </div>
            <p>Apps</p>

        </div>
     
        
        <div className="emp2e" onClick={e=>seti(5)}>
        <div className="gtr">
                        <MdGpsFixed className='far2xs' />
                </div>
<p>GPS</p>
        </div>  <div className="emp2e" onClick={e=>seti(6)}>
        <div className="gtr">
                        <BsFileText className='far2xs' />
                </div>
<p>Leaves</p>
        </div>
        <div className="emp1e" onClick={e=>seti(7)}>
                <div className="gtr">
                        <BsChatRightFill className='far2xs' />
                </div>
            <p>Notes</p>

        </div>
     
        
        <div className="emp2e" onClick={e=>seti(8)}>
        <div className="gtr">
                        <GrDocumentConfig className='far2xs' />
                </div>
<p>Reports</p>
        </div>

        <div className="emp2e" onClick={e=>seti(9)}>
        <div className="gtr">
                        <MdControlCamera className='far2xs' />
                </div>
<p>Admin Control</p>
        </div>
        <div className="emp2e" onClick={e=>logout()}>
        <div className="gtr">
                        <FaSignOutAlt className='far2xs' />
                </div>
<p>Logout</p>
        </div>
        </>

       
        
        
            </div> }
    </>


  )
}

export default Menu