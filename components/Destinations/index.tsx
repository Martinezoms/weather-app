import { FC } from 'react';
import Destination from '@/components/Destinations/Destination';

interface DestinationsProps {
  destinations: Destination[];
  removeDestination: (destination: Destination) => void;
}

const Destinations: FC<DestinationsProps> = ({
  destinations,
  removeDestination
}) => {
  const deleteDestination = (destination: Destination) => {
    removeDestination(destination);
  };
  return (
    <div className="mt-20 w-full max-h-[500px] overflow-y-auto pr-2">
      {destinations.map((destination) => (
        <Destination
          key={destination.id}
          destination={destination}
          remove={deleteDestination}
        />
      ))}
    </div>
  );
};

export default Destinations;
