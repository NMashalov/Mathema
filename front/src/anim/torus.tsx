function Cube(){
    const refContainer = useRef(null);
    useEffect(() => {
        const vertices = [];
        const tempPosition = new THREE.Vector3();
        for (let i = 0; i < 15000; i ++) {
        sampler.sample(tempPosition);
        vertices.push(tempPosition.x, tempPosition.y, tempPosition.z);
        }

        /* Create a geometry from the coordinates */
        const pointsGeometry = new THREE.BufferGeometry();
        pointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

        /* Create a material */
        const pointsMaterial = new THREE.PointsMaterial({
        color: 0xff61d5,
        size: 0.03
        });
        /* Create a Points object */
        const points = new THREE.Points(pointsGeometry, pointsMaterial);

        /* Add the points into the scene */
        scene.add(points);
    },[])

    return <div ref={refContainer}></div>
}