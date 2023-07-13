import { Container, h1, Row, Col, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'

import styled, { createGlobalStyle } from 'styled-components'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"

import { imageInfo, keywordInfo, engFontInfo, korFontInfo, colorInfo } from '../const/Provider'
import { changeName, changeSlogan } from "./../const/store.js"
import LoadingSVG from "../const/Loading-Black.svg";

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
    const [isLoading, setIsLoading] = useState(false);

    const [imageScoreRankArray, setImageScoreRankArray] = useState(getImageRank());
    const [engFontScoreRankArray, setEngFontScoreRankArray] = useState(getEngFontRank());
    const [korFontScoreRankArray, setKorFontScoreRankArray] = useState(getKorFontRank());
    const [colorScoreRankArray, setColorScoreRankArray] = useState(getColorRank());

    const [companyName, setCompanyName] = useState(state.company.name);

    // add chatgpt module
    const [chatHistory, setChatHistory] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        
        const scoreArray = [...new Set(Object.keys(result).map((k)=>result[k]))].sort(function(a, b){return b-a});
        console.log(scoreArray)
        const highscoreKeywordArray = Object.keys(result).map(k => k).filter(keyword => scoreArray.slice(0,2).includes(result[keyword]))
    
        // ChatGPT API 요청 보내기
        const apiUrl = 'https://api.openai.com/v1/chat/completions';
        const apiKey = process.env.REACT_APP_CHAT_GPT_API_KEY; // ChatGPT API 키 
        // 중요 ** APIKEY는 깃허브에 업로드 되면 안됨
        const prompt = [
                        //{"role": "system", "content": "You are a competitive brand markerter."},
                        {"role": "user", "content": "당신은 우리 브랜드 디렉터 역할을 해주었으면 합니다. 나는 당신에게 브랜드 핵심가치와 그 핵심가치에 어울리는 브랜드 마케팅 문구를 요청할 것입니다. 브랜드 디렉터로서만 답을 해주었으면 좋겠습니다. 한 번에 모든 보존을 작성해주세요. 이번에 만드는 브랜드 아이덴티티를 '"
                        +state.company.slogan+"' 슬로건과 키워드 '"
                        +highscoreKeywordArray.join(", ")
                        +"'를 토대로 새로운 단어를 만들어주세요. 의미를 유지하되 더 창의적으로 만드십시오.\n"
                        +" 답변을 해줄 때, 아래 조건을 지켜주세요. \n"
                        +"1. 비슷한 단어 혹은 표현 반복 금지\n"
                        +"2. 답변은 반드시 브랜드 핵심가치에 해당하는 표현이어야합니다. 그리고 그 포현이 왜 브랜드의 핵심가치인지 설명하는 문장을 함께 써주세요. \n"
                        +"3. 답변의 형태는 [핵심가치, 단어,핵심가치에 대한 자세한 설명]로 출력해줘 \n"
                        +"4. 핵심가치는 3개까지만 말해줘.\n"
                        +"5. 답변을 모두 한국어로 적어줘.\n"
                        +"6. 질문자의 브랜드에 도움이 될 만한 정보가 있다면, 웹으로 정보를 찾아서 링크를 함께 적어줘. : [URL(as '브랜키 팁')].\n"
                        +"7. 마케팅에 쓸 한 문장을 핵심가치를 기반으로 만들어주세요.\n"
                    }];

        try {
          const response = await axios.post(apiUrl, {
            "model": "gpt-3.5-turbo",
            "messages": prompt,
            "temperature": 0.1
            }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`,
              'OpenAI-Organization' : "org-u6X1n1o0jTayhDOHAOo0Azwq"
            }
          });
        //   console.log(response.data.choices[0].message.content)
          const chatResponse = response.data.choices[0].message.content;
    
          // ChatGPT API 응답 처리
          setChatHistory([...chatHistory, { user: prompt[0]['content'], bot: chatResponse }]);
          setIsLoading(false);
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
                <Button className='btn btn-default' type="submit">chatGPT 추천 보기</Button>
            </form>
            {isLoading ? (
                <p align-items="center">
                    <img src={LoadingSVG}/>
                </p>
            )
            : < div className="chat-history">
                    {chatHistory.map((chat, index) => (
                    <div key={index}>
                        <p>user: {chat.user.split("\n").map((line)=>{
                            return(<span>{line}<br/></span>)
                        })}</p>
                        <p>gpt: {chat.bot.split("\n").map((line)=>{
                            return(<span>{line}<br/></span>)
                        })}</p>
                    </div>
                    ))}
                </div>
            }


            
            <Button className='btn btn-default' onClick={()=>window.print()}>print</Button> 



        </Container >

    )
}

export default Result;