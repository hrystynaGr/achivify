import React, { useState, useEffect, useContext } from 'react';

import './configs.scss';
import { AchivifyContext } from '../../MyContext';
import { milestonesLoad } from '../../helpers/milestones';
import { loadUsersMilestones, changeUsersMilestones } from '../../helpers/user/milestones';

import CInput from '../../atoms/c-input/c-input';

function Configs() {
  const { theme, user } = useContext(AchivifyContext);
  const [milestones, setMilestones] = useState({});
  const [userMilestones, setUserMilestones] = useState([]);
  const [userMilestonesId, setUserMilestonesId] = useState(0);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const milestonesData = await milestonesLoad();
        const userMilestonesData = await loadUsersMilestones(user?.id);
        setMilestones(milestonesData);
        setUserMilestones(userMilestonesData?.milestones);
        setUserMilestonesId(userMilestonesData?.id);
      };
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    checkboxesState();
  }, [userMilestones]);

  const isChecked = (milestoneId) => {
    const [type, catg, quest] = milestoneId.split('_');
    return userMilestones.find((el) => el[type])[type][catg]?.includes(+quest);
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
    let upd;
    const [type, catg, quest] = event.target.id.split('_');
    if (event.target.checked) {
      userMilestones.find((el) => el[type])[type][catg].push(+quest)
      setUserMilestones(userMilestones);
      changeUsersMilestones({ userMilestones: userMilestones, userMilestonesId, user });
    } else {
      upd = userMilestones.find((el) => el[type])[type][catg].filter((elem) => elem !== +quest);
      userMilestones.find((el) => el[type])[type][catg] = [...upd];
      setUserMilestones(userMilestones);
      changeUsersMilestones({ userMilestones: userMilestones, userMilestonesId, user });
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
          <div key={milestone.name}>
            <h2 className="type-name">{milestone.name}</h2>
            <div className="type-wrap" key={milestone.name}>
              {Object.entries(milestone[milestone.name]).map(([key, value]) => (
                <div key={key} className='category-container'>
                  <h4 className="catg-name">{key}</h4>
                  <div className={`categ-values`}>
                    {value.map((e) => (<CInput
                      key={key + e}
                      type="checkbox"
                      label={e}
                      id={milestone.name + '_' + key + '_' + e}
                      sendFromInputToParent={onClick}
                    />))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Configs;
