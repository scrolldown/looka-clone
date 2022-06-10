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

    const length = 10;
    const [imgArr, setImgArr] = useState(new Array(length).fill(0));
    const [selectedImgArr, setSelectedImgArr] = useState(new Array(length).fill(false));
    const [isClicked, setIsClicked] = useState(false);

    return (
        <Container>
            <Row>
                {imgArr.map((temp, index) => {
                    return (
                        <Col key={index}>
                            <ImagePanel isSelected={selectedImgArr[index]}>
                                <div className="click-panel" onClick={() => {
                                    selectedImgArr[index] = !selectedImgArr[index]
                                    setSelectedImgArr(selectedImgArr)
                                    setIsClicked(!isClicked)
                                }}>
                                    Image {index}
                                </div>
                            </ImagePanel>


                        </Col>
                    )
                })}
            </Row>
            <Link to="/select-keyword">
            <Button>Continue</Button>
            </Link>
        </Container>
    )
}

export default SelectImageTool;