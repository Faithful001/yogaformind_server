export class Validator {
	public static checkForEmptyInputs(
		mobile_number: number,
		first_name?: string,
		last_name?: string
	) {
		if (!first_name || !last_name || !mobile_number) {
			throw new Error("All fields are required");
		}
	}
	public static validateInputs(
		mobile_number: number,
		first_name?: string,
		last_name?: string
	) {
		const firstName = /^[A-za-z]+$/.test(first_name);
		const lastName = /^[A-za-z]+$/.test(last_name);
		const mobileNumber = /^[+]?\d{1,11}$/.test(mobile_number.toString());
		switch (true) {
			case !firstName:
				throw new Error("First Name must contain letters only");
				break;
			case !lastName:
				throw new Error("Last Name must contain letters only");
				break;
			case !mobileNumber:
				throw new Error("Mobile number must is invalid");
				break;
			default:
				break;
		}
	}
}
