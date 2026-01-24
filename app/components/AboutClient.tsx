"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Presentation from "./Presentation";
import { useBackground } from "../contexts/BackgroundContext";

export default function AboutClient() {
    const pathname = usePathname();
    const { setBackgroundState } = useBackground();

    // Mettre à jour l'état du background pour cette page
    useEffect(() => {
        setBackgroundState({
            isServiceVisible: false,
            isCollectifVisible: false,
            isProjetsVisible: false,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    return (
        <div className="relative min-h-screen">
            {/* Header avec logo et navigation */}
            <Header
                currentPath={pathname}
            />

            {/* Présentation */}
            <Presentation
                isVisible={true}
                onReturn={() => { }}
            />
        </div>
    );
}
