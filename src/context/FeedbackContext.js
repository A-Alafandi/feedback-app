import { createContext, useState, useEffect } from 'react'
const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([])

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  useEffect(() => {
    fetchFeedback()
  }, [])

  // FetchFeedback
  const fetchFeedback = async () => {
    const response = await fetch(`/feedback?_sort=id&order=desc`)
    const data = await response.json()

    setFeedback(data)
    setIsLoading(false)
  }

  //Set item te be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  // Add new Feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch(`feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    })
    const data = await response.json()
    setFeedback([data, ...feedback])
  }

  //Delete Feedback
  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete this feedback')) {
      await fetch(`/feedback/${id}`, { method: 'DELETE' })
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  //Update feedback item
  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updItem),
    })
    const data = await response.json()
    setFeedback(
      feedback.map((item) =>
        item.id === id
          ? {
              ...item,
              ...data,
            }
          : item
      )
    )
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
