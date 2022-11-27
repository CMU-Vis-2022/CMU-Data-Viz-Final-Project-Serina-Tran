# Data Visualization Final Project

Project Title: Crypto Bubbles: How People’ Emotions Lead To Their Downfalls

Team member: Serina Tran


Link to application/webpage:
https://observablehq.com/d/c21fc685b1adfb8f@590

View this in your browser by running a web server in this folder. For
example:

~~~sh
npx http-server
~~~

Or, use the [Observable Runtime](https://github.com/observablehq/runtime) to
import this module directly into your application. To npm install:

~~~sh
npm install @observablehq/runtime@5
npm install https://api.observablehq.com/d/c21fc685b1adfb8f@590.tgz?v=3
~~~

Then, import your notebook and the runtime as:

~~~js
import {Runtime, Inspector} from "@observablehq/runtime";
import define from "c21fc685b1adfb8f";
~~~

To log the value of the cell named “foo”:

~~~js
const runtime = new Runtime();
const main = runtime.module(define);
main.value("foo").then(value => console.log(value));
~~~
