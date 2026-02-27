import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import CreateNote from "./CreateNote";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [editNote, setEditNote] = useState(null);

  const authHeader = () => {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}`}};
  }

  const priority = (id) => {
    const priorities = { 1: 'Low', 2: 'Medium', 3: 'High', 4: 'Urgent', 5: 'Immediate' };
    return priorities[id] || 'Unknown';
  };

  const status = (id) => {
    const statuses = { 1: 'Pending', 2: 'In Progress', 3: 'Completed', 4: 'On Hold', 5: 'Canceled' };
    return statuses[id] || 'Unknown';
  };

  const category = (id) => {
    const categories = { 1: 'Work', 2: 'Personal', 3: 'Shopping', 4: 'Health', 5: 'Finance' };
    return categories[id] || 'Unknown';
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  }

  const requestNotes = () => {
    axios.get('http://127.0.0.1:8000/api/todo', authHeader())
      .then((res) => {
        setNotes(res.data)  // Already in array format
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
  };

  useEffect(() => {
    requestNotes();
  }, []);

  const deleteNote = (id) => {
    if(!window.confirm("Are you sure you want to delete?")) return;

    axios.delete(`http://127.0.0.1:8000/api/todo/${id}`, authHeader())   // Backend Removes
     .then(() => {
      setNotes(notes.filter(note => note.id !== id));  // Check id with backend ID
     })
     .catch((err) => {
      console.error("Error: ", err);
     });
  };

  const updateNote = (note) => {
    setEditNote(note);
    setShowCreate(true);
  };

  const openFreshCard = () => {
    setEditNote(null);
    setShowCreate(true);
  }

  const find = () => {
    const text = notes.find(note => note.title.toLowerCase() === searchText.toLowerCase());
    if(!text) {
      alert("Not found!");
      return;
    }
    axios.get(`http://127.0.0.1:8000/api/todo/${text.id}`, authHeader())
      .then((res) => {
        setNotes([res.data]);   // The single response is object, so turned into array
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  };

  return (
    <div className="bg-white flex flex-col p-20 m-10 m-auto">
      <div className="app-header w-auto w-full text-center">
        <div className="headline w-auto font-bold p-8 bg-linear-to-r from-blue-500 to-red-300 rounded-xl mb-10">
          <h1 className="text-5xl mb-2">
            Notes App
          </h1>
          <p className="text-white">
            Simple notes taking app
          </p>
        </div>
        
        <div className="search">
          <input type="text" value={searchText} onChange={(v) => setSearchText(v.target.value) } placeholder="Find a notes" className="border-2 border-gray-700/30 rounded-xl p-1 pl-3 w-50 md:w-100" />
          <button onClick={() => find()} className="ml-5 bg-black/80 text-white p-1 rounded-2xl pl-3 pr-3 font-bold hover:bg-blue-500 transition duration-600 ease-in-out" >
            search
          </button>
        </div>
      </div>

      <div className="notes flex flex-wrap m-6 justify-center content-stretch" >
        {notes.map((note) => (
          <div key={note.id} className="card flex flex-col items-center p-6 gap-6 min-w-100 w-full min-h-60 rounded-2xl m-5 shadow-lg/25 inset-shadow-sm inset-shadow-indigo-500/30">
            <div className="header flex justify-between items-center w-full mb-4">
              <div className="left flex gap-3">
                <h2 className="text-2xl font-bold max-w-[150px] sm:max-w-none">
                  {note.title}
                </h2>
                <span className="bg-violet-400 px-2 py-0.5 rounded-xl font-bold text-white shrink-0 h-8 mr-8">
                  <small>{priority(note.priority_id)}</small>
                </span>
              </div>
              
              <div className="right flex">
                <span className="rounded-md bg-gray-200 p-2 whitespace-nowrap">
                  Due: {note.due_date}
                </span>
              </div>
            </div>
            

            <div className="body flex-grow">
              <p className="description ">
                {note.description}
              </p>
            </div>
            
            <div className="footer flex justify-between items-center w-full mt-auto pt-4">
              <div className="left flex ">
                <span className="bg-purple-300 pl-3 pr-3 pt-1 pb-1 m-2 rounded-xl">
                  {status(note.status_id)}
                </span>
                <span className="bg-orange-300 pl-3 pr-3 pt-1 pb-1 m-2 rounded-xl">
                  {category(note.category_id)}
                </span>
              </div>
              <div className="right flex ">
                <button onClick={() => updateNote(note)} className="text-white rounded-xl bg-gray-600/70 border-2 border-gray-600/70 hover:bg-gray-600/100 hover:border-2 hover:border-gray-600 p-1 mr-4" >
                  <CiEdit />
                </button>
                <button onClick={() => deleteNote(note.id)} className="text-white rounded-xl bg-red-500/70 hover:bg-red-500/90 p-1 mr-2 pl-3 pr-3" >
                  < MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <button onClick={() => openFreshCard(true)} className="fixed bg-blue-400 size-8 h-15 w-15 bottom-10 right-10 rounded-full text-white text-5xl font-bold hover:bg-sky z-30 hover:bg-blue-600">
          +
        </button>
        {showCreate && (<CreateNote 
                          onCancel={() => setShowCreate(false)}
                          onSuccess={requestNotes} 
                          initialData={editNote}
                        />
          )}
      </div>
      <div className="flex justify-end mb-4">
        <button 
          onClick={logout}
          className="bg-red-500/80 text-white px-4 py-2 rounded-xl font-bold hover:bg-red-600 transition duration-300"
        >
          Log Out
        </button>
      </div>
    </div>
  )
}

export default Notes;
