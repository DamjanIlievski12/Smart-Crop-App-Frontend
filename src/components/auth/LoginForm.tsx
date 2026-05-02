import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import type React from 'react';
import type { UseLoginFormReturn } from '../../hooks/useLoginForm';

type LoginFormProps = Pick<
  UseLoginFormReturn,
  | 'form'
  | 'isRegister'
  | 'showPassword'
  | 'isSubmitting'
  | 'error'
  | 'handleChange'
  | 'handleSubmit'
  | 'handleFocus'
  | 'handleBlur'
  | 'handleBtnMouseOver'
  | 'handleBtnMouseOut'
  | 'handleLinkMouseOver'
  | 'handleLinkMouseOut'
  | 'toggleShowPassword'
  | 'toggleMode'
>;

export default function LoginForm({
  form,
  isRegister,
  showPassword,
  isSubmitting,
  error,
  handleChange,
  handleSubmit,
  handleFocus,
  handleBlur,
  handleBtnMouseOver,
  handleBtnMouseOut,
  handleLinkMouseOver,
  handleLinkMouseOut,
  toggleShowPassword,
  toggleMode,
}: LoginFormProps): React.ReactElement {
  return (
    <div className="w-full max-w-md space-y-8">

      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          {isRegister ? 'Create Account' : 'Welcome Back'}
        </h1>
        <p className="text-sm text-gray-500 mt-1.5">
          {isRegister ? 'Start your journey to smarter farming' : 'Sign in to access your dashboard'}
        </p>
      </div>

      {/* Error banner */}
      {error && (
        <div className="flex items-start gap-2.5 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">

        {isRegister && (
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text" name="fullName" value={form.fullName} onChange={handleChange}
              placeholder="John Farmer" required
              className="w-full px-4 py-3 rounded-lg border text-sm text-gray-900 placeholder-gray-400 outline-none transition-all"
              style={{ background: '#f9f9f7', borderColor: 'var(--color-border)' }}
              onFocus={handleFocus} onBlur={handleBlur}
            />
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email" name="email" value={form.email} onChange={handleChange}
            placeholder="you@example.com" required
            className="w-full px-4 py-3 rounded-lg border text-sm text-gray-900 placeholder-gray-400 outline-none transition-all"
            style={{ background: '#f9f9f7', borderColor: 'var(--color-border)' }}
            onFocus={handleFocus} onBlur={handleBlur}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange}
              placeholder="••••••••" required
              className="w-full px-4 py-3 pr-11 rounded-lg border text-sm text-gray-900 placeholder-gray-400 outline-none transition-all"
              style={{ background: '#f9f9f7', borderColor: 'var(--color-border)' }}
              onFocus={handleFocus} onBlur={handleBlur}
            />
            <button
              type="button" onClick={toggleShowPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </div>

        {!isRegister && (
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" className="w-4 h-4 rounded" style={{ accentColor: 'var(--color-primary)' }} />
              <span className="text-gray-500">Remember me</span>
            </label>
            <a
              href="#"
              className="font-medium transition-colors"
              style={{ color: 'var(--color-primary)' }}
              onMouseOver={handleLinkMouseOver}
              onMouseOut={handleLinkMouseOut}
            >
              Forgot password?
            </a>
          </div>
        )}

        <button
          type="submit" disabled={isSubmitting}
          className="w-full py-3 rounded-lg text-sm font-semibold text-white transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ background: 'var(--color-primary)' }}
          onMouseOver={handleBtnMouseOver} onMouseOut={handleBtnMouseOut}
        >
          {isSubmitting
            ? (isRegister ? 'Creating account…' : 'Signing in…')
            : (isRegister ? 'Create Account' : 'Sign In')}
        </button>
      </form>

      {/* Switch mode */}
      <p className="text-center text-sm text-gray-500">
        {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          onClick={toggleMode}
          className="font-semibold transition-colors"
          style={{ color: 'var(--color-primary)' }}
          onMouseOver={handleBtnMouseOver} onMouseOut={handleBtnMouseOut}
        >
          {isRegister ? 'Sign In' : 'Sign Up'}
        </button>
      </p>
    </div>
  );
}