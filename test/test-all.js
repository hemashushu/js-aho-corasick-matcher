/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { strict as assert } from 'assert';

import { TrieTree } from '../src/trie-tree.js';
import { AhoCorasick } from '../src/aho-corasick.js'

function testTrieTree() {
    let tree1 = TrieTree.build(["ab", "xy"].map(item => {
        return stringToChars(item);
    }));
    assert.equal(tree1.toString(), '#0:null->[#1:a->[#2:b=(2)],#3:x->[#4:y=(2)]]');

    let tree2 = TrieTree.build(["b", "ab"].map(item => {
        return stringToChars(item);
    }));
    assert.equal(tree2.toString(), '#0:null->[#1:b=(1),#2:a->[#3:b=(2,1)~>1]]');

    let tree3 = TrieTree.build(["bc", "abc", "bcd", "boy"].map(item => {
        return stringToChars(item);
    }));
    assert.equal(tree3.toString(), '#0:null->[#1:b->[#2:c=(2)->[#6:d=(3)],#7:o->[#8:y=(3)]],#3:a->[#4:b~>1->[#5:c=(3,2)~>2]]]');
}

function testFind() {
    let t = 'asasdfabazxabccvboxyabzqwabeboyabcdrxyasdwabexypoiabusdbcf';

    let ks1 = ["ab", "xy"];
    assert.deepEqual(AhoCorasick.find(t, ks1), jsFindAlls(t, ks1));

    let ks2 = ["b", "ab"];
    assert.deepEqual(AhoCorasick.find(t, ks2), jsFindAlls(t, ks2));

    let ks3 = ["bc", "abc", "bcd", "boy"];
    assert.deepEqual(AhoCorasick.find(t, ks3), jsFindAlls(t, ks3));
}

function jsFindAlls(test, keywords) {
    let result = [];
    for (let keyword of keywords) {
        let r = jsFindAll(test, keyword);
        result = result.concat(r);
    }

    // sort by index
    result.sort((lhs, rhs) => {
        return lhs.index - rhs.index;
    });

    return result;
}

function jsFindAll(test, keyword) {
    let result = []; // [{index, word}, ...]
    let idx = 0;
    while (idx < test.length) {
        idx = test.indexOf(keyword, idx);
        if (idx === -1) {
            break;
        }

        result.push({ index: idx, word: keyword });
        idx = idx + keyword.length;
    }

    return result;
}

function stringToChars(str) {
    let chars = [];
    for (let c of str) {
        chars.push(c);
    }
    return chars;
}

function testAhoCorasick() {
    testTrieTree();
    testFind();
    console.log('testAhoCorasick() passed.');
}

(() => {
    testAhoCorasick();
})();