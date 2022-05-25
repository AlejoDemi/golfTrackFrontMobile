import {createSlice} from '@reduxjs/toolkit';

export const courseIdSlice = createSlice({
    name: 'courseId',
    initialState : {
        id: '',
    },
    reducers: {
        setCourseId: (state, action) => {
            state.id = action.payload
        }
    }
})

export const {setCourseId} = courseIdSlice.actions;

export default courseIdSlice.reducer;