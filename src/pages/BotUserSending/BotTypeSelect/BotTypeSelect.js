import { BotTypes } from "../BotUserSending";


export var BotTypeSelect = ({
    value,
    onChange,
    ...props
}) =>
    <select
        defaultValue={"telegram"}
        onChange={onChange}
        value={value}
        {...props}
    >
        {
            BotTypes.map((type, index) => (
                <option
                    value={type}
                    key={index}
                >
                    {type[0].toUpperCase() + type.slice(1)}
                </option>
            ))
        }
        <option value='all'>
            All
        </option>
    </select>
