export class Response {
	public static sendResponse({
		res,
		status,
		success,
		error = null,
		message = "",
		data = null,
	}) {
		let responseBody;

		switch (status) {
			case 500:
				responseBody = {
					success,
					error: error ?? `An error occurred.`,
					data: null,
				};
				break;
			case 400:
				responseBody = { success, error: error ?? `Bad request.`, data: null };
				break;
			case 401:
				responseBody = { success, error: error ?? `Unauthorized.`, data: null };
				break;
			case 404:
				responseBody = {
					success,
					error: error ?? `Resource not found.`,
					data: null,
				};
				break;
			case 200:
				responseBody = {
					success,
					message: message ?? "Request successful",
					data,
				};
				break;
			case 201:
				responseBody = {
					success,
					message: message ?? "Resource created successfully",
					data,
				};
				break;
			default:
				responseBody = {
					success: false,
					error: `Unexpected status code: ${status}`,
					data: null,
				};
				break;
		}

		return res.status(status).json(responseBody);
	}
}
