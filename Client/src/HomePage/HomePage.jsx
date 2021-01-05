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
            <div className="container">
                <h3>Hi {currentUser.username}!</h3>
                <p>This website is build with the next stack:</p>
                <br/>

                <div className="row">
                    <div className = "col">
                        <p><b>Front end</b></p>
                        <ul>
                            <li><u>React</u> (with classes, Redux and hooks will be my next app)</li>
                            <li><u>JavaScript</u> (will use TypeScript for my next app)</li>
                            <li>Google maps API</li>
                        </ul>
                    </div>
                    <div className = "col">
                        <p><b>Back end</b></p>
                        <ul>
                            <li><u>.Net Core 3.1</u></li>
                            <li><u>Entity Framework</u></li>
                            <li><u>SQL Lite</u> (to save on DB hosting)</li>
                            <li><u>JWT:</u> Authentication and Authorization</li>
                        </ul>
                    </div>
                    <div className = "col">
                        <p><b>Hosting</b></p>
                        <ul>
                            <li><u>Front end:</u> Vercel</li>
                            <li><u>Back end:</u> Microsoft Azure</li>
                            <p>API: <a href="https://listofsanta.azurewebsites.net/swagger" 
                                            target="_blank" rel="noopener noreferrer">Swagger</a></p>
                        </ul>
                    </div>
                </div>
            </div>

        );
    }
}

export { HomePage };