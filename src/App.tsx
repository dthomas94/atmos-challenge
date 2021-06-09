import { Box, Nav, Sidebar } from "grommet";
import { FC } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
  useLocation,
} from "react-router-dom";
import styled from "styled-components";
import { Homes } from "./views/HomePlans";
import { HomePlanModal } from "./views/HomePlans/HomePlanModal";
import { Lots } from "./views/Lots";
import { LotModal } from "./views/Lots/LotModal";

const StyledNavLink = styled(NavLink)`
  color: black;
  padding: 10px;
  transition: all 0.3s ease-in-out;
  text-decoration: none;
  &:hover {
    opacity: 0.9;
    background-color: white;
  }
  &.active-link {
    color: gray;
    background-color: white;
  }
`;

const ModalSwitch: FC = () => {
  let location = useLocation() as any; //fix later

  // This piece of state is set when one of the
  // gallery links is clicked. The `background` state
  // is the location that we were at when one of
  // the gallery links was clicked. If it's there,
  // use it as the location for the <Switch> so
  // we show the gallery in the background, behind
  // the modal.
  let homePlanId = location.state && location.state.homePlanId;
  let lotId = location.state && location.state.lotId;
  return (
    <Box direction="row">
      <Sidebar background="light-1" width="170px" style={{ position: "fixed" }}>
        <Nav gap="small">
          <StyledNavLink to="/homes" activeClassName="active-link">
            Homes
          </StyledNavLink>
          <StyledNavLink to="/lots" activeClassName="active-link">
            Lots
          </StyledNavLink>
        </Nav>
      </Sidebar>

      <Box margin={{ left: "170px" }}>
        <Switch>
          <Route path="/homes">
            <Homes />
          </Route>
          <Route path="/lots">
            <Lots />
          </Route>
        </Switch>
        {homePlanId && <Route component={HomePlanModal} path="/" />}
        {lotId && <Route component={LotModal} path="/" />}
      </Box>
    </Box>
  );
};

const App: FC = () => {
  return (
    <Router>
      <ModalSwitch />
    </Router>
  );
};

export default App;
