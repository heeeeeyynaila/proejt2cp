export function ArcioLogo({ size = 'md', subtitle = '', collapsed = false }) {
  const sizes = {
    sm: { text: 'text-base', sub: 'text-[9px]' },
    md: { text: 'text-xl', sub: 'text-[10px]' },
    lg: { text: 'text-3xl', sub: 'text-xs' },
    xl: { text: 'text-4xl', sub: 'text-sm' },
  };

  const s = sizes[size] || sizes.md;

  return (
    <div className={`flex items-center ${collapsed ? 'justify-center' : ''}`}>
      {/* Text */}
      <div className="flex flex-col">
        <span className={`${s.text} font-extrabold text-[#1a1a2e] tracking-tight leading-tight`}>
          {collapsed ? 'A' : 'Arcio'}
        </span>
        {!collapsed && subtitle && (
          <span className={`${s.sub} font-bold text-[#94a3b8] uppercase tracking-[0.15em] leading-tight`}>
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}
