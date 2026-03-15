"use client";
import React from "react";
import { useNode, Element } from "@craftjs/core";
import { FreeformWrapper, CommonElementProps } from "./FreeformWrapper";
import { Container } from "./Container";
import { Heading } from "./Heading";
import { Text } from "./Text";
import { Image } from "./Image";

export interface FooterProps extends CommonElementProps {
    theme?: "light" | "dark";
    companyName?: string;
}

export const Footer = ({
    theme = "dark",
    companyName = "SaaS Builder Inc.",
    width = "100%", height = "auto", padding = "40px", margin = "0px",
    isAbsolute = true, x = 0, y = 0,
    zIndex = 1, opacity = 100, borderRadius = "0px", boxShadow = "none",
    linkUrl, linkTarget, animationType, animationDelay
}: FooterProps) => {

    const bg = theme === "dark" ? "#0f172a" : "#f8fafc";
    const textPrimary = theme === "dark" ? "#ffffff" : "#0f172a";
    const textSecondary = theme === "dark" ? "#94a3b8" : "#64748b";

    return (
        <FreeformWrapper
            width={width} height={height} padding={padding} margin={margin}
            isAbsolute={isAbsolute} x={x} y={y}
            zIndex={zIndex} opacity={opacity} borderRadius={borderRadius} boxShadow={boxShadow}
            linkUrl={linkUrl} linkTarget={linkTarget} animationType={animationType} animationDelay={animationDelay}
        >
            <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center border-t py-8 px-6" style={{ background: bg, borderColor: theme === 'dark' ? '#334155' : '#e2e8f0' }}>
                <Element id="footer-left" is={Container} padding="0px" flexDirection="column" alignItems="flex-start" gap={8} background="transparent" isAbsolute={false}>
                    <Element id="footer-logo" is={Heading} text={companyName} level={3} color={textPrimary} />
                    <Element id="footer-desc" is={Text} text="Building the web, one block at a time." color={textSecondary} fontSize={14} />
                </Element>

                <Element id="footer-right" is={Container} padding="0px" flexDirection="row" alignItems="center" gap={24} background="transparent" isAbsolute={false}>
                    <Element id="footer-link-1" is={Text} text="Privacy Policy" color={textSecondary} fontSize={14} />
                    <Element id="footer-link-2" is={Text} text="Terms of Service" color={textSecondary} fontSize={14} />
                    <Element id="footer-link-3" is={Text} text="Contact Us" color={textSecondary} fontSize={14} />
                </Element>
            </div>
        </FreeformWrapper>
    );
};

export const FooterSettings = () => {
    const { actions: { setProp }, theme, companyName } = useNode((node) => ({
        theme: node.data.props.theme,
        companyName: node.data.props.companyName,
    }));

    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-muted-foreground">Theme</label>
                <select
                    value={theme || "dark"}
                    onChange={(e) => setProp((props: any) => props.theme = e.target.value)}
                    className="w-full h-8 text-[12px] bg-background border rounded px-2"
                >
                    <option value="light">Light Mode</option>
                    <option value="dark">Dark Mode</option>
                </select>
            </div>
            <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-muted-foreground">Company Name</label>
                <input
                    type="text"
                    value={companyName || "SaaS Builder Inc."}
                    onChange={(e) => setProp((props: any) => props.companyName = e.target.value)}
                    className="w-full h-8 px-2 border rounded bg-background text-[12px]"
                />
            </div>
        </div>
    );
};

Footer.craft = {
    displayName: "Footer",
    props: {
        theme: "dark",
        companyName: "SaaS Builder Inc.",
        width: "100%", height: "auto", padding: "0px", margin: "0px",
        isAbsolute: false, x: 0, y: 0,
        zIndex: 1, opacity: 100, borderRadius: "0px", boxShadow: "none"
    },
    related: {
        settings: FooterSettings
    }
};
