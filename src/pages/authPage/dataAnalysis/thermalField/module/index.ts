import { TEngine } from '@/3DEngine'
import { Lut } from 'three/examples/jsm/Addons'
import { BufferGeometryLoader, Color, DoubleSide, Float32BufferAttribute, Mesh, MeshLambertMaterial,  } from 'three'

function updateColors(mesh: Mesh) {
    const lut = new Lut()
    lut.setColorMap('rainbow');
    lut.setMax(2000);
    lut.setMin(0);
    const geometry = mesh.geometry;
    const pressures = geometry.attributes.pressure;
    const colors = geometry.attributes.color;
    const color = new Color();
    for (let i = 0; i < pressures.array.length; i++) {
        const colorValue = pressures.array[i];
        color.copy(lut.getColor(colorValue)).convertSRGBToLinear();
        colors.setXYZ(i, color.r, color.g, color.b);
    }
    colors.needsUpdate = true;
}


export function add(TEngineInstance: TEngine) {
    new BufferGeometryLoader().load('/json/pressure.json', (geometry) => {
        geometry.center();
        geometry.computeVertexNormals();
        const mesh = new Mesh(geometry, new MeshLambertMaterial({
            side: DoubleSide,
            color: 0xFFFFFF,
            vertexColors: true
        }));

        const colors = [];
        for (let i = 0, n = geometry.attributes.position.count; i < n; ++i) {
            colors.push(1, 1, 1);
        }
        geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
        mesh.scale.set(10, 10, 10)
        updateColors(mesh)
        TEngineInstance.scene.add(mesh)
    })
}

