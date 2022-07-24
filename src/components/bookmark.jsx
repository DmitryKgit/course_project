import React from "react";

const Bookmark = (props) => {
    const {status, id, onToogle} = props

    return status ? <span><i className="bi bi-emoji-smile-fill" onClick={() => onToogle(id)}></i></span> :
        <span><i className="bi bi-emoji-smile" onClick={() => onToogle(id)}></i></span>
}

export default Bookmark