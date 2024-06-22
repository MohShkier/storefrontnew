"use client"

import { useFormState } from "react-dom"

import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import { signUp } from "@modules/account/actions"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useFormState(signUp, null)

  return (
    <div className="max-w-sm flex flex-col items-center" data-testid="register-page">
      <h1 className="text-large-semi uppercase mb-6">
        كن فرداً من عائلتنا
      </h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-4">
      انشئ حساباً في متجر المحترف، واحصل على تجربة تسوق أفضل.
      </p>
      <form className="w-full flex flex-col" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="الاسم الاول"
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
          />
          <Input
            label="الاسم الاخير"
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
          />
          <Input
            label="البريد الإلتكروني"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <Input label="رقم الهاتف" name="phone" type="tel" autoComplete="tel" data-testid="phone-input" required/>
          <Input
            label="كلمة المرور"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={message} data-testid="register-error" />
        <span className="text-center text-ui-fg-base text-small-regular mt-6 test">
           عند انشاء حساب انت توافق على {" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="underline"
          >
            سياسة الخصوصية  
          </LocalizedClientLink>{" "}
          و{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="underline"
          >
            شروط الاستخدام
          </LocalizedClientLink>
          .
        </span>
        <SubmitButton className="w-full mt-6" data-testid="register-button">التسجيل</SubmitButton>
      </form>
      <span className="text-center text-ui-fg-base text-small-regular mt-6 test">
        لديك حساب بالفعل؟{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          تسجيل الدخول
        </button>
        .
      </span>
    </div>
  )
}

export default Register
