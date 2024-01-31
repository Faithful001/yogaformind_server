import { ObjectId } from "mongoose";
export interface userModel {
	_id: ObjectId;
	first_name: string;
	last_name: string;
	mobile_number: string;
	country: string;
	createdAt: NativeDate;
	updatedAt: NativeDate;
}
