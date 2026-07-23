import type { Metadata, Viewport } from 'next'
import { ReactNode } from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import styles from '../components/Layout/layout.module.sass'
import '../styles/reset.sass'

export const metadata: Metadata = {
  title: {
    default: 'Holly Burns - Freelance Journalist - SF Bay Area',
    template: '%s',
  },
  description: 'Holly Burns — freelance journalist and writer based in the SF Bay Area.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/trr3psn.css" />
      </head>
      <body>
        <main className={styles.wrapper}>
          <Header />
          <section className={styles.contentWrapper}>{children}</section>
          <Footer />
        </main>
      </body>
    </html>
  )
}
