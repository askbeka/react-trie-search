import React, {PropTypes as type, Component} from 'react';
import Trie from './Trie';

export default class Search extends Component {

    static propTypes = {
        items: type.arrayOf(type.string),
        onResult: type.func,
        placeholder: type.string,
        trie: type.instanceOf(Trie)
    };

    constructor(props) {
        super(props);
        const {items, trie} = props;
        if (trie) {
            this.trie = trie;
        } else {
            this.trie = new Trie();
            if (items && items.length) this.trie.buildTrie(items);
        }
    }

    componentDidMount() {
        const {value} = this.input;
        if (value) {

        }
    }

    componentWillReceiveProps(nextProps) {
        const {items, trie} = nextProps;
        if (trie) {
            this.trie = trie;
        } else if (items && items.length) this.trie.buildTrie(items);
    }

    onChange = () => {
        const
            {value} = this.input,
            {items, onResult} = this.props;

        const resultIndexes = this.trie.find(value);
        let result = [];
        if (resultIndexes && resultIndexes.length) {
            result = resultIndexes.map(item => items[item]);
        }
        if (onResult) onResult(resultIndexes, result);
    };

    render() {
        return (
            <input type="text"
                   ref={i => this.input = i}
                   placeholder={this.props.placeholder}
                   onChange={this.onChange}/>
        );
    }
}
