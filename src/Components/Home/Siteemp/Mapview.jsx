import React, { useEffect, useRef, useState } from 'react'
import * as turf from '@turf/turf'
import mapboxgl from 'mapbox-gl'
import axios from 'axios'
import * as pol from '../../../Polyline'

const Mapview = ({props}) => {
    const mapc=useRef(null)
    const mapnew=useRef(null)
const markerx=useRef(null)

const markerx2=useRef(null)
const markerxa = useRef([]);
    
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
        i =i+10;
      }
      return result;
    }
    
    const path = {
      type: 'Feature',
      properties: {},
      geometry: {
          type: 'LineString',
          coordinates: props.user
      }
  };
  
  
    const chunkedArray = chunkArray(props.user, 25);
    mapnew.current = new mapboxgl.Map({
      container: mapc.current,

      style: 'mapbox://styles/mapbox/streets-v12',
      center:  props.user[0],
      zoom: 14
  });
  mapnew.current.on('style.load',async function () {

    const getEquallySpacedIndexes = (length) => {
      // Calculate the step size to ensure that we have 10 equally spaced indexes
      const step = Math.max(Math.floor(length / 10), 1);
    
      // Initialize an array to store the selected indexes
      const indexes = [];
    
      // Push the first index
      indexes.push(0);
    
      // Push the equally spaced indexes
      for (let i = step; i < length; i += step) {
        indexes.push(i);
      }
    
      // Push the last index
      indexes.push(length - 1);
    
      return indexes;
    };
    
    // Usage:
    const cf = getEquallySpacedIndexes(props.user.length).map(index => props.user[index]);


    await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${cf.join(';')}?access_token=pk.eyJ1IjoiYXlhYW56YXZlcmkiLCJhIjoiY2ttZHVwazJvMm95YzJvcXM3ZTdta21rZSJ9.WMpQsXd5ur2gP8kFjpBo8g&overview=full&alternatives=true`)
    .then(res=>{
  console.log(res)
   
       
      
  const newLine = pol.toGeoJSON(res.data.routes[0].geometry);

  
           mapnew.current.addSource(`route`, {
               'type': 'geojson',
               'data': {
               'type': 'Feature',
               'properties': {},
               'geometry':pol.toGeoJSON(res.data.routes[0].geometry)
               }
               });
               mapnew.current.addLayer({
               'id': `route`,
               'type': 'line',
               'source': `route`,
               'layout': {
               'line-join': 'round',
               'line-cap': 'round'
               },
               'paint': {
               'line-color':  'green',
               'line-width': 4
               }
               });
               
      // create a HTML element for each feature
  
       
  
  
           mapnew.current.resize()
       
  
  
     
     
  
  
  
    })
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


            
             props.user.forEach((point, index) => {
              const markerElement = document.createElement('div');
              markerElement.className = `marker3`;
      
              // Create a new marker at the current point
              markerxa.current[index] = new mapboxgl.Marker(markerElement)
                  .setLngLat(point)
                  .addTo(mapnew.current);

          
       
          });

        
             
            
  })
    
                 
      
      return () => {
      
      }
    }, [])
    function showusermv(){
console.log(markerxa.current)
    if(markerxa.current.length==0){
     
      props.user.forEach((point, index) => {
        const markerElement = document.createElement('div');
        markerElement.className = `marker3`;

        // Create a new marker at the current point
        markerxa.current[index] = new mapboxgl.Marker(markerElement)
            .setLngLat(point)
            .addTo(mapnew.current);

    
 
    });
    setchec(0)
    }
    else{
      markerxa.current.forEach(marker => {
        if (marker) {
            marker.remove();
        }
    });
    markerxa.current=[]
    setchec(1)
    }
   

    
    }
    const [chec, setchec] = useState(0)
  return (

    <>
 
    <div className="kkbtn">
      <p  className='mapbgn' onClick={e=>showusermv()}> <input checked={chec==0?true:false} defaultChecked={true} type="checkbox" /> Show user movement</p>
    </div>
     <div className='rvlmap'  ref={mapc} style={{ width:'80%',height:550,margin:'auto',marginTop:'40px!important',borderRadius:20}}>
     </div>

    </>
   
 
  )
}

export default Mapview