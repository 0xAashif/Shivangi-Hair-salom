import { useTheme } from '../context/ThemeContext';

export default function AnimatedBackground() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      data-testid="animated-background"
      data-theme={theme}
      aria-hidden="true"
      className={`fixed inset-0 -z-10 pointer-events-none overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-[#070709]' : 'bg-[#F4F1EA]'
      }`}
    >
      {/* Top Key Light: Warm Champagne Brass Studio Wash */}
      <div
        className={`absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[520px] rounded-full blur-[130px] ${
          isDark
            ? 'bg-[radial-gradient(circle,rgba(197,160,89,0.16)_0%,rgba(197,160,89,0.04)_48%,transparent_72%)]'
            : 'bg-[radial-gradient(circle,rgba(197,160,89,0.22)_0%,rgba(255,255,255,0.45)_52%,transparent_76%)]'
        }`}
      />
      {/* Side Rim Light: Subtle Mid-Page Ambient Glow */}
      <div
        className={`hidden sm:block absolute top-[44%] -right-40 w-[680px] h-[680px] rounded-full blur-[140px] ${
          isDark
            ? 'bg-[radial-gradient(circle,rgba(197,160,89,0.11)_0%,transparent_70%)]'
            : 'bg-[radial-gradient(circle,rgba(154,120,72,0.12)_0%,transparent_70%)]'
        }`}
      />
      {/* Lower-Left Fill Light */}
      <div
        className={`hidden sm:block absolute -bottom-40 -left-32 w-[620px] h-[620px] rounded-full blur-[140px] ${
          isDark
            ? 'bg-[radial-gradient(circle,rgba(197,160,89,0.09)_0%,transparent_70%)]'
            : 'bg-[radial-gradient(circle,rgba(197,160,89,0.14)_0%,transparent_70%)]'
        }`}
      />
    </div>
  );
}
