import React, { forwardRef, useState, Component} from "react";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faAngleDoubleRight,
  faAngleDoubleLeft,
  faAngleDown,
  faSearch,
  faCalendarAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { RowWrapper } from "@bit/wasedatime.core.ts.styles.wrapper";
import { InvisibleButton } from "@bit/wasedatime.core.ts.styles.button";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

// import Header from "../../src/js/components/Header";
import { media } from "@bit/wasedatime.core.ts.utils.responsive-utils";
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
// import 'semantic-ui-css/semantic.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tabs, Tab } from 'react-bootstrap';
import Building from "./Building";


const InfoWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  padding: 5em 20em;
  ${media.tablet`padding: 5em;`}
`;




const RoomFinder = (): JSX.Element => {
    return (
        <React.Fragment>
            <Helmet>
                <title>WasedaTime -　RoomFinder</title>
                <meta
                name="description"
                content="Empty Room Checking in the campuses of Waseda University."
                />
                <meta property="og:title" content="WasedaTime - RoomFinder" />
                <meta
                property="og:description"
                content="Empty Room Checking in the campuses of Waseda University."
                />
                <meta property="og:site_name" content="WasedaTime - RoomFinder" />
            </Helmet>
            <InfoWrapper>
                <p>
                    <FontAwesomeIcon icon={faSearch} size="1x" />{" "}
                    {("Choose your campus and start finding rooms")}：
                </p>
                <div className="tabbable full-width-tabs">
                    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                        <Tab eventKey="Waseda" title="Waseda">
                            <Building campusName="Waseda" />
                        </Tab>
                        <Tab eventKey="Nishi-Waseda" title="NishiWaseda">
                            <Building campusName="NishiWaseda"/>
                        </Tab>
                        <Tab eventKey="Toyama" title="Toyama">
                            <Building campusName="Toyama"/>
                        </Tab>
                        <Tab eventKey="Tokorozawa" title="Tokorozawa">
                            <Building campusName="Tokorozawa"/>
                        </Tab>
                    </Tabs>
                </div>
                    
                
                
            </InfoWrapper>
            
        </React.Fragment>
    );
    
};

export default RoomFinder;