import React, { forwardRef, useState, Component} from "react";
import styled from "styled-components";

// import Header from "../../src/js/components/Header";
import { media } from "@bit/wasedatime.core.ts.utils.responsive-utils";
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import 'semantic-ui-css/semantic.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form, FormControl, Button, Accordion, Card, Badge } from 'react-bootstrap';
import {campuses} from './campp'

const InfoWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  padding: 1em 1em;
  ${media.tablet`padding: 5em;`}
`;

const RoomType = styled(Badge)`
  font-size: 1.2em;
  margin: 1px 3px 1px 3px;
  background-color: ${props => props.vacancy ? "green" : "red"}
`;

const RoomAcc = styled(Accordion)`
  
`;
const RoomCar = styled(Card.Header)`
  
`;

interface Props {
    CampusName: String;
}



const Building = ({
    campusName
  }) => {
      console.log(campuses);
    console.log(campuses["Waseda"]["7"]["205"])
    return (
        <React.Fragment>
            <InfoWrapper>
                {
                    Object.keys(campuses[campusName]).map(buid => 
                        <RoomAcc>
                            <Card>
                            <RoomCar>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                {buid}
                                </Accordion.Toggle>
                            </RoomCar>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    {
                                        Object.keys(campuses[campusName][buid]).map(roomdata => <RoomType vacancy={campuses[campusName][buid][roomdata][0][0]} >{roomdata}</RoomType>)
                                    }
                                </Card.Body>
                            </Accordion.Collapse>
                            </Card>
                    </RoomAcc>
                         )
                }  
            </InfoWrapper>
            
        </React.Fragment>
    );
    
};

export default Building;