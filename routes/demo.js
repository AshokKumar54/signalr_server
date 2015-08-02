var express = require('express');
var router = express.Router();

router.get('/demo', function(req, res){
	res.status(200).json({"result":"called demo function", "error": false, "message": ""});
});

module.exports = router;