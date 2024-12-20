import { ForcastWeatherDetailProps } from "@/types";
import React from "react";
import Container from "../elements/Container";
import WeatherIcon from "../elements/WeatherIcon";
import WeatherDetails from "./WeatherDetails";

const ForcastWeatherDetail = (props: ForcastWeatherDetailProps) => {
  const {
    temp,
    feels_like,
    description,
    date = "19.09",
    day = "Tuesday",
    weatherIcon = "02d",
  } = props;
  return (
    <Container className="gap-4">
      {/* Left */}
      <section className="flex gap-4 items-center px-4">
        <div className="flex flex-col gap-1 items-center">
          <WeatherIcon iconName={weatherIcon} />
          <p>{date}</p>
          <p className="text-sm">{day}</p>
        </div>

        <div className="flex flex-col px-4">
          <span className="text-5xl">{temp ?? 0}</span>
          <p className="text-xs space-x-1 whitespace-nowrap">
            <span>Feels_like</span>
            <span>{feels_like ?? 0}</span>
          </p>
          <p className="capitalize">{description}</p>
        </div>
      </section>
      {/* Right */}
      <section className="overflow-x-auto flex justify-between gap-4 px-4 w-full pr-10">
        <WeatherDetails {...props} />
      </section>
    </Container>
  );
};

export default ForcastWeatherDetail;
