import styles from './user-info-form.module.css';
import {TextInput} from "../../controls/text-input/text-input";
import cn from "classnames";
import {useState} from "react";
import {IUserInfo} from "../../models/models";
import {userInfo} from "os";

export const UserInfoForm = (
    {
        formHandler
    }: {
        formHandler: (userInfo: IUserInfo | null) => void
    }
) => {
    const [userFio, setUserFio] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');
    const [isFioValid, setIsFioValid] = useState<boolean>(true);
    const [isEmailValid, setIsEmailValid] = useState<boolean>(true);

    const cancelHandler = () => {
        setUserFio('');
        setUserEmail('');
        formHandler(null);
    }

    const okHandler = () => {
        setIsFioValid(true);
        setIsEmailValid(true);

        if (!userFio) {
            setIsFioValid(false);
            return;
        }

        if (!userEmail) {
            setIsEmailValid(false);
            return;
        }

        const userInfo: IUserInfo = {
            fullName: userFio,
            email: userEmail
        }

        setUserFio('');
        setUserEmail('');
        formHandler(userInfo);
    }

    return (
        <div className={styles.overlay} onClick={cancelHandler}>
            <div className='container'>
                <div className={styles.form_wrapper} onClick={e => e.stopPropagation()}>
                    <p className={styles.description}>
                        Укажите, пожалуйста, ФИО и электронную почту, чтобы мы могли связаться с вами для осуществления доставки.
                    </p>
                    <div className={styles.form__container}>
                        <TextInput inputType='text' title='Фамилия Имя Отчество' isValid={isFioValid} value={userFio} changeHandler={setUserFio}/>
                        <TextInput inputType='email' title='Электронная почта' isValid={isEmailValid} value={userEmail} changeHandler={setUserEmail}/>
                    </div>
                    <div className={styles.buttons__container}>
                        <div className={cn('button', styles.form__btn)} onClick={cancelHandler}>Отмена</div>
                        <div className={cn('button', styles.form__btn)} onClick={okHandler}>Отправить</div>
                    </div>
                </div>
            </div>
        </div>
    )
}