import {createSlice} from '@reduxjs/toolkit';

export const roundSlice = createSlice({
    name: 'round',
    initialState : {
        round: {},
    },
    reducers: {
        saveRound: (state, action) => {
            state.round = action.payload
        }
    }
})

export const {saveRound} = roundSlice.actions;

export default roundSlice.reducer;