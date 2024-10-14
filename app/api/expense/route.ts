
import Expense from "@/lib/mongodb/schemas/Expense.schema";
import connectToDatabase from "@/util/mongoDb";
import * as Utils from "@/util/utils";
import mongoose, { Schema } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params } : { params: any }) {

	await connectToDatabase();

	const { searchParams } = new URL(request.url);
	let userId = searchParams.get("userId");

	if ( !userId ) userId = '66c87d3411b974f022f84bec';

	const expenseList = await Expense.find({userId});
	
	return NextResponse.json(expenseList, { status: 200 });
};


export async function POST(request: NextRequest) {
	const payload: any = await request.json();

	payload.userId = new mongoose.Types.ObjectId(payload.userId as string);
	payload.categoryId = new mongoose.Types.ObjectId(payload.categoryId as string);

	if (payload.budgetId !== undefined) {
		payload.budgetId = new mongoose.Types.ObjectId(payload.budgetId as string);
	}

	await connectToDatabase();
	const newTransaction = await Expense.create(payload);

	return NextResponse.json(newTransaction, { status: 200 })
}

export async function PUT(request: NextRequest, { params }: { params: any }) {

	const payload: any = await request.json();

	// Destructure budgetId out of the updateData, if exists
	const { budgetId, ...updateFields } = payload;
	
   updateFields.date = Utils.formatDateObjToDbDate(Utils.convertDateStrToObj(payload.date));

	// Create the update object
	const updateObject = {
		$set: updateFields,
		// $currentDate: { updatedAt: true }, // Update the `updatedAt` timestamp
	};

	// Conditionally add $unset to remove budgetId if needed
	//if ( budgetId == undefined ) {
	//	updateObject["$unset"] = { budgetId: "" };
	//}

	// Find the transaction by ID and update it with the provided fields
	
	await connectToDatabase();
	const updatedTransaction = await Expense.findByIdAndUpdate(
		payload._id,
		updateObject,
		{ new: true, runValidators: true }
	);
	return NextResponse.json(updatedTransaction, { status: 200 })

}

export async function DELETE(request: NextRequest) {
	const id = request.nextUrl.searchParams.get("id");

	await connectToDatabase();
	await Expense.findByIdAndDelete(id);

	return NextResponse.json({ message: "Expense is deleted." }, { status: 200 });
}