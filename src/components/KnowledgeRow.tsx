import { component$ } from "@builder.io/qwik";

type KnowledgeRowProps = {
  libraries: [string, string, string, string];
};

export const KnowledgeRow = component$<KnowledgeRowProps>(({ libraries }) => (
  <div class="flex flex-row mt-3 w-full justify-center text-center">
    {libraries.map((library) => (
      <p key={library} class="w-1/4">
        {library}
      </p>
    ))}
  </div>
));
