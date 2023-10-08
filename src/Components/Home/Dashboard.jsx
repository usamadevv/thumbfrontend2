import React, { useEffect, useRef } from 'react'
import { PieChart, Pie, Legend } from "recharts";
import { LineChart, Tooltip, Line, linearGradient, XAxis, CartesianGrid, Area, AreaChart, YAxis } from 'recharts'
import { MdOutlineDashboard, MdOutlineDateRange } from 'react-icons/md'
import as from '../../images/219983.png'
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { GiEnergyArrow } from 'react-icons/gi'
import { RiLightbulbFlashLine, RiTimerFlashFill } from 'react-icons/ri'
import {FaRegFileAlt} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'

import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { BiTime } from 'react-icons/bi'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import { MdSnooze } from 'react-icons/md'
import { AiOutlineReload } from 'react-icons/ai'

import axios from 'axios';
import {IoBusinessSharp} from 'react-icons/io5'
import {AiFillHome} from 'react-icons/ai'
import ch from '../../images/ch.png'
import ws from '../../images/wh.png'
import {TbBuildingCommunity} from 'react-icons/tb'
import e from '../../images/e.png'
import ppt from '../../images/ppt.png'
import a6 from '../../images/123/a2.png'
import a7 from '../../images/123/a4.png'
import a8 from '../../images/123/a3.png'

