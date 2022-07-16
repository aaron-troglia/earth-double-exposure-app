const express = require('express');
const app = express();
const PORT = 8080;

const jimp = require('jimp');

app.use(express.json());

app.listen(
    PORT,
    () => console.log(`alive on http://localhost:${PORT}`)
);

app.get('/earth', (req, res) => {
    res.status(200).send({
        url: 'foo'
    });
});

app.post('/userimg/:id', (req, res) => {
    const {id} = req.params;
    const {img} = req.body;

    if (!img) {
        res.status(418).send({message: 'Please upload an image.'})
    }

    res.send({
        image: `id: ${id}, img: ${img}`
    });
});

// generateDoubleExposure('images/earth-test.png', 'images/user-test2.jpg');

function generateDoubleExposure(img1, img2) {
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

        data[0].write('composites/test.png', () => {
            console.log("Image ready!");
        });
    });
}
