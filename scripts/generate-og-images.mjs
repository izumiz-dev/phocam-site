import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

async function generateOGImage(locale) {
  // Load locale-specific messages
  const messagesPath = join('./messages', `${locale}.json`);
  const messages = JSON.parse(await readFile(messagesPath, 'utf-8'));

  // Use hero section text for OG images
  const text = {
    title: locale === 'ja' ? 'フォトカードと一緒に' : locale === 'ko' ? '포토카드와 함께' : 'Capture Moments',
    subtitle: locale === 'ja' ? '写真を撮ろう' : locale === 'ko' ? '사진을 찍으세요' : 'with Your Photocard',
    description: messages.hero.subtitle,
  };

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
          background: 'linear-gradient(135deg, #fce7f3 0%, #e9d5ff 50%, #c7d2fe 100%)',
          fontFamily: locale === 'ja' ? 'NotoSansJP' : 'Pretendard',
          position: 'relative',
        },
        children: [
          // Container with fixed positioning
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                position: 'absolute',
                left: '100px',
                top: '50%',
                transform: 'translateY(-50%)',
              },
              children: [
                // Text content - Left side with fixed width
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      width: '600px',
                      marginRight: 70,
                    },
                    children: [
                      // App Name with Gradient
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: 110,
                            fontWeight: 700,
                            background: 'linear-gradient(90deg, #ec4899 0%, #a855f7 50%, #6366f1 100%)',
                            backgroundClip: 'text',
                            color: 'transparent',
                            marginBottom: 24,
                            letterSpacing: '-0.025em',
                            lineHeight: 1,
                          },
                          children: 'Phocam',
                        },
                      },
                      // Main Title
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: 52,
                            fontWeight: 700,
                            color: '#334155',
                            lineHeight: 1.15,
                            marginBottom: 6,
                          },
                          children: text.title,
                        },
                      },
                      // Subtitle
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: 52,
                            fontWeight: 700,
                            color: '#334155',
                            lineHeight: 1.15,
                            marginBottom: 28,
                          },
                          children: text.subtitle,
                        },
                      },
                      // Description
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: 28,
                            color: '#64748b',
                            letterSpacing: '-0.01em',
                            lineHeight: 1.3,
                          },
                          children: text.description,
                        },
                      },
                    ],
                  },
                },
                // App Icon - Right side (larger)
                iconBase64 && {
                  type: 'img',
                  props: {
                    src: iconBase64,
                    width: 280,
                    height: 280,
                    style: {
                      borderRadius: 62,
                      boxShadow: '0 30px 100px rgba(0, 0, 0, 0.25)',
                    },
                  },
                },
              ].filter(Boolean),
            },
          },
        ],
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
  // Ensure output directory exists
  await mkdir('./public/og', { recursive: true });

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
