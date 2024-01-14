import { Link } from "react-router-dom";
import styles from './Home.module.scss'
import packageJson from "../../../package.json"

var { server } = packageJson

var Home = () => {
    return (
        <div
            className={styles.homeBlock}
        >
            <Link to={server.databaseDomain + '/admin'}>База даних</Link>
            <Link to='bot-user-sending'>Розсилка</Link>
            <Link to='analytics'>Аналітика</Link>
        </div>
    )
}

export default Home;
