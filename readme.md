# Intro

This is a javascript lib and only used by client browser which supports HTML5.

## docs

> Install

```
npm i JsFilter --save-dev
// or
npm i JsFilter --save
```

> option

| key name | type   | value                               | description              |
| -------- | ------ | ----------------------------------- | ------------------------ |
| method   | string | gauss/base/brown/grey/emboss        | the render filter method |
| blur     | number | any number which more than the zero | only used gauss          |

> mehotd

`loadIamge(url: string, option: option, callback: (err: Error | null, result: HTMLElement | string)): Promise<HTMLElement | string>`

> example

```
const jsFilter =new JsFilter({
    type: 'base64'
})

// this is gauss
filter.loadImage(testImg,
    { method: 'gauss', blur: 5 },
        function(err, url) {
            document.querySelector('img').setAttribute('src', url)
        }
);

// emboss
filter.loadImage(testImg, {method: 'emboss'},
       function(err, url) {
            document.querySelector('img').setAttribute('src', url)
        }
)
```
