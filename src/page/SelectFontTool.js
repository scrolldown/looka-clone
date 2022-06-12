import { Container, Row, Col, Button } from 'react-bootstrap'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const ImagePanel = styled.div`
    width : 200px;
    height : 200px;
    
    margin : 10px 0;
    text-align: center;
    border : 3px black solid;

    background-color: ${(props) => (props.isSelected ? "pink" : "white")};
    /* &:hover{
        cursor:pointer;
    } */

    & .click-panel{
        width : 100%;
        height : 100%;
        padding : 5px;
        font-family: ${(props)=>props.fontFamily}, sans-serif;
    }
`

function SelectFontTool() {
    const length = 10;
    const [fontArr, setFontArr] = useState(['Montserrat','Oswald','Roboto Mono']);
    const [selectedFontArr, setSelectedFontArr] = useState(new Array(length).fill(false));
    const [isClicked, setIsClicked] = useState(false);

    return (
        <Container>
            <Row>
                {fontArr.map((temp, index) => {
                    return (
                        <Col key={index}>
                            <ImagePanel isSelected={selectedFontArr[index]} fontFamily={fontArr[index]}>
                                <div className="click-panel" onClick={() => {
                                    selectedFontArr[index] = !selectedFontArr[index]
                                    setSelectedFontArr(selectedFontArr)
                                    setIsClicked(!isClicked)
                                }}
                                >
                                    {fontArr[index]}<br/><br/>
                                    
                                </div>
                            </ImagePanel>


                        </Col>
                    )
                })}
            </Row>
            <Link to="/result">
                <Button>Continue</Button>
            </Link>
        </Container>
    )
}

export default SelectFontTool;