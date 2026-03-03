import { Chip, Divider } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  handelSignIn,
  handleGoogleSignIn,
  handleSignInWithEmailLink,
} from "../../utils/Auth";
import { useNavigate } from "react-router";
import { useEffect } from "react";

type Inputs = {
  email: string;
  password: string;
};

export default function AuthPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  useEffect(() => {
    handleSignInWithEmailLink(navigate);
  }, [navigate]);
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { email } = data;
    handelSignIn({ email, navigate });
    alert("تم إرسال رابط الدخول.. راجع بريدك الإلكتروني!");
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-[#5B117D] via-[#190C4E] to-[#3C2989] flex items-center justify-center -z-10">
      <div className="max-w-sm mx-auto w-full bg-white/10 border-2 border-white/20 p-4 rounded-2xl mb-3">
        <h1 className="text-center text-white">Sign Up</h1>
        <div className="flex flex-col gap-4 w-full">
          <button
            className="w-3/4 rounded-xl mx-auto bg-linear-to-tr from-purple-600 to-blue-500 shadow-lg 
          hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] mt-4 px-2 py-1
          active:scale-95"
            onClick={() => handleGoogleSignIn(navigate)}
          >
            With Google
          </button>
          <Divider className="">
            <Chip label="Or" className="!text-white" />
          </Divider>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 w-full text-white"
          >
            <div className="flex flex-col gap-2">
              <label>Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="bg-white/10 border border-white/15 p-2 rounded-lg hover:bg-white/5 transition"
              />
              {errors.email && (
                <span className="text-red-700 font-bold text-xs">
                  Email is required
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-xl mx-auto bg-linear-to-tr from-purple-600 to-blue-500 text-white shadow-lg 
          hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] mt-4 px-2 py-1
          active:scale-95"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
