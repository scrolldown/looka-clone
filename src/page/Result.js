import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux"

function Result() {
    const state = useSelector((state) => state.company)


    return (
        <p>
            {state.name}<br />{state.slogan}
        </p>
    )
}

export default Result;