import { Special_Gothic_Expanded_One } from "next/font/google";

const specialGothicExpandedOne = Special_Gothic_Expanded_One({
    subsets: ["latin"],
    weight: ["400"],
});

interface ButtonProps {
    icon?: React.ReactNode;
    text?: string;
    type?: "iconOnly" | "iconWithText";
}

export default function Button({ icon, text, type = "iconWithText" }: ButtonProps) {
    const isIconOnly = type === "iconOnly";
    const sizeClasses = isIconOnly
        ? "aspect-square p-[1.2rem]"
        : "px-8 py-[1.2rem]";

    return (
        <button
            className={`group relative inline-flex cursor-pointer items-center justify-center overflow-hidden 
                rounded-[20px] border-none bg-[#2CFF68] text-[17px] font-bold tracking-[0.05rem] text-white 
                outline-none before:absolute before:left-[-8%] before:top-0 before:z-0 before:h-[110%] before:w-[120%] 
                before:skew-x-[20deg] before:bg-black before:transition-transform before:duration-[400ms] 
                before:ease-[cubic-bezier(0.3,1,0.8,1)] before:content-[''] hover:before:translate-x-full 
                ${sizeClasses} ${specialGothicExpandedOne.className}`}
        >
            <span className="relative z-10 flex items-center gap-2 transition-colors duration-[400ms] group-hover:text-black">
                {icon}
                {!isIconOnly && text}
            </span>
        </button>
    );
}
