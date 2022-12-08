# Data Visualization Final Project

Project Title: Crypto Bubbles: How People’ Emotions Lead To Their Downfalls

By: Serina Tran

![lol](https://user-images.githubusercontent.com/112581692/205417491-c73cf581-00b5-4c5e-9060-e76b92a99e3b.jpeg)

Abstract: Cryptocurrency has arguably been the most active topic in the past half of the decade, equally on the financial markets and in the general media. By 2022, stories about an overnight teenage millionaire on one day and a major company going bankrupt the next day, both due to cryptocurrency, have become common news. Despite financial experts’ general consensus of cryptocurrency being an extremely risky investment, millions of people around the world continue to pour their savings into numerous trading platforms. The goal of this project is to investigate on why so many people risk their financial livelihood for this notoriously volatile instrument. In particular, the project aims to see what historical datasets can reveal about the motivations behind modern crypto trading and how to approach mitigating trading risk. For this project, I utilize datasets on five popular coins and on crypto fear and greed index. Using these datasets, I create relevant interactive visualizations that help me reveal characteristics that are particular to cryptocurrency. The contributions to the project includes: Five (5) interactive line charts that supports pinpointing the exact market capitalization of a crypto coin on a particular day; An (1) area chart that supports depicting the market’s fear and greed index over the months.

Commentary: Due to unforseen circumstances (as explained to the course instructor), this solo project was not started until the very last few weeks of the semester. Being an undergraduate from a non-tech background with almost no coding experiences, the student ran into multiple obstacles producing visualizations for this project due to copious lack of familiarity with the topics. However, with the guidance of resources/links given throughout the course duration, the student learned to code purposefully for the first time all by themselves. Discussing with the instructor also helped the student realize that codes were only one of the multiple aspects of this project. The student was able to utilize their background's skills (research, finance,...) and interests into creating a project in which they ended up learning a lot from. Ultimately, the student is very grateful for the instructor's encouragement to take on this project solo and having experienced both hardship and fun throughout the process.

Link to paper:
https://docs.google.com/document/d/1XMP6e4LHUt-cN0KshEd1MZvFXqzLvOkUMZXUA4cOHsQ/edit#

Link to application/webpage:
https://observablehq.com/d/c21fc685b1adfb8f@590

Video:

https://user-images.githubusercontent.com/112581692/206356525-3431eb10-2e18-42ed-8b78-0ee9bbd4adc6.mp4

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
