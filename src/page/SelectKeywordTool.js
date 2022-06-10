import { Container, Row, Col, Button } from 'react-bootstrap'
import { useState } from 'react'
import { Link } from 'react-router-dom'
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
    const length = 10;
    const [keywordArr, setKeywordArr] = useState(['고급스러운', '개구진', '굳센', '귀여운', '깨끗한', '깔끔한', '강렬한', '고요한', '건강한', '구조적인', '날카로운'
        , '대조적인', '딱딱한', '달콤한', '따뜻한', '다채로운', '단아한', '다정한', '단정한', '다부진', '로맨틱한', '러프한', '몽환적인', '맑은', '무게감있는', '명랑한', '모던한'
        , '매혹적인', '복잡한', '빈티지한', '부드러운', '밝은', '발랄한', '상냥한', '성숙한', '신비로운', '산뜻한', '심플한', '순수한', '사랑스러운', '스포티한', '선한', '시크한'
        , '신뢰감있는', '싱그러운', '수수한', '세련된', '상큼한', '시원한', '우아한', '이국적인', '유쾌한', '우디한', '잔잔한', '중후한', '전문적인', '중성의', '지적인', '짙은'
        , '자유분방한', '자연스러운', '조용한', '정열적인', '차가운', '총명한', '청량한', '차분한', '천진난만한', '청초한', '클래식한', '쾌활한', '캐쥬얼한', '투명한', '퇴폐적인'
        , '풍요로운', '편안한', '평화로운', '환한', '화사한', '화려한', '활기찬']);
    const [selectedKeywordArr, setSelectedKeywordArr] = useState(new Array(length).fill(false));
    const [isClicked, setIsClicked] = useState(false);


    return (
        <Container>
            <Row>
                {keywordArr.map((temp, index) => {
                    return (
                        <Col key={index}>
                            <ImagePanel isSelected={selectedKeywordArr[index]}>
                                <div className="click-panel" onClick={() => {
                                    selectedKeywordArr[index] = !selectedKeywordArr[index]
                                    setSelectedKeywordArr(selectedKeywordArr)
                                    setIsClicked(!isClicked)
                                }}>
                                    {keywordArr[index]}
                                </div>
                            </ImagePanel>
                        </Col>
                    )
                })}
            </Row>
            <Link to="/select-font">
                <Button>Continue</Button>
            </Link>
        </Container>
    )
}

export default SelectKeywordTool;