import { FC, useEffect, useState } from 'react';

interface HeaderProps {
  destinations: Destination[];
}

type Info = {
  hottest: string | undefined;
  coldest: string | undefined;
};

const Header: FC<HeaderProps> = ({ destinations }) => {
  const [info, setInfo] = useState<Info>({
    hottest: '',
    coldest: ''
  });

  const calculateHotestAndColdest = () => {
    const mappedDestinations = destinations.map((d) => {
      return {
        name: d.name,
        temp: d.main.temp
      };
    });

    const tempArray = mappedDestinations.map((d) => d.temp);

    const hottest = Math.max(...tempArray);
    const coldest = Math.min(...tempArray);

    const hottestDestination = mappedDestinations.find(
      (d) => d.temp === hottest
    );
    const coldeststDestination = mappedDestinations.find(
      (d) => d.temp === coldest
    );

    setInfo({
      ...info,
      hottest: hottestDestination?.name,
      coldest: coldeststDestination?.name
    });
  };

  useEffect(() => {
    calculateHotestAndColdest();
  }, [destinations]);

  return (
    <div className="mt-10">
      <div className="text-lg font-semibold">
        <p>Hottest destination: {info.hottest}</p>
      </div>
      <div className="text-lg font-semibold">
        <p>Coldest destination: {info.coldest}</p>
      </div>
    </div>
  );
};

export default Header;
