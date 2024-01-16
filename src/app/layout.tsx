import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import Navbar from '@/components/ui/Navbar';
import SWRConfigContext from '@/context/SWRConfigContext';
import CheckoutInfoContext from '@/context/CheckoutInfoContext';
import './globals.css';

const sans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Vacation Hotels, Experiences & Places - Pooreum',
  icons: [{ url: 'favicon.svg' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={sans.className}>
        <SWRConfigContext>
          <CheckoutInfoContext>
            <Navbar />
            <div className="mt-[72px]">{children}</div>
            <div id="modal"></div>
          </CheckoutInfoContext>
        </SWRConfigContext>
      </body>
    </html>
  );
}
