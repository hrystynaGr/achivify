import './dashboard.scss'
import React, { Component } from 'react';
import { AchivifyContext } from '../../MyContext';

class Dashboard extends Component {

    render() {
        let textElem;
        if (this.context.isLoggedIn) {
            textElem = <h2>Hello {this.context.user.name}, I am Dashboard</h2>
        }
        else {
            textElem = <h2>Please log in to see the dashboard</h2>;
        }
        return (
            <div className="Dashboard" theme={this.context.theme}>
                {textElem}
            </div>
        )
    }
}

Component.contextType = AchivifyContext;

export default Dashboard;