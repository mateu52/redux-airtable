import { createAsyncThunk } from "@reduxjs/toolkit";

export type User = {
    id: string;
    fields: {
        Name: string
    }
}
interface EditUserPayload {
    id: string;
    Name: string; 
}
export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async() => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
            headers: { 
                Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
        const responseUsers = await response.json()
        
        return responseUsers.records;
    }
)
export const addUser = createAsyncThunk<User, { Name: string}>(
    'users/addUsers',
    async(newUser) => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fields :{
                    Name: newUser.Name
                },
            }),
        });
        if (!response.ok) {
            throw new Error('Failed to add user')
        }
        const addedUser = await response.json();
        return addedUser;
    }
)
export const editUser = createAsyncThunk<User, EditUserPayload> (
    'users/editUser',
    async(editedUser) => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                    "records": [
                        {
                            "id": editedUser.id,
                                "fields": {
                                    "Name": editedUser.Name,
                                }
                        }
                    ]
            }),
        });
        if (!response.ok) {
            throw new Error(`Failed to update user`);
        }
        const data = await response.json();
        return data.records[0];
    }
)