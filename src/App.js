import { useState } from 'react'
import Header from './component/Header'
import FeedbackList from './component/FeedbackList'
import FeedbackData from './data/FeedbackData'
import Card from './component/shared/Card'

function App() {
  const [feedback, setFeedback] = useState(FeedbackData)
  return (
    <>
      <Header />
      <div className="container">
        <FeedbackList feedback={feedback} />
      </div>
    </>
  )
}
export default App
