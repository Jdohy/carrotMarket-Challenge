import { useForm } from "react-hook-form";
import useMutation from "../lib/useMutation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useUser from "../lib/useUser";

interface CreateForm {
  username: string;
  email: string;
  password: string;
}

interface MutationResult {
  ok: boolean;
  exists?: "username" | "email";
}

export default () => {
  useUser({ isPublic: true });

  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    setError,
    formState: { errors },
  } = useForm<CreateForm>();
  const [isFill, setIsFill] = useState(false);
  const router = useRouter();
  const [enter, { loading, data }] = useMutation<MutationResult>(
    "/api/create-account"
  );
  const onValid = (validForm: CreateForm) => {
    if (loading) return;
    enter(validForm);
  };

  useEffect(() => {
    setIsFill(Object.values(watch()).every((value) => !!value));
  }, [watch()]);

  useEffect(() => {
    if (data && !data.ok) {
      if (data.exists) {
        setFocus(data.exists);
        setError(data.exists, {
          type: "exists",
          message: `this ${data.exists} is already used`,
        });
      }
    }
    if (data?.ok) {
      router.push("/log-in");
    }
  }, [data, router]);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-cyan-200 to-blue-400 ">
      <div className="bg-white w-[520px] shadow-lg rounded-lg py-6 px-8">
        <div className="flex justify-center m-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            viewBox="0 0 24 24"
            className="fill-blue-500"
          >
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
          <form onSubmit={handleSubmit(onValid)} className="mt-6 space-y-6">
            <div>
              <input
                {...register("username", {
                  required: true,
                })}
                required
                placeholder="User name"
                id="username"
                className="shadow-sm mt-2 w-full p-4 py-3 border border-gray-300 rounded-full"
                type="text"
              />
              {errors.username?.message ? (
                <div className="flex justify-center mt-2">
                  <span className="w-auto px-3 text-lg text-center text-white bg-red-500 rounded-full">
                    {errors?.username?.message}
                  </span>
                </div>
              ) : null}
            </div>
            <div>
              <input
                {...register("email", { required: true })}
                required
                placeholder="Email"
                id="email"
                className="shadow-sm mt-2 w-full p-4 py-3 border border-gray-300 rounded-full"
                type="email"
              />
              {errors.email?.message ? (
                <div className="flex justify-center mt-2">
                  <span className="w-auto px-3 text-lg text-center text-white bg-red-500 rounded-full">
                    {errors?.email?.message}
                  </span>
                </div>
              ) : null}
            </div>
            <div>
              <input
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 5,
                    message: "Password must have more than 5 chars",
                  },
                })}
                required
                placeholder="Password"
                id="password"
                className="shadow-sm mt-2 w-full p-4 py-3 border border-gray-300 rounded-full"
                type="password"
              />
              {errors.password?.message ? (
                <div className="flex justify-center mt-2">
                  <span className="w-auto px-3 text-lg text-center text-white bg-red-500 rounded-full">
                    {errors?.password?.message}
                  </span>
                </div>
              ) : null}
            </div>
            <div className="flex items-center">
              <div className="flex items-center h-5">
                <input
                  required
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                />
              </div>
              <div className="ml-3">
                <label
                  htmlFor="terms"
                  className="font-light text-gray-500 dark:text-gray-300"
                >
                  I accept the{" "}
                  <a
                    className="font-bold text-blue-500 hover:underline "
                    href="#"
                  >
                    Terms and Conditions
                  </a>
                  <span className="text-gray-700 font-semibold">
                    {" "}
                    (not implemented)
                  </span>
                </label>
              </div>
            </div>
            <button
              type="submit"
              disabled={isFill ? false : true}
              className="disabled:opacity-40 focus:ring-2 focus:outline-none duration-100 ring-blue-500 ring-offset-2 bg-blue-500 w-full rounded-full hover:bg-blue-600 text-white py-3 font-semibold text-lg"
            >
              Create Account
            </button>
          </form>
          <p className="font-light text-gray-500 dark:text-gray-400 my-4">
            Already have an account?{" "}
            <a
              href="/log-in"
              className="font-bold text-blue-500 hover:underline"
            >
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
