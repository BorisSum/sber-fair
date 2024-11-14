import styles from './Main.module.css';
import {GiftCard} from "../gift-card/GiftCard";
import React, {useEffect, useState} from "react";
import {IMarketDomain, IUserInfo} from "../../models/models";
import {Preloader} from "../preloader/Preloader";
import {useAppSelector} from "../../store/hooks";
import {useDispatch} from "react-redux";
import {fetchGifts, setCurrentGift, setGiftTakenOff, takeGift} from "../../store/store";
import {UserInfoForm} from "../user-info-form/UserInfoForm";
import {Notify} from "../notification/Notify";
import {GiftListEmptyPlaceholder} from "../GiftListEmptyPlaceholder/GiftListEmptyPlaceholder";

export const Main = () => {
    const dispatch: any = useDispatch();

    const loading = useAppSelector( state => state.appState.loading);
    const gifts = useAppSelector( state => state.appState.gifts );
    const currentGift = useAppSelector( state => state.appState.currentGift);
    const currentPage = useAppSelector(state => state.appState.currentPage);
    const giftTaken = useAppSelector(state => state.appState.giftTaken);

    const [showNotify, setShowNotify] = useState<boolean>(false);

    const selectGift = (giftId: number): void => {
        dispatch(setCurrentGift(giftId));
    }

    useEffect(
        () => {
            dispatch(fetchGifts(currentPage));
        },
        [dispatch, currentPage]
    );

    useEffect(
        () => {
            if (giftTaken) {
                setShowNotify(true);
                setTimeout(() => setShowNotify(false), 2000)
            }
        },
        [giftTaken]
    );

    const handleUserForm = (userInfo: IUserInfo | null) => {
        if (!userInfo) {
            dispatch(setCurrentGift(null))
        } else {
            if (currentGift) {
                const gift: IMarketDomain = {
                    ...currentGift,
                    user: userInfo.email
                }
                dispatch(takeGift(gift))
            }
        }
    }

    return (
        <main>
            {
                loading
                    ? <Preloader/>
                    : <div className="container">
                        <div className={styles.description__wrapper}>
                            <p>Создадим вместе новогоднюю сказку для детей Андреапольского приюта. Выбирай товары, которые сделали своими руками коллеги и дети из приюта.</p>
                            <p>После приобретения товара на электронную почту, указанную при покупке, придет QR-код, по которому можно осуществить перевод.</p>
                            <p>Собранные средства будут потрачены на организацию детской елки и подарки, а приобретенный товар будет доставлен Вам с помощником Деда Мороза!</p>
                        </div>
                        {
                            (gifts.length > 0) ?
                            <div className={styles.cards__container}>
                                {
                                    gifts.map(gift => <GiftCard key={gift.id} id={gift.id} price={gift.price} picture={gift.image} owner={gift.owner} clickHandler={selectGift}/>)
                                }
                            </div>
                                : <GiftListEmptyPlaceholder/>
                        }
                    </div>
            }
            {
                (currentGift && !giftTaken) &&
                <UserInfoForm formHandler={handleUserForm}/>
            }
            {
                showNotify &&
                <Notify cancelHandler={() => dispatch(setGiftTakenOff())}/>
            }
        </main>
    )
}