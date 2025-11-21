import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import ScreenshotsSection from '@/components/ScreenshotsSection';
import DownloadSection from '@/components/DownloadSection';
import Footer from '@/components/Footer';
import fs from 'fs';
import path from 'path';

// Check if app icon exists
function getAppIcon() {
  const iconPath = path.join(process.cwd(), 'public', 'images', 'icon.png');
  try {
    return fs.existsSync(iconPath) ? '/images/icon.png' : null;
  } catch (error) {
    return null;
  }
}

// Get screenshots from public/images directory (excluding icon.png)
function getScreenshots() {
  const imagesDirectory = path.join(process.cwd(), 'public', 'images');

  try {
    const files = fs.readdirSync(imagesDirectory);
    // Filter for image files, exclude icon.png, and sort them
    const imageFiles = files
      .filter(file => /\.(png|jpg|jpeg|webp|gif)$/i.test(file))
      .filter(file => file.toLowerCase() !== 'icon.png') // Exclude icon.png
      .sort();

    return imageFiles.map((file, index) => ({
      id: index + 1,
      filename: file,
      alt: `Screenshot ${index + 1}`
    }));
  } catch (error) {
    // If directory doesn't exist or is empty, return empty array
    return [];
  }
}

export default function Home() {
  const appIcon = getAppIcon();
  const screenshots = getScreenshots();

  return (
    <>
      <Header />
      <main>
        <HeroSection appIcon={appIcon} />
        <FeaturesSection />
        <ScreenshotsSection screenshots={screenshots} />
        <DownloadSection />
      </main>
      <Footer />
    </>
  );
}
