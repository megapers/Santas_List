import React from 'react';
import { authenticationService } from '@/_services';
import MapContainer from "@/MapContainer";

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            users: null
        };
    }

    componentDidMount() {
      
    }

    render() {
        const { currentUser, users } = this.state;
        return (
            <div>
                <h3>Hi {currentUser.username}!</h3>
                <p>You're logged in with .Net Core, React & JWT!!</p>
            </div>
        );
    }
}

export { HomePage };