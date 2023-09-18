import './dashboard.scss'
import React, { Component } from 'react';
import { AchivifyContext } from '../../MyContext';

class Dashboard extends Component {
    render() {
        return (
            <div className="Dashboard" theme={this.context.theme}>
                <h2>Hello {this.props.name}, I am Dashboard</h2>
            </div>
        )
    }
}

Component.contextType = AchivifyContext;

export default Dashboard;