import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import { extend, Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { easing } from 'maath'
import { useControls } from 'leva'

extend({ MeshLineGeometry, MeshLineMaterial })

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 80], fov: 50 }}>
      <color attach="background" args={['#101020']} />
      <Lines  count={40} colors={[[10, 0.5, 2], [1, 2, 10], '#A2CCB6', '#FCEEB5', '#EE786E', '#e0feff']} />
  
      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={1} radius={0.6} />
      </EffectComposer>
    </Canvas>
  )
}
const r = () => Math.max(0.2, Math.random())

function Lines({ dash, count, colors, radius =10, rand = THREE.MathUtils.randFloatSpread }) {
  const lines = useMemo(() => {
    return Array.from({ length: count }, () => {
      // const pos = new THREE.Vector3(rand(radius), rand(radius), rand(radius))
      // const points = Array.from({ length: 10 }, () => pos.add(new THREE.Vector3(rand(radius), rand(radius), rand(radius))).clone())
      // const curve = new THREE.CatmullRomCurve3(points).getPoints(10)

      const pos = new THREE.Vector3(Math.sin(0) * radius * r(), Math.cos(0) * radius * r(), 0)
      const points = new Array(30).fill(0).map((_, index) => {
          const angle = (index / 20) * Math.PI * 2
          return pos.add(new THREE.Vector3(Math.sin(angle) * radius * r(), Math.cos(angle) * radius * r(), 0)).clone()
        })
      const curve = new THREE.CatmullRomCurve3(points).getPoints(5)
      return {
        color: colors[parseInt(colors.length * Math.random())],
        curve: curve.flatMap((point) => point.toArray())
      }
    })
  }, [colors, count, radius])
  return lines.map((props, index) => <Fatline key={index} dash={dash} {...props} />)
}
function Fatline({ curve, color }) {
  const material = useRef()
  useFrame((state, delta) => {
    material.current.uniforms.dashOffset.value -= delta / 50
    console.log('Fatline')
  },1)
  return (
    <mesh>
      <meshLineGeometry points={curve} />
      <meshLineMaterial
        ref={material}
        transparent 
        lineWidth={0.5} 
        color={color} 
        dashArray={1} 
        dashRatio={0.99} 
        />
    </mesh>
  )
}

