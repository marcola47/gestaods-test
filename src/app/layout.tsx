import type { Metadata } from 'next';
import '@/css/app.css';

export const metadata: Metadata = {
  title: 'GestãoDS - Teste técnico',
  description: 'É os guri do Grêmio',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        { children }
        </body>
    </html>
  )
}
