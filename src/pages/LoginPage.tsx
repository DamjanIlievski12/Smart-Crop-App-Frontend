import type React from 'react';
import { useLoginForm } from '../hooks/useLoginForm';
import LoginHeroPanel from '../components/auth/LoginHeroPanel';
import LoginPanel from '../components/auth/LoginPanel';

export default function LoginPage(): React.ReactElement {
  const loginForm = useLoginForm();
  
  return (
    <div className="min-h-screen grid lg:grid-cols-2" style={{ background: 'var(--color-bg-page)' }}>
      <LoginPanel {...loginForm} />
      <LoginHeroPanel />
    </div>
  );
}