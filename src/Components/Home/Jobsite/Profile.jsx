import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { tz } from '../../apis'

const Profile = (props) => {
    const [userimg, setuserimg] = useState('')
    useEffect(() => {
        
        console.log(props)
      axios.post(`${tz}/siteuser/findimg`,{
        id:props.id.userid
      }).then(res=>{
        console.log(res.data.Siteuserd)
       if(res.data.Siteuserd!=='not')
       {
        setuserimg(res.data.Siteuserd)
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