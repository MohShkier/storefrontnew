import React from "react"

import UnderlineLink from "@modules/common/components/interactive-link"

import AccountNav from "../components/account-nav"
import { Customer } from "@medusajs/medusa"

interface AccountLayoutProps {
  customer: Omit<Customer, "password_hash"> | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <div className="flex justify-center test">
      <div className="flex-1 small:py-12" data-testid="account-page">
      <div className="flex-1 content-container h-full max-w-5xl mx-auto bg-white flex flex-col">
        <div className="grid grid-cols-1  small:grid-cols-[240px_1fr] py-12">
          <div>{customer && <AccountNav customer={customer} />}</div>
          <div className="flex-1">{children}</div>
        </div>
        <div className="flex  flex-row small:border-t border-gray-200 py-12 gap-8 justify-center">
          <div>
            <h3 className="text-xl-semi mb-4">تحتاج الى مساعدة؟</h3>
            <div className="flex justify-center"><span className="txt-medium">
              قم بالاتصال بنا 
           <div><a href="tel:+962799776672">+962799776672</a></div>   
            </span>
          </div></div>
            

        </div>
      </div>
    </div>
    </div>
  )
}

export default AccountLayout
