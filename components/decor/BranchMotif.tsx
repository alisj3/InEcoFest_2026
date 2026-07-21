// components/decor/BranchMotif.tsx
export function BranchMotif({ className = '', color = '#1F3626' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 260 300" className={className} fill="none" aria-hidden="true">
      <g stroke={color} strokeWidth="1.5" strokeLinecap="round">
        <path d="M 120 280 C 130 220 150 160 190 90" />
        <path d="M 150 220 C 130 210 105 205 85 215" />
        <path d="M 150 220 C 165 205 185 195 205 198" />
        <path d="M 168 170 C 148 165 128 168 112 182" />
        <path d="M 168 170 C 185 158 205 155 222 165" />
        <path d="M 178 130 C 160 120 140 120 125 132" />
        <path d="M 178 130 C 195 116 215 112 232 122" />
      </g>
      <g fill={color} opacity="0.85">
        <path d="M 85 215 C 70 205 65 190 75 178 C 90 185 95 200 85 215 Z" />
        <path d="M 205 198 C 222 190 232 175 225 160 C 208 165 200 182 205 198 Z" />
        <path d="M 112 182 C 96 175 88 160 96 147 C 112 152 118 168 112 182 Z" />
        <path d="M 222 165 C 238 155 245 138 235 125 C 220 132 214 150 222 165 Z" />
        <path d="M 125 132 C 108 128 98 114 104 100 C 120 103 128 118 125 132 Z" />
        <path d="M 232 122 C 248 112 253 96 242 84 C 227 92 222 108 232 122 Z" />
      </g>
      <circle cx="190" cy="90" r="4" fill="#C1622D" />
    </svg>
  );
}