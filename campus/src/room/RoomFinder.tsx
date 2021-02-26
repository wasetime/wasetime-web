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
// import 'semantic-ui-css/semantic.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tabs, Tab, Badge } from 'react-bootstrap';
import Building from "./Building";


const InfoWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  padding: 5em 20em;
  ${media.tablet`padding: 5em;`}
`;

const DatePickerButton = styled("button")`
  padding: 0.5em 0.8em;
  border: none;
  width: 100%;
  background: #efefef;
  &:hover {
    outline: none;
    background: #ddd;
  }
  ${media.phone`padding: 0.5em 0.3em;`}
  ${media.phoneMini`font-size: 0.9em;`}
`;

const DatetimeClearButton = styled("button")`
  padding: 0.5em 0.8em 0.5em 0.4em;
  border: none;
  border-radius: 0 5px 5px 0;
  width: 24%;
  background: #efefef;
  &:hover {
    outline: none;
    background: #ddd;
  }
  &:focus {
    outline: none;
  }
  ${media.phone`padding: 0.5em 0.3em;`}
  ${media.phoneMini`font-size: 0.9em;`}
`;

const DateSelectorWrapper = (props: any) => <DateSelector {...props} />;

const TimeSelectorWrapper = (props: any) => <TimeSelector {...props} />;

const DateSelector = forwardRef<any, PropsType>(({ value, onClick }, ref) => (
  <DatePickerButton
    onClick={onClick}
    ref={ref}
    style={{ borderRadius: "5px 0 0 5px" }}
  >
    <FontAwesomeIcon icon={faCalendarAlt} size="1x" /> {value}
  </DatePickerButton>
));

const TimeSelector = forwardRef<any, PropsType>(({ value, onClick }, ref) => (
  <DatePickerButton onClick={onClick} ref={ref}>
    <FontAwesomeIcon icon={faClock} size="1x" /> {value}
  </DatePickerButton>
));

const DatePickerSpan = styled("span")`
  display: inline-block;
  width: 38%;
`;

const DatetimeSelection = styled("div")`
  background: #fff;
  border-radius: 5px;
  cursor: pointer;
`;

const findPeriod = (totalMins) => {
    if (totalMins < 100){
        return 0
    }
    if (100 <= totalMins && totalMins < 240){
        return 1
    }
    if (240 <= totalMins && totalMins < 345){
        return 2
    }
    if (345 <= totalMins && totalMins < 450){
        return 3
    }
    if (450 <= totalMins && totalMins < 555){
        return 4
    }
    if (555 <= totalMins && totalMins < 660){
        return 5
    }
    if (660 <= totalMins && totalMins <= 765){
        return 6
    }
  };

const RoomType = styled(Badge)`
  font-size: 1em;
  font-weight: 500;
  margin: 1px 3px 1px 3px;
  background-color: #E53935;
  border-radius: 6px;
`;
const RoomEmpt = styled(Badge)`
  font-size: 1em;
  font-weight: 500;
  margin: 1px 3px 1px 3px;
  background-color: #71CE74;
  border-radius: 6px;
`;





interface PropsType {
    value: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  }



const RoomFinder = (): JSX.Element => {
    const [date, setDate] = useState<Date>(new Date());
    const onDatetimeChange = (date: Date): void => setDate(date || new Date());
    const clearDatetime = (): void => setDate(new Date());
    const day = date.getDay() > 0 ? date.getDay() - 1 : 6
    const totalMins = (date.getHours() - 9)  * 60 + date.getMinutes();
    const per = findPeriod(totalMins)

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
                    {("Assign a date/time to check room vacancy")}：
                    <RoomType>occupied</RoomType>
                    <RoomEmpt>available</RoomEmpt>
                </p>
                <DatetimeSelection>
                    <DatePickerSpan>
                        <DatePicker
                        selected={date}
                        onChange={(d: Date) => onDatetimeChange(d)}
                        dateFormat="yyyy-MM-dd"
                        customInput={<DateSelectorWrapper />}
                        popperPlacement="bottom-start"
                        />
                    </DatePickerSpan>
                    <DatePickerSpan>
                        <DatePicker
                        selected={date}
                        onChange={(d: Date) => onDatetimeChange(d)}
                        showTimeSelect
                        showTimeSelectOnly
                        minTime={new Date().setHours(9, 0)}
                        maxTime={new Date().setHours(21, 30)}
                        timeIntervals={5}
                        timeCaption="Time"
                        dateFormat="hh:mm aa"
                        customInput={<TimeSelectorWrapper />}
                        popperPlacement="bottom-start"
                        />
                    </DatePickerSpan>
                    <DatetimeClearButton onClick={clearDatetime}>
                        <FontAwesomeIcon icon={faTimes} size="1x" /> Clear
                    </DatetimeClearButton>
                </DatetimeSelection>
                <div className="tabbable full-width-tabs">
                    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                        <Tab eventKey="Waseda" title="Waseda">
                            <Building campusName="Waseda" weekday={day} period={per} />
                        </Tab>
                        <Tab eventKey="Nishi-Waseda" title="NishiWaseda">
                            <Building campusName="NishiWaseda" weekday={day} period={per}/>
                        </Tab>
                        <Tab eventKey="Toyama" title="Toyama">
                            <Building campusName="Toyama" weekday={day} period={per}/>
                        </Tab>
                        <Tab eventKey="Tokorozawa" title="Tokorozawa">
                            <Building campusName="Tokorozawa" weekday={day} period={per}/>
                        </Tab>
                    </Tabs>
                </div>
                    
                
                
            </InfoWrapper>
            
        </React.Fragment>
    );
    
};

export default RoomFinder;