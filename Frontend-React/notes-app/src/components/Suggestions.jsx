import { useState, useEffect } from "react"
import axios from "axios"

function Suggestions({onSelect, title, description}) {
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)

  const getSuggestions = async () => {
    setLoading(true)
    try {
      const authHeader = () => {
        const token = localStorage.getItem('token');
        return { headers: { Authorization: `Bearer ${token}` }};
      }
      const requestData = {
        title: title,
        description: description
      }
      const response = await axios.post('http://127.0.0.1:8000/api/notes/suggestion', requestData, authHeader())
        setSuggestions(response.data.details || [])
    } 
    catch (error) {
      console.error('Error:', error)
      alert('Failed to Connect. Please try again.')
    } 
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (title && description) {
      getSuggestions()
    }
  }, [title, description])

  if(loading) {
    return (
      <div className="flex justify-center items-center ">
        <div className="text-black-300/40">Loading...</div>
      </div>
    )
  }


  return (
    <div className="max-h-[80vh] md:max-h-none overflow-y-auto md:overflow-visible p-6">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl flex items-center pl-5 mt-2 mb-4">
        ✨ Need an Idea?
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center items-stretch">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="bg-blue-100 p-8 rounded-xl flex flex-col justify-between w-full max-w-100 min-h-80">
            <h2 className="font-bold text-2xl mb-3">
              {suggestion.title}
            </h2>
            <div className="flex-1">
              {suggestion.descriptions.map((des, desIndex) => (
                <p key={desIndex} className="mb-1 text-sm">
                  {des}
                </p>
              ))}
            </div>
            <button 
              onClick={() => onSelect(suggestion)}
              className="bg-blue-500 hover:bg-blue-800 text-white font-bold p-1 pl-2 pr-2 rounded-lg mt-5"
            >
              Use This
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default Suggestions;
