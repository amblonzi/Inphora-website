import React from 'react';

export const Icons = {
    // Service Icons
    Brain: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
            <path d="M12 12L2.2 4.2" />
            <path d="M12 12L22 12" />
            <path d="M12 12l7.8 7.8" />
            <circle cx="12" cy="12" r="2" />
        </svg>
    ),
    Code: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
            <line x1="12" y1="2" x2="12" y2="22" />
        </svg>
    ),
    Shield: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
    ),
    Cloud: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M17.5 19c.33 0 .66 0 1-.03a5.5 5.5 0 0 0 1-10.97A7.5 7.5 0 0 0 6 10c0 .9.17 1.76.5 2.5a5.5 5.5 0 0 0 1 10.97c.34.03.67.03 1 .03" />
        </svg>
    ),

    // Social & UI Icons
    WhatsApp: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.44-9.89 9.886-.001 2.15.652 3.791 1.646 5.41l-1.032 3.77 3.876-.995zm11.017-12.332c.31-.149.54-.227.79-.227.35 0 .425.069.641.263.217.194.81 1.986.81 2.422 0 .436-.08.79-.31 1.14-.23.35-.515.61-.715.81-.2.2-.415.41-.61.61-.19.19-.395.405-.62.645-.225.24-.46.46-.71.68-.25.22-.505.41-.775.58s-.545.31-.83.43c-.285.12-.585.22-.895.3s-.63.14-.955.18-.66.06-.99.06-.67-.02-1.01-.06-.68-.08-1.03-.14-.7-.14-1.06-.24-.715-.22-1.085-.36-.745-.3-1.12-.48-.755-.38-1.14-.62-.775-.52-1.16-.84-.79-.68-1.18-1.08-.8-1.04-1.2-1.64-.81-1.21-1.21-1.9.405-.285.81-.43l.54-.18c.27-.09.54-.18.81-.27.27-.09.54-.18.81-.27.27-.09.54-.18.81-.27.27-.09.54-.18.81-.27l.54-.18c.27-.09.43-.14.59-.14.16 0 .32.05s.48.15.64.3c.16.15.64.9.64.9s.16.3.32.45c.16.15.32.15.32.15s.32 0 .48-.15c.16-.15.32-.45.32-.45s.16-.3.16-.45c0-.15-.16-.3-.32-.45s-.32-.3-.32-.3z" />
        </svg>
    ),
    Mail: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    ),
    Menu: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
    ),
    Close: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    ),
};
