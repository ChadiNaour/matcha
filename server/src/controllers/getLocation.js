const user = require('../models/user');
const axios = require('axios');

getLocation = async (req, res) => {
    const id = req.body.id;
    user.getUser('GetUserById', id)
    .then(respo => {
        if(respo.latitude === null) {
            axios.get('http://ipinfo.io/json')
            .then(resp => {
                const arr = resp.data.loc.split(",");
                const localisation = {lat: parseFloat(arr[0]), lng: parseFloat(arr[1])}
                res.send({marker: false, localisation})
            })
        }
        else{
            const localisation = {lat: respo.latitude, lng: respo.longitude}
            res.send({marker: true, localisation})
        }
    }).catch(err => res.send(err));
};
module.exports = getLocation;