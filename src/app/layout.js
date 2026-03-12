import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from '../context/AuthContext'; // Import AuthProvider

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Syndexus | Global Trade OS',
  description: 'The operating system for global trade.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wrap everything in AuthProvider */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}