import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { addUser } from "../features/reducer/users/usersThunk";

export const Form = () => {
    const [name, setName] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const userStatus = useSelector((state: RootState) => state.users.status);
    const error = useSelector((state: RootState) => state.users.error)

    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault();
        if(name){
            dispatch(addUser({Name: name}))
        }
        setName('');
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name user"
                />
                <button type="submit">Add User</button>
            </form>
            {userStatus === 'loading' && <p>Loading...</p>}
            {userStatus === 'failed' && <p>Error: {error}</p>}
        </div>
    )
}