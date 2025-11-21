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

  // Load fonts based on locale
  let fontData: ArrayBuffer | undefined;
  let fontName = 'sans-serif';

  try {
    if (locale === 'ja') {
      // Noto Sans JP Bold
      const fontUrl = 'https://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFBEi75vY0rw-oME.woff';
      fontData = await fetch(fontUrl).then((res) => res.arrayBuffer());
      fontName = 'Noto Sans JP';
    } else if (locale === 'ko') {
      // Pretendard Bold
      const fontUrl = 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/woff2/Pretendard-Bold.woff2';
      fontData = await fetch(fontUrl).then((res) => res.arrayBuffer());
      fontName = 'Pretendard';
    } else {
      // DM Sans Bold
      const fontUrl = 'https://fonts.gstatic.com/s/dmsans/v14/rP2Yp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAopxRTm5vpZbw.woff';
      fontData = await fetch(fontUrl).then((res) => res.arrayBuffer());
      fontName = 'DM Sans';
    }
  } catch (error) {
    console.warn('Failed to load custom font:', error);
  }

  // Load app icon from file system
  let iconData: Buffer | undefined;
  try {
    const fs = await import('fs/promises');
    const path = await import('path');
    const iconPath = path.join(process.cwd(), 'public', 'images', 'icon.png');
    iconData = await fs.readFile(iconPath);
  } catch (error) {
    console.warn('Failed to load app icon:', error);
  }

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

  // Convert icon to base64 for embedding
  const iconBase64 = iconData
    ? `data:image/png;base64,${Buffer.from(iconData).toString('base64')}`
    : undefined;

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
          backgroundColor: '#ffffff',
          padding: '80px',
          position: 'relative',
          fontFamily: fontName,
        }}
      >
        {/* Decorative gradient blur background (matching Hero) */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, 0)',
            width: '600px',
            height: '600px',
            background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.3) 0%, rgba(168, 85, 247, 0.3) 50%, rgba(99, 102, 241, 0.3) 100%)',
            borderRadius: '50%',
            filter: 'blur(120px)',
            display: 'flex',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '40px',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {/* App Icon */}
          {iconBase64 && (
            <div
              style={{
                display: 'flex',
                width: '120px',
                height: '120px',
                borderRadius: '30px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              }}
            >
              <img
                src={iconBase64}
                width="120"
                height="120"
                style={{
                  objectFit: 'cover',
                }}
              />
            </div>
          )}

          {/* Title with Hero gradient */}
          <div
            style={{
              fontSize: 100,
              fontWeight: 900,
              background: 'linear-gradient(90deg, #ec4899 0%, #a855f7 50%, #6366f1 100%)',
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
                fontSize: 44,
                fontWeight: 600,
                color: '#374151',
                textAlign: 'center',
                display: 'flex',
              }}
            >
              {text.subtitle}
            </div>
            <div
              style={{
                fontSize: 44,
                fontWeight: 600,
                color: '#374151',
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
              fontSize: 28,
              color: '#6b7280',
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
      fonts: fontData
        ? [
            {
              name: fontName,
              data: fontData,
              weight: 700,
              style: 'normal',
            },
          ]
        : undefined,
    }
  );
}
