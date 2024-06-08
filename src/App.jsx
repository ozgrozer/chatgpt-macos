import React, { useRef, useState } from 'react'
import { OPENAI_MODEL, OPENAI_API_KEY } from '@env'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  SafeAreaView
} from 'react-native'

const openaiChatCompletion = async ({ messages }) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        messages,
        model: OPENAI_MODEL
      })
    })
    const data = await response.json()
    return data.choices[0].message.content
  } catch (err) {
    console.log(err)
  }
}

const handleSend = async ({ messages, inputRef, inputText, setMessages, setInputText }) => {
  if (inputText.trim()) {
    const _messages = [...messages, { role: 'user', content: inputText }]
    setMessages(_messages)
    setInputText('')

    setTimeout(() => {
      inputRef.current.focus()
    }, 1)

    const chatCompletion = await openaiChatCompletion({ messages: _messages })

    setMessages(prevMessages => [
      ...prevMessages,
      { role: 'assistant', content: chatCompletion }
    ])
  }
}

export default () => {
  const inputRef = useRef(null)
  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const _handleSend = () => {
    handleSend({ messages, inputRef, inputText, setMessages, setInputText })
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
              message.role === 'user'
                ? styles.userMessage
                : styles.assistantMessage
            ]}
          >
            <Text
              selectable
              enableFocusRing={false}
              style={styles.messageText}
            >
              {message.content}
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
          onSubmitEditing={_handleSend}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          placeholder='Type your message...'
          style={[styles.input, isFocused && styles.inputFocused]}
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
    gap: 20,
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
    borderRadius: 10,
    borderColor: '#565557'
  },
  inputFocused: {
    borderColor: '#999'
  }
})
