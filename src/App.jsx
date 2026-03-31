import React, { useState, useEffect } from 'react';
import { APIProvider, useMapsLibrary } from '@vis.gl/react-google-maps';
import MapLayout from './components/MapLayout';
import ControlPanel from './components/ControlPanel';

function MainApp() {
  const PREDICTION_API_URL = 'https://flowsensepredictor-580635102850.asia-south1.run.app';
  
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [predictions, setPredictions] = useState([]);

  // Initialize Directions API
  const routesLibrary = useMapsLibrary('routes');
  const [directionsService, setDirectionsService] = useState(null);

  useEffect(() => {
    if (!routesLibrary) return;
    setDirectionsService(new routesLibrary.DirectionsService());
  }, [routesLibrary]);

  const handlePredictRoute = async () => {
    if (!source || !destination) return;

    setIsLoading(true);
    setPredictions([]); // Immediately clear old markers
    setDirectionsResponse(null); // Clear old route

    console.log("CRITICAL CHECK - Sending:", JSON.stringify({ source, destination }));

    try {
      // Use live backend AI API call
      const response = await fetch(PREDICTION_API_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ source, destination }),
      });
      
      if (!response.ok) {
        let errorMessage = "Backend API failed to respond properly.";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          // Fallback if not JSON
        }
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      console.log("AI Response Received:", data);
      
      // Update predictions state directly with parsed data
      setPredictions(data);

      // Successfully processed data, now explicitly call the route hook
      if (directionsService) {
        directionsService.route(
          {
            origin: source,
            destination: destination,
            travelMode: 'DRIVING',
          },
          (result, status) => {
            if (status === 'OK') {
              setDirectionsResponse(result);
            } else {
              console.error("Directions routing API request failed with status:", status);
            }
          }
        );
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert(`Prediction failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950">
      <MapLayout predictions={predictions} directionsResponse={directionsResponse} />
      <ControlPanel 
        source={source}
        setSource={setSource}
        destination={destination}
        setDestination={setDestination}
        isLoading={isLoading}
        onPredict={handlePredictRoute}
      />
    </div>
  );
}

export default function App() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyPlaceholderKeyForDevelopmentOnly';

  // APIProvider hoisted to the top to support Maps APIs globally across App
  return (
    <APIProvider apiKey={apiKey}>
      <MainApp />
    </APIProvider>
  );
}
