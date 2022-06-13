import { HackerNewsStory } from "./HackerNewsStory";
import { HackerNewsUser } from "./HackerNewsUser";

export interface Story extends HackerNewsStory {
  thumbnail: String,
  author: HackerNewsUser
}