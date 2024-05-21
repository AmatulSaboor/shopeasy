import React from 'react'

const Pagination = ({productsPerPage, totalProducts, paginate}) => {
    const pageNumbers = []; 
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++){
        pageNumbers.push(i);
    }
    return (
        <nav> 
            <ul className='Navigation'>
                {pageNumbers.map(number => (
                    <li className='number' key = {number}>
                        <button className='number-listing' onClick = {() => paginate(number)} >{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination;