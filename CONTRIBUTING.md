# Contributing

(Based off of the guidelines for [Twitter Bootstrap](https://github.com/twbs/bootstrap/blob/master/CONTRIBUTING.md))

## I'd like to help, what can I do?

There are lots of ways to help depending on your interests and skills. For example, you can [report bugs]() or create new components. If you want to submit bug fixes, create new components, or update existing ones, please refer to our [pull request guidelines]().

If you need some inspiration, we have plenty of work for you to do. Please [email us](mailto:pivotal-ui@pivotal.io) to start a conversation.

## Bug reports

A bug is a _demonstrable problem_ that is caused by the code in the repository.
Good bug reports are extremely helpful, so thanks!

Guidelines for bug reports:

0. **Validate and lint your code** &mdash; [validate your HTML](http://html5.validator.nu)
   and [lint your HTML](https://github.com/twbs/bootlint) to ensure your
   problem isn't caused by a simple error in your own code.

1. **Use the GitHub issue search** &mdash; check if the issue has already been
   reported.

2. **Check if the issue has been fixed** &mdash; try to reproduce it using the
   latest `master` or development branch in the repository.

3. **Isolate the problem** &mdash; ideally create a [reduced test
   case](http://css-tricks.com/6263-reduced-test-cases/) and a live example.
   [This JS Bin](http://jsbin.com/lefey/1/edit?html,output) is a helpful template.

4.	**Add a screenshot** &mdash; a picture is worth a thousand words. A screenshot of the bug in action will be very helpful in debugging it. 


A good bug report shouldn't leave others needing to chase you up for more
information. Please try to be as detailed as possible in your report. What is
your environment? What steps will reproduce the issue? What browser(s) and OS
experience the problem? Do other browsers show the bug differently? What
would you expect to be the outcome? All these details will help people to fix
any potential bugs.

Finally, if you've followed all these steps and you think you have a real bug, [open an issue in Github issues tracker](https://github.com/pivotal-cf/pivotal-ui/issues).

## Feature requests

To submit a Feature request, please [open an issue on Github](https://github.com/pivotal-cf/pivotal-ui/issues). Screenshots are very helpful! We'll then have a conversation about what you are trying to achieve in your project and the best way to do that.

## Pull requests

1. [Set up your environment](#setting-up-your-environment)

1. [Fork](http://help.github.com/fork-a-repo/) the project, clone your fork,
   and configure the remotes:

   ```bash
   git clone https://github.com/<your-github-id>/pivotal-ui.git
   cd pivotal-ui
   git remote add upstream https://github.com/pivotal-cf/pivotal-ui.git
   ```

1. If you cloned a while ago, get the latest changes from upstream:

   ```bash
   git checkout master
   git pull upstream master
   ```
   
1. Create a feature branch based off of master.

	```bash
	git checkout -b feature/<short_description_of_feature>
	```

1. **Before you make any changes**, [setup a CssCritic test baseline](#set-a-baseline-to-test-against-before-making-any-changes). This will allow you to test for regressions after you make changes.

1. Commit your changes in logical chunks. Please read over our [commit guidelines](#commit-guidelines).

1. [Document your component](#documenting-components) in the styleguide. 

1. **Before you push**, [test for regressions with CssCritic](#rerun-the-test-suite-for-regressions-before-you-commitmake-a-pull-request).

1. Push your changes to github

	```bash
	git pull --rebase upstream master
	git push origin head
	```

1. [Open a Pull Request](https://help.github.com/articles/using-pull-requests/) with a clear title and description against the master branch.

## Testing

(for the moment, this section is aspirational)

We use CSSCritic for front-end regression testing. Currently, we are only testing a few components, with plans to expand. To test:

### Set a baseline to test against (before making any changes!!)
1. Run `gulp` to build the assets
1. Run `gulp test`. This will open up Firefox and show all rendered test files in a "yellow" state.
1. Click "Accept the rendered page" for *each* component. Yes, this will get more painful as we add more tests. If it is slowing you down, please let us know so we can prioritize automating this step.

### Creating test fixtures for new components (very aspirational)

Test fixtures are automatically created every time you create a `haml_example`, `haml_example_table`, `html_example`, or `html_example_table` in the styleguide documentation. When you are happy with your component, you'll need to set a baseline test for it, and then it will get tested against regressions going forward.

### Rerun the test suite for regressions (before you commit/make a pull request)
1. Run `gulp` to build the latest assets 
1. Run `gulp test`. This will open up Firefox.
1. If there are no regressions, all components will be green.
1. If you added any components, you'll have to click "Accept the rendered page" for that component.
1. If a component is red, this means either:
    1. You broke something. Fix it!
    2. You want to change the baseline. You should talk to the core Pivotal UI team first, especially the designers.


## Commit guidelines

Each commit should be "green" (i.e. it should not break any existing functionality). In addition, attempt to make each commit a complete idea. A single commit should not contain unrelated changes.

We follow the [Conventional Changelog](https://github.com/ajoslin/conventional-changelog/blob/master/CONVENTIONS.md) commit message format. Your message should include information about whether it includes major, minor or patch level changes. You may be wondering what major, minor, and  patch mean in the context of CSS. Please follow these guidelines:

* **Major** - A breaking change which alters either *class names* or expected *HTML*. 
* **Minor** - Either an *additional feature* (e.g. a new component), or an update which changes *Sass variables*
* **Patch** - A *non-breaking change, bug fix, or design update* that any team should be able to upgrade to without changing their html. An example of this is updating the background color of the danger button or fixing the alignment of the horizontal tabs (as long as no html changes are required).

## Documenting components

We use [hologram for documentation and styleguide generation](https://github.com/trulia/hologram). The component docs are created from markdown comments in the SCSS. 

Make sure to name your component something unique or it will clobber other components' docs. Also, add your component to the appropriate categories.

This is an example of documentation button sizes. Notice how it has a yaml section in the beginning that defines its name and categories. For more information, see [the hologram example repo](https://github.com/trulia/hologram-example), or look at how other components are documented.

	/*doc
	---
	title: Buttons
	name: button
	categories:
	  - All
	  - CSS
	  - marketing-site
	---

	Button styles can be applied to any element. Typically you'll want to
	use either a `<button>` or an `<a>` element:

	```haml_example_table
	%button.btn.btn-primary Button

	%a.btn.btn-primary{href: "http://trulia.com"} Link
	```

	If your button is actually a link to another page, please use the
	`<a>` element, while if your button performs an action, such as submitting
	a form or triggering some javascript event, then use a `<button>` element.

	*/

TODO: document categories more explicitly when they stabilize.

## Code guidelines

### HTML

[Adhere to the Code Guide.](http://codeguide.co/#html)

- Use tags and elements appropriate for an HTML5 doctype (e.g., self-closing tags).
- Use [WAI-ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) attributes in documentation examples to promote accessibility.

### CSS

[Adhere to the Code Guide.](http://codeguide.co/#css)

- When feasible, default color palettes should comply with [WCAG color contrast guidelines](http://www.w3.org/TR/WCAG20/#visual-audio-contrast).
- Except in rare cases, don't remove default `:focus` styles (via e.g. `outline: none;`) without providing alternative styles. See [this A11Y Project post](http://a11yproject.com/posts/never-remove-css-outlines/) for more details.

### JS

- Use semicolons (in client-side JS)
- 2 spaces (no tabs)
- strict mode
- "Attractive"

## Setting up your environment

If you intend to build pivotal ui itself, there are a few things you'll need to do.

### Install Tools (in order)

compass, haml, sass, and hologram

    $ bundle install

node and npm

    $ brew install node

Install dependencies by running the following from the project root

    $ npm install

Install the Gulp CLI globally

    $ npm install gulp -g

### Build the project

As soon as you have your tools installed, run gulp _at the project root_:

    $ gulp

This will start up the styleguide development server, and generate the `dist/` directory that will house the compiled resources and the styleguide. In addition, every time you make a change to any of the source files, it will regenerate the `dist/` directory.