"use client";

import { format, fromUnixTime, parseISO } from "date-fns";
import { loadingCityAtom, placeAtom } from "@/app/(roots)/atom";
import { useEffect, useState } from "react";
import { metersToKilometers } from "@/utils/metersToKilometers";
import { getDayOrNightIcon } from "@/utils/getDayOrNightIcon";
import { convertWindSpeed } from "@/utils/converWindSpeed";
import { v4 as uuidv4 } from "uuid";
import { WeatherData } from "@/types";
import { useQuery } from "react-query";
import { useAtom } from "jotai";

import ForcastWeatherDetail from "../modules/ForcastWeatherDetail";
import WeatherSkeleton from "../modules/WeatherSkeleton";
import WeatherDetails from "../modules/WeatherDetails";
import WeatherIcon from "../elements/WeatherIcon";
import Container from "../elements/Container";
import Navbar from "../layouts/Navbar";
import axios from "axios";

const HomePage = () => {
  // ============== Atom ================
  const [place] = useAtom(placeAtom);
  const [loading] = useAtom(loadingCityAtom);

  // ============== State ================
  const [isCelsius, setIsCelsius] = useState<boolean>(false);

  // ============== Function ================
  const convertTemp = (temp: number | undefined) => {
    if (temp === undefined) return 0;
    return isCelsius ? temp - 273.15 : temp;
  };

  // =========== React Query ===============
  const { isLoading, data, refetch } = useQuery<WeatherData>(
    "repoData",
    async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
      );
      return data;
    }
  );

  const firstData = data?.list[0];
  const uniqueDates = [
    ...new Set(
      data?.list.map(
        (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    ),
  ];

  const firstDataForcastEachDate = uniqueDates.map((date) => {
    return data?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });

  // =========== Effect ===============
  useEffect(() => {
    refetch();
  }, [refetch, place]);

  // =========== Rendering ===============
  if (isLoading)
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce">Loading...</p>
      </div>
    );

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar location={data?.city.name} />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {/* Today Data */}
        {loading ? (
          <WeatherSkeleton />
        ) : (
          <>
            <section className="space-y-4">
              <div className="space-y-2">
                <h2 className="flex gap-1 text-2xl items-end">
                  <p>{format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}</p>
                  <p>
                    - ({format(parseISO(firstData?.dt_txt ?? ""), "dd.MM.yyyy")}
                    )
                  </p>
                </h2>
                <Container className="gap-10 px-6 items-center">
                  {/* Temperature */}
                  <div className="flex flex-col px-4">
                    <span className="text-5xl">
                      {convertTemp(firstData?.main.temp).toFixed(2)}
                      {isCelsius ? "° C" : "K"}
                    </span>
                    <p className="text-xs space-x-1 whitespace-nowrap">
                      <span>Feels like</span>
                      <span>
                        {convertTemp(firstData?.main.feels_like).toFixed(2)}
                      </span>
                    </p>
                    <p className="text-xs space-x-2">
                      <span>
                        {convertTemp(firstData?.main.temp_min).toFixed(2)}
                      </span>
                      <span>
                        {convertTemp(firstData?.main.temp_max).toFixed(2)}
                      </span>
                    </p>
                  </div>
                  <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => setIsCelsius((prev) => !prev)}
                  >
                    Toggle to {isCelsius ? "Kelvin" : "Celsius"}
                  </button>
                  {/* time & Weather icon */}
                  <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                    {data?.list.map((item) => (
                      <div
                        key={uuidv4()}
                        className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                      >
                        <p className="whitespace-nowrap">
                          {format(parseISO(item.dt_txt), "h:mm a")}
                        </p>
                        <WeatherIcon
                          iconName={getDayOrNightIcon(
                            item.weather[0].icon,
                            item.dt_txt
                          )}
                        />
                        <p>{convertTemp(item?.main.temp).toFixed(2)}°</p>
                      </div>
                    ))}
                  </div>
                </Container>
              </div>
              <div className="flex gap-4">
                {/* left */}
                <Container className="w-fit justify-center flex-col px-4 items-center">
                  <p className="capitalize text-center">
                    {firstData?.weather[0].description}
                  </p>
                  <WeatherIcon
                    iconName={getDayOrNightIcon(
                      firstData?.weather[0].icon ?? "",
                      firstData?.dt_txt ?? ""
                    )}
                  />
                </Container>
                <Container className="bg-yellow-300/80 px-6 gap-4 justify-between overflow-x-auto">
                  <WeatherDetails
                    airPressure={`${firstData?.main.pressure} hPa`}
                    humidity={`${firstData?.main.humidity}%`}
                    sunrise={format(
                      fromUnixTime(data?.city.sunrise ?? 1702949452),
                      "H:mm"
                    )}
                    sunset={format(
                      fromUnixTime(data?.city.sunset ?? 1702517657),
                      "H:mm"
                    )}
                    visibility={metersToKilometers(
                      firstData?.visibility ?? 1000
                    )}
                    windSpeed={convertWindSpeed(firstData?.wind.speed ?? 1.64)}
                  />
                </Container>
              </div>
            </section>
            {/* 7 Day forecast Data */}
            <section className="flex w-full flex-col gap-4">
              <p className="text-2xl">Forecast - (7 days)</p>
              {firstDataForcastEachDate.map((item) => (
                <ForcastWeatherDetail
                  key={uuidv4()}
                  description={item?.weather[0].description ?? ""}
                  weatherIcon={item?.weather[0].icon ?? "01d"}
                  date={format(parseISO(item?.dt_txt ?? ""), "dd.MM")}
                  day={format(parseISO(item?.dt_txt ?? ""), "EEEE")}
                  feels_like={convertTemp(item?.main.feels_like).toFixed(2)}
                  temp={convertTemp(item?.main.temp).toFixed(2)}
                  airPressure={`${item?.main.pressure} hPa`}
                  humidity={`${item?.main.humidity}%`}
                  sunrise={format(
                    fromUnixTime(data?.city.sunrise ?? 1702949452),
                    "H:mm"
                  )}
                  sunset={format(
                    fromUnixTime(data?.city.sunset ?? 1702517657),
                    "H:mm"
                  )}
                  visibility={`${metersToKilometers(
                    firstData?.visibility ?? 1000
                  )}`}
                  windSpeed={`${convertWindSpeed(
                    firstData?.wind.speed ?? 1.64
                  )}`}
                />
              ))}
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default HomePage;
