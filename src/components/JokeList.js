import React, { Component } from 'react'
import Axios from 'axios'
import './JokeList.css'
import Joke from './Joke'

class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10
  }

  constructor(props) {
    super(props)
    this.state = { jokes: [] }
  }

  async componentDidMount() {
    let jokes = []
    while (jokes.length < this.props.numJokesToGet) {
      let res = await Axios.get('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json' }
      })
      console.log(res.data.id)
      jokes.push({ id: res.data.id, text: res.data.joke, votes: 0 })
    }
    this.setState({ jokes: jokes })
  }

  handleVote(id, change) {
    this.setState(st => ({
      jokes: st.jokes.map(j =>
        j.id === id ? { ...j, votes: j.votes + change } : j
      )
    }))
  }

  render() {
    return (
      <div className='JokeList'>
        <div className='JokeList-sidebar'>
          <h1 className='JokeList-title'>Dad Jokes</h1>
          <img
            alt=''
            src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg'
          />
          <button className='JokeList-getmore'>New Jokes</button>
        </div>
        <div className='JokeList-jokes'>
          {this.state.jokes.map(j => (
            <div>
              <Joke
                key={j.id}
                votes={j.votes}
                text={j.text}
                upvote={() => this.handleVote(j.id, 1)}
                downvote={() => this.handleVote(j.id, -1)}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default JokeList
