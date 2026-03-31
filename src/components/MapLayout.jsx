import React, { useState, useEffect } from 'react';
import { Map, Marker, InfoWindow, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';

const center = { lat: 10.0000, lng: 76.3000 };

const mapOptions = {
  styles: [
    { elementType: "geometry", stylers: [{ color: "#0f172a" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#94a3b8" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#0f172a" }] },
    { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#f8fafc" }] },
    { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#94a3b8" }] },
    { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#1e293b" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#334155" }] },
    { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#1e293b" }] },
    { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#475569" }] },
    { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#334155" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#020617" }] },
    { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#64748b" }] },
  ],
  disableDefaultUI: true,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
};

function RouteRenderer({ directionsResponse, predictions = [] }) {
  const map = useMap();
  const routesLib = useMapsLibrary('routes');
  const [directionsRenderer, setDirectionsRenderer] = useState(null);

  // PanTo logic
  useEffect(() => {
    if (map && predictions && predictions.length > 0) {
      const firstLat = parseFloat(predictions[0].lat || predictions[0].latitude);
      const firstLng = parseFloat(predictions[0].lng || predictions[0].longitude);
      map.panTo({ lat: firstLat, lng: firstLng });
    }
  }, [map, predictions]);

  useEffect(() => {
    if (!routesLib || !map) return;
    const renderer = new routesLib.DirectionsRenderer({
      map,
      suppressMarkers: false,
      polylineOptions: {
        strokeColor: '#00e5ff',
        strokeOpacity: 0.9,
        strokeWeight: 6,
      }
    });
    setDirectionsRenderer(renderer);

    return () => renderer.setMap(null);
  }, [routesLib, map]);

  useEffect(() => {
    if (!directionsRenderer || !directionsResponse) return;
    directionsRenderer.setDirections(directionsResponse);
  }, [directionsRenderer, directionsResponse]);

  return null;
}

export default function MapLayout({ predictions = [], directionsResponse }) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyPlaceholderKeyForDevelopmentOnly';
  const [activeMarker, setActiveMarker] = useState(null);

  return (
    <div className="absolute inset-0 w-full h-full">
      <Map
        key={predictions.length > 0 ? 'active-map' : 'initial-map'}
        defaultZoom={13}
        defaultCenter={center}
        options={mapOptions}
      >
        <RouteRenderer directionsResponse={directionsResponse} predictions={predictions} />

        {apiKey !== 'AIzaSyPlaceholderKeyForDevelopmentOnly' && predictions.map((p, index) => {
          const lat = parseFloat(p.lat || p.latitude);
          const lng = parseFloat(p.lng || p.longitude);

          return (
            <Marker 
              key={`${lat}-${lng}-${index}`} 
              position={{ lat, lng }}
              title={p.location_name}
              onClick={() => setActiveMarker(p)}
            />
          );
        })}

        {activeMarker && (
          <InfoWindow
            position={{ 
              lat: Number(activeMarker.lat || activeMarker.latitude), 
              lng: Number(activeMarker.lng || activeMarker.longitude) 
            }}
            onCloseClick={() => setActiveMarker(null)}
          >
            <div className="max-w-[280px] p-1 text-slate-800 font-sans">
              <h3 className="font-bold text-[15px] leading-tight mb-2 text-slate-900">{activeMarker.location_name}</h3>
              {activeMarker.severity_score && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2 py-0.5 rounded-full border border-rose-200">
                    Severity: {activeMarker.severity_score}/10
                  </span>
                </div>
              )}
              <p className="text-sm text-slate-700 leading-snug">{activeMarker.reason}</p>
            </div>
          </InfoWindow>
        )}
      </Map>
    </div>
  );
}
