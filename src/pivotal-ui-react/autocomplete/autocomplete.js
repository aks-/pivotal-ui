var AutocompleteList = require('./autocomplete-list');
var AutocompleteInput = require('./autocomplete-input');
var classnames = require('classnames');
var Cursor = require('pui-cursor');
var es = require('event-stream');
var React = require('react');
var scrollIntoView = require('scroll-into-view');
var TrieSearch = require('trie-search');

var types = React.PropTypes;

function trieFromSearchableItems(searchableItems) {
  var trie = new TrieSearch('value');
  if(!searchableItems) { return trie; }

  es.readable(function(count, callback) {
    if(count >= searchableItems.length) this.emit('end');
    callback(null, searchableItems[count]);
  }).pipe(es.map(value => trie.add({value})));

  return trie;
}

var Autocomplete = React.createClass({
  propTypes: {
    className: types.string,
    disabled: types.bool,
    input: types.object,
    maxItems: types.number,
    onClick: types.func,
    onFilter: types.func,
    onFocus: types.func,
    onInitializeItems: types.func,
    onPick: types.func,
    onSearch: types.func,
    placeholder: types.string,
    selectedSuggestion: types.any,
    value: types.string
  },

  getDefaultProps() {
    return {maxItems: 50, onInitializeItems: (done) => done([]), input: (<AutocompleteInput/>), placeholder: 'Search'};
  },

  getInitialState() {
    var value = this.props.value || '';
    return {hidden: true, highlightedSuggestion: 0, suggestedValues: [], trie: null, value};
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({value: nextProps.value});
    }
  },

  componentDidMount() {
    this.props.onInitializeItems((searchableItems = []) => {
      const trie = trieFromSearchableItems(searchableItems);
      this.setState({searchableItems, trie});
    });
  },

  onSearch(value, callback) {
    if (this.props.onSearch) return this.props.onSearch(value, callback);
    var {maxItems} = this.props;
    var {trie} = this.state;
    if (!trie) return callback([]);
    value = value.trim();
    var result = trie.get(value || '');
    if (this.props.onFilter) { result = this.props.onFilter(result); }
    callback(result.slice(0, maxItems));
  },

  showList(defaultValue = null) {
    var value = defaultValue === null ? this.state.value : defaultValue;
    this.onSearch(value, (suggestedValues) => {
      this.setState({hidden: false, suggestedValues: suggestedValues});
    });
  },

  onPick(value) {
    this.props.onPick && this.props.onPick(value);
    this.hideList();
  },

  hideList() {
    this.setState({hidden: true});
  },

  scrollIntoView() {
    Array.from(React.findDOMNode(this).querySelectorAll('.highlighted')).map((el) => scrollIntoView(el, {validTarget: target => target !== window}));
  },

  render() {
    var $autocomplete = new Cursor(this.state, state => this.setState(state));
    var {className, maxItems, onFocus, onClick, disabled, selectedSuggestion, placeholder, input, children, ...props} = this.props;
    var {hideList, scrollIntoView, onPick, onSearch} = this;
    input = React.cloneElement(input, {$autocomplete, onPick, hideList, scrollIntoView, onSearch, disabled, onFocus, onClick, placeholder});
    return (
      <div className={classnames('autocomplete', 'mhs', className)} {...props} >
        {input}
        <AutocompleteList {...{$autocomplete, onPick, maxItems, selectedSuggestion}}>{children}</AutocompleteList>
      </div>
    );
  }
});

module.exports = {
  /**
   * @component Autocomplete
   * @description An autocomplete that comes with a dropdown list
   *
   * @property disabled {Bool} Greys out and turns off event handlers.
   * @property input {React Component} Use if you want to override the default AutocompleteInput.
   * @property maxItems {Number} Cap the number of items that can appear in the dropdown list.
   * @property onClick {Function} Event handler for click on the input (e.g. to automatically select value text).
   * @property onFilter {Function} Optionally filter list items (other than by the input value).
   * @property onFocus {Function} Event handler for focus on the input (e.g. to automatically show the list).
   * @property onInitializeItems {Function} Your one chance to populate the list.
   * @property onPick {Function} Event handler for choosing an item in the list.
   * @property onSearch {Function} Override default search algorithm called whenever input value changes.
   * @property placeholder {String} Placeholder text for the input.
   * @property selectedSuggestion {Any} Matcher for the item in the list that is currently selected.
   * @property value {String} The value of the input.
   *
   * @example ```js
   * var Autocomplete = require('@npmcorp/pui-react-autocomplete').Autocomplete;
   * var initialItems = ['Pivotal Labs', 'Cloud Foundry', 'Data Services'];
   * var onInitializeItems = function(callback) { callback(initialItems) };
   * var onPick = function(value) { console.log(value); };
   * var MyComponent = React.createClass({
   *   render() {
   *     return <Autocomplete {onInitializeItems, onPick}/>
   *   }
   * });
   * ```
   *
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#autocomplete_react)
   */
  Autocomplete,

  AutocompleteInput,

  AutocompleteList
};

/*doc
 ---
 title: Autocomplete
 name: autocomplete_react
 categories:
 - react_components_autocomplete
 - react_all
 ---

 <code class="pam">
 <i class="fa fa-download" alt="Install the Component">
 npm install @npmcorp/pui-react-autocomplete --save
 </i>
 </code>

 Require the subcomponent:

 ```
 var Autocomplete = require('@npmcorp/pui-react-autocomplete');
 ```

 ```jsx_example
 var AutocompleteExample = React.createClass({
 onInitializeItems: function(callback) {
 callback(['foo', 'food', 'bar']);
 },
 onPick: function(item) {
 alert('You selected ' + item.value);
 },
 render: function() {
 return (
 <Autocomplete onInitializeItems={this.onInitializeItems} onPick={this.onPick}/>
 );
 }
 })

 ```

 ```react_example_table
 <AutocompleteExample/>
 ```

 */

/*doc
 ---
 title: onInitializeItems
 name: autocomplete_oninitializeitems
 parent: autocomplete_react
 ---

 The callback passed to this function should return the values to initially populate the list of items.

 It's designed to be able to be used asynchronously:

 ```js
 function onInitializeItems(callback) {
 $.get('example.com/autocomplete_items').then(function(items) {
 callback(items);
 });
 };
 ```

 But it can also just be used synchronously:

 ```js
 function onInitializeItems(callback) {
 callback(['foo', 'food', 'bar']);
 };
 ```

 */

/*doc
 ---
 title: onPick
 name: autocomplete_onpick
 parent: autocomplete_react
 ---

 By default, when a user selects a list item, nothing happens except hiding the list.

 ```js
 function onPick(value) {
 $.post('example.com/add_to_cart?thing=' + value);
 };
 ```

 */

/*doc
 ---
 title: onSearch
 name: autocomplete_onsearch
 parent: autocomplete_react
 ---

 To override the default search algorithm, pass your custom function to the Autocomplete as the prop onSearch.

 onSearch is given the current value of the input and a callback.

 The callback should return the items that should be shown in the list given that input value.

 The list should be an array of objects with the `value` key e.g.
 `[{value: 'foo'}, {value: 'food'}, {value: 'foe'}]`

 It's designed to be able to be used asynchronously:

 ```js
 function onSearch(value, callback) {
 $.get('example.com/autocomplete_results?value=' + value).then(function(results) {
 callback(results);
 });
 };
 ```

 But it can also just be used synchronously:

 ```js
 function onSearch(value, callback) {
 callback(myCustomList.filter(function(entry) { return entry.includes('foo-' + value + '-bar') }));
 };
 ```

 */
