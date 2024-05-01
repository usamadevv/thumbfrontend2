import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { findSiteUserImg } from '../../../Utils/api'
import { tz } from '../../apis'

const Profile = (props) => {
    const [userimg, setuserimg] = useState('')
    useEffect(() => {
        
        console.log(props)
        var postData={
          id:props.id.userid
        }
      findSiteUserImg(postData).then(res=>{
        console.log(res.Siteuserd)
       if(res.Siteuserd!=='not')
       {
        setuserimg(res.Siteuserd)
       }
      })
    
      return () => {
}
    }, [])
    
    
  return (
<>
{userimg?

<img className='crsl' src={userimg} alt="" />

:

<div className="crsl">
{props.id.username&&props.id.username.charAt(0)}
</div>
}
</>
  )
}

export default Profile