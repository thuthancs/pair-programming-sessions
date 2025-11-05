/*
I'm not sure this actually requires a state variable or not. 
It seems more like I just need to define the interactivity to show and hide the content
*/
import { useState } from 'react';
import './App.css';

export default function App() {
    // Define the title and its associated content for the accordion
    const accordionContent = [
        {
            "title": "HTML",
            "id": 1,
            "content": "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.",
            "hidden": true
        },
        {
            "title": "CSS",
            "id": 2,
            "content": "Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.",
            "hidden": true
        },
        {
            "title": "JavaScript",
            "id": 3,
            "content": "JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.",
            "hidden": true
        }
    ]

    const [accordion, setAccordion] = useState(accordionContent)

    const handleClick = (id) => {
        const updatedAccordion = accordion.map(item => {
            if (item.id === id) {
                return {...item, hidden: !item.hidden}
            } else {
                return item
            }
       })
        setAccordion(updatedAccordion)
    }

    // Layout the content in a vertical stack
    return (
        <>
            {accordion.map(item => {
                return (
                    <div 
                        key={item.id}
                        style={{
                            borderBottom: '1px solid white',
                            padding: '20px 0'
                        }}
                    >
                        <div 
                            style = {{
                                        display: "flex", 
                                        justifyContent: "space-between", 
                                        cursor: "pointer"
                                    }}
                            onClick={() => handleClick(item.id)}
                        >
                            <h2>{item.title}</h2>
                            <button
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '24px',
                                    cursor: 'pointer',
                                    padding: '0',
                                    width: '30px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                {item.hidden ? '▼' : '▲'}
                            </button>
                        </div>
                        <p style = {{ 
                            display: item.hidden ? "block" : "none",
                            fontSize: '16px',
                            lineHeight: '1.6',
                            color: 'white'
                        }}>
                            {item.content}
                        </p>
                    </div>
                )
            })} 
        </>
    )
}