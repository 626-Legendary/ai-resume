import { cn } from "@/lib/utils"
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


export default function LoginForm({
  className,
  ...props
}) {
  return (
    // ✨ 背景优化：
    // 1. 基础颜色: bg-gray-50/50 (浅色) 或 dark:bg-gray-950 (深色)。
    // 2. 渐变效果: bg-gradient-to-br from-gray-50/50 to-white (浅色) 或 dark:from-gray-950 dark:to-gray-900 (深色)。
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10
      bg-gray-50/50 dark:bg-gray-950 
      bg-linear-to-br from-gray-50/50 to-white 
      dark:bg-linear-to-br dark:from-gray-950 dark:to-gray-900" // Subtle gradient
    >

      <div className="w-full max-w-sm">
        {/* 这里保持了 cn 工具函数的调用，以允许外部传入额外的样式 */}
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card
            // 增强卡片视觉效果：增加阴影和轻微背景模糊
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

              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input id="email" type="email" placeholder="m@example.com" required />
                  </Field>
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <a
                        href="#"
                        // 使用 text-sm text-primary 而不是默认的 text-blue-500，以遵循 shadcn 主题
                        className="ml-auto inline-block text-sm text-primary underline-offset-4 hover:underline">
                        Forgot your password?
                      </a>
                    </div>
                    <Input id="password" type="password" required />
                  </Field>
                  <Field>
                    <Button type="submit">Login</Button>

                    <FieldDescription className="text-center">
                      Don&apos;t have an account? <Link to="/signup" className="text-primary hover:underline">Sign up</Link>
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