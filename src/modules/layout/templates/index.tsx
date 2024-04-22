import React from "react"

import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import NavItems from "@modules/layout/templates/navItems";
const Layout: React.FC<{
    children: React.ReactNode
}> = ({ children }) => {
    return (
        <div>
            <Nav />
            <NavItems/>
            <main className="relative">{children}</main>
            <Footer />
        </div>
    )
}

export default Layout
