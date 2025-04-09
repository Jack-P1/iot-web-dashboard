import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./Auth";
import { useParams, useLocation, Link } from "react-router-dom";
import { Line } from 'react-chartjs-2';  // Import the Line component from react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Chart(props) {

    const [chartData, setChartData] = useState([]);

    const {token} = useContext(AuthContext);

    const formattedDateFrom = encodeURIComponent(props.dateFrom.toISOString());
    const formattedDateTo = encodeURIComponent(props.dateTo.toISOString());
    const url = `http://127.0.0.1:3000/api/item/?itemId=${props.itemId}%start=${formattedDateFrom}&end=${formattedDateTo}`
    console.log(url)
    // useEffect(() => {
    //     axios.get(`http://127.0.0.1:3000/api/item/?itemId=${props.itemId}%start=${props.dateFrom}&end=${props.dateTo}`)
    // }, []);

    // test data
    const readings = [
        { reading_value: "5",  timestamp: "2025-04-05 19:48:00" },
        { reading_value: "10", timestamp: "2025-04-05 20:30:00" },
        { reading_value: "15", timestamp: "2025-04-05 21:45:00" },
        { reading_value: "20", timestamp: "2025-04-05 22:30:00" },
        { reading_value: "25", timestamp: "2025-04-05 23:00:00" },
        { reading_value: "30", timestamp: "2025-04-05 23:30:00" },
        { reading_value: "60", timestamp: "2025-04-06 08:25:00" }
    ]

    const times = readings.map((point) => {
        const time = new Date(point.timestamp);
        return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    });


    // chart data
    const data = {
        labels: times,
        datasets: [
            {
                label: 'Readings',
                data: readings.map(point => Number(point.reading_value)),
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                tension: 0.1, 
            }
        ]
    }

    // chart options
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Reading Chart',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Reading Value',
                },
            },
        },
    };

    return (
        <Line
            data={data}
            options={options}
        />
    )
};

export default Chart;