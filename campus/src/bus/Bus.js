import React, { forwardRef } from "react";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faAngleDoubleRight,
  faSearch,
  faCalendarAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import { withNamespaces } from "react-i18next";
import LANGS from "../config/langs";

// TODO use modal from other ui framework
import Header from "./Header";
import { media } from "../styled-components/utils";
import { Wrapper } from "../styled-components/Wrapper";
import { Overlay } from "../styled-components/Overlay";
import { busSchedule } from "../data/busSchedule.js";
import "../../styles/datetime.css";
import "react-datepicker/dist/react-datepicker.css";

const wasedaNishiwasedaBusUri =
  "https://www.waseda.jp/fsci/assets/uploads/2020/09/20200925_waseda_nishiwaseda-1.pdf";

const ExtendedOverlay = styled(Overlay)`
  align-items: center;
  padding: 120px 25px 0px 25px;
  ${media.tablet`padding-top: 2em;`}
`;

const InfoWrapper = styled("div")`
  display: flex;
  flex-direction: column;
`;

const StyledAnchor = styled("a")`
  margin: 1.5rem 0px;
  font-size: 1.8rem;
  font-weight: 400;
  text-decoration: underline;
`;

const BusStatus = styled("article")`
  margin: 1.5rem 0px;
`;

const StyledSubHeading = styled("h2")`
  align-self: flex-start;
  margin-top: 0px;
  margin-bottom: 1rem;
  border: 3px solid rgb(148, 27, 47);
  border-width: 3px 6px;
  border-radius: 5px;
  background: rgb(148, 27, 47);
  font-size: 2.5rem;
  font-weight: 300;
  color: #ffffff;
  ${media.phone`font-size: 2rem;`};
`;

const Status = styled("section")`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Remark = styled("section")`
  font-size: 1.5rem;
`;

const DatetimeSelection = styled("div")`
  background: #fff;
  border-radius: 5px;
  cursor: pointer;
`;

const DatePickerSpan = styled("span")`
  display: inline-block;
  width: 38%;
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

  ${media.phone`padding: 0.5em 0.3em;`};
  ${media.phoneMini`font-size: 0.9em;`};
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

  ${media.phone`padding: 0.5em 0.3em;`};
  ${media.phoneMini`font-size: 0.9em;`};
`;

const binarySearch = (value, arr) => {
  let start = 0,
    end = arr.length - 1;
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    if (arr[mid] === value) {
      return true;
    } else if (arr[mid] > value) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return false;
};

const getSchduleType = (month, date, day) => {
  const monthString = month.toString();
  const {
    outOfService,
    weekdaySchedule,
    saturdaySchedule,
    specialSchedule,
  } = busSchedule["exceptions"];

  if (
    monthString in outOfService &&
    binarySearch(date, outOfService[monthString])
  ) {
    return "noSchedule";
  } else if (
    monthString in weekdaySchedule &&
    binarySearch(date, weekdaySchedule[monthString])
  ) {
    return "weekday";
  } else if (
    monthString in saturdaySchedule &&
    binarySearch(date, saturdaySchedule[monthString])
  ) {
    return "saturday";
  } else if (
    monthString in specialSchedule &&
    binarySearch(date, specialSchedule[monthString])
  ) {
    return "special";
  } else {
    if (day === 0) {
      return "noSchedule";
    } else if (day === 6) {
      return "saturday";
    } else {
      return "weekday";
    }
  }
};

const binarySearchSchedule = (totalMins, schedule) => {
  let start = 0,
    end = schedule.length - 1;
  let ans = 0,
    index = 0;
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    if (schedule[mid] === totalMins) {
      ans = schedule[mid];
      index = mid;
      break;
    } else if (schedule[mid] > totalMins) {
      end = mid - 1;
      index = mid;
    } else {
      start = mid + 1;
      index = mid + 1;
    }
  }
  if (ans !== 0) {
    return ans;
  } else {
    // Return value -1 if totalMins is larger than all bus schedule values,
    // meaning no service.
    return index >= schedule.length ? -1 : schedule[index];
  }
};

const totalMinsToTimeStr = (totalMins) => {
  const hours = Math.floor(totalMins / 60);
  const minutes = totalMins - hours * 60;
  // TODO duplicated code from ClassroomList
  const hoursString = hours < 10 ? `0${hours}` : `${hours}`;
  const minsString = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${hoursString}:${minsString}`;
};

//TODO Fix mixing different return types
const getBusStatus = (totalMins, occurrences, remarks, t) => {
  const nextTotalMins = binarySearchSchedule(totalMins, occurrences);
  // If there is there exists a subsequent bus schedule on the same day
  if (nextTotalMins !== -1) {
    const remark =
      nextTotalMins in remarks ? remarks[nextTotalMins.toString()] : "";
    const nextTimeString = totalMinsToTimeStr(nextTotalMins);
    return {
      departIn: nextTotalMins - totalMins,
      timeString: nextTimeString,
      remark,
    };
  }
  return t("bus.Out of service");
};

