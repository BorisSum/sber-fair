import styles from './empty-placeholder.module.css';
import snowman from '../../assets/images/card-bg-1.svg'

export const GiftListEmptyPlaceholder = () => {
    return (
        <div className={styles.wrapper}>
            <img src={snowman} alt=""/>
            <p>К сожалению подарки кончились.</p>
            <p>Ждем Вас в следующем году.</p>
        </div>
    )
}