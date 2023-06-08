import React from "react";

export default function useButton() {
    const buttonRef = React.useRef<HTMLButtonElement | HTMLAnchorElement>(null)
    function clickButton() {
        if(buttonRef.current) {
            buttonRef.current.click();
        } else {
            null
        }
    }
    return {buttonRef,clickButton};
}