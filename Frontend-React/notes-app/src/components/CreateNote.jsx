import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

function CreateNote({ onCancel, onSuccess, initialData }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority_id: 1,
    status_id: 1,
    category_id: 1,
    due_date: new Date().toISOString().split('T')[0]  // Default date
  });
  const today = new Date().toISOString().split("T")[0];
  
  useEffect(() => {
    if(initialData) {
      setTask({
        title: initialData.title,
        description: initialData.description,
        priority_id: initialData.priority_id,
        status_id: initialData.status_id,
        category_id: initialData.category_id,
        due_date: initialData.due_date
      });
    }
  }, [initialData])
  
  const submit = async (event) => {
    event.preventDefault();

    if(task.title === "") {
      alert("Please enter a title!");
      return;
    }
    
    if(task.description === "") {
      alert("Please enter a description");
      return;
    }

    if(task.due_date < today){
      alert("Select a Valid Date!");
      return;
    }

    const authHeader = () => {
      const token = localStorage.getItem('token');
      return { headers: { Authorization: `Bearer ${token}`}};
    }

    // POST, PUT
    const url = "http://127.0.0.1:8000/api/todo";
    const reqData = initialData ? axios.put(`${url}/${initialData.id}`, task, authHeader()) : 
                                  axios.post(url, task, authHeader());
    

    reqData.then(() => {
        onSuccess();
        onCancel();
      })
      .catch((err) => {
        console.error("Error: ", err.response?.data);

        // if (err.response?.status === 422) {
        // alert("Validation Failed: " + JSON.stringify(err.response.data.errors));
        // }
      });
  };

  
  return (
  <>
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md z-40"></div>
    <div className="bg-white rounded-3xl p-15 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] border-1 border-blue-300/30 shadow-2xl z-50 " >
      <h1 className="text-4xl m-auto flex mb-10 justify-center items-center">
        {initialData ? "Edit Task" : "Create New Task"}
      </h1>
    
      <form onSubmit={submit}>
        <label className="block mb-2 text-lg font-medium text-gray-700">
          Task title:
          <input 
            type = "text"
            name = "title"
            placeholder="Add Task"
            value={task.title}
            onChange={(v) => setTask({
              ...task,
              title: v.target.value
            })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
          {/* console.log(task) */}
        </label>
        <label className="block mb-2 text-lg font-medium text-gray-700">
          Task description:
          <input 
            required
            type="text"
            name="description"
            placeholder="Add Description"
            value={task.description}
            onChange={(v) => setTask({
              ...task,
              description: v.target.value
            })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </label>
        <div>
            <span className="block mb-2 text-lg font-medium text-gray-700">
              Priority:
            </span>
            <div className="flex item-center gap-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="radio" 
                name="priority" 
                value="1" 
                checked={task.priority_id === 1}
                onChange={() => setTask({
                  ...task,
                  priority_id: 1
                })} 
                className="form-radio h-4 w-4 text-blue-500  focus:ring-blue-300"/>
              <span>
                Low
              </span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="radio" 
                name="priority" 
                value="2"
                checked={task.priority_id === 2}
                onChange={() => setTask({
                  ...task,
                  priority_id: 2
                })}
                className="form-radio h-4 w-4 text-blue-500  focus:ring-blue-300" />
              <span>
                Medium
              </span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="radio" 
                name="priority" 
                value="3" 
                checked={task.priority_id === 3}
                onChange={() => setTask({
                  ...task,
                  priority_id: 3
                })}
                className="form-radio h-4 w-4 text-blue-500  focus:ring-blue-300" />
              <span>
                High
              </span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="radio" 
                name="priority" 
                value="4" 
                checked={task.priority_id === 4}
                onChange={() => setTask({
                  ...task,
                  priority_id: 4
                })}
                className="form-radio h-4 w-4 text-blue-500  focus:ring-blue-300" />
              <span>
                Urgent
              </span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="radio" 
                name="priority" 
                value="5" 
                checked={task.priority_id === 5}
                onChange={() => setTask({
                  ...task,
                  priority_id: 5
                })}
                className="form-radio h-4 w-4 text-blue-500  focus:ring-blue-300" />
              <span>
                Immediate
              </span>
            </label>
          </div>
        </div>
        <div>
          <span className="block mt-2 mb-1 text-lg font-medium text-gray-700">Status:</span>
          <div className="flex item-center gap-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="radio" 
                name="status" 
                value="1" 
                checked={task.status_id === 1}
                onChange={() => setTask({
                  ...task,
                  status_id: 1
                })}
                className="form-radio h-4 w-4 text-blue-500  focus:ring-blue-300"/>
              <span>
                Pending
              </span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="radio" 
                name="status" 
                value="2" 
                checked={task.status_id === 2}
                onChange={() => setTask({
                  ...task,
                  status_id: 2
                })}
                className="form-radio h-4 w-4 text-blue-500  focus:ring-blue-300"/>
              <span>
                In Progress
              </span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="radio" 
                name="status" 
                value="3"
                checked={task.status_id === 3}
                onChange={() => setTask({
                  ...task,
                  status_id: 3
                })} 
                className="form-radio h-4 w-4 text-blue-500  focus:ring-blue-300"/>
              <span>
                Completed
              </span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="radio" 
                name="status" 
                value="4" 
                checked={task.status_id === 4}
                onChange={() => setTask({
                  ...task,
                  status_id: 4
                })}
                className="form-radio h-4 w-4 text-blue-500  focus:ring-blue-300"/>
              <span>
                On Hold
              </span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="radio" 
                name="status" 
                value="5" 
                checked={task.status_id === 5}
                onChange={() => setTask({
                  ...task,
                  status_id: 5
                })}
                className="form-radio h-4 w-4 text-blue-500  focus:ring-blue-300"/>
              <span>
                Canceled
              </span>
            </label>
          </div>
        </div>
        <div>
          <span className="block mt-2 mb-2 text-lg font-medium text-gray-700">
            Category:
          </span>
          <div className="flex item-center gap-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="radio" 
                name="category" 
                value="1" 
                checked={task.category_id === 1}
                onChange={() => setTask({
                  ...task,
                  category_id: 1
                })}
                className="form-radio h-4 w-4 text-blue-500  focus:ring-blue-300"
              />
              <span>
                Work
              </span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="radio" 
                name="category" 
                value="2" 
                checked={task.category_id === 2}
                onChange={() => setTask({
                  ...task,
                  category_id: 2
                })}
                className="form-radio h-4 w-4 text-blue-500  focus:ring-blue-300"
              />
              <span>
                Personal
              </span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="radio" 
                name="category" 
                value="3" 
                checked={task.category_id === 3}
                onChange={() => setTask({
                  ...task,
                  category_id: 3
                })}
                className="form-radio h-4 w-4 text-blue-500  focus:ring-blue-300"
              />
              <span>
                Shopping
              </span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="radio" 
                name="category" 
                value="4" 
                checked={task.category_id === 4}
                onChange={() => setTask({
                  ...task,
                  category_id: 4
                })}
                className="form-radio h-4 w-4 text-blue-500  focus:ring-blue-300"
              />
              <span>
                Health
              </span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="radio" 
                name="category" 
                value="5" 
                checked={task.category_id === 5}
                onChange={() => setTask({
                  ...task,
                  category_id: 5
                })}
                className="form-radio h-4 w-4 text-blue-500  focus:ring-blue-300"
              />
              <span>
                Finance
              </span>
            </label>
          </div>
        </div>
        <div className="mt-2">
          <label className="text-lg font-medium text-gray-700 mr-3">
            Due Date: 
          </label>
          <input 
            type="date" 
            value={task.due_date}
            onChange={(v) => {
              // console.log(v.target.value);
              setTask({
              ...task,
              due_date: v.target.value
              });
            }}
          />
        </div>
        <div className="w-full flex flex-nowrap flex-row items-center justify-center gap-10 mt-8">
          <button type="button" onClick={onCancel} className="bg-red-300 p-1 pl-4 pr-4 rounded-2xl hover:bg-red-400 font-bold hover:text-white">
            Cancel
          </button>
          <button type="submit" className="bg-violet-300 p-1 pl-4 pr-4 rounded-2xl hover:bg-violet-400 font-bold hover:text-white ">
            {initialData ? "Update" : "Create"}
          </button>
        </div>
        
      </form>
    </div>
  </>
  )
}

export default CreateNote;