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
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Country</th>
                    <th>Username</th>
                    <th>Rank</th>
                    <th>Money</th>
                    <th>rankYesterday</th>
                </tr>
            </thead>
            <tbody>
                {usersData.map((user, index) => {
                    return (
                        <tr key={user._id}>
                            <td>{index}</td>
                            <td>{user.country}</td>
                            <td>{user.username}</td>
                            <td>{user.rank}</td>
                            <td>{user.money}</td>
                            <td>{user.rankYesterday}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
export default Dashboard;
