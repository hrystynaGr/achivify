import React, { Component } from 'react';
import './configs.scss'
import { AchivifyContext } from '../../MyContext';
import { milestonesLoad } from '../../helpers/milestones';
import CInput from '../../atoms/c-input/c-input';
import { userMilestones } from '../../helpers/user';

//loadUsermilestones
// modify  them
//button to send them
//fix how checkboxes look
//check if mails was added
class Configs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            milestones: {}
        }
    }

    componentDidMount() {
        const milestones = milestonesLoad(this);
        const usermilestones = userMilestones(this.context.user.id);
    }

    handleCeckbox = (val) => {
        this.setState({ email: val });
    }



    render() {
        const milestones = this.state?.milestones;

        if (!milestones || !milestones[0]) {
            // Handle the case where milestones or milestones[0] is undefined or null
            return null; // or display an appropriate message
        }

        return (
            <div className="Configs" theme={this.context.theme}>
                <h2>Projects for your study program!</h2>
                <p>Go on! Mark what you have alredy done to track your progress.</p>
                <div className='list'>
                    {
                        Object.values(milestones).map((milestone) => {
                            return (
                                <CInput type={'checkbox'} func={this.handleCeckbox} label={milestone.categoryname} />
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

Configs.contextType = AchivifyContext;
export default Configs;