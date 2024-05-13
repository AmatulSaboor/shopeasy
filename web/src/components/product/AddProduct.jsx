import { useState } from "react"

let AddProduct = () => {

    const [name, setName] = useState();
    return(
        <>
            <form>
                <div>
                    <label htmlFor='name'>Name: </label>
                    <input type='text' value={name} onChange={e => setName(e.target.value)} />
                </div>
            </form>
        </>
    )
}

export default AddProduct