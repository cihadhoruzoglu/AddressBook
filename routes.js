var Address = require('./models/address');

module.exports = function(app) {
	// API

	// Get all addresses
	app.get('/api/addresses', function(req, res) {
		Address.find(function(err, addresses) {
			if (err) res.send(err);

			res.json(addresses);
		});
	});

	// Add Address
	app.post('/api/address', function(req, res) {
		Address.create(req.body, function(err, address) {
			if (err) res.send(err);

			Address.find(function(err, addresses) {
				if (err) res.send(err);

				res.json(addresses);
			});
		});
	});

	// Get specific address
	app.get('/api/address/:id', function(req, res) {
		var id = req.params.id;
		console.log("Searching: " + id);
		Address.find({'_id': id}, function(err, address) {
			if (err) res.send(err);
			console.log("Found: ", address)
			res.json(address);
		});
	});

	// Remove address
	app.delete('/api/address/:id', function(req, res) {
		var id = req.params.id;
		Address.remove({
			_id : id
		}, function(err, address) {
			if (err) res.send(err);

			Address.find(function(err, addresses) {
				if (err) res.send(err);

				res.json(addresses);
			});
		});
	});

	// Update address
	app.put('/api/address/:id', function(req, res) {
		var id = req.params.id;
		console.log("Updating: " + id);
		Address.update({
			_id : id
		}, req.body, function(err, address) {
			console.log("Updated with data: ", req.body);
			if (err) res.send(err);	

			Address.find(function(err, addresses) {
				if (err) res.send(err);

				res.json(addresses);
			});
		});
	});

	// Application start
	app.get('*', function(req, res) {
		res.sendfile('./app/index.html')
	});
}