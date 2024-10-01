import { Fragment } from "react";

// * Just a text rendering compontent with newline character (\n) support
export function Text({ text, className, style }) {
    return (
        <p className={className} style={style}>
            {text.split("\n").map((sentence, index, arr) => (
                <Fragment key={sentence}>
                    {sentence}
                    {index !== arr.length - 1 && <br />}
                </Fragment>
            ))}
        </p>
    );
}
