import { HackerNewsStory } from "./HackerNewsStory";
import { HackerNewsUser } from "./HackerNewsUser";

export interface Story extends HackerNewsStory {
  thumbnail: string,
  author: HackerNewsUser
}