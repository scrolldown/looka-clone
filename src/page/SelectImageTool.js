import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { setImageSelectedOnlyArr, setKeywordSelectedOnlyArr } from "./../const/store.js"
import { ImageList, ImageListItem, ImageListItemBar, Box, IconButton } from '@mui/material';

import styled from 'styled-components'
import { Container, Button } from 'react-bootstrap'

import { imageInfo } from '../const/Provider'

const ImagePanel = styled.div`
    border : ${(props) => (props.isSelected ? "5px" : "0px")} blue solid; 

    margin-bottom : ${(props) => (props.isSelected ? "5px" : "0px")}; 

    &:hover{
        cursor:pointer;
    }

    & .click-panel{
        filter: ${(props) => (props.isSelected ? "brightness(10%)" : "brightness(100%)")};
        margin-bottom : ${(props) => (props.isSelected ? "-5px" : "0px")}; 
    }

`
function SelectImageTool() {
    const dispatch = useDispatch()
    const state = useSelector((state) => state)

    const [isClicked, setIsClicked] = useState(false);
    const [randomizedImageInfo, setRandomizedImageInfo] = useState(
        Object.keys(imageInfo)
            .map((key) => ({ key, value: imageInfo[key] }))
            .sort((a, b) => { return Math.random() - 0.5; })
            .reduce((acc, e) => {
                acc[e.key] = e.value;
                return acc;
            }, {})
    );


    function setStoreBySelectedImage(arr) {
        let tempImageArray = new Array(0)
        let tempKeywordArray = new Array(0)

        Object.keys(arr).map((i) => {
            if (arr[i].isSelected === true) {
                tempImageArray.push(i)

                randomizedImageInfo[i].tag.map((keyword) => {
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
                <Button onClick={() => setStoreBySelectedImage(randomizedImageInfo)}>Continue</Button>
            </Link>
            <Box sx={{ width: '100%', height: parseInt(window.innerHeight-300), overflowY: 'scroll' }}>
                <ImageList variant="masonry" cols={parseInt(window.innerWidth/700)*4} gap={5}>
                    {(Object.keys(randomizedImageInfo)).map((i) => {
                        return (
                            <ImagePanel isSelected={randomizedImageInfo[i].isSelected}>
                                <div key={i} className="click-panel" onClick={() => {
                                    randomizedImageInfo[i].isSelected = !randomizedImageInfo[i].isSelected
                                    setIsClicked(!isClicked)
                                    console.log(randomizedImageInfo[i].isSelected)
                                }}>
                                    <ImageListItem
                                        cols={1} rows={1}
                                    >
                                        <img
                                            src={`${randomizedImageInfo[i].path}?w=248&fit=crop&auto=format`}
                                            alt={i}
                                            loading="lazy"
                                        />
                                        <ImageListItemBar title={randomizedImageInfo[i].tag} />
                                    </ImageListItem>
                                </div>
                            </ImagePanel>
                        )
                    }
                    )}
                </ImageList>
            </Box>
        </Container>
    )
}

export default SelectImageTool;