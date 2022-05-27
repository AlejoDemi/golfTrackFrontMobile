import {createSlice} from '@reduxjs/toolkit';

export const courseSlice = createSlice({
    name: 'course',
    initialState : {
        course: {},
    },
    reducers: {
        saveCourse: (state, action) => {
            state.course = action.payload
        }
    }
})

export const {saveCourse} = courseSlice.actions;

export default courseSlice.reducer;