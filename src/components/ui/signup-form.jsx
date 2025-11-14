import React, { useState } from "react";
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

export default function SignupForm(props) {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPwd) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setSubmitting(true);
      const signupUrl = import.meta.env.VITE_API_SIGNUP_URL;
      const res = await fetch(signupUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          full_name: fullName, // 如果后端没有这个字段，可以删掉
        }),
      });

      if (!res.ok) {
        let msg = `Signup failed: ${res.status}`;
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
      setError(err.message || "Unknown error");
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

        <Card {...props} className="shadow-2xl shadow-gray-300/50 dark:shadow-black/70 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between mb-6">
              <Link to="/"><img src={Logo} className="w-10 h-10 object-cover" /></Link>
              <h2 className="text-xl font-bold text-blue-400 tracking-wider">FairStart</h2>
            </div>

            <CardTitle>Create an account</CardTitle>
            <CardDescription>Enter your information below to create your account</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSignup}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">Full Name</FieldLabel>
                  <Input value={fullName} onChange={e => setFullName(e.target.value)} />
                </Field>

                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input value={email} onChange={e => setEmail(e.target.value)} type="email" required />
                </Field>

                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <Input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
                </Field>

                <Field>
                  <FieldLabel>Confirm Password</FieldLabel>
                  <Input value={confirmPwd} onChange={e => setConfirmPwd(e.target.value)} type="password" required />
                </Field>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <FieldGroup>
                  <Field>
                    <Button type="submit" disabled={submitting}>
                      {submitting ? "Creating..." : "Create Account"}
                    </Button>

                    <FieldDescription className="px-6 text-center">
                      Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
