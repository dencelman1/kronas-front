import styles from './NotFound.module.scss'

var NotFound = () => {
    return (
        <div
            className={styles.notFoundBlock}
        >
            <span
                className={styles.notFoundBlock__alias}
            >
                Not found [404]
            </span>
        </div>
    )
}

export default NotFound;
