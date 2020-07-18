const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.json({
        message: 'Success',
        data: {
            message: 'Hello world'
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
})