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

function paginate(array, limit, page_num) {
    return array.slice((page_num - 1) * limit, page_num * limit);
}

router.get('/', async (req, res) => {
    let limit = +req.query._limit;
    let page = +req.query._page;

    if (isNaN(limit) || isNaN(page)) {
        limit = 100;
        page = 1;
    }
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
            let sortedArray = data.sort(function (a, b) { return b.total_number_of_comments - a.total_number_of_comments; });
            res.json(paginate(sortedArray, limit, page));
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