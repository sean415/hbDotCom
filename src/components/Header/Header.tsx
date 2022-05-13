import Link from 'next/link';
import { useEffect, useState } from 'react';
import Styles from './Header.module.sass';
import Image from 'next/image'

const goHome = () => {
  window.location.href = '/'
}

export const Header = () => {
  const [ menuToggled, setMenuToggled ] = useState(false);
  return (
    <header className={`${Styles.header} ${!!menuToggled ? Styles.menuActive : 'false'}`}>
      <div className={Styles.contentWrapper}>
        <div className={Styles.titleBlock} onClick={goHome}>
          <h1 className={Styles.title}>Holly Burns</h1>
          <h3 className={Styles.subtitle}>Journalist &amp; Writer</h3>
        </div>
        <div className={Styles.menuToggle} onClick={() => setMenuToggled(!menuToggled)}></div>
        <nav className={Styles.navigation}>
          <Link href="/"><span onClick={() => { setMenuToggled(false) }}>About</span></Link>
          <Link href="/writing"><span onClick={() => { setMenuToggled(false) }}>Writing</span></Link>
          <Link href="/contact"><span onClick={() => { setMenuToggled(false) }}>Contact</span></Link>
          <div className={Styles.socialLinks}>
            <a href="https://twitter.com/hollyburns" target="_blank"> 
              <Image src="/assets/images/twitter-borderless.svg" width="20px" height="20px" />
            </a>
            <a href="https://www.linkedin.com/in/hollyburns/" target="_blank"> 
              <Image src="/assets/images/linkedin-roundedrect.svg" width="20px" height="20px" />
            </a>
          </div>
        </nav>
      </div>
    </header>
    )
  }

  export default Header;