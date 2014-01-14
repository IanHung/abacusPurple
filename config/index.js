var config = {
		local: {
			mode: 'local',
			port:3000,
			mongo: {
				host: '127.0.0.1',
				port: 27017,
			},
			SALT_WORK_FACTOR: 10,
			currentStrategy: "bcrypt"
		},
		
		staging: {
			mode: 'staging',
			port:4000,
			mongo: {
				host: '127.0.0.1',
				port: 27017
			},
			SALT_WORK_FACTOR: 10,
			currentStrategy: "bcrypt"
		},
		production:{
			mode: 'production',
			port: 5000,
			mongo: {
				host: '127.0.0.1',
				port: 27017
			},
			SALT_WORK_FACTOR: 10,
			currentStrategy: "bcrypt"
		}
};
module.exports = function(mode) {
	return config[mode||process.argv[2]|| 'local'] || config.local;
};