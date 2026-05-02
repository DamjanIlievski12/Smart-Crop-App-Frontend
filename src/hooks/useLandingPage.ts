import type { ComponentType } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/sections/HeroSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import CTASection from '../components/sections/CTASection';

export interface LandingSectionGroup {
    background: string;
    components: ComponentType[];
    flex?: boolean;
}

export interface UseLandingPageReturn {
    sectionGroups: LandingSectionGroup[];
}

const sectionGroups: LandingSectionGroup[] = [
    {
        background: 'bg-[#f0f0eb]',
        components: [Navbar, HeroSection],
    },
    {
        background: 'bg-white',
        components: [FeaturesSection],
    },
    {
        background: 'bg-[#f0f0eb]',
        components: [CTASection, Footer],
        flex: true,
    },
];

export function useLandingPage(): UseLandingPageReturn {
    return { sectionGroups };
}
