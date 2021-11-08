import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useSelector } from "react-redux";
import mapboxgl from 'mapbox-gl';
import api from '../services/api';

mapboxgl.accessToken =
  'pk.eyJ1IjoiYXJsaW5kb2Zlcm5hbmRlcyIsImEiOiJja3QwbnJ0ODEwNzMyMnZwa2Yyejgza2FyIn0.ct1swCfY3SMhisHFn_ooEg';

// Sample data 
const data2 =[
  {
  area: "200.00",
  category_id: 1,
  id: 5,
  latitude: "-5.1167",
  longitude: "-36.6624",
  name: "Estação teste",
  saltern_id: 2,
  created_at: "2021-09-28 20:34:25",
  updated_at: "2021-09-28 20:34:25",
  }
]
const data = [
  {
    "location": "Ultima Leitura xxx",
    "city": "Evaporador",
    "state": " Station 1",
    "coordinates": [-37.2592729, -5.0874871],
  },
  {
    "location": "Ultima Leitura xxx",
    "city": "cristalizador",
    "state": "station 2",
    "coordinates": [-37.2692729, -5.0874871],
  },
  {
    "location": "Ultima Leitura xxx",
    "city": "pilha de Sal",
    "state": "station 3",
    "coordinates": [-37.2692729, -5.0974871],
  }
]

export const Map = () => {

  const mapContainerRef = useRef(null);
  const saltern = useSelector((state) => state.saltern.saltern);
  const [stations, setStations] = useState([])
  const [zoom, setZoom] = useState(13.09);
  // Initialize map when component mounts

  useEffect(() => {
    api.get("/stations?saltern_id=2")
      .then((response) => {
        setStations(response.data)
      })
      .catch(() => {
        console.log("errrooorr api")
      })

  }, []
  );
  console.log(stations)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [saltern.longitude, saltern.latitude],
      zoom: zoom
    });
    stations.forEach((location) => {
      var marker = new mapboxgl.Marker()
        .setLngLat([location.longitude,location.latitude])
        .setPopup(new mapboxgl.Popup({ offset: 30 })
          .setHTML('<h4>' + location.name + '</h4>' + location.area))
        .addTo(map);

    })
    // data.forEach((location) => {
    //   var marker = new mapboxgl.Marker()
    //     .setLngLat([location.coordinates[0], location.coordinates[1]])
    //     .setPopup(new mapboxgl.Popup({ offset: 30 })
    //       .setHTML('<h4>' + location.city + '</h4>' + location.location))
    //     .addTo(map);

    // })
    // // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');



    // Clean up on unmount
    return () => map.remove();
  }, [saltern]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />
  );
};

/*/ Set up states for updating map 
constructor(props) {
  super(props);
  this.state = {
    lng: this.props.lng,
    lat: this.props.lat,
    zoom: this.props.zoom
  }
}
setLng =(lng) =>{
  this.setState({lng: this.props.lng})
}
setLat =(lat) =>{
  this.setState({lat:this.props.lat})
}
  setZoom =(zoom) =>{
  this.setState({zoom: this.props.zoom})
}
// Create map and lay over markers
componentDidMount() {
  const map = new mapboxgl.Map({
    container: this.mapContainer,
    style: 'mapbox://styles/mapbox/satellite-v9',
    center: [this.state.lng, this.state.lat],
    zoom: this.state.zoom
  })

  data.forEach((location) => {
    var marker = new mapboxgl.Marker()
      .setLngLat(location.coordinates)
      .setPopup(new mapboxgl.Popup({ offset: 30 })
        .setHTML('<h4>' + location.city + '</h4>' + location.location))
      .addTo(map);

  })
}

render() {
  return (
    <div>
      <div ref={el => this.mapContainer = el} style={{ width: '100%', height: '100vh' }} />
    </div>
  )
}
}
*/
export default Map;