const mongoose = require('mongoose');

// mongo urls
const devConnection = process.env.MONGO_URL;
const prodConnection = process.env.MONGO_URL_PROD;

// Connect to the correct environment database
if (process.env.NODE_ENV === 'production') {
	mongoose
		.connect(prodConnection, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log('Database connected!'))
		.catch((err) => console.log(err));
} else {
	mongoose
		.connect(devConnection, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log('Database connected!'))
		.catch((err) => console.log(err));
}
