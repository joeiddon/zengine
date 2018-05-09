zengine.js
==========

#### A JavaScript 3D Rendering Engine

iThere are many JavaScript 3D libraries out there, such as [three.js](https://threejs.org/), but I wanted to challenge myself to write the neatest, most simple code that accomplishes rendering objects in 3D to a 2D screen. Ignoring comments, all the code that was necessary to build this to its current functionality is under 100 lines!

---

### Installation

Simply include the source in your application's HTML, no downloading required:

```html
<script src='http://joeiddon.me/zengine/zengine.js'></script>
```

or you can use the shorter `git.io` source:

```html
<script src='http://git.io/zengine.js'></script>
```

---

### Usage

The main use of this library is obviously the rendering capabilities. This is covered below. However functions that are required to render are also available for use as part of the library. Some examples of these include: a dot product function, transformation matricies and distance functions. Feel free to use these but at the time of writing, no documentation has been made for them.

**Prerequisites:**

- All angles are in **degrees**.
- All distances are in arbitary units - relative to each other.
- The coordinate system has the `y-axis` going straight ahead, `x-axis` to the right and `z-axis` going straight up.

The main function - `zengine.render()` - renders a world from the perspective of a camera to a HTML5 Canvas Element.

It has the format:

```javascript
zengine.render(world, cam, canvas, wireframe, horizon);
```

The `world` is described by an array of faces.

Each face is itself an object with attributes:

Attribute  | Meaning
---------- | -------------------------------------
`verts`    | array of vertexes as objecs (e.g. `{x: 0, y: 0, z: 0}`)
`vect`     | the face's unit vector (e.g. `{x: 0, y: 1, z: 0}`)
`col`    | a HSL CSS color string (e.g. `hsl(23, 67%, 60%)`)

This can be summarised by the following general-case format.

```javascript
world = [{verts: [{x: ,y: ,z: }, {x: ,y: ,z: }, ...], vect: {x: ,y: ,z: }, col: }, ...]
```

The `cam` parameter is an object with attributes:

Attribute     | Meaning
------------- | -------------------------------------
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

The `wireframe` parameter takes a boolean indicating whether or not to draw just the outlines of each face. This also speeds up the rendering as face ordering is no longer required, and drawing to the Canvas is marginally faster.

The `horizon` parameter takes a distance, in units relative to the world, for how far you can see. The purpose of this is to speed up rendering. If left `undefined`, defaults to infinity.

---

### Examples

The [demo folder](https://github.com/RoadKillCat/zengine/tree/master/demos) contains example code. You can view the code either by cloning this whole repository with

```shell
git clone https://github.com/RoadKillCat/zengine.git
```

or viewing directly in the webapp.

To actually use each example just visit http://joeiddon.me/zengine/demos.
