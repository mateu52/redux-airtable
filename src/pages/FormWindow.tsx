import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../app/store"
import { editUser, User } from "../features/reducer/users/usersThunk"
import { useState } from "react"

type WindowProps = {
    id: string
}

export const FormWindow = ({id}: WindowProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const users = useSelector((state: RootState) => state.users.users )
    const user = users.find(user => user.id === id) 
    const [name, setName] = useState('')

    const handleSubmit = () => {
        if(name){
            dispatch(editUser({id, Name: name}))
        }
    }
    
    return (
        <div>
            <p>ok</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    placeholder={user?.fields.Name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="submit">
                    Edit
                </button>
            </form>
        </div>
    )
}