import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

// Locale-specific text content
const content = {
  ja: {
    title: 'フォトカードと一緒に',
    subtitle: '写真を撮ろう',
    description: '推しと一緒に、毎日をもっと特別に',
  },
  en: {
    title: 'Capture Moments',
    subtitle: 'with Your Photocard',
    description: 'Make every day special with your bias',
  },
  ko: {
    title: '포토카드와 함께',
    subtitle: '사진을 찍으세요',
    description: '내 최애와 함께, 매일을 더 특별하게',
  },
};

async function generateOGImage(locale) {
  const text = content[locale];

  // Load fonts based on locale
  let fontData;

  try {
    if (locale === 'ja') {
      fontData = await readFile('./public/fonts/NotoSansJP-Bold.otf');
    } else {
      // Pretendard supports Korean and English well
      fontData = await readFile('./public/fonts/Pretendard-Bold.otf');
    }
  } catch (error) {
    console.error('Failed to load fonts:', error);
    process.exit(1);
  }

  // Load app icon
  let iconBase64;
  try {
    const iconBuffer = await readFile('./public/images/icon.png');
    iconBase64 = `data:image/png;base64,${iconBuffer.toString('base64')}`;
  } catch (error) {
    console.error('Failed to load icon:', error);
    iconBase64 = null;
  }

  // Create SVG using Satori
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #fce7f3 0%, #e9d5ff 50%, #c7d2fe 100%)',
          fontFamily: locale === 'ja' ? 'NotoSansJP' : 'Pretendard',
          padding: '80px',
        },
        children: [
          // App Icon - Left side
          iconBase64 && {
            type: 'img',
            props: {
              src: iconBase64,
              width: 200,
              height: 200,
              style: {
                marginRight: 60,
                borderRadius: 44,
                boxShadow: '0 25px 80px rgba(0, 0, 0, 0.2)',
              },
            },
          },
          // Text content - Right side
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              },
              children: [
                // App Name with Gradient
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: 100,
                      fontWeight: 700,
                      background: 'linear-gradient(90deg, #ec4899 0%, #a855f7 50%, #6366f1 100%)',
                      backgroundClip: 'text',
                      color: 'transparent',
                      marginBottom: 32,
                      letterSpacing: '-0.025em',
                    },
                    children: 'Phocam',
                  },
                },
                // Main Title
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: 50,
                      fontWeight: 700,
                      color: '#334155',
                      lineHeight: 1.2,
                      marginBottom: 8,
                    },
                    children: text.title,
                  },
                },
                // Subtitle
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: 50,
                      fontWeight: 700,
                      color: '#334155',
                      lineHeight: 1.2,
                      marginBottom: 32,
                    },
                    children: text.subtitle,
                  },
                },
                // Description
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: 26,
                      color: '#64748b',
                      letterSpacing: '-0.01em',
                    },
                    children: text.description,
                  },
                },
              ],
            },
          },
        ].filter(Boolean),
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: locale === 'ja' ? 'NotoSansJP' : 'Pretendard',
          data: fontData,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  );

  // Convert SVG to PNG using Resvg
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: 1200,
    },
  });

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  // Write PNG file
  const outputPath = join('./public/og', `opengraph-image-${locale}.png`);
  await writeFile(outputPath, pngBuffer);

  console.log(`✓ Generated ${outputPath}`);
}

// Generate for all locales
async function main() {
  const locales = ['ja', 'en', 'ko'];

  for (const locale of locales) {
    await generateOGImage(locale);
  }

  console.log('\nAll OG images generated successfully!');
}

main().catch((error) => {
  console.error('Error generating OG images:', error);
  process.exit(1);
});
