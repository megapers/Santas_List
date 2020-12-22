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
                            <nav className="navbar navbar-expand navbar-dark bg-dark">
                                <div className="navbar-nav">
                                    <Link to="/" className="nav-item nav-link">Home</Link>
                                    <Link to="/Kids" className="nav-item nav-link">Kids</Link>
                                    <a onClick={this.logout} className="nav-item nav-link">Logout</a>
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
                            <nav className="navbar navbar-expand navbar-dark bg-dark">
                                <div className="navbar-nav">
                                    <Link to="/" className="nav-item nav-link">Home</Link>
                                    <a onClick={this.logout} className="nav-item nav-link">Logout</a>
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