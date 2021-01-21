import logo from "../../img/logo.png";
import textLogo from "../../img/text-logo.svg";
import Navigation from "./Navigation";
import UserMenu from "./user/UserMenu";
import OtherInfo from "./OtherInfo";
import React from "react";
import { Link, withRouter } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import styled from "styled-components";

const StyledSidebar = styled("aside")`
  background: ${(props) => props.theme.grey2};
  width: 65px;
  height: 100vh;
  position: fixed;
  z-index: 400;
  box-shadow: rgba(0, 0, 0, 0.45) 4px 0px 12px;
  transition: width 0.5s;

  ${(props) => props.ishovered && "width: 210px; transition: width 0.5s;"}
`;

const StyledLink = styled(Link)`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 7.5px;
  border-bottom: 2px solid ${(props) => props.theme.colorPrimary};
`;

const Footer = styled("div")`
  width: 100%;
  position: absolute;
  bottom: 35px;
  align-items: center;
  text-align: center;
`;

const Logo = styled("img")`
  width: 50px;
  height: 50px;
`;

const TextLogo = styled("img")`
  height: 25px;
  margin: 0.5rem;
  overflow-x: hidden;
  opacity: ${(props) => (props.ishovered ? "1" : "0")};
  transition: opacity 0.3s;
`;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
  }

  state = {
    isHovered: 0,
  };

  // Close sidebar when touching outside of the sidebar (mobile mode)
  componentDidMount() {
    document.addEventListener("touchstart", this.handleTouchOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("touchstart", this.handleTouchOutside);
  }
  handleTouchOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ isHovered: 0 });
    }
  };

  render() {
    const { userInfo, signOut, toggleSignInModal } = this.props;
    const { isHovered } = this.state;
    return (
      <StyledSidebar
        innerRef={(aside) => (this.wrapperRef = aside)}
        ishovered={isHovered}
        onMouseEnter={() => this.setState({ isHovered: 1 })}
        onTouchStart={() => this.setState({ isHovered: 1 })}
        onMouseLeave={() => this.setState({ isHovered: 0 })}
      >
        <div style={{ position: "relative", height: "100%" }}>
          <StyledLink to="/about">
            <Logo src={logo} alt="WasedaTime logo" width="50" height="50" />
            <TextLogo
              src={textLogo}
              alt="WasedaTime text logo"
              width="150"
              height="50"
              ishovered={isHovered}
            />
          </StyledLink>
          <Navigation isHovered={isHovered} />
          <Footer>
            <OtherInfo isHovered={isHovered} />
            <UserMenu
              userInfo={userInfo}
              signOut={signOut}
              openSignInModal={toggleSignInModal}
              isHovered={isHovered}
            />
          </Footer>
        </div>
      </StyledSidebar>
    );
  }
}

export default withRouter(withNamespaces("translation")(Sidebar));
