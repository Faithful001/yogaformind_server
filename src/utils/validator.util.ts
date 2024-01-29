export class Validator {
	public static validateInputs(
		mobile_number: string,
		first_name?: string,
		last_name?: string
	): string[] {
		const errors: string[] = [];

		const mobileNumber = /^[+]?\d{10,11}$/.test(mobile_number);
		const firstName = /^[A-Za-z]+$/.test(first_name);
		const lastName = /^[A-Za-z]+$/.test(last_name);

		if (!mobileNumber) {
			errors.push("Mobile number is invalid");
		}
		if (!firstName) {
			errors.push("First Name must contain letters only");
		}

		if (!lastName) {
			errors.push("Last Name must contain letters only");
		}

		return errors;
	}
}
