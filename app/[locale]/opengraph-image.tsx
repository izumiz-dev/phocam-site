import { ImageResponse } from 'next/og';
import { locales } from '@/i18n/request';

export const dynamic = 'force-static';

export const alt = 'Phocam';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Required for static export
export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Locale-specific content
  const content = {
    ja: {
      title: 'Phocam',
      subtitle: 'フォトカードと一緒に',
      subtitle2: '写真を撮ろう',
      description: '推しと一緒に、毎日をもっと特別に',
    },
    en: {
      title: 'Phocam',
      subtitle: 'Capture Moments',
      subtitle2: 'with Your Photocard',
      description: 'Make every day special with your bias',
    },
    ko: {
      title: 'Phocam',
      subtitle: '포토카드와 함께',
      subtitle2: '사진을 찍으세요',
      description: '내 최애와 함께, 매일을 더 특별하게',
    },
  };

  const text = content[locale as keyof typeof content] || content.ja;

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
          backgroundColor: '#0f172a',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, rgba(139, 92, 246, 0.15) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(139, 92, 246, 0.15) 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          padding: '80px',
        }}
      >
        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '40px',
          }}
        >
          {/* Title */}
          <div
            style={{
              fontSize: 120,
              fontWeight: 900,
              background: 'linear-gradient(135deg, #a78bfa 0%, #c084fc 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '-0.05em',
              display: 'flex',
            }}
          >
            {text.title}
          </div>

          {/* Subtitle */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <div
              style={{
                fontSize: 56,
                fontWeight: 600,
                color: '#e2e8f0',
                textAlign: 'center',
                display: 'flex',
              }}
            >
              {text.subtitle}
            </div>
            <div
              style={{
                fontSize: 56,
                fontWeight: 600,
                color: '#e2e8f0',
                textAlign: 'center',
                display: 'flex',
              }}
            >
              {text.subtitle2}
            </div>
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 32,
              color: '#94a3b8',
              textAlign: 'center',
              maxWidth: '900px',
              display: 'flex',
            }}
          >
            {text.description}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
