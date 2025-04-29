import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import variables from '../../env';
import axios from 'axios';

// Sample data
// const bloodBanks = [
//  // ... more
// ];

// Custom div icon
const createIcon = (iconUrl) => L.divIcon({
  className: 'p-2 bg-white rounded-full shadow-md',
  html: `<img src="${iconUrl}" alt="icon" class="w-6 h-6" />`,
  iconSize: [40, 40],
});

// Routing control hook
function Routing({ waypoints }) {
  const map = useMap();
  useEffect(() => {
    if (!map || waypoints.length !== 2) return;
    const control = L.Routing.control({
      waypoints: waypoints.map(pt => L.latLng(pt)),
      routeWhileDragging: true,
      lineOptions: { styles: [{ color: '#e63946', weight: 5 }] },
      createMarker: () => null,
    }).addTo(map);
    return () => map.removeControl(control);
  }, [map, waypoints]);
  return null;
}

export default function FindCenter() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [waypoints, setWaypoints] = useState([]);
  const [viewType, setViewType] = useState('road');
  const mapRef = useRef();
  const [city, setCity] = useState("")
  const [bloodBanks, setBloodBanks] = useState([]);

  const filtered = bloodBanks.filter(bank =>
    bank.name.toLowerCase().includes(search.toLowerCase()) ||
    bank.address.toLowerCase().includes(search.toLowerCase())
  );

  const handleCardClick = (bank) => {
    setSelected(bank.id);
    mapRef.current.flyTo(bank.coords, 14);
    setWaypoints([]);
  };

  const handleNavigate = (bank) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        setWaypoints([[coords.latitude, coords.longitude], bank.coords]);
      });
    }
  };

  const handleViewChange = (type) => setViewType(type);

  const tileUrls = {
    road: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    hybrid: 'https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
  };

  function extractArrayFromTextResponse(textResponse) {
    let jsonString = null;
  
    // 1) Try to find a ```json ... ``` block
    const codeBlockMatch = textResponse.match(/```json\s*([\s\S]*?)\s*```/i);
    if (codeBlockMatch) {
      jsonString = codeBlockMatch[1];
    } else {
      // 2) Fallback: grab between the first [ and the last ]
      const start = textResponse.indexOf('[');
      const end   = textResponse.lastIndexOf(']');
      if (start !== -1 && end !== -1 && end > start) {
        jsonString = textResponse.slice(start, end + 1);
      }
    }
  
    if (!jsonString) {
      console.warn('No JSON array found in response.');
      return null;
    }
  
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed)) {
        return parsed;
      } else {
        console.warn('Parsed JSON is not an array.');
        return null;
      }
    } catch (err) {
      console.error('Failed to parse JSON:', err);
      return null;
    }
  }

  const generate = async ()=>{
    const predata = {
      contents: [
        {
          parts: [
            {
                // text: promt,
              text: `you are a assistant name:"Blood Buddy" of a app which is made for smart blood donation system this app is particularly mad for Bhubneswar city in odisha.responce according to previous responce or responce according to the give promt. i am currently in ${city} and i am looking for blood banks near me. responce some multiple data don't give me any responce only provide me the object in this object formate { name: "", coords: [,], types: ["A+","B+","O+","AB+"], contact: "011-26588500", address: "", hours: "", distance: "2.5 km" },`,
            },
          ],
        },
      ],
    };
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${variables.gemini}`,
      predata
    );
    const data = await response.data.candidates[0].content.parts[0].text;
    // const parsedData = await JSON.parse(data);
    let parsedData = extractArrayFromTextResponse(data);
    setBloodBanks(parsedData);
  }


  const handleForm = async()=>{

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( async ({ coords }) => {
        console.log(coords.latitude, coords.longitude);
        const { data } = await axios.get(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${coords.latitude}&lon=${coords.longitude}&limit=1&appid=${variables.API_KEY}`
        );

        setCity(data[0].name);
      });
    }

   await generate()
  }


  useEffect(() => {
    handleForm();
  })



  return (
    <div className="flex h-screen overflow-hidden p-3">
      {/* Sidebar */}
      <div className="w-1/3 min-w-[350px] bg-white shadow-md flex flex-col">
        <div className="flex items-center p-4 bg-red-600 text-white gap-3">
          <img src="https://img.icons8.com/color/48/blood-donation.png" alt="" className="w-7 h-7" />
          <h1 className="text-xl font-semibold">Blood Bank Finder</h1>
        </div>
        <div className="p-4 border-b">
          <input
            type="text"
            placeholder="Search for blood banks..."
            value={city}
            onChange={e => setCity(e.target.value)}
            onKeyDown={async (e) => {
              if (e.key === 'Enter') {
                setCity(e.target.value);
                await generate();
              }
            }}
            className="w-full p-3 rounded-md border border-gray-200 focus:border-red-600 focus:ring-2 focus:ring-red-200"
          />
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {filtered.map(bank => (
            <div
              key={bank.id}
              onClick={() => handleCardClick(bank)}
              className={`p-4 rounded-md border ${selected===bank.id? 'border-red-600 bg-red-100':'border-gray-200'} shadow-sm cursor-pointer transition hover:shadow-md`}
            >
              <h3 className="text-red-600 font-semibold mb-2">{bank.name}</h3>
              <p className="text-gray-500 flex items-center gap-1 mb-2">
                <img src="https://img.icons8.com/ios-filled/50/000000/marker.png" className="w-4 h-4" />
                {bank.address}
              </p>
              <div className="text-sm text-gray-600 mb-2">{bank.contact}</div>
              <div className="text-sm text-gray-600 mb-2">{bank.hours}</div>
              <div className="text-sm text-gray-600 mb-2">{bank.distance} away</div>
              <div className="flex flex-wrap gap-2 mb-3">
                {bank.types.map(type =>(
                  <span key={type} className="text-red-800 bg-red-200 px-2 py-1 rounded-full text-xs font-semibold">{type}</span>
                ))}
              </div>
              <button
                onClick={() => handleNavigate(bank)}
                className="w-full py-2 bg-red-600 text-white rounded-md flex items-center justify-center gap-2 hover:bg-red-700"
              >
                <img src="https://img.icons8.com/ios-filled/50/ffffff/road.png" className="w-4 h-4" />
                Get Directions
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative z-[80]">
        <MapContainer
          center={[20.5937,78.9629]}
          zoom={5}
          style={{ height: '100%', width: '100%' }}
          whenCreated={mapInstance => (mapRef.current = mapInstance)}
        >
          <TileLayer url={tileUrls[viewType]} />
          {bloodBanks.map((bank, idx) => (
            <Marker key={idx} position={bank.coords} icon={createIcon('https://img.icons8.com/color/48/blood-donation.png')}>              
              <Popup>
                <div className="p-2">
                  <h3 className="text-red-600 font-semibold mb-1">{bank.name}</h3>
                  <p className="text-gray-600 text-sm mb-1"><img src="https://img.icons8.com/ios-filled/50/000000/marker.png" className="inline w-4 h-4 mr-1"/>{bank.address}</p>
                  <div className="text-gray-600 text-sm mb-1 flex items-center"><img src="https://img.icons8.com/ios-filled/50/000000/phone.png" className="w-4 h-4 mr-1"/>{bank.contact}</div>
                  <div className="text-gray-600 text-sm mb-2 flex items-center"><img src="https://img.icons8.com/ios-filled/50/000000/clock.png" className="w-4 h-4 mr-1"/>{bank.hours}</div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {bank.types.map(type => <span key={type} className="text-red-800 bg-red-200 px-2 py-1 rounded-full text-xs font-semibold">{type}</span>)}
                  </div>
                  <button onClick={() => handleNavigate(bank)} className="w-full py-2 bg-red-600 text-white rounded-md flex items-center justify-center gap-2 hover:bg-red-700">
                    <img src="https://img.icons8.com/ios-filled/50/ffffff/road.png" className="w-4 h-4" />
                    Get Directions
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
          {waypoints.length === 2 && <Routing waypoints={waypoints} />}
        </MapContainer>

        {/* Map Controls */}
        <div className="absolute  bottom-20 left-6 z-[999] flex flex-col gap-3">
          <button onClick={() => mapRef.current.locate().on('locationfound', e => mapRef.current.flyTo(e.latlng,14))} className="bg-white p-3  rounded-full shadow-md hover:shadow-lg transition cursor-pointer">
            <img src="https://img.icons8.com/ios-filled/50/000000/marker.png" className="w-5 h-5" />
          </button>
          <button onClick={() => mapRef.current.zoomIn()} className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition"><img src="https://img.icons8.com/ios-filled/50/000000/plus-math.png" className="w-5 h-5"/></button>
          <button onClick={() => mapRef.current.zoomOut()} className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition"><img src="https://img.icons8.com/ios-filled/50/000000/minus-math.png" className="w-5 h-5"/></button>
        </div>

        {/* View Selector */}
        <div className="absolute bottom-6 left-6 z-[999] bg-white p-2 rounded-md shadow-md flex gap-2">
          {['road','satellite','hybrid'].map(type => (
            <button key={type} onClick={() => handleViewChange(type)} className={`${viewType===type? 'bg-red-600 text-white':'bg-gray-100 text-gray-700'} px-3 py-1 rounded`}>{type.charAt(0).toUpperCase()+type.slice(1)}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
