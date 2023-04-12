import React from 'react';
import Particles from 'react-tsparticles';
import { useCallback } from "react";
import type { Container, Engine } from "tsparticles-engine";
import {loadFirePreset} from "tsparticles-preset-fire";

interface Props {
    children: React.ReactNode;
}


function Background({ children }: Props) {
    const particlesInit = useCallback(async (engine: Engine) => {
        console.log(engine);

        // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFirePreset(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
        await console.log(container);
    }, []);

    return (
        <div style={{ position: 'relative' }}>
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{preset: "fire"}}
        />
            {children}
        </div>
    );
}

export default Background;