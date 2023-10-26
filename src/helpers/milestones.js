import configs from "../config";

export const milestonesLoad = async () => {
    try {
        const response = await fetch(`${configs.local_api}/milestones`);
        const milestones = await response.json();
        console.log('milestonesfrom Load', milestones)
        return milestones;

        // componentInstance.setState({milestones: milestones})
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

export const milestonesNames = async (milestones) => {
    return milestones.map(milestone => milestone.categoryname);

}