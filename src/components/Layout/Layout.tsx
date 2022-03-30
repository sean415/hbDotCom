import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Head from 'next/head';

import styles from './layout.module.sass'

const Layout = ({children}) => {
  return (
  <>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="stylesheet" href="https://use.typekit.net/trr3psn.css" />
    </Head>
    <main className={styles.wrapper}>
      <Header />
      <main>{children}</main>
      <Footer />
    </main>
  </>
  )
};

export default Layout;