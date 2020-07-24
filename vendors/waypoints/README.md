# Waypoints

Waypoints is a library that makes it easy to execute a function whenever you scroll to an element. ![Build Status](https://travis-ci.org/imakewebthings/waypoints.svg)

```js
var waypoint = new Waypoint({
  element: document.getElementById('thing'),
  handler: function(direction) {
    alert('You have scrolled to a thing')
  }
})
```

If you're new to Waypoints, check out the [Getting Started](https://imakewebthings.com/waypoints/guides/getting-started) guide.

[Read the full documentation](https://imakewebthings.com/waypoints/api/waypoint) for more details on usage and customization.

## Shortcuts

In addition to the normal Waypoints script, extensions exist to make common UI patterns just a little easier to implement:

- [Infinite Scrolling](https://imakewebthings.com/waypoints/shortcuts/infinite-scroll)
- [Sticky Elements](https://imakewebthings.com/waypoints/shortcuts/sticky-elements)
- [Inview Detection](https://imakewebthings.com/waypoints/shortcuts/inview)


## Contributing

If you want to report a Waypoints bug or contribute code to the library, please read the [Contributing Guidelines](https://github.com/imakewebthings/waypoints/blob/master/CONTRIBUTING.md). If you need help *using* Waypoints, please do not open an issue. Instead, ask the question on [Stack Overflow](https://stackoverflow.com) and tag it with <code>#jquery-waypoints</code>. Be sure to follow the guidelines for [asking a good question](https://stackoverflow.com/help/how-to-ask).

## License

Copyright (c) 2011-2014 Caleb Troughton. Licensed under the [MIT license](https://github.com/imakewebthings/waypoints/blob/master/licenses.txt).
