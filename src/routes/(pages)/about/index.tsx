import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";

import { KnowledgeRow } from "~/components/KnowledgeRow";

export default component$(() => {
  return (
    <section class="max-w-prose mx-auto mt-10">
      <h1 class="text-4xl text-purple-300">About me</h1>
      <p class="mb-2">
        For those who may not know, my name is Josh, but people on the internet
        call me Jim. I am 21 years old and was born in Echuca, Victoria but now
        residing in Melbourne. I am a passionate developer and have a big
        emphasis on producing quality products.
      </p>

      <p>
        I am a year 12 graduate and have successfully completed HarvardX's
        "CS50's Web Programming with Python and JavaScript". I found what I had
        learned extremely valuable and gave me a confidence boost in being able
        to contribute to more OSS. If you're interested in working together or
        want to ask a question, please do not hesitate to{" "}
        <a
          class="transition ease-in-out duration-300 text-purple-500 hover:text-purple-300"
          href="/contact"
          aria-label="Read more about how to contact me"
        >
          contact me
        </a>
        .
      </p>
      <h2 class="text-3xl text-purple-300 mt-4">Tech I like</h2>
      <div class="container mx-auto">
        <KnowledgeRow libraries={["TypeScript", "Qwik", "Next.js", "tRPC"]} />
        <KnowledgeRow
          libraries={["Node.js", "React.js", "JavaScript", "Express.js"]}
        />
        <KnowledgeRow
          libraries={["MySQL", "Firebase", "PostgreSQL", "Redis"]}
        />
        <KnowledgeRow libraries={["TypeORM", "Prisma", "Docker", "GraphQL"]} />
      </div>
      <h2 class="text-3xl text-purple-300 mt-4">Do you go outside?</h2>
      <p class="mb-1">
        Believe it or not, I do! I am a fiend for anything on wheels, especially
        bikes. <br /> When I was camping as a little kid, I saw a bloke send
        himself down a mountain on a bike and I thought "That looks like fun!"
        and sure enough I was hooked and do not plan on giving up on it any time
        soon.
      </p>
      <h2 class="text-3xl text-purple-300 mt-4">
        What made you interested in programming?
      </h2>
      <p class="mb-1">
        I was <span class="italic">that kid</span> at school and still am (just
        not at school because I am not a nneeerrrrrddd.) Ever since I got my
        grubby, little hands on a computer, I was fascinated with how it all
        works, like how does keystoke on a keyboard turn into a letter
        displaying on a screen? Magic? Nah that can't be it. So... trying to
        debunk magic is what made me interested.
      </p>
      <h2 class="text-3xl text-purple-300 mt-4">
        What made you choose web dev?
      </h2>
      <p class="mb-1">
        I have tried hardware, game (also game modding), desktop and malicious
        programming. What made web dev stick out to the rest of the bunch is
        that there are some <span class="italic">hot garbage</span> websites /
        web apps out there and I believe that I can make a very small difference
        to said hot garbage.
      </p>
    </section>
  );
});

export const head: DocumentHead = {
  title: "About Me",
  meta: [
    {
      name: "og:title",
      content: "About Me",
    },
    {
      name: "description",
      content:
        "Want to learn more about me as a person or my skills? Funnily enough, this page is the best way to found that out.",
    },
    {
      name: "og:description",
      content:
        "A handy dandy website for displaying my accomplishments, skills, experiences, and attributes.",
    },
    {
      name: "url",
      content: "https://dev.joshhyde.me/about",
    },
    {
      name: "og:url",
      content: "https://dev.joshhyde.me/about",
    },
    {
      name: "twitter:title",
      content: "About Me",
    },
    {
      name: "twitter:description",
      content:
        "A handy dandy website for displaying my accomplishments, skills, experiences, and attributes.",
    },
  ],
};
