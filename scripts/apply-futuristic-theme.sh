#!/usr/bin/env bash
set -euo pipefail

echo "==> Applying Futuristic Purple + Cyan Glow Theme"

# 1. Update SCSS variables
echo "==> Updating src/styles/_variables.scss"
cat > src/styles/_variables.scss <<'EOF'
$background: #0F172A;       // deep navy
$primary: #7C3AED;          // electric purple
$accent: #06B6D4;           // cyan glow
$text: #E2E8F0;             // light gray
$text-muted: #94A3B8;       // slate gray
EOF

# 2. Update main.scss with glow styles
echo "==> Updating src/styles/main.scss"
cat > src/styles/main.scss <<'EOF'
@import './_variables';

body {
  background: $background;
  color: $text;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.text-primary-glow {
  color: $primary;
  text-shadow: 0 0 20px rgba($primary, 0.6);
}

.text-accent-glow {
  color: $accent;
  text-shadow: 0 0 20px rgba($accent, 0.6);
}

.card--dark {
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid rgba($primary, 0.3);
  border-radius: 14px;
  padding: 1rem;
  box-shadow: 0 0 20px rgba($accent, 0.25);
}

.btn-metallic {
  background: linear-gradient(135deg, $primary, $accent);
  border: none;
  color: $text;
  border-radius: 9999px;
  padding: 0.75rem 1.25rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 0 12px rgba($accent, 0.6);
  transition: transform 0.2s ease;
  &:hover { transform: scale(1.05); }
}
EOF

# 3. Replace emerald/gray classes in JSX with purple/cyan equivalents
echo "==> Replacing Tailwind classes in components"
find src/components -type f -name "*.jsx" -print0 | xargs -0 sed -i \
  -e 's/text-emerald-500/accent-purple-600 hover:accent-cyan-400/g' \
  -e 's/bg-gray-700/bg-slate-700/g' \
  -e 's/hover:bg-gray-800/hover:bg-slate-800/g' \
  -e 's/bg-emerald-500/bg-gradient-to-r from-purple-600 to-cyan-500/g' \
  -e 's/hover:bg-emerald-600/hover:scale-105 transition/g' \
  -e 's/text-gray-700/text-slate-300/g' \
  -e 's/text-gray-600/text-slate-400/g' \
  -e 's/text-gray-800/text-slate-200/g'

echo "==> Futuristic theme applied successfully!"
