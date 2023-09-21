import React, { Component } from 'react';
import './configs.scss'
import { AchivifyContext } from '../../MyContext';
import { milestonesLoad } from '../../helpers/milestones';
import CInput from '../../atoms/c-input/c-input';
import { userMilestones, changeUserMilestones } from '../../helpers/user';

//loadUsermilestones
// modify  them
//button to send them
//fix how checkboxes look
//check if mails was added
class Configs extends Component {

    constructor(props) {
        super(props);
        //hack because lacking of proper database
        this.userMilestonesId = 0;
        this.state = {
            milestones: {},
            usermilestones: {},
        }
    }

    async componentDidMount() {
        const milestones = await milestonesLoad(this);
        const usermilestones = await userMilestones(this.context.user.id);
        this.setState({ usermilestones: usermilestones.milestones });
        this.userMilestonesId = usermilestones.id;
        this.checkboxesState();
    }



    isChecked(milestoneId) {
        const userMilestonesArray = Array.from(this.state.usermilestones);
        return userMilestonesArray.includes(+milestoneId);
    }

    checkboxesState = () => {
        const checkboxes = document.querySelectorAll('.checkbox');
        checkboxes.forEach((element) => {
            const id = element.getAttribute('id');
            const checked = element.getAttribute('checked');
            if (this.isChecked(id)) {
                element.setAttribute('checked', 'checked');
            }
            else if (checked) {
                element.removeAttribute('checked');
            }
        })
    }

    onClick = (event) => {
        if (event.target.checked) {
            this.state.usermilestones.push(+event.target.id)
            this.setState({ usermilestones: this.state.usermilestones })
        }
        else {
            const filteredUserMilestones = this.state.usermilestones.filter((elem) => elem != event.target.id)
            this.setState({ usermilestones: filteredUserMilestones })
        }
        //send only update and correct state information
        setTimeout(() => {
            changeUserMilestones(this);
        }, 300)
        
    }

    render() {
        const milestones = this.state?.milestones;

        if (!milestones || !milestones[0]) {
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
                                <CInput
                                    key={milestone.name}
                                    type={'checkbox'}
                                    label={milestone.name}
                                    id={milestone.id}
                                    func={this.onClick}
                                />
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