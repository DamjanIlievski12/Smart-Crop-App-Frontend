import AppLayout from '../components/layout/AppLayout';
import PageHeader from '../components/ui/PageHeader';
import CurrentWeatherCard from '../components/weather/CurrentWeatherCard';
import ForecastCard from '../components/weather/ForecastCard';
import TemperatureTrendCard from '../components/weather/TemperatureTrendCard';
import HumidityTrendCard from '../components/weather/HumidityTrendCard';
import RainfallCard from '../components/weather/RainfallCard';
import WeatherImpactCard from '../components/weather/WeatherImpactCard';
import { useWeather } from '../hooks/useWeather';
import type React from 'react';

export default function WeatherPage(): React.ReactElement {
  const {
    currentMetrics,
    forecast,
    temperatureData,
    humidityData,
    rainfallData,
    impacts,
  } = useWeather();

  return (
    <AppLayout>
      <PageHeader
        title="Weather Analytics"
        subtitle="Real-time weather monitoring and forecasting for your fields"
      />

      <CurrentWeatherCard metrics={currentMetrics} />
      <ForecastCard forecast={forecast} />

      <div className="flex gap-4 mb-4">
        <TemperatureTrendCard data={temperatureData} />
        <HumidityTrendCard data={humidityData} />
      </div>

      <RainfallCard data={rainfallData} />
      <WeatherImpactCard impacts={impacts} />
    </AppLayout>
  );
}
