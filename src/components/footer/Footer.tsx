import styles from './Footer.module.css';
import cn from 'classnames';
export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={cn("container", styles.footer__text)}>
                <p>Все средства, полученные от ярмарки,<br/>пойдут на нужды Андреапольского детского приюта</p>
            </div>
        </footer>
    )
}