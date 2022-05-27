import {configureStore} from '@reduxjs/toolkit';
import courseReducer from '../screens/CourseScreen/courseSlice';
import courseIdReducer from '../screens/HomeScreen/PlayScreenSlice';

export default configureStore({
    reducer: {
        course: courseReducer,
        courseId: courseIdReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})