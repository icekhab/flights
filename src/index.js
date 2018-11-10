import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Flight from './Components/Flight';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route exact path='/' render={() => <Redirect to='/departure'/>} />
            <Route path="/departure" render={() => <Flight direction="departure" />} />
            <Route path="/arrival" render={() => <Flight direction="arrival" />} />
        </div>
    </BrowserRouter>,
    document.getElementById('root'));

serviceWorker.unregister();
