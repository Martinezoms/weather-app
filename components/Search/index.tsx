import { useState } from 'react';
import { AsyncPaginate, LoadOptions } from 'react-select-async-paginate';
const Search = () => {
  const [search, setSearch] = useState<string | null>(null);

  const API_KEY = '62e45e8e7e456591d5b7f93fbf9fc9c3';

  const loadOptions = async (search, loadOptions) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/find?q=${search}&appid=${API_KEY}`;
      const response = await fetch(url);

      const responseJSON = await response.json();

      const list = responseJSON.list ?? [];

      const options = list.map((item) => {
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

  return (
    <AsyncPaginate
      className="mt-24 text-black"
      placeholder="Search for destination"
      debounceTimeout={600}
      value={search}
      onChange={setSearch}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
