import React from 'react';
import { Route } from 'react-router-dom';

import RoomFinderNavigation from './RoomFinderNavigation';
import NishiBuildingList from '../containers/NishiBuildingList';
import ClassroomListContainer from '../containers/ClassroomListContainer';
import '../styles/roomfinder.css';

const RoomFinder = ({ match }) => {
  return (
    <div className="roomfinder__wrapper">
      <RoomFinderNavigation />
      <Route exact path={`${match.url}`} component={NishiBuildingList} />
      <Route
        path={`${match.url}/:bldgName`}
        component={ClassroomListContainer}
      />
    </div>
  );
};

export default RoomFinder;
