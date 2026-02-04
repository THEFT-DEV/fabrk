import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "@/components/ui/button";
import React from "react";

describe("Button Component", () => {
    it("renders correctly with default props", () => {
        render(<Button>Click me</Button>);
        const button = screen.getByRole("button", { name: /click me/i });
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass("bg-primary");
    });

    describe("Variants", () => {
        const variants = [
            { name: "default", class: "bg-primary" },
            { name: "destructive", class: "bg-destructive" },
            { name: "outline", class: "border-foreground/20" },
            { name: "secondary", class: "bg-secondary" },
            { name: "ghost", class: "hover:bg-foreground/10" },
            { name: "link", class: "text-primary underline-offset-4" },
        ] as const;

        variants.forEach((variant) => {
            it(`renders ${variant.name} variant correctly`, () => {
                render(<Button variant={variant.name}>Button</Button>);
                const button = screen.getByRole("button");
                expect(button).toHaveClass(variant.class);
            });
        });
    });

    describe("Sizes", () => {
        const sizes = [
            { name: "default", class: "h-8" },
            { name: "sm", class: "h-7" },
            { name: "lg", class: "h-9" },
            { name: "icon", class: "h-10 w-10" },
        ] as const;

        sizes.forEach((size) => {
            it(`renders ${size.name} size correctly`, () => {
                render(<Button size={size.name}>Button</Button>);
                const button = screen.getByRole("button");
                expect(button).toHaveClass(size.class);
            });
        });
    });

    describe("Loading State", () => {
        it("shows loading text and spinner when loading is true", () => {
            render(<Button loading>Submit</Button>);
            const button = screen.getByRole("button");
            expect(button).toBeDisabled();
            expect(screen.getByText("Loading...")).toBeInTheDocument();
            // Check for spinner (Loader2)
            expect(button.querySelector(".animate-spin")).toBeInTheDocument();
        });

        it("shows custom loading text", () => {
            render(<Button loading loadingText="Processing...">Submit</Button>);
            expect(screen.getByText("Processing...")).toBeInTheDocument();
        });

        it("sets aria-busy and aria-label when loading", () => {
            render(<Button loading loadingText="Wait">Submit</Button>);
            const button = screen.getByRole("button");
            expect(button).toHaveAttribute("aria-busy", "true");
            expect(button).toHaveAttribute("aria-label", "Wait");
        });
    });

    describe("Interactions", () => {
        it("calls onClick handler when clicked", () => {
            const handleClick = vi.fn();
            render(<Button onClick={handleClick}>Click me</Button>);
            fireEvent.click(screen.getByRole("button"));
            expect(handleClick).toHaveBeenCalledTimes(1);
        });

        it("does not call onClick when disabled", () => {
            const handleClick = vi.fn();
            render(<Button disabled onClick={handleClick}>Click me</Button>);
            fireEvent.click(screen.getByRole("button"));
            expect(handleClick).not.toHaveBeenCalled();
        });

        it("does not call onClick when loading", () => {
            const handleClick = vi.fn();
            render(<Button loading onClick={handleClick}>Click me</Button>);
            fireEvent.click(screen.getByRole("button"));
            expect(handleClick).not.toHaveBeenCalled();
        });
    });

    describe("Polymorphism", () => {
        it("renders as a different element when asChild is true", () => {
            render(
                <Button asChild>
                    <a href="/link">Link Button</a>
                </Button>
            );
            const link = screen.getByRole("link", { name: /link button/i });
            expect(link).toBeInTheDocument();
            expect(link).toHaveAttribute("href", "/link");
            expect(link).toHaveClass("inline-flex items-center"); // Should still have button classes
        });
    });
});
