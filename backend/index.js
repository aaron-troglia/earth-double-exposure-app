const express = require('express');
const fs = require('fs');
const axios = require('axios');
const path = require('path');
const multer = require('multer');
const upload = multer({
    dest: 'images/user/'
});
const app = express();
const PORT = 8080;
const BASE_URL = 'https://epic.gsfc.nasa.gov/api/natural/date';


app.use(express.json());
app.use('/images', express.static('images'));

app.listen(
    PORT,
    () => console.log(`alive on http://localhost:${PORT}`)
);

app.get('/earth/:date', async (req, res) => {
    const {date} = req.params; 
    const newDate = new Date(date);
    const month = ('0' + (newDate.getMonth() + 1)).slice(-2); //Months and days start at 0
    const day = ('0' + (newDate.getDate() + 1)).slice(-2);
    const year = newDate.getFullYear();

    try {
        const response = await axios.get(`${BASE_URL}/${date}`)
        const arr = response.data;
        const name = arr[0].image + '.png';
        const archive = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/`;
        const source = archive + name;

        downloadImage(source, 'images/earth', res);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/upload', upload.single('upload'), (req, res) => {
    console.log(req.file);
    
    res.send();
    // if(req.file) {
    //     res.json(req.file);
    // } else {
    //     throw new Error('Something went wrong');
    // }
}, (error, req, res, next) => {
    res.status(400).send({error: error.message});
})

const downloadImage = async (url, dir, res) => {
    const file = path.basename(url);
    const localPath = path.resolve(__dirname, dir, file);
    
    try {
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream'
        });
        
        const w = await response.data.pipe(fs.createWriteStream(localPath));
        
        w.on('finish', () => {
            res.status(200).send({
                url: dir + '/' + file
            });
        })

    } catch (error) {
        throw new Error(error);
    }
}

/* generateDoubleExposure(earthURL, userImgSrc); */
const generateDoubleExposure = (img1, img2) => {
    const images = [img1, img2];

    let jimps = [];

    for (var i = 0; i < images.length; i++) {
        jimps.push(jimp.read(images[i]));
    }

    Promise.all(jimps).then(data => {
        return Promise.all(jimps);
    }).then(data => {
        data[0].contain(500, 500);
        data[1].cover(500, 500);

        data[1].brightness(0.3);
        data[1].contrast(0.6);
        data[1].color([
            {apply: 'greyscale', params: [50]}
        ]);

        data[1].mask(data[0]);
        data[0].blit(data[1], 0, 0);

        compositeURL = data[0].write('composites/test.png', () => {
            console.log("Image ready!");
        });
    });
}
