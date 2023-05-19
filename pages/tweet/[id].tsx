import { Twit, User } from "@prisma/client";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import useMutation from "../../lib/useMutation";
import useUser from "../../lib/useUser";

export interface TweetWithUserAndCount extends Twit {
  user: User;
  _count: { like: number };
}

interface ProductResponse {
  ok: boolean;
  tweet: TweetWithUserAndCount;
  isLiked: boolean;
}

export default () => {
  useUser();

  const router = useRouter();
  const { data, mutate } = useSWR<ProductResponse>(
    `/api/tweet/${router.query.id}`
  );
  const [toggleLike] = useMutation(`/api/tweet/${router.query.id}/like`);

  const onLikeClick = () => {
    if (!data) return;

    mutate(
      (prev) =>
        prev && {
          ...prev,
          isLiked: !prev.isLiked,
          tweet: {
            ...prev.tweet,
            _count: {
              like: prev.isLiked
                ? prev.tweet._count.like - 1
                : prev.tweet._count.like + 1,
            },
          },
        },
      false
    );

    toggleLike({});
  };

  return (
    <div className="w-auto h-auto min-h-screen flex justify-center bg-gradient-to-r from-cyan-200 to-blue-400">
      <div className="w-[700px] h-full min-h-screen bg-white">
        <div className="p-4 bg-white z-10 backdrop-blur-sm bg-opacity-90 shadow-md flex justify-center text-gray-700 fixed w-[700px]">
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
        <div className="mt-20 flex flex-col border-b">
          <div className="relative">
            <div className="p-6 py-12">
              <div className="flex items-start text-lg">
                <div className="w-16 h-16 min-w-16 rounded-full bg-slate-400"></div>
                <div className="flex flex-col ml-4 space-y-1">
                  <span className="font-bold text-gray-900">
                    {data?.tweet.user.name}
                  </span>
                  <span className="font-semibold text-gray-500">
                    @Challenge
                  </span>
                </div>
              </div>
              <p className="max-w-[640px] text-xl mt-6">{data?.tweet.text}</p>
              <div className="flex space-x-4 text-gray-500 mt-6">
                <span>{String(data?.tweet.createdAt)}</span>
                <div>
                  <span className="font-bold text-gray-900">2.1만</span> 조회수
                </div>
              </div>
            </div>
            <div
              onClick={() => onLikeClick()}
              className="group cursor-pointer shadow-md select-none p-2 rounded-lg absolute flex items-start space-x-3 right-10 bottom-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className={`w-6 h-6 ${
                  data?.isLiked
                    ? "fill-red-500 text-red-500"
                    : "text-gray-500 group-hover:text-red-500"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>

              <span
                className={`group-hover:text-red-500 text-lg ${
                  data?.isLiked ? "text-red-500" : "text-gray-500"
                }`}
              >
                {data?.tweet._count.like}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-around border-b py-6">
          {[
            "M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z",
            "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99",
            ,
            "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25",
            "M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z",
            "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3",
          ].map((img, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-8 h-8 text-gray-500"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d={img} />
            </svg>
          ))}
        </div>
        <p className="border-b flex justify-center font-bold p-2">
          ↑↓ Not implement... just UI
        </p>
        <div className="flex flex-col divide-y">
          {[1, 1, 1, 1].map((_, index) => (
            <div key={index}>
              <div className="relative">
                <div className="p-6 py-8 hover:bg-gray-100 duration-100 transition-colors cursor-pointer">
                  <div className="flex items-start text-lg">
                    <div className="w-12 h-12 min-w-16 rounded-full bg-slate-400"></div>
                    <div className="flex flex-col ml-4 space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-gray-900">
                          Anonymous
                        </span>
                        <span className="font-semibold text-gray-500">
                          {" "}
                          · 3 hours
                        </span>
                      </div>
                      <span className="max-w-[500px]">reply</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
