import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { setImageSelectedOnlyArr, setKeywordSelectedOnlyArr } from "./../const/store.js"

import styled from 'styled-components'
import { Container, Row, Col, Button } from 'react-bootstrap'

import { imageInfo } from '../const/Provider'

const ImagePanel = styled.div`
    width : 200px;
    height : 200px;
    
    text-align: center;
    border : 3px black solid;

    background-color: ${(props) => (props.isSelected ? "blue" : "white")};
    /* &:hover{
        cursor:pointer;
    } */

    & .click-panel{
        width : 100%;
        height : 100%;
    }

`
function SelectImageTool() {
    const dispatch = useDispatch()
    const state = useSelector((state) => state)

    const [isClicked, setIsClicked] = useState(false);

    function setStoreBySelectedImage(arr) {
        let tempImageArray = new Array(0)
        let tempKeywordArray = new Array(0)

        Object.keys(arr).map((i) => {
            if (arr[i].isSelected === true) {
                tempImageArray.push(i)

                imageInfo[i].tag.map((keyword) => {
                    tempKeywordArray.push(keyword)
                })
            }
        })
        dispatch(setImageSelectedOnlyArr(tempImageArray))
        dispatch(setKeywordSelectedOnlyArr(tempKeywordArray))
    }

    

    return (
        <Container>
            <Link to="/select-keyword">
                <Button onClick={() => setStoreBySelectedImage(imageInfo)}>Continue</Button>
            </Link>

            <Row>
                {(Object.keys(imageInfo)).map((i) => {
                    console.log(i)
                    return (
                        <Col key={i}>
                            <ImagePanel isSelected={imageInfo[i].isSelected}>
                                <div className="click-panel" onClick={() => {
                                    imageInfo[i].isSelected = !imageInfo[i].isSelected
                                    setIsClicked(!isClicked)
                                }}>
                                    {i}<br />
                                    {imageInfo[i].tag}
                                    <img width="100%" src={imageInfo[i].path} />
                                </div>
                            </ImagePanel>


                        </Col>
                    )
                })}
            </Row>

        </Container>
    )
}

export default SelectImageTool;