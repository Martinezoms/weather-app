import { FC } from 'react';

interface DestinationProps {
  destination: Destination;
  remove: (destination: Destination) => void;
}

const Destination: FC<DestinationProps> = ({ destination, remove }) => {
  const convertFahrenheitToCelcuis = (f: number) => {
    const result = ((f - 32) * 5) / 9;

    return `${result.toFixed(0)}`;
  };

  const getTime = (offset: number) => {
    const date = new Date();
    date.setUTCSeconds(offset);

    let hours = date.getHours();
    const minutes = date.getMinutes();

    const AmOrPm = hours >= 12 ? 'pm' : 'am';

    hours = hours % 12 || 12;

    return `${hours}:${minutes.toString().padStart(2, '0')}${AmOrPm}`;
  };

  return (
    <div className="flex flex-col justify-between relative rounded-md p-5 shadow-inner bg-slate-700 opacity-45 h-32 mb-5">
      <div className="flex justify-between align-top">
        <div>
          <h2 className="font-bold text-2xl">
            {destination.title ?? destination.name}
          </h2>
          <p>
            {destination.title
              ? destination.name
              : getTime(destination.timezone)}
          </p>
        </div>

        <div>
          <h1 className="text-4xl font-bold">
            {convertFahrenheitToCelcuis(destination.main.temp)}&deg;
          </h1>
        </div>
      </div>

      <div className="flex justify-between align-baseline">
        <p className="capitalize">{destination.weather[0].description}</p>
      </div>

      {!destination.title && (
        <div
          className="absolute top-0 right-2 cursor-pointer"
          onClick={() => remove(destination)}
        >
          x
        </div>
      )}
    </div>
  );
};

export default Destination;
