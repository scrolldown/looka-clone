import { Container, h1, Row, Col, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'

import styled, { createGlobalStyle } from 'styled-components'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"

import { imageInfo, keywordInfo, engFontInfo, korFontInfo, colorInfo } from '../const/Provider'
import { changeName, changeSlogan } from "./../const/store.js"


import axios from 'axios';


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

    const koreanPattern =  /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const [isKorean, setIsKorean] = useState(koreanPattern.test(state.company.name));

    const [imageScoreRankArray, setImageScoreRankArray] = useState(getImageRank());
    const [engFontScoreRankArray, setEngFontScoreRankArray] = useState(getEngFontRank());
    const [korFontScoreRankArray, setKorFontScoreRankArray] = useState(getKorFontRank());
    const [colorScoreRankArray, setColorScoreRankArray] = useState(getColorRank());

    const [companyName, setCompanyName] = useState(state.company.name);

    // add chatgpt module
    const [chatHistory, setChatHistory] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const scoreArray = [...new Set(Object.keys(result).map((k)=>result[k]))].sort(function(a, b){return b-a});
        const highscoreKeywordArray = Object.keys(result).map(k => k).filter(keyword => scoreArray.slice(0,2).includes(result[keyword]))
    
        // ChatGPT API 요청 보내기
        const apiUrl = 'https://api.openai.com/v1/chat/completions';
        const apiKey = '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'; // ChatGPT API 키
        const prompt = [{"role": "system", "content": "You are a competitive brand markerter."}
                        ,{"role": "user", "content": "새로 오픈하는 가게의 브랜드 아이덴티티를 아래의 단어를 기반으로 3가지 이상 만들어줘 '"
                        +highscoreKeywordArray.join(", ")
                        +"'"}];

        try {
          const response = await axios.post(apiUrl, {
            "model": "gpt-3.5-turbo",
            "messages": prompt,
            "temperature": 0.7
            }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            }
          });
        //   console.log(response.data.choices[0].message.content)
          const chatResponse = response.data.choices[0].message.content;
    
          // ChatGPT API 응답 처리
          setChatHistory([...chatHistory, { user: prompt[1]['content'], bot: chatResponse }]);
        } catch (error) {
          console.error('ChatGPT API 요청 실패:', error);
        }
      };



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

    function getEngFontRank() {
        let resultArray = [];

        Object.keys(engFontInfo).map((font, index) => {
            let temp = { "id": font, "score": 0 }

            Object.keys(result).map((keyword) => {
                engFontInfo[font].tag.map((tag) => {

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

    function getKorFontRank() {
        let resultArray = [];

        Object.keys(korFontInfo).map((font, index) => {
            let temp = { "id": font, "score": 0 }

            Object.keys(result).map((keyword) => {
                korFontInfo[font].tag.map((tag) => {

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
        setIsKorean(koreanPattern.test(companyName))
        dispatch(changeName(event.target.value))
    }

    return (

        <Container>

            <p className="h1 text-center border-bottom border-dark">
                <input type="text" style={formStyle} value={companyName} onChange={onNameChange} className="form-control" size="40" placeholder="Enter your company name" />
            </p>
            <p className="h1 text-center">{state.company.slogan}</p>

            <Row className='h3'>Font</Row>
            {isKorean ?
             <Row>
                {korFontScoreRankArray.map((fontRanker) => 
                        <Col key={fontRanker.id}>
                            <FontResult fontRankerInfo={korFontInfo[fontRanker.id]}>
                                {companyName}
                            </FontResult>
                            {korFontInfo[fontRanker.id].name}<br/>
                        </Col>
                )}
            </Row>           
            :
            <Row>
                {engFontScoreRankArray.map((fontRanker) => 
                        <Col key={fontRanker.id}>
                            <FontResult fontRankerInfo={engFontInfo[fontRanker.id]}>
                                {companyName}
                            </FontResult>
                            {engFontInfo[fontRanker.id].name}<br/>
                        </Col>
                )}
            </Row>
            }
            <Row className='h3'>Color</Row>
            <Row>

                {colorScoreRankArray.map((colorRanker) => {
                    return (
                        <Col key={colorRanker.id}>
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

            <Row className='h3'>Image</Row>
            <Row>
                {imageScoreRankArray.map((imageRanker, index) => {
                    return (
                        <Col key={index}>
                            <img width="100%" src={imageInfo[imageRanker.name].path} />
                        </Col>
                    )
                })}
            </Row>

            <Row className='h3'>
                keyword <br />
                </Row>
                <Row>
                {Object.keys(result).map((keyword) => {
                    return <> {keyword}{result[keyword]} </>
                })}
            </Row>
            
            <form onSubmit={handleSubmit}>
                <button type="submit">chatGPT 추천 보기</button>
            </form>
            <div className="chat-history">
                {chatHistory.map((chat, index) => (
                <div key={index}>
                    <p>user: {chat.user}</p>
                    <p>gpt: {chat.bot}</p>
                </div>
                ))}
            </div>

            <Button className='btn btn-default' onClick={()=>window.print()}>print</Button> 



        </Container >

    )
}

export default Result;