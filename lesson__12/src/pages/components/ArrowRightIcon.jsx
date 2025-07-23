import React from "react";

const ArrowRightIcon = ({ size = 24, color = "currentColor", ...props }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        style={{ transition: "color 0.2s" }}
    >
        <path
            d="M8.5 5L14.5 12L8.5 19"
            stroke={color}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default ArrowRightIcon; 