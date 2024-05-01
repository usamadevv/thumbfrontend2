import React, { useState } from 'react'
import Presence from '../Presence/Presence'

import Userdata from '../Userdata/Userdata'
import Sitepresence from './Sitepresence'
import {TbBuildingSkyscraper} from 'react-icons/tb'
import {GiOfficeChair} from 'react-icons/gi'

const ChPresence = ({props}) => {
const [i, seti] = useState(0)

  return (
    <>
    {i===1&&
        <Presence props={props} />

        }
        {i===2&&
        <Sitepresence props={props} />

        }
    {i===0&&
<div className="empt">
    
        <>
        <div className="emp1" onClick={e=>seti(2)}>
        <div className="gtr">
                        <TbBuildingSkyscraper className='far2xs' />
                </div>

            <p>Onsite Presence</p>

        </div>
        <div className="emp2" onClick={e=>seti(1)}>
        <div className="gtr">
                        <GiOfficeChair className='far2xs' />
                </div>
<p>Online Presence</p>
        </div>
        </>

       
        
        
            </div> }
    </>


  )
}

export default ChPresence