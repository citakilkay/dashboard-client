import React, {useEffect, useState} from 'react';
import axios from 'axios';
const Dashboard = () => {
    const[usersData, setUsersData] = useState([{username: 'ilkay', country: 'papua'},{username: 'wdadwa', country: 'hopa'}]);
    const [userID, setUserID] = useState('60f4942abebb252588581327');
    useEffect(() => {
        async function fetchUsers() {
            const result = await axios.get('http://localhost:5000/users');
            console.log(result.data);
            setUsersData(result.data);
        }
        fetchUsers();
    }, [userID]);
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
                {usersData.map((user, index) => {
                    const dailyDiff = user.rank - user.rankYesterday;
                    const dailyDiffColor = () => {
                        if(dailyDiff > 0) {
                            return 'green';
                        } else if(dailyDiff < 0) {
                            return 'red';
                        }
                        return 'yellow';
                    }
                    return (
                        <tr className="app__item-row" key={user._id}>
                            <td className="app__item-col">{index}</td>
                            <td className="app__item-col">{user.country}</td>
                            <td className="app__item-col">{user.username}</td>
                            <td className="app__item-col">{user.rank}</td>
                            <td className="app__item-col">{user.money}</td>
                            <td className="app__item-col" style={{color : `${dailyDiffColor()}`}}>{ dailyDiff }</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </>
    )
}
export default Dashboard;
