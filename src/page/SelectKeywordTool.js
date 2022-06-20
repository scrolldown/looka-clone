import { Container, Row, Col, Button } from 'react-bootstrap'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { setKeywordSelectedOnlyArr } from "./../const/store.js"
import { keywordInfo } from '../const/Provider'

import styled from 'styled-components'

const KeywordPanel = styled.div`

    display: flex;
    justify-content: center;
    align-items : flex-start;
    width: 154px;
    height: 34px;
    
    margin : 10px 0;
    text-align: center;

    border: 0;
    border-radius: 6px;

    /*activate nomiate #FF7043, #FF5722 */
    background-color: ${(props) => (props.isSelected ? "black" : "#DDDEDE")};
    color: ${(props) => (props.isSelected ? "white" : "black")};
    &:hover{
        cursor:pointer;
    }

    & .click-panel{
        width : 100%;
        height:100%;
        margin-top : 3px;
    }
`
function SelectKeywordTool() {
    const dispatch = useDispatch()
    const state = useSelector((state) => state)


    const [isClicked, setIsClicked] = useState(false);


    function setStoreBySelectedKeyword(arr) {

        let tempKeywordArray = []
        state.keywordSelectedOnlyArr.map((i) => tempKeywordArray.push(i))

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
                <Button className="btn btn-warning" onClick={() => setStoreBySelectedKeyword(keywordInfo)}>Get Result</Button>
            </Link>
            <Row>
                {Object.keys(keywordInfo).map((i) => {
                    return (
                        <Col key={i}>
                            <KeywordPanel isSelected={keywordInfo[i].isSelected}>
                                <div className="click-panel" onClick={() => {
                                    keywordInfo[i].isSelected = !keywordInfo[i].isSelected

                                    setIsClicked(!isClicked)
                                }}>
                                    {i}
                                </div>
                            </KeywordPanel>
                        </Col>
                    )
                })}
            </Row>

        </Container>
    )
}

export default SelectKeywordTool;