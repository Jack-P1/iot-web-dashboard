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

    useEffect(() => {
        axios.get(`http://127.0.0.1:3000/api/stock/item/data?itemId=${props.itemId}&start=${formattedDateFrom}&end=${formattedDateTo}`, {
            headers: { Authorization: token },
        })
        .then((res) => {
            const sortedData = res.data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
            setChartData(sortedData)
        })
        .catch((err) => {
            console.error(err);
        })

    }, []);

    const times = chartData.map((point) => {
        const time = new Date(point.timestamp);
        return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    });

    // chart data
    const data = {
        labels: times,
        datasets: [
            {
                label: 'Readings',
                data: chartData.map(point => Number(point.distance)),
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