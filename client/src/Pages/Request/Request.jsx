import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { io } from "socket.io-client";
import "./a.css"; // Contains .pulse-marker animation
import { useAuthStore } from "../../store/useAuthStore";

// Fix Leaflet's default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const Request = () => {
  const mapRef = useRef(null); // Leaflet map instance
  const userMarkerRef = useRef(null); // Marker for current user
  const pulseMarkersRef = useRef(new Map()); // Map<socketId, Marker> for all sharers
  const [isSharing, setIsSharing] = useState(false); // Share toggle state
  const socketRef = useRef(null);
  const watchIdRef = useRef(null);

  const { authUser } = useAuthStore();

  // Initialize Socket.io and wait for the 'connect' event
  const initSocketAsync = () =>
    new Promise((resolve) => {
      const socket = io("http://localhost:5000"); // Connect to server :contentReference[oaicite:3]{index=3}
      socket.on("connect", () => {
        console.log("Socket connected with id:", socket.id);
        resolve(socket);
      });
      socket.on("connect_error", (err) =>
        console.error("Socket.io error:", err)
      );
    });

  useEffect(() => {
    // 1. Create the Leaflet map and base tiles
    mapRef.current = L.map("map").setView([0, 0], 2); // Initial world view :contentReference[oaicite:4]{index=4}
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; All right Resurved AleartSphere",
    }).addTo(mapRef.current);

    // 2. Automatically locate and center on load
    mapRef.current.locate({ setView: true, maxZoom: 13 }); // Auto-pan & zoom :contentReference[oaicite:5]{index=5}

    // 3. Place/update a “You are here” marker on locationfound
    mapRef.current.on("locationfound", (e) => {
      // Listen for locationfound :contentReference[oaicite:6]{index=6}
      const { latlng } = e;
      if (!userMarkerRef.current) {
        userMarkerRef.current = L.marker(latlng)
          .addTo(mapRef.current)
          .bindPopup("You are here")
          .openPopup(); // Show popup :contentReference[oaicite:7]{index=7}
      } else {
        userMarkerRef.current.setLatLng(latlng);
      }
    });

    // 4. Handle location errors gracefully
    mapRef.current.on("locationerror", (err) =>
      console.error("Loc error:", err.message)
    ); // :contentReference[oaicite:8]{index=8}

    // 5. Connect to Socket.io and listen for all sharers
    (async () => {
      socketRef.current = await initSocketAsync();
      socketRef.current.on("update_sharers", (sharers) => {
        console.log("Active sharers:", sharers);

        // Remove markers for users who stopped sharing
        pulseMarkersRef.current.forEach((marker, userId) => {
          if (!sharers.some(([id]) => id === userId)) {
            mapRef.current.removeLayer(marker);
            pulseMarkersRef.current.delete(userId); // Clean up :contentReference[oaicite:9]{index=9}
          }
        });

        // Add or update pulsing markers for each sharer
        sharers.forEach(([userId, position]) => {
          if (pulseMarkersRef.current.has(userId)) {
            pulseMarkersRef.current.get(userId).setLatLng(position); // Update existing marker :contentReference[oaicite:10]{index=10}
          } else {
            const pulseIcon = L.divIcon({
              className: "pulse-marker",
              iconSize: [40, 40],
              iconAnchor: [20, 20], // Center the icon
              popupAnchor: [0, -20], // Adjust popup position
            });
            const marker = L.marker(position, { icon: pulseIcon })
              .addTo(mapRef.current)
              .bindPopup(`User ${userId.slice(-4)}`);
            pulseMarkersRef.current.set(userId, marker); // Store new marker :contentReference[oaicite:12]{index=12}
          }
        });
      });
    })();

    // Cleanup on component unmount
    return () => {
      if (watchIdRef.current)
        navigator.geolocation.clearWatch(watchIdRef.current);
      if (socketRef.current) socketRef.current.disconnect();
      if (mapRef.current) mapRef.current.remove();
    };
  }, []);

  // Toggle sharing: watchPosition ↔ clearWatch, emit share_location/stop_sharing
  const handleShareToggle = () => {
    if (!isSharing) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          const coords = [pos.coords.latitude, pos.coords.longitude];
          console.log("Emitting:", coords);

          // Update or add own marker
          if (userMarkerRef.current) {
            userMarkerRef.current.setLatLng(coords);
          } else {
            userMarkerRef.current = L.marker(coords)
              .addTo(mapRef.current)
              .bindPopup("Your location");
          }

          // Recenter map at each update
          mapRef.current.setView(coords, 13); // Center & zoom :contentReference[oaicite:13]{index=13}

          // Emit to server so everyone updates
          socketRef.current.emit("share_location", coords); // Emit event :contentReference[oaicite:14]{index=14}
        },
        (err) => console.error("Geo error:", err),
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      socketRef.current.emit("stop_sharing"); // Stop sharing :contentReference[oaicite:15]{index=15}
      navigator.geolocation.clearWatch(watchIdRef.current);
      if (userMarkerRef.current) {
        mapRef.current.removeLayer(userMarkerRef.current);
        userMarkerRef.current = null;
      }
    }
    setIsSharing(!isSharing);
  };

  const handleAccept = ()=>{

  }

  return (
    <div className="map-container relative px-2 pt-1">
      <div id="map" className="w-full h-150 relative"></div>
      <button
        onClick={handleShareToggle}
        className={`absolute left-0 mt-5 px-4 py-2 rounded-md btn ${
          !isSharing ? "bg-red-600 text-white" : "bg-green-600 text-white"
        } shadow-md hover:shadow-lg transition-all`}
      >
        {isSharing ? "Stop Alert" : "Request"}
      </button>
      <button
        onClick={handleAccept}
        className={`absolute left-28 mt-5 px-4 py-2 rounded-md btn shadow-md hover:shadow-lg transition-all`}
      >
        Accept
      </button>
    </div>
  );
};

export default Request;
