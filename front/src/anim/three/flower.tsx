import React, { useRef, Suspense } from 'react'
import { Canvas, useFrame} from '@react-three/fiber'
import { OrbitControls, Environment,} from '@react-three/drei'
import { useControls } from 'leva'

export function FlowerComp() {
  const props = useControls({
    base: { value: '#ff4eb8' },
    colorA: { value: '#00ffff' },
    colorB: { value: '#ff8f00' }
  })
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, -0.75, 0.75], fov: 80, near: 0.001 }}>
      <Suspense fallback={null}>
        <Bg {...props} />
        <Flower {...props} />
        <fog attach="fog" args={['red', 0.1,3]} />
        <mesh>
          <sphereGeometry args={[0.2, 64, 64]} />
          <meshPhysicalMaterial  clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={0.1} />
        </mesh>
        <OrbitControls />
        <pointLight position={[10, 10, 5]} />
        <pointLight position={[-10, -10, -5]} color={props.colorA} />
        <ambientLight intensity={0.4} />
        <Environment preset="warehouse" />
      </Suspense>
    </Canvas>
  )
}

function Bg({ base, colorA, colorB }) {
  // const mesh = useRef()
  // useFrame((state, delta) => {
  //   mesh.current.rotation.x = mesh.current.rotation.y = mesh.current.rotation.z += delta
  // })
  return (
    <mesh scale={100}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshBasicMaterial color={0xffffff} />
      {/* <meshPhysicalMaterial color={colorB} depthWrite={false} transmission={1} thickness={10} roughness={0.65} /> */}
    </mesh>
  )
}

function Flower({ base, colorA, colorB }) {
  const mesh = useRef()
  //const depth = useRef()
  useFrame((state, delta) => {
    mesh.current.rotation.z += delta / 2
    //depth.current.origin.set(-state.mouse.y, state.mouse.x, 0)
  })
  return (
    <mesh rotation-y={Math.PI / 2} scale={[2, 2, 2]} ref={mesh}>
      <color attach="background" args={['red']} />
      <meshPhysicalMaterial  clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={0.1} />
      <torusKnotGeometry args={[0.4, 0.05, 400, 32, 3, 7]} />
    </mesh>
  )
}
