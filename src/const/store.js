import { configureStore, createSlice } from '@reduxjs/toolkit'

let company = createSlice({
    name: 'company',
    initialState: {
        name: 'set name please',
        slogan: 'set slogan please'
    },
    reducers : {
        changeName(state, action){
            return {
                name: action.payload,
                slogan: state.slogan
            }
        },
        changeSlogan(state, action){
            return {
                name: state.name,
                slogan: action.payload
            }
        }
    }
})

export let {changeName, changeSlogan} = company.actions

export default configureStore({
    reducer: {
        company: company.reducer
    }
}) 