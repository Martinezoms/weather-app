import { FC, useState } from 'react';
import {
  AsyncPaginate,
  LoadOptions,
  AsyncPaginateProps
} from 'react-select-async-paginate';

interface SearchProps {
  fetchWeatherDetails: (lat: number, lon: number) => void;
}

type Option = {
  value: string;
  label: string;
};

const Search: FC<SearchProps> = ({ fetchWeatherDetails }) => {
  const loadOptions = async (search: string): Promise<any> => {
    const searchString = search ? search : 'london';
    try {
      const API_KEY = process.env.API_KEY;
      const API = process.env.API;
      const url = `${API}/find?q=${searchString}&appid=${API_KEY}&units=imperial`;

      const response = await fetch(url);
      const responseJSON = await response.json();

      const list: Destination[] = responseJSON.list ?? [];

      const options: Option[] = list.map((item) => {
        return {
          value: `${item.coord.lat} ${item.coord.lon}`,
          label: `${item.name} ${item.sys.country}`
        };
      });

      return {
        options,
        has_more: false
      };
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (searchData: any) => {
    const [lat, lon] = searchData?.value.split(' ');
    fetchWeatherDetails(Number(lat), Number(lon));
  };

  return (
    <AsyncPaginate
      className="mt-24 text-black"
      placeholder="Search for destination"
      value="london"
      debounceTimeout={600}
      onChange={handleChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
