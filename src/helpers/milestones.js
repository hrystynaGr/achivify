import configs from "../config";

export const milestonesLoad = async () => {
    try {
        const response = await fetch(`${configs.local_api}/milestones`);
        const milestones = await response.json();
        return milestones;
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}
