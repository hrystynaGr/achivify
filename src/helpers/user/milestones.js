import configs from '../../config';

const emptyMilestones = [
    {
        "junior": {
            "common": [],
            "JScore": [],
            "functions": [],
            "front-end": [],
            "layout": [],
            "react": [],
            "instruments": [],
            "practice": []
        }
    },
    {
        "middle": {
            "common": [],
            "JScore": [],
            "functions": [],
            "front-end": [],
            "layout": [],
            "react": [],
            "instruments": [],
            "practice": []
        }
    },
    {
        "senior": {
            "common": [],
            "JScore": [],
            "front-end": [],
            "instruments": [],
            "practice": []
        }
    },
    {
        "cleanCode": {
            "chapers": [],
        }
    }
]

// creates milestones entry in UsersMilestones for the new User
// expected responce: success: returns entry in UsersMilestones
// failure: false
export const createUserInUsersMilestones = async (data) => {
    try {
        const response = await postUserToMilestones(data)
        checkIfResponceIsOk(response);
    }
    catch (error) {
        console.error('Failed to POST to /usersMilestones', error);
        return false;
    }
}

// updates userMilestones for the current user
// expected output: updated milestones
// failure: false
export const changeUsersMilestones = async (data) => {
    try {
        const responce = await putToUsersMilestones(data);
        checkIfResponceIsOk(responce);
    }
    catch (error) {
        console.error('Failed to PUT to /usersMilestones', error);
        return false;
    };

}

// loads userMilestones for the current user
// expected output: milestones fror current user
// failure: false
export const loadUsersMilestones = async (userid) => {
    try {
        return await fetchUsersMilestones(userid);
    }
    catch (error) {
        console.error('Failed to GET from /usersMilestones', error);
        return false;
    }
}

function checkIfResponceIsOk(responce) {
    if (!responce.ok) {
        throw new Error('Network response was not ok');
    }
    else {
        return responce.json();
    }
}

async function postUserToMilestones(data) {
    const fetchUrl = `${configs.local_api}/usersMilestones`;
    const params = {
        "userid": data,
        "milestones": emptyMilestones,
    }
    const response = await fetch(fetchUrl, formedRequest(params));
    return response;
}

function formedRequest(params) {
    const request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }
    return request;
}

async function fetchUsersMilestones(userid) {
    const fetchUrl = `${configs.local_api}/usersMilestones?userid=${userid}`;
    const response = await fetch(fetchUrl);
    const fetchedData = await response.json();
    return fetchedData[0];
}

async function putToUsersMilestones(data) {
    const fetchUrl = `${configs.local_api}/usersMilestones/${data?.userMilestonesId}`
    const params = {
        userid: data?.user?.id,
        milestones: data?.userMilestones
    };
    const response = await fetch(fetchUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(params)
    })
    return response;

}

