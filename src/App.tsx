import { Box } from "grommet";
import { FC } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from "react-router-dom";
import { Homes } from "./views/Homes";
import { Lots } from "./views/Lots";

const App: FC = () => {
  return (
    <Router>
      <Box>
        <NavLink to="/homes" />
        <NavLink to="/lots" />
      </Box>

      <Switch>
        <Route path="/homes">
          <Homes />
        </Route>
        <Route path="/lots">
          <Lots />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
