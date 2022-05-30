import {configureStore} from '@reduxjs/toolkit';
import courseReducer from '../screens/CourseScreen/courseSlice';
import courseIdReducer from '../screens/HomeScreen/PlayScreenSlice';
import roundReducer from '../screens/PlayCourse/RoundSlice';

export default configureStore({
    reducer: {
        course: courseReducer,
        courseId: courseIdReducer,
        round: roundReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})