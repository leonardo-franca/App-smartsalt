import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken =
  'pk.eyJ1IjoiYXJsaW5kb2Zlcm5hbmRlcyIsImEiOiJja3QwbnJ0ODEwNzMyMnZwa2Yyejgza2FyIn0.ct1swCfY3SMhisHFn_ooEg';

export const Map = () => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(-36.6624);
  const [lat, setLat] = useState(-5.1167);
  const [zoom, setZoom] = useState(13.09);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [lng, lat],
      zoom: zoom
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
      <div ref={mapContainerRef} />
  );
};

export default Map;
