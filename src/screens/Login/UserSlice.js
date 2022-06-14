import {createSlice} from '@reduxjs/toolkit';
//chala

export const userSlice = createSlice({
    name: 'user',
    initialState : {
        user: {},
        playerId: "",
    },
    reducers: {
        saveUser: (state, action) => {
            state.user = action.payload
        },
        saveId: (state, action) => {
            state.playerId = action.payload
        }
    }
})

export const {saveUser} = userSlice.actions;
export const {saveId} = userSlice.actions;

export default userSlice.reducer;