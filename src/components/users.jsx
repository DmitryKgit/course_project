import React, { useState } from 'react'
import api from '../api'

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())

    const handleDelete = (userId) => {
        setUsers((prevState) => prevState.filter(user => user._id !== userId))
    }

    const renderPhrase = (number) => {
        const ending = number === 2 || number === 3 || number === 4 ? 'а' : ''
        return <h2><span className='badge bg-primary'>{number} человек{ending} тусанёт с тобой сегодня</span></h2>
    }

    return users.length !== 0 ? (
        <>
            {renderPhrase(users.length)}
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.qualities.map(q => (
                                <span key={q._id} className={`badge m-1 bg-${q.color}`}>{q.name}</span>
                            ))}</td>
                            <td>{user.profession.name}</td>
                            <td>{user.completedMeetings}</td>
                            <td>{`${user.rate}/5`}</td>
                            <td>
                                <button 
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(user._id)}
                                >
                                    delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    ) : ''
}

export default Users