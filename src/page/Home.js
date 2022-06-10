import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { changeName, changeSlogan } from "./../const/store.js"

const Content = styled.div`
    text-align: center;
    & .main-title{
        margin-top:20px;
        font-weight : 600;
        font-size: 40px;    
    }
    & .main-title-info{
        font-size : 15px;
        color : gray;    
    }
    & .main-input{
        display: flex;
        flex-direction: row;
        gap : 10px;
    }
    & .btn-default{
    width : 200px;
    }
`

function Home() {
    const dispatch = useDispatch()
    const state = useSelector((state) => state.company)

    const [companyName, setCompanyName] = useState('')
    const [companySlogan, setCompanySlogan] = useState('')

    const onNameChange = (event) => {
        setCompanyName(event.target.value)
        dispatch(changeName(event.target.value))
    }

    const onSloganChange = (event) => {
        setCompanySlogan(event.target.value)
        dispatch(changeSlogan(event.target.value))
    }

    return (
        <Content>
            <p className='main-title'>Get your custom brand identity</p>
            <p className='main-title-info'>Use professional brand designer resource</p>
            <p className='main-input'>
                <input type="text" value={companyName} onChange={onNameChange} className="form-control" size="40" placeholder="Enter your company name" />
            </p>
            <p className='main-input'>
                <input type="text" value={companySlogan} onChange={onSloganChange} className="form-control" size="40" placeholder="Enter your slogan" />
            </p>
            <p>
                <Link to="/select-image">
                    <Button onClick={()=>console.log(state.name, state.slogan)}className='btn btn-default'>Get Started</Button>
                </Link>

            </p>
        </Content>
    )
}

export default Home;