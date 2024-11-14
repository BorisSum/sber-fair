import styles from './text-input.module.css';
import {TInputType} from "../../models/models";
import cn from "classnames";
export const TextInput = (
    {
        inputType,
        value,
        title,
        changeHandler,
        isValid
    }: {
        inputType: TInputType;
        value: string;
        title: string;
        changeHandler: (v: string) => void;
        isValid: boolean;
    }
) => {
    return (
        <div className={styles.wrapper}>
            <label className={cn(styles.label, {[styles.label__empty]: !isValid})}>Поле обязательное для заполнения</label>
            <input
                value={value}
                className={styles.input}
                type={inputType}
                placeholder={title}
                onChange={e => changeHandler(e.target.value.trim())}
            />
        </div>
    )
}

// Поле обязательное для заполнения