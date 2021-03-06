import { Container, h1, Row, Col, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'

import styled, { createGlobalStyle } from 'styled-components'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"

import { imageInfo, keywordInfo, fontInfo, colorInfo } from '../const/Provider'
import { changeName, changeSlogan } from "./../const/store.js"

const formStyle = {
    border: 0,
    fontFamily: "Montserrat",
    fontSize: "40px",
    textAlign: 'center',
};

const FontResult = styled.div`
    margin : 10px 0;
    text-align: center;
    font-size: 30px;
    font-family: ${(props) => props.fontRankerInfo.name};
    font-weight: ${(props) => props.fontRankerInfo.weight};
`

const ColorResult = styled.div`
    margin : 10px 0;

    background: ${(props) => props.colorCode};
`


function Result() {
    const dispatch = useDispatch()
    const state = useSelector((state) => state)
    
    const [result, setResult] = useState(getKeywordScore());
    const [imageScoreRankArray, setImageScoreRankArray] = useState(getImageRank());
    const [fontScoreRankArray, setFontScoreRankArray] = useState(getFontRank());
    const [colorScoreRankArray, setColorScoreRankArray] = useState(getColorRank());
    const [companyName, setCompanyName] = useState(state.company.name);

    function getKeywordScore() {
        let temp = {};
        (state.keywordSelectedOnlyArr).forEach((i) => {
            temp[i] = (temp[i] || 0) + 1;
        })
        return temp;
    }

    function getImageRank() {
        let resultArray = [];

        state.imageSelectedOnlyArr.map((image, index) => {
            let temp = { "name": image, "score": 0 }

            Object.keys(result).map((keyword) => {
                imageInfo[image].tag.map((tag) => {
                    if (keyword === tag) { temp.score = temp.score + result[keyword] }
                })
            })
            imageInfo[image].score = temp.score
            resultArray.push(temp)
        })
        resultArray.sort((a, b) => { return b.score - a.score })
        resultArray.length = 3
        return resultArray;
    }

    function getFontRank() {
        let resultArray = [];

        Object.keys(fontInfo).map((font, index) => {
            let temp = { "id": font, "score": 0 }

            Object.keys(result).map((keyword) => {
                fontInfo[font].tag.map((tag) => {

                    if (keyword === tag) {
                        temp.score = temp.score + result[keyword]
                    }
                })
            })
            resultArray.push(temp)
        })
        resultArray.sort((a, b) => { return b.score - a.score })
        resultArray.length = 3
        return resultArray;
    }

    function getColorRank() {
        let resultArray = [];

        Object.keys(colorInfo).map((color, index) => {
            let temp = { "id": color, "score": 0 }

            Object.keys(result).map((keyword) => {
                colorInfo[color].tag.map((tag) => {

                    if (keyword === tag) {
                        temp.score = temp.score + result[keyword]
                    }
                })
            })
            resultArray.push(temp)
        })
        resultArray.sort((a, b) => { return b.score - a.score })
        resultArray.length = 3
        return resultArray;
    }


    const onNameChange = (event) => {
        setCompanyName(event.target.value)
        dispatch(changeName(event.target.value))
    }

    return (

        <Container>

            <p className="h1 text-center border-bottom border-dark">
                <input type="text" style={formStyle} value={companyName} onChange={onNameChange} className="form-control" size="40" placeholder="Enter your company name" />
            </p>
            <p className="h1 text-center">{state.company.slogan}</p>


            <Row>Font</Row>
            <Row>
                {fontScoreRankArray.map((fontRanker) => {
                    return (
                            <Col key={fontRanker.id}>
                                <FontResult fontRankerInfo={fontInfo[fontRanker.id]}>
                                    {companyName}
                                </FontResult>
                                {fontInfo[fontRanker.id].name}<br />
                                score : {fontRanker.score}<br />
                                {fontInfo[fontRanker.id].tag}
                            </Col>
                    )
                })}
            </Row>

            <Row>Color</Row>
            <Row>

                {colorScoreRankArray.map((colorRanker) => {
                    return (
                        <Col key={colorRanker.id}>
                            name : {colorRanker.id}<br />
                            score : {colorRanker.score}<br />
                            {colorInfo[colorRanker.id].hex.map((hexCode) => {
                                return (<ColorResult colorCode={hexCode}>
                                    {hexCode}
                                </ColorResult>
                                )
                            })}
                        </Col>
                    )
                })}
            </Row>

            <Row>Image</Row>
            <Row>
                {imageScoreRankArray.map((imageRanker, index) => {
                    return (
                        <Col key={index}>
                            <img width="100%" src={imageInfo[imageRanker.name].path} />
                            score : {imageRanker.score}<br />
                            {imageInfo[imageRanker.name].tag}
                        </Col>
                    )
                })}
            </Row>

            <Row>
                keyword <br />
                {Object.keys(result).map((keyword) => {
                    return <> {keyword}{result[keyword]} </>
                })}
            </Row>



        </Container >

    )
}

export default Result;