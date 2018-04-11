zengine.js
==========

#### A JavaScript 3D Rendering Engine

There are many JavaScript 3D libraries out there, such as [three.js](https://threejs.org/), but I wanted to challenge myself to write the neatest, most simple code that accomplishes rendering objects in 3D to a 2D screen. Ignoring comments, all the code that was necessary to build this to its current funcitonality is under 100 lines!

---

### Installation

Simply include the source in your application's HTML, no downloading required:

```html
<script src='http://joeiddon.me/zengine/zengine.js'></script>
```

---

### Usage

*N.B. The below is nearly identical to that of the source itself, the code is so short (and commented) I highly reccommend you just read it!*

The main function - `zengine.render()` - renders a world from the perspective of a camera to a HTML5 Canvas Element.

It has the format:

```javascript
render(world, cam, canvas, wireframe, horizon)
```

- The `world` is described by an array of faces.

Each face is itself described by an object with attributes:

- `verts` - an array of coordinates each described by an object with `x`, `y` and `z` attributes (either floats or integers).

- `col` - a CSS color string.

This can be summarised by the following general-case format.

```javascript
world = [{verts: [{x: ,y: ,z: }, {x: ,y: ,z: }, ...], col: }, ...]
```

- The `cam` parameter is an object, described by this table:

Attribute | Meaning
------- | -------------------------------------
`x`, `y`, `z` | cooridinate in 3D Cartesian Geometry,
`yaw`         | rotation left to right,
`pitch`       | rotation up and down,
`roll`        | rotation about the "forward" axis,
`fov`         | the, horizontal, field of view, in degrees.

This can be seen in the following general-case format.

```javascript 
cam = {x: ,y: ,z: ,yaw: ,pitch: ,roll: ,fov: }
```

- The `canvas` parameter should be a HTML Canvas Element Object.

*WARNING: calling this function will blank the canvas before drawing to it.*

- The `wireframe` parameter takes a boolean indicating whether or not to draw just the outlines of each face. This also speeds up the rendering as face ordering is no longer required, and drawing to the Canvas is marginally faster.

- The `horizon` parameter takes a distance, in units relative to the world, for how far you can see. The purpose of this is to speed up rendering. If left `undefined`, defaults to infinity.

---

### Examples

The [demo folder](https://github.com/RoadKillCat/zengine/tree/master/demos) contains example code. You can view the code either by cloning this whole repository with

```shell
git clone https://github.com/RoadKillCat/zengine.git
```

or viewing directly in the webapp.

To actually use each example just visit http://joeiddon.me/zengine/demos.
