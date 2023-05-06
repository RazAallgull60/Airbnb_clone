import './globals.css'
import { Nunito } from 'next/font/google'
import Navbar from './components/Navbar/Navbar'
import ClientOnly from './components/ClientOnly'
import Modal from './components/Modals/Modal'

const font = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnb',
  description: 'Clone Airbnb',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <Modal actionLabel="Soumettre" title='Salut' isOpen />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
