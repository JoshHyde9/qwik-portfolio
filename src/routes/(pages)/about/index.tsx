import { component$ } from "@builder.io/qwik";
import { KnowledgeRow } from "~/components/KnowledgeRow";

export default component$(() => {
  return (
    <>
      <h1 class="text-4xl text-purple-300">About me</h1>
      <p>
        For those who may not know, my name is Josh, but people on the internet
        call me Jim. I am 20 years old and was born in Echuca, Victoria but now
        residing on the Mornington Peninsula. I am a passionate developer and
        have a big emphasis on producing quality products.
      </p>
      &nbsp;
      <p>
        I am a year 12 graduate and have enrolled myself into HarvardX's
        "Computer Science for Web Programming" and have completed the Computer
        Science section of the course and learnt a lot. I am glad to be able to
        use what I have learned and put that knowledge into my projects. If
        you're interested in working together or want to ask a question, please
        do not hesitate to{" "}
        <a
          class="transition ease-in-out duration-300 text-purple-500 hover:text-purple-300"
          href="/contact"
        >
          contact me
        </a>
        .
      </p>
      <h2 class="text-3xl text-purple-300 mt-4">My abilities</h2>
      <div class="container mx-auto">
        <KnowledgeRow
          libraries={["TypeScript", "GraphQL", "Next.js", "Node.js"]}
        />
        <KnowledgeRow
          libraries={["tRPC", "React.js", "JavaScript", "Express.js"]}
        />
        <KnowledgeRow
          libraries={["MongoDB", "Firebase", "PostgreSQL", "Redis"]}
        />
        <KnowledgeRow
          libraries={["TypeORM", "Prisma", "TailwindCSS", "Qwik"]}
        />
      </div>
      <h2 class="text-3xl text-purple-300 mt-4">Do I go outside?</h2>
      <p class="mb-1">
        Believe it or not, I do! I am a fiend for anything on wheels, especially
        bikes. <br /> When I was camping as a little kid, I saw a bloke send
        himself down a mountain on a bike and I thought "That looks like fun!"
        and sure enough I was hooked and do not plan on giving up on it any time
        soon.
      </p>
    </>
  );
});
