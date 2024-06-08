import React, { useState } from 'react'
import {
  View,
  Text,
  Keyboard,
  TextInput,
  StyleSheet,
  ScrollView,
  SafeAreaView
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
        setMessages(prevMessages => [
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
          <View
            key={index}
            style={[
              styles.message,
              message.sender === 'user' ? styles.userMessage : styles.assistantMessage
            ]}
          >
            <Text style={styles.messageText}>
              {message.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          value={inputText}
          returnKeyType='send'
          style={styles.input}
          onChangeText={setInputText}
          onSubmitEditing={handleSend}
          placeholder='Type your message...'
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
    maxWidth: '80%',
    borderRadius: 10,
    marginVertical: 0
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#414043'
  },
  assistantMessage: {
    alignSelf: 'flex-start'
  },
  messageText: {
    color: '#fff'
  },
  inputContainer: {
  },
  input: {
    padding: 10,
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#565557'
  }
})
