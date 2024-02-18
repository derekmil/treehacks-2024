"use client"

import * as React from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import ImageUploadButton from "@/components/imguploadbutton"
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ModeToggle } from "./mode-toggle"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

export function NavBar() {
  return (
    <main className="flex flex-row justify-center items-start w-screen pt-4 pb-12 px-4">
        <div className="w-1/3 ">
            <NavigationMenu className=" flex justify-between w-full">
            <NavigationMenuList className="w-full flex-row justify-start">
                {/* <div className="flex-row justify-between items-center w-1/3"> */}
                    <NavigationMenuItem>
                    <Link to="/docs">
                      <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                    </Link>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                        {components.map((component) => (
                            <ListItem
                            key={component.title}
                            title={component.title}
                            href={component.href}
                            >
                            {component.description}
                            </ListItem>
                        ))}
                        </ul>
                    </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                    <Link to="/docs">
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Documentation
                        </NavigationMenuLink>
                    </Link>
                    </NavigationMenuItem>
                {/* </div> */}
            </NavigationMenuList>
            </NavigationMenu>
        </div>
        <div className="w-1/3 flex justify-center">
            <Link to="/">
                <h1 className="font-bold text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500 pt-10">\ LeTEXT</h1>
            </Link>
        </div>
        <div className="w-1/3  gap-4 flex justify-end">
            {/* <Button variant="outline" >📸</Button> */}
            <ImageUploadButton />
            <ModeToggle />
        </div>
    </main>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"