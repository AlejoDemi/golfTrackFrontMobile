import {configureStore} from '@reduxjs/toolkit';
import courseReducer from '../screens/CourseScreen/courseSlice';

export default configureStore({
    reducer: {
        course: courseReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})