import React from "react";
import { Router, Route, IndexRoute } from "react-router";
import { history } from "./store.js";
import App from "./components/App";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/home/Home";
import Requests from "./components/home/Requests";
import Prescriptions from "./components/home/Prescriptions";
import Records from "./components/home/Records";
import Doctor from "./components/home/Doctor";
import Pharma from "./components/home/Pharma";
import NotFound from "./components/NotFound";

window.API_CLIENT = 'http://pharma.hariramjewellers.in/api';

// build the router
const router = (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
    <Route path="/" component={App}>
		<IndexRoute component={Login}/>
		<Route path="/signup" component={Signup}/>
		<Route path="/home" component={Home}>
			<Route path="requests" component={Requests}/>
			<Route path="prescriptions" component={Prescriptions}>
				<Route path=":id" component={Prescriptions}/>
			</Route>
			<Route path="records" component={Records}>
				<Route path=":id" component={Records}/>
			</Route>
			<Route path="doctor" component={Doctor}/>
			<Route path="pharma" component={Pharma}/>
		</Route>
		<Route path="*" component={NotFound}/>
    </Route>
  </Router>
);

// export
export { router };
