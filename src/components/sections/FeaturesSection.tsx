import { Brain, Cloud, TriangleAlert, Sprout, MapPin } from 'lucide-react';
import FeatureCard from '../ui/FeatureCard';
import type React from 'react';
import type { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: Brain,
    title: 'AI Recommendations',
    description:
      'Get intelligent crop recommendations powered by advanced machine learning algorithms.',
  },
  {
    icon: Cloud,
    title: 'Weather Analysis',
    description:
      'Real-time weather monitoring and forecasting to optimize your farming decisions.',
  },
  {
    icon: TriangleAlert,
    title: 'Disease Risk Detection',
    description:
      'Early warning system for crop diseases to protect your harvest.',
  },
  {
    icon: Sprout,
    title: 'Fertilizer Optimization',
    description:
      'Precise fertilizer recommendations based on soil and crop analysis.',
  },
  {
    icon: MapPin,
    title: 'Field Management',
    description:
      'Comprehensive field tracking and management for all your properties.',
  },
];

export default function FeaturesSection(): React.ReactElement {
  return (
    <section className="py-16 px-6">
      {/* Section header */}
      <div className="max-w-xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-3">
          Everything You Need to Succeed
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed">
          Our comprehensive platform provides all the tools you need for modern,
          data-driven farming.
        </p>
      </div>

      {/* Cards grid */}
      <div className="max-w-5xl mx-auto">
        {/* Row 1 – 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {FEATURES.slice(0, 3).map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>

        {/* Row 2 – 2 cards left-aligned */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.slice(3).map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}
