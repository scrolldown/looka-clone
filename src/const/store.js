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

let imageSelectedOnlyArr = createSlice({
    name : 'imageSelectedOnlyArr',
    initialState: [],
    reducers : {
        setImageSelectedOnlyArr(state, action){
            return action.payload
        }
    }
})

let keywordSelectedOnlyArr = createSlice({
    name : "keywordSelectedOnlyArr",
    initialState: [],
    reducers :{
        setKeywordSelectedOnlyArr(state, action){
            return action.payload
        }
    }
})

export let {changeName, changeSlogan} = company.actions
export let {setImageSelectedOnlyArr} = imageSelectedOnlyArr.actions
export let {setKeywordSelectedOnlyArr} = keywordSelectedOnlyArr.actions

export default configureStore({
    reducer: {
        company: company.reducer,
        imageSelectedOnlyArr : imageSelectedOnlyArr.reducer,
        keywordSelectedOnlyArr : keywordSelectedOnlyArr.reducer
    }
}) 

