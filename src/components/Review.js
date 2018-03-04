import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { setDay } from '../helpers'

export default class Review extends Component {
  constructor (props) {
    super(props)
    this.state = { job: {}, date: '' }
  }

  componentWillMount () {
    const { job } = this.props
    let date = setDay(3)
    this.setState({ job, date })
  }

  render () {
    console.log('props', this.props)
    const { firstName, postcode } = this.state.job
    return (
      <div style={{ width: '100%' }}>
        <h3>Summary</h3>
        <table
          style={{
            textAlign: 'left',
            backgroundColor: '#6844a2',
            borderRadius: 6,
            fontSize: 11
          }}
        >
          <tbody>
            <tr>
              <td>Name</td>
              <td>{firstName || 'NAME'}</td>
            </tr>
            <tr>
              <td>Postcode </td>
              <td>{postcode || 'POSTCODE'}</td>
            </tr>
            <tr>
              <td>Date</td>
              <td>{this.state.date || 'SOON'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

Review.propTypes = {
  steps: PropTypes.object
}

Review.defaultProps = {
  steps: undefined
}
