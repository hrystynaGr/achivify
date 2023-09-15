import './dashboard.scss'
import React, { Component } from 'react';
import { UserNameContext } from '../../MyContext';

class Dashboard extends Component {
    render() {
        console.log('This context', this.context)
        return (<h2>Hello {this.props.name}, I am Dashboard</h2>)
    }
}

Component.contextType = UserNameContext;

export default Dashboard;