import React from 'react';
import { MapPin, Navigation, Activity } from 'lucide-react';

export default function ControlPanel({ source, setSource, destination, setDestination, isLoading, onPredict }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onPredict();
  };

  return (
    <div className="absolute top-auto bottom-0 w-full sm:top-8 sm:bottom-auto sm:left-8 sm:w-96 z-10 flex flex-col gap-4 p-4 sm:p-0">
      <div className="glass-panel p-6">
        <div className="flex items-center gap-3 mb-6 border-b border-slate-700/50 pb-4">
          <Activity className="text-accent w-6 h-6" />
          <h1 className="text-2xl font-bold tracking-tight text-white">FlowSense</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="glass-input !pl-12"
              placeholder="Current Location"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Navigation className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="glass-input !pl-12"
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`primary-button mt-2 flex items-center justify-center gap-2 ${isLoading ? 'animate-pulse opacity-80 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <>
                <span className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                Loading...
              </>
            ) : (
              'Predict & Route'
            )}
          </button>
        </form>
      </div>

      {/* Removed StatusCard as it is obsolete to the new predictive array rendered on the map, but it could be kept. To keep it clean, leaving this blank below the form. */}
    </div>
  );
}
