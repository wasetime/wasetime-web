## Run in development

1. cd root
2. npm run dev

## Add new project (e.g. forum)

1.

```
> npm i -g create-single-spa

...

> npx create-single-spa --dir forum --framework react --moduleType app-parcel
? Which package manager do you want to use? npm
? Will this project use Typescript? Yes
? Organization name (can use letters, numbers, dash or underscore) wasedatime
? Project name (can use letters, numbers, dash or underscore) forum
```

Then you will see a new folder called 'forum' is created.

2.

```
// forum/package.json

"scripts": {
    "start": "webpack serve --port 8082",
}

```

If 8082 is used in another existing project, try 8083 or above

3.

```
// root/package.json

"scripts": {
    "dev": "concurrently --kill-others \"npm start\" \"cd ../syllabus && npm start\" \"cd ../campus && npm start\" \"cd ../forum && npm start\""
}

```
