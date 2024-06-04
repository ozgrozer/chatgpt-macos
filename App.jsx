import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Keyboard
} from 'react-native'

export default () => {
  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState('')

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages([...messages, { sender: 'user', text: inputText }])
      setInputText('')
      Keyboard.dismiss()

      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'assistant', text: 'This is a response from ChatGPT.' }
        ])
      }, 1000)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.messageContainer}>
        {messages.map((message, index) => (
          <View key={index} style={styles.message}>
            <Text
              style={
                message.sender === 'user'
                  ? styles.userMessage
                  : styles.assistantMessage
              }
            >
              {message.text}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder='Type your message...'
          onSubmitEditing={handleSend}
          returnKeyType='send'
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#252327'
  },
  messageContainer: {
    flex: 1
  },
  message: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#555'
  },
  userMessage: {
    color: '#fff',
    textAlign: 'right'
  },
  assistantMessage: {
    color: '#fff',
    textAlign: 'left'
  },
  inputContainer: {},
  input: {
    padding: 10,
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#565557'
  }
})
