import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/ui/PageHeader";
import CurrentWeatherCard from "../components/weather/CurrentWeatherCard";
import ForecastCard from "../components/weather/ForecastCard";
import TemperatureTrendCard from "../components/weather/TemperatureTrendCard";
import HumidityTrendCard from "../components/weather/HumidityTrendCard";
import RainfallCard from "../components/weather/RainfallCard";
import WeatherImpactCard from "../components/weather/WeatherImpactCard";
import { useWeather } from "../hooks/useWeather";
import type React from "react";
import NoFieldsPrompt from "../components/shared/NoFieldsPrompt";
import FieldSelectorPrompt from "../components/shared/FieldSelectorPrompt";

export default function WeatherPage(): React.ReactElement {
  const {
    fields,
    selectedFieldId,
    setSelectedFieldId,
    temp,
    condition,
    lastUpdated,
    fieldLocation,
    currentMetrics,
    forecast,
    temperatureData,
    humidityData,
    rainfallData,
    impacts,
    isLoadingFields,
    isLoadingWeather,
    hasFields,
  } = useWeather();

  const header = (
    <PageHeader
      title="Weather Analytics"
      subtitle="Real-time weather monitoring and forecasting for your fields"
    />
  );

  if (isLoadingFields) {
    return (
      <AppLayout>
        {header}
        <div className="flex items-center justify-center py-20 text-gray-400 text-sm">
          Loading fields…
        </div>
      </AppLayout>
    );
  }

  if (!hasFields) {
    return (
      <AppLayout>
        {header}
        <NoFieldsPrompt message="Add a field first to view location-specific weather data, forecasts, and agricultural impact analysis." />
      </AppLayout>
    );
  }

  if (selectedFieldId === null) {
    return (
      <AppLayout>
        {header}
        <FieldSelectorPrompt
          fields={fields}
          onSelect={setSelectedFieldId}
          message="Select a field to view its weather data and forecast."
        />
      </AppLayout>
    );
  }

  if (isLoadingWeather) {
    return (
      <AppLayout>
        {header}
        <div className="flex items-center justify-center py-20 text-gray-400 text-sm">
          Loading weather data…
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {header}

      {/* Field switcher */}
      <div className="mb-4">
        <FieldSelectorPrompt
          fields={fields}
          selectedFieldId={selectedFieldId}
          onSelect={setSelectedFieldId}
          compact
        />
      </div>
      <CurrentWeatherCard
        metrics={currentMetrics}
        temp={temp}
        condition={condition}
        location={fieldLocation}
        lastUpdated={lastUpdated}
      />
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
