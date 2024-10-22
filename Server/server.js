const express = require("express");
const app = express();

const port = 8080;

app.listen(port, () => {
    console.log(`Server up and running on ${port}`);
});
