export default {
	request: [
		{
			then: request => {
				console.log(`Method: ${request.method.toUpperCase()} | Url: ${request.url}`);
				return request;
			},
			catch: err => Promise.reject(err)
		}
	],
	response: []
};