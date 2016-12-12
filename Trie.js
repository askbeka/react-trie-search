import {handleActions, createActions} from 'redux-actions';

export const ADD_WORD = 'ADD_WORD';
export const REMOVE_WORD = 'REMOVE_WORD';

export const actions = createActions(ADD_WORD, REMOVE_WORD);

export default handleActions({
    [ADD_WORD]: (trie, {payload: {word, k}}) => {
        const newTrie = new Trie();
        trie.add(word, k);
        newTrie._trie = trie._trie;
        return newTrie;
    },
    [REMOVE_WORD]: (trie, {payload: {word, k}}) => {
        const newTrie = new Trie();
        trie.remove(word, k);
        newTrie._trie = trie._trie;
        return newTrie;
    }
}, new Trie())

export class Trie {

    constructor(trie) {
        this._trie = trie || {};
    }

    find(word) {
        let cur = this._trie;

        for (let i = 0; i < word.length; i++) {
            let letter = word[i];
            if (cur[letter]) {
                cur = cur[letter];
            } else {
                return [];
            }
        }

        let result = {};

        this.preTraverse(cur, (o) => {
            if (o.$) {
                Object.keys(o.$).forEach(k => {
                    result[k] = (result[k] || 0) + o.$[k];
                })
            }
        });

        return result;
    }

    preTraverse(cur, callback) {
        callback(cur);
        Object.keys(cur).forEach(l => {
            if (l !== '$') {
                this.preTraverse(cur[l], callback);
            }
        })
    }

    add(word, k) {
        let cur = this._trie;
        const l = word.length;
        for (let i = 0; i < l; i++) {

            let letter = word[i], pos = cur[letter];

            if (!pos) {
                cur = cur[letter] = (i === l - 1) ? {$: {[k]: 1}} : {};
            } else if (pos.$ && i === l - 1) {
                pos.$[k] = (pos.$[k] || 0) + 1;
            } else {
                cur = cur[letter];
            }
        }
    }

    remove(word, k, index = -1, cur = this._trie) {
        if (index === word.length - 1) {
            if (cur.$ && cur.$[k]) {
                delete cur.$[k];
                if (this.noKids(cur.$)) {
                    delete cur.$;
                }
                return this.noKids(cur);
            }
            return false;
        } else {
            if (this.remove(word, k, index + 1, cur[word[index + 1]])) {
                return (delete cur[word[index + 1]]) && this.noKids(cur);
            }
        }
    }

    noKids(node) {
        return Object.keys(node).length === 0;
    }
}
