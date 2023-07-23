import { Container, Form, Button, Card } from "react-bootstrap";

import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

const CHAT_HISTORY_KEY = "chat_history";

const App = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputText, setInputText] = useState<string>("");

  useEffect(() => {
    // Load chat history from LocalStorage on component mount
    const storedHistory = localStorage.getItem(CHAT_HISTORY_KEY);
    if (storedHistory) {
      setMessages(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    // Save chat history to LocalStorage whenever messages state updates
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() !== "") {
      // Append new message to messages and save it to LocalStorage
      const updatedMessages = [...messages, inputText];
      setMessages(updatedMessages);
      setInputText("");
    }
  };

  return (
    <Container className="App mt-5">
      <div
        className="mb-24 text-center
      "
      >
        <h1>A2A</h1>
        <p>
          Seamless audio-to-audio streaming like you've never experienced before
        </p>
      </div>
      <div className="flex space-x-4 ">
        <div className="flex-1">
          <Card className="mb-3">
            <Card.Header className="text-center">Chat Messages</Card.Header>
            <Card.Body>
              {messages.map((message, index) => (
                <Card.Text key={index}>{message}</Card.Text>
              ))}
            </Card.Body>
          </Card>
          <Form onSubmit={handleSendMessage}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Type your message..."
                value={inputText}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Send
            </Button>
          </Form>
        </div>
        <div className="flex-1">
          <Card className="mb-3">
            <Card.Header className="text-center">Chat Messages</Card.Header>
            <Card.Body>
              {messages.map((message, index) => (
                <Card.Text key={index}>{message}</Card.Text>
              ))}
            </Card.Body>
          </Card>
          <Form onSubmit={handleSendMessage}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Type your message..."
                value={inputText}
                onChange={handleInputChange}
              />
            </Form.Group>
            {/* <Button variant="primary" type="submit">
              Send
            </Button> */}
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default App;
