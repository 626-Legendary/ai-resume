import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Fs_b.png";
import { useAuth } from "../../context/AuthContext";

export default function LoginForm({ className, ...props }) {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setSubmitting(true);
      const loginUrl = import.meta.env.VITE_API_LOGIN_URL;
      //console.log("loginUrl", loginUrl);
      const res = await fetch(loginUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        let msg = `Login failed: ${res.status}`;
        try {
          const data = await res.json();
          if (Array.isArray(data.detail)) msg = data.detail.map(d => d.msg).join("; ");
          else if (data.detail) msg = data.detail;
        } catch {}
        throw new Error(msg);
      }

      const data = await res.json();
      login({ user: data.user, token: data.token });

      navigate("/dashboard");
    } catch (err) {
      if (err.message == "Invalid credentials"){
        setError("The Username or Password is Incorrect. Try again.");
      }else{
        setError(err.message || "Unknown error");
      }
      
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10
      bg-gray-50/50 dark:bg-gray-950 
      bg-linear-to-br from-gray-50/50 to-white 
      dark:bg-linear-to-br dark:from-gray-950 dark:to-gray-900">

      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card className="shadow-2xl shadow-gray-300/50 dark:shadow-black/70 backdrop-blur-sm">

            <CardHeader>
              <div className="flex items-center justify-between mb-6">
                <Link to="/"><img src={Logo} className="w-10 h-10 object-cover" /></Link>
                <h2 className="text-xl font-bold text-blue-400 tracking-wider">FairStart</h2>
              </div>

              <CardTitle>Login to your account</CardTitle>
              <CardDescription>Enter your email below to login to your account</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleLogin}>
                <FieldGroup>
                  <Field>
                    <FieldLabel>Email</FieldLabel>
                    <Input value={email} onChange={e => setEmail(e.target.value)} type="email" required />
                  </Field>

                  <Field>
                    <div className="flex items-center">
                      <FieldLabel>Password</FieldLabel>
                      <a href="#" className="ml-auto text-sm text-primary underline-offset-4 hover:underline">
                        Forgot your password?
                      </a>
                    </div>
                    <Input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
                  </Field>

                  {error && <p className="text-red-500 text-xs ">{error}</p>}

                  <Field>
                    <Button type="submit" disabled={submitting}>
                      {submitting ? "Logging in..." : "Login"}
                    </Button>

                    <FieldDescription className="text-center">
                      Don&apos;t have an account?{" "}
                      <Link to="/signup" className="text-primary hover:underline">Sign up</Link>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>

          </Card>
        </div>
      </div>

    </div>
  );
}
