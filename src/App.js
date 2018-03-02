import React, { Component } from 'react'
import ChatBot from 'react-simple-chatbot'
import logo from './logo.svg'
import './App.css'

const steps = [
  {
    id: 'hello-world',
    message: 'Hello Graham! Do you want me to book your installation?',
    trigger: '2'
  },
  {
    id: '2',
    options: [
      { value: 1, label: 'Yes', trigger: '4' },
      { value: 2, label: 'No', trigger: '3' },
      { value: 3, label: 'Tell me more', trigger: '5' }
    ]
  },
  {
    id: '3',
    message: 'Ah shucks!',
    end: true
  },
  {
    id: '4',
    message: "Brilliant! Let's get going, first a couple of security questions. Please enter the registration number of the vehicle you want the box installed.",
    trigger: 'vrn'
  },
  {
    id: '5',
    message: "Im RSBot, I'll make sure you get an installation booking to suite your needs. Shall we begin?",
    trigger: '6'
  },
  {
    id: '6',
    options: [
      { value: 1, label: 'Yes', trigger: '4' },
      { value: 2, label: 'No', trigger: '3' }
    ]
  },
  {
    id: 'vrn',
    user: true,
    validator: value => {
      if (value.replace(' ', '').toUpperCase() === 'HY06EYH') {
        return true
      }
      return `sorry Graham, I can't find ${value} have another go.`
    },
    trigger: 'postcode'
  },
  {
    id: 'postcode',
    message: "Fantastic, we're nearly done. Last security question. What's your postcode?",
    trigger: 'postin'
  },
  {
    id: 'postin',
    user: true,
    validator: value => {
      if (value.replace(' ', '').toUpperCase() === 'CV116FF') {
        return true
      }
      return `sorry Graham, I can't find ${value} have another go.`
    },
    trigger: 'wecandoit'
  },
  {
    id: 'wecandoit',
    message: 'We can install in your area next Wednesday, is that ok?',
    trigger: 'when'
  },
  {
    id: 'when',
    // message: 'We can install in your area next Wednesday, is that OK?',
    options: [
      { value: 1, label: 'Yes', trigger: 'confirm' },
      { value: 2, label: 'No', trigger: '3' }
    ]
  },
  {
    id: 'confirm',
    message: "Ok you're all booked in. We'll send you a text to remind you.",
    end: true
  }
]

const jobs = [
  {
    firstName: 'Graham',
    lastName: 'Barker',
    vrn: 'HY06EYH',
    vehicle: 'Range Rover Sport HSE',
    postcode: 'CV116FF',
    voucher: 'VOU001',
    mobile: '+447590532804'
  }
]

class App extends Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>RS Connect Agent</h1>
        </header>
        <div style={{ margin: 20 }}>
          <ChatBot
            floating
            headerTitle={'RS Connect Booking Agent'}
            steps={steps}
          />
        </div>
      </div>
    )
  }
}

export default App
