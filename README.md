# 10 Random Stories
![Unit tests passed](https://img.shields.io/badge/passed%20tests-10-green)

[Live Demo](https://andersen.studio/random-stories/)

[![Screenshot](readme_assets/screenshot.jpg)](https://andersen.studio/random-stories/)

https://user-images.githubusercontent.com/105841493/174087306-c39136dc-1b0e-45da-b348-9577a7f65548.mp4

10 Random Stories is a web application written in Vue that displays 10 random Hacker News stories selected from the top 500 stories and sorts them by Story Score ascending.

## Installation
```bash
git clone https://github.com/andersen-studio/take-home-merkle-hackernews.git
npm i
```

## Usage

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

#### Run your unit tests
```
npm run test:unit
```

## Questions and answers

### How does it select 10 random stories?
The algorythm selecting 10 random stories is using a modern Fisher-Yates implementation since it runs in **O(n)** `where n = desired output count` while preventing duplicates.

### How is performance handled in relation to API calls?
For the usecase outlined in the requirements, the total API calls to HackerNews API are as follows:
- `01` Get stories
- `10` Get story content
- `10` Get author content
- `21` Total calls

To ensure performant fetching, the flow is as follows:
- Get stories
- For all stories in parallel
  - Get story content
  - then
  - Get author content

Images associated with a story are lazy-loaded after rendering to improve perceived performance.

## Development strategy

### General development flow
- Understanding the requirements specification
- Map out most important components to satisfy these requirements
- Add TypeScript interfaces for HackerNews Stories and Authors
- Add TypeScript interface extending the Stories and Authors to include thumbnail and author in root scope.
- Write test cases for random selection, sorting, and API
- Develop and continually test until all tests pass
- Clean up and optimize
- Test Driven Development was omitted for consumers of the tested code as this was deemed overly verbose given time constraints
- HTML/VUE development to display values
- Several loading stages to ensure good UX
- SCSS framework developed to generate utility classes for common styling tasks such as flexbox, margins, etc.
- Continual revision and tweaks based on linter and manual testing in browser & mobile (Chrome, Android, iPhone) for polish
- Metadata such as manifests, favicon, title, etc. added for overall presentation as well as quick sharing options
- README polish
- Deployment via GitHub actions and DigitalOcean

## License
[MIT](https://choosealicense.com/licenses/mit/)
