import { Box, Nav, Sidebar } from "grommet";
import React, { FC } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from "react-router-dom";
import styled from "styled-components";
import { Homes } from "./views/Homes";
import { Lots } from "./views/Lots";

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

const App: FC = () => {
  return (
    <Router>
      <Box direction="row">
        <Sidebar
          background="light-1"
          width="170px"
          style={{ position: "fixed" }}
        >
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
        </Box>
      </Box>
    </Router>
  );
};

export default App;
