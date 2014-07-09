var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.set("views", __dirname+"/views");
app.set("view engine", "jade");
app.use(express.static(__dirname + "/bower_components"));

app.get("/", function(req, res) {
  res.render("index");
});

var router = express.Router();

router.get("/", function(req, res) {
  res.render("a/index");
});

app.use("/a", router);

io.on("connection", function(socket) {
  console.log("[%s] a user connected", new Date());

  socket.on("disconnect", function() {
    console.log("[%s] user disconnected", new Date());
  });

  socket.on("next", function() {
    socket.broadcast.emit("next");
  });

  socket.on("prev", function() {
    socket.broadcast.emit("prev");
  });
});


var port = process.env.PORT|| 3000 ;
http.listen(port, function(){
  console.log("[%s] listening on *:%d", new Date(), port);
})
