import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useMutation from "../../lib/useMutation";
import { useRouter } from "next/router";
import useUser from "../../lib/useUser";

interface TweetForm {
  tweet: string;
}

export default () => {
  useUser();

  const { register, handleSubmit } = useForm<TweetForm>();
  const router = useRouter();
  const [upload, { loading, data }] = useMutation("/api/tweet");
  const onValid = (data: TweetForm) => {
    if (loading) return;
    upload(data);
  };

  useEffect(() => {
    if (data?.ok) {
      router.push("/");
    }
  }, [data, router]);

  return (
    <div className="w-auto h-auto min-h-screen flex justify-center items-center bg-gradient-to-r from-cyan-200 to-blue-400">
      <div className="w-[700px] h-[500px] bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4 bg-white backdrop-blur-sm bg-opacity-90 shadow-md flex justify-center text-gray-700 w-[700px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="45"
            height="45"
            viewBox="0 0 24 24"
            className="fill-blue-500"
          >
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
          </svg>
        </div>
        <form onSubmit={handleSubmit(onValid)}>
          <textarea
            {...register("tweet", { required: true })}
            required
            placeholder="write Tweet..."
            className=" p-6 w-full text-2xl h-[350px] focus:outline-none"
          />
          <button
            type="submit"
            className="flex p-[18px] w-full hover:bg-blue-600 text-2xl font-bold text-white justify-center items-center bg-blue-500"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};
