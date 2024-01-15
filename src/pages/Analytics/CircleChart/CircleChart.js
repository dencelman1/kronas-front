import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import ServerApi from "../../../api/ServerApi";
import { BotTypeSelect } from "../../BotUserSending/BotTypeSelect/BotTypeSelect";



var testData = [
    { name: 'Группа А', value: 1400 },
    { name: 'Группа Б', value: 211 },
    { name: 'Группа В', value: 200 },
    { name: 'Группа Г', value: 200 },
];


var getSectionDataUrl = ServerApi.UrlByRoot("/BotSection/get")

var textMapping = {
    start: "Стартове меню",
    my_orders: "Мої замовлення",
    call_back: "Замовити дзвінок",

    send_review: "Відправити відгук",
    send_review__bad: "Відправити рекламацію",
    send_review__good: "Відправити похвалу",

    philias: "Філії міста",
    "philia-view": "Огляд філії",
    philiasCities: "Міста філій",
}

var CircleChart = () => {
    var [data, setData] = useState([]);
    var [isLoading, setIsLoading] = useState(true);
    var [botType, setBotType] = useState('all')

    useEffect(() => {
        
        fetch(getSectionDataUrl + "/" + botType, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
        })
        .then(r => r.json())
        .then(data => {
            setData(data.map((entry) => {
                var fixedName = textMapping[entry.name] || entry.name
                return {
                    ...entry,
                    name: fixedName,
                }
            }));

            setIsLoading(prev => prev ? false: prev)
        })    
        .catch(console.error)

    }, [botType])
    
    var total = data.reduce((acc, entry) => acc + entry.value, 0);

    var renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        var RADIAN = Math.PI / 180;
        var radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        var x = cx + radius * Math.cos(-midAngle * RADIAN);
        var y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(2)}%`}
            </text>
        );
    };

    var COLORS = ['#d81b37', '#581744', '#ff5732', '#fd5732', '#d81c37', '#581722', '#ff5735', '#fd5712'];


    if (isLoading)
        return "Loading...."

    return (<>
        <BotTypeSelect
            value={botType}
            onChange={e => {
                setBotType(e.target.value)
            }}
        />
    
        <PieChart width={800} height={500}>
            <Pie
                data={data}
                cx={400}
                cy={200}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={200}
                fill="#8884d8"
                dataKey="value"
            >
                {data.map((entry, index) => (
                    <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                    />
                ))}
            </Pie>
            <Legend verticalAlign="bottom" height={36} />
            <Tooltip />
        </PieChart>
    </>)
}

export default CircleChart;
