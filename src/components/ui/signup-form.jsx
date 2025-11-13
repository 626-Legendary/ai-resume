import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import Logo from "../../assets/Fs_b.png";
export default function SignupForm({
  ...props
}) {
  return (
    // ✨ 背景优化：
    // 1. bg-gray-50/50: 浅色模式下使用非常浅的灰色底色。
    // 2. dark:bg-gray-950: 深色模式下使用深灰/接近黑的底色。
    // 3. 渐变效果: bg-gradient-to-br from-gray-50/50 to-white (浅色) 或 from-gray-950 to-gray-900 (深色)
    // 4. 背景图案: dark:bg-[url(/dot-pattern-dark.svg)] (假设您有一个背景点状图案)
    // 5. 增强 Card 阴影: 让表单卡片浮出，更加突出。
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 
      bg-gray-50/50 dark:bg-gray-950 
      bg-linear-to-br from-gray-50/50 to-white 
      dark:bg-linear-to-br dark:from-gray-950 dark:to-gray-900" // Subtle gradient
    >

      <div className="w-full max-w-sm">

        <Card
          {...props}
          // 增强卡片视觉效果：增加阴影和轻微背景模糊（如果启用）
          className="shadow-2xl shadow-gray-300/50 dark:shadow-black/70 backdrop-blur-sm"
        >
          <CardHeader>
            <div class="flex items-center justify-between mb-6">
              <Link to="/" className=""><img
                src={Logo}
                alt="FairStart Logo"
                className="w-10 h-10 mr-0 object-cover"
              /></Link>
              <h2 className="text-xl font-bold text-blue-400 tracking-wider">
                FairStart
              </h2>
            </div>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Enter your information below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">Full Name</FieldLabel>
                  <Input id="name" type="text" placeholder="John Doe" required />
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input id="email" type="email" placeholder="m@example.com" required />
                  <FieldDescription>
                    We&apos;ll use this to contact you. We will not share your email
                    with anyone else.
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input id="password" type="password" required />
                  <FieldDescription>
                    Must be at least 8 characters long.
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirm-password">
                    Confirm Password
                  </FieldLabel>
                  <Input id="confirm-password" type="password" required />
                  <FieldDescription>Please confirm your password.</FieldDescription>
                </Field>
                <FieldGroup>
                  <Field>
                    <Button type="submit">Create Account</Button>

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