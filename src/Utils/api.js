import axios from 'axios';
import { tz } from '../Components/apis';
const usertoken = localStorage.getItem('usertoken')
// Function to udpate credentials from an  API endpoint to get users
const header={
headers: {
        'Content-Type': 'application/json',
        // Add Authorization with the token
        'Authorization': `${usertoken}`
    }
}
export const updateEmailinfo = async (postData) => {
    

    try {

        const data = await axios.post(`${tz}/email/add`, {
            email: postData.email,
            pass: postData.pass
        })
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};

export const getEmailList = async () => {

    try {

        const data = await axios.get(`${tz}/email/getall`)
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};

export const getAllTasks = async () => {

    try {

        const data = await axios.get(`${tz}/task/getall`)
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};
export const getAllSkills = async () => {

    try {

        const data = await axios.get(`${tz}/skills/getall`)
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};


//for deleting admin
export const deleteAdmin = async (postData) => {

    try {

        const data = await axios.post(`${tz}/admin/deletedata`,
        {
          ids:postData.ids})
     
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};
export const deleteTask = async (postData) => {

    try {

        const data = await axios.post(`${tz}/task/delete`,postData)
     
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};
export const loginAdmin2 = async (postData) => {

    try {

        const data = await axios.post(`${tz}/admin/login2`,
        postData)
     
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};

export const loginAdmin = async (postData) => {

    try {

        const data = await axios.post(`${tz}/admin/login`,
        postData)
     
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};


export const adminPass = async (postData) => {

    try {

        const data = await axios.post(`${tz}/admin/pass`,
        postData)
     
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};


export const adminReset = async (postData) => {

    try {

        const data = await axios.post(`${tz}/admin/reset`,
        postData)
     
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};


export const getAdminList = async () => {

    try {

        const data = await axios.get(`${tz}/admin/getall`)
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};


export const createTask = async (postData) => {

    try {

        const data = await  axios.post(`${tz}/task/add`,
        postData)

       
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};

export const createSkill = async (postData) => {

    try {

        const data = await  axios.post(`${tz}/skills/add`,
        postData,)

       
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};
export const createSiteUser = async (postData) => {

    try {

        const data = await  axios.post(`${tz}/siteuser/add`,
        postData,)

       
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};

export const updateSiteUserOfficialPhoto = async (postData) => {

    try {

        const data = await  axios.post(`${tz}/siteuser/originalphoto`,
        postData,)

       
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};
export const createLeave = async (postData) => {

    try {

        const data = await  axios.post(`${tz}/leave/add`,
        postData,)

       
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};

export const createAdmin = async (postData) => {
    

    try {

        const data = await  axios.post(`${tz}/admin/add`,
        postData,)

       
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};

export const createNote = async (postData) => {
    

    try {

        const data = await  axios.post(`${tz}/note/add`,
        postData,)

       
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};
export const updateAdmin = async (postData) => {

    try {

        const data = await  axios.post(`${tz}/admin/update`,
        postData,)

       
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};
export const viewProfile = async (postData) => {

    try {

        const data = await axios.post(`${tz}/siteuser/find`, postData
            ,
        )

       
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};
export const updateLeaveStatus = async (postData) => {

    try {

        const data = await axios.post(`${tz}/leave/updatestatus`, postData
            ,
        )

       
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};
export const getTime = async () => {

    try {

        const data = await axios.get(`${tz}/att/time`)

       
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};


export const getActiveClients = async () => {

    try {

        const data = await axios.get(`${tz}/client/active`)
       
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};

export const getAllNotes = async () => {

    try {

        const data = await axios.get(`${tz}/note/getall`)
       
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};
export const getAllClients = async () => {

    try {

        const data = await axios.get(`${tz}/client/getall`)
       
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};
export const getAllLeaves = async () => {

    try {

        const data = await axios.get(`${tz}/leave/getall`)
       
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};
export const getInActiveClients = async () => {

    try {

        const data = await axios.get(`${tz}/client/inactive`)
       
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};
export const addNewClient = async (postData) => {

    try {

        const data = await   axios.post(`${tz}/client/add`,postData)
       
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};
export const updateClient = async (postData) => {

    try {

        const data = await   axios.post(`${tz}/client/updatedata`,postData)
       
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};
export const updateClientOnly = async (postData) => {

    try {

        const data = await   axios.post(`${tz}/client/update`,postData)
       
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};
export const findClientById = async (postData) => {

    try {

        const data = await   axios.post(`${tz}/client/findbyid`,postData)
       
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};
export const updateClientFunds = async (postData) => {

    try {

        const data = await   axios.post(`${tz}/client/updatefunds`,postData)
       
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};
export const deleteClientData = async (postData) => {

    try {

        const data = await   axios.post(`${tz}/client/deletedata`,postData)
       
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};
export const sendClientInvoice = async (postData) => {

    try {

        const data = await   axios.post(`${tz}/client/sendinvoice`,postData)
       
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};
export const getAllTimesheets = async () => {

    try {

        const data = await axios.get(`${tz}/timesheet/getall`)
       
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};
export const addTimesheet = async (postData) => {

    try {

        const data = await axios.post(`${tz}/timesheet/add`, postData)
        
        
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};

export const getAttByDate = async (postData) => {

    try {

        const data = await axios.post(`${tz}/siteatt/findbydate`, postData)
        
        
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};

export const getAttByDateAndProject = async (postData) => {

    try {

        const data = await axios.post(`${tz}/siteatt/findbydateandproject`, postData)
        
        
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};
export const updateSiteAttTime = async (postData) => {

    try {

        const data = await axios.post(`${tz}/siteatt/updatetime`, postData)
        
        
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};

export const updateSiteUserUpdateTravel = async (postData) => {

    try {

        const data = await axios.post(`${tz}/siteuser/updatetravel`, postData)
        
        
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};

export const updateSiteUserUpdateTravelMiles = async (postData) => {

    try {

        const data = await axios.post(`${tz}/siteuser/updatetravelmiles`, postData)
        
        
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};

export const getSiteAttFromTo = async (postData) => {

    try {

        const data = await axios.post(`${tz}/siteatt/fromto`, postData)
        
        
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};

export const updateJobiste = async (postData) => {

    try {

        const data = await axios.post(`${tz}/jobsite/updatesite`, postData)
        
        
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};

export const addUserToJobsite = async (postData) => {

    try {

        const data = await axios.post(`${tz}/jobsite/adduser`, postData)
        
        
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};
export const addJobiste = async (postData) => {

    try {

        const data = await axios.post(`${tz}/jobsite/add`, postData)
        
        
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};


export const getAllJobsites = async () => {

    try {

        const data = await axios.get(`${tz}/jobsite/getall`)
       
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};



export const getAllPayroll = async () => {

    try {

        const data = await axios.get(`${tz}/payroll/getall`)
        
        
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};
export const addPayroll = async (postData) => {

    try {

        const data = await axios.post(`${tz}/payroll/add`, postData)
        
        
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};


export const updatePayrollStatus = async (postData) => {

    try {

        const data = await axios.post(`${tz}/payroll/updatestatus`, postData)
        
        
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};
export const updateSiteBulk = async (postData) => {

    try {

        const data = await axios.post(`${tz}/siteuser/updatebulk`, postData)
        
        
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};
export const deleteSiteUser = async (postData) => {

    try {

        const data = await axios.post(`${tz}/siteuser/delete`, postData)
        
        
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};

export const updateSiteUserHours = async (postData) => {

    try {

        const data = await axios.post(`${tz}/siteuser/updateuserhours`, postData)
        
        
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};
export const updateSiteUser = async (postData) => {

    try {

        const data = await axios.post(`${tz}/siteuser/update`, postData)
        
        
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};

export const updateSiteUserCPR = async (postData) => {

    try {

        const data = await axios.post(`${tz}/siteuser/updatecpr`, postData)
        
        
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};
export const findSiteUserImg = async (postData) => {

    try {

        const data = await axios.post(`${tz}/siteuser/findimg`, postData)
        
        
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};

export const addSiteUserHours = async (postData) => {

    try {

        const data = await axios.post(`${tz}/siteuser/adduserhours`, postData)
        
        
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};

export const updateSiteUserPayRateType = async (postData) => {

    try {

        const data = await axios.post(`${tz}/jobsite/updatepayratetype`, postData)
        
        
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};

export const getSiteUserDistance = async (postData) => {

    try {

        const data = await axios.post(`${tz}/siteuser/getdistance`, postData)
        
        
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};

export const deleteJobsite = async (postData) => {

    try {

        const data = await axios.post(`${tz}/jobsite/delete`, postData)
        
        
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};

export const addNewChatToAdmin = async (postData) => {

    try {

        const data = await axios.post(`${tz}/admin/addchat`, postData)
        
        
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};
export const addNewChatToSiteUser = async (postData) => {

    try {

        const data = await axios.post(`${tz}/siteuser/addchat`, postData)
        
        
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};
export const addNewChatUserToAdmin = async (postData) => {

    try {

        const data = await axios.post(`${tz}/admin/adduser`, postData)
        
        
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};
export const addNewChatUserToSiteUser = async (postData) => {

    try {

        const data = await axios.post(`${tz}/siteuser/adduser`, postData)
        
        
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};
export const adminViewedMessage = async (postData) => {

    try {

        const data = await axios.post(`${tz}/admin/viewed`, postData)
        
        
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};

export const adminGetUser = async (postData) => {

    try {

        const data = await axios.post(`${tz}/admin/getuser`, postData)
        
        
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        return error; // Throw the error to handle it in the component
    }
};

export const findNotesbyIds = async (postData) => {

    try {

        const data = await axios.post(`${tz}/note/find`, postData)
        
        
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};



export const getAactiveSiteusers = async () => {

    try {

        const data = await axios.get(`${tz}/siteuser/active`)
       
        return data.data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error to handle it in the component
    }
};
