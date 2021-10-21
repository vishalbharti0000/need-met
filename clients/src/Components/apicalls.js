import {API} from '../backend';
const axios=require('axios');

//all tasks for freelancers
export const getGlobalActiveTasks = (userId) => {
    return fetch(`${API}/user/${userId}/task/active`,{
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    }).then(
        response => {
            return response.json();
        }
    ).catch(error => console.log(error));
};

export const getAllTaskPostsByClient = (userId,token)=> {
    return fetch(`${API}/user/tasks/${userId}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Authorization": `Bearer ${token}`
        },
    }).then(
        response => {
            return response.json();
        }
    ).catch(error => console.log(error));
};

export const getAllActiveTaskPostClient = (userId,token) => {
    return fetch(`${API}/user/${userId}/tasks/active/all`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Authorization": `Bearer ${token}`
        },
    }).then(
        response => {
            return response.json();
        }
    ).catch(error => console.log(error));
};

export const getAllApplicantsToTaskPost = (taskPostId,userId,token) => {
    return fetch(`${API}/user/${userId}/tasks/${taskPostId}/applicants`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Authorization": `Bearer ${token}`
        },
    }).then(
        response => {
            return response.json();
        }
    ).catch(error => console.log(error));
};

export const createTaskPost = (userId,token,taskPost) => {
    return fetch(`${API}/user/task/create/${userId}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.strinigify(taskPost),
    }).then(
        response => {
            return response.json();
        }
    ).catch(error => console.log(error));
};

export const getTaskPostById = (taskPostId) => {
    return fetch(`${API}/task/${taskPostId}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    }).then(
        response => {
            return response.json();
        }
    ).catch(error => console.log(error));
}

export const updateTaskPost = (taskPostId,userId,token,taskPost) => {
    return fetch(`${API}/user/${userId}/task/update/${taskPostId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.strinigify(taskPost),
    }).then(
        response => {
            return response.json();
        }
    ).catch(error => console.log(error));
};

export const deleteTaskPost = (taskPostId,userId,token) => {
    return fetch(`${API}/user/${userId}/task/delete/${taskPostId}`,{
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Authorization": `Bearer ${token}`
        },
    }).then(
        response => {
            return response.json();
        }
    ).catch(error => console.log(error));
}

export const applyToTask = (userId,token,taskId) => {
    return fetch(`${API}/user/${userId}/apply_task/${taskId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Authorization": `Bearer ${token}`
        },
    }).then(
        response => {
            return response.json();
        }
    ).catch(error => console.log(error));
};

export const withDrawApplication = (userId,token,taskId) => {
    return fetch(`${API}/user/${userId}/withdraw_task/${taskId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Authorization": `Bearer ${token}`
        },
    }).then(
        response => {
            return response.json();
        }
    ).catch(error => console.log(error));
};


export const freelancerAppliedTasks = (userId,token) => {
    return fetch(`${API}/user/${userId}/applied_tasks`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Authorization": `Bearer ${token}`
        },
    }).then(
        response => {
            return response.json();
        }
    ).catch(error => console.log(error));
};

export const freelancerAcceptedTasks = (userId,token) => {
    return fetch(`${API}/user/${userId}/accepted_tasks`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Authorization": `Bearer ${token}`
        },
    }).then(
        response => {
            return response.json();
        }
    ).catch(error => console.log(error));
};

export const freelancerRejectedTasks = (userId,token) => {
    return fetch(`${API}/user/${userId}/rejected_tasks`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Authorization": `Bearer ${token}`
        },
    }).then(
        response => {
            return response.json();
        }
    ).catch(error => console.log(error));
};

export const acceptApplicationTaskPost = (userId,freelancerId,token,taskId) => {
    return fetch(`${API}/${userId}/${freelancerId}/apply_task/${taskId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Authorization": `Bearer ${token}`
        },
    }).then(
        response => {
            return response.json();
        }
    ).catch(error => console.log(error));
};

//correct -> photo one
export const updateUser = (userId,token,user) => {
    return fetch(`${API}/user/${userId}/update`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: user,
    }).then(
        response => {
            return response.json();
        }
    ).catch(error => console.log(error));
};

//correct
export const createProject = (userId,token,project) => {
    console.log(project)
    return fetch(`/user/${userId}/project/create`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Authorization" : `Bearer ${token}`,
        },
        body: project
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};

export const freelancerGetAllProjects = (userId) => {
    return fetch(`/user/${userId}/projects/all`,{
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
}

export const updateProject = (projectId,userId,token,project) => {
    return fetch(`/user/${userId}/project/update/${projectId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Authorization" : `Bearer ${token}`,
        },
        body: project
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};
export const deleteProject = (projectId,userId,token) => {
    return fetch(`/user/${userId}/project/update/${projectId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Authorization" : `Bearer ${token}`,
        },
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};

export const sortByDate = (userId,token) => {
    return axios(`/user/${userId}/project/view/sortedByDate`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Authorization" : `Bearer ${token}`,
        },
    }).then(response => {
        console.log("SFSFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",response);
        return response;
    }).catch(error => {
        console.log(error);
    });
};

export const sortByPriority = (userId,token) => {
    return fetch(`/user/${userId}/project/view/sortedByPriority`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Authorization" : `Bearer ${token}`,
        },
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};

