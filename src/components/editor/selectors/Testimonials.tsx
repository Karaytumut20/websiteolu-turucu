"use client";
import React from "react";
import { useNode, Element } from "@craftjs/core";
import { FreeformWrapper, CommonElementProps } from "./FreeformWrapper";
import { Container } from "./Container";
import { Heading } from "./Heading";
import { Text } from "./Text";
import { Image } from "./Image";

export interface TestimonialsProps extends CommonElementProps {
    layoutType?: "grid" | "carousel";
}

export const Testimonials = ({
    layoutType = "grid",
    width = "100%", height = "auto", padding = "40px", margin = "0px",
    isAbsolute = true, x = 0, y = 0,
    zIndex = 1, opacity = 100, borderRadius = "0px", boxShadow = "none",
    linkUrl, linkTarget, animationType, animationDelay
}: TestimonialsProps) => {

    return (
        <FreeformWrapper
            width={width} height={height} padding={padding} margin={margin}
            isAbsolute={isAbsolute} x={x} y={y}
            zIndex={zIndex} opacity={opacity} borderRadius={borderRadius} boxShadow={boxShadow}
            linkUrl={linkUrl} linkTarget={linkTarget} animationType={animationType} animationDelay={animationDelay}
        >
            <div className="w-full flex flex-col items-center py-10 bg-gray-50/50">
                <Element id="testimonials-header" is={Heading} text="What Our Clients Say" level={2} margin="0 0 40px 0" />
                
                <div className={`w-full max-w-6xl mx-auto px-4 ${layoutType === 'grid' ? 'grid grid-cols-1 md:grid-cols-3 gap-8' : 'flex flex-col items-center'}`}>
                    
                    {/* Testimonial 1 */}
                    <Element id="test-1-card" is={Container} padding="24px" background="#ffffff" borderRadius="12px" boxShadow="medium" flexDirection="column" alignItems="flex-start" gap={16} isAbsolute={false}>
                        <div className="flex text-amber-500 mb-2">★★★★★</div>
                        <Element id="test-1-quote" is={Text} text="This product completely transformed how we do business. Highly recommended!" color="#4b5563" fontSize={15} />
                        <div className="flex items-center gap-4 mt-4">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600">JD</div>
                            <div>
                                <Element id="test-1-name" is={Text} text="John Doe" color="#111827" fontSize={14} fontWeight="600" margin="0" />
                                <Element id="test-1-role" is={Text} text="CEO, TechStart" color="#6b7280" fontSize={12} margin="0" />
                            </div>
                        </div>
                    </Element>

                    {/* Testimonial 2 */}
                    <Element id="test-2-card" is={Container} padding="24px" background="#ffffff" borderRadius="12px" boxShadow="medium" flexDirection="column" alignItems="flex-start" gap={16} isAbsolute={false}>
                        <div className="flex text-amber-500 mb-2">★★★★★</div>
                        <Element id="test-2-quote" is={Text} text="The most intuitive builder I have ever used. My team loves the live preview feature." color="#4b5563" fontSize={15} />
                        <div className="flex items-center gap-4 mt-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-600">SJ</div>
                            <div>
                                <Element id="test-2-name" is={Text} text="Sarah Jenkins" color="#111827" fontSize={14} fontWeight="600" margin="0" />
                                <Element id="test-2-role" is={Text} text="Marketing Lead" color="#6b7280" fontSize={12} margin="0" />
                            </div>
                        </div>
                    </Element>

                    {/* Testimonial 3 */}
                    <div className={layoutType === 'carousel' ? 'hidden' : 'block'}>
                        <Element id="test-3-card" is={Container} padding="24px" background="#ffffff" borderRadius="12px" boxShadow="medium" flexDirection="column" alignItems="flex-start" gap={16} isAbsolute={false}>
                            <div className="flex text-amber-500 mb-2">★★★★★</div>
                            <Element id="test-3-quote" is={Text} text="Setup took minutes, and the output is flawless. Will use for all future projects." color="#4b5563" fontSize={15} />
                            <div className="flex items-center gap-4 mt-4">
                                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center font-bold text-rose-600">MR</div>
                                <div>
                                    <Element id="test-3-name" is={Text} text="Mike Ross" color="#111827" fontSize={14} fontWeight="600" margin="0" />
                                    <Element id="test-3-role" is={Text} text="Freelance Designer" color="#6b7280" fontSize={12} margin="0" />
                                </div>
                            </div>
                        </Element>
                    </div>
                </div>
            </div>
        </FreeformWrapper>
    );
};

export const TestimonialsSettings = () => {
    const { actions: { setProp }, layoutType } = useNode((node) => ({
        layoutType: node.data.props.layoutType,
    }));

    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-muted-foreground">Layout Type</label>
                <select
                    value={layoutType || "grid"}
                    onChange={(e) => setProp((props: any) => props.layoutType = e.target.value)}
                    className="w-full h-8 text-[12px] bg-background border rounded px-2"
                >
                    <option value="grid">3-Column Grid</option>
                    <option value="carousel">Centered Focus</option>
                </select>
            </div>
        </div>
    );
};

Testimonials.craft = {
    displayName: "Testimonials",
    props: {
        layoutType: "grid",
        width: "100%", height: "auto", padding: "0px", margin: "0px",
        isAbsolute: false, x: 0, y: 0,
        zIndex: 1, opacity: 100, borderRadius: "0px", boxShadow: "none"
    },
    related: {
        settings: TestimonialsSettings
    }
};
