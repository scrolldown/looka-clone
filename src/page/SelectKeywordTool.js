import { Container, Row, Col, Button } from 'react-bootstrap'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { setKeywordSelectedOnlyArr } from "./../const/store.js"
import { keywordInfo } from '../const/Provider'

import styled from 'styled-components'

const ImagePanel = styled.div`
    width : 200px;
    height : 30px;
    
    margin : 10px 0;
    text-align: center;
    border : 1px black solid;

    background-color: ${(props) => (props.isSelected ? "white" : "white")};
    color: ${(props) => (props.isSelected ? "red" : "black")};
    &:hover{
        cursor:pointer;
    }

    & .click-panel{
        width : 100%;
        height : 100%;
    }

`
function SelectKeywordTool() {
    const dispatch = useDispatch()
    const state = useSelector((state) => state)

    
    const [isClicked, setIsClicked] = useState(false);


    function setStoreBySelectedKeyword(arr) {

        let tempKeywordArray = []
        state.keywordSelectedOnlyArr.map((i)=>tempKeywordArray.push(i))

        Object.keys(arr).map((i) => {
            if (arr[i].isSelected === true) {
                tempKeywordArray.push(arr[i].name)
            }
        })
        dispatch(setKeywordSelectedOnlyArr(tempKeywordArray))
    }

    return (
        <Container>
            <Link to="/result">
                <Button onClick={() => setStoreBySelectedKeyword(keywordInfo)}>Get Result</Button>
            </Link>
            <Row>
                {Object.keys(keywordInfo).map((i) => {
                    return (
                        <Col key={i}>
                            <ImagePanel isSelected={keywordInfo[i].isSelected}>
                                <div className="click-panel" onClick={() => {
                                    keywordInfo[i].isSelected = !keywordInfo[i].isSelected

                                    setIsClicked(!isClicked)
                                }}>
                                    {i}
                                </div>
                            </ImagePanel>
                        </Col>
                    )
                })}
            </Row>

        </Container>
    )
}

export default SelectKeywordTool;