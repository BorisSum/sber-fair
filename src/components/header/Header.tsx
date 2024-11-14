import styles from './Header.module.css'
import headerImg from '../../assets/images/header2x.png';

export const Header = () => {
    return (
        <header className={styles.header}>
            <img src={headerImg} alt="header"/>
        </header>
    )
}