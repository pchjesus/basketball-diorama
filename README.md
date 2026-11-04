# Basketball Diorama

An autonomous isometric 3D basketball diorama inspired by Klay Thompson's playstyle.

## Development goals

- Build a low-poly isometric basketball court with Three.js.
- Simulate a single basketball player who plays autonomously without user input.
- Center the player's style on Klay Thompson-inspired catch-and-shoot play.
- Implement three-point shots, two-point shots, and layups.
- Add a compact automatic passing machine that rotates toward the player's position.
- Develop and validate the simulator in stages.

## Run locally

Requires Node.js 20.19+ or 22.12+. Install with `npm ci`, start with `npm run dev`, and create a production build with `npm run build`.

## v1-1 development notes

A static Three.js outdoor court scene establishes the miniature platform, uniformly scaled NBA-proportion court, one hoop, fence and entrance, reserved school area, path, drain, tree, benches, lamps, orthographic camera and sunset lighting. Court dimensions are in metres multiplied by √0.75; the court is centred on x=0, z=3.5. Add future objects in the same coordinate system.

Validated: production build and Chromium rendering at 1440×900 and 932×430 (mobile viewport emulation); no browser console errors after correcting the missing favicon. Actual devices were not tested. Vite reports a bundle-size warning for Three.js. The reference images informed the teal backdrop, warm miniature lighting and the school-area → walkway → drain → court arrangement. The camera was rotated 90° around the scene from the initial implementation; the exact reference-relative angle is an approximation. Fence mesh, net and shadows are simplified. The school, player, passing machine, physics and controls remain future work.

No earlier application or tests existed to regress. Structural refactoring is not currently warranted; reconsider splitting the scene as independent animated objects are added.

The image-guided update preserves court coordinates and scale, moves the tree and benches to the walkway, adds translucent fence infill and deepens the platform. Rechecked in Chromium at 1440×900 and 932×430; no console errors. Real-device and public-site validation remain unperformed.
