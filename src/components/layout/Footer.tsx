import Logo from '../ui/Logo';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200/60 bg-white">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Logo />
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} Smart Crop Advisor. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
