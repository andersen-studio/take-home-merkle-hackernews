# 10 Random Stories
![Passed tests](https://img.shields.io/badge/passed%20tests-14-green)

10 Random Stories is a web application written in Vue that displays 10 random Hacker News stories selected from the top 500 stories and sorts them by Story Score.

[Hosted demo](https://andersen.studio/random-stories/)

## Notable features
- Test Driven Development followed for: API Consumer, Random selection from larger sample, sorting by score.
- Loading stages while: Fetching story list, story content, author content, background image.
- TypeScript was used to reduce mental overhead and type errors for API response types in particular
- Production-ready and hosted on DigitalOcean
- Partial use of SCSS ( CSS-precompiler )
- Home-brewed SCSS Utility class generator

## Installation

Using [git](https://git-scm.com/) and [npm](https://npmjs.com/).

```bash
git clone https://github.com/andersen-studio/take-home-merkle-hackernews.git
npm i
```

## Usage

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

## Development Strategy
The development process for critical logic follows Test Driven Development ( TDD ) methodologies to enforce clarity in behavior and gain insight into which pieces needed to be developed first, following a bottom-up approach to the feature roadmap.
- Write failing tests
- Develop minimum amount of code to pass tests
- Consider time and space complexity
- Revise and clean-up, optimize if possible
- Consider if more tests are needed, otherwise repeat for the next logical task

## Notes
When time is of the essence, not everything can follow a thorough TDD flow, so it is imperative that the most critical functions are battle-tested and can be relied upon.

I hope you enjoy the [demo!](https://andersen.studio/random-stories)

## License
[MIT](https://choosealicense.com/licenses/mit/)