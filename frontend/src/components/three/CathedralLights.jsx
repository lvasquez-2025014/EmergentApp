export default function CathedralLights() {
  return (
    <>
      <ambientLight intensity={0.06} color="#fff5e0" />
      {/* Key dramatic top spot */}
      <spotLight
        position={[0, 9, 2]}
        angle={0.42}
        penumbra={0.95}
        intensity={42}
        distance={28}
        decay={1.6}
        color="#f5deb3"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      {/* Side rim */}
      <spotLight
        position={[-7, 4, 3]}
        angle={0.5}
        penumbra={1}
        intensity={14}
        distance={20}
        color="#c4a259"
      />
      {/* Cool back fill */}
      <pointLight position={[0, 2, -6]} intensity={6} color="#3a4a5e" distance={14} />
      {/* Ground bounce */}
      <pointLight position={[0, -1, 4]} intensity={2.5} color="#3a2a14" distance={8} />
    </>
  );
}
