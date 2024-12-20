"use client";

import { MdMyLocation, MdOutlineLocationOn, MdWbSunny } from "react-icons/md";
import { loadingCityAtom, placeAtom } from "@/app/(roots)/atom";
import { FormEvent, useState } from "react";
import { useAtom } from "jotai";

import SuggestionBox from "../modules/SuggestionBox";
import SearchBox from "../elements/SearchBox";
import axios from "axios";

const Navbar = ({ location }: { location?: string }) => {
  // ============ Atom ==============
  const [, setPlace] = useAtom(placeAtom);
  const [, setLoading] = useAtom(loadingCityAtom);

  // ============ State ==============
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // ============ Change Function ==============
  const changeInputHandler = async (value: string) => {
    setCity(value);
    if (value.length >= 3) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
        );
        const suggestions = response.data.list.map(
          (item: { name: string }) => item.name
        );
        setSuggestions(suggestions);
        setError("");
        setShowSuggestions(true);
      } catch (error) {
        console.log(error);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // ============ Suggest Handler ==============
  const suggestionClickHandler = (value: string) => {
    setCity(value);
    setShowSuggestions(false);
  };

  // ============ Submit Function ==============
  const submitSearchHandler = (event: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    console.log(suggestions);
    if (suggestions.length == 0) {
      setError("Location Not Found");
      setLoading(false);
    } else {
      setError("");
      setTimeout(() => {
        setLoading(false);
        setPlace(city);
        setShowSuggestions(false);
      }, 500);
    }
  };

  // ============ Location Function  ==============
  const currentLocationHandler = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          setLoading(true);
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
          );
          setTimeout(() => {
            setLoading(false);
            setPlace(response.data.name);
          }, 500);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      });
    }
  };

  // ============ Rendering ==============
  return (
    <>
      <nav className="shadow-sm sticky top-0 z-50 bg-white">
        <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-gray-500 text-3xl">Weather</h2>
            <MdWbSunny className="text-3xl mt-1 text-yellow-300" />
          </div>
          <section className="flex gap-2 items-center">
            <MdMyLocation
              onClick={currentLocationHandler}
              title="Your Current Location"
              className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer"
            />
            <MdOutlineLocationOn className="text-3xl" />
            <p className="text-slate-900/80 text-sm">{location}</p>
            <div className="relative hidden md:flex">
              <SearchBox
                value={city}
                onSubmmit={submitSearchHandler}
                onChange={(event) => changeInputHandler(event.target.value)}
              />
              <SuggestionBox
                {...{
                  error,
                  suggestions,
                  showSuggestions,
                  suggestionClickHandler,
                }}
              />
            </div>
          </section>
        </div>
      </nav>
      <section className="flex max-w-7xl px-3 md:hidden">
        <div className="relative">
          <SearchBox
            value={city}
            onSubmmit={submitSearchHandler}
            onChange={(event) => changeInputHandler(event.target.value)}
          />
          <SuggestionBox
            {...{
              error,
              suggestions,
              showSuggestions,
              suggestionClickHandler,
            }}
          />
        </div>
      </section>
    </>
  );
};

export default Navbar;
