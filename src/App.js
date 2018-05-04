import React, { Component } from 'react'
import ChatBot from 'react-simple-chatbot'
import { parse } from 'query-string'
import { sendSMS } from './helpers'
import Review from './components/Review'
import logo from './logo.svg'
import './App.css'

const composeBookedSteps = job => {
  return [
    {
      id: 'hello-world',
      message: `Hello ${job.firstName || 'Policy Holder'}! I just sent a sms to your mobile with a code. When you're ready enter the code below`,
      trigger: 'do-code'
    },
    {
      id: 'do-code',
      user: true,
      validator: value => {
        if (value === job.code) {
          return true
        }
        return 'Incorrect code. Try again!'
      },
      trigger: 'greeting'
    },
    {
      id: 'greeting',
      message: `${job.firstName || 'Policy Holder'} I see you have a job booked in for tomorrow. There are several things you can do now. Select the one you want!`,
      trigger: 'next'
    },
    {
      id: 'next',
      options: [
        { value: 1, label: 'Get a reminder', trigger: 'reminder' },
        { value: 2, label: 'Re-schedule', trigger: 'schedule' },
        { value: 3, label: 'Speak to operator', trigger: 'operator' },
        { value: 4, label: 'FAQ', trigger: 'operator' }
      ]
    },
    {
      id: 'reminder',
      message: 'Please select the type of reminder you want',
      trigger: 'reminderType'
    },
    {
      id: 'reminderType',
      options: [
        { value: 1, label: 'SMS', trigger: 'smsReminder' },
        { value: 2, label: 'Email', trigger: 'emailReminder' }
      ]
    },
    {
      id: 'smsReminder',
      message: `Ok ${job.firstName}, I just sent a SMS reminder to ${job.mobile}`,
      end: true
    },
    {
      id: 'emailReminder',
      message: `Ok ${job.firstName}, I just sent you an email reminder to ${job.email}`,
      end: true
    },

    {
      id: 'schedule',
      message: 'Ok, I see that this is the third time. Are you taking the micky?',
      trigger: 'yesno'
    },
    {
      id: 'yesno',
      options: [
        { value: 1, label: 'Yes', trigger: 'operator' },
        { value: 2, label: 'No', trigger: 'operator' }
      ]
    },
    {
      id: 'operator',
      message: `Ok, one of our team will contact you on ${job.mobile}`,
      end: true
    }
  ]
}

const composeSecureSteps = job => {
  // send an SMS message
  /*
  sendSMS(
    job.mobile,
    'RSConnect',
    `${job.code} is your RS Connect verification code`
  )
  */
  return [
    {
      id: 'hello-world',
      message: `Hello ${job.firstName || 'Policy Holder'}! I just sent a sms to your mobile with a code. When you're ready enter the code below`,
      trigger: 'do-code'
    },
    {
      id: 'do-code',
      user: true,
      validator: value => {
        if (value === job.code) {
          return true
        }
        return 'Incorrect code. Try again!'
      },
      trigger: 'bookDate'
    },
    {
      id: 'bookDate',
      message: 'We can install in your area next Wednesday, is that ok?',
      trigger: 'when'
    },
    {
      id: 'when',
      options: [
        { value: 1, label: 'Yes', trigger: 'confirm' },
        { value: 2, label: 'No', trigger: 'ah-shucks' },
        { value: 3, label: 'Choose another', trigger: 'review' }
      ]
    },
    {
      id: 'review',
      component: <Review job={job} />,
      asMessage: true,
      trigger: 'confirm'
    },
    {
      id: 'confirm',
      message: "Ok you're all booked in. I'll send you a text to remind you.",
      end: true
    },
    {
      id: 'ah-shucks',
      message: `Ah shucks! Maybe some other time. ${job.firstName}, did you try cleaning the lens?`,
      end: true
    }
  ]
}

const composeSteps = job => {
  return [
    {
      id: 'hello-world',
      message: `Hello ${job.firstName || 'Graham'}! Do you want me to book your installation?`,
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
      message: 'Ah shucks! Maybe some other time. Did you try cleaning the lens?',
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
        if (value.replace(' ', '').toUpperCase() === job.vrn) {
          return true
        }
        return `sorry ${job.firstName}, I can't find ${value} have another go.`
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
        if (value.replace(' ', '').toUpperCase() === job.postcode) {
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
}

const defaultJob = {
  firstName: 'Missing',
  lastName: 'Missing',
  vrn: 'missing',
  vehicle: 'Range Rover Sport HSE',
  postcode: 'missing',
  voucher: 'VOU001',
  mobile: '+447590532804',
  code: '840048',
  email: 'bad.email @me.com'
}

const jobs = [
  {
    firstName: 'Graham',
    lastName: 'Barker',
    vrn: 'HY06EYH',
    vehicle: 'Range Rover Sport HSE',
    postcode: 'CV116FF',
    voucher: 'VOU001',
    mobile: '+447590532804',
    code: '840048',
    email: 'graham.barker @me.com'
  },
  {
    firstName: 'Connor',
    lastName: 'Checkley',
    vrn: 'SHO80U0',
    vehicle: 'Range Rover Sport HSE',
    postcode: 'CV109HQ',
    voucher: 'VOU002',
    mobile: '+447590532804',
    code: '840048',
    email: 'connor.checkley @rsconnect.com'
  }
]

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { steps: [], loading: true }
  }

  componentDidMount () {
    const parsed = parse(window.location.search)
    if (parsed) {
      const job = this.fetchJob(parsed.v)
      const steps = composeBookedSteps(job)
      this.setState({
        steps,
        loading: false
      })
    }
  }

  fetchJob = voucher => {
    const filteredJob = jobs.filter(job => {
      return job.voucher === voucher
    })
    return filteredJob[0] || defaultJob
  }

  render () {
    if (this.state.loading) {
      return <div style={{ flex: 1, backgroundColor: 'red' }} />
    }
    const { steps } = this.state
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>RS Connect Booking Agent</h1>
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
