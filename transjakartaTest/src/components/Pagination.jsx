import React from 'react'
import './Pagination.css'

export default function Pagination({ totalPosts, postsPerPage, setCurrentPage, currentPage }) {
    let pages = []
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i)
    }

    return (
        <>
            <div className="pagination">
                {pages.map((page, index) => {
                    return <button
                        key={index}
                        onClick={() => setCurrentPage(page)}
                        className={page == currentPage ? 'active bg-blue-700 text-white' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-200'}>
                        {page}</button>
                })}
            </div>
        </>
    )
}