const getBusStatuses = (targetDate, lng, t) => {
  const month = targetDate.getMonth();
  const date = targetDate.getDate();
  const day = targetDate.getDay();
  //assertion language at first
  let wasedaStatus, nishiStatus;
  wasedaStatus = t("bus.Out of service");
  nishiStatus = t("bus.Out of service");
  const scheduleType = getSchduleType(month, date, day);
  // No buses or special schedule
  if (scheduleType === "noSchedule") {
    return { wasedaStatus, nishiStatus };
  } else if (scheduleType === "special") {
    wasedaStatus = t("bus.Special Schedule");
    nishiStatus = t("bus.Special Schedule");
    return { wasedaStatus, nishiStatus };
  }

  // Weekday schedule or Saturday schedule
  const totalMins = targetDate.getHours() * 60 + targetDate.getMinutes();
  const wasedaSchedule = busSchedule[scheduleType].fromWasedaToNishiWaseda;
  const nishiSchedule = busSchedule[scheduleType].fromNishiWasedaToWaseda;
  if (lng === LANGS.EN) {
    wasedaStatus = getBusStatus(
      totalMins,
      wasedaSchedule.occurrences,
      wasedaSchedule.remarks_en,
      t
    );
    nishiStatus = getBusStatus(
      totalMins,
      nishiSchedule.occurrences,
      nishiSchedule.remarks_en,
      t
    );
  } else if (lng === LANGS.JP) {
    wasedaStatus = getBusStatus(
      totalMins,
      wasedaSchedule.occurrences,
      wasedaSchedule.remarks_jp,
      t
    );
    nishiStatus = getBusStatus(
      totalMins,
      nishiSchedule.occurrences,
      nishiSchedule.remarks_jp,
      t
    );
  }
  return { wasedaStatus, nishiStatus };
};

const createStatusComponent = (status, t) => {
  if (typeof status === "object") {
    return {
      status: (
        <span>
          {t("bus.Departs in")} <b>{status.departIn}</b> {t("bus.mins")}&nbsp;
          <FontAwesomeIcon icon={faClock} size="1x" />{" "}
          <b>{status.timeString}</b>
        </span>
      ),
      remark: status.remark,
    };
  }
  return {
    status: <span>{status}</span>,
    remark: "",
  };
};

const DateSelector = forwardRef(({ value, onClick }, ref) => (
  <DatePickerButton
    onClick={onClick}
    ref={ref}
    style={{ borderRadius: "5px 0 0 5px" }}
  >
    <FontAwesomeIcon icon={faCalendarAlt} size="1x" /> {value}
  </DatePickerButton>
));

const TimeSelector = forwardRef(({ value, onClick }, ref) => (
  <DatePickerButton onClick={onClick} ref={ref}>
    <FontAwesomeIcon icon={faClock} size="1x" /> {value}
  </DatePickerButton>
));

class Bus extends React.Component {
  state = {
    date: new Date(),
  };

  onDatetimeChange = (date) => {
    this.setState({ date: date || new Date() });
  };

  clearDatetime = () => {
    this.setState({ date: new Date() });
  };

  render() {
    const { t, lng } = this.props;
    const { wasedaStatus, nishiStatus } = getBusStatuses(
      this.state.date,
      lng,
      t
    );
    const wasedaStatusComponent = createStatusComponent(wasedaStatus, t);
    const nishiStatusComponent = createStatusComponent(nishiStatus, t);
    return (
      <Wrapper>
        <Helmet>
          <title>WasedaTime -　Bus</title>
          <meta
            name="description"
            content="Shuttle Bus Arrival Time Checking at Waseda University."
          />
          <meta property="og:title" content="WasedaTime - Bus" />
          <meta
            property="og:description"
            content="Shuttle Bus Arrival Time Checking at Waseda University."
          />
          <meta property="og:site_name" content="WasedaTime - Bus" />
        </Helmet>
        <Header
          title={t("navigation.bus")}
          placeholder="Search classroom (in construction...)"
          disabled={true}
        />
        <ExtendedOverlay>
          <InfoWrapper>
            <p>
              <FontAwesomeIcon icon={faSearch} size="1x" />{" "}
              {t("bus.Assign a date / time to check the next bus")}：
            </p>

            <DatetimeSelection>
              <DatePickerSpan>
                <DatePicker
                  selected={this.state.date}
                  onChange={(date) => this.onDatetimeChange(date)}
                  dateFormat="yyyy-MM-dd"
                  customInput={<DateSelector />}
                  popperPlacement="bottom-start"
                />
              </DatePickerSpan>
              <DatePickerSpan>
                <DatePicker
                  selected={this.state.date}
                  onChange={(date) => this.onDatetimeChange(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  minTime={new Date().setHours(9, 0)}
                  maxTime={new Date().setHours(18, 20)}
                  timeIntervals={5}
                  timeCaption="Time"
                  dateFormat="hh:mm aa"
                  customInput={<TimeSelector />}
                  popperPlacement="bottom-start"
                />
              </DatePickerSpan>
              <DatetimeClearButton onClick={this.clearDatetime}>
                <FontAwesomeIcon icon={faTimes} size="1x" /> Clear
              </DatetimeClearButton>
            </DatetimeSelection>

            <BusStatus>
              <StyledSubHeading>
                {t("bus.Waseda")}{" "}
                <FontAwesomeIcon icon={faAngleDoubleRight} size="1x" />{" "}
                {t("bus.NishiWaseda")}
              </StyledSubHeading>
              <Status>{wasedaStatusComponent.status}</Status>
              <Remark>{wasedaStatusComponent.remark}</Remark>
            </BusStatus>
            <BusStatus>
              <StyledSubHeading>
                {t("bus.NishiWaseda")}{" "}
                <FontAwesomeIcon icon={faAngleDoubleRight} size="1x" />{" "}
                {t("bus.Waseda")}
              </StyledSubHeading>
              <Status>{nishiStatusComponent.status}</Status>
              <Remark>{nishiStatusComponent.remark}</Remark>
            </BusStatus>
            <StyledAnchor href={wasedaNishiwasedaBusUri} target="_blank">
              {t("bus.The Latest Waseda-NishiWaseda Bus Schedule")}
            </StyledAnchor>
          </InfoWrapper>
        </ExtendedOverlay>
      </Wrapper>
    );
  }
}

export default withNamespaces("translation")(Bus);
