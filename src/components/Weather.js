import React, { useEffect, useState } from 'react';

export const Weather = () => {
  const [weather, setWeather] = useState();
  const [isFetching, setIsFetching] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function getLondonWeather() {
      try {
        const data = await (
          await fetch('https://www.mattclough.com/api/weather/0.1276,51.5072')
        ).json();
        if (data.currently) {
          setWeather(data);
        }
        if (data.error) {
          setHasError(true);
        }
      } catch (error) {
        setHasError(true);
      }

      setIsFetching(false);
    }

    getLondonWeather();
  }, []);

  return isFetching ? (
    'Getting the weather...'
  ) : hasError ? (
    'Okay, something went wrong 😅'
  ) : (
    <div className="speech-demo__companion--weather">
      It&apos;s {(((weather.currently.temperature - 32) * 5) / 9).toFixed(0)}&deg; and{' '}
      {weather.currently.summary.toLowerCase()} in London.
    </div>
  );
};
