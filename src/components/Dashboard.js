import React, {useEffect, useState} from 'react';
import axios from 'axios';
const Dashboard = () => {
    const[usersData, setUsersData] = useState([{username: 'ilkay', country: 'papua'},{username: 'wdadwa', country: 'hopa'}]);
    const [userId, setUserId] = useState('60f711fe5ff30d477c76bb3d');
    useEffect(() => {
        async function fetchUsers() {
            const result = await axios.get(`http://localhost:5000/users/${userId}`);
            setUsersData(result.data);
        }
        fetchUsers();
    }, [userId]);
    return (
        <>
        <h1 className="app__title">🚀 Dashboard</h1>
            <table className="app__table" cellPadding="0" cellSpacing="0">
            <thead className="app__header">
                <tr className="app__header-row">
                    <th className="app__header-col"> <span className="ilkay">#</span></th>
                    <th className="app__header-col">Country</th>
                    <th className="app__header-col">Username</th>
                    <th className="app__header-col">Rank</th>
                    <th className="app__header-col">Money</th>
                    <th className="app__header-col">Daily Diff</th>
                </tr>
            </thead>
            <tbody className="app__body">
                    {usersData.sort((a, b) => b.weeklyMoney >= a.weeklyMoney ? 1 : b.weeklyMoney < a.weeklyMoney ? -1 : 0).map((user, index) => {
                    const dailyDiff = user.rank - user.rankYesterday;
                    const dailyDiffColor = dailyDiff > 0 ? 'green' : dailyDiff < 0 ? 'red' : 'yellow';
                    return (
                        <tr className="app__item-row" key={user._id}>
                            <td className="app__item-col">{index}</td>
                            <td className="app__item-col">{user.country}</td>
                            <td className="app__item-col">{user.username}</td>
                            <td className="app__item-col">{user.rank}</td>
                            <td className="app__item-col">{user.weeklyMoney}</td>
                            <td className="app__item-col" style={{color : `${dailyDiffColor}`}}>{ dailyDiff }</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </>
    )
}
export default Dashboard;
