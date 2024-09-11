import React, { useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';

const EarthBackground = () => {
    const globeEl = useRef();

    useEffect(() => {
        const globe = globeEl.current;
        globe.controls().autoRotate = true;
        globe.controls().autoRotateSpeed = 1;
    }, []);

    return (
        <div id="globe-container">
            <Globe
                ref={globeEl}
                globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
                backgroundColor="rgba(0,0,0,0)"
                height={2000}
                width={1600}
            />
        </div>
    );
};

export default EarthBackground;
