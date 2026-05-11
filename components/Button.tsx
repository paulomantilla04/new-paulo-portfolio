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
                rounded-[20px] border-none bg-black text-white text-[17px] font-bold tracking-[0.05rem] 
                outline-none before:absolute before:left-[-8%] before:top-0 before:z-0 before:h-[110%] before:w-[120%] 
                before:skew-x-[20deg] before:bg-[#2CFF68] before:transition-transform before:duration-[400ms] 
                before:ease-[cubic-bezier(0.3,1,0.8,1)] before:content-[''] before:-translate-x-full 
                hover:before:translate-x-0 
                ${sizeClasses} ${specialGothicExpandedOne.className}`}
        >
            <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-black">
                {icon}
                {!isIconOnly && text}
            </span>
        </button>
    );
}
