# dupligrid

A creative drawing tool built with Vue 3. Draw freely in the top-left quadrant and watch your artwork instantly mirror across all four sections of a 2×2 canvas — giving your strokes a kaleidoscopic, symmetrical result with no extra effort. Each cell is individually colorable by clicking or dragging, with a pen color picker and optional grid lines to guide your work.

## How it works

The canvas is divided into a 2×2 arrangement of grids separated by gutter strips and a single center cell. Only the top-left quadrant, its adjacent gutters, and the center cell are directly editable. The remaining three quadrants automatically reflect your strokes:

| Quadrant     | Editable | Mirror Orientation                |
| ------------ | -------- | --------------------------------- |
| Top-left     | ✅ Yes   | Source                            |
| Top-right    | ❌ No    | Flipped horizontally              |
| Bottom-left  | ❌ No    | Flipped vertically                |
| Bottom-right | ❌ No    | Flipped horizontally & vertically |

## Components

| Component           | Description                                                                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `App.vue`           | Root component. Manages global state (pen color, grid size) and wires `Tools` to `ContainerGrid`.                                                 |
| `ContainerGrid.vue` | Orchestrates the full 2×2 layout. Propagates cell changes from editable areas to their mirrored counterparts.                                     |
| `Grid.vue`          | A single N×N grid of `Cell` components. Rendered four times — once per quadrant — with a different `orientation` prop controlling the flip.       |
| `GutterGrid.vue`    | A single-row or single-column strip of cells running between quadrants. Editable on two sides, mirrored on the other two.                         |
| `Cell.vue`          | The individual drawable unit. Responds to `mousedown` and `mouseenter` for click-and-drag coloring. Emits `cellClicked` for the parent to mirror. |
| `Tools.vue`         | Toolbar housing the pen color picker, grid lines toggle checkbox, and a clear button.                                                             |
| `PenColor.vue`      | Thin wrapper around a native `<input type="color">` that emits `colorChanged` events up the component tree.                                       |

## Setup

```sh
npm install
```

## Scripts

| Command           | Description                                                                      |
| ----------------- | -------------------------------------------------------------------------------- |
| `npm run dev`     | Start the Vite dev server at `http://localhost:3003` with hot module replacement |
| `npm run build`   | Type-check with `vue-tsc` then bundle for production                             |
| `npm run preview` | Locally preview the production build at `http://localhost:3003`                  |
| `npm run lint`    | Lint all `.vue` and `.ts` files in `src/` with ESLint                            |
| `npm run publish` | Run the custom publish script to deploy the built site                           |
