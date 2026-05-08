import './globals.css';

export const metadata = {
  title: 'Local Beach Bum - Exclusive Fishing Apparel',
  description: 'Premium fishing apparel. Monthly drops. Locals only.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}