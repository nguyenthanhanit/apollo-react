import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Users from "./Users";
import User from "./User";
import Comics from "./Comics"
import Comic from "./Comic";
import Chapter from "./Chapter";

class App extends Component {
    render() {
        return <Router>
            <div className='container m-auto'>
                <nav className="bg-blue-300 mb-10">
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="hidden sm:block sm:ml-6">
                                    <div className="flex space-x-4">
                                        <Link to="/author" className="bg-white text-black px-3 py-2 rounded-md text-sm font-medium">Author</Link>
                                        <Link to="/comic" className="bg-white text-black px-3 py-2 rounded-md text-sm font-medium">Comic</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <Switch>
                    <Route exact path="/author" component={Users} />
                    <Route exact path="/author/:id" component={User} />
                    <Route exact path="/comic" component={Comics} />
                    <Route exact path="/comic/:id" component={Comic} />
                    <Route exact path="/comic/chapter/:id" component={Chapter} />
                </Switch>
            </div>
        </Router>
    }
}

export default App;