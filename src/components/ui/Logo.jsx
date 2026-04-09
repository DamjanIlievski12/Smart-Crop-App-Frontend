export default function Logo() {
  return (
    <a href="/" className="flex items-center gap-2.5 no-underline">
      {/* Leaf / crop icon */}
      <div className="w-8 h-8 rounded-lg bg-[#2e5d40] flex items-center justify-center flex-shrink-0">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 2C9 2 3 5 3 10C3 13.3 5.7 16 9 16C12.3 16 15 13.3 15 10C15 5 9 2 9 2Z"
            fill="white"
            fillOpacity="0.9"
          />
          <path
            d="M9 16V9M9 9C9 9 6 7 4.5 5"
            stroke="#2e5d40"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <span
        className="font-semibold text-[15px] text-gray-900 tracking-tight"
        style={{ fontFamily: '"DM Sans", sans-serif' }}
      >
        Smart Crop Advisor
      </span>
    </a>
  );
}
