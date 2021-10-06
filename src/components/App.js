import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
// Authors
import Authors from "./Authors";
import Author from "./Authors/detail";
// Comics
import Comics from "./Comics";
import Comic from "./Comics/detail";
import EditComic from './Comics/update';
import CreateComic from './Comics/create';
// Chapters
import Chapter from "./Chapters/detail";
// Categories
import Categories from './Categories';

class App extends Component {
    render() {
        return <Router>
            <div className='container mx-auto px-4'>
                <nav className="bg-blue-300 mb-10">
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="hidden sm:block sm:ml-6">
                                    <div className="flex space-x-4">
                                        <Link to="/author" className="bg-white text-black px-3 py-2 rounded-md text-sm font-medium">Author</Link>
                                        <Link to="/comic" className="bg-white text-black px-3 py-2 rounded-md text-sm font-medium">Comic</Link>
                                        <Link to="/category" className="bg-white text-black px-3 py-2 rounded-md text-sm font-medium">Category</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <Switch>
                    <Route exact path="/author" component={Authors} />
                    <Route exact path="/author/:id" component={Author} />

                    <Route exact path="/comic" component={Comics} />
                    <Route exact path="/comic/create" component={CreateComic} />
                    <Route exact path="/comic/:id" component={Comic} />
                    <Route exact path="/comic/:id/edit" component={EditComic} />

                    <Route exact path="/comic/chapter/:id" component={Chapter} />

                    <Route exact path="/category" component={Categories} />
                </Switch>
            </div>
        </Router>
    }
}

export default App;