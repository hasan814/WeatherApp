import { WeatherDetailsProps } from "@/types";
import { FiDroplet } from "react-icons/fi";
import { LuEye, LuSunrise, LuSunset } from "react-icons/lu";

import SingleWeatherDetails from "../elements/SingleWeatherDetails";
import { MdAir } from "react-icons/md";
import { ImMeter } from "react-icons/im";

const WeatherDetails = (props: WeatherDetailsProps) => {
  const {
    visibility = "25km",
    humidity = "61%",
    windSpeed = "7 km/h",
    airPressure = "1012 hPa",
    sunrise = "6.20",
    sunset = "18:48",
  } = props;
  return (
    <>
      <SingleWeatherDetails
        icon={<LuEye />}
        information="Visibility"
        value={visibility}
      />
      <SingleWeatherDetails
        icon={<FiDroplet />}
        information="Humidity"
        value={humidity}
      />
      <SingleWeatherDetails
        icon={<MdAir />}
        information="Wind Speed"
        value={windSpeed}
      />
      <SingleWeatherDetails
        icon={<ImMeter />}
        information="Air Pressure"
        value={airPressure}
      />
      <SingleWeatherDetails
        icon={<LuSunrise />}
        information="Sunrise"
        value={sunrise}
      />
      <SingleWeatherDetails
        icon={<LuSunset />}
        information="Sunset"
        value={sunset}
      />
    </>
  );
};

export default WeatherDetails;
