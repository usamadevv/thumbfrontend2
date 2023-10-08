import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { tz } from '../apis'

import ReactToPrint from 'react-to-print';

const Invoice = () => {
const pdf=useRef()
    const [first, setfirst] = useState('')
    useEffect(async() => {
        const path=window.location.pathname.split('/')
       console.log(path)
      await  axios.post(`${tz}/invoice/getinvoicex`,{
            id:path[2],
        }).then(res2 => {
            console.log(res2)
    setfirst(res2.data.replace('<div class="prntbtns"><button class=" no-print btn1 btn3g">Share</button><button class="no-print btn1" id="90">Export to Pdf</button><button class="no-print btn2x btn1">Cancel</button></div>',''))
    
        })
    
      return () => {
        
      }
    }, [])
    
  return (
    <div className="parentin">
        <div className="topin">
            <ReactToPrint
 
 trigger={() => <button className='pdfbtn'>Export To pdf!</button>}
 content={() => pdf.current}
/>


        </div>
   <div
   className='a4'
    style={{padding:'20px'}}
    ref={pdf}
    dangerouslySetInnerHTML={{__html:first}}
    >

    </div>
    </div>
 
  )
}

export default Invoice