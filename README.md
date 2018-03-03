zengine.js
==========

#### A JavaScript 3D Rendering Engine ####

There are many JavaScript 3D libraries out there, such as [three.js](https://threejs.org/), but I wanted to challenge myself to write the neatest, most simple code that accomplishes a similar result. Ignoring comments, all the code that was necessary to create this to it's current level is under 100 lines!

### Installation ###

Simply include the source in your application's HTML, no downloading required:

```html
<script src="http://joeiddon.me/zengine/zengine.js"></script>
```

### How to Use ###

*N.B. The below is nearly identical to that of the source itself, the code is so short (and commented) I highly reccommend you just read it!*

The main function - `zengine.render()` - renders a world from the perspective of a camera to a Canvas, with a wireframe option.

The `world` is described by an array of faces.

Each face is itself described by an object with attributes: `verts` for verticies and `col` for colour.

The value of `verts` should be an array of coordinates - each described by an object with `x`, `y` and `z` attributes (either floats or integers).

The value of `col` should be a CSS color string.

This can be summarised by the following general-case format.

```javascript
world = [{verts: [{x: ,y: ,z: }, {x: ,y: ,z: }, ...], col: }, ...]
```

The cam is merely an object, described by this table:

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

The `canvas` parameter should be a HTML Canvas Element Object.

*WARNING: calling this function will blank the canvas before drawing to it.*

The wireframe parameter takes a boolean - indicating whether or not to draw just the outlines of each face. This also speeds up the rendering as face ordering is no longer required, and drawing to the Canvas is marginally faster.
