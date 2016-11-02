# react-trie-search
react search component consuming trie for efficent search 

## Usage
#### Consuming array of strings
```
import Search from 'react-trie-search';

render() {
  return <Search items={['Hello World', 'Foo Bar']} onResult={result => console.log(result)}}/>
}
```

#### Consuming array of objects
```
import Search from 'react-trie-search';

const getter = ({value}) => value;

render() {
  return <Search items={[{id: 0, value: 'some value'}, {id: 1, value: 'some value 1'}]} getter={getter} onResult={result => console.log(result)}}/>
}
```

#### Consuming Trie instance
```
import Search, {Trie} from 'react-trie-search';

const getter = ({value}) => value;

const trie = new Trie([{id: 0, value: 'some value'}, {id: 1, value: 'some value 1'}], getter);
render() {
  return <Search trie={trie} onResult={result => console.log(result)}}/>
}
```
