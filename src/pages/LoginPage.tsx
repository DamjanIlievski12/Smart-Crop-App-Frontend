import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Sprout, Eye, EyeOff } from 'lucide-react';
import type { FocusEvent, MouseEvent } from 'react';
import React from 'react';

export default function LoginPage(): React.ReactElement {
  const [searchParams] = useSearchParams();
  const [isRegister, setIsRegister] = useState<boolean>(searchParams.get('mode') === 'signup');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // TODO: connect to your auth API
    void navigate('/');
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>): void => {
    e.target.style.borderColor = 'var(--color-primary)';
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>): void => {
    e.target.style.borderColor = 'var(--color-border)';
  };

  const handleMouseOver = (e: MouseEvent<HTMLElement>): void => {
    (e.target as HTMLElement).style.color = 'var(--color-primary-hover)';
  };

  const handleMouseOut = (e: MouseEvent<HTMLElement>): void => {
    (e.target as HTMLElement).style.color = 'var(--color-primary)';
  };

  const handleButtonMouseOver = (e: MouseEvent<HTMLButtonElement>): void => {
    e.currentTarget.style.background = 'var(--color-primary-hover)';
  };

  const handleButtonMouseOut = (e: MouseEvent<HTMLButtonElement>): void => {
    e.currentTarget.style.background = 'var(--color-primary)';
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2" style={{ background: 'var(--color-bg-page)' }}>

      {/* ── Left Side – Form ── */}
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--color-primary)' }}
            >
              <Sprout className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 leading-tight">Smart Crop Advisor</p>
              <p className="text-xs text-gray-400 leading-tight">AI-powered farming platform</p>
            </div>
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              {isRegister ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-sm text-gray-500 mt-1.5">
              {isRegister
                ? 'Start your journey to smarter farming'
                : 'Sign in to access your dashboard'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {isRegister && (
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  placeholder="John Farmer"
                  required
                  className="w-full px-4 py-3 rounded-lg border text-sm text-gray-900 placeholder-gray-400 outline-none transition-all"
                  style={{
                    background: '#f9f9f7',
                    borderColor: 'var(--color-border)',
                  }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-lg border text-sm text-gray-900 placeholder-gray-400 outline-none transition-all"
                style={{
                  background: '#f9f9f7',
                  borderColor: 'var(--color-border)',
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 pr-11 rounded-lg border text-sm text-gray-900 placeholder-gray-400 outline-none transition-all"
                  style={{
                    background: '#f9f9f7',
                    borderColor: 'var(--color-border)',
                  }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Remember me / Forgot password (login only) */}
            {!isRegister && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded"
                    style={{ accentColor: 'var(--color-primary)' }}
                  />
                  <span className="text-gray-500">Remember me</span>
                </label>
                <a
                  href="#"
                  className="font-medium transition-colors"
                  style={{ color: 'var(--color-primary)' }}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  Forgot password?
                </a>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg text-sm font-semibold text-white transition-all duration-200 active:scale-[0.98]"
              style={{ background: 'var(--color-primary)' }}
              onMouseOver={handleButtonMouseOver}
              onMouseOut={handleButtonMouseOut}
            >
              {isRegister ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          {/* Switch mode */}
          <p className="text-center text-sm text-gray-500">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setIsRegister((r) => !r)}
              className="font-semibold transition-colors"
              style={{ color: 'var(--color-primary)' }}
              onMouseOver={handleButtonMouseOver}
              onMouseOut={handleButtonMouseOut}
            >
              {isRegister ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>

      {/* ── Right Side – Image panel ── */}
      <div
        className="hidden lg:block relative"
        style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)' }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <img
          src="https://images.unsplash.com/photo-1627842822558-c1f15aef9838?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Wheat field at sunset"
          className="absolute inset-0 w-full h-full object-cover opacity-75"
        />
        <div className="relative h-full flex items-center justify-center p-12">
          <div className="text-white text-center space-y-6 max-w-lg">
            <h2 className="text-4xl font-bold leading-tight">
              Transform Your Farming with AI
            </h2>
            <p className="text-lg opacity-90 leading-relaxed">
              Join thousands of farmers making data-driven decisions for better
              yields and healthier crops.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}