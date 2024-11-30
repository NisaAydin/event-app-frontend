import { useEffect, useState } from "react";
import axios from "axios";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";

const MAP_ID = "2993f2752d3be8dc";

function MapPage() {
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyEvents, setNearbyEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [infoWindowPosition, setInfoWindowPosition] = useState(null);

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/event/map-events",
          { withCredentials: true }
        );
        setUserLocation(response.data.userLocation);
        setNearbyEvents(response.data.nearbyEvents);
      } catch (error) {
        console.error("Harita verileri alınırken hata oluştu:", error.message);
      }
    };

    fetchMapData();
  }, []);

  const mapContainerStyle = {
    width: "100%",
    height: "100vh",
  };

  const defaultCenter = userLocation
    ? { lat: userLocation.latitude, lng: userLocation.longitude }
    : { lat: 41.015137, lng: 28.97953 }; // Default olarak İstanbul

  const handleJoinEvent = async (eventId) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/participate/participateInEvent",
        { eventId },
        { withCredentials: true }
      );

      alert(response.data.message || "Etkinliğe başarıyla katıldınız!");
      setNearbyEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === eventId ? { ...event, isJoined: true } : event
        )
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Etkinliğe katılma sırasında bir hata oluştu."
      );
    }
  };

  return (
    <div>
      <h1>Çevremdeki Etkinlikler</h1>
      {userLocation && (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={defaultCenter}
          zoom={12}
          options={{
            mapId: MAP_ID,
          }}
        >
          {/* User Location Marker */}
          <Marker
            position={{
              lat: userLocation.latitude,
              lng: userLocation.longitude,
            }}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            }}
            title="Sizin Konumunuz"
          />

          {/* Nearby Events Markers */}
          {nearbyEvents.map((event) => (
            <Marker
              key={event.id}
              position={{
                lat: parseFloat(event.coordinates.lat),
                lng: parseFloat(event.coordinates.lng),
              }}
              icon={{
                url: event.isJoined
                  ? "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                  : "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
              }}
              title={event.EventName}
              onClick={() => {
                setSelectedEvent(event);
                setInfoWindowPosition({
                  lat: parseFloat(event.coordinates.lat),
                  lng: parseFloat(event.coordinates.lng),
                });
              }}
            />
          ))}

          {/* InfoWindow for Selected Marker */}
          {selectedEvent && infoWindowPosition && (
            <InfoWindow
              position={infoWindowPosition}
              onCloseClick={() => {
                setSelectedEvent(null);
                setInfoWindowPosition(null);
              }}
            >
              <div>
                <h3 style={{color: "black"}}>{selectedEvent.EventName}</h3>
                <p style={{color:"black"}}>{selectedEvent.Description}</p>
                <p>Düzenleyen: {selectedEvent.CreatorName}</p>
                <button
                  onClick={() => handleJoinEvent(selectedEvent.id)}
                  disabled={selectedEvent.isJoined}
                >
                  {selectedEvent.isJoined ? "Katıldınız" : "Katıl"}
                </button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </div>
  );
}

export default MapPage;
