"use client";

type Props = {
  _id: string;
  name: string;
  isCompleted: boolean;
  markCompleted: (isCompleted: boolean, todoId: string) => void;
};

export default function TodoItem({
  markCompleted,
  name,
  _id,
  isCompleted,
}: Props) {
  return (
    <li className="flex items-center gap-6 mb-3">
      <input
        type="checkbox"
        className="peer"
        defaultChecked={isCompleted}
        onChange={(e) => markCompleted(e.target.checked, _id)}
      />
      <div className="peer-checked:line-through peer-checked:text-gray-700 font-semibold text-gray-900">
        {name}
      </div>
    </li>
  );
}
