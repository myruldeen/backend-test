const express = require('express');
const axios = require('axios');
const router = express.Router();

async function getAllPost(cb) {
    try {
        let v = await axios.get('https://jsonplaceholder.typicode.com/posts');
        cb(v.data)
    } catch (error) {
        cb(error.message)
    }
}

router.get('/', (req, res) => {
    getAllPost((data, err) => {
        if (err) throw err;
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
        Promise.all(promises).then((data) => {
            let sortedArray = data.sort( function ( a, b ) { return b.total_number_of_comments - a.total_number_of_comments; } );
            res.json(sortedArray)
        }).catch((err) => console.log(err.message));
    })
})

router.get('/:id', (req, res) => {
    getAllPost((data, err) => {
        if (err) throw err;
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
        Promise.all(promises).then((data) => {
            const d = data.filter((r) => r.post_id === +req.params.id);
            res.json(d)
        }).catch((err) => console.log(err.message));
    })
})


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

module.exports = router;