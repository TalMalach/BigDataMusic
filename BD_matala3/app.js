


//Require the "mangoose" module to connect to our database
var mongoose = require('mongoose');

mongoose.connect('mongodb://talivan:bigmongo123@ds247310.mlab.com:47310/muscidb2');





//V 2. create a web server with express
//Require the "express" module to use express functionality to create a web server
var express = require('express');
var app = express();
var port = process.env.PORT || 3000; //We used an environment variable condition or constant port

app.listen(port);



var publicDir = require('path').join(__dirname, '/public');
app.use(express.static(publicDir));



//We created a static Css file in the 'public' folder to design our web server
app.use('/', express.static(__dirname + '/public'));


//Set to 'ejs' template engine
app.set('view engine', 'ejs');




//We required the parser module to retrive the string from the web form and to keep it
var bodyParser = require('body-parser');
var artistNameGlob = null;
var songNameGlob = null;

var all = [];




// 7. create a new javascript object and make 
// A for loop on users and check if users[i].lastname is equal to the string in (6)
// if yes - keep names & values

// 8. send the usersObj to the table
// 9. make for each on usersObj





//Using moudle.export to require the supervised algorithm
var LearnHandler = require('./LearnHandler');
var dt = LearnHandler();

predicted_class = null; //classification answar



// A schema for the data which we will keep in the database
var Schema = mongoose.Schema;


var songSchema = new Schema({

    artist_hotttnesss: String,
    artist_name: String,
    artist_mbtags: String,
    duration: String,
    familiarity: String,
    location: String,
    loudness: String,
    release_name: String,
    song_hotttnesss: String,
    start_of_fade_out: String,
    tempo: String,
    terms: String,
    title: String,
    year: String


    

});




var Song = mongoose.model('Song', songSchema);


//Question 3
// We selected all our users lastname

Song.find({}, function (err, songs) {
    if (err) throw err;

    console.log("###################################################");

    for (var i = 0; i < songs.length; i++) {
        console.log("###################################################");
        console.log(songs[i].title);
        console.log("###################################################");

    }

});


var fs = require("fs");


//Http get method

app.get('/', function (req, res) {

    //Our initialization object to show an example in the table

 

    var all = [];



    var songsObj =
        {
            artist_name: "_____________",
            artist_mbtags: "_____________",
            duration: "_____________",
            familiarity: "_____________",
            location: "_____________",
            loudness: "_____________",
            release_name: "_____________",
            song_hotttnesss: "_____________",
            start_of_fade_out: "_____________",
            tempo: "_____________",
            terms: "_____________",
            title: "_____________",
            year: "_____________"
        }

        ;
    all.push(songsObj);

    //Send the object to the ejs file
    res.render('index',
        {
            title: 'Big Data Final Project',
            isCrime: '_______',
            all: all

            
        }
    );
});



 

var urlencodedParser = bodyParser.urlencoded({

    extended: true
});


app.get('/predict', function (req, res) {

   
    res.json(predicted_class);
  
});


/////////////////////////////// HADOOP  //////////////////////////////////
/*
// WRITING TO THE REMOTE FILE

var WebHDFS = require('webhdfs');
var hdfs = WebHDFS.createClient();

var localFileStream = fs.createReadStream('/path/to/local/file');
var remoteFileStream = hdfs.createWriteStream('/path/to/remote/file');

localFileStream.pipe(remoteFileStream);

remoteFileStream.on('error', function onError(err) {
    // Do something with the error
});

remoteFileStream.on('finish', function onFinish() {
    // Upload is done
});




// READING FROM THE REMOTE FILE
var WebHDFS = require('webhdfs');
var hdfs = WebHDFS.createClient({
    user: 'webuser',
    host: 'localhost',
    port: 80,
    path: '/webhdfs/v1'
});

var remoteFileStream = hdfs.createReadStream('/path/to/remote/file');

remoteFileStream.on('error', function onError(err) {
    // Do something with the error
});

remoteFileStream.on('data', function onChunk(chunk) {
    // Do something with the data chunk
});

remoteFileStream.on('finish', function onFinish() {
    // Upload is done
});




*/
/////////////////////////////////////////////////////////////


//Http post method
app.post('/', urlencodedParser, function (req, res) {

    artistNameGlob = req.body.artistname; //Clp 
    songNameGlob = req.body.songname;

    console.log("###################################");
    console.log(artistNameGlob);
    console.log(songNameGlob);
    console.log("###################################");


    Song.find({}, function (err, songs) {
        if (err) throw err;

        all = [];


        if (songNameGlob != null) {
            console.log("songNameGlob");

            for (var i = 0; i < songs.length; i++) {

                if (songs[i].title.includes(songNameGlob) && songs[i].title != null) {
                    var songsObj =
                        {
                            title: songs[i].title,
                            artist_name: songs[i].artist_name,
                            terms: songs[i].terms
                        }
                        ;

                    all.push(songsObj);
                    
                    //Send the object to the ejs file


                }


            }
            songNameGlob = null

        }


        //for data prediction
        var artistName = req.body.artistName;
        var termsName = req.body.termsName;
        var titleName = req.body.titleName;


        predicted_class = dt.predict({

            title: titleName,
            artist_name: artistName,
            terms: termsName
        });


        res.render('index',
            {
                title: 'Big Data Final Project',
                isCrime: predicted_class,
                all: all

            }

        );

    });


});

