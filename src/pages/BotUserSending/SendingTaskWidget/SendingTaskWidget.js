import { useEffect, useReducer, useRef, useState } from "react";
import ServerApi from "../../../api/ServerApi";
import { getLocalTimestampByUTC } from "../BotUserSending";
import styles from './SendingTaskWidget.module.scss';

var count = 0;

var SendingTaskWidget = ({
    task,
    onTaskLast,
}) => {
    var lastTimestamp = task.doTimestamp - getLocalTimestampByUTC(new Date())

    var [lastTimestamp, setLastTimestamp] = useState(lastTimestamp)
    var timeoutIdRef = useRef(null)


    var onDeleteTask = () => {
        var sendingId = task.id

        var url = ServerApi.UrlByRoot("/DeferredBotSending/delete")
        fetch(
            url, {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify({
                    sendingId,
                }),
            }
        )
        .then(res => res.json())
        .then((data) => {
            if (data.success)
                onTaskLast()
        })
        .catch(console.error)
    }

    var setTaskInterval = () =>
        setInterval(() => setLastTimestamp(prev => {

            if (prev <= 1000 ) {
                clearInterval(timeoutIdRef.current);
                onTaskLast();

                return 0;
            }
            return prev - 1000;

        }), 1000)

    
    useEffect(() => {
        if (timeoutIdRef.current)
            return
        timeoutIdRef.current = setTaskInterval()
    }, [])

    return (
        <div className={styles.SendingTaskWidget__block}>

            <div
                className={styles.SendingTaskWidget__article}
                title={task.sendingData.message}
            >
                {
                    task.sendingData.message.length > 8
                    ? task.sendingData.message.slice(0, 8) + "...."
                    : task.sendingData.message
                }
            </div>
            <div
                className={styles.SendingTaskWidget__article}
            >
                {(lastTimestamp / 1000).toFixed(0)} sec
            </div>

            <div
                className={styles.SendingTaskWidget__article}
            >
                <button
                    className="noop"
                    onClick={onDeleteTask}
                >
                    Видалити
                </button>
            </div>
        </div>
    )
}

export default SendingTaskWidget;
