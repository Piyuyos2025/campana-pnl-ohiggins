import './globals.css'

export const metadata = {
  title: 'Campaña PNL O\'Higgins 2025',
  description: 'Aplicación móvil para gestión de campaña electoral - Partido Nacional Libertario',
  manifest: '/manifest.json',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover',
  themeColor: '#1e40af',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'PNL O\'Higgins'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PNL O'Higgins" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="PNL O'Higgins" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body className="bg-gray-50 font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
