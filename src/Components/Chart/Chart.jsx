import {
Chart as ChartJS,
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend,
BarElement
} from 'chart.js';

ChartJS.register(
CategoryScale,
LinearScale,
PointElement,
LineElement,
BarElement,
Title,
Tooltip,
Legend
);
import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
    const [dailyData, setDailyData] = useState([]);
    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        };
        fetchAPI();
    }, []);
    const lineChart = dailyData.length ? (
        <Line
            data={{
                labels: dailyData.map(({ date }) => date),
                datasets: [
                    {
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: "Infected",
                        borderColor: "rgba(0, 77, 153)",
                        backgroundColor: "rgba(0, 0, 255, 0.5)",
                        fill: true,
                    },
                    {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: "Deaths",
                        borderColor: "rgb(171,52,36)",
                        backgroundColor: "rgb(207,80,68)",
                        fill: true,
                    },
                ],
            }}
        />
    ) : null;

    const barChart = confirmed ? (
        <Bar
            data={{
                labels: ["Infected", "Deaths", "Active"],
                datasets: [
                    {
                        label: "People",
                        backgroundColor: [
                            "rgba(0, 0, 255, 0.5)",
                            "rgb(207,80,68)",
                            "rgb(260,158,120)",
                        ],
                        hoverBackgroundColor: [
                            "rgba(0, 77, 153)",
                            "rgb(171,52,36)",
                            "rgb(232,91,81)",
                        ],
                        data: [
                            confirmed.value,
                            deaths.value,
                            confirmed.value - (recovered.value + deaths.value),
                        ],
                    },
                ],
            }}
            options={{
                legend: { display: false },
                title: { display: true, text: `Current state in ${country}` },
            }}
        />
    ) : null;

    return (
        <div className={styles.container}>{country ? barChart : lineChart}</div>
    );
};

export default Chart;