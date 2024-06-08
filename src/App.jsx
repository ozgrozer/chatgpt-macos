import { OPENAI_API_KEY } from '@env'
import React, { useRef, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  SafeAreaView
} from 'react-native'

const openaiChatCompletion = async () => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo-0125',
      messages: [
        {
          role: 'user',
          content: 'what is the capital of the usa'
        }
      ]
    })
  })
  const data = await response.json()
  return data.choices[0].message.content
}

export default () => {
  const inputRef = useRef(null)
  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleSend = async () => {
    if (inputText.trim()) {
      setMessages([...messages, { sender: 'user', text: inputText }])
      setInputText('')

      setTimeout(() => {
        inputRef.current.focus()
      }, 1)

      const chatCompletion = await openaiChatCompletion()
      console.log(chatCompletion)

      // setMessages(prevMessages => [
      //   ...prevMessages,
      //   { sender: 'assistant', text: 'This is a response from ChatGPT.' }
      // ])
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.messageContainer}
        contentContainerStyle={styles.messageContentContainer}
      >
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.message,
              message.sender === 'user' ? styles.userMessage : styles.assistantMessage
            ]}
          >
            <Text
              selectable
              enableFocusRing={false}
              style={styles.messageText}
            >
              {message.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          value={inputText}
          returnKeyType='send'
          enableFocusRing={false}
          onChangeText={setInputText}
          onSubmitEditing={handleSend}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          placeholder='Type your message...'
          style={[
            styles.input,
            isFocused && styles.inputFocused
          ]}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252327'
  },
  messageContainer: {
    flex: 1
  },
  messageContentContainer: {
    gap: 10,
    padding: 20
  },
  message: {
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
    padding: 10,
    color: '#fff'
  },
  inputContainer: {
    padding: 20
  },
  input: {
    padding: 10,
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#565557'
  },
  inputFocused: {
    borderColor: '#999'
  }
})
