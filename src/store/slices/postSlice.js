import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    posts: [],
    openModal: false,
    isLoading: false
}
const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPosts(state, action) {
            state.posts = action.payload
        },
        setModal: (state) => {
            state.openModal = !state.openModal
        },
        addPost: (state, action) => {
            state.posts.push(action.payload)
        },
        startUILoading: (state) => {
            state.isLoading = true;
        },
        stoptUILoading: (state) => {
            state.isLoading = false;
        }

    },
})

export const { setPosts, setModal, addPost, startUILoading, stoptUILoading } = postSlice.actions
export default postSlice.reducer