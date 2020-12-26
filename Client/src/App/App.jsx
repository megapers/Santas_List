import React from 'react';
import  './App.css';
import { Router, Route, Link } from 'react-router-dom';
import { history } from '@/_helpers';
import { authenticationService } from '@/_services';
import { PrivateRoute } from '@/_components';
import { HomePage } from '@/HomePage';
import { KidsPage } from '@/KidsPage';
import { LoginPage } from '@/LoginPage';
import { RegisterPage } from '@/RegisterPage';
import { EditUserPage } from '@/EditUserPage';
import { EditProfilePage } from '@/EditProfilePage';
import tree from './christmas-tree-icon.png'
import santa from './santa.png'


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
    }
    
    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    render() {
        const { currentUser } = this.state;
        if(currentUser != null && currentUser.role == "Admin"){
            return (
                <Router history={history}>
                    <div>
                        {currentUser &&
                            <nav className="navbar navbar-expand-lg navbar-dark bg-dark col-md-12">
                                <a className="navbar-brand " href="/editProfile">
                                    <img src={santa} width="10%" height="10%" alt=""/>
                                </a>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarNav">
                                    <ul className="navbar-nav offset-md-8">
                                        <li className="nav-item">
                                            <Link to="/" className="nav-item nav-link">Home</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/Kids" className="nav-item nav-link">Kids</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/editProfile" className="nav-item nav-link">Profile</Link>
                                        </li>
                                        <li className="nav-item">
                                            <a onClick={this.logout} className="nav-item nav-link">Logout</a>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        }
                        <div className="jumbotron">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6 offset-md-3">
                                        <PrivateRoute exact path="/" component={HomePage} />
                                        <PrivateRoute exact path="/Kids" component={KidsPage} />
                                        <Route path="/login" component={LoginPage} />
                                        <Route path="/register" component={RegisterPage} />
                                        <Route path="/editUser" component={EditUserPage} />
                                        <Route path="/editProfile" component = {EditProfilePage}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Router>
            );
        }
        else{
            return (
                <Router history={history}>
                    <div>
                        {currentUser &&
                            <nav className="navbar navbar-expand-lg navbar-dark bg-dark col-md-12">
                                <a className="navbar-brand" href="/editProfile">
                                    <img src={tree} width="10%" height="10%" alt=""/>
                                </a>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarNav">
                                    <ul className="navbar-nav offset-md-8">
                                        <li className="nav-item">
                                            <Link to="/" className="nav-item nav-link">Home</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/editProfile" className="nav-item nav-link">Profile</Link>
                                        </li>
                                        <li className="nav-item">
                                            <a onClick={this.logout} className="nav-item nav-link">Logout</a>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        }
                        <div className="jumbotron">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6 offset-md-3">
                                        <PrivateRoute exact path="/" component={HomePage} />
                                        <Route path="/login" component={LoginPage} />
                                        <Route path="/register" component={RegisterPage} />
                                        <Route path="/editProfile" component={EditProfilePage}/>
                                            
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Router>
            );
        }
    }
}
export { App }; 