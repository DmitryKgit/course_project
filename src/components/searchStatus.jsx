import React from 'react'

const SearchStatus = (props) => {
    const { usersLen } = props

    if (usersLen <= 0) {
        return <h2><span className='badge bg-danger'>Никто с тобой не тусанет</span></h2>
    }
    
    const ending = usersLen >= 2 && usersLen <= 4 ? 'а' : ''
    const decl = usersLen > 1 ? 'у' : 'ё'
    return (
        <h2>
            <span className='badge bg-primary'>{usersLen} человек{ending} тусан{decl}т с тобой сегодня</span>
        </h2>
    )
}

export default SearchStatus