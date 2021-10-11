import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
// Authors
import Authors from "./views/Authors";
import Author from "./views/Authors/detail";
// Comics
import Comics from "./views/Comics";
import Comic from "./views/Comics/detail";
import EditComic from './views/Comics/update';
import CreateComic from './views/Comics/create';
import Visible from './views/Comics/visible';
// Chapters
import Chapter from "./views/Chapters/detail";
// Categories
import Categories from './views/Categories';
import Tree from "./components/Tree";

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
                                        <Link to="/author"
                                              className="bg-white text-black px-3 py-2 rounded-md text-sm font-medium">Author</Link>
                                        <Link to="/comic"
                                              className="bg-white text-black px-3 py-2 rounded-md text-sm font-medium">Comic</Link>
                                        <Link to="/category"
                                              className="bg-white text-black px-3 py-2 rounded-md text-sm font-medium">Category</Link>
                                        <Link to="/tree"
                                              className="bg-white text-black px-3 py-2 rounded-md text-sm font-medium">Tree</Link>
                                        <Link to="/visible"
                                              className="bg-white text-black px-3 py-2 rounded-md text-sm font-medium">Visible</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <Switch>
                    <Route exact path="/author" component={Authors}/>
                    <Route exact path="/author/:id" component={Author}/>

                    <Route exact path="/comic" component={Comics}/>
                    <Route exact path="/comic/create" component={CreateComic}/>
                    <Route exact path="/comic/:id" component={Comic}/>
                    <Route exact path="/comic/:id/edit" component={EditComic}/>
                    <Route exact path="/visible" component={Visible}/>

                    <Route exact path="/comic/chapter/:id" component={Chapter}/>
                    <Route exact path="/chapter/:id" component={Chapter}/>

                    <Route exact path="/category" component={Categories}/>
                    <Route exact path="/tree" component={Tree}/>
                </Switch>
            </div>
        </Router>
    }
}

export default App;