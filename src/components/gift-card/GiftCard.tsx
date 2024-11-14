import styles from './GiftCard.module.css';
import cn from "classnames";
import giftImageType1 from '../../assets/images/gift-type-1.png';
import giftImageType2 from '../../assets/images/gift-type-2.png';

export const GiftCard = (
    {
        id,
        price,
        picture,
        owner,
        clickHandler
    }: {
        id: number;
        price: string;
        picture: string;
        owner: string;
        clickHandler: (id: number) => void;
    }
) => {
    const getImage = () => price.includes('500') ? giftImageType1 : giftImageType2

    return (
        <div className={styles.gift_card}>
            <div className={styles.gift__image}><img src={getImage()} alt=""/></div>
            <div className={styles.info__wrapper}>
                <div className={styles.info__price}>{price}</div>
                <div className={cn(styles.info__author, {[styles.info__author__type_one]: price.includes('500'), [styles.info__author__type_two]: price.includes('1000')})}>Автор: {owner}</div>
                <div className={cn('button', styles.by_btn)} onClick={() => clickHandler(id)}>Забрать</div>
            </div>
            <div className={styles.image__wrapper}>
                <img src={`data:image/png;base64, ${picture}`} alt=""/>
            </div>
        </div>
    )
}