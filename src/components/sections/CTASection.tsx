import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import type React from 'react';

export default function CTASection(): React.ReactElement {
  return (
    <section className="py-16 px-6">
      <div className="max-w-2xl mx-auto bg-[#2e5d40] rounded-2xl px-8 py-12 text-center flex flex-col items-center gap-5">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight m-0">
          Ready to Transform Your Farming?
        </h2>
        <p className="text-sm text-white/75 leading-relaxed">
          Join thousands of farmers using AI to make smarter decisions.
        </p>
        <Button variant="outline-white">
          Start Free Trial <ArrowRight size={15} />
        </Button>
      </div>
    </section>
  );
}
