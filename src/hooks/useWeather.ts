import {
    Sun, Cloud, CloudRain, Droplets, Wind, Eye, Gauge,
    Thermometer, CloudDrizzle,
} from 'lucide-react';
import type {
    CurrentWeatherMetric, ForecastDay, TemperaturePoint,
    HumidityPoint, RainfallPoint, WeatherImpact,
} from '../api/types/weather';

export interface UseWeatherReturn {
    currentMetrics: CurrentWeatherMetric[];
    forecast: ForecastDay[];
    temperatureData: TemperaturePoint[];
    humidityData: HumidityPoint[];
    rainfallData: RainfallPoint[];
    impacts: WeatherImpact[];
}

const currentMetrics: CurrentWeatherMetric[] = [
    { label: 'Humidity', value: '65%', icon: Droplets },
    { label: 'Wind Speed', value: '12 km/h', icon: Wind },
    { label: 'Visibility', value: '10 km', icon: Eye },
    { label: 'Pressure', value: '1013 mb', icon: Gauge },
];

const forecast: ForecastDay[] = [
    { day: 'Mon', date: 'Mar 24', icon: Sun, temp: 26, humidity: 65, rainfall: 5 },
    { day: 'Tue', date: 'Mar 25', icon: Sun, temp: 28, humidity: 60 },
    { day: 'Wed', date: 'Mar 26', icon: CloudRain, temp: 24, humidity: 75, rainfall: 12 },
    { day: 'Thu', date: 'Mar 27', icon: Cloud, temp: 25, humidity: 70, rainfall: 8 },
    { day: 'Fri', date: 'Mar 28', icon: Sun, temp: 27, humidity: 65, rainfall: 2 },
    { day: 'Sat', date: 'Mar 29', icon: Sun, temp: 29, humidity: 58 },
    { day: 'Sun', date: 'Mar 30', icon: Sun, temp: 28, humidity: 62 },
];

const temperatureData: TemperaturePoint[] = [
    { time: '00:00', temp: 17 },
    { time: '03:00', temp: 15 },
    { time: '06:00', temp: 16 },
    { time: '09:00', temp: 21 },
    { time: '12:00', temp: 25 },
    { time: '15:00', temp: 28 },
    { time: '18:00', temp: 26 },
    { time: '21:00', temp: 22 },
];

const humidityData: HumidityPoint[] = [
    { day: 'Mon', humidity: 65 },
    { day: 'Tue', humidity: 60 },
    { day: 'Wed', humidity: 75 },
    { day: 'Thu', humidity: 70 },
    { day: 'Fri', humidity: 65 },
    { day: 'Sat', humidity: 58 },
    { day: 'Sun', humidity: 62 },
];

const rainfallData: RainfallPoint[] = [
    { month: 'Jan', rainfall: 45 },
    { month: 'Feb', rainfall: 38 },
    { month: 'Mar', rainfall: 52 },
    { month: 'Apr', rainfall: 68 },
    { month: 'May', rainfall: 85 },
    { month: 'Jun', rainfall: 72 },
];

const impacts: WeatherImpact[] = [
    {
        label: 'Temperature',
        description: 'Current conditions are optimal for crop growth',
        level: 'Excellent',
        percent: 92,
        icon: Thermometer,
        iconBg: 'bg-green-100',
        iconColor: 'text-green-600',
        barColor: 'bg-green-500',
        levelColor: 'text-green-600',
    },
    {
        label: 'Moisture',
        description: 'Soil moisture levels need monitoring',
        level: 'Good',
        percent: 75,
        icon: Droplets,
        iconBg: 'bg-yellow-100',
        iconColor: 'text-yellow-600',
        barColor: 'bg-yellow-500',
        levelColor: 'text-yellow-600',
    },
    {
        label: 'Rainfall',
        description: 'Expected rain in 2 days - plan irrigation accordingly',
        level: 'Moderate',
        percent: 55,
        icon: CloudDrizzle,
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600',
        barColor: 'bg-blue-500',
        levelColor: 'text-blue-600',
    },
];

export function useWeather(): UseWeatherReturn {
    return {
        currentMetrics,
        forecast,
        temperatureData,
        humidityData,
        rainfallData,
        impacts,
    };
}
