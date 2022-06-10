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
    }

`
function SelectColorTool() {
    const length = 10;
    const [colorArr, setColorArr] = useState(new Array(length).fill(0));
    const [selectedColorArr, setSelectedColorArr] = useState(new Array(length).fill(false));
    const [isClicked, setIsClicked] = useState(false);

    return (
        <Container>
            <Row>
                {colorArr.map((temp, index) => {
                    return (
                        <Col key={index}>
                            <ImagePanel isSelected={selectedColorArr[index]}>
                                <div className="click-panel" onClick={() => {
                                    selectedColorArr[index] = !selectedColorArr[index]
                                    setSelectedColorArr(selectedColorArr)
                                    setIsClicked(!isClicked)
                                }}>
                                    Color {index}
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

export default SelectColorTool;