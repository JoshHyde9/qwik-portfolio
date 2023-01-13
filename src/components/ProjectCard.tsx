import { component$ } from "@builder.io/qwik";

import { Icon } from "./Icon/Icon";

type ProjectCardProps = {
  techStack: string;
  name: string;
  imageURL: string;
  deployedLink: string;
  githubLink: string;
};

export const ProjectCard = component$<ProjectCardProps>(
  ({ techStack, name, imageURL, deployedLink, githubLink }) => {
    return (
      <div class="lg:bg-gradient-to-t lg:from-stone-900 rounded-md mx-auto text-center p-3 pb-0">
        <h1 class="text-4xl font-semibold mb-2 lg:ml-10">{name}</h1>
        <div class="flex flex-col lg:flex-row lg:items-center lg:max-w-screen-lg">
          <div class="mb-2 lg:relative lg:w-52 lg:-rotate-90">
            <div class="lg:absolute lg:w-full">
              <h2 class="w-full h-full">{techStack}</h2>
            </div>
          </div>
          <div class="w-full">
            <img class="rounded-b-lg w-full h-auto" src={imageURL} alt={name} />
          </div>
          <div class="flex flex-col items-center lg:gap-2 lg:pl-2 lg:h-60 lg:w-40 lg:justify-evenly">
            <a
              href={deployedLink}
              rel="noreferrer"
              target="_blank"
              class="fancy-button overflow-hidden inline-block lg:my-2"
            >
              <span>Have a geez</span>
            </a>
            <a href={githubLink} rel="noreferrer" target="_blank">
              <Icon
                name="GitHub"
                size="40"
                class="mb-1 h-10 fill-purple-500 hover:fill-purple-300 transition ease-in-out duration-300"
              />
            </a>
          </div>
        </div>
      </div>
    );
  }
);
