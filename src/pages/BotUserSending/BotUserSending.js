import { useEffect, useMemo, useRef, useState } from "react";
import { BackButton } from "../Analytics/Analytics";
import styles from './BotUserSending.module.scss';

import ServerApi from "../../api/ServerApi";
import { BotTypeSelect } from "./BotTypeSelect/BotTypeSelect";
import SendingTaskWidget from "./SendingTaskWidget/SendingTaskWidget";

export var BotTypes = ["telegram", 'viber']



export var getLocalTimestampByUTC = (date) => {
    var localTimestamp = date.getTime() + (date.getTimezoneOffset() * 60 * 1000);
    return localTimestamp;
};


var BotUserSending = () => {
    var [value, setValue] = useState({
        message: '',
        filterKey: '',
        filterValue: '',
        botType: 'telegram',

        doTimestamp: 0,
    })
    var [isCorrect, setIsCorrect] = useState(true)
    var [sendTasks, setSendTasks] = useState([])
    
    useEffect(() => {
        var url = ServerApi.UrlByRoot("/DeferredBotSending/get/all")

        fetch(url)
        .then(r => r.json())
        .then(data => {
            if (data.success)
                return setSendTasks(data.data)
        })
        .catch(console.error)

    }, [])


    var sendToUrl = useMemo(() => ServerApi.UrlByRoot("/DeferredBotSending/create"), [])

    var registerDeferredSending = (body) => {
        var currentUtcTimestamp = getLocalTimestampByUTC(new Date())
        var doTimestamp = value.doTimestamp

        if (doTimestamp <= currentUtcTimestamp)
            return alert("Встановіть майбутню дату в календарі")

        var payload = {
            sendingData: body,
            doTimestamp,
        }
        
        fetch(
            sendToUrl, {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(payload),
            }
        )
        .then(r => r.json())
        .then(data => {
            setIsCorrect(data.success)
            if (data.success) {
                var entry = data.data
                setSendTasks(tasks => [...tasks, entry])
            }
        })
        .catch(e => {
            console.error(e)
            setIsCorrect(false)
        })

    }

    var onSubmit = () => {
        if (value.botType === "all") {
            return BotTypes.map(botType => {
                registerDeferredSending({
                    ...value,
                    botType,
                })
            })
        }
        
        registerDeferredSending(value)
    }

    
    return (<div
        style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '100px'
        }}
    >
        <BackButton />
        <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1px',
                    outline: '1px solid black',
                    maxHeight: '350px',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    borderRadius: '10px',
                    minWidth: '300px',
                }}

            >
                {
                    sendTasks.map(task => (
                        <SendingTaskWidget
                            task={task}
                            onTaskLast={() => {
                                setSendTasks(tasks => tasks.filter(t => t.id !== task.id))
                            }}
                        />
                    ))
                }
            </div>
        <div
            className={styles.sendingBlock + " centered-inside"}
        >
            
            <div
                className="centered-inside"
                style={{
                    display: 'flex',
                    gap: '20px',
                    marginBottom: '20px'
                }}
            >
                
                <BotTypeSelect
                    defaultValue={value.botType}
                    onChange={(e) => {
                        setValue(prev => ({...prev, botType: e.target.value}))
                    }}
                />
                <input
                    placeholder="Ключ"
                    value={value.filterKey}
                    onChange={(e) => {
                        setValue(prev => ({...prev, filterKey: e.target.value}))
                    }}
                />
                <input
                    placeholder="Значення"
                    value={value.filterValue}
                    onChange={(e) => {
                        setValue(prev => ({...prev, filterValue: e.target.value}))
                    }}
                />
            </div>


            <textarea
                style={{
                    // minWidth: '550px',
                    width: '100%',
                    minHeight: '150px',
                    resize: 'none'
                }}
                value={value.message}
                onChange={(e) => {
                    setValue(prev => ({...prev, message: e.target.value}))
                }}

                placeholder="Повідомлення"
                
            >
            </textarea>
            <div
                className="centered-inside"
                style={{
                    gap: '20px',
                    marginTop: '20px',
                    width: "100%"
                }}
            >
                <input
                    type="datetime-local"
                    name="datetime"
                    onChange={(e) => setValue(prev => {
                        var localDateTimeString = e.target.value;
                        var localDateTime = new Date(localDateTimeString);
                        var doTimestamp = getLocalTimestampByUTC(localDateTime)

                        return { ...prev, doTimestamp }
                    })}
                />
                
                
                <button
                    style={{
                        marginLeft: 'auto',
                        transition: '1s',

                        backgroundColor: isCorrect ? "": "red",
                        color: isCorrect ? "": "white",
                    }}
                    onClick={onSubmit}
                >
                    Відправити
                </button>
                
            </div> 
        </div>
    </div>)
}


export default BotUserSending;
