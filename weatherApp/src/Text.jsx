import React from "react"
import styles from "./bubble.module.css";


const Text = () => {
    return (
        <div className="text-center text-neutral-100 p-5 rounded-lg shadow-xl bg-slate-500 bg-opacity-30">
            <h2 className="text-7xl font-light">
                {"Weather Forcast".split("").map((child, idx) => (
                    <span className={styles.hoverText} key={idx}>
                        {child}
                    </span>
                ))}
            </h2>
        </div>
    );
}

export default Text;