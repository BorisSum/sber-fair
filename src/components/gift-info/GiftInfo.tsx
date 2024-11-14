import styles from './GiftInfo.module.css';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import cn from "classnames";
import {setCurrentGift} from "../../store/store";

export const GiftInfo = () => {
    const dispatch = useAppDispatch();
    const currentGift = useAppSelector(state => state.appState.currentGift);

    const returnHandler = () => {
        dispatch(setCurrentGift(null));
    }

    return (
        <>
            <div className={styles.back_btn} onClick={returnHandler}>
                <div className={styles.back_btn_text}>
                    <p>В Каталог</p>
                </div>
            </div>
            <div className={styles.gift_info__wrapper}>
                <div className={cn(styles.gift_info__block, styles.separator)}>
                    <div className={styles.gift_info__block_inner}>
                        <div className={styles.gift_info__block_title}>
                            <div className={styles.gift_info__block_icon}></div>
                            <p className={styles.gift_info__block_name}>{currentGift!.title}</p>
                        </div>
                        <div className={styles.gift_info__block_image}>
                            <img src={`data:image/png;base64, ${currentGift!.image}`} alt=""/>
                        </div>
                    </div>
                </div>
                <div className={styles.gift_info__block}>
                    <div className={styles.gift_info__block_inner}>
                        <div className={cn(styles.gift_info__block_title, styles.gift_info__block_title_author)}>
                            <div className={cn(styles.gift_info__block_icon, styles.gift_info__block_icon_author)}></div>
                            <p className={styles.gift_info__block_name}>Автор подарка</p>
                        </div>
                    </div>
                </div>
                <div className={styles.gift_info__buy_info}>
                    Все средства,<br/>полученные от ярмарки,<br/>пойдут на нужды<br/>Андреапольского<br/>детского приюта
                </div>
                <div className={styles.gift_info__btn}>
                    Забрать
                </div>
            </div>
        </>
    )
}