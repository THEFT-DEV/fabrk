/* eslint-disable design-system/no-inline-styles, design-system/no-hardcoded-colors -- OG images require inline styles, ImageResponse doesn't support Tailwind */
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Fabrk - Terminal-aesthetic Next.js boilerplate';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          fontFamily: 'monospace',
        }}
      >
        {/* Terminal window frame */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '90%',
            maxWidth: '1000px',
            border: '2px solid #33ff66',
          }}
        >
          {/* Title bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderBottom: '2px solid #33ff66',
              backgroundColor: '#0a0a0a',
            }}
          >
            <span style={{ color: '#666', fontSize: '14px' }}>
              [0x00] FABRK_INIT
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: '#33ff66',
                }}
              />
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: '#33ff66',
                }}
              />
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: '#33ff66',
                }}
              />
            </div>
          </div>

          {/* Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '48px',
              backgroundColor: '#0a0a0a',
            }}
          >
            {/* Logo */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '80px',
                height: '80px',
                backgroundColor: '#33ff66',
                color: '#0a0a0a',
                fontSize: '48px',
                fontWeight: 'bold',
              }}
            >
              F
            </div>

            {/* Brand */}
            <span
              style={{
                color: '#ffffff',
                fontSize: '48px',
                fontWeight: 'bold',
                marginTop: '24px',
                letterSpacing: '4px',
              }}
            >
              FABRK
            </span>

            {/* Tagline */}
            <span
              style={{
                color: '#33ff66',
                fontSize: '24px',
                marginTop: '16px',
              }}
            >
              Terminal-aesthetic Next.js boilerplate
            </span>

            {/* Features */}
            <span
              style={{
                color: '#666',
                fontSize: '16px',
                marginTop: '24px',
              }}
            >
              Next.js 16 • TypeScript Strict • 78+ Components • Multi-Provider
              Payments
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
