import {createSlice} from '@reduxjs/toolkit';

export const courseIdSlice = createSlice({
    name: 'courseId',
    initialState : {
        id: '',
        unit:'yards',
    },
    reducers: {
        setCourseId: (state, action) => {
            state.id = action.payload
        },
        setUnit: (state, action) => {
            state.unit = action.payload
        }
    }
})

export const {setCourseId} = courseIdSlice.actions;
export const {setUnit} = courseIdSlice.actions;

export default courseIdSlice.reducer;