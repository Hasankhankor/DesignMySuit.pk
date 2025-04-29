import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DesignMySuit.pk',
  description: ' Create custom Pakistani suits with our interactive designer. Choose fabrics ',
  generator: 'Hasan',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
