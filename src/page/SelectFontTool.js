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
    const [colorArr, setColorArr] = useState(['Montserrat','Oswald','Roboto Mono']);
    const [selectedColorArr, setSelectedColorArr] = useState(new Array(length).fill(false));
    const [isClicked, setIsClicked] = useState(false);

    return (
        <Container>
            <Row>
                {colorArr.map((temp, index) => {
                    return (
                        <Col key={index}>
                            <ImagePanel isSelected={selectedColorArr[index]} fontFamily={colorArr[index]}>
                                <div className="click-panel" onClick={() => {
                                    selectedColorArr[index] = !selectedColorArr[index]
                                    setSelectedColorArr(selectedColorArr)
                                    setIsClicked(!isClicked)
                                }}
                                >
                                    {colorArr[index]}<br/><br/>
                                    The quick brown fox jumps over the lazy dog 
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