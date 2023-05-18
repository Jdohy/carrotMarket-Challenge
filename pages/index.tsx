import Link from "next/link";
import React from "react";
import useUser from "../lib/useUser";
import useSWR from "swr";
import { Twit, User } from "@prisma/client";

export interface TweetWithUserAndCount extends Twit {
  user: User;
  _count: { like: number };
}

interface TweetResponse {
  ok: boolean;
  tweets: TweetWithUserAndCount[];
}

export default () => {
  const { user } = useUser();
  const { data, mutate } = useSWR<TweetResponse>("/api/tweet");

  const onLikeClick = async (tweetId: number) => {
    await fetch(`/api/tweet/${tweetId}/like`, {
      method: "POST",
    });

    mutate();
  };

  data?.tweets.sort((a, b) => b.id - a.id);

  return user && data ? (
    <div className="w-auto h-auto min-h-screen flex justify-center bg-gradient-to-r from-cyan-200 to-blue-400">
      <div className="w-[700px] shadow-lg h-full min-h-screen bg-white relative">
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
        <Link href="/tweet/upload">
          <a className="p-1 bg-blue-500 border-2 transition-colors rounded-md hover:bg-blue-600 cursor-pointer z-10 top-[70px] backdrop-blur-sm bg-opacity-90 shadow-3xl flex justify-center fixed w-[700px] font-bold text-xl text-white">
            Let't Tweet →
          </a>
        </Link>
        <div className="mt-24 flex flex-col divide-y">
          {data?.tweets.map((tweet) => (
            <div key={tweet.id} className="relative">
              <Link href={`/tweet/${tweet.id}`}>
                <div>
                  <a>
                    <div className="p-6 py-12 hover:bg-gray-100 duration-100 transition-colors cursor-pointer">
                      <div className="flex items-start text-lg">
                        <div className="w-16 h-16 min-w-16 rounded-full bg-slate-400"></div>
                        <div className="flex flex-col ml-4 space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-gray-900">
                              {tweet.user.name}
                            </span>
                            <span className="font-semibold text-sm text-gray-500">
                              {" "}
                              · {String(tweet.createdAt)}
                            </span>
                          </div>
                          <span className="max-w-[500px]">{tweet.text}</span>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </Link>
              <div
                onClick={() => onLikeClick(tweet.id)}
                className="cursor-pointer select-none absolute flex items-start space-x-3 p-2 z-10 rounded-lg hover:bg-blue-50 right-8 bottom-2"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </span>
                <span className="text-lg text-gray-500">
                  {tweet._count.like}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="w-screen h-screen font-bold bg-gradient-to-r from-cyan-200 to-blue-400 flex justify-center items-center text-4xl">
      <h1>Loading...</h1>
    </div>
  );
};
