import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import * as turf from '@turf/turf';
import grp from '../../../images/grp.png'

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { tz } from '../../apis';
import axios from 'axios';
import Profile from './Profile';
import { IoClose } from 'react-icons/io5';
import { Calendar } from 'react-calendar';
const Siteview = () => {
    function formatDate(inputDate) {
        const parts = inputDate.split('/');
        const month = parseInt(parts[0]);
        const day = parseInt(parts[1]);
        const year = parseInt(parts[2]);
      
        // Create a new Date object
        const date = new Date(year, month - 1, day); // Month is 0-indexed, so subtract 1
      
        // Define arrays for days and months names
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      
        // Get day of the week, month, and day
        const dayOfWeek = daysOfWeek[date.getDay()];
        const monthName = monthsOfYear[date.getMonth()];
        const formattedDay = date.getDate();
      
        // Format the date string
        const formattedDate = `${dayOfWeek} ${monthName} ${formattedDay}, ${year}`;
        
        return formattedDate;
      }
      
    var marker2 = useRef()

    const [lng2, setLng2] = useState(-70.9);
    const [lat2, setLat2] = useState(42.35);
    const [zoom2, setZoom2] = useState(9);
    const mapContainer2 = useRef(null);
    const map2 = useRef(null);
    const [empdata, setempdata] = useState([])
    const [data, setdata] = useState([])
    const [dataj, setdataj] = useState([])
    const [latlang, setlatlang] = useState(null)
    const [datep, setdatep] = useState('')
    useEffect(() => {
        var ustime = new Date().toLocaleString("en-US", { hour12: false })
        console.log(ustime)
        setshowcalender(false)
        var yt = ustime.split(', ')
        setindate(yt[0])

        axios.get(`${tz}/siteuser/active`).then(res => {
            console.log(res)
            setempdata(res.data.Siteuserd)
        })
        axios.get(`${tz}/att/time`).then(res => {

            var dateput = res.data.Date.split(', ')
            setdatep(dateput[0])
            axios.post(`${tz}/siteatt/findbydate`,{
                date:yt[0],
            }).then(resa => {
                console.log(resa)
                setdata(resa.data.Siteatt)
            })
        })
       

        axios.get(`${tz}/jobsite/getall`).then(res => {
            console.log(res)
            setdataj(res.data.Jobsite)

         



            map2.current = new mapboxgl.Map({
                container: mapContainer2.current,

                style: 'mapbox://styles/mapbox/streets-v12',
                center: [lng2, lat2],
                zoom: zoom2
            });

            const geocoder2 = new MapboxGeocoder({
                accessToken: 'pk.eyJ1IjoiYXlhYW56YXZlcmkiLCJhIjoiY2ttZHVwazJvMm95YzJvcXM3ZTdta21rZSJ9.WMpQsXd5ur2gP8kFjpBo8g',
                mapboxgl: mapboxgl,
            });

            // Add the geocoder to the map
            map2.current.addControl(geocoder2);

            map2.current.on('style.load', function () {
                map2.current.addSource('route', {
                    'type': 'geojson',
                    'data': {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                    'type': 'LineString',
                    'coordinates': [
                    [-122.483696, 37.833818],
                    [-122.483482, 37.833174],
                    [-122.483396, 37.8327],
                    [-122.483568, 37.832056],
                    [-122.48404, 37.831141],
                    [-122.48404, 37.830497],
                    [-122.483482, 37.82992],
                    [-122.483568, 37.829548],
                    [-122.48507, 37.829446],
                    [-122.4861, 37.828802],
                    [-122.486958, 37.82931],
                    [-122.487001, 37.830802],
                    [-122.487516, 37.831683],
                    [-122.488031, 37.832158],
                    [-122.488889, 37.832971],
                    [-122.489876, 37.832632],
                    [-122.490434, 37.832937],
                    [-122.49125, 37.832429],
                    [-122.491636, 37.832564],
                    [-122.492237, 37.833378],
                    [-122.493782, 37.833683]
                    ]
                    }
                    }
                    });
                    map2.current.addLayer({
                    'id': 'route',
                    'type': 'line',
                    'source': 'route',
                    'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                    },
                    'paint': {
                    'line-color': 'green',
                    'line-width': 8
                    }
                    });



                res.data.Jobsite.forEach(element => {
                    if (element.latlang) {
                        marker2.current = new mapboxgl.Marker()
                            .setLngLat(JSON.parse(element.latlang))
                            .setPopup(
                                new mapboxgl.Popup({ offset: 0 }) // add popups
                                    .setHTML(
                                        `<h3>${element.clientname}</h3><p>${element.sitename}</p>`
                                    )
                            )
                            .addTo(map2.current)


                    }

                });

 // Get the source data
  const sourceData = map2.current.getSource('route')._data;
  console.log(sourceData)

  // Calculate the total distance along the LineString
  const line = turf.lineString(sourceData.geometry.coordinates);
  const lineDistance = turf.lineDistance(line, { units: 'kilometers' });

  console.log(`Total distance along the line: ${lineDistance} kilometers`);
                map2.current.resize()
                geocoder2.on('result', function (e) {
                    if (marker2.current) marker2.current.remove()
                    marker2.current = new mapboxgl.Marker()
                        .setLngLat(e.result.center)
                        .addTo(map2.current)
                    setlatlang(JSON.stringify(e.result.center))

                    setlatlang(e.result.center)

                });


            });




        })

        return () => {

        }
    }, [])
    const [visited, setvisited] = useState([])
    const [abs, setabs] = useState(0)
    function navigateto(coords,val){
      if(val.coords&&val.coords.length>0){

        var cr=JSON.parse(coords)
        const offset = 0.00002; // Adjust this value as needed

        map2.current.flyTo({
            center: [cr.longitude+offset*1, cr.latitude+offset*1], // coordinates to fly to
            zoom: 20, // zoom level
            essential: true // animation is essential
        });
        if(!(visited.some(vl=>vl===val._id))){
            const customMarker = document.createElement('div');
setabs(abs=>abs+1)
        const imgElement = document.createElement('img');
        imgElement.src = grp; // URL of the image
        imgElement.width = 40; // Set width of the image
        imgElement.height = 50 // Set height of the image
    

        axios.post(`${tz}/siteuser/findimg`,{
            id:val.userid
          }).then(res=>{
            console.log(res.data.Siteuserd)
           if(res.data.Siteuserd!=='not')
           {
            const imgElement2 = document.createElement('img');
            imgElement2.src =res.data.Siteuserd ; // URL of the image
            imgElement2.width = 30; // Set width of the image
            imgElement2.height = 30 // Set height of the image
             imgElement2.style.marginLeft = '5px'; // Set width of the image
            imgElement2.style.marginTop = '5px' // Set height of the image
            imgElement2.style.position='absolute'
            imgElement2.style.borderRadius='100px'
            // Append imgElement to customMarker div
    
            customMarker.appendChild(imgElement2);
            customMarker.appendChild(imgElement);
            customMarker.style.width = '60px';
            customMarker.style.height = '70px';
    
            customMarker.style.display = 'center';
            customMarker.style.justifyContent = 'center';
    
            customMarker.style.position = 'absolute';
    
            customMarker.style.top = `${abs*10}px`;
            customMarker.style.background = 'transparent'; // Example styling
            customMarker.style.borderRadius = '50%'; // Example styling
        
            const marker = new mapboxgl.Marker({
                element: customMarker
            })
                .setLngLat([cr.longitude, cr.latitude]) // Coordinates where the custom marker will be placed
                .addTo(map2.current);
                setvisited(visited=>[...visited,val._id])
            
            
          
           }
           else{  const imgElement2 = document.createElement('div');
           const imgElementq = document.createElement('p');
          imgElementq.innerHTML=`${val.username.charAt(0)}`
          imgElementq.style.color = 'white';
           imgElement2.style.width = '30px'; // Set width of the image
           imgElement2.style.height = '30px' // Set height of the image
            imgElement2.style.marginLeft = '5px'; // Set width of the image
           imgElement2.style.marginTop = '5px' // Set height of the image
           imgElement2.style.position='absolute'
           imgElement2.style.borderRadius='100px'
           imgElement2.style.background='#0ba488'

           imgElement2.style.display='flex'
           imgElement2.style.justifyContent='center'

           imgElement2.style.alignItems='center'
           // Append imgElement to customMarker div
           imgElement2.appendChild(imgElementq)

   
           customMarker.appendChild(imgElement2);
           customMarker.appendChild(imgElement);
           customMarker.style.width = '60px';
           customMarker.style.height = '70px';
   
           customMarker.style.display = 'center';
           customMarker.style.justifyContent = 'center';
   
           customMarker.style.position = 'absolute';
   
           customMarker.style.top = `${abs*10}px`;
           customMarker.style.background = 'transparent'; // Example styling
           customMarker.style.borderRadius = '50%'; // Example styling
       
           const marker = new mapboxgl.Marker({
               element: customMarker
           })
               .setLngLat([cr.longitude, cr.latitude]) // Coordinates where the custom marker will be placed
               .addTo(map2.current);
               setvisited(visited=>[...visited,val._id])
           
           
         
          }
          })

        }
    
      }
    }
    function formatTime(inputTime) {
        // Split the time string into hours, minutes, and seconds
        const [hours, minutes, seconds] = inputTime.split(':').map(Number);
      
        // Convert hours to 12-hour format
        const formattedHours = hours % 12 || 12;
      
        // Determine AM/PM
        const ampm = hours < 12 ? 'AM' : 'PM';
      
        // Format the time string
        const formattedTime = `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
        
        return formattedTime;
      }
      
 const [indate, setindate] = useState('')
 const [showcalender, setshowcalender] = useState(false)

const [value2, valuex] = useState(new Date());
 function onxhange(e) {
    valuex(e)
    var ustime = e.toLocaleString("en-US", { hour12: false })
    console.log(ustime)
    setshowcalender(false)
    var yt = ustime.split(', ')
    setindate(yt[0])
    console.log(yt[0])
    axios.post(`${tz}/siteatt/findbydate`,{
        date:yt[0],
    }).then(resa => {
        console.log(resa)
        setdata(resa.data.Siteatt)
    })
}
  return (
 <div className="intireview">
    <div className="firstintire">
                                    <div className="mapintire" ref={mapContainer2}></div>
                  
    </div>
    <div className="secondtire">

        <div className="topdt">
        {!showcalender&&    <div className="dtr2">
                All Projects
            </div>}
        {showcalender ?
<div style={{position:'relative'}}>
<IoClose className='iocl' onClick={e=>setshowcalender(false)} />
 <Calendar onChange={onxhange}
     value={value2} />
</div> :
<button className='dtr' onClick={e=>setshowcalender(true)}>
{formatDate(indate)}

</button>

}

        </div>
        {data&&data.map(val=>(
            val.projectname!=='-'&&
            <div className="notif" onClick={e=>navigateto(val.coords,val)}>
                <div className="fxd">
                    {formatDate(val.date)}
                </div>
                <div className="fxd2">
                    {val.chkouttime==='-'?formatTime(val.time):formatTime(val.chkouttime)}
                </div>
           <div className="topnot">
          <Profile id={val} />
         
            <div className="lineno">
                <p><h5>{val.username}</h5>
                
                 {(val.chkouttime!=='-'&&val.chkouttime!=='00:00:00')?'Clocked in at jobsite':val.chkouttime==='-'?'Clocked out at jobsite':''} 
              <h6>   {val.projectname} </h6>
                 
                 </p>
            </div>

           </div>

           <div className="tskln">
            <p>Last task in process:  <p>{val.tasks.length>0&&val.tasks[val.tasks.length-1].task}</p> ... </p>
            <p>Tasks done: <p>{val.tasks.length}</p> </p>
            
           </div>
            </div>
        ))}
    </div>
 </div>
  )
}

export default Siteview