import React from 'react'
import Button from 'react-bootstrap/Button'

const Pagination = ({productsPerPage, totalProducts, paginate}) => {
    const pageNumbers = []; 
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++){
        pageNumbers.push(i);
    }
    return (
        <div className='Navigation d-flex justify-content-center'>
                {pageNumbers.map(number => (
                    <div className='number' key = {number}>
                        <Button className='number-listing me-3 btn-warning' onClick = {() => paginate(number)} >{number}</Button>
                    </div>
                ))}
            </div>
        // <nav> 
        //     <ul className='Navigation'>
        //         {pageNumbers.map(number => (
        //             <li className='number' key = {number}>
        //                 <button className='number-listing' onClick = {() => paginate(number)} >{number}</button>
        //             </li>
        //         ))}
        //     </ul>
        // </nav>
    )
}

export default Pagination;