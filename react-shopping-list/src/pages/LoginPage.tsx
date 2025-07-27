import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { cva } from "class-variance-authority";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

const loginSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type LoginFormData = yup.InferType<typeof loginSchema>;

const input = cva(["input", "input-border"], {
    variants: {
        error: {
            true: ["input-error"]
        }
    }
});

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(false);
      await login(data.username, data.password);
      navigate('/shopping-lists');
    } catch (e) {
      console.error(e);
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold text-center">Login</h2>

          {error && (<span className="text-red-500">
            Username or password is incorrect.
          </span>)}

          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Username"
              {...register("username")}
              className={input({ error: !! errors.username })}
            />
            {errors.username && (
              <span className="text-error text-sm mt-1">{errors.username.message}</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className={input({ error: !! errors.password })}
            />
            {errors.password && (
              <span className="text-error text-sm mt-1">{errors.password.message}</span>
            )}
          </div>

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};