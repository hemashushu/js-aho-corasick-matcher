/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { strict as assert } from 'assert';

import { AhoCorasick } from '../src/aho-corasick.js'

function testTable() {
    //
}

function testFind() {
    return;

    // TODO::

    let s = 'ababbbabbbabaababaaabaaaaabababaabcdabdbabab';

    let k1 = 'abaab';
    assert.equal(AhoCorasick.find(s, k1), s.indexOf(k1));

    let k2 = 'aaaab';
    assert.equal(AhoCorasick.find(s, k2), s.indexOf(k2));

    let k3 = 'aabaaa';
    assert.equal(AhoCorasick.find(s, k3), s.indexOf(k3));

    let k4 = 'abcdabd';
    assert.equal(AhoCorasick.find(s, k4), s.indexOf(k4));
}

function testAhoCorasick() {
    testTable();
    testFind();
    console.log('testAhoCorasick() passed.');
}

(() => {
    testAhoCorasick();
})();