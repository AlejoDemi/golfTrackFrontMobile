import {configureStore} from '@reduxjs/toolkit';
import courseReducer from '../screens/CourseScreen/courseSlice';
import courseIdReducer from '../screens/HomeScreen/PlayScreenSlice';
import roundReducer from '../screens/PlayCourse/RoundSlice';
import userReducer from '../screens/Login/UserSlice';

export default configureStore({
    reducer: {
        course: courseReducer,
        courseId: courseIdReducer,
        round: roundReducer,
        user: userReducer,
        playerId: userReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})