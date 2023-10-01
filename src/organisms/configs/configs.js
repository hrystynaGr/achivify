import React, { useState, useEffect, useContext } from 'react';
import './configs.scss';
import { AchivifyContext } from '../../MyContext';
import CInput from '../../atoms/c-input/c-input';
import { milestonesLoad } from '../../helpers/milestones';
import { usersMilestones, changeUserMilestones } from '../../helpers/user';

function Configs() {
  const { theme, user } = useContext(AchivifyContext);
  const [milestones, setMilestones] = useState({});
  const [userMilestones, setUserMilestones] = useState([]);
  const [userMilestonesId, setUserMilestonesId] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const milestonesData = await milestonesLoad();
      const userMilestonesData = await usersMilestones(user?.id);
      setMilestones(milestonesData);
      setUserMilestones(userMilestonesData?.milestones);
      setUserMilestonesId(userMilestonesData?.id);
      checkboxesState();
    };

    fetchData();
  }, []);

  const isChecked = (milestoneId) => {
    return userMilestones.includes(+milestoneId);
  };

  const checkboxesState = () => {
    const checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach((element) => {
      const id = element.getAttribute('id');
      const checked = element.getAttribute('checked');
      if (isChecked(id)) {
        element.setAttribute('checked', 'checked');
      } else if (checked) {
        element.removeAttribute('checked');
      }
    });
  };

  const onClick = (event) => {
    if (event.target.checked) {
      setUserMilestones([...userMilestones, +event.target.id]);
      changeUserMilestones({ userMilestones, userMilestonesId });
    } else {
      const filteredUserMilestones = userMilestones.filter((elem) => elem !== +event.target.id);
      setUserMilestones(filteredUserMilestones);
      changeUserMilestones({ userMilestones: filteredUserMilestones, userMilestonesId });
    }
  };

  if (!milestones || !milestones[0]) {
    return <h4>No milestones available.</h4>;
  }

  return (
    <div className="Configs" theme={theme}>
      <h2>Projects for your study program!</h2>
      <p>Go on! Mark what you have already done to track your progress.</p>
      <div className="list">
        {Object.values(milestones).map((milestone) => (
          <CInput
            key={milestone.name}
            type="checkbox"
            label={milestone.name}
            id={milestone.id}
            func={onClick}
          />
        ))}
      </div>
    </div>
  );
}

export default Configs;
