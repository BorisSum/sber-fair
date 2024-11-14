import styles from "./notification.module.css";


export const Notify = (
    {
        cancelHandler
    }: {
        cancelHandler: () => void;
    }
) => {
    return (
        <div className={styles.overlay} onClick={cancelHandler}>
            <div className='container'>
                <div className={styles.form_wrapper} onClick={e => e.stopPropagation()}>
                    <div className={styles.form__inner}>
                        <p className={styles.gratitude}>Спасибо!</p>
                        <p className={styles.phrase}>Счастливого Нового года!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}