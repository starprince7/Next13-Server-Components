import TodoItem from "@/components/TodoItem";
import { Todo, db } from "@/database";
import Link from "next/link";

// server Action
async function markCompleted(isCompleted: Boolean, todoId: string) {
  "use server";
  await db.connectDB();
  await Todo.findByIdAndUpdate(todoId, { isCompleted });
}

async function getTodos() {
  await db.connectDB();
  const todos = JSON.parse(JSON.stringify(await Todo.find()));
  return todos;
}

export default async function Home() {
  const todos = await getTodos();

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="h3 text-2xl font-bold my-3 capitalize">
          My todo list
        </div>
        <Link href="/createTodo">
          <button className="outline-none p-3 border rounded-md bg-slate-300 cursor-pointer hover:bg-slate-400">
            Add Todo
          </button>
        </Link>
      </div>
      <ol>
        {todos && todos.length > 0 ? (
          todos.map((todo) => (
            <TodoItem {...todo} key={todo.id} markCompleted={markCompleted} />
          ))
        ) : (
          <p>You have no todo's.</p>
        )}
      </ol>
    </div>
  );
}
