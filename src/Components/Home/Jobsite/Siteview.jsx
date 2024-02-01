import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import * as turf from '@turf/turf';


import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { tz } from '../../apis';
import axios from 'axios';
const Siteview = () => {

    var marker2 = useRef()

    const [lng2, setLng2] = useState(-70.9);
    const [lat2, setLat2] = useState(42.35);
    const [zoom2, setZoom2] = useState(9);
    const mapContainer2 = useRef(null);
    const map2 = useRef(null);
    const [empdata, setempdata] = useState([])
    const [data, setdata] = useState([])
    const [latlang, setlatlang] = useState(null)
    useEffect(() => {
        axios.get(`${tz}/siteuser/active`).then(res => {
            console.log(res)
            setempdata(res.data.Siteuserd)
        })

        axios.get(`${tz}/jobsite/getall`).then(res => {
            console.log(res)
            setdata(res.data.Jobsite)

         



            map2.current = new mapboxgl.Map({
                container: mapContainer2.current,

                style: 'mapbox://styles/mapbox/streets-v12',
                center: [lng2, lat2],
                zoom: zoom2
            });

            const geocoder2 = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
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
 
  return (
 <div className="intireview">
    <div className="firstintire">
                                    <div className="mapintire" ref={mapContainer2}></div>
                  
    </div>
 </div>
  )
}

export default Siteview