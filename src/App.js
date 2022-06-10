import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


import Home from "./page/Home"
import SelectImageTool from "./page/SelectImageTool"
import SelectColorTool from "./page/SelectColorTool"
import SelectKeywordTool from "./page/SelectKeywordTool"
import SelectFontTool from "./page/SelectFontTool"
import Result from "./page/Result"

const Header = styled.div`
  height : 60px;
  font-family:'Lexend';
  font-size: 30px;
  padding : 0 10px;
`


const Main = styled.div`
  height : 1000px;
  padding : 50px 0;
  display:flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Lexend';
  gap : 20px;
`

function App() {
  return (
    <Router>
      <Header><img src="https://cdn.looka.com/images/logos/looka_logo_black.svg" width="140px" /></Header>

      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/select-image" element={<SelectImageTool/>}/>
          <Route path="/select-keyword" element={<SelectKeywordTool/>}/>    
          <Route path="/select-color" element={<SelectColorTool/>}/>
          <Route path="/select-font" element={<SelectFontTool/>}/>                    
          <Route path="/result" element={<Result/>}/>                
        </Routes>
      </Main>

    </Router>
  );
}

export default App;
