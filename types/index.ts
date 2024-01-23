interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

interface Sys {
  country: string;
  sunrise: number;
  sunset: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Coord {
  lon: number;
  lat: number;
}

interface Destination {
  id: number;
  cod: number;
  name: string;
  title?: string;
  main: Main;
  timezone: number;
  sys: Sys;
  weather: Weather[];
  coord: Coord;
}
