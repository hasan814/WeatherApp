import { ReactNode } from "react";

export type SearchProps = {
  value: string;
  className?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmmit: React.FormEventHandler<HTMLFormElement> | undefined;
}


export interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    sys: {
      pod: string;
    };
    dt_txt: string;
  }[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}


export interface QueryProviderProps {
  children: ReactNode;
}


export interface SingleWeatherDetailsProps {
  information: string;
  icon: React.ReactNode;
  value: string;
}

export interface WeatherDetailsProps {
  sunset: string;
  sunrise: string;
  humidity: string;
  windSpeed: string;
  visibility: string;
  airPressure: string;
}

export interface ForcastWeatherDetailProps extends WeatherDetailsProps {
  day: string;
  temp: string;
  date: string;
  feels_like: string;
  weatherIcon: string;
  description: string;
}