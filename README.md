# WasedaTime

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-13-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/wasedatime/wasedatime-web/blob/master/LICENSE.md) [![Build Status](https://travis-ci.com/wasedatime/wasedatime-web.svg?branch=master)](https://travis-ci.com/wasedatime/wasedatime-web) [![All Contributors](https://img.shields.io/badge/all_contributors-8-orange.svg?style=flat-square)](#contributors)

[WasedaTime](https://wasedatime.com) (stands for Waseda Timetable) is a non-profit & student-run open source web app for syllabus searching, course reviews and bus schedule checking at Waseda University. We aim at supporting and improving campus lives of Waseda University students.

## Getting Started

Currently this section is yet to be completed/refined. We will update it as frequent as possible.

### Prerequisites

### Installing

```bash
git clone https://github.com/wasedatime/wasedatime-web.git
cd wasedatime-web

# configure @bit as a npm scoped registry since we are using some common components on bit.dev
npm config set @bit:registry https://node.bit.dev
# If the above command does not work, try this:
npm config set '@bit:registry' https://node.bit.dev

# move into 'root' folder and install packages (same execution for 'syllabus', 'campus', 'career' directory)
cd root
npm ci
```

### Running the app for developing

You may meet errors when you run wasedatime-web locally and then access Syllabus page without having a .env file. Please contact us if you need the .env file, while it is not necessary to have it if the development you are engaging in is not related with Syllabus page.

```bash
# move to 'root' directory and run all frontends together locally
cd wasedatime-web/root
npm run local

# * run any frontend alone
npm run start:standalone
```

### Create a new project (frontend) in WasedaTime

Will be updated soon.

### App Architecture

Frontend (client):

- Micro-frontend (https://martinfowler.com/articles/micro-frontends.html?utm_source=arador.com)
- Description of our frontend architecture (in Micro-frontends) will be updated soon.

Serverless backend:

![App Architecture](/docs/images/AWSArch.png)

### Continuous Integration and Deployment

This project is deployed on a remote server and uses Travis CI for continuous integration and deployment. You can learn more about the setup process at [ContinuousDeployment.md](docs/ContinuousDeployment.md)

Unfortunately, currently there are no unit tests
created to ensure the code quality.

## Built With

Serverless backend:

- [Amazon Web Service](https://aws.amazon.com/) - Fully powered by AWS.

Imported in code, but NOT being used in production for now:

- [MongoDB](https://www.mongodb.com/) - Database used for retrieving information.
- [mongoose](http://mongoosejs.com/) - Object modeling tool used for MongoDB.

Front-end (Client):

- Common
  - [Single-spa](https://single-spa.js.org) - A framework to bring together multiple JavaScript microfrontends in a frontend application.
  - [Styled Components](https://www.styled-components.com) - Library used for adding CSS to React components.
- Root
  - [Tailwind](https://tailwindcss.com) - A utility-first CSS framework packed with classes with humen-friendly name; highly customizable.
- Syllabus
  - [Redux](https://redux.js.org) - Library used to manage the state of front-end.
  - [Semantic UI React](https://react.semantic-ui.com) - Official React integration for Semantic UI, a development framework that helps create layouts with prebuilt components easily.
- Campus
  - [React Bootstrap](https://react-bootstrap.github.io) - Official React integration for Bootstrap, a frequently updated development framework that helps create layouts with prebuilt components easily.

## Contributing

Submit an issue or a pull request! :blush:

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/OscarWang114"><img src="https://avatars0.githubusercontent.com/u/30998659?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Chih-Hao Wang</b></sub></a><br /><a href="https://github.com/wasedatime/wasedatime-web/issues?q=author%3AOscarWang114" title="Bug reports">🐛</a> <a href="https://github.com/wasedatime/wasedatime-web/commits?author=OscarWang114" title="Code">💻</a> <a href="#design-OscarWang114" title="Design">🎨</a> <a href="https://github.com/wasedatime/wasedatime-web/commits?author=OscarWang114" title="Documentation">📖</a> <a href="#ideas-OscarWang114" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/wasedatime/wasedatime-web/pulls?q=is%3Apr+reviewed-by%3AOscarWang114" title="Reviewed Pull Requests">👀</a> <a href="#infra-OscarWang114" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://github.com/Lmmmmm"><img src="https://avatars1.githubusercontent.com/u/30943643?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Meng Li</b></sub></a><br /><a href="https://github.com/wasedatime/wasedatime-web/commits?author=Lmmmmm" title="Code">💻</a> <a href="#design-Lmmmmm" title="Design">🎨</a> <a href="#ideas-Lmmmmm" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/Isabella-Ko"><img src="https://avatars0.githubusercontent.com/u/47520253?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Isabella-Ko</b></sub></a><br /><a href="#business-Isabella-Ko" title="Business development">💼</a> <a href="#design-Isabella-Ko" title="Design">🎨</a> <a href="#ideas-Isabella-Ko" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/JiaxianGu"><img src="https://avatars3.githubusercontent.com/u/43884711?v=4?s=100" width="100px;" alt=""/><br /><sub><b>JiaxianGu</b></sub></a><br /><a href="https://github.com/wasedatime/wasedatime-web/issues?q=author%3AJiaxianGu" title="Bug reports">🐛</a> <a href="https://github.com/wasedatime/wasedatime-web/commits?author=JiaxianGu" title="Code">💻</a> <a href="#design-JiaxianGu" title="Design">🎨</a> <a href="#ideas-JiaxianGu" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/YHhaoareyou"><img src="https://avatars0.githubusercontent.com/u/43674499?v=4?s=100" width="100px;" alt=""/><br /><sub><b>YH_hao_are_you</b></sub></a><br /><a href="https://github.com/wasedatime/wasedatime-web/issues?q=author%3AYHhaoareyou" title="Bug reports">🐛</a> <a href="https://github.com/wasedatime/wasedatime-web/commits?author=YHhaoareyou" title="Code">💻</a> <a href="#ideas-YHhaoareyou" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/wasedatime/wasedatime-web/pulls?q=is%3Apr+reviewed-by%3AYHhaoareyou" title="Reviewed Pull Requests">👀</a> <a href="#projectManagement-YHhaoareyou" title="Project Management">📆</a></td>
    <td align="center"><a href="https://github.com/AustinZhu"><img src="https://avatars1.githubusercontent.com/u/42071208?v=4?s=100" width="100px;" alt=""/><br /><sub><b>AustinZhu</b></sub></a><br /><a href="https://github.com/wasedatime/wasedatime-web/issues?q=author%3AAustinZhu" title="Bug reports">🐛</a> <a href="https://github.com/wasedatime/wasedatime-web/commits?author=AustinZhu" title="Code">💻</a> <a href="#ideas-AustinZhu" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-AustinZhu" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-AustinZhu" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/NeroArcher"><img src="https://avatars3.githubusercontent.com/u/59641121?v=4?s=100" width="100px;" alt=""/><br /><sub><b>NeroArcher</b></sub></a><br /><a href="https://github.com/wasedatime/wasedatime-web/commits?author=NeroArcher" title="Code">💻</a> <a href="#design-NeroArcher" title="Design">🎨</a> <a href="#ideas-NeroArcher" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/k-jomphon"><img src="https://avatars3.githubusercontent.com/u/38510009?v=4?s=100" width="100px;" alt=""/><br /><sub><b>k-jomphon</b></sub></a><br /><a href="https://github.com/wasedatime/wasedatime-web/commits?author=k-jomphon" title="Code">💻</a> <a href="#design-k-jomphon" title="Design">🎨</a> <a href="#ideas-k-jomphon" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><img src="?s=100" width="100px;" alt=""/><br /><sub><b>Xia Zjou Zheng (George)</b></sub><br /><a href="#projectManagement" title="Project Management">📆</a> <a href="#ideas" title="Ideas, Planning, & Feedback">🤔</a> <a href="#business" title="Business development">💼</a></td>
    <td align="center"><a href="https://github.com/wanng-ide"><img src="https://avatars0.githubusercontent.com/u/32323900?v=4?s=100" width="100px;" alt=""/><br /><sub><b>wanng</b></sub></a><br /><a href="https://github.com/wasedatime/wasedatime-web/commits?author=wanng-ide" title="Code">💻</a> <a href="#ideas-wanng-ide" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/nd-02110114"><img src="https://avatars3.githubusercontent.com/u/17228098?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Daiki Nishikawa</b></sub></a><br /><a href="#ideas-nd-02110114" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://www.facebook.com/JawBoYue"><img src="https://graph.facebook.com/100000406482926/picture?type=large?s=100" width="100px;" alt=""/><br /><sub><b>Jaw Bo Yue</b></sub></a><br /><a href="#design" title="Design">🎨</a> <a href="#ideas" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/youenn98"><img src="https://avatars.githubusercontent.com/u/51810761?v=4?s=100" width="100px;" alt=""/><br /><sub><b>youenn98</b></sub></a><br /><a href="https://github.com/wasedatime/wasedatime-web/commits?author=youenn98" title="Code, Ideas">💻🤔</a></td>
    <td align="center"><a href="#"><sub><b>Hatori Cao</b></sub></a><br /><a href="#" title="Tutorials, Ideas">✅🤔</a></td>
  </tr>
  <tr>
    <td align="center"><a href="#"><sub><b>Zenda Chen</b></sub></a><br /><a href="#" title="Business, Design, Ideas">💼🎨🤔</a></td>
    <td align="center"><a href="#"><sub><b>Kaiqing Chang</b></sub></a><br /><a href="#" title="Business, Design, Ideas">💼🎨🤔</a></td>
    <td align="center"><a href="https://github.com/kaedejima"><img src="https://avatars.githubusercontent.com/u/49092226?s=400&u=7f7d80600a0007aadc8a9e6d0df69e38088c5562&v=4" width="100px;" alt=""/><br /><sub><b>Kaede Iijima</b></sub></a><br /><a href="#code" title="Tutorials, Design">✅🎨</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
