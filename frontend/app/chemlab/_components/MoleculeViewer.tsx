"use client";
import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

declare global {
    interface Window {
        $3Dmol: any;
    }
}

interface MoleculeViewerProps {
    moleculeData: {
        type: string;
        data: string;
        surface?: boolean;
    };
    style?: string;
    backgroundColor?: string;
}

const MoleculeViewer = ({ moleculeData, style = 'stick', backgroundColor = 'white' }: MoleculeViewerProps) => {
    const viewerRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [libLoaded, setLibLoaded] = useState(false);

    useEffect(() => {
        if (!libLoaded || !containerRef.current || !window.$3Dmol) return;

        // Clear previous viewer
        containerRef.current.innerHTML = '';

        try {
            // Create viewer
            const config = { backgroundColor };
            const viewer = window.$3Dmol.createViewer(containerRef.current, config);
            viewerRef.current = viewer;

            // Add molecule data
            if (moleculeData.type === 'pdb') {
                viewer.addModel(moleculeData.data, 'pdb');
            } else if (moleculeData.type === 'sdf') {
                viewer.addModel(moleculeData.data, 'sdf');
            } else if (moleculeData.type === 'xyz') {
                viewer.addModel(moleculeData.data, 'xyz');
            } else if (moleculeData.type === 'mol2') {
                viewer.addModel(moleculeData.data, 'mol2');
            }

            // Set style
            viewer.setStyle({}, { [style]: {} });

            // Add surface if specified
            if (moleculeData.surface) {
                viewer.addSurface(window.$3Dmol.SurfaceType.VDW, {
                    opacity: 0.7,
                    colorscheme: 'whiteCarbon'
                });
            }

            // Zoom and render
            viewer.zoomTo();
            viewer.render();
        } catch (error) {
            console.error("Error initializing 3Dmol viewer:", error);
        }

        // Handle resize
        const handleResize = () => {
            if (viewerRef.current) {
                viewerRef.current.resize();
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (viewerRef.current) {
                viewerRef.current.clear();
            }
        };
    }, [moleculeData, style, backgroundColor, libLoaded]);

    return (
        <>
            <Script
                src="https://3Dmol.csb.pitt.edu/build/3Dmol-min.js"
                strategy="lazyOnload"
                onLoad={() => setLibLoaded(true)}
            />
            <div
                ref={containerRef}
                className="w-full h-full"
                style={{ position: 'relative', minHeight: '300px' }}
            >
                {!libLoaded && (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        Loading 3D Viewer...
                    </div>
                )}
            </div>
        </>
    );
};

export default MoleculeViewer;
