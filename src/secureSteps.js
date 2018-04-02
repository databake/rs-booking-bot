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
  