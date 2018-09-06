import * as React from "react";
import { hot } from "react-hot-loader";
import { Route, Switch } from "react-router";

import { HomePage } from "__COMPONENTS/HomePage";
import { NoMatchPage } from "__COMPONENTS/NoMatchPage";
import { Templates } from "__COMPONENTS/Templates";
import { Temp } from "__COMPONENTS/Temp";
import { Testing } from "__COMPONENTS/Testing";

export const AppRoutes = hot(module)(() => (
    <div className="routes-container" style={{ height: `100%`, width: `100%` }}>
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/templates" component={Templates} />
            <Route exact path="/temp" component={Temp} />
            <Route exact path="*" component={NoMatchPage} />
        </Switch>
    </div>
));
