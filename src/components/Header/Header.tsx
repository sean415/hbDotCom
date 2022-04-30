import Link from 'next/link';
import { useEffect, useState } from 'react';
import Styles from './Header.module.sass';

export const Header = () => {
  const [ menuToggled, setMenuToggled ] = useState(false);
  return (
    <header className={`${Styles.header} ${!!menuToggled ? Styles.menuActive : 'false'}`}>
      <div className={Styles.titleBlock}>
        <h1 className={Styles.title}>Holly Burns</h1>
        <h3 className={Styles.subtitle}>Writer &amp; Journalist</h3>
      </div>
      <div className={Styles.menuToggle} onClick={() => setMenuToggled(!menuToggled)}></div>
      <nav className={Styles.navigation}>
        <Link href="/"><span onClick={() => { setMenuToggled(false) }}>About</span></Link>
        <Link href="/writing"><span onClick={() => { setMenuToggled(false) }}>Writing</span></Link>
        <Link href="/contact"><span onClick={() => { setMenuToggled(false) }}>Contact</span></Link>
      </nav>
    </header>
    )
  }

  export default Header;