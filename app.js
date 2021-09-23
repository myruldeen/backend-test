const axios = require('axios');
const _ = require('lodash');


let postId = 1;

// get all comments by post id

function getTotalComment(id) {

    const promise = new Promise((resolve, reject) => {
        axios.get('https://jsonplaceholder.typicode.com/posts/' + id + '/comments').then((result) => {
            resolve(result.data);
        }).catch((err) => {
            reject(err);
        })
    });

    return promise;

}


getTotalComment(postId)
    .then((result) => {

        return axios.get('https://jsonplaceholder.typicode.com/posts/' + postId)
            .then((x) => {
                return {
                    post_id: x.data.id,
                    post_title: x.data.title,
                    post_body: x.data.body,
                    total_number_of_comments: result.length
                }
            })

    })
    .then((x) => {
        console.log(x);
    })
    .catch((err) => {
        console.log(err);
    })


// axios.all([axios.get(endpoint.posts),
// axios.get(endpoint.comments)])
//     .then(axios.spread((posts, comments) => {

//         var merged = _.map(posts.data, function (item) {
//             return _.assign(item, _.find(comments.data, ['postId', item.id]));
//         });

//         console.log(merged)

//     }))
//     .catch(error => console.log(error));



