canvas.vs.svg
=============

A study which of the two targets is best.

Goal
----

Compare the performance of a [SVG][svg]-based and a [canvas][]-based
view of the same model.

Data
----

In this section we will list data gathered. We gathered the data by
observing the reported frames per second for each of the setups.

1. No visualisation
2. Canvas visualisation
3. SVG visualisation

### Without Collisions

We disabled collisions in this run.

| Number of balls | No visualisation | Canvas | SVG |
|-------|----|----|----|
| 00001 | 60 | 60 | 60 |
| 00002 | 60 | 60 | 60 |
| 00005 | 60 | 60 | 60 |
| 00010 | 60 | 60 | 60 |
| 00020 | 60 | 60 | 60 |
| 00050 | 60 | 60 | 60 |
| 00100 | 60 | 60 | 60 |
| 00200 | 60 | 60 | 45 |
| 00500 | 60 | 60 | 22 |
| 01000 | 60 | 43 | 13 |
| 02000 | 60 | 21 | 06 |
| 05000 | 60 | 08 | 03 |
| 10000 | 60 | 04 | 01 |

### With Collisions

We enabled collisions in this run.

| Number of balls | No visualisation | Canvas | SVG |
|-------|----|----|----|
| 00001 | 60 | 60 | 60 |
| 00002 | 60 | 60 | 60 |
| 00005 | 60 | 60 | 60 |
| 00010 | 60 | 60 | 60 |
| 00020 | 60 | 60 | 60 |
| 00050 | 60 | 60 | 60 |
| 00100 | 60 | 60 | 49 |
| 00200 | 60 | 60 | 30 |
| 00500 | 60 | 21 | 11 |
| 01000 | 07 | 06 | 04 |


[svg]: https://developer.mozilla.org/en-US/docs/Web/SVG
[canvas]: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
