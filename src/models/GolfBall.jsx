import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import golfBallModel from '../assets/3d/golf_ball_lp.glb'

const GolfBall = (props) => {
    const { nodes, materials } = useGLTF(golfBallModel)

    return (
        <group {...props} dispose={null} scale={.5}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_2.geometry}
                material={materials.lambert2SG}
                rotation={[-Math.PI / 2, 0, 0]}
            />
        </group>
    )
}

useGLTF.preload(golfBallModel)

export default GolfBall;