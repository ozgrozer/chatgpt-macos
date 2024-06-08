import React, { useRef, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  SafeAreaView
} from 'react-native'

export default () => {
  const inputRef = useRef(null)
  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages([...messages, { sender: 'user', text: inputText }])
      setInputText('')
      inputRef.current.focus()

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
      <ScrollView
        style={styles.messageContainer}
        contentContainerStyle={{ padding: 20 }}
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
