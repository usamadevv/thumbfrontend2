import React, { useEffect, useRef } from 'react'
import * as turf from '@turf/turf'
import mapboxgl from 'mapbox-gl'
import axios from 'axios'
import * as pol from '../../../Polyline'

const Mapview = ({props}) => {
    const mapc=useRef(null)
    const mapnew=useRef(null)
const markerx=useRef(null)

const markerx2=useRef(null)
    
    
    useEffect( () => {
      // Function to check if two lines intersect
function doLinesIntersect(line1, line2) {
  const intersection = turf.lineIntersect(line1, line2);
  return intersection.features.length > 0;
}

      
    function chunkArray(array, chunkSize) {
      const result = [];
      for (let i = 0; i < array.length - chunkSize + 1; i++) {
        result.push(array.slice(i, i + chunkSize));
        i =i+5;
      }
      return result;
    }
    
    
  
  
    const chunkedArray = chunkArray(props.user, 25);
    mapnew.current = new mapboxgl.Map({
      container: mapc.current,

      style: 'mapbox://styles/mapbox/streets-v12',
      center:  props.user[0],
      zoom: 14
  });
  mapnew.current.on('style.load',async function () {


for(let i=0;i<chunkedArray.length;i++){
  await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${chunkedArray[i].join(';')}?access_token=pk.eyJ1IjoiYXlhYW56YXZlcmkiLCJhIjoiY2ttZHVwazJvMm95YzJvcXM3ZTdta21rZSJ9.WMpQsXd5ur2gP8kFjpBo8g&overview=full&alternatives=true`)
  .then(res=>{
console.log(res)
 
     
    
const newLine = pol.toGeoJSON(res.data.routes[0].geometry);

let linesOverlap = false;
for (let j = 0; j < i; j++) {
  const existingLine = mapnew.current.getSource(`route${j}`)._data.geometry;
  if (doLinesIntersect(newLine, existingLine)) {
    linesOverlap = true;
    break;
  }
}

         mapnew.current.addSource(`route${i}`, {
             'type': 'geojson',
             'data': {
             'type': 'Feature',
             'properties': {},
             'geometry':pol.toGeoJSON(res.data.routes[0].geometry)
             }
             });
             mapnew.current.addLayer({
             'id': `route${i}`,
             'type': 'line',
             'source': `route${i}`,
             'layout': {
             'line-join': 'round',
             'line-cap': 'round'
             },
             'paint': {
             'line-color': linesOverlap ? 'red' : 'green',
             'line-width': 4
             }
             });
             
    // create a HTML element for each feature

     


         mapnew.current.resize()
     


   
   



  })
}
const el = document.createElement('div');
             el.className = 'marker1';
             const el2 = document.createElement('div');
             el2.className = 'marker2';
           
           
  if (markerx.current) markerx.current.remove()
  
     markerx.current = new mapboxgl.Marker(el)
         .setLngLat(props.user[0])
         .addTo(mapnew.current)
         if (markerx2.current) markerx2.current.remove()
         markerx2.current = new mapboxgl.Marker(el2)
             .setLngLat(props.user[props.user.length-1])
             .addTo(mapnew.current)
  })
    
                 
      
      return () => {
      
      }
    }, [])
  return (

    <div className='rvlmap'  ref={mapc} style={{ width:'80%',height:550,margin:'auto',marginTop:'40px!important',borderRadius:20}}>

    </div>
  )
}

export default Mapview