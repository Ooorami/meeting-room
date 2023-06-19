import React from "react";

interface TextProps {
    textClassName?: string;
}

const Text = ({text}, textProps: TextProps) => {
    return (
        <div className={textProps.textClassName}>
            <p> {text} </p>
        </div>
    );
};

export default Text;