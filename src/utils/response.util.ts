export class Response {
	public static sendResponse({
		res,
		status,
		success,
		error = null,
		message = "",
		data = null,
	}) {
		switch (status) {
			case 500:
				return res.status(status).json({
					success: success,
					error: error ?? `An error occured.`,
					data: null,
				});
			case 400:
				return res.status(status).json({
					success: success,
					error: error ?? `Something went wrong.`,
					data: null,
				});
			case 401:
				return res.status(status).json({
					success: success,
					error: error ?? `User is unauthorized.`,
					data: null,
				});
			case 404:
				return res.status(status).json({
					success: success,
					error: error ?? `Resource not found.`,
					data: null,
				});
			case 200:
				return res.status(status).json({
					success: success,
					message: message ?? "Request successful",
					data: data,
				});
			case 201:
				return res.status(status).json({
					success: success,
					message: message ?? "Resource created successfully",
					data: data,
				});
			default:
				return res.status(status).json({
					success: false,
					error: `Unexpected status code: ${status}`,
					data: null,
				});
		}
	}
}
