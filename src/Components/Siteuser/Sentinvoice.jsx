import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { tz } from '../apis'
import '../Home/Home.css'
import ReactToPrint from 'react-to-print';

const Sentinvoice = () => {
const pdf=useRef()
    const [first, setfirst] = useState('')
    useEffect(async() => {
        const path=window.location.pathname.split('/')
       console.log(path)
      await  axios.post(`${tz}/invoice/getinvoicex`,{
            id:path[2],
        }).then(res2 => {
            console.log(res2)
    setfirst(res2.data.replace('',''))
    
        })
    
      return () => {
        
      }
    }, [])
    
  return (
    <div className="parentin"
    style={{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center'
    }}
    >
        <div className="topin">
            <ReactToPrint
 
 trigger={() => <button className='pdfbtn'>Export To pdf!</button>}
 content={() => pdf.current}
/>


        </div>
<div className="a2" style={{
    width:'100%',
    maxWidth:900,
    alignSelf:'center'
}} >
<div
  className='mainpage'

  style={{
    border:'1px solid grey'
  }}
  
    style={{padding:'20px'}}
    ref={pdf}
    dangerouslySetInnerHTML={{__html:first}}
    >

    </div>
</div>
    </div>
 
  )
}

export default Sentinvoice