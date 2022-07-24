import React, {useState} from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from './api'

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll())

    const handleDelete = (id) => {
        setUsers((prevState) => prevState.filter(user => user._id !== id))
    }

    const handleToogleBookMark = (id) => {
        setUsers((prevState) => prevState.map(user => user._id !== id ? user : {...user, bookmark: !user.bookmark}))
    }

    const len = users.length

    return (
        <>
            <SearchStatus usersLen={len} />
            {len > 0 ? <Users users={users} onDelete={handleDelete} onToogle={handleToogleBookMark} /> : ''}
        </>
    )
}

export default App