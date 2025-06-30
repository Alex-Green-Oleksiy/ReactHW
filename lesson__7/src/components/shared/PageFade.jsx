import { useRef, useEffect, useState } from "react";

export default function PageFade({ children }) {
    const [visible, setVisible] = useState(false);
    const ref = useRef();

    useEffect(() => {
        setVisible(false);
        const timeout = setTimeout(() => setVisible(true), 10);
        return () => clearTimeout(timeout);
    }, [children]);

    return (
        <div
            ref={ref}
            style={{
                opacity: visible ? 1 : 0,
                transition: "opacity 350ms ease"
            }}
        >
            {children}
        </div>
    );
}
