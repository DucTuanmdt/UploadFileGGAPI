const express = require("express");
const app = express();
const server = require("http").createServer(app);
var upload = require('express-fileupload');
app.use(upload()); // configure middleware

const {
    google
} = require("googleapis")
const drive = google.drive("v3");
const path = require("path");
const fs = require("fs");
const key = require("./private_key.json");
const SCOPES = ['https://www.googleapis.com/auth/drive'];
const TOKEN_PATH = 'token.json';
server.listen(3000);

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

const jwToken = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    [SCOPES],
    null,
)

jwToken.authorize(authErr => {
    if (authErr) {
        console.log("Error", authErr)
    } else {
        console.log("Authorize success!")
    }
})
const folderId = "1LqW0YlPk8MkNgHsi4z9Lv6nbJBVlYJq8";

function listFile() {
    drive.files.list({
        auth: jwToken,
        pageSize: 10,
        q: "'" + folderId + "' in parents and trashed=false",
        fields: 'files(id, name)',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const files = res.data.files;
        if (files.length) {
            console.log('Files:');
            files.map((file) => {
                console.log(`${file.name} (${file.id})`);
            });
        } else {
            console.log('No files found.');
        }
    });
}

function uploadFile(fileData, cb) {
    var fileMetadata = {
        'name': fileData.name,
        parents: [folderId]
    };

    var media = {
        mimeType: fileData.mimetype,
        body: fileData.data
    };
    drive.files.create({
        auth: jwToken,
        resource: fileMetadata,
        media: media,
        fields: 'id'
    }, function (err, file) {
        cb(err, file)
        if (err) {
            // Handle error
            console.error("Upload file fail", err);
        } else {
            console.log('File result: ', file.config.url, file.data.id);
        }
    });
}
app.post('/api/upload', function (req, res) {
    if (req.files.upfile) {
        var file = req.files.upfile,
            name = file.name,
            type = file.mimetype;
        var uploadpath = __dirname + '/uploads/' + name;
        file.mv(uploadpath, function (err) {
            if (err) {
                console.log("File Upload Failed", name, err);
                res.send("Error Occured!")
            } else {
                console.log("File Uploaded", name);
                // res.send('Done! Uploading files')
                const uploadpath = __dirname + '/uploads/' + name;
                const fileData = {
                    name: file.name,
                    mimetype: file.mimetype,
                    data: fs.createReadStream(path.join(uploadpath))
                }
                uploadFile(fileData, (err, file) => {
                    if (err) {
                        console.error("Upload file fail", err);
                        res.send({
                            status: "fail"
                        })
                    } else {
                        console.log('File result: ', file.data.id);
                        res.send({
                            status: "success",
                            url: "https://drive.google.com/file/d/" + file.data.id
                        })
                    }
                });
            }
        });
    } else {
        res.send("No File selected !");
        res.end();
    };
});
console.log("Server start at port 3000");