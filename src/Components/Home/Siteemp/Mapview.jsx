import React, { useEffect, useRef } from 'react'
import * as turf from '@turf/turf'
import mapboxgl from 'mapbox-gl'
const Mapview = ({props}) => {
    const mapc=useRef(null)
    const mapnew=useRef(null)
const markerx=useRef(null)
const markerx2=useRef(null)
    
    
    useEffect(() => {

   
        const timer = setTimeout(() => {
        
                mapnew.current = new mapboxgl.Map({
                    container: mapc.current,
        
                    style: 'mapbox://styles/mapbox/streets-v12',
                    center:  props.user[0],
                    zoom: 14
                });
        
        
                mapnew.current.on('style.load', function () {

                    mapnew.current.addSource('route', {
                        'type': 'geojson',
                        'data': {
                        'type': 'Feature',
                        'properties': {},
                        'geometry': {
                        'type': 'LineString',
                        'coordinates': props.user
                        }
                        }
                        });
                        mapnew.current.addLayer({
                        'id': 'route',
                        'type': 'line',
                        'source': 'route',
                        'layout': {
                        'line-join': 'round',
                        'line-cap': 'round'
                        },
                        'paint': {
                        'line-color': 'green',
                        'line-width': 4
                        }
                        });
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
               // create a HTML element for each feature

                
        
        // Get the source data
        const sourceData = mapnew.current.getSource('route')._data;
        console.log(sourceData)
        
        // Calculate the total distance along the LineString
        const line = turf.lineString(sourceData.geometry.coordinates);
        const lineDistance = turf.lineDistance(line, { units: 'kilometers' });
        
        console.log(`Total distance along the line: ${lineDistance} kilometers`);
                    mapnew.current.resize()
                
        
        
                });
              
          }, 1000);
     
    
      return () => {
        clearTimeout(timer);
      }
    }, [])
  return (

    <div className='rvlmap'  ref={mapc} style={{ width:'70%',height:350,margin:'auto',marginTop:'40px!important',borderRadius:20}}>

    </div>
  )
}

export default Mapview