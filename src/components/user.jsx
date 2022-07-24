import React from "react";
import Quality from "./quality";
import Bookmark from "./bookmark";

const User = ({_id, name, qualities, profession, completedMeetings, rate, bookmark, onDelete, onToogle}) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{qualities.map(({_id, name, color}) => <Quality key={_id} name={name} color={color} />)}</td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{`${rate}/5`}</td>
            <td><Bookmark status={bookmark} id={_id} onToogle={onToogle} /></td>
            <td>
                <button 
                    type="button"
                    className="btn btn-danger"
                    onClick={() => onDelete(_id)}
                >
                    delete
                </button>
            </td>
        </tr>
    )
}

export default User