import { useState } from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
function FeedbackForm() {
  const [text, setText] = useState('')
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState('')

  const handleTextChange = ({ target: { value } }) => {
    // 👈  get the value
    if (value === '') {
      setBtnDisabled(true)
      setMessage(null)
    } else if (value.trim().length < 10) {
      // 👈 check for less than 10
      setMessage('Text must be at least 10 characters')
      setBtnDisabled(true)
    } else {
      setMessage(null)
      setBtnDisabled(false)
    }
    setText(value)
  }

  return (
    <Card>
      <form>
        <h2>How would you rate your service with us</h2>
        {/*@todo - rating select component*/}
        <div className="input-group">
          <input
            onChange={handleTextChange}
            type="text"
            placeholder="Write a review"
            value={text}
          />
          <Button type="submit" isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm
