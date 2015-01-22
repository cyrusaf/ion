module.exports = {
	create: function(req, res) {
		var model = new Models.{{name}}(req.body);
		model.save(function(err, model) {
			if (err) {
				res.status(500).json(err);
				return
			}
			res.status(200).json(model);
		});
	},
	read: function(req, res) {
		Models.{{name}}.find({}, function(err, models) {
			if (err) {
				res.status(500).json(err);
				return
			}
			res.status(200).json(models);
		}); 
	},
	update: function(req, res) {
		Models.{{name}}.update({_id: req.body._id}, req.body, function(err, model) {
			if (err) {
				res.status(500).json(err);
				return
			}
			res.status(200).json(model);
		});
	},
	delete: function(req, res) {
		Models.{{name}}.remove({_id: req.body._id}, function(err) {
			if (err) {
				res.status(500).json(err);
				return
			}
			res.status(200).json("{{name}} deleted");
		});
	}
}