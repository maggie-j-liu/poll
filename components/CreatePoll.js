import Link from "next/link";
const CreatePoll = () => {
  return (
    <div className="w-full max-w-5xl px-8 sm:px-16 mx-auto">
      <h1 className="text-4xl font-semibold text-center">Create a poll</h1>
      <Link href="/new">
        <a className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md text-2xl">
          Create
        </a>
      </Link>
    </div>
  );
};

export default CreatePoll;
