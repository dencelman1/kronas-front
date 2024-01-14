import { Link } from 'react-router-dom';
import styles from './Analytics.module.scss'
import CircleChart from './CircleChart/CircleChart';


export var BackButton = () => (
    <Link
        to="/"
        style={{
            position: 'absolute',
            left: '20px',

            top: '20px',
        }}
    >
        Назад
    </Link>
)

var Analytics = () => {
    
    return (<>
        <BackButton />
        <div
            className={styles.analyticsBlock + " centered-inside"}
        >
            <CircleChart />
        </div>
    </>)
}

export default Analytics;
