import React from 'react'
import styled from "styled-components"
import {useHistory , Link} from "react-router-dom"

function InfoBox({text , photoUrl ,name , link}) {
    return (
        <div>
            <Container>
                <div className="photo"
                style={{  
                    backgroundImage: "url(" + `${photoUrl}` + ")",
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                </div>
                <div className="info">
                  <p className="infoTitle">
                      {name}
                  </p>
                  <p className="infotext">
                   {text} ...
                  </p>
                 {name === "Primary Education" &&  <Link to = "/primaryEducation"><p className="details">Details</p></Link>}
                 {name === "Secondary Education" &&  <Link to = "/secondaryEducation"><p className="details">Details</p></Link>}
                 {name === "Higher Secondary Education" &&  <Link to = "/higherSecondaryEducation"><p className="details">Details</p></Link>}
                 {name === "Languages" &&  <Link to = "/languages"><p className="details">Details</p></Link>}
                </div>
            </Container>
        </div>
    )
}

const Container  = styled.div`
width : 438px;
height : 479px;
margin-right : 60px;
margin-bottom : 60px;
border : 1px solid lightgray;
display : flex;
flex-direction : column;

.photo{
    height : 262.35px;
    border-bottom : 1px solid lightgray;
}


.infoTitle{
    margin-left : 20px;
    font-size : 25px;
    margin-top : 20px;
    margin-bottom : 0px;
    font-weight : 300;
}

.infotext{
    padding: 10px;
    padding-bottom : 20px;
    margin-bottom : 0px;
    margin-left : 5px;
    margin-right : 5px;
    border-bottom : 1px solid lightgray;
}

a{
    text-decoration : none;
    color : #45c9f5;

    &:hover{
      color : #383535; 
    }
}

.details{
   width : 100%;
   text-align : left; 
   margin-left: 20px;
   font-size: 18px;
   margin-top : 9px;
}

@media(max-width:1091px){
    width : 80vw;
    margin-right : 0px;
    height :fit-content;


    .photo{
    height : 262px;
    border-bottom : 1px solid lightgray;
}

    .infoTitle{
    margin-left : 20px;
    font-size : 30px;
    margin-bottom : 0px;
    font-weight : 300;
}

.infotext{
    flex : 1;
    padding: 10px;
    padding-bottom : 10px;
    margin-bottom : 0px;
    margin-left : 5px;
    margin-right : 5px;
    border-bottom : 1px solid lightgray;
    font-size : 21px;
}

.details{
   width : 100%;
   margin-top : 10px;
   margin-bottom : 10px;
   text-align : left; 
   margin-left: 20px;
   font-size: 18px;
}
}


@media(max-width:657px){
    height: fit-content;
    .photo{
    height : 300px;
    border-bottom : 1px solid lightgray;
}
    .infotext{
    padding: 10px;
    padding-bottom : 10px;
    margin-bottom : 0px;
    margin-left : 5px;
    margin-right : 5px;
    border-bottom : 1px solid lightgray;
    font-size : 15px;

}
}
`;



export default InfoBox
