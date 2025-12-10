import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            // Premium gradient colors
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'gradient-premium': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'gradient-purple': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                'gradient-blue': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                'gradient-dark': 'linear-gradient(135deg, #1e3a8a 0%, #312e81 50%, #1e1b4b 100%)',
            },
            // Premium shadows
            boxShadow: {
                'glow': '0 0 20px rgba(139, 92, 246, 0.5)',
                'glow-lg': '0 0 30px rgba(139, 92, 246, 0.6)',
                'premium': '0 20px 50px rgba(139, 92, 246, 0.3)',
                'card': '0 4px 15px 0 rgba(0, 0, 0, 0.1)',
            },
            // Smooth animations
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'slide-up': 'slide-up 0.5s ease-out',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                glow: {
                    'from': { boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)' },
                    'to': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.8)' },
                },
                'slide-up': {
                    'from': { transform: 'translateY(20px)', opacity: '0' },
                    'to': { transform: 'translateY(0)', opacity: '1' },
                },
            },
            // Glassmorphism utilities
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
};

export default config;
