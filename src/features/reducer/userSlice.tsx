import { createSlice } from "@reduxjs/toolkit";
import { addUser, editUser, fetchUsers, type User } from "./users/usersThunk";
interface UsersState {
    users: User[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null | undefined;
  }
  
  const initialState: UsersState = {
    users: [], // Tablica obiektów typu User
    status: 'idle',
    error: null,
  };
const userSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message
            })
            .addCase(addUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users.push(action.payload);
            })
            .addCase(addUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.users.findIndex(user => user.id === action.payload.id);
                if(index !== -1) {
                    state.users[index] = action.payload;
                }
            })
    }
})
 //export const { incremented, decremented } = userSlice.actions


export default userSlice.reducer

// dodawanie id i users.lenght
