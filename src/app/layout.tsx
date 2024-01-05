import type { Metadata } from 'next';
import '@/css/app.css';

import { PatientsContextProvider } from './context/Patients';
import { UIContextProvider } from './context/Ui';

export const metadata: Metadata = {
  title: 'GestãoDS - Teste técnico',
  description: 'É os guri do Grêmio',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PatientsContextProvider>
          <UIContextProvider>
            { children }
          </UIContextProvider>
        </PatientsContextProvider>
      </body>
    </html>
  )
}
