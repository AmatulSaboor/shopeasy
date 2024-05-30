import Button from 'react-bootstrap/Button'

const Pagination = ({itemsPerPage, totalItems, paginate}) => {
    const pageNumbers = []; 
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++){
        pageNumbers.push(i);
    }

    // RETURN JSX
    return (
        <div className='Navigation d-flex justify-content-center'>
                {pageNumbers.map(number => (
                    <div className='number' key = {number}>
                        <Button className='number-listing me-3 btn-warning' onClick = {() => paginate(number)} >{number}</Button>
                    </div>
                ))}
        </div>
    )
}

export default Pagination;