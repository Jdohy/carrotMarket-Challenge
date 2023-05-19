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
  const { data } = useSWR<TweetResponse>("/api/tweet");

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
            <div
              key={tweet.id}
              className="relative hover:bg-gray-100 duration-100 transition-colors"
            >
              <Link href={`/tweet/${tweet.id}`}>
                <div>
                  <a>
                    <div className="px-6 pt-12 pb-2 group cursor-pointer">
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
                          <span className="max-w-[540px]">{tweet.text}</span>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </Link>
              <div className="px-12 py-1 flex justify-around">
                {[
                  "M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z",
                  "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99",
                  ,
                  "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25",
                  "M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z",
                  "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3",
                ].map((icon, index) => (
                  <div
                    className="relative flex group p-3 cursor-pointer transition-colors hover:bg-white rounded-full"
                    key={index}
                  >
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                      stroke="currentColor"
                      className="w-5 h-5 text-gray-500 group-hover:text-blue-500 transition-colors"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={icon}
                      />
                    </svg>
                  </div>
                ))}
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
