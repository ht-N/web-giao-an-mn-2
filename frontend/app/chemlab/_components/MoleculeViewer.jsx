import {
  useEffect,
  useRef,
} from 'react';

const MoleculeViewer = ({ moleculeData, style = 'stick', backgroundColor = 'white' }) => {
    const viewerRef = useRef(null)
    const containerRef = useRef(null)

    useEffect(() => {
        if (!containerRef.current || !window.$3Dmol) return

        // Clear previous viewer
        containerRef.current.innerHTML = ''

        // Create viewer
        const config = { backgroundColor }
        const viewer = window.$3Dmol.createViewer(containerRef.current, config)
        viewerRef.current = viewer

        // Add molecule data
        if (moleculeData.type === 'pdb') {
            viewer.addModel(moleculeData.data, 'pdb')
        } else if (moleculeData.type === 'sdf') {
            viewer.addModel(moleculeData.data, 'sdf')
        } else if (moleculeData.type === 'xyz') {
            viewer.addModel(moleculeData.data, 'xyz')
        } else if (moleculeData.type === 'mol2') {
            viewer.addModel(moleculeData.data, 'mol2')
        }

        // Set style
        viewer.setStyle({}, { [style]: {} })

        // Add surface if specified
        if (moleculeData.surface) {
            viewer.addSurface(window.$3Dmol.SurfaceType.VDW, {
                opacity: 0.7,
                colorscheme: 'whiteCarbon'
            })
        }

        // Zoom and render
        viewer.zoomTo()
        viewer.render()

        // Handle resize
        const handleResize = () => {
            if (viewerRef.current) {
                viewerRef.current.resize()
            }
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            if (viewerRef.current) {
                viewerRef.current.clear()
            }
        }
    }, [moleculeData, style, backgroundColor])

    return (
        <div
            ref={containerRef}
            className="w-full h-full"
            style={{ position: 'relative' }}
        />
    )
}

export default MoleculeViewer
