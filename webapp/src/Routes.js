"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const locations_1 = require("locations");
const Wallet_1 = require("components/Wallet");
const Page_1 = require("components/Page");
const HomePage_1 = require("components/HomePage");
const DomainDetailPage_1 = require("components/DomainDetailPage");
class Routes extends React.Component {
    renderRoutes() {
        return (<react_router_dom_1.Switch>
        <react_router_dom_1.Route exact={true} path={locations_1.locations.root()} component={HomePage_1.default}/>
        <react_router_dom_1.Route exact={true} path={locations_1.locations.domain()} component={DomainDetailPage_1.default}/>
        <react_router_dom_1.Redirect to={locations_1.locations.root()}/>
      </react_router_dom_1.Switch>);
    }
    render() {
        return (<Wallet_1.default>
        <Page_1.default>{this.renderRoutes()}</Page_1.default>
      </Wallet_1.default>);
    }
}
exports.default = Routes;
//# sourceMappingURL=Routes.js.map