import u from '../../images/u.jpeg'
import a9 from '../../images/123/a7.png'
import a10 from '../../images/123/a10.png'
import {BiStats} from 'react-icons/bi'
import { tz } from '../apis';
import { useState } from 'react';
const Dashboard = () => {
  

  const [data, setdata] = useState( [
    { name: "Group A", value: 30, fill: "#0C75F0"},
    { name: "Group B", value: 30, fill: "#78b7ff" },
    
    { name: "Group B", value: 30, fill: "rgb(132, 232, 177)" },
  ]);
  const data2 = [
    {
      "name": "Page A",
      "uv": 4000,
      "amt": 2400
    },
    {
      "name": "Page B",
      "uv": 3000,
      "amt": 2210
    },
    {
      "name": "Page C",
      "uv": 2000,
      "amt": 2290
    },]
  var data3 = [
    {
      nam: "Usama",
      img: as,
      working: '8:51',
      productivitu: 71
    }, {
      nam: "Usama",
      img: as,
      working: '8:51',
      productivitu: 71
    }, {
      nam: "Usama",
      img: as,
      working: '8:51',
      productivitu: 71
    },
  ]
  const [latep, setlatep] = useState(0)
  const [presentp, setpresentp] = useState(0)
  const [leavep, setleavep] = useState(0)
  const [today, settoday] = useState()
  
  var datax=[
    '80%',
    '80%',   '90%',   '60%',   '80%',   '50%',   '80%',   '80%',   '80%',
    '50%',   '80%',   '80%',   '80%',

  ]
  useEffect(() => {
    
  let options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12:false
  },
  formatter = new Intl.DateTimeFormat([], options);

var t=formatter.format(new Date())
var r=t.split(', ')

var percemp=0;
var latepp=0
axios.get(`${tz}/user/getall`).then((res2)=>{
  
  axios.post(`${tz}/att/findcatt`,{
    date:r[0]
    
  }).then((res)=>{
    console.log(res)
    settoday(res.data.Attdata)
    res.data.Attdata.forEach((element,index) => {
      if(element.status==='present'){
        percemp=percemp+1
        console.log('hy')
        
      }
      else if(element.status==='leave'){
          latepp=latepp+1
       

      }
      if(index===res.data.Attdata.length-1){
        var percentpresent=(percemp/res2.data.User.length)*100
        var percentleave=(latepp/res2.data.User.length)*100
        var absentpercent=((res2.data.User.length-percemp-latepp)/res2.data.User.length)*100

        setpresentp(percentpresent)
        setlatep(absentpercent)
        setleavep(percentleave)


console.log(percentpresent)
console.log(latep)
       setdata( [
          { name: "Group A", value: percentpresent, fill: "rgb(121, 143, 251)" },
          { name: "Group B", value: absentpercent, fill: "rgb(248, 132, 96)" },
          
          { name: "Group B", value:percentleave , fill: "rgb(132, 232, 177)" },
        ]);
        
      }


      
    });

  })

})
    return () => {
      
    }
  }, [])
  
  return (
    <div className="dashboard2">
      <div>
</div>
    <div className="topbr">
      <div className="firstitem">
        <div className="tope">
          <h1>Attendance</h1>
          <div className="statseo">
<button>Daily</button>
<button>Weekly</button>
<button>Yearly</button>
          </div>
        </div>

<div className="stats2">
<div className="barse">
  {datax.map(val=>(
    <div className="barl">
      <div className="subbar" style={{height:val}}>
<p>13<br/>May</p>
      </div>
    </div>
  ))}
</div>
<div className="lkj">
              <PieChart width={800} height={400} >

                <Pie
                  data={data}
                  cx={200}
                  cy={200}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={0}
                  dataKey="value"
                >
                  {/* {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))} */}
                </Pie>
                {/* <Pie
          data={data}
          cx={420}
          cy={200}
          startAngle={0}
          endAngle={360}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={0}
          dataKey="value"
          blendStroke
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie> */}
              </PieChart>
            </div>
            <div className="substats">
              <div className="topsubstats">
<div className="pt1">
  <p>56</p>
  <div className="ana">
    <div className="bbox">

    </div>
    <p>Pending</p>
  </div>
</div>
<div className="pt1">
  <p>56</p>
  <div className="ana">
    <div className="bbox2">

    </div>
    <p>Pending</p>
  </div>
</div><div className="pt1">
  <p>56</p>
  <div className="ana">
    <div className="bbox3">

    </div>
    <p>Pending</p>
  </div>
</div>
              </div>
              <div className="bottomsubstats">
<h1><BiStats /> <p>Attendance Score <br/> 80% Good Score</p></h1>

              </div>
            </div>
</div>

      </div>
      <div className="seconditem">
<h1>Notifications</h1>
<div className="notr">
  <div className="vcircle">
<TbBuildingCommunity className='tbg' />
  </div>
  <div className="textr">
    <h1>Ebel Checked in at jobsite ABC</h1>
    <p>12/09/2022</p>
  </div>

</div>
<div className="notr">
  <div className="vcircle tbgp">
<TbBuildingCommunity className='tbg tbg2' />
  </div>
  <div className="textr">
    <h1>Ebel Checked in at jobsite ABC</h1>
    <p>12/09/2022</p>
  </div>

</div>
<div className="notr">
  <div className="vcircle">
<TbBuildingCommunity className='tbg' />
  </div>
  <div className="textr">
    <h1>Ebel Checked in at jobsite ABC</h1>
    <p>12/09/2022</p>
  </div>

</div>
<div className="notr">
  <div className="vcircle">
<TbBuildingCommunity className='tbg' />
  </div>
  <div className="textr">
    <h1>Ebel Checked in at jobsite ABC</h1>
    <p>12/09/2022</p>
  </div>

</div>
<div className="notr">
  <div className="vcircle tbgp">
<TbBuildingCommunity className='tbg tbg2' />
  </div>
  <div className="textr">
    <h1>Ebel Checked in at jobsite ABC</h1>
    <p>12/09/2022</p>
  </div>

</div>
      </div>
      <div className="firstitem firstitemx">
        <div className="tope toper">
          <h1>Quick Action</h1>
    
        </div>
        <div className="voxes">
          <div className="vox1 grx">

            <IoBusinessSharp  className='grxs'/>
            <p>Add Company</p>
          </div>
          <div className="vox1 prx">

<AiFillHome  className='prxs'/>
<p>Add Project</p>
</div>
<div className="vox1 gnx">

<FaRegFileAlt  className='gnxs' />
<p> Custom Report</p>
</div>
<div className="vox1 ylx">

<MdLocationOn  className='ylxs'/>
<p> Project Track</p>
</div>

          
         </div>


      </div>
      <div className="seconditem secx">
<h1>Ongoing Tasks</h1>
<div className="notrx">
  <div className="rowbr">
    <div className="textx">
      <h1>Ac Fitting</h1>
      <p>Environmental</p>
    </div>
    <div className="imgh">
      <img src={u} alt="" />

      <img src={u} alt="" />

      <img src={u} alt="" />
    </div>
  </div>
  <div className="pgress">
    <div className="subpgress" style={{width:'70%'}}>

    </div>
  </div>

</div>
<div className="notrx">
  <div className="rowbr">
    <div className="textx">
      <h1>Ac Fitting</h1>
      <p>Environmental</p>
    </div>
    <div className="imgh">
      <img src={u} alt="" />

      <img src={u} alt="" />

      <img src={u} alt="" />
    </div>
  </div>
  <div className="pgress">
    <div className="subpgress" style={{width:'70%'}}>

    </div>
  </div>

</div>
<div className="notrx">
  <div className="rowbr">
    <div className="textx">
      <h1>Ac Fitting</h1>
      <p>Environmental</p>
    </div>
    <div className="imgh">
      <img src={u} alt="" />

      <img src={u} alt="" />

      <img src={u} alt="" />
    </div>
  </div>
  <div className="pgress">
    <div className="subpgress" style={{width:'70%'}}>

    </div>
  </div>

</div>
<div className="notrx">
  <div className="rowbr">
    <div className="textx">
      <h1>Ac Fitting</h1>
      <p>Environmental</p>
    </div>
    <div className="imgh">
      <img src={u} alt="" />

      <img src={u} alt="" />

      <img src={u} alt="" />
    </div>
  </div>
  <div className="pgress">
    <div className="subpgress" style={{width:'70%'}}>

    </div>
  </div>

</div>

      </div>
    </div>
    </div>
  )
}

export default Dashboard