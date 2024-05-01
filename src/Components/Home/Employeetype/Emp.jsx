import React, { useState } from 'react'
import Siteemp from '../Siteemp/Siteemp'
import Userdata from '../Userdata/Userdata'
import Siteemp2 from './Siteemp2'
import {FaTools,FaUserPlus } from 'react-icons/fa'
import {HiOutlineStatusOnline} from 'react-icons/hi'
const Emp = ({props}) => {
const [i, seti] = useState(0)

  return (
    <>
       {i===0&&
<div className="empt">
    
        <>
        <div className="emp1" onClick={e=>seti(2)}>
                <div className="gtr">
                        <FaTools className='far2xs' />
                </div>
            <p>Onsite Staff</p>

        </div>
        <div className="emp2" onClick={e=>seti(1)}>
        <div className="gtr">
                        <HiOutlineStatusOnline className='far2xs' />
                </div>
<p>Office Monitor</p>
        </div>
        
        <div className="emp2" onClick={e=>seti(4)}>
        <div className="gtr">
                        <FaUserPlus className='far2xs' />
                </div>
<p>New Users</p>
        </div>
        </>

       
        
        
            </div> }
    {i===1&&
        <Userdata props={props} />

        }
        {i===2&&
        <Siteemp props={props} />

        }  {i===4&&
          <Siteemp2 props={props} />
  
          }
 
    </>


  )
}

export default Emp