const express = require('express');
const cors = require('cors');
const jimp = require('jimp');
const fs = require('fs');
const axios = require('axios');
const uniqid = require('uniqid');
const path = require('path');
const multer = require('multer');
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `${__dirname}/images`);
        },
        filename: function (req, file, cb) {
            cb(null, uniqid() + path.extname(file.originalname));
        },
    }),
    limits: {
        fileSize: 50000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            cb(new Error('Only png and jpg files are accepted.'))
        }

        cb(undefined, true)
    }
});
const app = express();
const PORT = 8080;
const BASE_URL = 'https://epic.gsfc.nasa.gov/api/natural/date';

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8080']
}));
app.use(express.json());
app.use('/images', express.static('images'));

app.listen(
    PORT,
    () => console.log(`alive on http://localhost:${PORT}`)
);

app.post('/upload', upload.single('userImage'), async (req, res) => {
    try {
        const userImagePath = req.file.path;
        const date = req.body.userDate;
        const earthImage = await getImageByDate(date, res);
        
        generateDoubleExposure(earthImage, userImagePath, (imgId) => {
            res.status(200).send({
                url: `http://localhost:8080/images/composites/${imgId}.png`
            });
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

const getImageByDate = async (date, res) => {
    const newDate = new Date(date);
    const month = ('0' + (newDate.getMonth() + 1)).slice(-2); //Months and days start at 0
    const day = ('0' + (newDate.getDate() + 1)).slice(-2);
    const year = newDate.getFullYear();

    try {
        const response = await axios.get(`${BASE_URL}/${date}`)
        const arr = response.data;
        const imageName = arr[0].image + '.png';
        const archive = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/`;
        const source = archive + imageName;

        const downloadedImage = await downloadImage(source, 'images/earth'); 

        return downloadedImage;
    } catch (error) {
        res.status(500).send(error);
    }
}

const downloadImage = async (url, dir) => {
    const file = path.basename(url);
    const localPath = path.resolve(__dirname, dir, file);

    let response;
    
    try {
        response = await axios({
            url,
            method: 'GET',
            responseType: 'stream'
        });

        return new Promise((resolve, reject) => {            
            const stream = response.data.pipe(fs.createWriteStream(localPath));
            stream.on('finish', () => {
                resolve(localPath);
            })
        }).then(path => {
            return path
        })
    } catch (error) {
        throw new Error(error);
    }
}

const generateDoubleExposure = (img1, img2, cb) => {
    const images = [img1, img2];

    let jimps = [];

    jimps.push(jimp.read(images[0]));
    jimps.push(jimp.read(images[1]));

    Promise.all(jimps).then(data => {
        return Promise.all(jimps);
    }).then(data => {

        data[0].contain(500, 500);
        data[1].cover(500, 500);

        data[1].brightness(0.1);
        data[1].contrast(0);
        data[1].color([
            {apply: 'greyscale', params: [50]}
        ]);

        data[1].mask(data[0]);
        data[0].blit(data[1], 0, 0);

        const imgId = uniqid();

        compositeURL = data[0].write(`images/composites/${imgId}.png`, () => {
            cb(imgId);
        });
    });
}
