import dbConnect from "../../../lib/dbConnect";
import Task from "../../../models/task";
import { NextResponse } from "next/server";

const sendResponse = (success, data, message = "", status = 200) => {
  return NextResponse.json(
    { success, data, message },
    { status, statusText: message || "OK" }
  );
};

// *** POST REQUEST (Create Task) ***
export async function POST(request) {
  await dbConnect();

  const body = await request.json();
  console.log("Received body:", body);

  if (!body.content) {
    return NextResponse.json(
      { success: false, message: "Content is required!" },
      { status: 400 }
    );
  }

  const newTask = await Task.create({
    content: body.content,
    completed: false,
  });
  console.log(newTask);
  return NextResponse.json(
    { success: true, data: newTask, message: "Task created successfully!" },
    { status: 200 }
  );
}

// *** GET REQUEST (Fetch All Tasks) ***
export async function GET() {
  await dbConnect();

  try {
    const tasks = await Task.find({});
    return sendResponse(true, tasks, "Tasks fetched successfully!");
  } catch (error) {
    console.error("GET Error:", error);
    return sendResponse(false, null, error.message, 500);
  }
}

// *** PUT REQUEST (Toggle Task Completion or Priority) ***
export async function PUT(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const { id, completed, isPriority } = body;

    if (!id) {
      return sendResponse(false, null, "Task ID is required!", 400);
    }

    // Find the task and update only the allowed fields.
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        ...(completed !== undefined && { completed }),
        ...(isPriority !== undefined && { isPriority }),
      },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return sendResponse(false, null, "Task NOT Found!", 404);
    }

    return sendResponse(true, updatedTask, "Task updated successfully!", 200);
  } catch (error) {
    console.error("PUT Error:", error);
    return sendResponse(false, null, error.message, 500);
  }
}

// *** DELETE REQUEST (Delete Task) ***
export async function DELETE(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return sendResponse(false, null, "Task ID is required!", 400);
    }

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return sendResponse(false, null, "Task NOT Found!", 404);
    }

    return sendResponse(true, null, "Task deleted successfully!", 200);
  } catch (error) {
    console.error("DELETE Error:", error);
    return sendResponse(false, null, error.message, 500);
  }
}
