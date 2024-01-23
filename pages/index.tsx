import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Destinations from '@/components/Destinations';
import Search from '@/components/Search';

export default function Home() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const isDuplicate = (newDestination: any) => {
    const destination = destinations.find((d) => d.id === newDestination.id);

    if (destination) return true;
    else return false;
  };

  const findWeatherDetails = async (
    lat: number,
    lon: number,
    first: boolean = false
  ) => {
    try {
      const API_KEY = process.env.API_KEY;
      const API = process.env.API;
      const url = `${API}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;

      const response = await fetch(url);
      const responseJSON: Destination = await response.json();

      console.log('res =>', responseJSON);

      if (responseJSON.cod === 200) {
        if (isDuplicate(responseJSON)) return;

        if (first) {
          const destination = { ...responseJSON, title: 'My location' };
          setDestinations([destination, ...destinations]);
        } else {
          setDestinations([...destinations, responseJSON]);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const loadMyLocationWeatherInfo = () => {
    try {
      setLoading(true);

      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          await findWeatherDetails(lat, lon, true);
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeDestination = (destination: any) => {
    const newDestinations = destinations.filter((d) => d.id !== destination.id);
    setDestinations([...newDestinations]);
  };

  useEffect(() => {
    loadMyLocationWeatherInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="background-overlay">
        <div className="px-5 pt-5 max-w-[1280px] m-auto">
          <Navigation />
          <Header destinations={destinations} />
          <Search fetchWeatherDetails={findWeatherDetails} />
          {loading ? (
            <p className="mt-20 text-center">Loading...</p>
          ) : (
            <Destinations
              destinations={destinations}
              removeDestination={removeDestination}
            />
          )}
        </div>
      </div>
    </div>
  );
}
