import React, { useState, useEffect } from 'react';
import StudentApi from '../../service/api/student/StudentApi';
import TeacherApi from '../../service/api/student/TeacherApi';
import ParentApi from '../../service/api/student/ParentApi';
import ExamRecordApi from '../../service/api/student/ExamRecordApi';
import ClassApi from '../../service/api/student/ClassApi';
import ClassTypeApi from '../../service/api/student/ClassTypeApi';

import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement // Ajoutez ceci
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {
    Group, AdminPanelSettings, PersonSearch, ManageAccounts, ArrowRight, ArrowLeft
} from "@mui/icons-material"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels, ArcElement, // Ajoutez ceci
);


const Statistiques = () => {

    const [stats, setStats] = useState({
        total: 0,
        girls: 0,
        boys: 0
    });

    const [statsR, setStatsR] = useState({
        E: 0,
        M: 0,
        B: 0
    });
    const [statsClasses, setstatsClasses] = useState({
        C: 0,
        CT: 0,
    });

    const [nbT, setnbT] = useState("")
    const [nbP, setnbP] = useState("")


    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const fetchStudentStats = async () => {
                    const response = await StudentApi.nbStudent();
                    setStats({
                        total: response?.data?.nbE || 0,
                        girls: response?.data?.g || 0,
                        boys: response?.data?.b || 0
                    });
                };

                const fetchParentStats = async () => {
                    const response = await ParentApi.nbparents();
                    setnbP(response?.data?.nbP);
                };

                const fetchTeacherStats = async () => {
                    const response = await TeacherApi.nbteachers();
                    setnbT(response?.data?.nbT);
                };

                const fetchExamsStats = async () => {
                    const response = await ExamRecordApi.records();
                    setStatsR({
                        E: response?.data?.excellent || 0,
                        M: response?.data?.moyen || 0,
                        B: response?.data?.faible || 0
                    });
                };

                const fetchclassesStats = async () => {
                    const response = await ClassApi.nbclasse();
                    const response2 = await ClassTypeApi.nbclassType();
                    setstatsClasses({
                        C: response?.data?.nbc || 0,
                        CT: response2?.data?.nbct || 0,
                    });
                };

                // Execute tous les appels en parallèle
                await Promise.all([
                    fetchStudentStats(),
                    fetchParentStats(),
                    fetchTeacherStats(),
                    fetchExamsStats(),
                    fetchclassesStats()
                ]);

            } catch (error) {
                console.error("Erreur:", error);
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 1);
            }
        };

        fetchAllData();
    }, []);
    const pieData = {
        labels: ['Males', 'Females',],
        datasets: [{
            data: [stats?.boys, stats?.girls,],
            backgroundColor: [
                '#161c5eff',
                '#e567b5ff',
            ],
            hoverBorderColor: "#fff",
            borderWidth: 3
        }]
    };

    const optionsP = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                padding: 20,
                boxWidth: 12,
            },
            datalabels: {
                formatter: (value, context) => {
                    const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                    const percentage = Math.round((value / total) * 100);
                    return `${percentage}%`;  // Affiche le pourcentage
                },
                color: '#fff',
                font: {
                    weight: 'bold',
                    size: 14
                },
                textShadowBlur: 10,
                textShadowColor: 'rgba(0,0,0,0.5)',
                anchor: 'center',
                align: 'center'
            }
        }
    };
    const data = {
        labels: ['Notes >15', 'Notes >10', 'Les autres notes'],
        datasets: [
            {
                label: 'Les notes',
                data: [statsR?.E, statsR?.M, statsR?.B],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)'

                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1,
            },
        ],

    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,



    };

    // Affiche un loader pendant le chargement
    if (isLoading) {
        return (
            <div className="loading">
                <p>Chargement des statistiques...</p>
            </div>
        );
    }

    // Le contenu normal s'affiche seulement après 3 secondes
    return (
        <>
            <div className="stat">
                <h2 className='Tstats'>Tableau de Bord - Statistiques</h2>
                <div className="nb">
                    <div className="boox">
                        <p>Nombre d'étudiants : </p>
                        <i>{stats?.total}</i>
                    </div>
                    <div className="boox">
                        <p>Nombre d'enseignants : </p>
                        <i>{nbT}</i>
                    </div>
                    <div className="boox">
                        <p>Nombre de parents : </p>
                        <i>{nbP}</i>
                    </div>
                    <div className="boox">
                        <p>Nombre de Classes : </p>
                        <i>{statsClasses?.C}</i>
                    </div>
                    <div className="boox">
                        <p>Nombre de  sous-classe : </p>
                        <i>{statsClasses?.CT}</i>
                    </div>
                </div>

                <div className="dash">
                    <div className="dash2">
                        <h3 className='stst'>Statistiques par sexe :</h3>
                        <Pie className='pie' data={pieData} options={optionsP} />
                    </div>
                    <div className="dash1">
                        <h3 className='stst'>Statistiques par note :</h3>
                        <Bar data={data} options={options} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Statistiques;
