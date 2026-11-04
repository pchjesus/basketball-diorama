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

## v1-2 development notes

The miniature rotates 90° clockwise as a group while camera and lighting stay fixed. Court dimensions are unchanged; wider fencing, a shifted path and reserved school area, and a static passing-machine placeholder provide room for later development. The machine head is grouped for future aiming. Framing was widened for the enlarged platform. Build passed (Vite reports its existing bundle-size warning); Chromium checks at 1440×900 and 932×430 showed no console errors or visible clipping. Mobile was emulated, not tested on a physical Galaxy S24. The machine does not animate or fire.

## v1-3 development notes

Added a two-storey school in the reserved area, with a roof parapet, water tank and two outdoor units; the building and roof equipment are grouped with the rotating miniature. Added crossed net strands, lightweight fence wire panels and open gate leaves. Existing court, camera and rotation are preserved. `npm run build` and `git diff --check` passed; Chromium checks at 1440×900 and 932×430 showed no console errors or visible clipping. The net is too small at the fixed overall view for its individual strands to be reliably judged on screen. Mobile was emulated; physical-device validation was not performed. The Vite bundle-size warning remains.
