export default function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-[#f3f4f2] rounded-2xl border border-gray-200/60 p-7 flex flex-col gap-5">
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-[#e4ebe5] flex items-center justify-center flex-shrink-0">
        <Icon size={22} className="text-[#2e5d40]" strokeWidth={1.5} />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2.5">
        <h3 className="text-xl font-semibold text-gray-900 m-0">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
