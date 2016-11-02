export default class Trie {

    constructor(wordsList) {
        this._trie = {};
        if (wordsList && wordsList.length) this.buildTrie(wordsList);
    }

    find(text) {
        let result = new Set(),
            cur = this._trie;
        var words = text.toLowerCase().split(/\W+/);
        for (let i = 0; i < words.length; i++) {
            let word = words[i];
            if (word.length) {

                cur = this._trie;
                for (let j = 0; j < word.length; j++) {
                    let letter = word[j];
                    if (cur[letter]) {
                        cur = cur[letter];
                    } else {
                        return [];
                    }
                }
                this._pre_traverse(cur, (o) => {
                    if (o.$)  {
                        if (i > 0) {
                            let intersection = new Set([...o.$].filter(i => result.has(i)));
                            result = intersection.size ? intersection : result;
                        } else {
                            o.$.forEach(i => result.add(i));
                        }
                    }
                });
            }
        }

        return Array.from(result);
    }

    _pre_traverse(cur, callback) {
        callback(cur);
        Object.keys(cur).forEach(l => {
            if (l !== '$') {
                this._traverse(cur[l], callback);
            }
        })
    }

    getWords(cur) {
    }

    valueOf() {
        return this.getWords();
    }

    toString() {
        return this.valueOf().toString();
    }

    buildTrie(wordsList) {
        for (let i = 0; i < wordsList.length; i++) {
            let line = wordsList[i];
            if (typeof line === 'string') {
                let words = line.toLowerCase().split(/\W+/);
                for (let j = 0; j < words.length; j++) {
                    let word = words[j], cur = this._trie;
                    for (let k = 0; k < word.length; k++) {
                        let letter = word[k], pos = cur[letter];
                        if (pos == null) {
                            cur = cur[letter] = (k === word.length - 1) ? {$: new Set([i])} : {};
                        } else if (pos.$ && k === word.length - 1) {
                            pos.$.add(i);
                        } else {
                            cur = cur[letter];
                        }
                    }
                }
            } else {
                throw new Error(`invalid item: ${line} is not a string`);
            }
        }
    }
}
