import { Vector3, CatmullRomCurve3 } from 'three'
import React, { useRef, useMemo } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline'

extend({ MeshLine, MeshLineMaterial })


const r = () => Math.max(0.2, Math.random())

interface FatlineProps{
  color: string,
  curve: Vector3[]
}

function Fatline({ curve, color }: FatlineProps) {
  const material = useRef()
  useFrame((state, delta) => {
    material.current.uniforms.dashOffset.value -= delta / 100
    console.log('Fatline')
},1)
  return (
    <mesh>
      <meshLineGeometry points={curve} />
      <meshLineMaterial
        ref={material}
        transparent 
        lineWidth={0.01} 
        color={color} 
        dashArray={0.1} 
        dashRatio={0.99} 
        />
    </mesh>
  )
}


interface FirefliesProps{
  count: number,
  colors: string[],
  radius: number,
}

export default function Fireflies({ count , colors, radius = 10 } : FirefliesProps) {
  const lines = useMemo(
    () =>
      new Array(count).map(() => {
        const pos = new Vector3(Math.sin(0) * radius * r(), Math.cos(0) * radius * r(), 0)
        const points = new Array(30).fill(0).map((_, index) => {
          const angle = (index / 20) * Math.PI * 2
          return pos.add(new Vector3(Math.sin(angle) * radius * r(), Math.cos(angle) * radius * r(), 0)).clone()
        })
        const curve = new CatmullRomCurve3(points).getPoints(100)
        console.log('')
        return {
          color: colors[0],
          curve,
        }
      }),
    [count, radius, colors],
  )
  return (
    <group position={[-radius * 2, -radius, 0]}>
      {lines.map((props, index) => 
        <Fatline key={index} {...props} />
      )}
    </group>
  )
}