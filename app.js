const axios = require('axios');

// get all comments by post id

function getAllPost(cb) {
    axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => {
        return cb(res.data)
    });
}


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

getAllPost((data) => {
  
    let promises = data.map((val) => {
        return getTotalComment(val.id).then((result) => {
            return {
                post_id: val.id,
                post_title: val.title,
                post_body: val.body,
                total_number_of_comments: result.length
            }
        }).catch((err) => console.log(err.message));
    })
    Promise.all(promises).then((res) => {
        console.log(res);
    }).catch((err) => console.log(err.message));
})



// getTotalComment(postId)
//     .then((result) => {

//         return axios.get('https://jsonplaceholder.typicode.com/posts/' + postId)
//             .then((x) => {
//                 return {
//                     post_id: x.data.id,
//                     post_title: x.data.title,
//                     post_body: x.data.body,
//                     total_number_of_comments: result.length
//                 }
//             })

//     })
//     .then((x) => {
//         console.log(x);
//     })
//     .catch((err) => {
//         console.log(err);
//     })




