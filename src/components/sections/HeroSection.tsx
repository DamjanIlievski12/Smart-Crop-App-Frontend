import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import type React from 'react';

export default function HeroSection(): React.ReactElement {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-14 pb-16 flex flex-col md:flex-row items-center gap-10 md:gap-14">
      {/* Left – text content */}
      <div className="flex-1 flex flex-col items-start gap-5">
        {/* Badge */}
        <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-gray-600 bg-gray-200/70 rounded-full tracking-wide">
          AI-Powered Agriculture Platform
        </span>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight m-0">
          Smart Crop Advisor
        </h1>

        {/* Description */}
        <p className="text-base text-gray-500 leading-relaxed max-w-md">
          AI-powered crop recommendations for healthier, smarter farming.
          Make data-driven decisions to maximize your harvest.
        </p>

        {/* CTA buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          <Link to="/login?mode=signup">
            <Button variant="primary">
              Get Started <ArrowRight size={15} />
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline">Login</Button>
          </Link>
        </div>
      </div>

      {/* Right – hero image */}
      <div className="flex-1 w-full md:max-w-[460px]">
        <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
          {/*
            To use your own photo: place it in src/assets/images/hero-farm.jpg
            and replace the img below with:
              import heroFarm from '../assets/images/hero-farm.jpg';
              <img src={heroFarm} ... />
          */}
          <img
            src="https://images.unsplash.com/photo-1771181999292-50489609eab9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyZSUyMGZhcm0lMjBmaWVsZCUyMGdyZWVuJTIwY3JvcHN8ZW58MXx8fHwxNzc0NTUxMjY3fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Green farm field with crop rows"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
