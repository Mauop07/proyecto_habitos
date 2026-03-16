import './globals.css';
import { Providers } from '../store/Providers';

export const metadata = {
  title: 'Hábitos Atómicos',
  description: 'Tracking de hábitos',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}