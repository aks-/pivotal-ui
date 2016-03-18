var React = require('react');
import {mergeProps} from '@npmcorp/pui-react-helpers';

/**
 * @component Ribbon
 * @description Flashy text used to call out access, status, environment, etc.
 *
 * @example ```js
 * var Ribbon = require('@npmcorp/pui-react-ribbons').Ribbon;
 * var MyComponent = React.createClass({
 *   render() {
 *     return <Ribbon>Acceptance Environment</Ribbon>
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#ribbons_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#ribbon)
 */
var Ribbon = React.createClass({
  render() {
    var {children, ...others} = this.props;
    var props = mergeProps(others, {className: 'ribbon'});
    return <div {...props}>{children}</div>;
  }
});

/**
 * @component PrimaryRibbon
 * @description A `<Ribbon>` with an emphasized background color
 *
 * @example ```js
 * var PrimaryRibbon = require('@npmcorp/pui-react-ribbons').PrimaryRibbon;
 * var MyComponent = React.createClass({
 *   render() {
 *     return <PrimaryRibbon>Acceptance Environment</PrimaryRibbon>
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#ribbons_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#ribbon)
 */
var PrimaryRibbon = React.createClass({
  render() {
    var {children, ...others} = this.props;
    var props = mergeProps(others, {className: ['ribbon', 'ribbon-primary']});
    return <div {...props}>{children}</div>;
  }
});

/**
 * @component Banner
 * @description A larger, emphasized `<Ribbon>`
 *
 * @example ```js
 * var Banner = require('@npmcorp/pui-react-ribbons').Banner;
 * var MyComponent = React.createClass({
 *   render() {
 *     return <Banner>Acceptance Environment</Banner>
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#ribbons_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#ribbon)
 */
var Banner = React.createClass({
  render() {
    var {children, ...others} = this.props;
    var props = mergeProps(others, {className: 'ribbon-banner'});
    return <div {...props}>{children}</div>;
  }
});

module.exports = {Ribbon, PrimaryRibbon, Banner};


/*doc
---
title: Ribbons
name: ribbons_react
categories:
 - react_base_ribbons
 - react_all
---

<code class="pam">
<i class="fa fa-download" alt="Install the Component">
npm install @npmcorp/pui-react-ribbons --save
</i>
</code>

Require the subcomponents:

```
var Ribbon = require('@npmcorp/pui-react-ribbons').Ribbon;
var PrimaryRibbon = require('@npmcorp/pui-react-ribbons').PrimaryRibbon;
var Banner = require('@npmcorp/pui-react-ribbons').Banner;
```

`Ribbon` components are straightforward implementations of the [Ribbon][ribbon] styles.
They should be used to call out access, status, environment, etc.


```react_example_table
<Ribbon> British </Ribbon>

<PrimaryRibbon> English-British </PrimaryRibbon>
```
*/

/*doc
---
title: Banners
name: banner_ribbons_react
parent: ribbons_react
---

```react_wrapped_example_table
<Banner> British </Banner>
```

*/
