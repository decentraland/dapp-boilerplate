"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const react_redux_1 = require("react-redux");
const react_router_redux_1 = require("react-router-redux");
const Routes_1 = require("./Routes");
const store_1 = require("./store");
require("./index.css");
ReactDOM.render(<react_redux_1.Provider store={store_1.store}>
    <react_router_redux_1.ConnectedRouter history={store_1.history}>
      <Routes_1.default />
    </react_router_redux_1.ConnectedRouter>
  </react_redux_1.Provider>, document.getElementById('root'));
//# sourceMappingURL=index.js.map