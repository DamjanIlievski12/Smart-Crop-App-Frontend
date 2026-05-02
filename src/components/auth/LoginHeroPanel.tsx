import type React from 'react';

export default function LoginHeroPanel(): React.ReactElement {
  return (
    <div
      className="hidden lg:block relative"
      style={{
        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)',
      }}
    >
      <div className="absolute inset-0 bg-black/20" />
      <img
        src="https://images.unsplash.com/photo-1627842822558-c1f15aef9838?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080"
        alt="Wheat field at sunset"
        className="absolute inset-0 w-full h-full object-cover opacity-75"
      />
      <div className="relative h-full flex items-center justify-center p-12">
        <div className="text-white text-center space-y-6 max-w-lg">
          <h2 className="text-4xl font-bold leading-tight">Transform Your Farming with AI</h2>
          <p className="text-lg opacity-90 leading-relaxed">
            Join thousands of farmers making data-driven decisions for better yields and healthier crops.
          </p>
        </div>
      </div>
    </div>
  );
}