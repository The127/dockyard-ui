
const variants = {
    intent: {
        primary: [
            "border-cyan-800",
            "bg-cyan-800",
            "hover:bg-transparent",
            "text-offwhite",
            "not-dark:hover:text-cyan-800 dark:hover:text-cyan-200",
            "hover:inset-shadow-xs",
        ],
        secondary: [
            "bg-transparent",
            "border-slate-500",
            "not-dark:text-slate-500 dark:text-slate-400",
            "hover:text-slate-100",
            "hover:bg-slate-500",
            "hover:inset-shadow-xs",
        ],
        danger: [
            "bg-transparent",
            "border-red-600",
            "text-red-600",
            "hover:text-slate-100",
            "hover:bg-red-600",
            "hover:inset-shadow-xs",
        ],
        link: [
            "bg-transparent",
            "text-cyan-500",
            "hover:text-cyan-600",
            "underline",
            "hover:no-underline",
            "border-none",
        ],
        special: [
            "bg-gradient-to-r",
            "from-cyan-500", "to-blue-500",
            "hover:via-cyan-400", "via-blue-500",
            "hover:from-cyan-400", "to-blue-400",
            "text-slate-100",
            "hover:text-slate-50",
            "tracking-wider",
            "uppercase",
            "border-none",
            "hover:inset-shadow-xs",
        ]
    },
    size: {
        inline: [
            "rounded-sm",
            "border-1",
            "text-xs",
            "font-thin",
        ],
        sm: [
            "px-2",
            "py-1",
            "rounded-md",
            "border-1",
            "text-sm",
            "font-extralight",
        ],
        md: [
            "px-3",
            "py-2",
            "rounded-md",
            "border-1",
            "text-md",
            "font-light",
        ],
        lg: [
            "px-5",
            "py-3",
            "rounded-md",
            "border-1",
            "text-lg",
            "font-normal",
        ],
    },
}

export default variants