import { useState } from 'react'
import Header from './component/Header'
import FeedbackList from './component/FeedbackList'
import FeedbackStats from './component/FeedbackStats'
import FeedbackData from './data/FeedbackData'
import Card from './component/shared/Card'

function App() {
  const [feedback, setFeedback] = useState(FeedbackData)
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete this feedback')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  return (
    <>
      <Header />
      <div className="container">
        <FeedbackStats feedback={feedback} />
        <FeedbackList feedback={feedback} handleDelete={deleteFeedback} />
      </div>
    </>
  )
}
export default App
