import { Container, h1, Row, Col, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'

import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"

import { imageInfo, keywordInfo, fontInfo } from '../const/Provider'
import { changeName, changeSlogan } from "./../const/store.js"

const formStyle = {
    border: 0,
    fontFamily: "Montserrat",
    fontSize: "40px",
    textAlign: 'center',
};

const ResultSection = styled.div`
    margin : 10px 0;
    text-align: center;
    font-size: 30px;
    font-family: ${(props) => props.fontFamily}, sans-serif;
`

function Result() {
    const dispatch = useDispatch()
    const state = useSelector((state) => state)

    const [result, setResult] = useState(getKeywordScore());
    const [imageScoreRankArray, setImageScoreRankArray] = useState(getImageRank());
    const [fontScoreRankArray, setFontScoreRankArray] = useState(getFontRank());
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
            let temp = { "name": font, "score": 0 }

            Object.keys(result).map((keyword) => {
                fontInfo[font].map((tag) => {

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
                {fontScoreRankArray.map((font) => {
                    return (
                        <Col key={font.name}>
                            <ResultSection fontFamily={font.name}>
                                {companyName}
                            </ResultSection>
                            score : {font.score}<br/>
                            {fontInfo[font.name]}
                        </Col>
                    )
                })}
            </Row>

            <Row>Image</Row>
            <Row>
                {imageScoreRankArray.map((image, index) => {
                    return (
                        <Col key={index}>
                            <img width="100%" src={imageInfo[image.name].path} />
                            score : {image.score}<br/>
                            {imageInfo[image.name].tag}
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



        </Container>
    )
}

export default Result;