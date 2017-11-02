// This file is required by app.js. It sets up event listeners
// for the two main URL endpoints of the application - /create and /chat/:id
// and listens for socket.io messages.

// Use the gravatar module, to turn email addresses into avatar images:

var gravatar = require('gravatar');

<<<<<<< HEAD
// Export a function, so that we can pass
=======
// Export a function, so that we can pass 
>>>>>>> 5f86e437204ea1de2194152103f3b0b55385f700
// the app and io instances from the app.js file:

module.exports = function(app,io){

	app.get('/', function(req, res){

		// Render views/home.html
		res.render('home');
	});

<<<<<<< HEAD
	app.get('/admin', function(req, res){
		// Render views/admin.html
		res.render('admin');
	});

	// Created an empty array to store socket objects to be passed on the admin page.
	// this array would be populated once the user logs in.
	var connectedSockets =[];

	// Send connectedsockets array to the admin page.
	app.get('/connectedsocketids', function(req, res) {
	res.send(connectedSockets);
	})

  var deletedSockets =[];
	// Send deletedsockets array to the admin page.
	app.get('/deletedsocketids', function(req, res) {
	res.send(deletedSockets);
	})

=======
>>>>>>> 5f86e437204ea1de2194152103f3b0b55385f700
	app.get('/create', function(req,res){

		// Generate unique id for the room
		var id = Math.round((Math.random() * 1000000));

		// Redirect to the random room
		res.redirect('/chat/'+id);
	});

	app.get('/chat/:id', function(req,res){

		// Render the chant.html view
		res.render('chat');
	});

	// Initialize a new socket.io application, named 'chat'
	var chat = io.on('connection', function (socket) {

<<<<<<< HEAD
		// When the client emits the 'load' event, reply with the
		// number of people in this chat room
      console.log(socket.id+' Socket id connected');
=======
		// When the client emits the 'load' event, reply with the 
		// number of people in this chat room
>>>>>>> 5f86e437204ea1de2194152103f3b0b55385f700

		socket.on('load',function(data){

			var room = findClientsSocket(io,data);
			if(room.length === 0 ) {

				socket.emit('peopleinchat', {number: 0});
			}
			else if(room.length === 1) {

				socket.emit('peopleinchat', {
					number: 1,
					user: room[0].username,
					avatar: room[0].avatar,
					id: data
				});
			}
			else if(room.length >= 2) {

				chat.emit('tooMany', {boolean: true});
			}
		});

		// When the client emits 'login', save his name and avatar,
		// and add them to the room
		socket.on('login', function(data) {

			var room = findClientsSocket(io, data.id);
			// Only two people per room are allowed
			if (room.length < 2) {

				// Use the socket object to store data. Each client gets
				// their own unique socket object

				socket.username = data.user;
				socket.room = data.id;
				socket.avatar = gravatar.url(data.avatar, {s: '140', r: 'x', d: 'mm'});

<<<<<<< HEAD
				// Create and socket object and push into the connectedSockets array.
				var socketobject = {id:socket.id,username:socket.username,roomid:socket.room};
				connectedSockets.push(socketobject);

=======
>>>>>>> 5f86e437204ea1de2194152103f3b0b55385f700
				// Tell the person what he should use for an avatar
				socket.emit('img', socket.avatar);


				// Add the client to the room
				socket.join(data.id);

				if (room.length == 1) {

					var usernames = [],
						avatars = [];

					usernames.push(room[0].username);
					usernames.push(socket.username);

					avatars.push(room[0].avatar);
					avatars.push(socket.avatar);

					// Send the startChat event to all the people in the
					// room, along with a list of people that are in it.

					chat.in(data.id).emit('startChat', {
						boolean: true,
						id: data.id,
						users: usernames,
						avatars: avatars
					});
				}
			}
			else {
				socket.emit('tooMany', {boolean: true});
			}
		});

		// Somebody left the chat
		socket.on('disconnect', function() {
<<<<<<< HEAD
			  // Notify on console the Socket id of person left.
			  console.log(socket.id+' Socket id disconnected');
			//	var socketobject = {id:socket.id,username:socket.username,roomid:socket.room};
				deletedSockets.push(socket.id);
        // find the index of the object having socket id which left.
				var index = connectedSockets.findIndex(function(o){
     				return o.id === socket.id;
        });

				// Remove the socket object from the connected array.
        if (index !== -1) connectedSockets.splice(index, 1);
=======
>>>>>>> 5f86e437204ea1de2194152103f3b0b55385f700

			// Notify the other person in the chat room
			// that his partner has left

			socket.broadcast.to(this.room).emit('leave', {
				boolean: true,
				room: this.room,
				user: this.username,
				avatar: this.avatar
			});

			// leave the room
			socket.leave(socket.room);
		});


		// Handle the sending of messages
		socket.on('msg', function(data){

			// When the server receives a message, it sends it to the other person in the room.
			socket.broadcast.to(socket.room).emit('receive', {msg: data.msg, user: data.user, img: data.img});
		});
	});
<<<<<<< HEAD



=======
>>>>>>> 5f86e437204ea1de2194152103f3b0b55385f700
};

function findClientsSocket(io,roomId, namespace) {
	var res = [],
		ns = io.of(namespace ||"/");    // the default namespace is "/"

	if (ns) {
		for (var id in ns.connected) {
			if(roomId) {
				var rooms = Object.values(ns.connected[id].rooms);	// ns.connected[id].rooms is an object!
				var index = rooms.indexOf(roomId);
				if(index !== -1) {
					res.push(ns.connected[id]);
				}
			}
			else {
				res.push(ns.connected[id]);
			}
		}
	}
	return res;
}
<<<<<<< HEAD
=======


>>>>>>> 5f86e437204ea1de2194152103f3b0b55385f700
