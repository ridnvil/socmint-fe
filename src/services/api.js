import axios from 'axios'

export default ({
    methods: {
        async getDatabyHastag (hastag) {
            var data = []
            await axios.post('http://localhost:8080/medsos/set', {
            type: 'twitter',
          }, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .catch(err => console.log(err))
          .then(res => {
            var response = res.data.data
            response.forEach(tweet => {
                if (tweet.hashtag === hastag) {
                    data.push(tweet)
                }
            })
          })
          return data
        },
        async getallData () {
          return await axios.post('http://localhost:8080/medsos/set', {
            type: 'twitter',
          }, {
            headers: {
              'Content-Type': 'application/json',
            },
          }).then(res => res.data.data)
        },
    },
})
