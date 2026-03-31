# 🌊 FlowSense: AI-Driven Traffic Prediction Dashboard

FlowSense is a premium, high-performance web dashboard that leverages Google Gemini AI to predict real-time traffic bottlenecks and provide dynamic routing solutions. Built with a sleek dark-themed aesthetic and glassmorphism, it transforms raw data into actionable commuting intelligence.

FlowSense Demo Video:
https://drive.google.com/file/d/1aon_aWUH4eZqNfXK-UqcaHQOSAYzzlOM/view?usp=drivesdk

## 🚀 Features

- **AI Predictive Engine**: Integrates with Google Cloud Functions and Gemini AI to analyze traffic patterns and identify high-severity bottlenecks on-the-fly.
- **Dynamic Map Visualization**: Powered by `@vis.gl/react-google-maps`, featuring interactive pulsing markers for traffic hotspots and precision info-windows.
- **Electric Cyan Routing**: Real-time directional travel paths drawn with custom styled polyline vectors to ensure maximum visibility.
- **Premium UX**: Fully responsive glassmorphism UI built with Tailwind CSS v4, featuring micro-animations and loading states.
- **Context-Aware Analytics**: AI-generated traffic reasons explaining *why* a bottleneck is occurring (stadium surges, metro maintenance, weather impacts, etc.).

## 🛠️ Tech Stack

- **Frontend**: [React.js](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Maps**: [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview)
- **AI Backend**: [Google Cloud Functions](https://cloud.google.com/functions) + [Google Gemini API](https://ai.google.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ahmadusman10/flowsense.git
   cd flowsense
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add your Google Maps API Key:
   ```env
   VITE_GOOGLE_MAPS_API_KEY=YOUR_API_KEY_HERE
   ```

4. **Run in Development**:
   ```bash
   npm run dev
   ```

## 🧠 Behind the Scenes: The AI Handshake

FlowSense uses a three-way architectural handshake:
1. **Frontend**: Captures user input and broadcasts a secure POST request to a Google Cloud Function.
2. **Cloud Function**: Pipes the trip data to **Gemini 1.5 Flash** with strict temperature controls for factual accuracy. 
3. **Synthesis**: The JSON response is parsed by our `MapLayout` component, triggering a cinematic `panTo()` camera movement and rendering the red pulsing bottleneck markers.

## 📄 License

This project is licensed under the MIT License.

---
Developed with ❤️ by [Ahmad Usman](https://github.com/ahmadusman10)

