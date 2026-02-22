(function () {
    const Engine = Matter.Engine,
        Runner = Matter.Runner,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Body = Matter.Body;

    function initPhysics() {
        const container = document.querySelector('.dropping-texts');
        if (!container) return;

        // Container dimensions
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Create engine
        const engine = Engine.create();
        const world = engine.world;

        // Gravity setting
        engine.world.gravity.y = 1.2;

        // Create boundaries
        const wallOptions = {
            isStatic: true,
            render: { visible: false },
            restitution: 0.2
        };

        // Custom floor specifically for the container bottom
        const ground = Bodies.rectangle(width / 2, height + 10, width, 20, wallOptions);
        const leftWall = Bodies.rectangle(-10, height / 2, 20, height * 4, wallOptions);
        const rightWall = Bodies.rectangle(width + 10, height / 2, 20, height * 4, wallOptions);

        World.add(world, [ground, leftWall, rightWall]);

        const wordElements = container.querySelectorAll('div');
        const wordBodies = [];

        // Save original rects to calculate starting positions safely
        const originalRects = Array.from(wordElements).map(el => {
            const rect = el.getBoundingClientRect();
            return {
                w: rect.width || 200, // fallback
                h: rect.height || 50
            };
        });

        wordElements.forEach((el, index) => {
            const w = originalRects[index].w;
            const h = originalRects[index].h;

            // Start positions: drop them from above the container sequentially
            const startX = width / 2 + (Math.random() - 0.5) * 100; // slightly randomized x
            const startY = -h - (index * 80); // stagger their drop heights

            const body = Bodies.rectangle(startX, startY, w, h * 0.8, { // slightly smaller hitbox for overlapping aesthetics
                restitution: 0.6, // Bounciness
                friction: 0.1,
                frictionAir: 0.05, // Slight drag
                density: 0.05,
                chamfer: { radius: 10 } // Rounded corners
            });

            // Random slight rotation
            Body.setAngle(body, (Math.random() - 0.5) * 0.3);

            World.add(world, body);
            wordBodies.push({ body, el, width: w, height: h });

            // visual states
            el.addEventListener('mousedown', () => el.style.cursor = 'grabbing');
            el.addEventListener('mouseup', () => el.style.cursor = 'grab');
        });

        // Add mouse control
        const mouse = Mouse.create(container);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false }
            }
        });

        // Prevent default scrolling when interacting with physics elements
        mouseConstraint.mouse.element.removeEventListener('mousewheel', mouseConstraint.mouse.mousewheel);
        mouseConstraint.mouse.element.removeEventListener('DOMMouseScroll', mouseConstraint.mouse.mousewheel);

        World.add(world, mouseConstraint);

        // Sync DOM elements with physics bodies
        Matter.Events.on(engine, 'afterUpdate', function () {
            wordBodies.forEach(({ body, el, width, height }) => {
                const x = body.position.x - width / 2;
                const y = body.position.y - height / 2;
                const angle = body.angle;

                el.style.transform = `translate(${x}px, ${y}px) rotate(${angle}rad)`;
            });
        });

        // Run the engine
        Runner.run(Runner.create(), engine);

        // Handle Resize
        window.addEventListener('resize', () => {
            const newWidth = container.clientWidth;
            const newHeight = container.clientHeight;
            Body.setPosition(ground, { x: newWidth / 2, y: newHeight + 10 });
            Body.setPosition(rightWall, { x: newWidth + 10, y: newHeight / 2 });
        });
    }

    // Wait for fonts to load before initializing physics so dimensions are correct
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(initPhysics);
    } else {
        window.addEventListener('load', initPhysics);
    }
})();
