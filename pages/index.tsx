import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Destinations from '@/components/Destinations';
import Search from '@/components/Search';
import { useEffect } from 'react';

export default function Home() {
  const loadMyLocationWeatherInfo = async () => {};

  return (
    <div>
      <div className="background-overlay">
        <div className="px-5 pt-5 max-w-[1280px] m-auto">
          <Navigation />
          <Header />
          <Search />
          <Destinations />
        </div>
      </div>
    </div>
  );

  useEffect(() => {}, []);
}
