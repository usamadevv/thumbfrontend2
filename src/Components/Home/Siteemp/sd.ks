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
        i =i+25;
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
  mapnew.current.addControl(new mapboxgl.NavigationControl());

  mapnew.current.on('style.load',async function () {


     // Add the path as a GeoJSON source
   
      mapnew.current.addSource('path', {
          type: 'geojson',
          data: path
      });

      // Add a line layer to the map
      mapnew.current.addLayer({
          id: 'path',
          type: 'line',
          source: 'path',
          layout: {
              'line-join': 'round',
              'line-cap': 'round'
          },
          paint: {
              'line-color': '#ff0000',
              'line-width': 2
          }
      });

    // Add a layer to hide extraneous features
    // Adjust z-index of the line layer to make sure it's displayed above other layers
    mapnew.current.moveLayer('path', 'waterway-label');

  

  // Hide extraneous features
  mapnew.current.setLayoutProperty('road-label', 'visibility', 'none');
  mapnew.current.setLayoutProperty('building', 'visibility', 'none');
  mapnew.current.setLayoutProperty('poi-label', 'visibility', 'none');

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