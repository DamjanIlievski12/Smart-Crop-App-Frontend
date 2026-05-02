import { Sprout } from 'lucide-react';
import type React from 'react';
import LoginForm from './LoginForm';
import type { UseLoginFormReturn } from '../../hooks/useLoginForm';

type LoginPanelProps = Omit<UseLoginFormReturn, 'isRegister'> & { isRegister: boolean };

export default function LoginPanel(props: LoginPanelProps): React.ReactElement {
  return (
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

        <LoginForm {...props} />
      </div>
    </div>
  );
}