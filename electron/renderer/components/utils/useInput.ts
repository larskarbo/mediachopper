import { useState } from "react";


export const useInput = (string) => {
    const [text, setText] = useState(string);

    return {
        value: text,
        onChange: (e) => {
            setText(e.target.value);
        }
    }
    
}