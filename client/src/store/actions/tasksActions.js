import { TASKS_REQUEST, TASKS_SUCCESS, TASKS_FAILURE } from "../types"
import axios from 'axios'



export const tasksRequest = () => ({
   type: TASKS_REQUEST,
})

export const tasksSuccess = data => ({
   type: TASKS_SUCCESS,
   payload: data,
})

export const tasksFailure = error => ({
   type: TASKS_FAILURE,
   payload: error,
})

const me = {userId: localStorage.getItem("userId"), userName: localStorage.getItem("userName")};


export const getTasks = path => dispatch =>{
   const token = localStorage.getItem('token')
   dispatch(tasksRequest())

   if (path==='me'){
   axios.get(`api/task/list/${me.userId}`, {
       headers:  {
         'Authorization': `Bearer ${token}`,
        }            
         
     
   })
      .then(response => {
      
         const data = response.data
         dispatch(tasksSuccess(data))
        })
      
      .catch(error => dispatch(tasksFailure(error)))
} 

if (path===''){
   axios.get(`api/task/list`, {
      headers:  {
        'Authorization': `Bearer ${token}`,
       }            
        
    
  })
     .then(response => {
        const data = response.data
        dispatch(tasksSuccess(data))
     })
     .catch(error => dispatch(tasksFailure(error)))


}
}
export const deleteTask = id => dispatch => {
   const token = localStorage.getItem('token')
   axios.get(`api/task/delete/${id}`, {
       headers:  {
         'Authorization': `Bearer ${token}`,
        }            
         
     })
      .then(data => {
         
      console.log(data)
         dispatch(getTasks(""))}
         )
      .catch(error => dispatch(tasksFailure(error)))

}

export const editTaskStatus = data => dispatch => {
   const statusArray = ["New", "In process", "Finished"]
   const token = localStorage.getItem('token')

   const newStatusIndex =
      statusArray.indexOf(data.status) > 1
         ? 0
         : statusArray.indexOf(data.status) + 1

   axios.patch(`api/task/update/${data.id}`,
      {title: data.title,
      importance: data.importance,
      status: statusArray[newStatusIndex],
      description: data.description,
      userName: data.userName,
      userId: data.userId},
       {
      headers:  {
         'Authorization': `Bearer ${token}`,
        }            
         
      })
      
      .then(data => dispatch(getTasks("")))
      .catch(error => dispatch(tasksFailure(error)))
}

export const editTaskPriority = data => dispatch => {
   const priorityArray = ["Low", "Medium", "High"]
   const token = localStorage.getItem('token')

   const newPriorityIndex =
      priorityArray.indexOf(data.importance) > 1
         ? 0
         : priorityArray.indexOf(data.importance) + 1

   axios.patch(`api/task/update/${data.id}`,
      {title: data.title,
      importance: priorityArray[newPriorityIndex],
      status: data.status,
      description: data.description,
      userName: data.userName,
      userId: data.userId},
       {
      headers:  {
         'Authorization': `Bearer ${token}`,
        }            
         
      })
      
      .then(data => dispatch(getTasks("")))
      .catch(error => dispatch(tasksFailure(error)))
}