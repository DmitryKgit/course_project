import React from 'react'

const Bookmark = (props) => {
    const {status, id, onToggle} = props

    return <span><i className={`bi bi-emoji-smile${status ? '-fill' : ''}`} onClick={() => onToggle(id)}></i></span>
}

export default Bookmark