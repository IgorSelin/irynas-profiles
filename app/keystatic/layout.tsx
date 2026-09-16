import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isKeystaticEnabled } from '@/keystatic.config';
import KeystaticApp from './keystatic';

export const metadata: Metadata = {
  title: 'Керування сайтом',
  robots: { index: false, follow: false },
};

export default function KeystaticLayout() {
  if (!isKeystaticEnabled) {
    notFound();
  }

  return <KeystaticApp />;
}
