// require express and path
var express = require("express");
var path = require("path");
// create the express app by calling express function
var app = express();

// for static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// root route to render the index.ejs view
app.get('/', function(req, res) {
  res.render("index");
})


var server = app.listen(8000, function() {
  console.log("listening on port 8000");
})


var io = require("socket.io").listen(server);


// this must be below assigning io var
io.sockets.on('connection', function(socket) {
  console.log("we are using sockets!");
  console.log(socket.id); // ex: /#yc82dzP0Lx7I7IRMAAAA



  socket.on("new_user", function(user) {
    console.log("************* made it to new user ************")
    socket.emit("new_user_response", user);
  })

  socket.on("new_message", function(message, user) {
    console.log("**************** made it to new message ************", user);
    io.emit("new_message_response", message, user);
  })




  // socket.on("new_user", function(info) {
  //   console.log(info + "************************ new user ***************");
  //   console.log("info" + info);
  //   socket.emit("response", {info : info});
  // });

  // socket.on("new_message", function(message) {
  //   console.log(info + "************************ new message ***************");
  //   io.emit("yo_response", message);
  // });



});









