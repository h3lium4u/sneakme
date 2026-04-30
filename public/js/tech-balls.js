// tech-balls.js — Vanilla Three.js + Rapier3D physics
// Exact replica of the TechStack React component
// Requires: THREE loaded globally, window.RAPIER set by module script

function initTechBalls(containerId) {
    const container = document.getElementById(containerId);
    if (!container) { console.error('[TechBalls] container not found:', containerId); return; }

    function waitForRapier(cb, n) {
        n = n || 0;
        if (window.RAPIER) return cb(window.RAPIER);
        if (n > 120) return console.error('[TechBalls] RAPIER never loaded');
        setTimeout(() => waitForRapier(cb, n + 1), 50);
    }

    waitForRapier(function(RAPIER) {
        buildScene(container, RAPIER);
    });
}

function buildScene(container, RAPIER) {
    const W = container.clientWidth;
    const H = container.clientHeight;

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ alpha: true, stencil: false, depth: false, antialias: false });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    container.appendChild(renderer.domElement);

    // ── Scene & Camera ────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32.5, W / H, 1, 100);
    camera.position.set(0, 0, 20);

    // ── Lights ────────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 1));
    const spot = new THREE.SpotLight(0xffffff, 200);
    spot.position.set(20, 20, 25); spot.penumbra = 1; spot.angle = 0.2;
    scene.add(spot);
    const dir = new THREE.DirectionalLight(0xffffff, 2);
    dir.position.set(0, 5, -4);
    scene.add(dir);

    // ── HDR Environment ───────────────────────────────────────────────────────
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    const rgbeLoader = new THREE.RGBELoader();
    rgbeLoader.load('models/char_enviorment.hdr', (hdr) => {
        hdr.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = pmrem.fromEquirectangular(hdr).texture;
        hdr.dispose(); pmrem.dispose();
    });

    // ── Textures / Materials ──────────────────────────────────────────────────
    const loader = new THREE.TextureLoader();
    const imageUrls = [
        'images/tech/react2.webp',
        'images/tech/next2.webp',
        'images/tech/node2.webp',
        'images/tech/express.webp',
        'images/tech/mongo.webp',
        'images/tech/mysql.webp',
        'images/tech/typescript.webp',
        'images/tech/javascript.webp',
    ];
    const materials = imageUrls.map(url => {
        const tex = loader.load(url);
        return new THREE.MeshPhysicalMaterial({
            map: tex, emissive: 0xffffff, emissiveMap: tex,
            emissiveIntensity: 0.3, metalness: 0.5, roughness: 1, clearcoat: 0.1,
        });
    });

    // ── Geometry + Physics ────────────────────────────────────────────────────
    const geo = new THREE.SphereGeometry(1, 28, 28);
    const scaleOpts = [0.7, 1, 0.8, 1, 1];
    const spheres = [];
    function rnd(n) { return (Math.random() - 0.5) * n; }

    for (let i = 0; i < 30; i++) {
        const scale = scaleOpts[Math.floor(Math.random() * scaleOpts.length)];
        const mesh = new THREE.Mesh(geo, materials[Math.floor(Math.random() * materials.length)]);
        mesh.scale.setScalar(scale);
        mesh.rotation.set(0.3, 1, 1);
        scene.add(mesh);

        const rb = world.createRigidBody(
            RAPIER.RigidBodyDesc.dynamic()
                .setTranslation(rnd(20), rnd(20) - 25, rnd(20) - 10)
                .setLinearDamping(0.75).setAngularDamping(0.15)
        );
        world.createCollider(RAPIER.ColliderDesc.ball(scale).setFriction(0.2), rb);
        spheres.push({ mesh, rb, scale });
    }

    // ── Rapier World ──────────────────────────────────────────────────────────
    var world = new RAPIER.World({ x: 0, y: 0, z: 0 });

    // Pointer body (mouse)
    const ptrRb = world.createRigidBody(
        RAPIER.RigidBodyDesc.kinematicPositionBased().setTranslation(100, 100, 100)
    );
    world.createCollider(RAPIER.ColliderDesc.ball(2), ptrRb);

    // ── Mouse ─────────────────────────────────────────────────────────────────
    const mouse = new THREE.Vector2(-9999, -9999);
    container.addEventListener('mousemove', e => {
        const r = container.getBoundingClientRect();
        mouse.x = ((e.clientX - r.left) / container.clientWidth)  * 2 - 1;
        mouse.y = -((e.clientY - r.top)  / container.clientHeight) * 2 + 1;
    });
    container.addEventListener('mouseleave', () => { mouse.set(-9999, -9999); });

    window.addEventListener('resize', () => {
        const w = container.clientWidth, h = container.clientHeight;
        renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix();
    });

    // ── Animate ───────────────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    const tmpV  = new THREE.Vector3();

    function animate() {
        requestAnimationFrame(animate);
        const delta = Math.min(0.1, clock.getDelta());

        // Move pointer to mouse world-space
        if (mouse.x > -999) {
            tmpV.set(mouse.x, mouse.y, 0.5).unproject(camera);
            tmpV.sub(camera.position).normalize();
            const t = -camera.position.z / tmpV.z;
            const wp = camera.position.clone().addScaledVector(tmpV, t);
            ptrRb.setNextKinematicTranslation({ x: wp.x, y: wp.y, z: wp.z });
        } else {
            ptrRb.setNextKinematicTranslation({ x: 100, y: 100, z: 100 });
        }

        // Centering impulse (same as original useFrame)
        spheres.forEach(({ rb, scale }) => {
            const p = rb.translation();
            const len = Math.sqrt(p.x*p.x + p.y*p.y + p.z*p.z);
            if (len > 0) rb.applyImpulse({
                x: p.x/len * -50  * delta * scale,
                y: p.y/len * -150 * delta * scale,
                z: p.z/len * -50  * delta * scale
            }, true);
        });

        world.step();

        // Sync meshes
        spheres.forEach(({ mesh, rb }) => {
            const p = rb.translation(), q = rb.rotation();
            mesh.position.set(p.x, p.y, p.z);
            mesh.quaternion.set(q.x, q.y, q.z, q.w);
        });

        renderer.render(scene, camera);
    }

    animate();
}
