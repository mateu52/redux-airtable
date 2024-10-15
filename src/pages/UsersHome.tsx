import { useDispatch, useSelector } from "react-redux"
import { fetchUsers } from "../features/reducer/users/usersThunk";
import { AppDispatch, RootState } from "../app/store";
import { useEffect, useState } from "react";
import { FormWindow } from './FormWindow'
import NewWindow from "react-new-window";

export const UserHome = () => {
    const status = useSelector((state: RootState) => state.users.status)
    const users = useSelector((state: RootState) => state.users.users)
    //const error = useSelector((state: RootState) => state.users.error)
    const dispatch = useDispatch<AppDispatch>();
    const [isWindowOpen, setIsWindowOpen] = useState(false);

    const [id, setId] = useState('') 
    console.log(users)
    //dodanie danych do users;
    //edycja i susuwanie danych z users
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchUsers());
          }
    },[status, dispatch])
    console.log(users)
    const handleEdit = (id: string) => {
        //dispatch(edit)
        setId(id)
        setIsWindowOpen(true);
    }
    return (
        <div>
            <h4>Załoga</h4>
            {users.map((user) => {
                return(
                    <div key={user.id} className="flex ml-2 mt-2 pl-1 bg-gray-300 w-1/3">
                        <p className="pr-4">{user.fields.Name} </p>
                        <button 
                            onClick={() => handleEdit(user.id)}
                            className="text-red-600"
                        >edytuj</button>
                    </div>
                )
            })}
            {isWindowOpen && (
                <NewWindow>
                    <FormWindow id={id} setWindow={setIsWindowOpen} />
                </NewWindow>
            )}
        </div>
    )
}