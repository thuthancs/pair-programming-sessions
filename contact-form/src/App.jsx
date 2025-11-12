import { useState } from 'react';

export default function App() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleMessageChange = (e) => {
    setMessage(e.target.value)
  }

  const url = "https://questions.greatfrontend.com/api/questions/contact-form"

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim()
        })
      });
      
      if (!response.ok) throw new Error('Submission failed');
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        console.log(data);
      } else {
        const text = await response.text();
        console.log(text);
      }
      
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={handleNameChange}/>Name:
        <input value={email} onChange={handleEmailChange}/>Email:
        <textarea placeholder="Your message..." onChange={handleMessageChange}></textarea>
        <button type="submit">Send</button>
      </form>
    </>
  )
}