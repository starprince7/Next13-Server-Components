import { Todo, db } from "@/database";
import { redirect } from "next/navigation";

// Server action
async function createTodo(data: FormData) {
  "use server";
  await db.connectDB();

  const todoName = data.get("todoText")?.valueOf();
  if (!todoName || typeof todoName !== "string") {
    throw new Error("Invalid todoName.");
  }

  await Todo.create({ name: todoName });
  redirect('/')
}

export default async function createTodoPage() {

  return (
    <div className="m-3">
      <form action={createTodo}>
        <textarea className="h-40 w-78 my-2 text-lg" name="todoText" />
        <br />
        <button type="submit" className="bg-blue-600 p-5 rounded-md outline-none border-none cursor-pointer shadow-lg active:shadow-sm text-white">
          Create
        </button>
      </form>
    </div>
  );
}
